import Message from '@/src/types/Message';
import User from '@/src/types/User';
import { ServerToClientEvents } from '@/types/socket-events';
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { ObjectId } from 'bson';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

type ChatBoxProps = { chatId: ObjectId; user: User };

type MessageBubbleProps = { message: Message; side: 'left' | 'right' };

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: 'color: #e2e4e9',
        root: {
          ':disabled': {
            color: '#999',
          },
        },
      },
    },
  },
});

function BubbleBase({
  side,
  children,
}: {
  side: 'left' | 'right';
  children: React.ReactNode;
}): JSX.Element {
  const rightBorderRadius = '10px 10px 3px 10px';
  const leftBorderRadius = '10px 10px 10px 3px';
  return (
    <div
      style={{
        color: 'white',
        padding: '1rem',
        backgroundColor: side === 'right' ? '#4567bf' : '#484b51',
        borderRadius: side === 'right' ? rightBorderRadius : leftBorderRadius,
      }}
    >
      {children}
    </div>
  );
}

function MessageBubble({ message, side }: MessageBubbleProps): JSX.Element {
  return (
    <Stack width={'100%'} alignItems={side === 'right' ? 'end' : 'start'} direction={'column'}>
      <Stack
        sx={{ color: 'white' }}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        spacing={2}
      >
        {side === 'right' ? (
          <>
            <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
              {message.sender.username}
              <BubbleBase side={side}>{message.content}</BubbleBase>
            </Stack>
            <Avatar sx={{ bgcolor: '#8d8c8c' }}>
              {message.sender.username[0].toUpperCase() ?? 'N'}
            </Avatar>
          </>
        ) : (
          <>
            <Avatar sx={{ bgcolor: '#8d8c8c' }}>
              {message.sender.username[0].toUpperCase() ?? 'N'}
            </Avatar>
            <Stack direction="column" justifyContent="center" alignItems={'flex-start'} spacing={2}>
              {message.sender.username}
              <BubbleBase side={side}>{message.content}</BubbleBase>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

const Chat = ({ chatId, user }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket>();
  const socket = socketRef.current;

  // initialize socket
  useEffect(() => {
    if (socketRef.current !== undefined) {
      return;
    }

    const newSocket: Socket<ServerToClientEvents> = io();
    socketRef.current = newSocket;

    console.log(`Listening to ${chatId.toString()}`);

    newSocket.on('connect', () => {
      console.log(`connected ${newSocket.id}`);
    });

    // fetch previous messages
    fetch(`/api/messages/${chatId.toString()}`)
      .then(res => res.json())
      .then((messages: Message[]) => {
        console.log('Fetched previous messages:', messages);
        setMessages(messages);
      });

    // listen for new messages
    newSocket.on(chatId.toString(), (message: Message) => {
      console.log('Received message:', message);
      setMessages(messages => [...messages, message]);
    });
  }, [socket, chatId]);

  // send messages
  const sendMessage = () => {
    if (socket === undefined) {
      return;
    }
    console.log(`emitted message to ${chatId.toString()}`);
    socket.emit(chatId.toString(), {
      chatId,
      sender: user,
      content: message,
      timestamp: Date.now(),
      metadata: {},
    });
    setMessage(''); // clear input
  };

  return (
    <div style={{ backgroundColor: '#181818', color: 'white' }}>
      <Stack direction={'column'} spacing={1}>
        {messages.map((message, index) => (
          <MessageBubble
            message={message}
            key={index}
            side={message.sender._id.toString() === user._id.toString() ? 'right' : 'left'}
          />
        ))}
      </Stack>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          mt: 3,
          bgcolor: '#272a30',
          color: '#e2e4e9',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, bgcolor: '#272a30', color: '#e2e4e9' }}
          placeholder="Message this lobby"
          onChange={e => setMessage(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <ThemeProvider theme={theme}>
          <Button sx={{ p: '10px' }} onClick={sendMessage} disabled={message.length === 0}>
            Send
          </Button>
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default Chat;

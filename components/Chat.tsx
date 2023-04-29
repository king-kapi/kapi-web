import Message from '@/src/types/Message';
import User from '@/src/types/User';
import { ServerToClientEvents } from '@/types/socket-events';
import { ObjectId } from 'bson';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

// TODO: if someone has time, can they check out why the chat socket initializes twice?
const Chat = ({ chatId, user }: { chatId: ObjectId; user: User }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const socketRef = useRef<Socket>();
  const socket = socketRef.current;

  // initialize socket
  useEffect(() => {
    if (socket) {
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
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket) return;

    const formData = new FormData(e.currentTarget);

    console.log(`emitted message to ${chatId.toString()}`);
    socket.emit(chatId.toString(), {
      chatId,
      sender: user,
      content: formData.get('content'),
      timestamp: Date.now(),
      metadata: {},
    } as Message);

    setMessage(''); // clear input
  };

  return (
    <div>
      <div style={{ padding: 8, background: '#eee' }}>
        {messages.map(
          // TODO: extract this to message component
          (message, index) => (
            <div key={index}>
              <b>From: </b>
              {message.sender.username}
              <br />
              {message.content}
            </div>
          )
        )}
      </div>

      <br />

      <form onSubmit={handleSendMessage}>
        <input
          name="content"
          type="text"
          value={message}
          onInput={(e: React.FormEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

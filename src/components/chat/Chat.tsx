import React, { useEffect, useRef, useState } from 'react';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { Socket } from 'socket.io-client';
import { IMessage, IMessagePopulated } from '@/src/models/Message';
import { useAtomValue } from 'jotai/index';
import { userAtom } from '@/src/atoms/userAtom';
import SenderBubble from '@/src/components/chat/SenderBubble';
import ReceiveBubble from '@/src/components/chat/ReceiveBubble';
import meAtom from '@/src/atoms/meAtom';

export interface ChatProps extends React.ComponentPropsWithoutRef<'div'> {
  chatId: string;
  inParty?: boolean;
}

const Chat = ({ chatId, inParty = true, className, ...props }: ChatProps) => {
  const user = useAtomValue(meAtom);

  const socketRef = useRef<Socket>();
  const [messages, setMessages] = useState<IMessagePopulated[]>([]);

  // useEffect(() => {
  //   if (!chatId || !inParty) return;
  //   const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
  //   socketRef.current = socket;
  //   fetch(`/api/chats/${chatId.toString()}/messages`)
  //     .then(res => res.json())
  //     .then((messages: IMessagePopulated[]) => {
  //       setMessages(messages);
  //     });
  //
  //   socket.on('connect', () => {
  //     console.log(`Connected to chat ${chatId}`);
  //   });
  //
  //   // listen for messages
  //   socket.on(chatId.toString(), message => {
  //     console.debug('Received message', message);
  //     setMessages(messages => [message, ...messages]);
  //   });
  //
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [chatId, inParty]);

  useEffect(() => {
    console.log('hi');
    const ws = new WebSocket(`ws://${location.host}/api/chat`);

    ws.onopen = () => {
      console.log('socket opened');
    };

    ws.onmessage = message => {
      console.log('Received', message);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inParty) return;

    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (!socketRef.current) return;
    const socket = socketRef.current;

    const _message: Partial<IMessage> = {
      chatId,
      sender: user._id.toString(),
      content: message,
      timestamp: Date.now(),
      metadata: {},
    };

    socket.emit(chatId.toString(), _message);

    e.currentTarget.reset();
  };

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {inParty ? (
        <div className={'flex-auto flex flex-col-reverse gap-6 overflow-auto px-5 pb-6'}>
          {messages.map((message, i) => {
            if (message.sender._id.toString() === user._id.toString())
              return <SenderBubble message={message} key={message._id.toString()} />;
            return <ReceiveBubble message={message} key={message._id.toString()} />;
          })}
        </div>
      ) : (
        <div className={`flex-auto flex flex-center text-center text-greyText`}>
          Send a join request to talk to the lobby ;D
        </div>
      )}
      <div
        className={'flex-shrink bg-dark-blue p-5'}
        style={{
          pointerEvents: inParty ? 'auto' : 'none',
        }}
      >
        <form className={'bg-medium-blue flex rounded-lg'} onSubmit={handleSendMessage}>
          <Input className={'!bg-transparent flex-grow'} name={'message'} />
          <Button buttonType={'transparent'} type={'submit'}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

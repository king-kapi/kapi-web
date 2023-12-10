import React, { useEffect, useRef, useState } from 'react';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { IMessagePopulated } from '@/src/models/Message';
import { useAtomValue } from 'jotai';
import meAtom from '@/src/atoms/meAtom';

export interface ChatProps extends React.ComponentPropsWithoutRef<'div'> {
  chatId: string;
  inParty?: boolean;
}

const Chat = ({ chatId, inParty = true, className, ...props }: ChatProps) => {
  const user = useAtomValue(meAtom);

  const socketRef = useRef<WebSocket>();
  const [messages, setMessages] = useState<IMessagePopulated[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}/api/chat`);

    socket.onopen = () => {
      console.log('socket opened');
      socketRef.current = socket;

      // send the initiate message
      socket.send(
        JSON.stringify({
          chatId,
        })
      );
    };

    socket.onmessage = message => {
      console.log('Received', message);
    };
  }, [chatId]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const socket = socketRef.current;
    if (!socket) return null;

    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    socket.send(
      JSON.stringify({
        senderId: user?._id || '',
        message,
      })
    );

    e.currentTarget.reset();
  };

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {inParty ? (
        <div className={'flex-auto flex flex-col-reverse gap-6 overflow-auto px-5 pb-6'}>
          {/*{messages.map((message, i) => {*/}
          {/*  if (message.sender._id.toString() === user._id.toString())*/}
          {/*    return <SenderBubble message={message} key={message._id.toString()} />;*/}
          {/*  return <ReceiveBubble message={message} key={message._id.toString()} />;*/}
          {/*})}*/}
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

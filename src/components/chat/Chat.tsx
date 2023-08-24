import React, { useEffect, useRef, useState } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket-events";
import { IMessage, IMessagePopulated } from "@/src/models/Message";
import { useAtomValue } from "jotai/index";
import { userAtom } from "@/src/atoms/userAtom";
import SenderBubble from "@/src/components/chat/SenderBubble";
import ReceiveBubble from "@/src/components/chat/ReceiveBubble";

export interface ChatProps extends React.ComponentPropsWithoutRef<"div"> {
  chatId: string;
}

const Chat = ({ chatId, className, ...props }: ChatProps) => {
  const user = useAtomValue(userAtom);

  const socketRef = useRef<Socket>();
  const [messages, setMessages] = useState<IMessagePopulated[]>([]);

  useEffect(() => {
    if (!chatId) return;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    socketRef.current = socket;
    fetch(`/api/chats/${chatId.toString()}/messages`)
      .then(res => res.json())
      .then((messages: IMessagePopulated[]) => {
        setMessages(messages);
      });

    socket.on("connect", () => {
      console.log(`Connected to chat ${chatId}`);
    });

    // listen for messages
    socket.on(chatId.toString(), (message) => {
      console.debug("Received message", message);
      setMessages(messages => [message, ...messages]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (!socketRef.current) return;
    const socket = socketRef.current;

    const _message: Partial<IMessage> = {
      chatId,
      sender: user._id.toString(),
      content: message,
      timestamp: Date.now(),
      metadata: {}
    };

    socket.emit(chatId.toString(), _message);

    e.currentTarget.reset();
  };

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <div className={"flex-auto flex flex-col-reverse gap-6 overflow-auto px-5 pb-6"}>
        {messages.map((message, i) => {
          if (message.sender._id.toString() === user._id.toString())
            return <SenderBubble message={message} key={message._id.toString()} />;
          return <ReceiveBubble message={message} key={message._id.toString()} />;
        })}
      </div>
      <div className={"flex-shrink bg-dark-blue p-5"}>
        <form className={"bg-medium-blue flex rounded-lg"} onSubmit={handleSendMessage}>
          <Input className={"!bg-transparent flex-grow"} name={"message"} />
          <Button buttonType={"transparent"} type={"submit"}>Send</Button>
        </form>
      </div>
    </div>);
};

export default Chat;
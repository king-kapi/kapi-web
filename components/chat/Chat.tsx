import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents } from "@/types/socket-events";
import Message from "@/src/types/Message";
import { IMessage } from "@/src/models/Message";

export interface ChatProps extends React.ComponentPropsWithoutRef<"div"> {
  chatId: string;
}

const Chat = ({ chatId, className, ...props }: ChatProps) => {
  const socketRef = useRef<Socket>();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatId) return;
    const socket: Socket<ServerToClientEvents> = io();
    socketRef.current = socket;
    // fetch(`/api/messages/${chatId.toString()}`)
    //   .then(res => res.json())
    //   .then((messages: Message[]) => {
    //     setMessages(messages);
    //   });

    socket.on("connect", () => {
      console.log(`Connected to chat ${chatId}`);
    });

    socket.on(chatId.toString(), (message: Message) => {
      setMessages(messages => [...messages, message]);
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

    const _message: IMessage = {
        chatId,
        sender: "alsdkfjhasldkjfh",
        content: message,
        timestamp: Date.now(),
        metadata: {}
      };

    socket.emit(chatId.toString(), _message);
  };

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <div className={"flex-auto"}>
        {messages.map((message, i) => (
          <div key={i}>
            {message.content}
          </div>
        ))}
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
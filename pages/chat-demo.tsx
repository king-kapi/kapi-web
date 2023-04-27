import Message from "@/src/types/Message";
import User from "@/src/types/User";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import { ObjectID } from "bson";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const getServerSideProps = protectedGetServerSideProps;

const ChatDemo = () => {
  const { data } = useSession();
  const [chatId, setChatId] = useState<ObjectID | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const chatIdRef = useRef(chatId);

  chatIdRef.current = chatId;
  const socket = socketRef.current;

  // initialize socket
  const socketInitializer = async () => {
    // await fetch('/api/chat/socket')

    const socket = io();

    socket.on('connect', () => {
      console.log(`connected ${socket.id}`);
    });

    socketRef.current = socket;
  }

  useEffect(() => {
    socketInitializer()
  }, []);

  const handleLoadChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setChatId(new ObjectID(formData.get("chatId") as string));
  }

  // listen for messages AND fetch previous messages
  useEffect(() => {
    if (!socket || !chatId) return;

    console.log(`Listening to ${chatId.toString()}`)

    fetch(`/api/messages/${chatId.toString()}`).then(res => res.json()).then((messages: Message[]) => {
      console.log('Fetched previous messages:', messages);
      setMessages(messages)
    });

    socket.on(chatId.toString(), (message: Message) => {
      console.log("Received message:", message);

      setMessages(messages => [...messages, message]);
    })
  }, [chatId, socket])

  // send messages
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket || !chatId) return;

    const formData = new FormData(e.currentTarget);

    console.log(`emitted message to ${chatId.toString()}`)
    socket.emit(chatId.toString(), {
      chatId,
      sender: data?.user as User,
      content: formData.get("content"),
      timestamp: Date.now(),
      metadata: {}
    } as Message);

    setMessage(""); // clear input
  }

  return (
    <div>
      <h1>Chat Demo</h1>

      <div>Currently logged in as <b>{data?.user.email}</b></div><br />

      <form onSubmit={handleLoadChat}>
        <label>
          Chat ID
        </label>
        <input name="chatId" type="text" defaultValue={"640bc5af1c9eea7488cef667"} />
        <button type="submit">Load</button>
      </form>

      {chatId ? <>
        <h3>Chat</h3>

        <div style={{ padding: 8, background: "#eee" }}>
          {messages.map(message => ( // TODO: extract this to message component
            <div key={message._id?.toString()}>
              <b>From: </b>{message.sender.email}<br />
              {message.content}
            </div>
          ))}
        </div>

        <br />

        <form onSubmit={handleSendMessage}>
          <input name="content" type="text" value={message}
            onInput={(e: React.FormEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)} />
          <button type="submit">Send</button>
        </form>
      </> : <></>}
    </div>
  )
}

export default ChatDemo;
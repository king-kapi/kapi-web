import Chat from "@/components/Chat";
import { toUser } from "@/src/types/User";
import UserProfile from "@/src/types/UserProfile";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import { ObjectID } from "bson";
import React, { useState } from "react";

export const getServerSideProps = protectedGetServerSideProps;

const ChatDemo = ({ user }: { user: UserProfile }) => {
  const [chatId, setChatId] = useState<ObjectID | null>(null);

  const handleLoadChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setChatId(new ObjectID(formData.get("chatId") as string));
  }

  return (
    <div>
      <h1>Chat Demo</h1>

      <div>Currently logged in as <b>{user.email}</b></div><br />

      <form onSubmit={handleLoadChat}>
        <label>
          Chat ID
        </label>
        <input name="chatId" type="text" defaultValue={"640bc5af1c9eea7488cef667"} />
        <button type="submit">Load</button>
      </form>

      {chatId ? <Chat chatId={chatId} user={toUser(user)} /> : <></>}
    </div>
  )
}

export default ChatDemo;
import Message from "@/src/types/Message";
import User from "@/src/types/User";
import { ServerToClientEvents } from "@/types/socket-events";
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Paper,
  Stack,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { ObjectId } from "bson";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: "color: #fff",
        root: {
          ":disabled": {
            color: "#999"
          }
        }
      }
    }
  }
});

const BubbleBase: React.FC<{
  side: "left" | "right";
  children: React.ReactNode;
}> = ({ side, children }) => {
  const rightBorderRadius = "10px 10px 3px 10px";
  const leftBorderRadius = "10px 10px 10px 3px";
  return (
    <div
      style={{
        color: "white",
        padding: "1rem",
        backgroundColor: side === "right" ? "#4567bf" : "#484b51",
        borderRadius: side === "right" ? rightBorderRadius : leftBorderRadius
      }}
    >
      {children}
    </div>
  );
};

const MessageBubble: React.FC<{ message: Message; side: "left" | "right" }> = ({
                                                                                 message,
                                                                                 side
                                                                               }) => {
  return (
    <Stack width={"100%"} alignItems={side === "right" ? "end" : "start"} direction={"column"}>
      <Stack
        sx={{ color: "white" }}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        spacing={2}
      >
        {side === "right" ? (
          <>
            <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
              {message.sender.username}
              <BubbleBase side={side}>{message.content}</BubbleBase>
            </Stack>
            <Avatar sx={{ bgcolor: "#8d8c8c" }}>
              {message.sender.username[0].toUpperCase() ?? "N"}
            </Avatar>
          </>
        ) : (
          <>
            <Avatar sx={{ bgcolor: "#8d8c8c" }}>
              {message.sender.username[0].toUpperCase() ?? "N"}
            </Avatar>
            <Stack direction="column" justifyContent="center" alignItems={"flex-start"} spacing={2}>
              {message.sender.username}
              <BubbleBase side={side}>{message.content}</BubbleBase>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};

const Chat: React.FC<{ chatId: string; user: User }> = ({ chatId, user }) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState("");
  // const socketRef = useRef<Socket>();
  // const socket = socketRef.current;
  // const endOfMessageStackRef = useRef<HTMLDivElement>(null); // dummy div used for auto scroll
  //
  // useEffect(() => {
  //   if (socketRef.current !== undefined) {
  //     return;
  //   }
  //   const newSocket: Socket<ServerToClientEvents> = io();
  //   socketRef.current = newSocket;
  //   fetch(`/api/messages/${chatId.toString()}`)
  //     .then(res => res.json())
  //     .then((messages: Message[]) => {
  //       setMessages(messages);
  //     });
  //   newSocket.on(chatId.toString(), (message: Message) => {
  //     setMessages(messages => [...messages, message]);
  //   });
  // }, [socket, chatId]);
  //
  // useEffect(() => {
  //   endOfMessageStackRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  //
  // const sendMessage = () => {
  //   if (socket === undefined) {
  //     return;
  //   }
  //   socket.emit(chatId.toString(), {
  //     chatId,
  //     sender: user,
  //     content: message,
  //     timestamp: Date.now(),
  //     metadata: {}
  //   });
  //   setMessage("");
  // };
  //
  // return (
  //   <div style={{ backgroundColor: "#181818", color: "white", padding: 10 }}>
  //     <Stack direction={"column"} spacing={1} overflow={"scroll"} maxHeight={"75vh"}>
  //       {messages.map((message, index) => (
  //         <MessageBubble
  //           message={message}
  //           key={index}
  //           side={message.sender._id.toString() === user._id.toString() ? "right" : "left"}
  //         />
  //       ))}
  //       <div ref={endOfMessageStackRef} />
  //     </Stack>
  //     <Paper
  //       component="form"
  //       sx={{
  //         p: "2px 4px",
  //         display: "flex",
  //         alignItems: "center",
  //         flex: 1,
  //         mt: 2,
  //         bgcolor: "#272a30",
  //         color: "#e2e4e9",
  //         minHeight: "5%"
  //       }}
  //     >
  //       <InputBase
  //         sx={{ ml: 1, flex: 1, bgcolor: "#272a30", color: "#e2e4e9" }}
  //         placeholder="Message this lobby"
  //         value={message}
  //         onChange={e => setMessage(e.target.value)}
  //       />
  //       <Divider sx={{ height: 28, m: 0.5, bgcolor: "#999" }} orientation="vertical" />
  //       <ThemeProvider theme={theme}>
  //         <Button sx={{ p: 1 }} onClick={sendMessage} disabled={message.length === 0}>
  //           Send
  //         </Button>
  //       </ThemeProvider>
  //     </Paper>
  //   </div>
  // );
  return null;
};

export default Chat;

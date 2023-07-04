import { Server } from "socket.io";
import Message from "./types/Message";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket-events";
import { Router } from "express";

export default function chatHandler(
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  const router = Router();

  io.on('connection', socket => {
    console.log(`[${socket.id}]: user connected`);
    socket.onAny(async (event, message: Message) => {
      console.log(`Got message on chatId ${event} and message content: ${message.content}`);

      // message._id = await instance.messages.pushMessage(message);

      io.emit(event, message);
    });
  });

  return router;
}

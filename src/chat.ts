import { Server } from "socket.io";
import Message from "./types/Message";
import MongoDatastore from "./datastore/MongoDatastore";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket-events";
import { PrismaClient } from "@prisma/client";

export default async function chatHandler(
  prisma: PrismaClient,
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  const instance = await MongoDatastore.getInstance();

  io.on('connection', socket => {
    console.log(`[${socket.id}]: user connected`);
    socket.onAny(async (event, message: Message) => {
      console.log(`Got message on chatId ${event} and message content: ${message.content}`);

      message._id = await instance.messages.pushMessage(message);

      io.emit(event, message);
    });
  });
}

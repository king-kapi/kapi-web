import { Server } from "socket.io";
import Message from "./types/Message";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket-events";
import { Router } from "express";
import Chat, { IChat } from "@/src/models/Chat";
import protectApiRoute from "@/src/utils/protectApiRoute";
import DoesNotExist from "@/src/errors/DoesNotExist";

export async function createChat(chat: Partial<IChat>) {
  if (!chat.users)
    throw new Error("Malformed users");

  return await Chat.create(chat);
}

export default function chatHandler(
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  const router = Router();

  router.post("/", async (req, res, next) => {
    try {
      const created = await createChat(req.body);
      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:chatId", async (req, res, next) => {
    try {
      await protectApiRoute(req, res);
      const { chatId } = req.params;

      const chat = await Chat.findById(chatId)
        .populate("users", "_id username tag bio status avatarColor")
        .exec();

      // if no chat
      if (!chat)
        throw new DoesNotExist(chatId, "chats");

      res.status(200).send(chat);
    } catch (err) {
      next(err);
    }
  });

  // socket logic
  io.on("connection", socket => {
    console.log(`[${socket.id}]: user connected`);
    socket.onAny(async (event, message: Message) => {
      console.log(`Got message on chatId ${event} and message content: ${message.content}`);

      // message._id = await instance.messages.pushMessage(message);

      io.emit(event, message);
    });
  });

  return router;
}

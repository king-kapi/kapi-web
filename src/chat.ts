import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket-events";
import { Router } from "express";
import Chat, { IChat } from "@/src/models/Chat";
import protectApiRoute from "@/src/utils/protectApiRoute";
import DoesNotExist from "@/src/errors/DoesNotExist";
import Message, { IMessage, IMessagePopulated } from "./models/Message";

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
        .populate("users", "_id username pronouns tag bio status avatarColor")
        .exec();

      // if no chat
      if (!chat)
        throw new DoesNotExist(chatId, "chats");

      res.status(200).send(chat);
    } catch (err) {
      next(err);
    }
  });

  // get all messages with chatId
  router.get("/:chatId/messages", async (req, res, next) => {
    try {
      await protectApiRoute(req, res);
      const { chatId } = req.params;

      const messages = await Message.find({
        chatId
      })
        .populate("sender", "_id username pronouns tag bio status avatarColor")
        .exec() as IMessagePopulated[];

      const sorted = messages.sort((a, b) => b.timestamp - a.timestamp);

      res.status(200).send(sorted);
    } catch (err) {
      next(err);
    }
  });

  // create message
  router.post("/:chatId/messages", async (req, res, next) => {
    try {
      await protectApiRoute(req, res);
      const { chatId } = req.params;

      const created = await Message.create({
        ...req.body,
        chatId
      });

      res.status(200).send(created);
    } catch (err) {
      next(err);
    }
  });

  // socket logic
  io.on("connection", socket => {
    console.log(`[${socket.id}]: user connected`);
    socket.onAny(async (chatId: string, message: IMessage) => {
      console.log(`Got message on chatId ${chatId} and message content: ${message.content}`);

      // create a message
      const created = await Message.create({
        ...message,
        chatId
      });

      const populated = await Message.findById({
        _id: created._id
      }).populate("sender", "_id username pronouns tag bio status avatarColor");

      io.emit(chatId, populated);
    });
  });

  return router;
}

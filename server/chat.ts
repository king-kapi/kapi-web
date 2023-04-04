import { Express } from 'express';
import { Server } from 'socket.io';
import Message from '../src/models/Message';
import MongoDatastore from '../src/datastore/MongoDatastore'

export default async function chatHandler(app: Express, io: Server) {
  const instance = await MongoDatastore.getInstance();

  io.on('connection', socket => {
    console.log(`[${socket.id}]: user connected`);

    socket.onAny(async (event, message: Message) => {
      console.log(`Got message on chatId ${event} and message content: ${message.content}`)

      message._id = await instance.messages.pushMessage(message);

      io.emit(event, message);
    })
  });
}
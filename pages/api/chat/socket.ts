import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'
import Message from '@/src/models/Message'
import MongoDatastore from '@/src/datastore/MongoDatastore'

// https://stackoverflow.com/questions/74023393/working-with-typescript-next-js-and-socket-io
interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

const SocketHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing')
    const instance = await MongoDatastore.getInstance();
    const io = new IOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log(`a user connected ${socket.id}`)

      socket.onAny(async (event, message: Message) => {
        console.log(`Got message on chatId ${event} and message content: ${message.content}`)

        message._id = await instance.messages.pushMessage(message);

        io.emit(event, message);
      })
    });

    io.on('disconnect', () => {
      console.log('a user disconnected');
    })

  }
  res.end()
}

export default SocketHandler
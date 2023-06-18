import Message from '@/src/types/Message';
import { Server as IOServer } from 'socket.io';

/**
 * Events that the server emits and the client listens for
 */
interface ServerToClientEvents {
  connect: () => void;
  [chatId: string]: (message: Message) => void;
}

/**
 * Events that the client emits and the server listens
 */
interface ClientToServerEvents {
  connection: (socket: IOServer) => void;
}

export type { ServerToClientEvents, ClientToServerEvents };

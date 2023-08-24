import { IMessage, IMessagePopulated } from "@/src/models/Message";

/**
 * Events that the server emits and the client listens for
 */
interface ServerToClientEvents {
  connect: () => void;

  [chatId: string]: (message: IMessagePopulated) => void;
}

/**
 * Events that the client emits and the server listens
 */
interface ClientToServerEvents {
  [chatId: string]: (message: Partial<IMessage>) => void;
}

export type { ServerToClientEvents, ClientToServerEvents };

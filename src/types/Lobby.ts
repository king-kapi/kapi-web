import { ILobbyRequestPopulated } from '@/src/models/LobbyRequest';
import User from './User';

type Lobby = {
  _id: string;
  name: string;
  game?: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description?: string;
  requests: {
    _id: string;
    sender: string;
    message: string;
  }[];
  users: string[];
  chatId?: string;
};

export type LobbyPopulated = Lobby & {
  requests: ILobbyRequestPopulated[];
  users: User[];
};

export default Lobby;

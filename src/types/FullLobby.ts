import { ObjectId } from 'mongodb';
import User from './User';
import Game from './Games';

type Lobby = {
  _id: ObjectId;
  game: Game;
  chatId: ObjectId;
  host: User;
  users: User[];
  resolvedRequests: LobbyRequestWithUser[];
  requests: LobbyRequestWithUser[];
  maxSize: number;
};

type LobbyRequestWithUser = {
  _id: string;
  sender: User;
  message?: string;
};

export default Lobby;

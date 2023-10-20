import { ObjectId } from "mongodb"
import User from "./User"
import LobbyRequest from "./LobbyRequest"
import Game from "./Games"

type Lobby = {
  _id: ObjectId,
  game: Game,
  chatId: ObjectId,
  host: User,
  users: string,
  resolvedRequests: LobbyRequest[],
  requests: LobbyRequest[],
  maxSize: number
}

export default Lobby;
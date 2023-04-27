import { ObjectId } from "mongodb"
import Lobby from "./Lobby"
import User from "./User"

type LobbyRequest = {
  sender: User,
  receiver: User,
  partyId: ObjectId
}

export type LobbyRequestWithLobby = LobbyRequest & {
  party?: Partial<Lobby>
}

export default LobbyRequest;
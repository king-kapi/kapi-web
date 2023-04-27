import { ObjectId } from "mongodb"
import User from "./User"
import PartyRequest from "./PartyRequest"

type Party = {
  _id: ObjectId,
  game: string, // TODO: change this to a type, SOMETHING
  host: User,
  users: User[],
  requests: PartyRequest[],
  maxSize: number
}

export default Party;
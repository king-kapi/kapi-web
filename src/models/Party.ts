import { ObjectId } from "mongodb"
import User from "./User"

type Party = {
  _id?: ObjectId,
  game: string, // TODO: change this to a type, SOMETHING
  host: User,
  users: User[],
  maxSize: number
}

export default Party;
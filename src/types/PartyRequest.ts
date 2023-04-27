import { ObjectId } from "mongodb"
import Party from "./Party"
import User from "./User"

type PartyRequest = {
  sender: User,
  receiver: User,
  partyId: ObjectId
}

export type PartyRequestWithParty = PartyRequest & {
  party?: Partial<Party>
}

export default PartyRequest;
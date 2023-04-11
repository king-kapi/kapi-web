import { ObjectId, WithId } from "mongodb"
import Party from "./Party"
import User from "./User"

type PartyRequest = {
  sender: WithId<User>,
  receiver: WithId<User>,
  partyId: ObjectId,
  party?: Partial<Party>
}

export default PartyRequest;
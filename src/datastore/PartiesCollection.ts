import { Collection, ObjectId } from 'mongodb';
import Result, { Err, Ok } from '../Result';
import { AlreadyInPartyError, NotInPartyError } from '../errors/PartyErrors';
import OmitId from '../types/OmitId';
import Party from '../types/Party';
import PartyRequest from '../types/PartyRequest';
import User from '../types/User';
import MongoDatastore from './MongoDatastore';

class PartiesCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  // list all parties that exist
  // TODO: consider adding filtering on server side
  async all(): Promise<Party[]> {
    return (await this.col.find({}).toArray()) as Party[];
  }

  // get a specific party
  async get(id: ObjectId): Promise<Party> {
    return await this.col.findOne({
      _id: id
    }) as Party;
  }

  // create a new party
  async create(party: OmitId<Party>): Promise<Party> {
    const created = await this.col.insertOne(party);

    return {
      ...party,
      _id: created.insertedId
    }
  }

  // join a party
  async join(partyId: ObjectId, userId: ObjectId): Promise<Result<null, AlreadyInPartyError>> {
    const party = await this.get(partyId);

    for (const user of party.users) {
      if (user._id === userId)
        return Err(new AlreadyInPartyError(partyId, userId));
    }

    await this.col.updateOne({
      _id: partyId
    }, {
      $push: {
        "users": await this.instance.users.getUser(userId)
      }
    });

    return Ok(null);
  }

  // leave a party
  async leave(partyId: ObjectId, userId: ObjectId): Promise<Result<null, NotInPartyError>> {
    const party = await this.get(partyId);

    let userFound = false;
    for (const user of party.users) {
      if (user._id?.toString() === userId.toString()) {
        userFound = true;
        break;
      }
    }

    if (!userFound)
      return Err(new NotInPartyError(partyId, userId));

    await this.col.updateOne({
      _id: partyId
    }, {
      $pull: {
        "users": {
          _id: userId
        }
      }
    });

    return Ok(null);
  }

  // delete a party
  async delete(partyId: ObjectId): Promise<void> {
    await this.col.deleteOne({
      _id: partyId
    });
  }

  // add a request
  // TODO: check max party size
  async addRequest(partyId: ObjectId, senderId: ObjectId, receiverId: ObjectId): Promise<void> {
    const request: PartyRequest = {
      sender: await this.instance.users.getUser(senderId) as User, // TODO: refractor user model
      receiver: await this.instance.users.getUser(receiverId) as User,
      partyId
    }

    await this.col.updateOne({
      _id: partyId
    }, {
      $push: {
        "requests": request
      }
    });

    await this.instance.users.addPartyRequest(receiverId, {
      ...request,
      party: await this.get(partyId)
    });
  }

  // remove a request
  // TODO: check if request actually exists
  async removeRequest(partyId: ObjectId, receiverId: ObjectId): Promise<void> {
    console.log(receiverId);
    await this.col.updateOne({
      _id: partyId
    }, {
      $pull: {
        "requests": {
          "receiver._id": receiverId
        }
      }
    });
    await this.instance.users.removePartyRequest(receiverId, partyId);
  }
}

export default PartiesCollection;

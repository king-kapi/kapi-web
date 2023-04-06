import { Collection, ObjectId } from 'mongodb';
import Post from '../models/Post';
import MongoDatastore from './MongoDatastore';
import Party from '../models/Party';
import { AlreadyInPartyError, NotInPartyError } from '../errors/PartyErrors';
import Result, { Err, Ok } from '../Result';

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
  async create(party: Party): Promise<Party> {
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
}

export default PartiesCollection;

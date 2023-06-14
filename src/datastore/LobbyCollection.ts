import { Collection, ObjectId } from 'mongodb';
import Result, { Err, Ok } from '../Result';
import { AlreadyInPartyError, NotInPartyError } from '../errors/LobbyErrors';
import Lobby from '../types/Lobby';
import LobbyRequest from '../types/LobbyRequest';
import User from '../types/User';
import MongoDatastore from './MongoDatastore';

class LobbyCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  // list all lobbies that exist
  // TODO: consider adding filtering on server side
  async all(): Promise<Lobby[]> {
    return (await this.col.find({}).toArray()) as Lobby[];
  }

  // get a specific lobby
  async get(id: ObjectId): Promise<Lobby> {
    return await this.col.findOne({
      _id: id
    }) as Lobby;
  }

  // create a new lobby
  async create(party: Omit<Lobby, "_id" | "chatId">): Promise<Lobby> {
    // create a chat

    const chatId = (await this.instance.chats.createChat([party.host]))._id;

    const newLobby: Lobby = {
      ...party,
      chatId,
      _id: new ObjectId
    }
    const { insertedId } = await this.col.insertOne(newLobby);
    const createdLobby = {
      ...newLobby,
      _id: insertedId,
    }

    // insert into the user
    await this.instance.users.update(createdLobby.host._id, {
      currentLobby: insertedId
    });

    return {
      ...newLobby,
      _id: insertedId
    }
  }

  // join a lobby
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

  // leave a lobby
  async leave(partyId: ObjectId, userId: ObjectId): Promise<Result<null, NotInPartyError>> {
    const lobby = await this.get(partyId);

    let userIndex = -1;
    for (let i = 0; i < lobby.users.length; i++) {
      if (lobby.users[i]._id.toString() === userId.toString()) {
        userIndex = i;
        break;
      }
    }

    console.log(userIndex);

    if (userIndex < 0)
      return Err(new NotInPartyError(partyId, userId));

    const newUsers = [...lobby.users];
    newUsers.splice(userIndex);

    // if no more users left, remove
    if (newUsers.length === 0)
      await this.delete(partyId);
    else {
      await this.col.updateOne({
        _id: partyId
      }, {
        $set: {
          "users": newUsers
        }
      });
    }

    await this.instance.users.leaveLobby(userId);

    return Ok(null);
  }

  // delete a lobby
  async delete(partyId: ObjectId): Promise<void> {
    await this.col.deleteOne({
      _id: partyId
    });
  }

  // add a request
  // TODO: check max lobby size
  async addRequest(partyId: ObjectId, senderId: ObjectId, receiverId: ObjectId): Promise<void> {
    const request: LobbyRequest = {
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

    const party: Partial<Lobby> = await this.get(partyId);
    delete party.requests;

    await this.instance.users.addPartyRequest(receiverId, {
      ...request,
      party
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

export default LobbyCollection;

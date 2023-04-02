import { Collection, ObjectId } from 'mongodb';
import MongoDatastore from './MongoDatastore';
import { JoinLobbyRequest, JoinRequestState } from '../models/Lobby';
import { User } from 'next-auth';

class LobbyCollection {
  constructor(private col: Collection<JoinLobbyRequest<any>>, private mongo: MongoDatastore) {}

  async all<T extends JoinRequestState>(state?: T): Promise<JoinLobbyRequest<T>[]> {
    return await this.col
      .find(
        state
          ? {
              state: 'pending',
            }
          : {}
      ) // if state is specified, pass it in as the filter, otherwise return all
      .toArray();
  }

  async createJoinRequest(request: JoinLobbyRequest<'pending'>): Promise<ObjectId> {
    const inserted = await this.col.insertOne(request);
    return inserted.insertedId;
  }

  async decideJoinRequest(
    requestId: ObjectId,
    approver: User,
    decision: Exclude<JoinRequestState, 'pending'>
  ): Promise<void> {
    const request = await this.col.findOne({ id: requestId });
    if (!request) {
      return; // 
    }
  }
}

export default LobbyCollection;

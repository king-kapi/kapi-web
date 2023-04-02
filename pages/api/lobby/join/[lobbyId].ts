import MongoDatastore from '@/src/datastore/MongoDatastore';
import { JoinLobbyRequest, Lobby } from '@/src/models/Lobby';
import type User from '@/src/models/User';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: A family of these type of results is needed
// otherwise everyone is throwing different errors
type Result<T> = T | { error: '405 Method Not Allowed.' };

async function joinLobbyById(
  request: NextApiRequest,
  response: NextApiResponse<Result<JoinLobbyRequest<'pending'>>>
) {
  if (request.method !== 'POST') {
    response.status(405).send({
      error: '405 Method Not Allowed.',
    });
    return;
  }
  const mongo = await MongoDatastore.getInstance();

}

export default joinLobbyById;

import MongoDatastore from '@/src/datastore/MongoDatastore';
import { Lobby } from '@/src/models/Lobby';
import type User from '@/src/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';

// The request here is analogous to 'request' in 'friend request'
// not an http request
type JoinLobbyRequest = {
  /** Who made the join request */
  applicant: User;
  /** When the request is made, unix timestamp */
  timestamp: number;
  /** The application message, optional  */
  message?: string;
  /** which lobby to join */
  targetLobby: Lobby;
};

type JoinLobbyResponse = {
  /** Decision by the lobby owner or an admin */
  decision: 'approve' | 'deny' | 'ignored';
  /** Optional welcome message to display, or reason of rejection */
  reasonOrWelcome?: string;
  /** who approved the request */
  approver: User;
  /** when the request is approved */
  timestamp: number;
};

// TODO: A family of these type of results is needed
// otherwise everyone is throwing different errors
type Result<T> = T | { error: '405 Method Not Allowed.' };

async function joinLobbyById(
  request: NextApiRequest,
  response: NextApiResponse<Result<JoinLobbyRequest>>
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

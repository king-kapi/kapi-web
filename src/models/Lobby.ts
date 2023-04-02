import { ObjectId } from 'mongodb';
import User from './User';

// TODO: We need to consider how game roles are represented
// this cannot be just a string, it's a placeholder for now
type RoleResolvable = string;
// same issue here, can Tags be inferred from preferences?
type LobbyTagResolvable = string;

type GameResolvable = ObjectId;

// placeholder types end -----

type CreationPreferences = {
  matchWithOwnerProfile: boolean;
  partyStyle: 'casual' | 'competitive' | 'no preference';
  timezone: Intl.Locale; // placeholder, will change depending on which lib we use
  tags: LobbyTagResolvable[];
};

type Lobby = {
  /** name of the lobby */
  name: string;
  /** Creator of the lobby, for now we don't consider transferring ownerships */
  owner: LobbyMember;
  /** Members of the lobby, lobby size is the length of the array */
  members: LobbyMember[];
  /** What game are they playing? */
  game: GameResolvable;
  /** Description of the lobby, optional */
  description?: string;
} & CreationPreferences;

type LobbyMember = {
  lobby: Lobby; // backref
  user: User; // backref
  nickname?: string;
  /** What role does this member play in the game of the lobby */
  role?: RoleResolvable;
  /** How experienced is this member */
  experienceLevel?: number;
};

type UnixTimestamp = number;

type JoinRequestState = 'approved' | 'deny' | 'pending';

// The request here is analogous to 'request' in 'friend request'
// not an http request
type JoinLobbyRequest<StateT extends JoinRequestState> = {
  /** Id of this request */
  id: ObjectId;
  /** Who made the join request */
  applicant: User;
  /** When the request is made, unix timestamp */
  applyTimestamp: UnixTimestamp;
  /** The application message, optional  */
  message?: string;
  /** which lobby to join */
  targetLobby: Lobby;
  /** Decision by the lobby owner or an admin */
  state: StateT;
  /** Optional welcome message to display, or reason of rejection */
  reasonOrWelcome?: string;
  /** who approved/denied the request */
  decisionMaker?: User;
  /** when the request is approved, unix timestamp */
  approvalTimestamp: UnixTimestamp;
};

export type { Lobby, CreationPreferences, LobbyMember, JoinLobbyRequest, JoinRequestState };

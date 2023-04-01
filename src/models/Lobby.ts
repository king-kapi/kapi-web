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
  name: string;
  /** Creator of the lobby, for now we don't consider transferring ownerships */
  owner: LobbyMember;
  /** Members of the lobby, lobby size is the length of the array */
  members: LobbyMember[];
  /** What game are they playing? */
  game: GameResolvable;
  description: string;
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

export type { Lobby, CreationPreferences, LobbyMember };

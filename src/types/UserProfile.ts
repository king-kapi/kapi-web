import { ObjectId } from "mongodb";
import UserStatus from "../enums/UserStatus";
import Community from "./Community";
import Game from "./Games";
import InterestTag from "./InterestTag";
import { LobbyRequestWithLobby } from "./LobbyRequest";
import OmitId from "./OmitId";
import User from "./User";

// TODO: change this to a class
// UserProfile will hold ALL the information that is available about the user
// and is intended to also contain much more private information
interface UserProfile {
  _id: ObjectId;
  email: string;
  username: string;
  tag: string;
  image: string;
  bio: string;
  interests: InterestTag[];
  games: {
    [n: Game]: object
  };
  friendRequests: [];
  friends: User[];
  status: UserStatus;
  currentLobby: ObjectId | null;
  lobbyRequests: LobbyRequestWithLobby[];
  communities: Community[];
  newUser: boolean;
}

export const BLANK_USER_PROFILE: OmitId<UserProfile> = {
  email: "",
  username: "",
  tag: "",
  image: "",
  bio: "",
  interests: [],
  games: {},
  friendRequests: [],
  friends: [],
  status: UserStatus.OFFLINE,
  currentLobby: undefined,
  lobbyRequests: [],
  communities: [],
  newUser: true
}

export default UserProfile;
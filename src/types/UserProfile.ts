import { ObjectId, WithId } from "mongodb";
import UserStatus from "../enums/UserStatus";
import InterestTag from "./InterestTag";
import User from "./User";
import LobbyRequest from "./LobbyRequest";
import Game from "./Games";
import Community from "./Community";
import OmitId from "./OmitId";

// UserProfile will hold ALL the information that is available about the user
// and is intended to also contain much more private information
interface UserProfile extends User {
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
  currentLobby: ObjectId | undefined;
  partyRequests: LobbyRequest[];
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
  partyRequests: [],
  communities: [],
  newUser: true
}

export default UserProfile;
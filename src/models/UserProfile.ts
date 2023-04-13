import { ObjectId } from "mongodb";
import UserStatus from "../enums/UserStatus";
import Friend from "./Friend";
import InterestTag from "./InterestTag";
import { PartyRequestWithParty } from "./PartyRequest";
import User from "./User";

interface UserProfile {
  _id?: ObjectId;
  email: string;
  username: string;
  tag: string;
  friends: Friend[];
  bio: string;
  interests: InterestTag[];
  avatar: string;
  status: UserStatus;
  partyRequests: PartyRequestWithParty[];
  friendRequests: [];
}

// export function stripUser(profile: UserProfile): User {
//   return {
//     _id: profile._id,
//     email: profile.email,
//     username: profile.username,
//     tag: profile.tag,
//     friends: profile.friends
//   }
// }

export default UserProfile;
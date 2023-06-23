import { model, models, Schema } from "mongoose";
import UserStatus from "@/src/enums/UserStatus";

export interface IUser {
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: number;
  onboarded: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  tag: { type: String, default: "" },
  bio: { type: String, default: "I'm a bio!" },
  status: { type: Number, default: UserStatus.OFFLINE },
  onboarded: { type: Boolean, default: false }
});

export const USER_MODEL_NAME = "User";
const User = models.User || model<IUser>(USER_MODEL_NAME, userSchema);

export default User;

// model User {
//   id String @id @default(auto()) @map("_id") @db.ObjectId
//   // next-auth required fields
//
//   name          String?
//     email         String?   @unique
//       emailVerified DateTime? @map("email_verified")
//     image         String?
//     accounts      Account[]
//   sessions      Session[]
//   // extending model
//   username      String    @default("")
//   tag           String    @default("")
//   bio           String    @default("")
//   status        String    @default("")
//   currentLobby  String?   @db.ObjectId
//
//     friendOf   User?   @relation("Friend", fields: [friendOfId], references: [id], onDelete: NoAction, onUpdate: NoAction)
//   friendOfId String? @db.ObjectId
//     friends    User[]  @relation("Friend")
//
//   newUser Boolean?
//     lobby   Lobby?    @relation(fields: [lobbyId], references: [id])
//   lobbyId String?   @db.ObjectId
//     Message Message[]
//
//   sentLobbyRequests     LobbyRequest[] @relation("SentRequests")
//   receivedLobbyRequests LobbyRequest[] @relation("ReceivedRequests")
//
// @@map("users")
// }
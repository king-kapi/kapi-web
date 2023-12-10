import Lobby from "@/src/types/Lobby";

// type Lobby = {
//   _id: string;
//   game: Game;
//   chatId: string;
//   hostId: string;
//   name: string;
//   description: string;
//   users: User[];
//   resolvedRequests: LobbyRequestWithUser[];
//   requests: LobbyRequestWithUser[];
//   maxSize: number;
// };

// type LobbyRequestWithUser = {
//   _id: string;
//   sender: User;
//   message?: string;
// };

type FullLobby = Lobby;

export default FullLobby;

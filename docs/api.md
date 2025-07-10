# API  (Last Updated 9/10/2023)

## Categories

## Chats

### `POST`: `/api/chats`

Creates a new chat with request parameters

```typescript
type Request = {
  name?: string;
  users?: string[]; // user ids
  color?: string;
}
```

```typescript
type Response = {
  _id: string;
  name?: string;
  users?: string[]; // user ids
  color?: string;
}
```

### `POST`: `/api/:chatId`

Fetch a chat with id `chatId`

```typescript
type Response = {
  _id: string;
  name?: string;
  users?: string[]; // user ids
  color?: string;
}
```

### TODO socket behavior

## Users

### `GET`: `/api/users`

Get all users

```typescript
type Response = {
  _id: string;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
  friends: string[]; // ids
  games: string[]; // id
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  language: string;
  timezone: string;
  avatarColor: string;
  lobby?: string; // id
  onboarded: boolean;
}[]
```

### `GET`: `/api/current`

Get user information of the user that made the request (when signed in)

```typescript
type Response = {
  _id: string;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
  friends: string[]; // ids
  games: string[]; // id
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  language: string;
  timezone: string;
  avatarColor: string;
  lobby?: string; // id
  onboarded: boolean;
}
```

### `GET`: `/api/:userId/status`

Get status of user with id `userId`

```typescript
type Response = {
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
}
```

### `GET`: `/api/status`

Get status of current user (this may no longer work)

```typescript
type Response = {
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
}
```

### `POST`: `/api/status`

Set status of current user

```typescript
type Request = {
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
}
```

```typescript
type Response = {
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
}
```

### `GET`: `/api/friends`

Get friends of current user

```typescript
type Response = {
  _id: string;
  username?: string;
  tag?: string;
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  status?: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
  bio?: string;
}[]
```

### `POST`: `/api/friends`

```typescript
type Request = {
  friendId: string;
}
```

```typescript
type Response = {
  _id: string;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
  friends: string[]; // ids
  games: string[]; // id
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  language: string;
  timezone: string;
  avatarColor: string;
  lobby?: string; // id
  onboarded: boolean;
}
```

### `POST`: `/api/onboard`

Onboard a user

```typescript
type Request = {
  username: string;
  games: string[]; // id
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  language: string;
  timezone: string;
  avatarColor: string;
}
```

```typescript
type Response = {
  _id: string;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
  friends: string[]; // ids
  games: string[]; // id
  pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  language: string;
  timezone: string;
  avatarColor: string;
  lobby?: string; // id
  onboarded: boolean;
}
```

## Lobbies

### `GET`: `/api/lobbies`

Get all lobbies

```typescript
type Response = {
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  users: string[]; // ids
  chat: string; // id
}[]
```

### `POST`: `/api/lobbies`

Create new lobby

```typescript
type Request = {
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  users: string[]; // ids
  chat: string; // id
}[]
```

```typescript
type Response = {
  name: string;
  game: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  chat: string; // id
}
```

### `GET`: `/api/lobbies/:lobbyId`

Get lobby details with id `lobbyId` (this may be inaccurate)

```typescript
type Response = {
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: {
    _id: string;
    sender: {
      _id: string;
      username?: string;
      tag?: string;
      pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
      status?: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
      bio?: string;
    },
    message: string
  }[]; // ids
  users: {
    _id: string;
    username?: string;
    tag?: string;
    pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
    status?: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
    bio?: string;
  }[];
  chat: string; // id
}
```

### `DELETE`: `/api/lobbies/:lobbyId`

Delete lobby with id `lobbyId`

```typescript
type Response = "Successful"
```

### `POST`: `/api/lobbies/:lobbyId/kick`

Kicks user with id `kickedId` from lobby with id `lobbyId`

```typescript
type Request = {
  kickedId: string; // id
}[]
```

```typescript
type Response = {
  name: string;
  game: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  chat: string; // id
}
```

### `POST`: `/api/lobbies/:lobbyId/request`

Create a lobby request with the sender id set as the user who made this request for a specific lobby with id `lobbyId`

```typescript
type Request = {
  message: string
}
```

```typescript
type Response = { // updated lobby
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: {
    _id: string;
    sender: {
      _id: string;
      username?: string;
      tag?: string;
      pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
      status?: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
      bio?: string;
    },
    message: string
  }[]; // ids
  users: {
    _id: string;
    username?: string;
    tag?: string;
    pronouns: Pronouns; // HE_HIM (he-him), SHE_HER (she-her), THEY_THEM (they-them)
    status?: UserStatus; // ACTIVE (0), IDLE (1), DO_NOT_DISTRUB (2), OFFLINE (3)
    bio?: string;
  }[];
  chat: string; // id
}
```

### `POST`: `/api/lobbies/:lobbyId/request/:requestId/accept`

Host accepts request with request id `requestId` for lobby with id `lobbyId`

```typescript
type Response = { // updated lobby
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  users: string[]; // ids
  chat: string; // id
}
```

### `POST`: `/api/lobbies/:lobbyId/request/:requestId/deny`

Host denies request with request id `requestId` for lobby with id `lobbyId`

```typescript
type Response = { // updated lobby
  _id: string;
  name: string;
  game: string;
  hostId: string;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: string[]; // ids
  users: string[]; // ids
  chat: string; // id
}
```

## Tags

### `GET`: `/api/tags`

Get all tags

```typescript
type Response = {
  _id: string;
  name: string;
  rainbow: boolean;
}[]
```

### `POST`: `/api/tags`

Create tag

```typescript
type Request = {
  name: string;
  rainbow: boolean;
}
```

```typescript
type Response = {
  _id: string;
  name: string;
  rainbow: boolean;
}
```

### `DELETE`: `/api/tags/:tagId`

Delete tag with id `tagId`

```typescript
type Response = "Successful"
```

## Games

### `GET`: `/api/games`

Get all tags

```typescript
type Response = {
  _id: string;
  name: string;
  image: string;
  numPlayers: number[];
}[]
```

### `POST`: `/api/games`

Create game

```typescript
type Request = {
  name: string;
  image: string;
  numPlayers: number[];
}
```

```typescript
type Response = {
  _id: string;
  name: string;
  image: string;
  numPlayers: number[];
}
```

### `DELETE`: `/api/games/:gameId`

Delete tag with id `gameId`

```typescript
type Response = "Successful"
```

## Template

### ``: `/api/`

```typescript
type Request = {}
```

```typescript
type Response = {}
```
import type User from '@/src/models/User';
import { Unstable_Grid2 as Grid2, Paper, Avatar, Button, Box, Stack } from '@mui/material';
import { useState } from 'react';

/**
 * Type alias that omits all the id's
 */
type MockUser = {
  [K in keyof User]: User[K] extends unknown[]
    ? Omit<User[K][number], 'id' | '_id'>[]
    : Omit<User[K], 'id' | '_id'>;
};
type PostProps = {
  user: MockUser;
  body: string;
  imageURLs: string[];
  timestamp: Date;
};

const mockUser: MockUser = {
  email: 'someEmail@mail.com',
  username: 'johndoe66222',
  tag: '@LMAO',
  bio: 'Some bio',
  interests: [{ name: 'interest 1' }, { name: 'interest 2' }],
  avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg', // cat pfp
  friends: [{ username: 'Jane Doe' }],
  displayName: 'John Doe',
};

const mockProps: PostProps = {
  user: mockUser,
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  imageURLs: [],
  timestamp: new Date(2023, 2, 17),
};

function fromDateToRelativeTime(date: Date): Intl.RelativeTimeFormat {
  const relativeTime = new Intl.RelativeTimeFormat('en', { style: 'short' });
  return relativeTime;
}

/**
 * A post inside the user's timeline TODO: where will the timeline be? this is needed for routing
 * @param props
 * @returns
 */
function Post({ user, body, imageURLs }: PostProps) {
  return (
    <Grid2 container spacing={1}>
      <Grid2 xs={1}>
        <Avatar>AA</Avatar>
      </Grid2>
      <Grid2 xs={11}>
        <div>
          <b>{user.displayName}</b> @{user.username} • 2 days ago
        </div>
        <div>This server name</div>
      </Grid2>

      <Grid2 xs={12}>
        <Paper sx={{ p: 2 }}>{body}</Paper>
      </Grid2>

      <Grid2 xs={12}>
        <Stack direction="row-reverse" spacing={2}>
          <Button variant="outlined">Comment</Button>
          <Button variant="outlined">Like</Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

function TimeLine() {
  return (
    <Box style={{ width: '50vw' }}>
      <Post {...mockProps} />
    </Box>
  );
}

export default TimeLine;

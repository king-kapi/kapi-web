import type User from '@/src/models/User';
import { ObjectId } from 'mongodb';
import { useState } from 'react';

type PostProps = {
  user: User;
  body: string;
  imageURLs: string[];
};

const mockUser: User = {
  email: 'someEmail@mail.com',
  username: 'John Doe',
  tag: '@LMAO',
  bio: 'Some bio',
  interests: [
    { _id: new ObjectId(), name: 'interest 1' },
    { _id: new ObjectId(), name: 'interest 2' },
  ],
  avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg', // cat pfp
  friends: [{ id: new ObjectId(), username: 'Jane Doe' }],
};

const mockProps: PostProps = {
  user: mockUser,
  body: '',
  imageURLs: [],
};

/**
 * A post inside the user's timeline TODO: where will the timeline be? this is needed for routing
 * @param props
 * @returns
 */
function Post({ user, body, imageURLs }: PostProps) {
  return (
    <div>
      <div>{user.username}</div> {/** User row */}
      <div></div>
      <div></div>
    </div>
  );
}

function TimeLine() {
  return <Post {...mockProps} />;
}

export default TimeLine;

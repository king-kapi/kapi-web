import React from 'react';
import WithUser from '@/src/components/misc/WithUser';
import Avatar from '../Avatar';

export interface AvatarStackProps {
  avatarsColors: (string | undefined)[];
}

const AvatarCircle = ({ color }: { color: string | undefined }) => (
  <Avatar className={'w-[2.5rem] h-[2.5rem] rounded-full border-2 border-grey'} c={color} />
);

const AvatarStack = ({ avatarsColors }: AvatarStackProps) => {
  return (
    <div className={'flex -space-x-2.5'}>
      {avatarsColors.map((color, i) => (
        <AvatarCircle color={color} key={i} />
      ))}
    </div>
  );
};

export const AvatarStackFromUsers = ({ userIds }: { userIds: string[] }) => {
  return (
    <div className={'flex -space-x-2.5'}>
      {userIds.map(userId => (
        <WithUser userId={userId} key={userId}>
          {user => <AvatarCircle color={user.avatarColor} />}
        </WithUser>
      ))}
    </div>
  );
};

export default AvatarStack;

import Avatar, { AvatarProps } from '@/src/components/Avatar';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type AvatarWithStatusProps = AvatarProps & {
  status: 'online' | 'idle' | 'offline';
};

const AvatarWithStatus = ({ status, className, ...props }: AvatarWithStatusProps) => {
  return (
    <Avatar className={twMerge('relative', className)} {...props}>
      <div
        className={twMerge(
          'absolute -bottom-0.5 -right-0.5 w-5 h-5 border-solid border-2 border-mediumGrey rounded-full',
          status === 'online' && 'bg-status-green',
          status === 'idle' && 'bg-yellow-500',
          status === 'offline' && 'bg-status-red'
        )}
      />
    </Avatar>
  );
};

export default AvatarWithStatus;

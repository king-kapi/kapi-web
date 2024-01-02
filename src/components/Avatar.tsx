import React from 'react';
import KapiTransparent from '../../assets/images/kapi_transparent.png';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  c: string | undefined;
  size?: string;
}

const Avatar = ({ c = '#fff', size = '3.75rem', className, children }: AvatarProps) => {
  return (
    <div
      className={twMerge(
        `flex justify-center items-center rounded-full aspect-square w-[${size}]`,
        className
      )}
      style={{
        backgroundColor: c,
      }}
    >
      <Image src={KapiTransparent} alt={'Kapi'} className={'w-[77.6%]'} />
      {children}
    </div>
  );
};

export default Avatar;

import PlaceholderImage from '@/src/components/misc/PlaceholderImage';
import Tag from '@/src/components/Tag';
import styles from './CommunityCard.module.css';
import React from 'react';
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export type CommunityCardProps = React.ComponentPropsWithoutRef<'div'>;

const CommunityCard = ({ className, ...props }: CommunityCardProps) => {
  const router = useRouter();

  return (
    <div className={twMerge(styles.CommunityCard, className)} onClick={() => {
      router.push("/community/dummy-id");
    }} {...props}>
      <PlaceholderImage />
      <div className={styles.CommunityCardText}>
        <div className={'flex justify-between items-center'}>
          <h3>Community Name</h3>
          <p>207 members</p>
        </div>
        <div className={'mt-6'}>
          <Tag>POC Friendly</Tag>
          <Tag>LGBTQ+ Friendly</Tag>
          <Tag>+2 More</Tag>
        </div>
        <p className={'mt-6'}>
          Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          al
        </p>
      </div>
    </div>
  );
};

export default CommunityCard;

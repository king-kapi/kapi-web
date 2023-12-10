import React from 'react';
import { useAtomValue } from 'jotai';
import { lobbiesAtom } from '@/src/atoms/lobbiesAtom';
import Icon from '@/src/components/icons/Icon';
import Button from '@/src/components/Button';
import AvatarStack, { AvatarStackFromUsers } from "@/src/components/atoms/AvatarStack";
import Link from 'next/link';

const LobbyCards = () => {
  const lobbies = useAtomValue(lobbiesAtom);

  return (
    <div
      className={'grid gap-x-11 gap-y-5 grid-cols-2'}
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 32rem))',
      }}
    >
      {lobbies.map(lobby => {
        const playerDiff = lobby.numPlayers - lobby.users.length;

        return (
          <div
            className={'flex flex-col py-8 px-[2.625rem] bg-mediumGrey rounded-2xl'}
            key={lobby._id.toString()}
          >
            <div className={'flex'}>
              <div className={'flex-grow'}>
                <small>{lobby.game?.toUpperCase() || 'No Game'}</small>
                <h3>{lobby.name}</h3>
              </div>
              <div>
                <Icon icon={'pin'} />
              </div>
            </div>
            <p className={'flex-grow'}>{lobby.description}</p>
            <div className={'flex mt-6 items-center'}>
              <div className={'flex-grow'}>
                <Link href={`${lobby._id.toString()}`}>
                  <Button>View Lobby</Button>
                </Link>
              </div>
              <div className={'flex gap-[0.625rem] items-center'}>
                <AvatarStackFromUsers userIds={lobby.users} />
                <div>
                  {playerDiff > 0
                    ? `+${lobby.numPlayers - lobby.users.length} Open Spot${
                        playerDiff > 1 ? 's' : ''
                      }`
                    : 'Full'}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LobbyCards;
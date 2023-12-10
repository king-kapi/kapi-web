import styles from '@/src/styles/LobbyMemberList.module.css';
import { useCallback, useState } from 'react';
import Icon from '@/src/components/icons/Icon';
import Button from '@/src/components/Button';
import Tag from '@/src/components/Tag';
import Avatar from '@/src/components/Avatar';
import KapiListbox from '@/src/components/forms/KapiListbox';
import LobbyRequestModal from '@/src/components/party-finder/LobbyRequestModal';
import { useMolecule } from 'jotai-molecules';
import LobbyMolecule from '@/src/state/LobbyMolecule';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import meAtom from '@/src/atoms/meAtom';
import FullLobby from '@/src/types/FullLobby';
import WithUser from '@/src/components/misc/WithUser';
import LobbyUserOptions from '@/src/components/party-finder/LobbyUserOptions';

export interface LobbyDetailsProps {
  lobby: FullLobby;
}

export default function LobbyDetails({ lobby }: LobbyDetailsProps) {
  const { lobbyStatusAtom, lobbyKickStatusAtom } = useMolecule(LobbyMolecule);

  const user = useAtomValue(meAtom);
  const lobbyDispatch = useSetAtom(lobbyStatusAtom);
  const [lobbyKickStatus, kickPlayer] = useAtom(lobbyKickStatusAtom);

  const meId = user?._id;
  const tags = ['League of Legends', 'NA Region', 'PST', 'LGBTQ+', 'Casual Gaming'];

  const [view, setView] = useState('grid');
  const [requestOpen, setRequestOpen] = useState(false);

  const isHost = lobby.hostId === meId;
  const inParty = lobby.users.filter(userId => userId.toString() === meId).length > 0;

  const handleKickPlayer = useCallback(
    async (kickedId: string) => {
      await kickPlayer([kickedId]);

      lobbyDispatch({ type: 'refetch' });
    },
    [kickPlayer, lobbyDispatch]
  );

  return (
    <div className={[styles.LobbyMemberListContainer, 'text-textColor'].join(' ')}>
      <div className={styles.HeaderContainer}>
        <h1 className={styles.Header}>
          {lobby.name}&nbsp;<span>/&nbsp;{lobby.game}</span>
        </h1>
        {inParty ? (
          <Button className={`${styles.LeaveButton}`} buttonType={'primary'} buttonSize={'small'}>
            {isHost && (
              <>
                <Icon icon={'edit_pencil'} />
                Edit Party
              </>
            )}

            {!isHost && (
              <>
                <Icon icon={'exit'} />
                Leave Lobby
              </>
            )}
          </Button>
        ) : (
          <Button
            className={`${styles.LeaveButton}`}
            buttonType={'secondary'}
            buttonSize={'large'}
            onClick={() => setRequestOpen(true)}
          >
            Request to Join
          </Button>
        )}
      </div>
      <p className={styles.Description}>{lobby.description}</p>
      <div className={`${styles.Tags} mt-[0.625rem]`}>
        {tags.map(tag => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </div>
      <div className={'flex justify-between mt-16 mb-6'}>
        <h4>Party Members</h4>
        <KapiListbox
          onChange={view => {
            if (view) setView(view);
          }}
          placeholder="View"
          className={'w-[12rem]'}
          options={[
            {
              text: (
                <div className={'flex items-center gap-2 whitespace-nowrap'}>
                  <Icon icon={'grid_view'} /> Gallery View
                </div>
              ),
              value: 'grid',
            },
            {
              text: (
                <div className={'flex items-center gap-2 whitespace-nowrap'}>
                  <Icon icon={'list_view'} /> List View
                </div>
              ),
              value: 'list',
            },
          ]}
        />
      </div>

      {view === 'grid' && (
        <div className={'flex flex-wrap gap-8'}>
          {lobby.users.map(userId => (
            <WithUser userId={userId} key={userId}>
              {user => (
                <div
                  className={
                    'basis-[17rem] flex flex-col relative px-20 py-10 bg-mediumGrey rounded-lg text-center items-center'
                  }
                >
                  <div className={'absolute top-5 right-5'}>
                    <LobbyUserOptions onKick={() => handleKickPlayer(user._id)} />
                  </div>

                  <Avatar c={user.avatarColor} className={'w-[6.75rem]'} />

                  <div className={'flex gap-2 items-center mt-6'}>
                    <h3>{user.username}</h3>
                    <Icon icon={'crown'} className={'text-yellow-500'} />
                  </div>
                  <div className={styles.MemberInfo}>
                    <p className={[styles.MemberUsername, 'text-description'].join(' ')}>
                      @{user.username}
                    </p>
                    <strong className={[styles.MemberRole, 'text-description-strong'].join(' ')}>
                      Role
                    </strong>
                    <br />
                    <strong
                      className={[styles.MemberExperience, 'text-description-strong'].join(' ')}
                    >
                      Experience
                    </strong>
                  </div>
                </div>
              )}
            </WithUser>
          ))}

          {isHost && (
            <div
              className={
                'basis-[17rem] flex flex-col justify-center items-center border border-dashed border-primary-100 rounded-lg cursor-pointer hover:bg-darkGrey'
              }
            >
              <Icon icon={'add_friend'} className={'text-black p-2 rounded-full bg-white'} />
              <strong className={'mt-6'}>Invite friends</strong>
            </div>
          )}
        </div>
      )}

      {view === 'list' && (
        <div>
          {lobby.users.map(userId => (
            <WithUser userId={userId} key={userId}>
              {user => (
                <div
                  key={user._id.toString()}
                  className={'w-[56rem] h-[3.75rem] flex gap-[6rem] items-center mb-8'}
                >
                  <div className={'flex gap-[1.88rem]'}>
                    <Avatar c={user.avatarColor} className={'w-[3.75rem]'} />
                    <div className={'flex flex-col w-[10.5rem] justify-center'}>
                      <div className={'flex gap-[.5rem]'}>
                        <h3 className={'text-base font-semibold'}>{user.username}</h3>
                        <Icon icon={'crown'} className={'text-yellow-500 w-[.87rem]'} />
                      </div>
                      <p
                        className={[
                          styles.MemberUsername,
                          'text-description text-base text-greyText font-normal',
                        ].join(' ')}
                      >
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <strong
                    className={[
                      styles.MemberRole,
                      'text-description-strong w-[10.5rem] font-medium text-base',
                    ].join(' ')}
                  >
                    Role
                  </strong>
                  <strong
                    className={[
                      styles.MemberExperience,
                      'text-description-strong w-[10.5rem] font-medium text-base',
                    ].join(' ')}
                  >
                    Experience
                  </strong>
                  <div>
                    <Icon icon={'toggle_horizontal'} />
                  </div>
                </div>
              )}
            </WithUser>
          ))}

          {/*Invite Friends Card*/}
          {isHost && (
            <div
              className={
                'basis-[17rem] flex items-center cursor-pointer hover:bg-darkGrey gap-[1.8rem]'
              }
            >
              <Icon icon={'add_friend'} className={'text-black p-4 rounded-full bg-white'} />
              <strong>Invite friends</strong>
            </div>
          )}
        </div>
      )}

      <LobbyRequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  );
}

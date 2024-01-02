'use client';

import React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/src/components/atoms/PageHeader';
import LobbyDetails from '@/src/components/LobbyDetails';
import { Tab } from '@headlessui/react';
import styles from '@/src/styles/party-finder/LobbyDetail.module.css';
import Chat from '@/src/components/chat/Chat';
import Icon from '@/src/components/icons/Icon';
import { ScopeProvider, useMolecule } from 'jotai-molecules';
import LobbyMolecule, { LobbyScope } from '@/src/state/LobbyMolecule';
import { useAtom, useAtomValue } from 'jotai';
import LobbyRequests from '@/src/components/party-finder/LobbyRequests';
import meAtom from '@/src/atoms/meAtom';
import useUpdate from '@/src/hooks/useUpdate';

export default function LobbyPage() {
  const meId = useAtomValue(meAtom)?._id;
  const params = useParams();

  const lobbyId = params.lobbyId as string;

  const { lobbyStatusAtom } = useMolecule(LobbyMolecule, {
    withScope: [LobbyScope, lobbyId],
  });
  const [{ isLoading, data, error }, lobbyDispatch] = useAtom(lobbyStatusAtom);

  const inParty = data ? data.users.filter(userId => userId === meId).length > 0 : false;

  useUpdate(lobbyId, () => {
    lobbyDispatch({ type: 'refetch' });
  });

  return (
    <ScopeProvider scope={LobbyScope} value={lobbyId}>
      <main className={'grid grid-cols-[auto_36rem] h-full'}>
        <div className={'px-16 py-12'}>
          <PageHeader href="/party-finder" iconName={'party_finder'}>
            Lobby
          </PageHeader>
          <div className="mt-16 flex flex-col">
            {!isLoading && error !== undefined && data && <LobbyDetails lobby={data} />}
          </div>
        </div>
        <div className={'flex flex-col bg-darkGrey h-full'}>
          <Tab.Group>
            <Tab.List className={'flex-shrink flex justify-evenly'}>
              <Tab className={styles.Tab}>
                <div className={'flex gap-3 items-center'}>
                  Party
                  {!inParty && <Icon icon={'lock'} />}
                </div>
              </Tab>
              <Tab className={styles.Tab} disabled={!inParty}>
                <div>Requests</div>
              </Tab>
            </Tab.List>
            <Tab.Panels className={'flex-auto'}>
              <Tab.Panel className={'contents'}>
                {data?.chatId && <Chat chatId={data.chatId} inParty={inParty} />}
              </Tab.Panel>
              <Tab.Panel className={'contents'}>{data && <LobbyRequests lobby={data} />}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </ScopeProvider>
  );
}

import useMe from '@/src/hooks/useMe';
import styles from './CommunityPage.module.css';
import Icon from '../icons/Icon';
import React from 'react';
import Button from '../Button';
import IconButton from '@/src/components/atoms/IconButton';
import * as Tabs from '@radix-ui/react-tabs';
import WelcomeTab from '@/src/components/communities/WelcomeTab';

const CommunityPage = () => {
  const me = useMe();

  if (!me) return;

  return (
    <Tabs.Root defaultValue={'welcome'} className={styles.Page}>
      <div className={'px-8 py-6 bg-black'}>
        <button className={'flex items-center heading-3'}>
          <Icon
            icon={'carat_left'}
            className={'p-2 bg-grey rounded-full w-[1.875rem] h-[1.875rem]'}
          />
          <Icon icon="community" className={'ml-6 h-[1.75rem] mr-4'} />
          Community
        </button>
      </div>
      <div className={styles.Banner} />

      {/*Header*/}
      <div className={'px-[7.75rem] pt-8 bg-black'}>
        <div className={'flex justify-between'}>
          <div className={'flex items-end'}>
            <h1>Community Name</h1>

            <div className={'flex gap-3 items-center mb-0.5'}>
              <Icon icon="community" className={'ml-6 h-4'} />
              104 active members
            </div>
          </div>

          <div className={'flex items-center gap-3'}>
            <Button className={'w-[8.625rem]'}>Join</Button>
            <IconButton icon={'notification'} className={'!px-0.5'} />
          </div>
        </div>

        <Tabs.List className={'flex mt-6'}>
          <Tabs.Trigger className={styles.Tab} value={'welcome'}>
            Welcome
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Tab} value={'discussion'}>
            Discussion
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Tab} value={'help'}>
            Help
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Tab} value={'chat'}>
            Chat
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Tab} value={'members'}>
            Members
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Tab} value={'requests'} disabled={true}>
            <Icon icon={'lock'} />
            Requests
          </Tabs.Trigger>
        </Tabs.List>
      </div>

      <Tabs.Content value={'welcome'} className={'contents'}>
        <WelcomeTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default CommunityPage;

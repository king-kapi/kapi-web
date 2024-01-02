import useMe from '@/src/hooks/useMe';
import * as Tabs from '@radix-ui/react-tabs';
import Button from '../Button';
import YourCommunities from '@/src/components/communities/YourCommunities';
import DiscoverCommunities from '@/src/components/communities/DiscoverCommunities';

const CommunitiesPage = () => {
  const me = useMe();

  if (!me) return;

  return (
    <div className={'px-8 py-16'}>
      <div className={'flex justify-between'}>
        <h1>HEY THERE {me.username.toUpperCase()}!</h1>
        <Button>Create a Community</Button>
      </div>
      <Tabs.Root defaultValue={'your-communities'} className={'mt-8'}>
        <Tabs.List className={'flex gap-16 mb-16'}>
          <Tabs.Trigger value={'your-communities'} className={'group'}>
            <h2 className={'text-greyText group-data-[state=active]:text-teal-primary-60'}>
              Your Communities
            </h2>
            <div
              className={
                'w-full h-1 bg-white transition-opacity group-data-[state=inactive]:opacity-0'
              }
            />
          </Tabs.Trigger>
          <Tabs.Trigger value={'discover-communities'} className={'group'}>
            <h2 className={'text-greyText group-data-[state=active]:text-teal-primary-60'}>
              Discover Communities
            </h2>
            <div
              className={
                'w-full h-1 bg-white transition-opacity group-data-[state=inactive]:opacity-0'
              }
            />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={'your-communities'}>
          <YourCommunities />
        </Tabs.Content>
        <Tabs.Content value={'discover-communities'}>
          <DiscoverCommunities />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CommunitiesPage;

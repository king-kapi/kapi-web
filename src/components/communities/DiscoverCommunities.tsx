import Input from '@/src/components/Input';
import Icon from '@/src/components/icons/Icon';
import KapiListbox from '@/src/components/forms/KapiListbox';
import styles from '@/src/components/communities/DiscoverCommunities.module.css';
import CommunityCard from '@/src/components/communities/CommunityCard';

const DiscoverCommunities = () => {
  return (
    <div>
      <h3 className={'mt-[3rem]'}>Trending Communities</h3>
      <p className={'description'}>
        We heard from a little capybara that these communities are popping right now
      </p>

      <div className={styles.TrendingCommunities}>
        {[0, 1, 2, 3].map((_, i) => (
          <CommunityCard key={i} />
        ))}
      </div>

      <h3 className={'mt-[8rem]'}>Discover Communities</h3>
      <p className={'description'}>Dive into the vibrant world of community discovery!</p>
      <div className={'flex justify-between gap-4 mt-7'}>
        <Input
          className={'flex-auto max-w-4xl'}
          icon={<Icon icon={'search'} />}
          placeholder={'Search'}
        />

        <KapiListbox
          placeholder={'Sort By'}
          options={[
            {
              text: 'Name',
              value: 'name',
            },
          ]}
        />
      </div>

      <div className={styles.Communities}>
        {[0, 1, 2, 3, 4].map((_, i) => (
          <CommunityCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverCommunities;

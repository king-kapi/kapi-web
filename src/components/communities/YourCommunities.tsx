import Input from '../Input';
import Icon from '../icons/Icon';
import KapiListbox from '@/src/components/forms/KapiListbox';
import styles from './YourCommunities.module.css';
import CommunityCard from '@/src/components/communities/CommunityCard';

const YourCommunities = () => {
  return (
    <div>
      <div className={'flex justify-between gap-4'}>
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

export default YourCommunities;

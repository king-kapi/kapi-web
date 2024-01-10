import useMe from '@/src/hooks/useMe';
import Avatar from '@/src/components/Avatar';
import TextArea from '@/src/components/forms/TextArea';
import Icon from '../icons/Icon';

const WelcomeTab = () => {
  const me = useMe();

  return (
    <div className={'flex flex-auto items-stretch'}>
      <div className={'flex flex-col gap-8 flex-auto'}>
        <div className={'bg-mediumGrey rounded-lg px-6 py-3 flex gap-6'}>
          <Avatar c={me?.avatarColor} />
          <TextArea placeholder={'Create Your Post'} className={'!bg-grey flex-auto h-[3.5rem]'} />
          <Icon icon={'search'} />
        </div>
      </div>
      <div className={'hidden xl:block bg-mediumGrey w-[23.5rem] px-8 py-6'}>About</div>
    </div>
  );
};

export default WelcomeTab;

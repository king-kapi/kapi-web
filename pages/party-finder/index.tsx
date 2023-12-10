import PartyOptions from '@/src/components/PartyOptions';
import Button from '@/src/components/Button';
import {useAtom} from 'jotai';
import {partyFinderAtom} from '@/src/atoms/partyFinderAtom';
import Link from 'next/link';
import styles from '@/src/styles/BuddyFinder.module.css';
import Icon from '@/src/components/icons/Icon';

export default function PartyFinder() {
  const [survey] = useAtom(partyFinderAtom);

  return (
    <div className='px-16 py-12'>
      <Link className={styles.PartyFinder} href="/party-finder">
        <div className={'flex items-center'}>
          <div className={'w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center'}>
            <Icon icon={'carat_left'} />
          </div>
          <Icon icon={'party_finder'} size={3.4375} className={'ml-6'} />
          <span className={'ml-1 font-medium'}>Party Finder</span>
        </div>
      </Link>
      <div className="w-[59.375rem] h-[53.125rem] border-solid border p-16 absolute left-[32%] top-[11%] rounded-[.625rem]">
        <div className="flex justify-between mb-[2.62rem]">
          <h1 className="text-2xl font-medium">Question 1</h1>
          <h1 className="text-pink-500 text-2xl font-medium">Required</h1>
        </div>
        <PartyOptions />
        <Button buttonType="secondary" className="w-[7.5rem] absolute bottom-16">
          Back
        </Button>
        <Link href={survey.partyOption ? survey.partyOption + '' : ''}>
          <Button
            buttonType={survey.partyOption ? 'primary' : 'secondary'}
            className="w-[7.5rem] absolute bottom-16 right-16"
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

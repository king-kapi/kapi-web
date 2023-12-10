import Icon from '@/src/components/icons/Icon';
import Input from '@/src/components/Input';
import Tag from '@/src/components/Tag';
import KapiListbox from '@/src/components/forms/KapiListbox';
import {Suspense, useEffect, useState} from 'react';
import LobbyCards from '@/src/components/party-finder/LobbyCards';
import styles from '@/src/styles/BuddyFinder.module.css';
import Link from 'next/link';
import {HonorOfConduct} from '@/src/components/HonorOfConduct';
import GameSelect from '@/src/components/GameSelect';
import Button from '@/src/components/Button';
import {partyFinderAtom} from '@/src/atoms/partyFinderAtom';
import {useAtom} from 'jotai';
import acknowledgedAtom from "@/src/atoms/acknowledgedAtom";

export default function PartyFinderPage() {
  const [survey, setSurvey] = useAtom(partyFinderAtom);
  const [pageNumber, setPageNumber] = useState(1);

  // todo: make this more seamless
  const [acknowledged, setAcknowledged] = useAtom(acknowledgedAtom);
  useEffect(() => {
    // skip if alr ack'd
    if (acknowledged)
      setPageNumber(2);
  }, [acknowledged]);
  useEffect(() => {
    if (pageNumber > 1)
      setAcknowledged(true);
  }, [pageNumber, setAcknowledged]);

  return (
    <div className={'px-16 py-12'}>
      <Link className={styles.PartyFinder} href="/party-finder">
        <div className={'flex items-center'}>
          <div className={'w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center'}>
            <Icon icon={'carat_left'}/>
          </div>
          <Icon icon={'party_finder'} size={3.4375} className={'ml-6'}/>
          <span className={'ml-1 font-medium'}>Party Finder</span>
        </div>
      </Link>
      {pageNumber !== 3 ? (
        <div
          className="w-[59.375rem] h-[53.125rem] border-solid border p-16 absolute left-[32%] top-[11%] rounded-[.625rem]">
          <div className="flex justify-between mb-[2.62rem]">
            <h1 className="text-2xl font-medium">Question {pageNumber}</h1>
            <h1 className="text-pink-500 text-2xl font-medium">
              {pageNumber !== 4 && pageNumber !== 5 ? 'Required' : ''}
            </h1>
          </div>
          {pageNumber === 1 && <HonorOfConduct/>}
          {pageNumber === 2 && <GameSelect onChange={(games) => setSurvey({...survey, games})}/>}
          <Link href={pageNumber === 1 ? '/party-finder' : ''}>
            <Button
              buttonType="secondary"
              className="w-[7.5rem] absolute bottom-16"
              onClick={() => {
                if (pageNumber !== 1) setPageNumber(pageNumber - 1);
              }}
            >
              Back
            </Button>
          </Link>
          <Button
            buttonType={
              (pageNumber === 1 && survey.honorConduct) ||
              (pageNumber === 2 && survey.games?.length !== 0)
                ? 'primary'
                : 'secondary'
            }
            className="w-[7.5rem] absolute bottom-16 right-16"
            onClick={() => {
              if (
                pageNumber !== 6 &&
                ((pageNumber === 1 && survey.honorConduct) ||
                  (pageNumber === 2 && survey.games?.length !== 0) ||
                  (pageNumber === 3 && survey.interestMatch !== null))
              )
                setPageNumber(pageNumber + 1);
            }}
          >
            Next
          </Button>
        </div>
      ) : (
        <div>
          {' '}
          <div className={'flex items-center gap-6 mt-24'}>
            <h1>Open Lobbies</h1>
            <h4>20 available</h4>
          </div>
          <div className={'flex items-center mt-8 gap-6'}>
            <h4>Filter By Tags</h4>
            <div className={'flex-grow max-w-[31rem]'}>
              <Input placeholder={'Lobby Name'} icon={<Icon icon={'search'}/>}/>
            </div>
            <div className={'flex-grow flex gap-6'}>
              <Tag icon={true}>Tag Name</Tag>
              <Tag icon={true}>Tag Name</Tag>
            </div>
            <div>
              <KapiListbox
                placeholder={'Sort By'}
                options={[
                  {
                    text: 'Name',
                    value: 'name',
                  },
                  {
                    text: 'Date',
                    value: 'name',
                  },
                ]}
              />
            </div>
          </div>
          <div className={'mt-10'}>
            <Suspense>
              <LobbyCards/>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

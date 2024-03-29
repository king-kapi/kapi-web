import React from 'react';
import { useAtomValue } from 'jotai';
import meAtom from '@/src/atoms/meAtom';
import Link from 'next/link';

export default function LoginStatus() {
  const me = useAtomValue(meAtom);

  return (
    <div className={'rounded-xl dark:bg-grey p-8'}>
      <h3>
        Logged in as <code className={'px-2 bg-mediumGrey rounded'}>{me?.email}</code>
      </h3>
      <Link href={'/sign-out'}>Sign out</Link>
    </div>
  );
}

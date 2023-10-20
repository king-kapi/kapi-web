import { atomFamily } from 'jotai/vanilla/utils/atomFamily';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { IUser } from '@/src/models/User';

const userAtom = atomFamily((userId: string) => {
  const [, userStatusAtom] = atomsWithQuery(() => ({
    queryKey: ['/api/[userId]', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw res;

      return (await res.json()) as IUser;
    },
  }));

  return userStatusAtom;
});

export default userAtom;

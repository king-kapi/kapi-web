import User from "@/src/types/User";
import { useQuery, useQueryClient } from "react-query";

// const mapAtom = atom(new Map<string, IUser>());

const useUser = (userId: string) => {
  // const [userMap, setUserMap] = useAtom(mapAtom);
  const queryClient = useQueryClient();

  // const getUser = async (userId: string): User => {
  // if (userMap.get(userId) === null) {
  // const userData =  queryClient.fetchQuery(["user", userId], async () => {
  //   const res = await fetch(`/api/users/${userId}`);
  //   if (!res.ok) throw res;
  //
  //   return (await res.json()) as IUser;
  // });

  // const newMap = new Map(userMap);
  // newMap.set(userId, userData);
  // setUserMap(newMap);
  //
  // return userData;
  // }

  //   return userMap.get(userId) as IUser;
  // }

  const userData = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw res;

      return (await res.json()) as User;
    },
  });

  return userData.data;
};

export default useUser;
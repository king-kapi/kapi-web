import User from '../../types/User';
import useUser from '@/src/hooks/useUser';

const WithUser = ({
  userId,
  children,
}: {
  userId: string;
  children: (user: User) => React.ReactNode;
}) => {
  const user = useUser(userId);

  if (!user) return null;
  return children(user);
};

export default WithUser;
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/user';

export const useCurrentUser = () => {
  const [user] = useAtom(userAtom);
  return { user };
};

import { atom, useRecoilState } from 'recoil';
import { User } from '../types';

const userState = atom({
  key: 'userState',
  default: null as User | null,
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);
  return { user, setUser } as const;
};

import { atom, useRecoilState } from 'recoil';
import { PasswordGroupByFolder } from '../types';

const passwordGroupByNameState = atom({
  key: 'passwordGroupByNameState',
  default: null as PasswordGroupByFolder | null,
});

export const usePasswordGroup = () => {
  const [passwordGroupByName, setPasswordGroupByName] = useRecoilState(passwordGroupByNameState);
  return { passwordGroupByName, setPasswordGroupByName } as const;
};

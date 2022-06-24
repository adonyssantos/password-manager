import { atom, useRecoilState } from 'recoil';
import { PasswordsFoldersState } from '../types';

const foldersState = atom({
  key: 'foldersState',
  default: null as PasswordsFoldersState | null,
});

export const usePasswordsFolders = () => {
  const [passwordsFolders, setPasswordsFolders] = useRecoilState(foldersState);
  return { passwordsFolders, setPasswordsFolders } as const;
};

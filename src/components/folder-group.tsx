import { List } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FolderGroup = ({ children }: Props) => {
  return <List>{children}</List>;
};

export default FolderGroup;

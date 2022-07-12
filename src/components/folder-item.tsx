import { Avatar, Box, ListItem, ListItemText } from '@mui/material';
import { deleteFolder } from '../utils';
import { OnePasswordFolder } from '../types';
import { usePasswordGroup } from '../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';

interface Props {
  folder: OnePasswordFolder;
  type?: 'default' | null;
}

export default function FolderItem({ folder, type }: Props) {
  const { passwordGroupByName, setPasswordGroupByName } = usePasswordGroup();

  const handleDelete = () => {
    if (folder.id === 'default') return;

    deleteFolder(folder.id).then(() => {
      const newData = passwordGroupByName?.filter((item) => item.id !== folder.id);

      if (newData) {
        setPasswordGroupByName(newData);
      }
    });
  };

  return (
    <ListItem>
      <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
        <FolderIcon />
      </Avatar>
      <ListItemText primary={folder.name} secondary={`${folder.qty} passwords`} />

      {type === 'default' ? null : (
        <Box sx={{ ml: 'auto' }}>
          <IconButton color="primary" edge="end" aria-label="rename" onClick={() => null}>
            <DriveFileRenameOutlineIcon />
          </IconButton>

          <IconButton color="primary" edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </ListItem>
  );
}

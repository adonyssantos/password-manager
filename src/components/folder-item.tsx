import { Avatar, Box, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';

export default function FolderItem({ folder, onDelete, onRename }: any) {
  return (
    <ListItem>
      <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
        <FolderIcon />
      </Avatar>
      <ListItemText primary={folder.name} secondary={`${folder.passwords} passwords`} />

      <Box sx={{ ml: 'auto' }}>
        <IconButton color="primary" edge="end" aria-label="rename" onClick={() => onRename(folder)}>
          <DriveFileRenameOutlineIcon />
        </IconButton>

        <IconButton color="primary" edge="end" aria-label="delete" onClick={() => onDelete(folder)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}

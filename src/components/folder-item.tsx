import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
} from '@mui/material';
import { deleteFolder } from '../utils';
import { OnePasswordFolder } from '../types';
import { usePasswordGroup } from '../hooks';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  folder: OnePasswordFolder;
  type?: 'default' | null;
}

export default function FolderItem({ folder, type }: Props) {
  const [open, setOpen] = useState(false);
  const { passwordGroupByName, setPasswordGroupByName } = usePasswordGroup();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (folder.id === 'default') return;

    deleteFolder(folder.id)
      .then(() => {
        const newData = passwordGroupByName?.filter((item) => item.id !== folder.id);

        if (newData) {
          setPasswordGroupByName(newData);
        }
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handleEdit = () => {
    navigate(`/folders/edit/${folder.id}`);
  };

  return (
    <ListItem>
      <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
        <FolderIcon />
      </Avatar>
      <ListItemText primary={folder.name} secondary={`${folder.qty} passwords`} />

      {type === 'default' ? null : (
        <Box sx={{ ml: 'auto' }}>
          <IconButton color="primary" edge="end" aria-label="rename" onClick={handleEdit}>
            <DriveFileRenameOutlineIcon />
          </IconButton>

          <IconButton color="primary" edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>

          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Delete Folder</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Are you sure you want to delete this folder?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </ListItem>
  );
}

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { deletePassword } from '../utils';
import { Password } from '../types/index';
import { usePasswordGroup } from '../hooks';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import PasswordInput from './password-input';

interface Props {
  password: Password;
}

const PasswordItem = ({ password }: Props) => {
  const [open, setOpen] = useState(false);
  const { passwordGroupByName, setPasswordGroupByName } = usePasswordGroup();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deletePassword(password.id)
      .then(() => {
        const newData = passwordGroupByName?.map((folder) => {
          const { passwords } = folder;
          const newPasswords = passwords.filter((item) => item.id !== password.id);
          const result = { ...folder, passwords: newPasswords };

          return result;
        });

        if (newData) {
          setPasswordGroupByName(newData);
        }
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <>
      {/* Mobile */}
      <ListItem>
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4, width: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <ListItemText primary={password.name} secondary={password.url} sx={{ display: 'inline' }} />

            <Box sx={{ mr: 2 }}>
              <IconButton
                color="primary"
                edge="end"
                aria-label="rename"
                onClick={() => {
                  alert(`rename ${password.name}`);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>

              <IconButton color="primary" edge="end" aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OutlinedInput id="standard-basic" type="text" value={password.username} sx={{ mr: 2 }} fullWidth />
            <PasswordInput value={password.key} />
          </Box>
        </Box>
      </ListItem>

      {/* Desktop */}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <ListItem>
          <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
            <EnhancedEncryptionIcon />
          </Avatar>
          <ListItemText primary={password.name} secondary={password.url} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OutlinedInput id="standard-basic" type="text" value={password.username} sx={{ mr: 2 }} fullWidth />
            <PasswordInput value={password.key} />

            <Box sx={{ mr: 2 }}>
              <IconButton
                color="primary"
                edge="end"
                aria-label="rename"
                onClick={() => {
                  alert(`rename ${password.name}`);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>

              <IconButton color="primary" edge="end" aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      </Box>

      {/* Confirmation */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this password?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PasswordItem;

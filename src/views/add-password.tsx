import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, FormEvent, useEffect } from 'react';
import { Loading, SEO } from '../components';
import { addPassword, getFolders } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks';
import { PasswordParams, PasswordsFolders, PasswordsFolder } from '../types';

const AddPassword = () => {
  const [folders, setFolders] = useState<PasswordsFolders>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUserState();
  const [selectedFolder, setSelectedFolder] = useState<PasswordsFolder>();

  useEffect(() => {
    if (user && user.uid) {
      getFolders(user.uid)
        .then((folders) => {
          setFolders(folders);
        })
        .catch(() => {
          setFolders([]);
        });
    }
  }, [user]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    event.preventDefault();
    setDisableButton(true);

    if (user && user.uid) {
      const newPassword = {
        name: formData.get('name') as PasswordParams['name'],
        url: formData.get('url') as PasswordParams['url'],
        username: formData.get('username') as PasswordParams['username'],
        key: formData.get('key') as PasswordParams['key'],
        folderId: formData.get('folderId') as PasswordParams['folderId'],
        userId: user.uid,
      };

      addPassword(newPassword, user.masterPassword)
        .then(() => {
          navigate('/passwords');
        })
        .catch(() => {
          setDisableButton(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <SEO title="Add Password">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Add new password
        </Typography>
        {loading ? (
          <Loading name="Getting form..." />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
            <TextField margin="normal" required fullWidth id="name" label="Title" name="name" autoFocus />
            <TextField margin="normal" required fullWidth name="url" label="URL" type="url" id="url" />
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" />
            <TextField margin="normal" required fullWidth name="key" label="Password" type="password" id="key" />

            <FormControl fullWidth>
              <InputLabel id="folderId">Folder</InputLabel>
              <Select
                required
                fullWidth
                id="folderId"
                labelId="folderId-label"
                label="Folder"
                name="folderId"
                value={selectedFolder?.id || 'null'}
                onChange={(event) => {
                  const folderId = event.target.value;
                  setSelectedFolder(folders.find((folder) => folder.id === folderId));
                }}
              >
                <MenuItem value="null">Default</MenuItem>
                {folders.map((folder) => (
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
              Edit Password
            </Button>
            <Button type="button" fullWidth variant="outlined" sx={{ mt: 2 }} color="primary" onClick={() => navigate('/passwords')}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </SEO>
  );
};

export default AddPassword;

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getFolders, getSinglePassword, updatePassword } from '../utils';
import { Loading, SEO } from '../components';
import { PasswordParams, PasswordsFolders } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';
import { useUserState } from '../hooks';

const EditPassword = () => {
  const [password, setPassword] = useState<PasswordParams>();
  const [folders, setFolders] = useState<PasswordsFolders>([]);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id: passwordId } = useParams();
  const { user } = useUserState();

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

  useEffect(() => {
    if (user && user.uid && passwordId) {
      getSinglePassword(user.uid, passwordId, user.masterPassword).then((data) => {
        if (data) {
          setPassword(data);
        } else {
          setError('Folder not found');
        }
      });
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    event.preventDefault();
    setDisableButton(true);

    if (user && user.uid && passwordId) {
      const newData = {
        name: formData.get('name') as PasswordParams['name'],
        url: formData.get('url') as PasswordParams['url'],
        username: formData.get('username') as PasswordParams['username'],
        key: formData.get('key') as PasswordParams['key'],
        folderId: formData.get('folderId') as PasswordParams['folderId'],
        userId: user.uid,
      };

      updatePassword(passwordId, user.masterPassword, newData)
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

  if (error) {
    return (
      // TODO: This should be a visual component
      <SEO title="404 Error">
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Error</Typography>
            <Typography variant="body1">{error}</Typography>
          </Box>
        </Box>
      </SEO>
    );
  }

  return (
    <SEO title="Edit Password">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Add Password
        </Typography>
        {loading ? (
          <Loading name="Getting form..." />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Title"
              name="name"
              autoFocus
              value={password?.name}
              onChange={(event) => {
                const name = event.target.value;
                setPassword({ ...password, name } as PasswordParams);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="url"
              label="URL"
              type="url"
              id="url"
              value={password?.url}
              onChange={(event) => {
                const url = event.target.value;
                setPassword({ ...password, url } as PasswordParams);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={password?.username}
              onChange={(event) => {
                const username = event.target.value;
                setPassword({ ...password, username } as PasswordParams);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="key"
              label="Password"
              type="text"
              id="key"
              value={password?.key}
              onChange={(event) => {
                const key = event.target.value;
                setPassword({ ...password, key } as PasswordParams);
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="folderId">Folder</InputLabel>
              <Select
                required
                fullWidth
                id="folderId"
                labelId="folderId-label"
                label="Folder"
                name="folderId"
                value={password?.folderId}
                onChange={(event) => {
                  const folderId = event.target.value;
                  setPassword({ ...password, folderId } as PasswordParams);
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

export default EditPassword;

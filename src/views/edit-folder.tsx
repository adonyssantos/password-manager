import { updateFolder, getSingleFolder } from '../utils';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PasswordsFolderParams } from '../types';
import { SEO } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserState } from '../hooks';
import { useState, FormEvent, useEffect } from 'react';

const EditFolder = () => {
  const [folder, setFolder] = useState<PasswordsFolderParams>();
  const [error, setError] = useState<string>();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id: folderId } = useParams();
  const { user } = useUserState();

  useEffect(() => {
    if (user?.uid && folderId) {
      getSingleFolder(user.uid, folderId).then((data) => {
        if (data) {
          setFolder(data);
        } else {
          setError('Folder not found');
        }
      });
    }
  }, [user, folderId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as PasswordsFolderParams['name'];

    event.preventDefault();
    setDisableButton(true);

    if (user?.uid && folderId) {
      updateFolder(folderId, {
        name,
        userId: user.uid,
      }).finally(() => {
        setDisableButton(false);
        navigate('/folders');
      });
    }
  };

  if (error) {
    return (
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
    <SEO title="Edit Folder">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Edit folder
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Folder name"
            name="name"
            value={folder?.name}
            onChange={(event) => {
              const name = event.target.value;
              setFolder({ ...folder, name } as PasswordsFolderParams);
            }}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
            Edit Folder
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            color="primary"
            onClick={() => {
              navigate('/folders');
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </SEO>
  );
};

export default EditFolder;

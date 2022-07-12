import { addFolder } from '../utils';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PasswordsFolder } from '../types';
import { SEO } from '../components';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks';
import { useState, FormEvent } from 'react';

const AddFolder = () => {
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUserState();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as PasswordsFolder['name'];

    event.preventDefault();
    setDisableButton(true);

    if (user && user.uid) {
      addFolder({
        name,
        userId: user.uid,
      })
        .then(() => {
          navigate('/folders');
        })
        .catch(() => {
          setDisableButton(false);
        });
    }
  };

  return (
    <SEO title="Add Folder">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Add new folder
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
          <TextField margin="normal" required fullWidth id="name" label="Folder name" name="name" autoFocus />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
            Add Password
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

export default AddFolder;

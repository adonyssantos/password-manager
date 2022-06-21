import { Box, Button, Select, TextField, Typography } from '@mui/material';
import { useState, FormEvent } from 'react';
import { SEO } from '../components';

const AddPassword = () => {
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    alert('Test');
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
          Password Manager Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
          <TextField margin="normal" required fullWidth id="name" label="Title" name="name" autoFocus />
          <TextField margin="normal" required fullWidth name="url" label="URL" type="url" id="url" />
          <TextField margin="normal" required fullWidth id="username" label="Username" name="username" />
          <TextField margin="normal" required fullWidth name="key" label="Password" type="password" id="key" />
          <Select margin="none" required fullWidth id="folder" label="Folder" name="folder">
            <option value="">None</option>
            <option value="1">Folder 1</option>
            <option value="2">Folder 2</option>
            <option value="3">Folder 3</option>
          </Select>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
            Add Password
          </Button>
        </Box>
      </Box>
    </SEO>
  );
};

export default AddPassword;

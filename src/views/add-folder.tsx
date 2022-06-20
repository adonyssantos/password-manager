import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, FormEvent } from 'react';

const AddFolder = () => {
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    alert('Test');
  };

  return (
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
      </Box>
    </Box>
  );
};

export default AddFolder;

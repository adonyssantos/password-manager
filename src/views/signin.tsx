import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { useUserState } from '../hooks';
import React from 'react';

const SignIn = () => {
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const { setUser } = useUserState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as User['email'];
    const masterPassword = data.get('masterPassword') as User['masterPassword'];

    event.preventDefault();
    setDisableButton(true);

    if (!data.get('email') || !data.get('masterPassword') || !data) {
      setDisableButton(false);
      alert('Please fill all fields');
      return;
    }

    // Signin code...
    setTimeout(() => {
      setUser({
        uid: Math.random().toString(16),
        email,
        masterPassword,
        displayName: email,
      });
    }, 3000);
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
        Password Manager Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <TextField
          margin="normal"
          required
          fullWidth
          name="masterPassword"
          label="Master Password"
          type="password"
          id="masterPassword"
          autoComplete="current-master-password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
          Sign In
        </Button>
        <Button to="signup" type="button" fullWidth variant="outlined" sx={{ mt: 2 }} component={Link}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;

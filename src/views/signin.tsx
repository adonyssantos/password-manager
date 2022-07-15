import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useUserState } from '../hooks';
import React from 'react';
import { SEO } from '../components';
import { signIn } from '../utils';

const SignIn = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const { setUser } = useUserState();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as User['username'];
    const masterPassword = data.get('masterPassword') as User['masterPassword'];

    event.preventDefault();
    setDisableButton(true);

    if (!data.get('username') || !data.get('masterPassword') || !data) {
      setDisableButton(false);
      setError('Please fill out all fields.');
      setOpen(true);
      return;
    }

    signIn(username, masterPassword)
      .then((user) => {
        user = user as User;

        if (user) {
          const redirectTo = localStorage.getItem('redirectTo') || '/';

          setUser(user);
          navigate(redirectTo);
        }
      })
      .catch(() => {
        setError('Invalid username or master password');
        setOpen(true);
      })
      .finally(() => {
        setDisableButton(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SEO title="Sign In">
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField margin="normal" required fullWidth name="masterPassword" label="Master Password" type="password" id="masterPassword" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
            Sign In
          </Button>
          <Button to="/sign-up" fullWidth variant="outlined" sx={{ mt: 2 }} component={Link}>
            Sign Up
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Error on SignIn!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{error ? error : 'Something went wrong, please try again.'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </SEO>
  );
};

export default SignIn;

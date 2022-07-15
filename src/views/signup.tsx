import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useUserState } from '../hooks';
import React from 'react';
import { SEO } from '../components';
import { signUp, signUpValidator } from '../utils';

const SignUp = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const { setUser } = useUserState();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const displayName = `${data.get('firstName')} ${data.get('lastName')}`;
    const username = data.get('email') as User['username'];
    const masterPassword = data.get('masterPassword') as User['masterPassword'];
    const confirmMasterPassword = data.get('confirmMasterPassword') as User['masterPassword'];

    event.preventDefault();
    setDisableButton(true);

    signUpValidator({
      username,
      masterPassword,
      confirmMasterPassword,
    })
      .then(() => {
        signUp({
          username,
          masterPassword,
          displayName,
        })
          .then((user) => {
            user = user as User;

            if (user) {
              const redirectTo = localStorage.getItem('redirectTo') || '/';

              setUser(user);
              navigate(redirectTo);
            }
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setDisableButton(false);
            localStorage.removeItem('redirectTo');
          });
      })
      .catch((error) => {
        setError(error.message);
        setOpen(true);
        setDisableButton(error.disableButton);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SEO title="Sign Up">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Password Manager Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: 'sm',
            }}
          >
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="masterPassword" label="Master Password" type="password" id="masterPassword" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmMasterPassword"
                label="Confirm Master Password"
                type="password"
                id="confirmMasterPassword"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary" disabled={disableButton}>
            Sign Up
          </Button>
          <Button to="/" fullWidth variant="outlined" sx={{ mt: 2 }} component={Link}>
            Sign In
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Error on SignUp!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error ? error : 'An error has occurred on sign up. Please try again.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </SEO>
  );
};

export default SignUp;

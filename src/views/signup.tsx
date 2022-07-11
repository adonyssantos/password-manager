import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useUserState } from '../hooks';
import React from 'react';
import { SEO } from '../components';
import { signUp } from '../utils';

const SignUp = () => {
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

    if (!username || !masterPassword || !data) {
      setDisableButton(false);
      alert('Please fill all fields');
      return;
    }

    if (masterPassword !== confirmMasterPassword) {
      setDisableButton(false);
      alert('Passwords do not match');
      return;
    }

    if (masterPassword.length < 15) {
      setDisableButton(false);
      alert('Password must be at least 16 characters');
      return;
    }

    const regex = /\d{2,}/;
    if (!regex.test(masterPassword)) {
      setDisableButton(false);
      alert('Password must have at least 2 numbers');
      return;
    }

    const regex2 = /[A-Z]/;
    if (!regex2.test(masterPassword)) {
      setDisableButton(false);
      alert('Password must have at least 1 uppercase letter');
      return;
    }

    const regex3 = /[a-z]/;
    if (!regex3.test(masterPassword)) {
      setDisableButton(false);
      alert('Password must have at least 1 lowercase letter');
      return;
    }

    const regex4 = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!regex4.test(masterPassword)) {
      setDisableButton(false);
      alert('Password must have at least 2 special characters');
      return;
    }

    signUp({
      username,
      masterPassword,
      displayName,
    })
      .then((user) => {
        user = user as User;

        if (user) {
          setUser(user);
          navigate('/');
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setDisableButton(false);
      });
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
    </SEO>
  );
};

export default SignUp;

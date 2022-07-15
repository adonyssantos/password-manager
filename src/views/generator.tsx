import { generatePassword } from '../utils';
import { Box, Button, TextField, Typography } from '@mui/material';
import { SEO } from '../components';
import { useState, FormEvent } from 'react';

const Generator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>(generatePassword());
  const [amountValue, setAmountValue] = useState('10');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const amount = formData.get('amount') as number | null;

    event.preventDefault();
    setGeneratedPassword(
      generatePassword({
        length: amount || 16,
      })
    );
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
          Generate Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'sm', mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            type="number"
            label="Characters amount"
            name="amount"
            autoFocus
            value={amountValue}
            onChange={(event) => {
              setAmountValue(event.target.value);
            }}
          />
          <Typography variant="body1">
            Generated password: <strong>{generatedPassword}</strong>
          </Typography>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} color="primary">
            Generate Password
          </Button>
        </Box>
      </Box>
    </SEO>
  );
};

export default Generator;

import { Avatar, Box, ListItem, ListItemText, OutlinedInput, IconButton } from '@mui/material';
import { Password } from '../types/index';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  password: Password;
}

const PasswordItem = ({ password }: Props) => {
  const visibilityHandler = () => {
    const passwordField = document.getElementById(`password-fiel-${password.id}`) as HTMLInputElement;
    const VISIBLE_TIME = 60 * 1000;

    passwordField.type === 'password' ? (passwordField.type = 'text') : (passwordField.type = 'password');

    setTimeout(() => {
      passwordField.type = 'password';
    }, VISIBLE_TIME);
  };
  return (
    <ListItem>
      <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
        <EnhancedEncryptionIcon />
      </Avatar>
      <ListItemText primary={password.name} secondary={password.url} />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OutlinedInput id="standard-basic" type="text" value={password.username} sx={{ mr: 2 }} />
        <OutlinedInput
          id={`password-fiel-${password.id}`}
          type="password"
          value={password.key}
          name="password"
          sx={{ mr: 2 }}
          endAdornment={
            <IconButton aria-label="Show password" onClick={visibilityHandler}>
              <VisibilityIcon />
            </IconButton>
          }
        />
      </Box>
    </ListItem>
  );
};

export default PasswordItem;

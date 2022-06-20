import { Avatar, Box, ListItem, ListItemText, OutlinedInput, IconButton } from '@mui/material';
import { Password } from '../types/index';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

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
    <>
      {/* Mobile */}
      <ListItem>
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4, width: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <ListItemText primary={password.name} secondary={password.url} sx={{ display: 'inline' }} />

            <Box sx={{ mr: 2 }}>
              <IconButton
                color="primary"
                edge="end"
                aria-label="rename"
                onClick={() => {
                  alert(`rename ${password.name}`);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>

              <IconButton
                color="primary"
                edge="end"
                aria-label="delete"
                onClick={() => {
                  alert(`delete ${password.name}`);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OutlinedInput id="standard-basic" type="text" value={password.username} sx={{ mr: 2 }} fullWidth />
            <OutlinedInput
              id={`password-fiel-${password.id}`}
              type="password"
              value={password.key}
              name="password"
              sx={{ mr: 2 }}
              fullWidth
              endAdornment={
                <IconButton aria-label="Show password" onClick={visibilityHandler}>
                  <VisibilityIcon />
                </IconButton>
              }
            />
          </Box>
        </Box>
      </ListItem>

      {/* Desktop */}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
            <Box sx={{ mr: 2 }}>
              <IconButton
                color="primary"
                edge="end"
                aria-label="rename"
                onClick={() => {
                  alert(`rename ${password.name}`);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>

              <IconButton
                color="primary"
                edge="end"
                aria-label="delete"
                onClick={() => {
                  alert(`delete ${password.name}`);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      </Box>
    </>
  );
};

export default PasswordItem;

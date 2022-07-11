import { OutlinedInput, IconButton } from '@mui/material';
import { Password } from '../types/index';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  value: Password['key'];
  rest?: unknown;
}

const PasswordInput = ({ value, ...rest }: Props) => {
  const visibilityHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!event || !event.currentTarget || !event.currentTarget.parentElement) return;

    const passwordField = event.currentTarget.parentElement['firstElementChild'] as HTMLInputElement;
    const VISIBLE_TIME = 60 * 1000;

    passwordField.type === 'password' ? (passwordField.type = 'text') : (passwordField.type = 'password');
    passwordField.focus();

    setTimeout(() => {
      passwordField.type = 'password';
    }, VISIBLE_TIME);
  };

  return (
    <OutlinedInput
      type="password"
      name="password"
      sx={{ mr: 2 }}
      fullWidth
      value={value}
      {...rest}
      endAdornment={
        <IconButton aria-label="Show password" onClick={visibilityHandler}>
          <VisibilityIcon />
        </IconButton>
      }
    />
  );
};

export default PasswordInput;

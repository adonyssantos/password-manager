import { Button, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks';
import CustomLink from './custom-link';

interface NavProps {
  type: 'default' | 'mobile';
  handleCloseNavMenu: () => void;
}

const Nav = ({ type, handleCloseNavMenu }: NavProps) => {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    console.log('logged out');
  };

  if (type === 'mobile') {
    return user ? (
      <>
        <MenuItem
          onClick={() => {
            navigate('/passwords');
            handleCloseNavMenu();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/folders');
            handleCloseNavMenu();
          }}
        >
          Folders
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleCloseNavMenu();
          }}
        >
          Sign Out
        </MenuItem>
      </>
    ) : (
      <>
        <MenuItem
          onClick={() => {
            navigate('/sign-in');
            handleCloseNavMenu();
          }}
        >
          Sign In
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/sign-up');
            handleCloseNavMenu();
          }}
        >
          Sign Up
        </MenuItem>
      </>
    );
  }

  return (
    <nav>
      {user ? (
        <>
          <CustomLink to="/" component={Link}>
            Dashboard
          </CustomLink>
          <CustomLink to="/folders" component={Link}>
            Folders
          </CustomLink>
          <CustomLink onClick={handleLogout} component={Button}>
            Sign Out
          </CustomLink>
        </>
      ) : (
        <>
          <CustomLink to="/sign-in" component={Link}>
            Sign In
          </CustomLink>
          <CustomLink to="/sign-up" component={Link}>
            Sign Up
          </CustomLink>
        </>
      )}
    </nav>
  );
};

export default Nav;

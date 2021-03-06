import { Button, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks';
import CustomLink from './custom-link';
import { logout } from '../utils';

interface NavProps {
  type: 'default' | 'mobile';
  handleCloseNavMenu: () => void;
}

const Nav = ({ type, handleCloseNavMenu }: NavProps) => {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .finally(() => {
        handleCloseNavMenu();
      });
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
            navigate('/generator');
            handleCloseNavMenu();
          }}
        >
          Generator
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
        <MenuItem
          onClick={() => {
            navigate('/generator');
            handleCloseNavMenu();
          }}
        >
          Generator
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
          <CustomLink to="/generator" component={Link}>
            Generator
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
          <CustomLink to="/generator" component={Link}>
            Generator
          </CustomLink>
        </>
      )}
    </nav>
  );
};

export default Nav;

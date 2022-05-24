import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserState } from '../hooks';
import CustomLink from './custom-link';

const Nav = () => {
  const { user, setUser } = useUserState();

  const handleLogout = () => {
    setUser(null);
    console.log('logged out');
  };

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
          <CustomLink to="/profile" component={Link}>
            Profile
          </CustomLink>
          <CustomLink onClick={handleLogout} component={Button}>
            Sign Out
          </CustomLink>
        </>
      ) : (
        <>
          <CustomLink to="/" component={Link}>
            Sign In
          </CustomLink>
          <CustomLink to="/signup" component={Link}>
            Sign Up
          </CustomLink>
        </>
      )}
    </nav>
  );
};

export default Nav;

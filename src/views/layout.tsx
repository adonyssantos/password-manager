import { Link, Outlet } from 'react-router-dom';
import { useUserState } from '../hooks';

const Layout = () => {
  const { user } = useUserState();
  return (
    <div>
      <header>
        {user && (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;

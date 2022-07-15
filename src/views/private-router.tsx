import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserState } from '../hooks/user';

const PrivateRouter = () => {
  const { user } = useUserState();
  const location = useLocation();

  if (!user) {
    // Get the pathname from the location object
    const { pathname } = location;
    localStorage.setItem('redirectTo', pathname);
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRouter;

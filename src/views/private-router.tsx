import { Navigate, Outlet } from 'react-router-dom';
import { useUserState } from '../hooks/user';

const PrivateRouter = () => {
  const { user } = useUserState();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRouter;

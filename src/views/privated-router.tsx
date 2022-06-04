import { Navigate, Outlet } from 'react-router-dom';
import { useUserState } from '../hooks/user';

const PrivatedRouter = () => {
  const { user } = useUserState();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivatedRouter;

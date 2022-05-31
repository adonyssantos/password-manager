import { Dashboard, Folders, Layout, SignIn, SignUp } from './views';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserState } from './hooks/user';

const HomeApp = () => {
  const { user } = useUserState();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user ? (
          <>
            <Route index element={<Dashboard />} />
            <Route path="folders" element={<Folders />} />
          </>
        ) : (
          <>
            <Route index element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default HomeApp;

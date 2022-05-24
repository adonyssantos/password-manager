import { Home, Layout, SignIn, Profile, SignUp } from './views';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserState } from './hooks/user';

const HomeApp = () => {
  const { user } = useUserState();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user ? (
          <>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
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

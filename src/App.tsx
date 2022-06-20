import { AddPassword, AddFolder, Dashboard, Folders, Layout, PrivateRouter, SignIn, SignUp } from './views';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomeApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PrivateRouter />}>
          {/* Private routes */}
          <Route index element={<Navigate to="passwords" />} />
          <Route path="passwords">
            <Route index element={<Dashboard />} />
            <Route path="add" element={<AddPassword />} />
          </Route>
          <Route path="folders">
            <Route index element={<Folders />} />
            <Route path="add" element={<AddFolder />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default HomeApp;

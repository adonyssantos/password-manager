import {
  AddPassword,
  AddFolder,
  Dashboard,
  Folders,
  Layout,
  PrivateRouter,
  SignIn,
  SignUp,
  EditFolder,
  EditPassword,
  Generator,
} from './views';
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
            <Route path="edit/:id" element={<EditPassword />} />
          </Route>
          <Route path="folders">
            <Route index element={<Folders />} />
            <Route path="add" element={<AddFolder />} />
            <Route path="edit/:id" element={<EditFolder />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="generator" element={<Generator />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default HomeApp;

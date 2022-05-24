import { Home, Layout } from './views';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomeApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default HomeApp;

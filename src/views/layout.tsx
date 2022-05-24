import { Container } from '@mui/material';
import { Footer, Header, Nav } from '../components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header title="Password Manager">
        <Nav />
      </Header>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;

import { Container, Toolbar } from '@mui/material';
import { Footer, Header, Nav } from '../components';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Header
        title="Password Manager"
        handleOpenNavMenu={handleOpenNavMenu}
        handleCloseNavMenu={handleCloseNavMenu}
        anchorElNav={anchorElNav}
        mobileNav={<Nav type="mobile" handleCloseNavMenu={handleCloseNavMenu} />}
      >
        <Nav type="default" handleCloseNavMenu={handleCloseNavMenu} />
      </Header>
      <Toolbar variant="dense" />

      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;

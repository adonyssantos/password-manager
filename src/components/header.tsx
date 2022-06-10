import { AppBar, Box, Container, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  children: React.ReactNode;
  title: string;
  mobileNav?: React.ReactNode;
  handleOpenNavMenu: (event: any) => void;
  handleCloseNavMenu: () => void;
  anchorElNav: any;
}

const Header = ({ children, title, mobileNav, handleOpenNavMenu, handleCloseNavMenu, anchorElNav }: Props) => {
  return (
    <Container component="header" maxWidth="xl">
      <AppBar position="fixed" color="primary" elevation={0}>
        <Toolbar sx={{ flexWrap: 'wrap' }} disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', alignItems: 'center' } }}>
            <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, ml: 2 }}>
              {title}
            </Typography>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mobileNav}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, ml: 2 }}>
              {title}
            </Typography>

            {children}
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar variant="dense" />
    </Container>
  );
};

export default Header;

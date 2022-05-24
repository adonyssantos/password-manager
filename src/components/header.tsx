import { AppBar, Toolbar, Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Header = ({ children, title }: Props) => {
  return (
    <header>
      <AppBar position="fixed" color="primary" elevation={0}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {children}
        </Toolbar>
      </AppBar>

      <Toolbar variant="dense" />
    </header>
  );
};

export default Header;

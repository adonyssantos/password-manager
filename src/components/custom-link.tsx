import { Link } from '@mui/material';

interface Props {
  children: React.ReactNode;
  to?: string;
  component?: React.ElementType;
  onClick?: React.MouseEventHandler;
}

const CustomLink = ({ children, ...props }: Props) => (
  <Link variant="button" color="inherit" sx={{ my: 1, mx: 1.5, textDecoration: 'none' }} {...props}>
    {children}
  </Link>
);

export default CustomLink;

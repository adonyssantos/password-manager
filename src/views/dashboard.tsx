import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PasswordGroup, PasswordItem, PlusButton } from '../components';

const passwords = [
  {
    id: '1',
    name: 'Facebook',
    url: 'facebook.com',
    username: 'fb.adonys',
    key: 'fb123456',
    userId: '1',
    folderId: null,
  },
  {
    id: '2',
    name: 'Instagram',
    url: 'instagram.com',
    username: 'adonys.ig',
    key: 'ig123456',
    userId: '1',
    folderId: null,
  },
  {
    id: '3',
    name: 'YouTube',
    url: 'youtube.com',
    username: 'yt.adonys',
    key: 'yt123456',
    userId: '1',
    folderId: null,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          The passwords group by category.
        </Typography>
      </Box>

      <PasswordGroup type="default">
        {passwords.map((password) => {
          return <PasswordItem key={password.id} password={password} />;
        })}
      </PasswordGroup>

      <PlusButton title="Add Password" onClick={() => navigate('/passwords/add')} />
    </Box>
  );
};

export default Dashboard;

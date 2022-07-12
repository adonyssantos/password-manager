import { Box, Typography } from '@mui/material';
import { getPasswordGroupByFolders } from '../utils';
import { PasswordGroup, PasswordItem, PlusButton, SEO } from '../components';
import { PasswordGroupByFolder } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks';

const Dashboard = () => {
  const [passwordGroupByFolders, setPasswordGroupByFolders] = useState<PasswordGroupByFolder>([]);
  const navigate = useNavigate();
  const { user } = useUserState();

  useEffect(() => {
    if (user) {
      const { uid, masterPassword } = user;
      getPasswordGroupByFolders(uid, masterPassword).then(setPasswordGroupByFolders);
    }
  }, []);

  return (
    <SEO title="Dashboard">
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            The passwords group by category.
          </Typography>
        </Box>

        {passwordGroupByFolders.map((passwordGroupByFolder, index) => (
          <PasswordGroup key={passwordGroupByFolder.id} name={passwordGroupByFolder.name} type={index === 0 ? 'default' : ''}>
            {passwordGroupByFolder.passwords.map((password) => (
              <PasswordItem key={password.id} password={password} />
            ))}
          </PasswordGroup>
        ))}

        <PlusButton title="Add Password" onClick={() => navigate('/passwords/add')} />
      </Box>
    </SEO>
  );
};

export default Dashboard;

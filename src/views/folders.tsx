import { Box, Typography } from '@mui/material';
import { FolderItem, FolderGroup, PlusButton, Loading } from '../components';
import { getPasswordGroupByFolders } from '../utils';
import { SEO } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordGroup, useUserState } from '../hooks';

const Folder = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUserState();
  const { passwordGroupByName, setPasswordGroupByName } = usePasswordGroup();

  useEffect(() => {
    if (user) {
      const { uid, masterPassword } = user;

      getPasswordGroupByFolders(uid, masterPassword)
        .then(setPasswordGroupByName)
        .then(() => setLoading(false));
    }
  }, []);

  return (
    <SEO title="Folders">
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Folders
          </Typography>
          <Typography variant="body1" gutterBottom>
            The folders are used to organize your passwords by category.
          </Typography>
        </Box>

        {loading ? (
          <Loading name="Getting folders..." />
        ) : (
          <FolderGroup>
            {passwordGroupByName?.map((folder) => {
              if (folder.id === 'default') {
                return <FolderItem key={folder.id} folder={folder} type="default" />;
              }

              return <FolderItem key={folder.id} folder={folder} />;
            })}
          </FolderGroup>
        )}

        <PlusButton title="Add Folder" onClick={() => navigate('/folders/add')} />
      </Box>
    </SEO>
  );
};

export default Folder;

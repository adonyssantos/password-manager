import { Box, Typography } from '@mui/material';
import { FolderItem, FolderGroup } from '../components';

const folders = [
  {
    id: '1',
    name: 'Folder 1',
    passwords: 2,
  },
  {
    id: '2',
    name: 'Folder 2',
    passwords: 3,
  },
  {
    id: '3',
    name: 'Folder 3',
    passwords: 4,
  },
];

const Folder = () => {
  const handlerRename = (folder: any) => {
    console.log('rename', folder);
  };

  const handlerDelete = (folder: any) => {
    console.log('delete', folder);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Folders
        </Typography>
        <Typography variant="body1" gutterBottom>
          The folders are used to organize your passwords by category.
        </Typography>
      </Box>

      <FolderGroup>
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} onDelete={handlerDelete} onRename={handlerRename} />
        ))}
      </FolderGroup>
    </Box>
  );
};

export default Folder;

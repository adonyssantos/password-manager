import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PlusButton = ({ title, onClick }: any) => {
  return (
    <Fab
      color="primary"
      title={title}
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default PlusButton;

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';

const Warning = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const showWarning = localStorage.getItem('showWarning');
    if (!showWarning) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('showWarning', 'false');
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleDisagree} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">IMPORTANT WARNING!!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This is an educative project. The data saved in this app can not be persistent in the database and there is no way to recover it.
          Also there is a limit of daily requests to the Database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Disagree</Button>
        <Button onClick={handleAgree}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Warning;

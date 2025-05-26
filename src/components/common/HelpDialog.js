import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useHelp } from '../../contexts/HelpContext';

const HelpDialog = () => {
  const { helpOpen, hideHelp, helpTitle, helpContent } = useHelp();

  return (
    <Dialog
      open={helpOpen}
      onClose={hideHelp}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">{helpTitle}</Typography>
        <IconButton
          aria-label="close"
          onClick={hideHelp}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {typeof helpContent === 'string' ? (
          <Typography>{helpContent}</Typography>
        ) : (
          helpContent
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={hideHelp} variant="contained">
          Entendi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;

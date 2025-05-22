import React, { createContext, useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import { Close as CloseIcon, Help as HelpIcon } from '@mui/icons-material';

const HelpContext = createContext();

export const HelpProvider = ({ children }) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpContent, setHelpContent] = useState({ title: '', content: '' });

  const showHelp = (title, content) => {
    setHelpContent({ title, content });
    setHelpOpen(true);
  };

  return (
    <HelpContext.Provider value={{ showHelp }}>
      {children}
      <Dialog 
        open={helpOpen} 
        onClose={() => setHelpOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <HelpIcon color="primary" />
              <Typography variant="h6">{helpContent.title}</Typography>
            </Box>
            <IconButton onClick={() => setHelpOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {typeof helpContent.content === 'string' ? (
            <Typography>{helpContent.content}</Typography>
          ) : (
            helpContent.content
          )}
        </DialogContent>
      </Dialog>
    </HelpContext.Provider>
  );
};

export const useHelp = () => useContext(HelpContext);

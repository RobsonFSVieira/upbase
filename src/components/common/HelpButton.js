import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { HelpOutline as HelpIcon } from '@mui/icons-material';
import { useHelp } from '../../contexts/HelpContext';

const HelpButton = ({ 
  title = 'Ajuda',
  content,
  size = 'small',
  sx = {} 
}) => {
  const { showHelp } = useHelp();

  return (
    <Tooltip title="Ajuda">
      <IconButton
        size={size}
        onClick={() => showHelp(title, content)}
        sx={{ 
          opacity: 0.6, 
          '&:hover': { opacity: 1 }, 
          transition: 'opacity 0.2s',
          ...sx 
        }}
      >
        <HelpIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

export default HelpButton;

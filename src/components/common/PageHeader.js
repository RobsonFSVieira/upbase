import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PageHeader = ({ title, helpText }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        mb: 3,
        p: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Box sx={{ mb: helpText ? 1 : 0 }}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        {helpText && (
          <Typography variant="body2" color="text.secondary">
            {helpText}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default PageHeader;

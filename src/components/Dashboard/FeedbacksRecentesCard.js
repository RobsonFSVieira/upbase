import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Chip } from '@mui/material';
import { Feedback } from '@mui/icons-material';

const FeedbacksRecentesCard = () => {
  const feedbacks = [
    { de: 'Carlos Souza', tipo: 'positivo', data: '2024-02-15' },
    { de: 'Ana Paula', tipo: 'construtivo', data: '2024-02-14' },
    { de: 'Roberto Silva', tipo: 'positivo', data: '2024-02-13' }
  ];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Feedback color="info" />
          <Typography variant="h6">Feedbacks Recentes</Typography>
        </Box>

        <List>
          {feedbacks.map((feedback) => (
            <ListItem key={`${feedback.de}-${feedback.data}`}>
              <ListItemText
                primary={`De: ${feedback.de}`}
                secondary={new Date(feedback.data).toLocaleDateString()}
              />
              <Chip 
                label={feedback.tipo === 'positivo' ? 'Positivo' : 'Construtivo'}
                color={feedback.tipo === 'positivo' ? 'success' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FeedbacksRecentesCard;

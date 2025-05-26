import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  TrendingUp,
  Stars,
  Speed
} from '@mui/icons-material';

const InsightsSection = ({ insights }) => {
  const getIcon = (tipo) => {
    switch (tipo) {
      case 'destaque':
        return <Stars color="primary" />;
      case 'oportunidade':
        return <Speed color="warning" />;
      default:
        return <TrendingUp color="info" />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Insights
        </Typography>
        <List>
          {insights.map((insight, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon>
                {getIcon(insight.tipo)}
              </ListItemIcon>
              <ListItemText
                primary={insight.mensagem}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.secondary'
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;

import React from 'react';
import { Box, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ProgressChart = () => {
  const theme = useTheme();

  // Dados mockados para o gráfico
  const data = [
    { ciclo: '2024.1', nota: 7.2 },
    { ciclo: '2024.2', nota: 7.8 },
    { ciclo: '2025.1', nota: 8.1 },
  ];

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ciclo" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="nota"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProgressChart;

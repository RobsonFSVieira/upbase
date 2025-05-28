import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Chip,
    Button,
    Divider
} from '@mui/material';
import {
    Timeline as TimelineIcon,
    TrendingUp as TrendingUpIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';

const MinhasAvaliacoes = () => {
    return (
        <Box>
            {/* Avaliação atual */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">
                            Avaliação em Andamento
                        </Typography>
                        <Chip label="Em progresso" color="info" size="small" />
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Período: 1º Semestre 2025
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Status do preenchimento
                        </Typography>
                        <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            60% concluído
                        </Typography>
                    </Box>

                    <Button variant="contained" color="primary">
                        Continuar Avaliação
                    </Button>
                </CardContent>
            </Card>

            {/* Insights e Próximos Passos */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Próximos Passos
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" alignItems="center">
                                    <AssignmentIcon color="info" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle2">
                                            Completar autoavaliação
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Prazo: 30/06/2025
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box display="flex" alignItems="center">
                                    <TimelineIcon color="primary" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle2">
                                            Feedback com líder
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Previsto para: Julho/2025
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                                <Typography variant="h6">
                                    Insights
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                • Sua média de avaliação melhorou 15% desde o último ciclo
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                • Destaque em "Trabalho em Equipe" e "Comunicação"
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                • Oportunidade de desenvolvimento em "Gestão de Tempo"
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MinhasAvaliacoes;

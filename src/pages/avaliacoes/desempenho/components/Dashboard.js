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
    Tooltip,
    IconButton
} from '@mui/material';
import {
    Assessment as AssessmentIcon,
    Assignment as AssignmentIcon,
    NotificationsActive as NotificationsActiveIcon,
    Speed as SpeedIcon
} from '@mui/icons-material';

const Dashboard = () => {
    return (
        <Box>
            {/* KPIs principais */}
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Total de Avaliações</Typography>
                            </Box>
                            <Typography variant="h4" color="primary">48</Typography>
                            <Typography variant="body2" color="text.secondary">No ciclo atual</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <SpeedIcon color="success" sx={{ mr: 1 }} />
                                <Typography variant="h6">Progresso</Typography>
                            </Box>
                            <Typography variant="h4" color="success.main">75%</Typography>
                            <LinearProgress variant="determinate" value={75} sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <NotificationsActiveIcon color="warning" sx={{ mr: 1 }} />
                                <Typography variant="h6">Pendentes</Typography>
                            </Box>
                            <Typography variant="h4" color="warning.main">12</Typography>
                            <Typography variant="body2" color="text.secondary">Necessitam atenção</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <AssignmentIcon color="info" sx={{ mr: 1 }} />
                                <Typography variant="h6">Concluídas</Typography>
                            </Box>
                            <Typography variant="h4" color="info.main">36</Typography>
                            <Typography variant="body2" color="text.secondary">Neste ciclo</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Avaliações Pendentes */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Avaliações Pendentes
                            </Typography>
                            {/* Lista de avaliações pendentes aqui */}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Insights
                            </Typography>
                            <Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    • 5 avaliações precisam ser finalizadas esta semana
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    • 3 colaboradores ainda não iniciaram a autoavaliação
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    • 2 avaliações estão aguardando sua revisão
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;

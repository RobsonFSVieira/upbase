import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    LinearProgress,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import {
    Assessment as AssessmentIcon,
    Timeline as TimelineIcon,
    TrendingUp as TrendingUpIcon,
    ArrowForward as ArrowForwardIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Schedule as ScheduleIcon
} from '@mui/icons-material';

const UserDashboard = () => {
    // Mock data - substituir por dados reais da API
    const currentEvaluation = {
        id: 1,
        period: '1º Semestre 2025',
        progress: 60,
        deadline: '2025-06-30',
        status: 'in_progress'
    };

    const insights = [
        {
            type: 'improvement',
            icon: <TrendingUpIcon color="success" />,
            text: 'Melhoria de 15% em Comunicação desde a última avaliação'
        },
        {
            type: 'strength',
            icon: <CheckCircleIcon color="primary" />,
            text: 'Destaque em Trabalho em Equipe'
        },
        {
            type: 'opportunity',
            icon: <WarningIcon color="warning" />,
            text: 'Oportunidade de desenvolvimento em Gestão do Tempo'
        }
    ];

    const nextSteps = [
        {
            id: 1,
            text: 'Completar autoavaliação',
            deadline: '30/06/2025',
            status: 'pending'
        },
        {
            id: 2,
            text: 'Reunião de feedback com líder',
            deadline: '15/07/2025',
            status: 'upcoming'
        }
    ];

    const performanceHistory = [
        { period: '2º Sem 2024', score: 4.2 },
        { period: '1º Sem 2024', score: 4.0 },
        { period: '2º Sem 2023', score: 3.8 }
    ];

    return (
        <Box>
            {/* Avaliação Atual */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <AssessmentIcon color="primary" />
                                <Typography variant="h6">
                                    Avaliação em Andamento
                                </Typography>
                                <Chip
                                    label="Em progresso"
                                    color="info"
                                    size="small"
                                    sx={{ ml: 'auto' }}
                                />
                            </Box>

                            <Typography variant="body2" color="text.secondary" paragraph>
                                Período: {currentEvaluation.period}
                                <br />
                                Prazo: {currentEvaluation.deadline}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        Progresso do preenchimento
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {currentEvaluation.progress}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={currentEvaluation.progress}
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                fullWidth
                            >
                                Continuar Avaliação
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Próximos Passos e Insights */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <TimelineIcon color="info" />
                                <Typography variant="h6">
                                    Próximos Passos
                                </Typography>
                            </Box>

                            <List>
                                {nextSteps.map((step) => (
                                    <ListItem
                                        key={step.id}
                                        secondaryAction={
                                            <IconButton edge="end">
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemIcon>
                                            {step.status === 'pending' ? (
                                                <ScheduleIcon color="warning" />
                                            ) : (
                                                <AssignmentIcon color="disabled" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={step.text}
                                            secondary={`Prazo: ${step.deadline}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <TrendingUpIcon color="success" />
                                <Typography variant="h6">
                                    Insights
                                </Typography>
                            </Box>

                            <List>
                                {insights.map((insight, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {insight.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={insight.text}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Histórico de Desempenho */}
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <AssessmentIcon color="primary" />
                        <Typography variant="h6">
                            Histórico de Desempenho
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        {performanceHistory.map((period, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h4" color="primary" align="center">
                                            {period.score}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">
                                            {period.period}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserDashboard;

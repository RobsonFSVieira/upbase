import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import { useEvaluation } from '../../../contexts/EvaluationContext';
import { useAuth } from '../../../contexts/AuthContext';

const STATUS_COLORS = {
    pending: 'warning',
    completed: 'success',
    draft: 'default',
    active: 'info'
};

const STATUS_LABELS = {
    pending: 'Pendente',
    completed: 'Concluída',
    draft: 'Rascunho',
    active: 'Ativa'
};

const EvaluationDashboard = () => {
    const { evaluationStats, pendingEvaluations } = useEvaluation();
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    if (!evaluationStats) {
        return <LinearProgress />;
    }

    const { counts, recent } = evaluationStats;
    const totalEvaluations = Object.values(counts).reduce((a, b) => a + b, 0);
    const completionRate = counts.completed ? (counts.completed / totalEvaluations * 100).toFixed(1) : 0;

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {/* Status Overview */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Visão Geral
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Total de Avaliações
                                    </Typography>
                                    <Typography variant="h4">
                                        {totalEvaluations}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Taxa de Conclusão
                                    </Typography>
                                    <Typography variant="h4">
                                        {completionRate}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Pendentes
                                    </Typography>
                                    <Typography variant="h4" color="warning.main">
                                        {counts.pending || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Concluídas
                                    </Typography>
                                    <Typography variant="h4" color="success.main">
                                        {counts.completed || 0}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pending Evaluations Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Avaliações Recentes
                            </Typography>
                            <TableContainer component={Paper} elevation={0}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Formulário</TableCell>
                                            <TableCell>Avaliador</TableCell>
                                            <TableCell>Colaborador</TableCell>
                                            <TableCell>Status</TableCell>
                                            {isAdmin && <TableCell>Data</TableCell>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recent.map((evaluation) => (
                                            <TableRow key={evaluation.id}>
                                                <TableCell>{evaluation.template.title}</TableCell>
                                                <TableCell>{evaluation.evaluator.name}</TableCell>
                                                <TableCell>{evaluation.evaluatee.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={STATUS_LABELS[evaluation.status]}
                                                        color={STATUS_COLORS[evaluation.status]}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                {isAdmin && (
                                                    <TableCell>
                                                        {new Date(evaluation.created_at).toLocaleDateString()}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Admin Progress Overview */}
                {isAdmin && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Progresso por Líder
                                </Typography>
                                <TableContainer component={Paper} elevation={0}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Líder</TableCell>
                                                <TableCell>Total de Avaliações</TableCell>
                                                <TableCell>Pendentes</TableCell>
                                                <TableCell>Concluídas</TableCell>
                                                <TableCell>Progresso</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* This would be populated with leader-specific stats */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default EvaluationDashboard;

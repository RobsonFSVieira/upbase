import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Tooltip,
    Alert,
    Snackbar
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Block as SuspendIcon,
    Edit as EditIcon,
    FileCopy as DuplicateIcon,
    Delete as DeleteIcon,
    History as HistoryIcon
} from '@mui/icons-material';

const STATUS_CONFIG = {
    draft: { label: 'Rascunho', color: 'default' },
    pending: { label: 'Pendente Aprovação', color: 'warning' },
    active: { label: 'Ativo', color: 'success' },
    suspended: { label: 'Suspenso', color: 'error' },
    archived: { label: 'Arquivado', color: 'default' }
};

const FormManager = () => {
    const [forms, setForms] = useState([
        {
            id: 1,
            title: 'Avaliação de Desempenho Padrão',
            description: 'Formulário padrão para avaliação semestral',
            status: 'active',
            version: '1.2',
            lastModified: '2025-05-20',
            sections: 5,
            questions: 15,
            history: [
                { date: '2025-05-20', action: 'Ativado', user: 'Admin' },
                { date: '2025-05-15', action: 'Aprovado', user: 'Gerente RH' },
                { date: '2025-05-10', action: 'Criado', user: 'Analista RH' }
            ]
        },
        {
            id: 2,
            title: 'Avaliação de Liderança',
            description: 'Formulário específico para avaliar competências de liderança',
            status: 'pending',
            version: '2.0',
            lastModified: '2025-05-25',
            sections: 4,
            questions: 12,
            history: [
                { date: '2025-05-25', action: 'Submetido para aprovação', user: 'Analista RH' },
                { date: '2025-05-20', action: 'Criado', user: 'Analista RH' }
            ]
        }
    ]);

    const [selectedForm, setSelectedForm] = useState(null);
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleStatusChange = (formId, newStatus) => {
        const updatedForms = forms.map(form => {
            if (form.id === formId) {
                return {
                    ...form,
                    status: newStatus,
                    history: [
                        {
                            date: new Date().toISOString().split('T')[0],
                            action: STATUS_CONFIG[newStatus].label,
                            user: 'Admin'
                        },
                        ...form.history
                    ]
                };
            }
            return form;
        });
        setForms(updatedForms);
        setSnackbar({
            open: true,
            message: `Status alterado para ${STATUS_CONFIG[newStatus].label}`,
            severity: 'success'
        });
    };

    const handleDuplicate = (form) => {
        const newForm = {
            ...form,
            id: Date.now(),
            title: `${form.title} (Cópia)`,
            status: 'draft',
            version: '1.0',
            lastModified: new Date().toISOString().split('T')[0],
            history: [
                {
                    date: new Date().toISOString().split('T')[0],
                    action: 'Duplicado',
                    user: 'Admin'
                }
            ]
        };
        setForms([...forms, newForm]);
        setSnackbar({
            open: true,
            message: 'Formulário duplicado com sucesso',
            severity: 'success'
        });
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                    Gerenciamento de Formulários
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {/* Navegar para criar novo formulário */ }}
                >
                    Novo Formulário
                </Button>
            </Box>

            <Grid container spacing={3}>
                {forms.map((form) => (
                    <Grid item xs={12} md={6} key={form.id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {form.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Versão {form.version} • Última modificação: {form.lastModified}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={STATUS_CONFIG[form.status].label}
                                        color={STATUS_CONFIG[form.status].color}
                                        size="small"
                                    />
                                </Box>

                                <Typography color="text.secondary" paragraph>
                                    {form.description}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {form.sections} seções • {form.questions} questões
                                </Typography>

                                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                                    {form.status === 'pending' && (
                                        <Tooltip title="Aprovar">
                                            <IconButton
                                                size="small"
                                                color="success"
                                                onClick={() => handleStatusChange(form.id, 'active')}
                                            >
                                                <ApproveIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {form.status === 'active' && (
                                        <Tooltip title="Suspender">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleStatusChange(form.id, 'suspended')}
                                            >
                                                <SuspendIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => {/* Navegar para edição */ }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Duplicar">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDuplicate(form)}
                                        >
                                            <DuplicateIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Histórico">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setSelectedForm(form);
                                                setHistoryDialogOpen(true);
                                            }}
                                        >
                                            <HistoryIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => {/* Confirmar exclusão */ }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Diálogo de Histórico */}
            <Dialog
                open={historyDialogOpen}
                onClose={() => setHistoryDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Histórico de Alterações
                    {selectedForm && (
                        <Typography variant="subtitle2" color="text.secondary">
                            {selectedForm.title}
                        </Typography>
                    )}
                </DialogTitle>
                <DialogContent dividers>
                    {selectedForm?.history.map((entry, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2">
                                {entry.action}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {entry.date} • {entry.user}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setHistoryDialogOpen(false)}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para feedbacks */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default FormManager;

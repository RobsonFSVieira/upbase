import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Tooltip,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    FileCopy as CopyIcon,
    Delete as DeleteIcon,
    Check as ApproveIcon,
    Block as SuspendIcon,
    Undo as RevertIcon
} from '@mui/icons-material';

const FormularioManager = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [models] = useState([
        {
            id: 1,
            title: 'Avaliação Padrão',
            description: 'Modelo base para avaliação de desempenho',
            status: 'active',
            sections: 5,
            questions: 15,
            lastModified: '2025-05-20'
        },
        {
            id: 2,
            title: 'Avaliação de Liderança',
            description: 'Modelo específico para avaliar líderes',
            status: 'draft',
            sections: 4,
            questions: 12,
            lastModified: '2025-05-15'
        }
    ]);

    const handleStatusChange = (modelId, newStatus) => {
        // Implementar lógica de mudança de status
    };

    const getStatusChip = (status) => {
        const statusConfig = {
            active: { label: 'Ativo', color: 'success' },
            draft: { label: 'Rascunho', color: 'default' },
            suspended: { label: 'Suspenso', color: 'warning' },
            archived: { label: 'Arquivado', color: 'error' }
        };

        const config = statusConfig[status] || statusConfig.draft;
        return <Chip label={config.label} color={config.color} size="small" />;
    };

    return (
        <Box>
            {/* Barra de ações */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Modelos de Formulário</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Novo Modelo
                </Button>
            </Box>

            {/* Lista de modelos */}
            <Grid container spacing={3}>
                {models.map((model) => (
                    <Grid item xs={12} md={6} key={model.id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Typography variant="h6">{model.title}</Typography>
                                    {getStatusChip(model.status)}
                                </Box>

                                <Typography color="text.secondary" paragraph>
                                    {model.description}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {model.sections} seções • {model.questions} questões
                                    </Typography>

                                    <Box>
                                        {model.status === 'draft' && (
                                            <Tooltip title="Aprovar">
                                                <IconButton size="small" onClick={() => handleStatusChange(model.id, 'active')}>
                                                    <ApproveIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {model.status === 'active' && (
                                            <Tooltip title="Suspender">
                                                <IconButton size="small" onClick={() => handleStatusChange(model.id, 'suspended')}>
                                                    <SuspendIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Editar">
                                            <IconButton size="small">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Duplicar">
                                            <IconButton size="small">
                                                <CopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FormularioManager;

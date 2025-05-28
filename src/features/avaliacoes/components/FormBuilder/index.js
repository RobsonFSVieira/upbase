import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider,
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    DragHandle as DragHandleIcon,
    Save as SaveIcon,
    Visibility as PreviewIcon,
    ContentCopy as DuplicateIcon
} from '@mui/icons-material';

const FIELD_TYPES = {
    text: 'Texto curto',
    textarea: 'Texto longo',
    radio: 'Escolha única',
    checkbox: 'Múltipla escolha',
    rating: 'Avaliação (1-5)',
    heading: 'Título de seção'
};

const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState('Novo Modelo de Avaliação');
    const [formDescription, setFormDescription] = useState('');
    const [sections, setSections] = useState([
        {
            id: 1,
            title: 'Seção 1',
            description: '',
            fields: [
                {
                    id: 1,
                    type: 'rating',
                    label: 'Cooperação e trabalho em equipe',
                    required: true
                }
            ]
        }
    ]);

    const handleAddSection = () => {
        setSections([
            ...sections,
            {
                id: Date.now(),
                title: `Seção ${sections.length + 1}`,
                description: '',
                fields: []
            }
        ]);
    };

    const handleAddField = (sectionId) => {
        const newSections = sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    fields: [
                        ...section.fields,
                        {
                            id: Date.now(),
                            type: 'rating',
                            label: 'Nova questão',
                            required: true
                        }
                    ]
                };
            }
            return section;
        });
        setSections(newSections);
    };

    const handleDeleteField = (sectionId, fieldId) => {
        const newSections = sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    fields: section.fields.filter(field => field.id !== fieldId)
                };
            }
            return section;
        });
        setSections(newSections);
    };

    const handleUpdateField = (sectionId, fieldId, updates) => {
        const newSections = sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    fields: section.fields.map(field =>
                        field.id === fieldId ? { ...field, ...updates } : field
                    )
                };
            }
            return section;
        });
        setSections(newSections);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Área de edição */}
            <Box sx={{ flex: 1 }}>
                <Paper sx={{ p: 3, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Título do formulário"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Descrição"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                    />
                </Paper>

                {sections.map((section) => (
                    <Paper key={section.id} sx={{ p: 3, mb: 2 }}>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Título da seção"
                                value={section.title}
                                onChange={(e) => {
                                    const newSections = sections.map(s =>
                                        s.id === section.id ? { ...s, title: e.target.value } : s
                                    );
                                    setSections(newSections);
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Descrição da seção"
                                value={section.description}
                                onChange={(e) => {
                                    const newSections = sections.map(s =>
                                        s.id === section.id ? { ...s, description: e.target.value } : s
                                    );
                                    setSections(newSections);
                                }}
                            />
                        </Box>

                        {section.fields.map((field) => (
                            <Card key={field.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        <IconButton size="small">
                                            <DragHandleIcon />
                                        </IconButton>
                                        <FormControl fullWidth>
                                            <InputLabel>Tipo de campo</InputLabel>
                                            <Select
                                                value={field.type}
                                                label="Tipo de campo"
                                                onChange={(e) => handleUpdateField(section.id, field.id, { type: e.target.value })}
                                                size="small"
                                            >
                                                {Object.entries(FIELD_TYPES).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>{label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteField(section.id, field.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>

                                    <TextField
                                        fullWidth
                                        label="Pergunta"
                                        value={field.label}
                                        onChange={(e) => handleUpdateField(section.id, field.id, { label: e.target.value })}
                                        size="small"
                                    />
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => handleAddField(section.id)}
                            sx={{ mt: 1 }}
                        >
                            Adicionar Pergunta
                        </Button>
                    </Paper>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddSection}
                    sx={{ mb: 2 }}
                    fullWidth
                >
                    Adicionar Seção
                </Button>
            </Box>

            {/* Barra lateral de ações */}
            <Box sx={{ width: 200 }}>
                <Paper sx={{ p: 2, position: 'sticky', top: 16 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Ações
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            fullWidth
                        >
                            Salvar
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<PreviewIcon />}
                            fullWidth
                        >
                            Visualizar
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<DuplicateIcon />}
                            fullWidth
                        >
                            Duplicar
                        </Button>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        Templates
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button size="small">Avaliação Padrão</Button>
                        <Button size="small">Avaliação Técnica</Button>
                        <Button size="small">Avaliação de Líder</Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default FormBuilder;

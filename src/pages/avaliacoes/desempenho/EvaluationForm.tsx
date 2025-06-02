import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Card,
    CardContent,
    Alert,
    CircularProgress,
    Grid
} from '@mui/material';
import { evaluationService } from '../../../services/evaluationService';

interface EvaluationFormProps {
    evaluationId?: string;
    onComplete?: () => void;
}

interface FormData {
    criterias: Array<{
        id: string;
        name: string;
        score: number;
        comment: string;
    }>;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluationId, onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        criterias: []
    });

    useEffect(() => {
        if (evaluationId) {
            loadEvaluation();
        } else {
            loadTemplate();
        }
    }, [evaluationId]);

    const loadEvaluation = async () => {
        try {
            setLoading(true);
            const data = await evaluationService.getEvaluationById(evaluationId!);
            setFormData(data);
        } catch (err) {
            setError('Erro ao carregar avaliação');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadTemplate = async () => {
        try {
            setLoading(true);
            const template = await evaluationService.getDefaultTemplate();
            setFormData({
                criterias: template.criterias.map((c: { id: string; name: string; weight: number }) => ({
                    ...c,
                    score: 0,
                    comment: ''
                }))
            });
        } catch (err) {
            setError('Erro ao carregar template');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');

            await evaluationService.saveEvaluation(evaluationId, formData);
            onComplete?.();
        } catch (err) {
            setError('Erro ao salvar avaliação');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Avaliação de Desempenho
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {formData.criterias.map((criteria, index) => (
                    <Grid item xs={12} key={criteria.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {criteria.name}
                                </Typography>

                                <Rating
                                    value={criteria.score}
                                    onChange={(_, newValue) => {
                                        const newCriterias = [...formData.criterias];
                                        newCriterias[index].score = newValue || 0;
                                        setFormData({ ...formData, criterias: newCriterias });
                                    }}
                                    size="large"
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Comentários"
                                    value={criteria.comment}
                                    onChange={(e) => {
                                        const newCriterias = [...formData.criterias];
                                        newCriterias[index].comment = e.target.value;
                                        setFormData({ ...formData, criterias: newCriterias });
                                    }}
                                    sx={{ mt: 2 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="contained"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Salvar Avaliação
                </Button>
            </Box>
        </Box>
    );
};

export default EvaluationForm;

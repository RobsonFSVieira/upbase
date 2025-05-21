import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FormTemplateService } from '../services/FormTemplateService';
import { FormTemplate } from '../models/FormTemplate';
import { TIPOS_AVALIACAO } from '../../../utils/constants/avaliacoes';

const FormTemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState(new FormTemplate());
  const isNew = !id;

  useEffect(() => {
    if (!isNew) {
      const loadTemplate = async () => {
        try {
          setLoading(true);
          const data = await FormTemplateService.getById(id);
          if (data) {
            setTemplate(data);
          } else {
            setError('Modelo de formulário não encontrado');
            // Redirecionar após um tempo
            setTimeout(() => navigate('/avaliacoes/modelos'), 3000);
          }
        } catch (err) {
          setError('Erro ao carregar modelo de formulário');
        } finally {
          setLoading(false);
        }
      };
      
      loadTemplate();
    }
  }, [id, isNew, navigate]);

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSection = () => {
    const newSection = FormTemplate.createSection({
      title: `Nova Seção ${template.sections.length + 1}`
    });
    
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const handleUpdateSection = (sectionId, updates) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const handleDeleteSection = (sectionId) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const handleAddItem = (sectionId) => {
    const newItem = FormTemplate.createItem({
      question: `Nova Questão`
    });
    
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { ...section, items: [...section.items, newItem] } 
          : section
      )
    }));
  };

  const handleUpdateItem = (sectionId, itemId, updates) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items.map(item => 
                item.id === itemId ? { ...item, ...updates } : item
              ) 
            } 
          : section
      )
    }));
  };

  const handleDeleteItem = (sectionId, itemId) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items.filter(item => item.id !== itemId) 
            } 
          : section
      )
    }));
  };

  const handleSaveTemplate = async () => {
    try {
      setSaving(true);
      
      if (isNew) {
        await FormTemplateService.create(template);
      } else {
        await FormTemplateService.update(id, template);
      }
      
      navigate('/avaliacoes/modelos');
    } catch (err) {
      setError('Erro ao salvar modelo de formulário');
    } finally {
      setSaving(false);
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/avaliacoes">Avaliações</MuiLink>
        <MuiLink component={Link} to="/avaliacoes/modelos">Modelos de Avaliação</MuiLink>
        <Typography color="text.primary">
          {isNew ? 'Novo Modelo' : 'Editar Modelo'}
        </Typography>
      </Breadcrumbs>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {isNew ? 'Novo Modelo de Avaliação' : 'Editar Modelo de Avaliação'}
        </Typography>
        <Box>
          <Button 
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 1 }}
            component={Link}
            to="/avaliacoes/modelos"
          >
            Cancelar
          </Button>
          <Button 
            variant="contained"
            color="primary"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            onClick={handleSaveTemplate}
            disabled={saving}
          >
            Salvar
          </Button>
        </Box>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informações Básicas
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título do Modelo"
              name="title"
              value={template.title}
              onChange={handleBasicInfoChange}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              name="description"
              value={template.description}
              onChange={handleBasicInfoChange}
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Tipo de Avaliação</InputLabel>
              <Select
                name="type"
                value={template.type}
                onChange={handleBasicInfoChange}
                label="Tipo de Avaliação"
              >
                <MenuItem value="desempenho">Avaliação de Desempenho</MenuItem>
                <MenuItem value="experiencia">Avaliação de Experiência</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Subtipo</InputLabel>
              <Select
                name="subtype"
                value={template.subtype}
                onChange={handleBasicInfoChange}
                label="Subtipo"
              >
                {template.type === 'desempenho' ? (
                  <>
                    <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.TRIMESTRAL}>Trimestral</MenuItem>
                    <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.SEMESTRAL}>Semestral</MenuItem>
                    <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.ANUAL}>Anual</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value={TIPOS_AVALIACAO.EXPERIENCIA.PERIODO_TESTE}>Período de Teste</MenuItem>
                    <MenuItem value={TIPOS_AVALIACAO.EXPERIENCIA.FINAL_CONTRATO}>Final de Contrato</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={template.status}
                onChange={handleBasicInfoChange}
                label="Status"
              >
                <MenuItem value="draft">Rascunho</MenuItem>
                <MenuItem value="active">Ativo</MenuItem>
                <MenuItem value="archived">Arquivado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Seções do Formulário
      </Typography>
      
      {template.sections.map((section, index) => (
        <Accordion key={section.id} defaultExpanded={template.sections.length < 4}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`section-${section.id}-content`}
            id={`section-${section.id}-header`}
            sx={{ bgcolor: 'grey.100' }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <DragIndicatorIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle1">
                {section.title || `Seção ${index + 1}`}
              </Typography>
              <Box flexGrow={1} />
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSection(section.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Card variant="outlined" sx={{ m: 0 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Título da Seção"
                      value={section.title}
                      onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descrição da Seção"
                      value={section.description}
                      onChange={(e) => handleUpdateSection(section.id, { description: e.target.value })}
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                  Questões
                </Typography>
                
                {section.items.map((item, itemIndex) => (
                  <Card key={item.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={11}>
                        <TextField
                          fullWidth
                          label="Questão"
                          value={item.question}
                          onChange={(e) => handleUpdateItem(section.id, item.id, { question: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={1} display="flex" justifyContent="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteItem(section.id, item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Tipo de Resposta</InputLabel>
                          <Select
                            value={item.type}
                            onChange={(e) => handleUpdateItem(section.id, item.id, { type: e.target.value })}
                            label="Tipo de Resposta"
                          >
                            <MenuItem value="text">Texto</MenuItem>
                            <MenuItem value="rating">Classificação (1-5)</MenuItem>
                            <MenuItem value="select">Seleção</MenuItem>
                            <MenuItem value="boolean">Sim/Não</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Obrigatório</InputLabel>
                          <Select
                            value={item.required}
                            onChange={(e) => handleUpdateItem(section.id, item.id, { required: e.target.value })}
                            label="Obrigatório"
                          >
                            <MenuItem value={true}>Sim</MenuItem>
                            <MenuItem value={false}>Não</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
                
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem(section.id)}
                    size="small"
                  >
                    Adicionar Questão
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
      
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddSection}
        >
          Adicionar Seção
        </Button>
      </Box>
    </Box>
  );
};

export default FormTemplateEditor;

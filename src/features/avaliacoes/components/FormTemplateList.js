import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Grid, 
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { FormTemplateService } from '../services/FormTemplateService';
import { STATUS_AVALIACAO } from '../../../utils/constants/avaliacoes';

const FormTemplateList = ({ type = 'desempenho', onError }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        let data;
        if (type) {
          data = await FormTemplateService.getByType(type);
        } else {
          data = await FormTemplateService.getAll();
        }
        setTemplates(data);
      } catch (error) {
        console.error('Erro ao carregar templates:', error);
        if (onError) onError(error.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplates();
  }, [type, onError]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'draft': return 'Rascunho';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredTemplates = templates.filter(template => {
    if (selectedTab === 'all') return true;
    return template.status === selectedTab;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (templates.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Nenhum modelo de formulário encontrado. Crie um novo modelo para começar.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="status dos modelos">
          <Tab label="Todos" value="all" />
          <Tab label="Ativos" value="active" />
          <Tab label="Rascunhos" value="draft" />
          <Tab label="Arquivados" value="archived" />
        </Tabs>
      </Box>

      {filteredTemplates.length === 0 ? (
        <Alert severity="info">
          Nenhum modelo encontrado com o status selecionado.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredTemplates.map((template) => (
            <Grid item xs={12} md={6} key={template.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2" gutterBottom>
                      {template.title}
                    </Typography>
                    <Chip 
                      label={getStatusLabel(template.status)}
                      color={getStatusColor(template.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {template.description || 'Sem descrição'}
                  </Typography>
                  
                  <Typography variant="caption" display="block" color="text.secondary">
                    Tipo: {template.subtype || template.type}
                  </Typography>
                  
                  {template.sections?.length > 0 && (
                    <Typography variant="caption" display="block" color="text.secondary">
                      {template.sections.length} seções
                    </Typography>
                  )}
                  
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton 
                      component={Link} 
                      to={`/avaliacoes/modelos/${template.id}`}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                      title="Visualizar"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      component={Link} 
                      to={`/avaliacoes/modelos/${template.id}/edit`}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                      title="Editar"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small"
                      color="error"
                      title="Excluir"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FormTemplateList;

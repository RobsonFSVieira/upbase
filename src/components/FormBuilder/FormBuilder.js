import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FileCopy as DuplicateIcon,
} from '@mui/icons-material';

const FormBuilder = forwardRef(({ initialData, onSave }, ref) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    validFrom: initialData?.validFrom || '',
    validUntil: initialData?.validUntil || '',
    sections: initialData?.sections || []
  });

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      if (!formData.title.trim()) {
        alert('Por favor, preencha o título do modelo');
        return;
      }

      const validatedFormData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        validFrom: formData.validFrom,
        validUntil: formData.validUntil,
        sections: formData.sections.map(section => ({
          ...section,
          title: section.title.trim(),
          items: section.items.map(item => ({
            ...item,
            title: item.title.trim(),
            type: item.type || 'rating',
            weight: item.weight || 1.0
          }))
        }))
      };

      if (onSave) {
        onSave(validatedFormData);
      }
    }
  }));

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: Date.now(),
        title: `Nova Seção ${prev.sections.length + 1}`,
        items: []
      }]
    }));
  };

  const addItem = (sectionId) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? {
          ...section,
          items: [...section.items, {
            id: Date.now(),
            type: 'rating',
            title: 'Novo Critério',
            required: true,
            weight: 1.0
          }]
        } : section
      )
    }));
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Título do Modelo"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Descrição"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Válido a partir de"
            type="date"
            value={formData.validFrom}
            onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            fullWidth
            label="Válido até"
            type="date"
            value={formData.validUntil}
            onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Paper>

      {formData.sections.map((section, index) => (
        <Paper key={section.id} sx={{ mb: 3, p: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              value={section.title}
              onChange={(e) => {
                const newSections = [...formData.sections];
                newSections[index].title = e.target.value;
                setFormData(prev => ({ ...prev, sections: newSections }));
              }}
              variant="standard"
              fullWidth
            />
            <IconButton onClick={() => {
              const newSections = [...formData.sections];
              newSections.splice(index, 1);
              setFormData(prev => ({ ...prev, sections: newSections }));
            }}>
              <DeleteIcon />
            </IconButton>
          </Box>

          {section.items?.map((item, itemIndex) => (
            <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Título do Critério"
                  value={item.title}
                  onChange={(e) => {
                    const newSections = [...formData.sections];
                    newSections[index].items[itemIndex].title = e.target.value;
                    setFormData(prev => ({ ...prev, sections: newSections }));
                  }}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Resposta</InputLabel>
                  <Select
                    value={item.type}
                    onChange={(e) => {
                      const newSections = [...formData.sections];
                      newSections[index].items[itemIndex].type = e.target.value;
                      setFormData(prev => ({ ...prev, sections: newSections }));
                    }}
                    label="Tipo de Resposta"
                  >
                    <MenuItem value="rating">Avaliação (1-10)</MenuItem>
                    <MenuItem value="text">Texto</MenuItem>
                  </Select>
                </FormControl>
                {item.type === 'rating' && (
                  <FormControl fullWidth>
                    <InputLabel>Peso do Critério</InputLabel>
                    <Select
                      value={item.weight || 1.0}
                      onChange={(e) => {
                        const newSections = [...formData.sections];
                        newSections[index].items[itemIndex].weight = e.target.value;
                        setFormData(prev => ({ ...prev, sections: newSections }));
                      }}
                      label="Peso do Critério"
                    >
                      <MenuItem value={1.0}>Normal (1.0)</MenuItem>
                      <MenuItem value={1.5}>Líder (1.5)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={() => addItem(section.id)}
            variant="outlined"
            fullWidth
          >
            Adicionar Critério
          </Button>
        </Paper>
      ))}

      <Button
        startIcon={<AddIcon />}
        onClick={addSection}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Adicionar Seção
      </Button>
    </Box>
  );
});

export default FormBuilder;

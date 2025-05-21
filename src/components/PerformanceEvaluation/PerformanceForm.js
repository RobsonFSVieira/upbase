import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const PerformanceForm = () => {
  const [evaluation, setEvaluation] = useState({
    employeeName: '',
    department: '',
    period: '',
    goals: '',
    skills: '',
    rating: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui vai a lógica para salvar a avaliação
    console.log(evaluation);
  };

  const handleChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <h2>Avaliação de Desempenho</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Funcionário</Form.Label>
          <Form.Control
            type="text"
            name="employeeName"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departamento</Form.Label>
          <Form.Control
            type="text"
            name="department"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Período de Avaliação</Form.Label>
          <Form.Control
            type="text"
            name="period"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Metas Atingidas</Form.Label>
          <Form.Control
            as="textarea"
            name="goals"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avaliação de Competências</Form.Label>
          <Form.Control
            as="textarea"
            name="skills"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Classificação Geral</Form.Label>
          <Form.Select name="rating" onChange={handleChange} required>
            <option value="">Selecione...</option>
            <option value="5">Excelente</option>
            <option value="4">Muito Bom</option>
            <option value="3">Bom</option>
            <option value="2">Regular</option>
            <option value="1">Precisa Melhorar</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comentários Adicionais</Form.Label>
          <Form.Control
            as="textarea"
            name="comments"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar Avaliação
        </Button>
      </Form>
    </Container>
  );
};

export default PerformanceForm;

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const PerformanceFilters = ({ filters, onFilterChange }) => {
  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Group>
          <Form.Label>Funcionário</Form.Label>
          <Form.Control
            type="text"
            name="employeeName"
            value={filters.employeeName}
            onChange={onFilterChange}
            placeholder="Buscar por nome"
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group>
          <Form.Label>Departamento</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={filters.department}
            onChange={onFilterChange}
            placeholder="Filtrar por departamento"
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group>
          <Form.Label>Período</Form.Label>
          <Form.Control
            type="text"
            name="period"
            value={filters.period}
            onChange={onFilterChange}
            placeholder="Período de avaliação"
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group>
          <Form.Label>Classificação</Form.Label>
          <Form.Select
            name="rating"
            value={filters.rating}
            onChange={onFilterChange}
          >
            <option value="">Todas</option>
            <option value="5">Excelente</option>
            <option value="4">Muito Bom</option>
            <option value="3">Bom</option>
            <option value="2">Regular</option>
            <option value="1">Precisa Melhorar</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default PerformanceFilters;

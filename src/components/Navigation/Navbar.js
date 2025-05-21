import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Meu App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Início
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            Sobre
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contato
          </Nav.Link>
          <Nav.Link as={Link} to="/performance-evaluation">
            Avaliação de Desempenho
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
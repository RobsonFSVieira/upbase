import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        {/* ...existing menu items... */}
        <Nav.Item>
          <Nav.Link as={Link} to="/avaliacoes/desempenho">
            <i className="fas fa-chart-line me-2"></i>
            Avaliações de Desempenho
          </Nav.Link>
        </Nav.Item>
        {/* ...existing menu items... */}
      </Nav>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="admin-panel">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title="Admin" id="admin-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="content-container">
        <div className="sidebar">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link onClick={() => handleMenuClick('dashboard')} active={activeMenu === 'dashboard'}>
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleMenuClick('users')} active={activeMenu === 'users'}>
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleMenuClick('products')} active={activeMenu === 'products'}>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleMenuClick('orders')} active={activeMenu === 'orders'}>
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleMenuClick('settings')} active={activeMenu === 'settings'}>
                Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="main-content">
          {activeMenu === 'dashboard' && <h1>Dashboard</h1>}
          {activeMenu === 'users' && <h1>Users</h1>}
          {activeMenu === 'products' && <h1>Products</h1>}
          {activeMenu === 'orders' && <h1>Orders</h1>}
          {activeMenu === 'settings' && <h1>Settings</h1>}
        </div>
      </Container>
    </div>
  );
}

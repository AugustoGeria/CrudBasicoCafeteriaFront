import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">CRUD Basico</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            exact={true}
            to="/"
            className="nav-link"
            activeClassName="active"
          >
            Inicio
          </NavLink>
          <NavLink
            exact={true}
            to="/productos"
            className="nav-link"
            activeClassName="active"
          >
            Productos
          </NavLink>
          <NavLink
            exact={true}
            to="/productos/nuevo"
            className="nav-link"
            activeClassName="active"
          >
            Agregar Productos{" "}
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

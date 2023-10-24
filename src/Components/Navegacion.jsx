import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logosolo from '../assets/logosolo.png'
import { Context } from "../Context";
import { BiSolidUserCircle } from 'react-icons/bi'

//Este ícono se saca de la sección de "Font Awesome 5" del sitio web https://react-icons.github.io/react-icons/icons?name=fa 
//ojo que para "Font Awesome 6" la importación es diferente :O aquí abajo dejo un ejemplo de otro icono
import { FaCartShopping } from "react-icons/fa6";

const Navegacion = () => {
  const [localnombre, setlocalnombre] = useState('');
  const { carrito, logout } = useContext(Context);
  const compToken = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const nombre = localStorage.getItem('nombreUsuario');
      setlocalnombre(nombre);
    }
  }, [compToken]);

  const totalProductosCarrito = carrito.length; // Se obtiene la cantidad de productos en el carrito.

  return (
    <div>
      <Navbar expand="lg" bg="primary" className="navegacion box-shadow justify-content-between" fixed="top">
        <Container className="navCont1">
          <Navbar.Brand href="/" className="brand">
            <img src={logosolo} alt="La Ñoñería.cl" className="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              <Container className="containerBtns flex justify-content-between">
                <div className="leftsideNav flex">
                  <Nav.Link className="linkNav mx-1" href="/">Home</Nav.Link>
                  <Nav.Link className="linkNav mx-1" href="/tienda">Tienda</Nav.Link>
                </div>
                <div className="rightsideNav flex ml-auto">
                  {localStorage.getItem('token') ? (
                    <>
                      <NavDropdown title={<span className='botonUser'><BiSolidUserCircle /> Bienvenido/a {localnombre}</span>} id="basic-nav-dropdown" menuVariant="dark">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Item href="/misproductos">Mis Productos</NavDropdown.Item>
                        <NavDropdown.Item href="/publicar">Publicar Producto</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                      </NavDropdown>

                      <Nav.Link className="carro" href="/carrito">
                        <span className='carrito'>
                          <FaCartShopping />
                        </span>
                        <span className="contador">
                          {totalProductosCarrito}
                        </span>
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link className="btnReglog text-light bg-dark mx-1 " href="/login">Login</Nav.Link>
                      <Nav.Link className="btnReglog text-light bg-dark mx-1 " href="/register">Registro</Nav.Link>
                    </>
                  )}
                </div>
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navegacion;

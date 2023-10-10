import React, {useEffect, useState, useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logosolo from '../assets/logosolo.png'

//Importar contexto
import Context from "../Context";

const Navegacion = () => {

//Para visibilidad de navbar
const [localnombre, setlocalnombre] = useState()
let token = localStorage.getItem('token')
let nombre = localStorage.getItem('nombreUsuario')
  const checkStorage = () =>{
    if(token){
        setNavbar("mia")
        setlocalnombre(nombre)
    }else{
        setNavbar("noShow")
    }
  }

  useEffect(() => {
    checkStorage();
  },[token]);

  //para carrito y detalle total en navbar
  const { prevCarrito, navbar, setNavbar, logout } = useContext(Context)

  const total = prevCarrito.reduce((a, { price, count }) => a + price * count, 0);


  const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive")

  return (
    <div>
      <Navbar expand="lg" bg="primary" className='navegacion box-shadow justify-content-between' fixed='top'>
        <Container className='navCont1'>
          <Navbar.Brand href="/" className='brand'>
            <img src={logosolo} alt="La Ñoñería.cl" className='logo' />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">

          <Container className='containerBtns flex justify-content-between'>
            <div className="leftsideNav flex">
              <Nav.Link className="mx-1" href="/">Home</Nav.Link>
              <Nav.Link className="mx-1" href="/tienda">Tienda</Nav.Link>
              <div className={`flex`}>
              <Nav.Link className="mx-1" href="/login">Login</Nav.Link>
              <Nav.Link className="mx-1" href="/register">Registro</Nav.Link>
              </div>
            </div>
            <div className='rightsideNav flex ml-auto'>
              <NavDropdown title= {`¡Hola ${localnombre}!`} id="basic-nav-dropdown" menuVariant="dark" className={navbar}>
                <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Placeholder
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Placeholder</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/carrito">🛒Carrito</Nav.Link>
              <Nav.Link className={setActiveClass} to="/Carrito">
                 : ${total ? total.toLocaleString() : 0}
              </Nav.Link>
            </div>
            </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default Navegacion
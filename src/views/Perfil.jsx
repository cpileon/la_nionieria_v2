import React from 'react'
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import profile from '../assets/profile.svg'

const Perfil = () => {
    return (
        <div className="perfil flex container">
            <Row className='container'>
                <Col>
                    <div className="card1">
                        <h1>Mi Perfil</h1>
                        <img src={profile} className='placeholderProfile'></img>
                        <p>¡Bienvenido <span>NOMBRE</span>!</p>
                    </div>
                </Col>
                <Col>
                    <div className="card2">
                        <h4>¿Qué te gustaría hacer ahora?</h4>
                        <ul>
                            <a ></a>
                            <li><a href="#">Ver mis productos</a></li>
                            <li><Link to= "/publicar">Publicar un producto</Link></li>
                            <li><Link to="/carrito">Ir a Mi Carrito</Link></li>
                            <li><a href="#">Editar Mi Perfil</a></li>
                            <li><a href="#">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Perfil
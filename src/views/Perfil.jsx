import React, {useEffect, useState, useContext} from 'react'
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import profile from '../assets/profile.svg'
//Importar Contexto
import Context from "../Context";

const Perfil = () => {
    const { logout, idUsuario, setIdUsuario } = useContext(Context)

 //Aquí se guardan los datos localmente
  const [usuario, setUsuarioLocal] = useState({});

  const getUsuarioData = async () => {
    const urlServer = "http://localhost:3000";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");

    try {
      //de data sacamos la id_usuario
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setIdUsuario(data.id)
      console.log(idUsuario)
      setUsuarioLocal(data);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        if (error.response && error.response.data) {
          console.error("Respuesta del servidor:", error.response.data);
        }
        alert("Ha ocurrido un error en la solicitud. 🙁");
      }
    }

  useEffect(() => {
    getUsuarioData();
  },[]);
    return (
        <div className="perfil flex container">
            <Row className='container'>
                <Col>
                    <div className="card1">
                        <h1>Mi Perfil</h1>
                        <img src={profile} className='placeholderProfile'></img>
                        <p>¡Bienvenido/a <span>{usuario.nombre}</span>!</p>
                        <p>{usuario.email}</p>
                        <p>ID: {idUsuario}</p>
                    </div>
                </Col>
                <Col>
                    <div className="card2">
                        <h4>¿Qué te gustaría hacer ahora?</h4>
                        <ul>
                            <a ></a>
                            <li><a href="/misproductos">Ver mis productos</a></li>
                            <li><Link to= "/publicar">Publicar un producto</Link></li>
                            <li><Link to="/carrito">Ir a Mi Carrito</Link></li>
                            <li><a href="#" onClick={logout}>Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Perfil
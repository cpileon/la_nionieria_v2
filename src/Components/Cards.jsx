import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

/* import "../assets/cards.css" */

export default function Cards() {
    const { productos, setProductos, prevCarrito, setPrevCarrito } = useContext(Context);
    const getProductosData = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/productos";

        try {
            //de data sacamos la id_usuario
            const { data } = await axios.get(urlServer + endpoint, {
            });
            setProductos(data);

        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response && error.response.data) {
                console.error("Respuesta del servidor:", error.response.data);
            }
            alert("Ha ocurrido un error en la solicitud. 🙁");
        }
    }

    useEffect(() => {
        getProductosData();
    }, []);


    const navigate = useNavigate();

    const verDetalle = (e) => {
        navigate(`/producto/${e.target.id}`)
    }

    const agregarAlCarrito = ({ id, precio, nombre, imagen }) => {
        const itemProducto = productos.find((item) => item.id === id);
        const index = prevCarrito.findIndex((item) => item.id === id)
        const producto = { id, precio, nombre, imagen, count: 1 };

        if (index >= 0) {
            prevCarrito[index].count++;
            setPrevCarrito([...prevCarrito]);

        } else {
            setPrevCarrito([...prevCarrito, producto]);

        }

        /* console.log("este es el total:" + (total)) */
    }

    return (
        <div className="galeria">
            {productos.map((producto) => {
                return (
                    <Card key={producto.id} style={{ width: '18rem' }}>
                        <Card.Img className="imgCard" variant="top" src={producto.imagen} />
                        <Card.Body>
                            <Card.Title className="titles">{producto.nombre}</Card.Title>
                            <hr />
                            <dl>
                                <dt>Detalles del Producto:</dt>
                                <br />
                                <Card.Text className="categoria">{producto.categoria}</Card.Text>
                                <Card.Text className="estado">{producto.estado}</Card.Text>
                            </dl>
                            <hr />
                            <Card.Text className="prices">
                                <strong> $ {producto.precio.toLocaleString()} </strong>
                            </Card.Text>
                            <div className="botones">
                                <button className="btnOne" onClick={verDetalle} id={producto.id}>Ver Más 👀</button>
                                <button className="btnTwo" onClick={() => agregarAlCarrito(producto)} id={producto.id}>Añadir 🛒</button>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}

        </div>
    )
}
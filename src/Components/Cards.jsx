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
        const urlServer = "https://server-trabajo-final-g3.onrender.com";
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

    /* const agregarAlCarrito = (e) => {
        const itemProducto = productos.find((item) => item.id === e.target.id);
        const index = prevCarrito.findIndex((item) => item.id === itemProducto.id)

        const producto = { e, count: 1 };

        if (index === -1) {
            setPrevCarrito([...prevCarrito, { id: itemProducto.id, precio: itemProducto.precio, nombre: itemProducto.nombre, imagen: itemProducto.imagen, cant: 1 }])
        } else {
            const newCarrito = [...prevCarrito];
            newCarrito[index].cant++;
            setPrevCarrito(newCarrito);

        }

        console.log("este es el total:" + (total))
    } */

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
                    <Card key={producto.id} style={{ width: '18rem' }} className='cardGaleria'>
                        <Card.Img className="imgCard embed-responsive-item" variant="top" src={producto.imagen} />
                        <Card.Body>
                            <Card.Title className="titles">{producto.nombre}</Card.Title>
                            <hr />
                            <dl>
                                <dt>Detalles del Producto:</dt>
                                <br />
                                <div>
                                <Card.Text className="categoria">{producto.categoria}</Card.Text>
                                <Card.Text className="estado">{producto.estado}</Card.Text>
                                </div>
                            </dl>
                            <hr />
                            <Card.Text className="prices">
                                <strong> $ {producto.precio.toLocaleString()} </strong>
                            </Card.Text>
                            <div className="botones">
                                <button className="btnOne" onClick={verDetalle} id={producto.id}>Ver Más 👀</button>
                                <button className="btnTwo" onClick={agregarAlCarrito} id={producto.id}>Añadir 🛒</button>
                                {/* <button className="btnTwo" onClick={() => agregarAlCarrito(producto)} id={producto.id}>Añadir 🛒</button> */}
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}

        </div>
    )
}
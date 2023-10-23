import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

/* import "../assets/cards.css" */

export default function Cards() {
    const { productos, setProductos, agregarAlCarrito, carrito, setTotalPrecioCarrito, totalPrecioCarrito } = useContext(Context);
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

    const agregarProductoAlCarrito = (producto) => {
        if (localStorage.getItem('token')) {
            // Si el usuario está autenticado, puede agregar el producto al carrito.
            const productoExistente = carrito.find((item) => item.id === producto.id);

            if (!productoExistente) {
                agregarAlCarrito(producto);

                // Actualiza el estado totalPrecioCarrito en el contexto
                const nuevoTotal = totalPrecioCarrito + (producto.precio * producto.cantidad);
                setTotalPrecioCarrito(nuevoTotal);

                // Actualiza el almacenamiento local
                localStorage.setItem("carrito", JSON.stringify([...carrito, producto]));
                localStorage.setItem("precioTotal", nuevoTotal.toString());
            } else {
                alert("Ya has agregado este producto al carrito, solo puedes agregarlo una vez.");
            }
        } else {
            // Si el usuario no está autenticado, lo redirige a la página de inicio de sesión
            navigate("/login");
        }
    };

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
                                <button className="btnTwo" onClick={() => agregarProductoAlCarrito(producto)} id={producto.id}>Añadir 🛒</button>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}

        </div>
    )
}
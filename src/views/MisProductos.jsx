import React, { useEffect, useState, useContext } from 'react'
import Context from "../Context";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function MisProductos() {
    const { prevCarrito, setPrevCarrito } = useContext(Context);

    const [misProductos, setMisProductos] = useState([]);
    const getMisProductosData = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/misproductos";
        const idUsuario = localStorage.getItem('idUsuario');

        try {
            //de data sacamos la id_usuario
            const { data } = await axios.post(urlServer + endpoint, { idUsuario: idUsuario });
            setMisProductos(data);

        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response && error.response.data) {
                console.error("Respuesta del servidor:", error.response.data);
            }
            alert("Ha ocurrido un error en la solicitud. 🙁");
        }
    }
    const navigate = useNavigate();

    const verDetalle = (e) => {
        navigate(`/miproducto/${e.target.id}`)
    }

    useEffect(() => {
        getMisProductosData();
    }, []);

    const agregarAlCarrito = ({ id, precio, nombre, imagen }) => {
        const itemProducto = misProductos.find((item) => item.id === id);
        const index = prevCarrito.findIndex((item) => item.id === id)
        const producto = { id, precio, nombre, imagen, count: 1 };

        if (index >= 0) {
            prevCarrito[index].count++;
            setPrevCarrito([...prevCarrito]);

        } else {
            setPrevCarrito([...prevCarrito, producto]);

        }
    }

    const eliminarProducto = async (id) => {
        const urlServer = "http://localhost:3000";
        await axios.delete(urlServer + `/producto/${id}`);
        getMisProductosData();
    };

    const eliminarProductoPorId = async (id) => {
        try {
            // elimina el producto en la base de datos
            await eliminarProducto(id);

            // actualiza la lista de productos localmente
            const newProductos = misProductos.filter((producto) => producto.id !== id);
            setMisProductos(newProductos);
            alert("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <>
            <div className="gridProducts section container">
                <h1>Mis Productos</h1>
                <div className="galeria">
                    {misProductos.map((producto) => {
                        return (
                            <Card key={producto.id} style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={producto.imagen} className="imgCard" />
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
                                        <button className="btnThree" onClick={() => eliminarProductoPorId(producto.id)} id={producto.id}>Eliminar ❌</button>
                                        <button className="btnTwo" onClick={() => agregarAlCarrito(producto)} id={producto.id}>Añadir 🛒</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </>
    );
}



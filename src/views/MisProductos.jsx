import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function MisProductos() {

    const [misProductos, setMisProductos] = useState([]);

    const getMisProductosData = async () => {
        const urlServer = "https://server-trabajo-final-g3.onrender.com";
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

    const eliminarProducto = async (id) => {
        const urlServer = "https://server-trabajo-final-g3.onrender.com";
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
                <div className="misProductos">
                    {misProductos.map((producto) => {
                        return (
                            <Card key={producto.id} className='miCard d-flex flex-row m-4 align-items-center'>
                                <Card.Img variant="top" src={producto.imagen} className="imgCard m-4" />
                                <Card.Body className='d-flex justify-content-between align-items-center'>
                                    <div className='contentMiCard m-1'>
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
                                            <strong> $ {producto.precio.toLocaleString('en-US')} </strong>
                                        </Card.Text>
                                    </div>
                                    <div className="botones d-flex flex-column m-2 gap-3">
                                        <button className="btnOne" onClick={verDetalle} id={producto.id}>Ver Más 👀</button>
                                        <button className="btnThree" onClick={() => eliminarProductoPorId(producto.id)} id={producto.id}>Eliminar ❌</button>
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



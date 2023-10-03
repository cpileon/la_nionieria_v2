import React, { useContext } from "react";
import Context from "../Context";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function MisProductos() {
    const { productos, usuarioActual, prevCarrito, setPrevCarrito } = useContext(Context);
    const navigate = useNavigate();

    const verDetalle = (e) => {
        navigate(`/producto/${e.target.id}`)
    }

    const agregarAlCarrito = ({ id, price, name, img }) => {
        const itemProducto = productos.find((item) => item.id === id);
        const index = prevCarrito.findIndex((item) => item.id === id)
        const producto = { id, price, name, img, count: 1 };

        if (index >= 0) {
            prevCarrito[index].count++;
            setPrevCarrito([...prevCarrito]);

        } else {
            setPrevCarrito([...prevCarrito, producto]);

        }}  
    // Filtrar los productos para mostrar solo los del usuario actual
    const misProductos = productos.filter((producto) => producto.userId === usuarioActual);

    return (
        <div className="cont">
            <h1>Mis Productos</h1>
            <div className="galeria">
                {productos.map((producto) => {
                    return (
                        <Card key={producto.id} style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={producto.img} className="imgCard" />
                            <Card.Body>
                                <Card.Title className="titles">{producto.name}</Card.Title>
                                <hr />
                                <dl>
                                    <dt>Detalles del Producto:</dt>
                                    <br />
                                    <Card.Text className="categoria">{producto.cat}</Card.Text>
                                    <Card.Text className="estado">{producto.stat}</Card.Text>
                                </dl>
                                <hr />
                                <Card.Text className="prices">
                                    <strong> $ {producto.price.toLocaleString()} </strong>
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
        </div>
    );
}

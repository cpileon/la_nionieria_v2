import { useContext, useEffect } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
/* import "../assets/carrito.css" */

export default function Carrito() {

    const { carrito, setCarrito, totalPrecioCarrito, setTotalPrecioCarrito, eliminarDelCarrito, limpiarCarrito, calcularTotalCarrito } = useContext(Context);

    useEffect(() => {
        // Actualizar el precio total cuando cambie el carrito
        const nuevoTotal = calcularTotalCarrito(carrito);
        setTotalPrecioCarrito(nuevoTotal);
        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito, setTotalPrecioCarrito, calcularTotalCarrito]);

    const vaciarCarrito = () => {
        // Establecer el total del carrito a cero
        setTotalPrecioCarrito(0);

        // Limpiar el carrito en el almacenamiento local
        localStorage.removeItem("carrito");
        localStorage.removeItem("precioTotal");
        // Llamar a la función limpiarCarrito (si es necesario)
        limpiarCarrito();

        navigate("/carrito");
    }

    const navigate = useNavigate();
    const volverInicio = (e) => {
        navigate("/")
    }

    return (
        <div className="carrito section container">
            <div className="contenedorMa">
                <h2>Detalles de su compra</h2>
                {carrito.length != 0 ? (
                    carrito.map((item, i) => {
                        return (
                            <div key={i} className="contenedorPadre">
                                <div className="contenedorHijo">
                                    <div className="contenedorItem">
                                        <img className="imagenProducto" src={item.imagen} alt="" />
                                        <p className="nombreItem">
                                            {item.nombre}
                                        </p>
                                    </div>
                                    <table className="cantidades">
                                        <tbody>
                                            <tr className="d-flex justify-content-end align-items-center">
                                                <td>
                                                    {" "}
                                                    <p className="text-success m-0">${(item.precio).toLocaleString()}</p>
                                                </td>
                                                <td>
                                                    <button onClick={() => eliminarDelCarrito(item.id)} className="btnThree">Eliminar ❌</button>
                                                </td>
                                                <td key={item.id}>
                                                    <span className="p-2 text-center m-2">
                                                        {
                                                            item.cantidad
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h3>⚠️ Ups! No tienes productos en tu carrito! <button className="btnTwo" onClick={volverInicio}>Volver</button></h3>

                )}
                <h4 className='my-4'>Total a Pagar: ${totalPrecioCarrito.toLocaleString()}</h4>
                <button className='btnOne'>
                    Ir a Pagar
                </button>
                <div className="vaciar">
                    <button className="btnThree" onClick={vaciarCarrito}>Vaciar Carrito <FaTrashCan /></button>
                </div>
            </div>
        </div>
    )
}

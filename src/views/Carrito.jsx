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
                            <div className="row m-2 bg bg-light p-3 rounded shadow" key={item.id}>
                        <div className="col">
                            <h5><strong>{i+1}</strong></h5>
                        </div>
                        <div className="col">
                            <img src={item.imagen} width={50} />
                        </div>
                        <div className="col">
                           <strong>{item.nombre}</strong>
                        </div>
                        <div className="col">
                            <strong>Precio:</strong> ${(item.precio).toLocaleString('en-US')}
                        </div>
                        <div className="col">
                        <button onClick={() => eliminarDelCarrito(item.id)} className="btnThree">Eliminar ❌</button>
                            
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
                <div className="vaciar mt-3">
                    <button className="btnThree" onClick={vaciarCarrito}>Vaciar Carrito <FaTrashCan /></button>
                </div>
            </div>
        </div>
    )
}

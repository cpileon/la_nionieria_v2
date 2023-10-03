import { useContext } from "react";
import Context from "../Context";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
/* import "../assets/carrito.css" */

export default function Carrito() {

    const { prevCarrito, setPrevCarrito, } = useContext(Context);

    const total = prevCarrito.reduce((a, { price, count }) => a + price * count, 0);

    const increment = (i) => {
        prevCarrito[i].count++;
        setPrevCarrito([...prevCarrito]);
    };

    const decrement = (i) => {
        const { count } = prevCarrito[i];
        if (count === 1) {
            prevCarrito.splice(i, 1);
        } else {
            prevCarrito[i].count--;
        }
        setPrevCarrito([...prevCarrito]);
    };

    const vaciarCarrito = () => {
        setPrevCarrito([]);
        setTotal(0);
    }

    const navigate = useNavigate();
    const volverInicio = (e) => {
        navigate("/")
    }

    return (
        <div className="carrito section container">
            <div className="contenedorMa">
                <h2>Detalles de su compra</h2>
                {prevCarrito != 0 ? (
                    prevCarrito.map((item, i) => {
                        return (
                            <div key={i} className="contenedorPadre">
                                <div className="contenedorHijo">
                                    <div className="contenedorItem">
                                        <img className="imagenPizza" src={item.img} alt="" />
                                        <p className="nombreItem">
                                            {item.name}
                                        </p>
                                    </div>
                                    <table className="cantidades">
                                        <tbody>
                                            <tr className="d-flex justify-content-end align-items-center">
                                                <td>
                                                    {" "}
                                                    <p className="text-success m-0">${(item.price * item.count).toLocaleString()}</p>
                                                </td>
                                                <td>
                                                    <button onClick={() => decrement(i)} className="btn btn-danger m-2">-</button>
                                                </td>
                                                <td key={item.id}>
                                                    <span className="p-2 text-center m-2">
                                                        {
                                                            item.count
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <button onClick={() => increment(i)} className="btn btn-primary">+</button>
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
                <h4 className='my-4'>Total a Pagar: ${total.toLocaleString()}</h4>
                <button className='btnOne'>
                    Ir a Pagar
                </button>
                <div className="vaciar">
                    <button className="btnThree" onClick={vaciarCarrito}>Vaciar Carrito ❌</button>
                </div>
            </div>
        </div>
    )
}

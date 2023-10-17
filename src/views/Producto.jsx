import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Aos from 'aos'
import 'aos/dist/aos.css'

//Importar Contexto
import Context from "../Context";

//Importar elementos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Producto() {

    const { productos, prevCarrito, setPrevCarrito, total, setTotal } = useContext(Context)

    const [chosenProducto, setChosenProducto] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    const getChosenProducto = () => {
        const selectedProduct = productos.find((item) => item.id === params.id);
        if (selectedProduct) {
            setChosenProducto(selectedProduct);
        }
    };

    const obtenerProducto = async () => {
        try {
            const response = await axios.get(`https://server-trabajo-final-g3.onrender.com/producto/${params.id}`);
            if (response.data) {
                setChosenProducto(response.data);
            } else {
                // Manejar el caso en el que no se encuentre el producto, por ejemplo, redirigiendo a una página de error.
                console.error("Producto no encontrado");
                // Puedes redirigir o mostrar un mensaje de error.
            }
        } catch (error) {
            console.error(error);
            // Manejar el error, por ejemplo, mostrando un mensaje de error.
        }
    };

    const volverTienda = (e) => {
        navigate("/tienda")
    }

    const agregarAlCarrito = ({ id, precio, nombre, imagen }) => {
        const itemProducto = productos.find((item) => item.id === id);
        const index = prevCarrito.findIndex((item) => item.id === itemProducto.id)
        const producto = { id, precio, nombre, imagen, count: 1 };

        if (index >= 0) {
            prevCarrito[index].count++;
            setPrevCarrito([...prevCarrito]);

        } else {
            setPrevCarrito([...prevCarrito, producto]);

            setTotal(
                prevCarrito.reduce((a, { precio, count }) =>
                    a + precio * count
                    , 0)
            );
        }
        console.log("este es el total:" + (total))
    }
    /*
        useEffect(() => {
            if (productos.length > 0) {
                getChosenProducto();
                console.log("id del producto:", params.id)
                console.log("Array de productos:", productos)
                console.log("Producto seleccionado: ",chosenProducto)
            } else {
                console.log("No se ha recibido el id")
            }
        }, [productos]);
        */
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        obtenerProducto();
    }, [params.id]);

    console.log(chosenProducto);

    //Animación de entrada
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className="detalleProducto section container" data-aos='fade-up' data-aos-duration='1500'>

            {
                chosenProducto ? (
                    <Card className="container">
                        <Row>
                            <Col>
                                <div className="productImage">
                                    <img className="imgContainer" src={chosenProducto.imagen} alt="" />
                                </div>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title className="titleP"><h2>{chosenProducto.nombre}</h2></Card.Title>
                                    <Card.Text>
                                        {chosenProducto.descripcion}
                                    </Card.Text>
                                    <hr />
                                    <dl>
                                        <dt>Detalles del Producto:</dt>
                                        <br />
                                        <Card.Text className="categoria">{chosenProducto.categoria}</Card.Text>
                                        <Card.Text className="estado">{chosenProducto.estado}</Card.Text>
                                    </dl>
                                    <hr />
                                    <div className="bottom">
                                        <h3>Precio: ${chosenProducto.precio}</h3>
                                        <button className="btnOne" onClick={() => agregarAlCarrito(chosenProducto)} id={chosenProducto.id}>Añadir 🛒</button>
                                    </div>

                                </Card.Body>
                                <div><button className="btnTwo" onClick={volverTienda}>Atrás</button></div>
                            </Col>
                        </Row>
                    </Card>

                ) : null
            }
        </div >
    )
}
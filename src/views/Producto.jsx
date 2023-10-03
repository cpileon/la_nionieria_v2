import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

    const [chosenProducto, setChosenProducto] = useState();

    const params = useParams();
    const navigate = useNavigate();

    const getChosenProducto = () => {
        return setChosenProducto(productos.filter((item) => item.id === params.id));
    };

    const volverTienda = (e) => {
        navigate("/tienda")
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

        }

        setTotal(
            prevCarrito.reduce((a, { price, count }) =>
                a + price * count
                , 0)
        );

        console.log("este es el total:" + (total))
    }

    useEffect(() => {
        getChosenProducto();
    }, []);

    console.log(chosenProducto);

      //Animación de entrada
        useEffect(()=>{
            Aos.init({duration: 2000})
        }, [])

    return (
        <div className="detalleProducto section container" data-aos='fade-up' data-aos-duration='1500'>
            {chosenProducto ? (
                <Card className="container">
                    <Row>
                        <Col>
                            <div className="productImage">
                                <img className="imgContainer" src={chosenProducto[0].img} alt="" />
                            </div>
                        </Col>
                        <Col>
                    <Card.Body>
                        <Card.Title className="titleP"><h2>{chosenProducto[0].name}</h2></Card.Title>
                        <Card.Text>
                            {chosenProducto[0].desc}
                        </Card.Text>
                        <hr />
                        <dl>
                            <dt>Detalles del Producto:</dt>
                            <br />
                            <Card.Text className="categoria">{chosenProducto[0].cat}</Card.Text>
                            <Card.Text className="estado">{chosenProducto[0].stat}</Card.Text>
                        </dl>
                        <hr />
                        <div className="bottom">
                            <h3>Precio: ${chosenProducto[0].price.toLocaleString()}</h3>
                            <button className="btnOne" onClick={() => agregarAlCarrito(chosenProducto[0])} id={chosenProducto[0].id} >Añadir 🛒</button>
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
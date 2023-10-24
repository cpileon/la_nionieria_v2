import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Aos from 'aos'
import 'aos/dist/aos.css'

//Importar elementos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function MiProducto() {
    const [chosenProducto, setChosenProducto] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    const obtenerProducto = async () => {
        try {
            const response = await axios.get(`https://server-trabajo-final-g3.onrender.com/producto/${params.id}`);
            if (response.data) {
                setChosenProducto(response.data);
            } else {
                console.error("Producto no encontrado");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const volverTienda = (e) => {
        navigate("/misproductos")
    }

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
                                        <h3>Precio: ${chosenProducto.precio ? chosenProducto.precio.toLocaleString('en-US') : ''}</h3>
                                    </div>

                                </Card.Body>
                                <div><button className="btnTwo m-3" onClick={volverTienda}>Atrás</button></div>
                            </Col>
                        </Row>
                    </Card>

                ) : null
            }
        </div >
    )
}
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import axios from "axios";

export default function Publicar() {
    const { productos, setProductos } = useContext(Context);
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem('idUsuario');

    const [productoNuevo, setProductoNuevo] = useState({
        idUsuario: idUsuario,
        nombre: "",
        precio: "",
        imagen: "",
        descripcion: "",
        categoria: "",
        estado: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoNuevo({ ...productoNuevo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación de los campos antes de agregar el producto
        if (
            productoNuevo.nombre &&
            productoNuevo.precio &&
            productoNuevo.imagen &&
            productoNuevo.descripcion &&
            productoNuevo.categoria &&
            productoNuevo.estado
        ) {
            publicarProducto(); // Llamada a la función de publicación
        } else {
            alert("Por favor, completa todos los campos del formulario.");
        }
    };

    const publicarProducto = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/publicar";

        try {
            await axios.post(urlServer + endpoint, productoNuevo);
            alert("Producto publicado con éxito");
            // Actualiza el estado global de productos después de la publicación
            setProductos([...productos, productoNuevo]);
            // Limpia el formulario
            setProductoNuevo({
                idUsuario: idUsuario,
                nombre: "",
                precio: "",
                imagen: "",
                descripcion: "",
                categoria: "",
                estado: "",
            });
            navigate("/tienda");
        } catch (error) {
            alert("Algo salió mal ...");
            console.error(error);
        }
    };


    return (
        <div className="newProduct col-10 col-sm-6 col-md-3 m-auto mt-5 section">
            <h1>Publicar un Producto</h1>
            <p>ID usuario: {idUsuario}</p>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group gNombre">
                    <label htmlFor="nombre">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={productoNuevo.nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group gPrecio">
                    <label htmlFor="precio">Precio del Producto:</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={productoNuevo.precio}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group gImg">
                    <label htmlFor="imagen">Imagen del Producto (URL):</label>
                    <input
                        type="url"
                        id="imagen"
                        name="imagen"
                        value={productoNuevo.imagen}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group gDesc">
                    <label htmlFor="descripcion">Descripción del Producto:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={productoNuevo.descripcion}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group gCategoria">
                    <label htmlFor="categoria">Categoría de Producto:</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={productoNuevo.categoria}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Videojuego">Videojuego</option>
                        <option value="Juego de Cartas">Juego de Cartas</option>
                        <option value="Figura coleccionable">Figura coleccionable</option>
                        <option value="Accesorio">Accesorio</option>
                    </select>
                </div>
                <div className="form-group gEstado">
                    <label htmlFor="estado">Estado del Producto:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={productoNuevo.estado}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado/ como nuevo">Usado/ como nuevo</option>
                        <option value="Usado/ con detalles">Usado/ con detalles</option>
                        <option value="Usado/ faltan piezas">Usado/ faltan piezas</option>
                    </select>
                </div>
                <div className="botonPost">
                    <button type="submit" className="btnOne">Publicar</button>
                </div>
            </form>
        </div>
    );
}

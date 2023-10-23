import { useState, useEffect, createContext, setState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Context = createContext();

export const Provider = ({ children }) => {
    //usuario y setUsuario deberían ser para el usuario global
    const [usuario, setUsuario] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
        return carritoGuardado;
    });
    /*    const [totalCarrito, setTotalCarrito] = useState(0); */
    const [totalPrecioCarrito, setTotalPrecioCarrito] = useState(0);

    //Estado para cambiar visibilización de la navbar
    const [navbar, setNavbar] = useState();
    const [seelogin, setseelogin] = useState()
    const [seeReg, setSeeReg] = useState()

    //Función para logout
    const navigate = useNavigate();
    const logout = () => {
        //Falta eliminar todo lo del usuario global
        setUsuario(null);
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("token");
        localStorage.removeItem('idUsuario');
        navigate("/");
        alert("Has cerrado sesión!😀");

    };

    const getProductosData = async () => {
        const urlServer = "https://server-trabajo-final-g3.onrender.com";
        const endpoint = "/productos";

        try {
            //de data sacamos la id_usuario
            const { data } = await axios.get(urlServer + endpoint, {
            });
            setProductos(data);

        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response && error.response.data) {
                console.error("Respuesta del servidor:", error.response.data);
            }
            alert("Ha ocurrido un error en la solicitud. 🙁");
        }
    }

    useEffect(() => {
        getProductosData();
    }, []);


    const calcularTotalCarrito = (totalCarrito) => {
        const total = totalCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        setTotalPrecioCarrito(total)
        return total;
    };

    const agregarAlCarrito = (producto) => {
        // Lógica para agregar un producto al carrito.
        setCarrito((carritoAnterior) => {
            // Clonamos el carrito anterior para no cambiar el estado directamente.
            const nuevoCarrito = [...carritoAnterior];
            // Verificamos si el producto ya está en el carrito por su ID.
            const productoExistente = nuevoCarrito.find((item) => item.id === producto.id);

            if (productoExistente) {
                // Si el producto ya existe en el carrito, actualizamos la cantidad.
                productoExistente.cantidad++;
            } else {
                // Si el producto no existe en el carrito, lo agregamos con una cantidad de 1.
                nuevoCarrito.push({ ...producto, cantidad: 1 });
            }

            // Actualizamos el estado totalPrecioCarrito con el nuevo total.
            const nuevoTotal = calcularTotalCarrito(nuevoCarrito);
            setTotalPrecioCarrito(nuevoTotal);

            // Actualizamos el estado carrito con el nuevo carrito para exportarlo en el contexto.
            setCarrito(nuevoCarrito);

            // Actualizamos el carrito en el almacenamiento local
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

            return nuevoCarrito;
        });
    };

    const eliminarDelCarrito = (id) => {
        //Lógica para eliminar un producto del carrito.
        const nuevoCarrito = carrito.filter((item) => item.id !== id);
        setCarrito(nuevoCarrito);

        // Actualizamos el carrito localmente.
        const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoAEliminar = carritoActual.find((item) => item.id === id);
        if (productoAEliminar) {
            if (productoAEliminar.cantidad > 1) {
                productoAEliminar.cantidad--;
            } else {
                carritoActual.splice(carritoActual.indexOf(productoAEliminar), 1);
            }
            localStorage.setItem("carrito", JSON.stringify(carritoActual));
        }

        // Actualizamos el precio total localmente.
        const precioTotalActual = parseFloat(localStorage.getItem("precioTotal")) || 0;
        if (productoAEliminar) {
            localStorage.setItem("precioTotal", (precioTotalActual - productoAEliminar.precio).toString());
        }
    };


    const limpiarCarrito = () => {
        // Eliminamos todos los productos del carrito actualizando el estado a vacío.
        setCarrito([]);

        // Limpiamos el almacenamiento local.
        localStorage.removeItem("carrito");
    };

    const globalState = {
        productos,
        setProductos,
        carrito,
        setCarrito,
        totalPrecioCarrito,
        setTotalPrecioCarrito,
        calcularTotalCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
        navbar,
        setNavbar,
        seeReg,
        setSeeReg,
        seelogin,
        setseelogin,
        usuario,
        setUsuario,
        logout,
        nombre,
        setNombre,
        getProductosData
    };

    return <Context.Provider value={globalState}>
        {children}
    </Context.Provider>;
};


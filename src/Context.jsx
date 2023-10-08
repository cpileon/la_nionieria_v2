import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
const Context = createContext();


export const Provider = ({ children }) => {
    //usuario y setUsuario deberían ser para el usuario global
    const [usuario, setUsuario] = useState(null)
    const [productos, setProductos] = useState([]);
    const [prevCarrito, setPrevCarrito] = useState([]);
    //Variable global para guardar id_usuario
    const [idUsuario, setIdUsuario] = useState();
    //Estado para cambiar visibilización de la navbar
    const [navbar, setNavbar] = useState();

    //Función para logout
    const navigate = useNavigate();
    const logout = () => {
        //Falta eliminar todo lo del usuario global
        setUsuario(null);
        localStorage.removeItem("token");
        navigate("/");
        alert("Has cerrado sesión!😀");

      };

    const endpoint = "/productos.json"

    const getProductos = async () => {
        const res = await fetch(endpoint);
        const data = await res.json();

        setProductos(data);
    }
    console.log(productos);

    useEffect(() => {
        getProductos();

    }, []);


    const globalState = { productos, prevCarrito, setPrevCarrito, navbar, setNavbar, usuario, setUsuario, logout, idUsuario, setIdUsuario }

    return <Context.Provider value={globalState}>
        {children}
    </Context.Provider>;
};

export default Context;
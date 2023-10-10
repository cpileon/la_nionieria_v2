import { useState, useEffect, createContext, setState } from "react";
import { useNavigate } from "react-router-dom";
const Context = createContext();


export const Provider = ({ children }) => {
    //usuario y setUsuario deberían ser para el usuario global
    const [usuario, setUsuario] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [productos, setProductos] = useState([]);
    const [prevCarrito, setPrevCarrito] = useState([]);

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

    /*     const endpoint = "/productos.json"
    
        const getProductos = async () => {
            const res = await fetch(endpoint);
            const data = await res.json();
    
            setProductos(data);
        }
        console.log(productos);
    
        useEffect(() => {
            getProductos();
    
        }, []); */


    const globalState = { productos, prevCarrito, setPrevCarrito, navbar, setNavbar, usuario, setUsuario, logout, setProductos, nombre, setNombre }

    return <Context.Provider value={globalState}>
        {children}
    </Context.Provider>;
};

export default Context;
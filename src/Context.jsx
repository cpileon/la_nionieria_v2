import { useState, useEffect, createContext } from "react";

const Context = createContext();


export const Provider = ({ children }) => {

    const [productos, setProductos] = useState([]);
    const [prevCarrito, setPrevCarrito] = useState([]);

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


    const globalState = { productos, prevCarrito, setPrevCarrito }

    return <Context.Provider value={globalState}>
        {children}
    </Context.Provider>;
};

export default Context;
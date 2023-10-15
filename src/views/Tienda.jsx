import { useContext } from "react";
import Context from "../Context";

import 'bootstrap/dist/css/bootstrap.min.css';

/* import Banner from "../components/Banner"; */
import Cards from "../Components/Cards";

export default function Tienda() {


    const { productos, getProductos } = useContext(Context);

    return (
        <div>
            <div className="gridProducts section container">
                <Cards />
            </div>
        </div>
    )
}

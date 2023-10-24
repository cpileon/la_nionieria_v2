import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pagar() {
    const navigate = useNavigate();

    const codigoError = 503; // 503 Service Unavailable


    return (
        <div className="pagar section container">
            <h2>Procesar el Pago</h2>
            <p>Error {codigoError}: Ocurrió un problema al procesar su pago.</p>
            <img src="https://pa1.aminoapps.com/6380/e381b242408f6306168779533d965a81fb38cde4_00.gif" alt="" />
            <h3>Por favor inténtelo más tarde.</h3>
            <button className="btnOne" onClick={() => navigate("/carrito")}>
                Volver al carrito
            </button>
        </div>
    );
}
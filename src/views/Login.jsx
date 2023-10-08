import { useState, useContext } from "react";
import Context from "../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegistroForm() {
    const { setUsuario, navbar, setNavbar } = useContext(Context);
    const navigate = useNavigate();
    const [usuario, setUsuarioLocal] = useState({});

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuarioLocal({ ...usuario, ...field });
    };

    const iniciarSesion = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/login";
        const { email, password } = usuario;
        try {
            if (!email || !password) return alert("Email y password obligatorias");
            const { data: token } = await axios.post(urlServer + endpoint, usuario);            
            alert("Usuario identificado con éxito 😀");
            localStorage.setItem("token", token);

            navigate("/perfil");
        } catch ({ response: { data: message } }) {
            alert(message + " 🙁");
            console.log(message);
        }
    };
    
    return (
        <div className="login col-10 col-sm-6 col-md-3 m-auto mt-5 section">
            <h1>Iniciar Sesión</h1>
            <hr />
            <div className="form-group groupMail">
                <label>Correo electrónico</label>
                <input
                    value={usuario.email}
                    onChange={handleSetUsuario}
                    type="email"
                    name="email"
                    className="formMail form-control"
                    placeholder="Ingresa tu email"
                />
            </div>
            <div className="form-group groupPass">
                <label>Contraseña</label>
                <input
                    value={usuario.password}
                    onChange={handleSetUsuario}
                    type="password"
                    name="password"
                    className="formPass form-control"
                    placeholder="Ingresa tu contraseña"
                />
            </div>
            <div className="botonLogin">
                <button onClick={iniciarSesion} className="btnOne">
                    Inicia Sesión
                </button>
            </div>
            <div className="textLogin">
                <p className="text1">¿No tienes una cuenta?</p>
                <p>¡Registrate aquí y disfruta todos nuestros beneficios!</p>
            </div>
        </div>
    );
}

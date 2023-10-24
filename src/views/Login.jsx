import { useState, useContext } from "react";
import { Context } from "../Context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegistroForm() {
    const { setUsuario, navbar, setNavbar } = useContext(Context);
    const navigate = useNavigate();
    const [usuario, setUsuarioLocal] = useState({});
    const [loginError, setLoginError] = useState(false); //Estado nuevo para el error

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuarioLocal({ ...usuario, ...field });
        // Vuelve a normal cuando el usuario comienza a escribir
        setLoginError(false);
    };

    const iniciarSesion = async () => {
        const urlServer = "https://server-trabajo-final-g3.onrender.com";
        const endpoint = "/login";
        const { email, password } = usuario;
        try {
            if (!email || !password) {
                // Si falta el correo o la contraseña, muestra el estado de error
                setLoginError(true);
                return;
            }
            const { data: token } = await axios.post(urlServer + endpoint, usuario);
            /* // No muestra el error cuando el inicio de sesión es exitoso
            setLoginError(false); */
            alert("Usuario identificado con éxito 😀");
            localStorage.setItem("token", token);

            navigate("/perfil");
        } catch ({ response: { data: message } }) {
            // Muestra el estado de error en caso de un error de inicio de sesión
            setLoginError(true);
        }
    };

    // 2 variables con una clase de estilo condicional en función del estado de error
    const emailInputClass = loginError ? "formMail form-control is-invalid" : "formMail form-control";
    const passwordInputClass = loginError ? "formPass form-control is-invalid" : "formPass form-control";

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
                    className={emailInputClass}//cambio
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
                    className={passwordInputClass}//cambio
                    placeholder="Ingresa tu contraseña"
                />
            </div>
            {loginError && (
                <p className="error-text" style={{ color: 'red' }}>Email o contraseña incorrecta. Por favor, inténtalo de nuevo.</p>
            )}
            <div className="botonLogin">
                <button onClick={iniciarSesion} className="btnOne mt-4">
                    Inicia Sesión
                </button>
            </div>
            <div className="textLogin">
                <p className="text1">¿No tienes una cuenta?</p>
                <p>¡<Link to="/register">Registrate aquí</Link> y disfruta todos nuestros beneficios!</p>
            </div>
        </div>
    );
}

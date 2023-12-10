import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import { setToken, fetchToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

export default function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');



    const handleSubmit = async () => {
        if (correo.length === 0) {
            alert("Ingrese un correo");
        } else if (contrasena.length === 0) {
            alert("Ingrese una contraseña");
        } else {
            try {
                const response = await api.post(`/login_user?correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`);

                if (response && response.data) {
                    console.log(response.data); // Muestra la respuesta del servidor
                    if (response.data) {
                        setToken(response.data);
                        navigate("/librosFisicos");
                    }


                } else {
                    console.error("Respuesta del servidor no válida:", response);

                    navigate("/login")
                }

            } catch (error) {
                console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
            }

        }
    }

    return (
        <div className="background-main">
            <div className="page-content">
                <br></br>
                <div className="container">
                    <div className="my-5 mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card">
                                        <div className="card-body p-5">
                                            {
                                                fetchToken()
                                                    ? (
                                                        <p>You are logged in!</p>
                                                    )
                                                    : (
                                                        <p>Login Acount!</p>
                                                    )
                                            }
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Correo</label>
                                                    <input type="text" className="form-control" name="correo" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Contraseña</label>
                                                    <input type="password" className="form-control form-control-lg" name="contrasena" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)}></input>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Login" onClick={handleSubmit}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    )
}
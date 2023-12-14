import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../api';
import { setToken, fetchToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import Swal from 'sweetalert2';

export default function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = async () => {
        if (correo.length === 0) {
            Swal.fire('Error', 'Ingrese un correo', 'error');
        } else if (contrasena.length === 0) {
            Swal.fire('Error', 'Ingrese una contraseña', 'error');
        } else {
            try {
                const response = await api.post(`/login_user/?correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`);


                if (response && response.data) {
                    if (response.data) {
                        // Inicio de sesión exitoso
                        setToken(response.data, correo);
                        navigate("/librosFisicos");
                        window.location.reload();

                    } else {
                        // Comprobar mensajes de error específicos y mostrar alertas
                        if (response.status === 401) {
                            Swal.fire('Error', 'La contraseña es incorrecta', 'error');
                        } else if (response.data.detail === "El usuario no existe") {
                            Swal.fire('Error', 'El usuario no existe', 'error');
                        } else {
                            Swal.fire('Error', 'Erro desconocido', 'error');
                        }
                    }
                } else {
                    console.error("Respuesta del servidor no válida:", response);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                    Swal.fire('Error', 'La contraseña o correo No existen', 'error');
                    // Limpiar los campos de los inputs
                    setCorreo('');
                    setContrasena('');
                }
            }
        }
    };

    return (
        <div className="background-main">
            <div className="page-content">
                <br></br>
                <div className="container">
                    <div className="my-5 mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card-cont">
                                        <div className="card-body p-5">
                                            <div className="logo-login">
                                                <i class="fa-solid fa-user"></i>
                                            </div>
                                            <div className="messages-container">
                                                {fetchToken() ? <p>Ya iniciaste sesión</p> : <p>Inicia Sesión</p>}
                                            </div>
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                                        <input type="text" className="form-control" name="correo" id="correo" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                                                    </div>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                                        <input type="password" className="form-control form-control-lg" name="contrasena" id="contrasena" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)}></input>
                                                    </div>
                                                </div>


                                                <div className="d-flex justify-content-between">
                                                    <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Iniciar sesión" onClick={handleSubmit}></input>
                                                    <Link to={'/books'} type="button" className="btn btn-danger btn-lg" name="submit">Cancelar</Link>
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
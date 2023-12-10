import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import { setToken, fetchToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

export default function Login() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [formRol, setFormRol] = useState(
        { nombre: '' }
    );

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/all_roles/');
                if (response.status === 200) {
                    setRoles(response.data);
                }
            } catch (error) {
                console.error("Error en la respuesta del servidor:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleInputChangeRol = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setSelectedRoleId(value);
        setFormRol({
            ...formRol,
            [e.target.name]: value
        });
    }


    const handleSubmit = async () => {
        if (nombre.length === 0) {
            alert("El nombre es requerido");
        }
        else if (correo.length === 0) {
            alert("La dirección de correo es requerida");
        }
        else if (fechaNacimiento.length === 0) {
            alert("La fecha de nacimiento es requerida");
        }
        else if (roles.length === 0) {
            alert("El rol es requerido");
        }
        else if (contrasena.length === 0) {
            alert("La contraseña es requerida");
        } else {
            try {
                const response = api.post('/register_user/', {
                    nombre: nombre,
                    correo: correo,
                    fechaNacimiento: fechaNacimiento,
                    id_rol: selectedRoleId,
                    contrasena: contrasena
                })
                navigate("/login");
                /*if (response && response.data) {
                    navigate("/login");
                    if (response.data) {
                        setToken(response.data);
                        
                    }


                } else {
                    console.error("Respuesta del servidor no válida:", response);

                    navigate("/register")
                }*/

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
                                                        <p>Ya estas registrado</p>
                                                    )
                                                    : (
                                                        <p>Registrate</p>
                                                    )
                                            }
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Nombre</label>
                                                    <input type="text" className="form-control" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Correo</label>
                                                    <input type="text" className="form-control" name="correo" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Fecha de nacimiento</label>
                                                    <input type="date" className="form-control" name="fechaNacimiento" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}></input>
                                                </div>

                                                <div className='form-outline mb-4'>
                                                    <label htmlFor='id_rol' className='form-label'>Rol</label>
                                                    <select name='id_rol' className='form-control w-50' onChange={handleInputChangeRol}>
                                                        <option selected="true" disabled="disabled">Selecciona el rol</option>
                                                        {roles.map((rol) => (
                                                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Contraseña</label>
                                                    <input type="password" className="form-control form-control-lg" name="contrasena" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)}></input>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Register" onClick={handleSubmit}></input>
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
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { fetchToken, RequireToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import PopupDeleteUser from './PopupDeleteUser.js';

const UserView = () => {
    const [users, setUsers] = useState([]);
    const [fromUser, setFormUser] = useState({
        nombre: '',
        correo: '',
        fechaNacimiento: '',
        id_rol: '',
    });
    const [roles, setRoles] = useState([]);

    const fetchUser = async () => {
        const response = await api.get('/all_users/',
            {
                headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });
        setUsers(response.data);
    };

    const fetchRoles = async () => {
        const response = await api.get('/all_roles/');
        setRoles(response.data);
    };

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const response = await api.get('/all_roles/');
                if (response.status === 200) {
                    setRoles(response.data);
                }
            } catch (error) {
                console.error("Error en la respuesta del servidor:", error);
            }
        };
        fetchRol();
    }, []);

    console.log("Roles:", roles);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/all_users/',
                    {
                        headers: { 'Authorization': `Bearer ${fetchToken()}` }
                    });
                console.log(Array.isArray(response.data));
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("La respuesta de la API no es un array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChangeUsers = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormUser({ ...fromUser, [event.target.name]: value });
    }

    return (
        <div className="background-main">
            <div className="page-content">
                <br></br>
                <div className='container'>
                    <h2 className='text-center'><strong>Usuarios Registrados</strong></h2>
                    <table className='table table-striped table-bordered table-hover mt-4 responsive'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.fechaNacimiento}</td>
                                    <td>{roles.find((rol) => rol.id === user.id_rol)?.nombre || 'N/A'}</td>
                                    <td>
                                        <PopupDeleteUser userDel={user} onDelete={fetchUser} />
                                        <div className='btn btn-outline-warning icon-Acciones'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="1 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br></br>
        </div>
    );

}

export default UserView;
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { fetchToken, RequireToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import PopupDeleteUser from './PopupDeleteUser.js';
import EditUser from './EditUser.js';

const UserView = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

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

    const fetchUserEdit = async (id) => {
        const response = await api.get(`/update_user/${id}`,
            {
                headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });
        setUser(response.data);
    }
    console.log("Usuarioooooo.....",user);

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
                                        <EditUser userEdit={user} onEdit={fetchUserEdit} />
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
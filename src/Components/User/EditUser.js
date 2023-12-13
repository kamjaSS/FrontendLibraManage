import React, { useState, useEffect, useRef } from "react";
import api from '../../api';
import { setToken, fetchToken } from '../Auth.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

function EditUser({ userEdit, onEdit }) {
    const [show, setShow] = useState(false);
    const nombreRef = useRef(null);
    const birthdateRef = useRef(null);
    const emailRef = useRef(null);
    const rolRef = useRef(null);
    const [roles, setRoles] = useState([]);
    const [selectedRol, setSelectedRol] = useState(userEdit.id_rol);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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


    const handleEditUser = async (event) => {
        event.preventDefault();
        if (!userEdit || !userEdit.id) {
            console.error('Usuario no válido para editar.');
            return;
        }
        const url = `/update_user/${userEdit.id}`;
        console.log('URL de solicitud:', url);
        try {
            const response = await api.put(url, {
                nombre: nombreRef.current?.value || '',
                correo: emailRef.current?.value || '',
                fechaNacimiento: birthdateRef.current?.value || '',
                id_rol: selectedRol || ''

            }, {
                headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });

            window.location.reload();
            onEdit();
            
            handleClose();
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            if (error.response && error.response.status === 404) {
                console.error('El usuario no se encontró en la base de datos.');
            }
        }
    };

    return (
        <>
            <a className='btn btn-outline-warning icon-Acciones' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="1 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-cont">
                        <div className="card-body p-5">
                            <form onSubmit={handleEditUser}>
                                <div className="form-outline mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text"><i class="fa-regular fa-user"></i></span>
                                        <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Nombre de usuario" defaultValue={userEdit.nombre} ref={nombreRef} required ></input>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <label htmlFor='fechaNacimiento' className='form-label'>Fecha de Nacimiento</label>
                                    <div className="input-group">
                                        <input type="date" className="form-control" name="fechaNacimiento" id="fechaNacimiento" placeholder="Fecha de nacimiento" defaultValue={userEdit.fechaNacimiento} ref={birthdateRef} required></input>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        <input type="text" className="form-control" name="correo" id="correo" placeholder="Correo" defaultValue={userEdit.correo} ref={emailRef} required></input>
                                    </div>
                                </div>

                                <div className='form-outline mb-4'>
                                    <div className='input-group'>
                                        <span className='input-group-text'><i class="fa-solid fa-address-book"></i></span>
                                        <select
                                            name='id_rol'
                                            className='form-control form-control-lg'
                                            value={selectedRol}
                                            onChange={(e) => setSelectedRol(e.target.value)}
                                        >
                                            <option disabled>Selecciona el rol</option>
                                            {roles.map((rol) => (
                                                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                <Button variant="success" onClick={handleEditUser}>
                                    Guardar Cambios
                                </Button>

                            </form>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );


}

export default EditUser;

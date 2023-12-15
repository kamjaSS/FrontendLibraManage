import React, { useState, useEffect, useRef } from "react";
import api from '../../api';
import { setToken, fetchToken } from '../Auth.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

function EditRol({ rolEdit, onEdit }) {
    const [show, setShow] = useState(false);
    const rolRef = useRef(null);
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const handleEditRol = async (event) => {
        event.preventDefault();
        if (!rolEdit || !rolEdit.id) {
            console.error('Rol no válido para editar.');
            return;
        }
        const url = `/update_rol/${rolEdit.id}`;
        console.log('URL de solicitud:', url);
        try {
            const response = await api.put(url, {
                nombre: rolRef.current?.value || '',
            }, {
                headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });

            window.location.reload();
            onEdit();
            
            handleClose();
        } catch (error) {
            console.error('Error al editar el rol:', error);
            if (error.response && error.response.status === 404) {
                console.error('El rol no se encontró en la base de datos.');
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
                    <Modal.Title>Editar Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-cont">
                        <div className="card-body p-5">
                            <form onSubmit={handleEditRol}>
                                <div className="form-outline mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text"><i class="fa-regular fa-rol"></i></span>
                                        <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Nombre de rol" defaultValue={rolEdit.nombre} ref={rolRef} required ></input>
                                    </div>
                                </div>
                                <Button variant="success" onClick={handleEditRol}>
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

export default EditRol;
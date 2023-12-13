import { useEffect, useState } from 'react';
import api from '../../api.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchToken } from '../Auth.js';

function PopupDeleteUser({ userDel, onDelete }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteUser = async (event) => {
        event.preventDefault();
    
        const url = `/delete/${userDel.id}`;
        console.log('URL de solicitud:', url);
    
        try {
            const response = await api.delete(url, {
                headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });
            console.log('Respuesta:', response);
            onDelete();
            handleClose();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            if (error.response && error.response.status === 404) {
                console.error('El usuario no se encontró en la base de datos.');
            }
        }
    };
    

    return (
        <>
            <a className='btn btn-outline-danger icon-Acciones mx-3' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash link-danger" viewBox="2 0 22 22">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </a>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro que desea eliminar el usuario <strong>{userDel.nombre}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupDeleteUser;

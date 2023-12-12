/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react';
import api from '../../api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpForgivenFine({multaForgiven, onForgiven}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleForgivenFine = async (event) => {
        event.preventDefault();
        console.log(multaForgiven);
        await api.put(`/forgive_fine/${multaForgiven.id}`);
        onForgiven();
        handleClose();
    };

    return(
        <>
            <button type="button" class="btn btn-primary btn-sm m-2 font-weight-bold" onClick={handleShow}>Perdonar</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Perdonar Multa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Desea perdonar la multa <strong>{multaForgiven.id}</strong>?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleForgivenFine}>
                    Perdonar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUpForgivenFine;
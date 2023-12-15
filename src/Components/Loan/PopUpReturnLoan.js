import {useState} from 'react';
import api from '../../api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpReturnLoan({prestamoReturn, onReturn}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleReturnLoan = async (event) => {
        event.preventDefault();
        console.log(prestamoReturn);
        console.log(prestamoReturn.id)
        await api.put(`/return_loan_by_id/${prestamoReturn.id}`);
        onReturn();
        handleClose();
    };

    return(
        <>
            <button type="button" class="btn btn-primary btn-sm m-2 font-weight-bold" onClick={handleShow}>Devolver</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Devolver Préstamo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Confirma devolver el préstamo <strong>{prestamoReturn.id}</strong>?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleReturnLoan}>
                    Devolver
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUpReturnLoan;
import {useState} from 'react';
import api from '../../api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpPayFine({multaPay, onPay}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handlePayFine = async (event) => {
        event.preventDefault();
        console.log(multaPay);
        await api.put(`/pay_fine/${multaPay.id}`);
        onPay();
        handleClose();
    };

    return(
        <>
            <button type="button" class="btn btn-primary btn-sm m-2 font-weight-bold" onClick={handleShow}>Pagar</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Pagar Multa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Desea pagar la multa <strong>{multaPay.id}</strong>?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handlePayFine}>
                    Pagar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUpPayFine;
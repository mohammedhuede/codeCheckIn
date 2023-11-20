import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Row } from "react-bootstrap";

function Deletehospital() {
    const [show, setShow] = useState(false);

    const Closehosptallist = () => setShow(false);
    const Deletehospitallist = () => setShow(true);

    return (
        <>
           <Modal
                show={show}
                onHide={Closehosptallist}
                centered
                className='delete-modal'
            >
                <Modal.Header className='delete-title' closeButton>
                    <Modal.Title className='delete-title'>Delete Hospital</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='mb-60'>
                        Are you sure you want to delete “Apollo Hospitals” listing?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary btn-sm' onClick={Closehosptallist}>
                        Cancel
                    </Button>
                    <Button className='btn btn-primary btn-sm' onClick={Closehosptallist}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Deletehospital;
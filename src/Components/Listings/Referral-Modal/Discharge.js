import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';

function MovetoDischarge(props) {
    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='qur-modal scheduled'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='no-padding'>
                <div className='mt-24 px-4 mb-24'>
                    <p className='fs-16 text-dark'>This referral will be archived from the list. Are you confirm to move the referral?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-secondary btn-lg' onClick={props.onHide}>Cancel</Button>
                <Button className='btn btn-primary btn-lg' onClick={props.onHide}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Discharge() {
    const [DischargeModalShow, setDischargeModalShow] = React.useState(false);

    return (
        <>
            <Button className='btn-no-brdr dropdown-text text-cap' onClick={() => setDischargeModalShow(true)}>
                OPD Consultation
            </Button>

            <MovetoDischarge
                show={DischargeModalShow}
                onHide={() => setDischargeModalShow(false)}
            />
        </>
    );
}

export default Discharge;
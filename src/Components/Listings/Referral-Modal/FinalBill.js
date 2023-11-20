import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';

function FinalBillImage(props) {
    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='qur-modal scheduled'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Final Bill Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='no-padding'>
                <div className='mt-24 px-4 mb-24'>
                    <img src={"/images/finall-bill.png"} alt='fileType' className='img-fluid' />
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button className='btn btn-secondary btn-lg' onClick={props.onHide}>Cancel</Button>
                <Button className='btn btn-primary btn-lg' onClick={props.onHide}>Confirm</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

function FinalBill() {
    const [FinalBillModalShow, setFinalBillModalShow] = React.useState(false);

    return (
        <>
            <Button className='btn-no-brdr dropdown-text text-cap ml-16' onClick={() => setFinalBillModalShow(true)}>
                frontview.jpeg
            </Button>

            <FinalBillImage
                show={FinalBillModalShow}
                onHide={() => setFinalBillModalShow(false)}
            />
        </>
    );
}

export default FinalBill;
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function MovetoDoctor(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='qur-modal scheduled'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Add Doctor</h5>
                    <span className='fs-14 text-grey font-normal'>Please fill the form </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='no-padding'>
                {/* keep form here */}
                <div className='p-4'>
                    keep form here
                </div>
                {/* keep form here */}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-secondary btn-lg' onClick={props.onHide}>Cancel</Button>
                <Button className='btn btn-primary btn-lg' onClick={props.onHide}>Add Doctor</Button>
            </Modal.Footer>
        </Modal>
    );
}

function AddDoctor() {
    const [modalDoctorShow, setDoctorShow] = React.useState(false);

    return (
        <>
            <Button className='btn-tertiary p-0' onClick={() => setDoctorShow(true)}>
                + Add Doctor
            </Button>

            <MovetoDoctor
                show={modalDoctorShow}
                onHide={() => setDoctorShow(false)}
            />
        </>
    );
}

export default AddDoctor;
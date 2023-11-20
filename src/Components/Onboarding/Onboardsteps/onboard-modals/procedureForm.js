import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';


function MovetoProcedure({modalProcedureShow, setModalProcedureShow, onHide, ...props}) {
    const drName = [
        { label: 'Dr. Shailendra Trivedi' },
        { label: 'Dr. Vijay Pancholi' },
        { label: 'Dr. Shalini Verma' },
    ];
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='qur-modal scheduled'
            onHide={()=> onHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Add Procedures</h5>
                    <span className='fs-14 text-grey font-normal'>Please fill the form </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='no-padding'>
                <div className='p-4'>
                    put form here
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-secondary btn-lg' onClick={()=>onHide()}>Cancel</Button>
                <Button className='btn btn-primary btn-lg' onClick={()=>onHide()}>Add Procedure</Button>
            </Modal.Footer>
        </Modal>
    );
}

function AddProcedure({modalProcedureShow, setModalProcedureShow, onHide, ...props}) {
    return (
        <>
            <Button className='btn btn-primary btn-sm mt-24' onClick={() => setModalProcedureShow(true)}>
                Add Procedures
            </Button>

            <MovetoProcedure
                show={modalProcedureShow}
                onHide={() => onHide()}
                setModalProcedureShow={setModalProcedureShow}
            />
        </>
    );
}

export default AddProcedure;
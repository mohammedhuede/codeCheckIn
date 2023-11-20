import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";


export function DeleteProcedureCard(props) {
    return (
        <Modal
            show={props.show}
            centered
            className='delete-modal'
        >
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title className='delete-title'>
                    Delete Procedure
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='mb-60'>
                    Are you sure you want to delete this procedure <strong>“{props.procedureNameToDelete}”? </strong>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className='btn btn-secondary btn-sm'>Cancel</Button>
                <Button className='btn btn-primary btn-sm' onClick={props.confirmdelete}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}
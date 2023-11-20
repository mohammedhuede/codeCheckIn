import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function MovetoReschedule(props) {
    const drName = [
        { label: 'Dr. Shailendra Trivedi'},
        { label: 'Dr. Vijay Pancholi'},
        { label: 'Dr. Shalini Verma'},
    ];
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
                    Rescheduled
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='no-padding'>
                <div className='px-12'>
                    <Row className='grey-card'>
                        <Col className="pl-24 pr-0">
                            <p className='fs-12'><span className='font-bold text-grey'>Referral </span> - Vekatamunuswamy Krishnamurthy </p>
                        </Col>
                        <Col className='p-0 text-grey-brdr'>
                            <p className='pl-16 fs-12'><span className='font-bold text-grey'>Request for </span> - Orthopaedics (OPD Consultation) </p>
                        </Col>
                    </Row>
                </div>
                <div className='mt-24 px-4 mb-24'>
                    <Row>
                        <Col>
                            <div className=''>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Appointment Date & Time <span className='required'>*</span> </Form.Label>
                                    <Form.Control type="date" placeholder="Select Date & Time" />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div className=''>
                                <p className='form-label'>Doctor Name <span className='required'>*</span></p>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    className='autocomplete'
                                    options={drName}
                                    renderInput={(params) => <TextField {...params} placeholder="Select doctor" />}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-secondary btn-lg' onClick={props.onHide}>Cancel</Button>
                <Button className='btn btn-primary btn-lg' onClick={props.onHide}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Rescheduled() {
    const [RescheduledModalShow, setRescheduledModalShow] = React.useState(false);

    return (
        <>
            <Button className='btn-no-brdr dropdown-text text-cap' onClick={() => setRescheduledModalShow(true)}>
                Rescheduled
            </Button>

            <MovetoReschedule
                show={RescheduledModalShow}
                onHide={() => setRescheduledModalShow(false)}
            />
        </>
    );
}

export default Rescheduled;
import Button from 'react-bootstrap/Button';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Header from '../../header';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        className='qur-modal'
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Listing
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
                Are you sure you want to delete this hospital listing and create a new one?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-secondary' onClick={props.onHide}>Cancel</Button>
          <Button className='btn-primary'>Confirm & Add new</Button>
        </Modal.Footer>
      </Modal>
    );
}

function Completescreen() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
       <div className="bg-light h-100vh">
            <Header></Header>
            <Container>
                <Row className="justify-content-center pt-120">
                    <Col className="bg-white p-3 complete-screen" xs={8}>
                        <div className="w-100">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex">
                                <img src={"/images/hospitalimg.svg"} />
                                    <div className="pl-16">
                                        <p className="text-grey">30% Completed</p>
                                        <h1 className="font-bold fs-24">Apollo Hospital</h1>
                                        <Button variant="primary btn-sm" className="mt-60">Continue from step 3</Button>
                                    </div>
                                </div>
                                <div>
                                <Button className='btn-no-brdr' onClick={() => setModalShow(true)}>
                                    <img src={"/images/deleteicon.svg"} />
                                </Button>

                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                  {/* <Button variant="tertiary" className="p-0"><img src={"/images/deleteicon.svg"} /></Button> */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
       </div>
    </>
  );
}

export default Completescreen;
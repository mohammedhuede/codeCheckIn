import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Emailverification() {
    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                    <Col xs={6}>
                        <div>
                            <div className='logo'>
                                <img src={"/images/qurfylogo.svg"} />
                            </div>
                            <div className="w-100">
                                <h1 className="font-bold fs-32">Mobile Verification</h1>
                                <p className="text-grey mt-8">Enter the 6-digit code sent on your phone number.</p>


                                <Form className="mt-24">
                                    <div className='d-flex verify-field'>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="0" />
                                        </Form.Group>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="0" />
                                        </Form.Group>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="0" />
                                        </Form.Group>
                                        <div className='p-3'>-</div>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="0" />
                                        </Form.Group>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="0" />
                                        </Form.Group>
                                        <Form.Group className="mb-24" controlId="formBasicEmail">
                                            <Form.Control type="numberl" placeholder="0" />
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Link to="/" className="anchor-link">Resend Code</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Emailverification;
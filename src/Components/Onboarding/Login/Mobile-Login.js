import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function MobileLogin() {
    return (
        <>
            <Container>
                <div className='d-flex  justify-content-between'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div className='w-100'>
                            <h1 className="font-bold fs-32">Sign in</h1>
                            <p className="text-grey mt-8"> Don’t have an account? <Link to="/signupconfirm" className="anchor-link">Signup</Link> </p>


                            <Form className="mt-24">
                                <Form.Group className="mb-24" controlId="formBasicEmail">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="number" placeholder="Eg. 783948759" />
                                </Form.Group>
                                <Link to="/mobileverify" className="btn btn-primary btn-lg">Send Otp</Link>
                                {/* <Button variant="primary btn-lg" type="submit">
                        Send OTP
                    </Button> */}
                            </Form>
                        </div>
                    </div>

                    <div className='w-50'>
                        <img src={"/images/login-right-img.png"} className='img-fluid right-img' />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default MobileLogin;
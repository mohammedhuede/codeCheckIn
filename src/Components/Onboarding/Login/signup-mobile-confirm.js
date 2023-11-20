import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signUpAws } from '../../aws-amplify-funcs/common-aws';

function Signupmobverify() {
    const navigate = useNavigate()
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e, setState) => {
        setState(e.target.value)
    }

    const handleSendOtp = () => {
        try {
            let phoneNumber = '+91' + mobileNumber
            const user = signUpAws(phoneNumber, password, 'phone_number')
            console.log('user mobile', user)
            if (user) {
                navigate("/mobileverify")
            }
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <>
            <Container>
                <div className='flex-between'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div className='w-100'>
                            <h1 className="font-bold fs-32">Sign Up</h1>
                            <p className="text-grey mt-8"> Already have an account? <Link to="/" className="anchor-link">Signin</Link> </p>


                            <Form className="mt-24">
                                <Form.Group className="mb-24" controlId="formBasicName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Eg. John Smith" />
                                </Form.Group>
                                <Form.Group className="mb-24" controlId="formBasicEmail">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="number" placeholder="Eg. 783948759" value={mobileNumber} onChange={(e) => handleChange(e, setMobileNumber)} />
                                </Form.Group>
                                <Form.Group className="mb-24" controlId="formBasicPassword">
                                    <Form.Label className="mb-0">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter 8 characters or morePassword" value={password} onChange={(e) => handleChange(e, setPassword)} />
                                </Form.Group>
                                <Button className="btn btn-primary btn-lg" onClick={handleSendOtp}>Send Otp</Button>
                                <Form.Group className="mb-24 qur-check d-flex" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="By signing up, I accept the" />
                                    <span className="pl-8"><a className="anchor-link"> Terms of Use </a> & <a className="anchor-link">Privacy Policy</a></span>
                                </Form.Group>
                                <p className="mt-32">Have an account? <Link to="/" className="anchor-link">Sign In</Link></p>

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

export default Signupmobverify;
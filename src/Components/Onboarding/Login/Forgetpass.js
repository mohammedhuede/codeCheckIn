import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Button } from 'react-bootstrap';
import { Loader } from '../../Loader';
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Forgetpass() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')
    const [toastShow, setToastShow] = useState(false);
    const [error, setError] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            // Send confirmation code to user's email
            Auth.forgotPassword(email)
                .then(data => {
                    setLoading(false)
                    navigate("/returnlogin", { state: { email } })
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.message)
                    setToastShow(true)
                    setTimeout(() => {
                        setToastShow(false)
                    }, 3000);
                    setTimeout(() => {
                        setError('')
                    }, 3500);
                    console.log(err)
                });
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }
    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                    <Col xs={12} xl={6}>
                        <div className='bg-grey'>
                            <div className='logo'>
                                <img src={"/images/qurfylogo.svg"} />
                            </div>
                            <div className="w-100">
                                <h1 className="font-bold fs-32">Forgot Password</h1>
                                <p className="text-grey mt-8">We’ll send a code to your registered email ID.</p>


                                <Form className="mt-24">
                                    <Form.Group className="mb-24" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                                    </Form.Group>
                                    <div>
                                        <Button className='btn btn-primary btn-lg' onClick={handleSubmit}>Submit</Button>
                                        <Link to="/" className="anchor-link ml-20">Return to login</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} >
                    <Toast.Header className='alert-failure'>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{error}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : null}
        </>
    );
}

export default Forgetpass;
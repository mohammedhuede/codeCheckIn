import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Passwordfield from './password';
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Loader } from '../../Loader';

function Resetpass() {
    const location = useLocation()
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [toastShow, setToastShow] = useState(false);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [toastClass, setToastClass] = useState('')
    const [loading, setLoading] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [newPassword, setNewPassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (e, setState) => {
        setState(e.target.value)
    }

    useEffect(() => {
        setUsername(location.state.email)
    }, [])

    const handleSubmit = () => {
        try {
            if (isValid()) {
                setLoading(true)
                Auth.forgotPasswordSubmit(username, code, password.password)
                    .then(data => {
                        setLoading(false)
                        // setToastShow(true)
                        // setToastClass('alert-success')
                        // setSuccessMessage('Password reset successfully')
                        // setTimeout(() => {
                        //     setToastShow(false)

                        // }, 3000);
                        // setTimeout(() => {
                        //     setSuccessMessage('')
                        //     setToastClass('')
                        // }, 3500);
                        navigate('/')
                    })
                    .catch(err => {
                        setLoading(false)
                        setToastClass('alert-failure')
                        setError(err.message)
                        setToastShow(true)
                        setTimeout(() => {
                            setToastShow(false)
                        }, 3000);
                        setTimeout(() => {
                            setError('')
                            setToastClass('')
                        }, 3500);
                        console.log(err.message)
                    });
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }

    }

    const isValid = () => {
        let error = ''
        let isValid = true
        if (password.password !== newPassword.password) {
            isValid = false
            error = "Entered passwords do not match"
        }
        setError(error)
        setToastClass('alert-failure')
        if (!isValid) {
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
                setToastClass('')
            }, 3000);
            setTimeout(() => {
                setError('')
            }, 3500);
        }
        return isValid
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                    <Col xs={12} xl={6} className='pt-80 mob-py-120'>
                        <div className='bg-grey'>
                            <div className='logo'>
                                <img src={"/images/qurfylogo.svg"} />
                            </div>
                            <div className="w-100">
                                <h1 className="font-bold fs-32">Reset your Password</h1>
                                <p className="text-grey mt-8">Enter new password you haven’t used before.</p>


                                <Form className="mt-24">
                                    <Form.Group className="mb-24" controlId="formBasicEmail">
                                        <Form.Label>Confirmation Code</Form.Label>
                                        <Form.Control type="code" placeholder="Enter the code sent to your email/phone number" value={code} onChange={(e) => handleChange(e, setCode)} />
                                    </Form.Group>
                                    <Form.Group className="mb-24" controlId="formBasicEmail">
                                        <Form.Label>New Password</Form.Label>
                                        <Passwordfield values={password} setValues={setPassword}></Passwordfield>
                                    </Form.Group>
                                    <Form.Group className="mb-24" controlId="formBasicEmail">
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <Passwordfield values={newPassword} setValues={setNewPassword}></Passwordfield>
                                    </Form.Group>
                                    <div>
                                        <Button variant="primary btn-lg" onClick={handleSubmit}>Reset Pasword</Button>
                                        <Link to="/" className='anchor-link ml-20' type="Return to login">Return to login</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} >
                    <Toast.Header className={toastClass}>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{error.length > 0 ? error : successMessage.length > 0 ? successMessage : ''}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : null}
        </>
    );
}

export default Resetpass;
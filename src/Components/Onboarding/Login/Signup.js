import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { signUpAws } from '../../aws-amplify-funcs/common-aws'
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Passwordfield from './password';
import { Loader } from '../../Loader';

function Signup() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [agreementCheckbox, setAgreementCheckbox] = useState(false)
    const [errors, setErrors] = useState({})
    const [toastShow, setToastShow] = useState(false);
    const [toastShowMessage, setToastShowMessage] = useState('');
    const [password, setPassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    async function signUp() {
        if (isValid()) {
            try {
                setLoading(true)
                signUpAws(userName, password.password, fullName, findUserNameType()).then(res => {
                    if (res) {
                        setLoading(false)
                        navigate('/emailverify', { state: { userNameType: findUserNameType() } })
                    }
                }).catch(err => {
                    setLoading(false)
                    setToastShowMessage(err.message)
                    setToastShow(true)
                    setTimeout(() => {
                        setToastShow(false)
                    }, 3000);
                    setTimeout(() => {
                        setToastShowMessage('')
                    }, 3500);
                })
            } catch (error) {
                setLoading(false)
                console.log('error signing up:', error);
            }
        }
    }

    const handleChange = (e, setState) => {
        e.preventDefault()
        setState(e.target.value)
    }

    const handleAgreementCheckbox = (e) => {
        if (e.target.checked) {
            setAgreementCheckbox(true)
        } else {
            setAgreementCheckbox(false)
        }
    }

    const findUserNameType = () => {
        let regexForEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let regexForNumber = new RegExp("^[0-9]{10}$")
        if (regexForEmail.test(userName) === true) {
            return 'email'
        } else if (regexForNumber.test(userName) === true) {
            return 'phone_number'
        } else {
            console.log('neither email nor phone number')
        }
    }

    const isValid = () => {
        let isValid = true
        let error = {}

        if (fullName.trim() === "" || fullName.trim().length === 0 || fullName === undefined) {
            isValid = false
            error['fullName'] = "User's name is required"
        }
        if (password.password.trim() === "" || password.password.trim().length === 0 || password.password === undefined) {
            isValid = false
            error['password'] = "Password cannot be blank"
        }
        if (userName.trim() === "" || userName.trim().length === 0 || userName === undefined) {
            isValid = false
            error['userName'] = "email/phone number cannot be blank"
        }

        if (Object.keys(error).length === 0) {
            if (!agreementCheckbox) {
                isValid = false
                setToastShowMessage('Before continuing you must agree accept the terms of use & privacy policy')
                setToastShow(true)
                setTimeout(() => {
                    setToastShow(false)
                }, 2000);
                setTimeout(() => {
                    setToastShowMessage('')
                }, 2500);

            }
        }
        setErrors(error)
        return isValid
    }

    return (
        <>
            <Container>
                <div className='flex-between  mob-screen'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div className="w-100 pt-80">
                            <h1 className="font-bold fs-32">Let’s Partner Up</h1>
                            <p className="text-grey mt-8">Level up your hospital, together for better and faster cure.</p>


                            <Form className="mt-24">

                                <Form.Group className="mb-24" controlId="formfullname">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Eg. John Smith" value={fullName} onChange={(e) => handleChange(e, setFullName)} />
                                    <span className="error-label">{errors['fullName']}</span>
                                </Form.Group>

                                <Form.Group className="mb-24" controlId="formBasicEmail">
                                    <Form.Label>Email/Phone number</Form.Label>
                                    <Form.Control type="text" placeholder="Eg. you@example.com" value={userName} onChange={(e) => handleChange(e, setUserName)} />
                                    <span className="error-label">{errors['userName']}</span>
                                </Form.Group>

                                <Form.Group className="mb-24" controlId="formBasicPassword">
                                    <Form.Label className="mb-0">Password</Form.Label>
                                    <Passwordfield values={password} setValues={setPassword}></Passwordfield>

                                    <span className="error-label">{errors['password']}</span>
                                </Form.Group>
                                <Form.Group className="mb-24 qur-check d-flex flex-mob-wrap" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="By signing up, I accept the" value={agreementCheckbox} onChange={handleAgreementCheckbox} />
                                    <span className="pl-8"><a className="anchor-link"> Terms of Use </a> & <a className="anchor-link">Privacy Policy</a></span>
                                </Form.Group>
                                <Button className='btn btn-primary btn-lg' onClick={signUp}>
                                    Sign up
                                </Button>
                                <p className="mt-32">Have an account? <Link to="/" className="anchor-link">Sign In</Link></p>
                            </Form>
                        </div>
                    </div>

                    <div className='w-50'>
                        <img src={"/images/login-right-img.png"} className='img-fluid right-img' />
                    </div>
                </div>
            </Container>
            <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} >
                    <Toast.Header className='alert-error'>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{toastShowMessage}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : null}
        </>
    );
}

export default Signup;
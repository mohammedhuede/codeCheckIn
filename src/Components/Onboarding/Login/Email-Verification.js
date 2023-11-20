import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Verification from './Verification';
import { Loader } from '../../Loader';
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Emailverification({ onSignIn }) {
    const [userNameType, setUserNameType] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        let type = location.state.userNameType
        setUserNameType(type)
    }, [])

    const [values, setValues] = useState(Array(6).fill(''))
    const [loading, setLoading] = useState(false)
    const [toastShow, setToastShow] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastClass, setToastClass] = useState('alert-error');


    async function confirmSignUp(values) {
        try {
            setLoading(true)
            const username = localStorage.getItem('username')     // username is email
            const res = await Auth.confirmSignUp(JSON.parse(username), values);
            if (res) {
                setLoading(false)
                navigate('/')
                onSignIn()
            }
        } catch (error) {
            setLoading(false)
            setToastClass('alert-error')
            setError(error.message)
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
            }, 3000);
            setTimeout(() => {
                setError('')
            }, 3500);
            console.log('error confirming sign up', error.message);
        }
    }

    async function resendConfirmationCode() {
        try {
            setLoading(true)
            const username = localStorage.getItem('username')
            await Auth.resendSignUp(JSON.parse(username));
            setToastClass('alert-success')
            setSuccessMessage('code resent successfully')
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
            }, 3000);
            setTimeout(() => {
                setSuccessMessage('')
            }, 3500);
            console.log('code resent successfully');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setToastClass('alert-error')
            setError(err.message)
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
            }, 3000);
            setTimeout(() => {
                setError('')
            }, 3500);
            console.log('error resending code: ', err.message);
        }
    }

    useEffect(() => {
        let x = values.filter(el => el !== "")
        x?.length === 6 && confirmSignUp(values.join(""))
    }, [values])


    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                    <Col xs={12} xl={6}>
                        <div>
                            <div className='logo'>
                                <img src={"/images/qurfylogo.svg"} />
                            </div>
                            <div className="w-100">
                                <h1 className="font-bold fs-32">{userNameType === 'email' ? 'Email Verification' : 'Mobile Verification'}</h1>
                                <p className="text-grey mt-8">{`Enter the 6-digit code sent on your  ${userNameType === 'email' ? 'email address' : 'phone number'}.`}</p>
                                <Form className="mt-24 verify-form-control ">
                                    <Verification  values={values} setValues={setValues}></Verification>
                                    <div className='mt-24'>
                                        <Button className="btn btn-lg btn-primary" onClick={resendConfirmationCode}>Resend Code</Button>
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
                        <p className="me-auto">{(error.length && error) || (successMessage.length && successMessage)}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : false}
        </>
    );
}

export default Emailverification;
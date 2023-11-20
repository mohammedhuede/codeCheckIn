import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Passwordfield from './password';
import { Loader } from '../../Loader';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../../Redux/Actions';

function Login({ onSignIn, ...props }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState({})
    const [toastShow, setToastShow] = useState(false);
    const [submitGetReq, setSubmitGetReq] = useState(false);
    const [password, setPassword] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const signIn = async () => {
        if (isValid()) {
            let type;
            let regexForEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            let regexForNumber = new RegExp("^[0-9]{10}$")
            if (regexForEmail.test(username) === true) {
                type = 'email'
            } else if (regexForNumber.test(username) === true) {
                type = 'phone_number'
            } else {
                type = 'none'
            }
            try {
                setLoading(true)
                const user = await Auth.signIn(type === 'phone_number' ? `+91${username}` : username, password.password)
                localStorage.setItem('partnerId', user.username)
                localStorage.setItem('fullName', user.attributes.name)
                localStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken)
                dynamicNavigation()
            } catch (error) {
                setLoading(false)
                setToastShow(true)
                setErrors({ 'signIn': error.message })
                console.log('error signing in', error.message)
                setTimeout(() => {
                    setToastShow(false)
                    setErrors({})
                }, 2000);
            }
        }
    }

    const isValid = () => {
        let error = {}
        let isValid = true

        if (username.trim() === "" || username.trim().length === 0 || username === undefined) {
            error['userName'] = 'User must enter email/phone number to sign in'
            isValid = false
        }
        if (password?.password?.trim() === "" || password?.password?.trim().length === 0 || password?.password === undefined) {
            error['password'] = 'User must enter a password to sign in'
            isValid = false
        }
        setErrors(error)
        return isValid
    }

    const dynamicNavigation = () => {
        onSignIn()
        getAllHospitalsBasicDetailsRequest()
    }

    const { getAllHospitalsBasicDetailsSuccess, allHospitalBasicDetailsData, error } = props.hospitalDetails

    const getAllHospitalsBasicDetailsRequest = () => {
        setSubmitGetReq(true)
        const params = {
            partnerId: localStorage.getItem('partnerId')
        }
        props.getAllHospitalsBasicDetailsRequest(params)
    }

    useEffect(() => {
        if (getAllHospitalsBasicDetailsSuccess) {
            if (submitGetReq) {
                let isOneHospitalCreated = allHospitalBasicDetailsData.some(obj => obj.reviewStatus === "Submitted" || obj.reviewStatus === "Completed")
                console.log('isOneHospitalCreated', isOneHospitalCreated)
                if (isOneHospitalCreated) {
                    setLoading(false)
                    navigate('/hospitallisting')
                } else {
                    console.log('allHospitalBasicDetailsData', allHospitalBasicDetailsData)
                    let hospitalId = allHospitalBasicDetailsData[0].id
                    navigate(`/mainside?hid=${hospitalId}&step=1`)
                    setLoading(false)
                }
            }
        }
    }, [getAllHospitalsBasicDetailsSuccess])

    useEffect(() => {
        if (error && !getAllHospitalsBasicDetailsSuccess) {
            if (submitGetReq) {
                setLoading(false)
                navigate('/')
            }
        }
    }, [error])

    return (
        <>
            <Container>
                <div className='d-flex  justify-content-between mob-screen'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div className='w-100'>
                            <h1 className="font-bold fs-32">Sign in</h1>
                            <p className="text-grey mt-8"> Don’t have an account? <Link to="/signup" className="anchor-link">Signup</Link> </p>
                            <Form className="mt-24">
                                <Form.Group className="mb-24" controlId="formBasicEmail">
                                    <Form.Label>Email address/ phone number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email/phone number" onChange={e => setUsername(e.target.value)} />
                                    <span className="error-label">{errors['userName']}</span>
                                </Form.Group>
                                <Form.Group className="mb-24" controlId="formBasicPassword">
                                    <div className="d-flex justify-content-between align-items-center mb-4-4">

                                        <Form.Label className="mb-0">Password</Form.Label>
                                        <Link to="/forgetpass" className="anchor-link">Forgot your password</Link>
                                    </div>
                                    <Passwordfield values={password} setValues={setPassword}></Passwordfield>
                                    <span className="error-label">{errors['password']}</span>
                                </Form.Group>

                                <Form.Group className="mb-24 qur-check" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Keep me logged in" />
                                </Form.Group>
                                <Button className="btn btn-primary btn-lg" onClick={signIn}>Sign in</Button>
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
                        <p className="me-auto">{errors['signIn']}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : null}
        </>
    );
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllHospitalsBasicDetailsRequest: Actions.getAllHospitalsBasicDetailsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Login);
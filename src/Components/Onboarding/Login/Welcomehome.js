import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Hub } from "aws-amplify";
import Header from '../../header';

function Welcomehome() {
    const [rerender, setRerender] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        listenToAutoSignInEvent()
    }, [])

    function listenToAutoSignInEvent() {
        Hub.listen('auth', ({ payload }) => {
            const { event } = payload;
            if (event === 'autoSignIn') {
                const user = payload.data;
                localStorage.setItem('partnerId', user.username)
                localStorage.setItem('fullName', user.attributes.name)
                localStorage.setItem('email', user.attributes.email)
                localStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken)
                setRerender(!rerender)
                // assign user
            } else if (event === 'autoSignIn_failure') {
                // redirect to sign in page
                navigate('/singin')
            }
        })
    }

    return (
        <div>
            <Header></Header>
            <Container>
                <Row className="justify-content-center align-items-stretch">
                    <Col xs={5}>

                        <div className='flex-align-center justify-content-center welcome-left-bg'>
                            <div>
                                <div className="w-100">
                                    <h1 className="font-bold fs-32">Welcome to Qurfy!</h1>

                                    <p className="text-grey mt-16">Set up your hospital and follow the steps below to get started.</p>
                                </div>
                                <div className='welcome-card mt-48'>
                                    <img src={"/images/homesvg.svg"} />
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Increase in-patient revenue</h3>
                                        <p className='fs-12 text-charcoal'>Increase in-patient revenue</p>
                                    </div>
                                </div>
                                <div className='welcome-card'>
                                    <img src={"/images/homesvg.svg"} />
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Display various hospital services</h3>
                                        <p className='fs-12 text-charcoal'>Display various hospital services</p>
                                    </div>
                                </div>
                                <div className='welcome-card'>
                                    <img src={"/images/homesvg.svg"} />
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Visualize search impressions</h3>
                                        <p className='fs-12 text-charcoal'>Visualize search impressions </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={7}>
                        <div className='pt-160 pl-160 pb-120'>
                            <div className="w-100">
                                <div className='mb-24'>
                                    <h1 className="font-bold fs-21">Add a Hospital</h1>
                                    <p className="text-grey fs-14">Follow below steps to add a hospital</p>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>1</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Basic Details</h3>
                                        <p className='fs-12 text-charcoal'>hospital name, hospital email, hospital address, importance document HO & DM</p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>2</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Departments</h3>
                                        <p className='fs-12 text-charcoal'>Select department</p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>3</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Procedures</h3>
                                        <p className='fs-12 text-charcoal'>Select elective procedured </p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>4</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Wards & Beds</h3>
                                        <p className='fs-12 text-charcoal'>Fill your wards and beds details </p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>5</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Doctors</h3>
                                        <p className='fs-12 text-charcoal'>Fill your doctors details </p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>6</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Amenities</h3>
                                        <p className='fs-12 text-charcoal'>Select Amenities</p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>7</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Insurance</h3>
                                        <p className='fs-12 text-charcoal'>Select insurance which you have </p>
                                    </div>
                                </div>
                                <div className='welcome-step-card'>
                                    <div className='welcome-screen-steps'>8</div>
                                    <div className='ml-8'>
                                        <h3 className='fs-14'>Review Profile</h3>
                                        <p className='fs-12 text-charcoal'>Submit Hospital for Review </p>
                                    </div>
                                </div>
                                <Link to={`/mainside?step=1`} className='btn btn-primary btn-lg mt-24'>Get Started</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Welcomehome;
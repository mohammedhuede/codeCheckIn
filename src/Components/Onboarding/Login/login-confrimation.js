import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Loginconfirm() {
    return (
        <>
            <Container>
                <div className='d-flex  justify-content-between'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div>
                            <h1 className="font-bold fs-32">Sign in</h1>
                            <p className="text-grey mt-8"> Don’t have an account? <Link to="signup" className="anchor-link">Signup</Link> </p>
                            <div className='d-flex align-items-center mt-40'>
                                <Link to="/mobilelogin">
                                    <div className='white-card text-center anchor-card'>
                                        <img src={"/images/phone-login.svg"} />
                                        <p className='fs-16 mt-12'>With Phone</p>
                                    </div>
                                </Link>
                                <Link to="/login">
                                    <div className='white-card text-center ml-24 anchor-card'>
                                        <img src={"/images/mail-login.svg"} />
                                        <p className='mt-12 fs-16'>With Email</p>
                                    </div>
                                </Link>
                            </div>
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

export default Loginconfirm;
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

function Signupconfirm() {
    return (
        <>
            <Container>
                <div className='flex-between'>
                    <div className='left-panel w-50'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div>
                            <h1 className="font-bold fs-32">Sign Up</h1>
                            <p className="text-grey mt-8"> Already have an account? <Link to="/" className="anchor-link">Sign in</Link> </p>
                            <div className='flex-align-center mt-40'>
                                <Link to="/signupmobverify">
                                    <div className='white-card text-center anchor-card'>
                                        <img src={"/images/phone-login.svg"} />
                                        <p className='fs-16 mt-12'>With Phone</p>
                                    </div>
                                </Link>
                                <Link to="/signup">
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

export default Signupconfirm;
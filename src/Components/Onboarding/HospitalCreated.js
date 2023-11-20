import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function HospitalCreated() {
    return (
        <>
            <Container>
                <div className='flex-between'>
                    <div className='w-100 h-100vh'>
                        <div className='logo'>
                            <img src={"/images/qurfylogo.svg"} />
                        </div>
                        <div className='w-100 h-100vh flex-center align-items-center'>
                            <div className='text-center'>
                                <img src={"/images/thumb.svg"} />
                                <h1 className="font-bold fs-32">Hospital created <br></br> suscussfully!</h1>
                                <p className="text-grey mt-8"> Your hospital is under review. We will get back to<br></br> you within 3-4 days.</p>
                                <Link to="/" className="btn btn-lg btn-primary mt-24">Go to dashboard </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HospitalCreated;
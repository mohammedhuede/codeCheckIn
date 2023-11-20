import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Header from '../../header';

function Welcomehome() {
  return (
    <div className='bg-light'>
          <Header></Header>
          <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                <Col xs={10}>
                        <div  className='bg-light'>
                            <div className="w-100">
                                <div className='text-center'>
                                   <h1 className="font-bold fs-32">Welcome to Qurfy!</h1>
                                   <p className="text-grey mt-24">Set up your hospital and follow the steps below to get started.</p>
                                </div>
                                <Row className='mt-48'>
                                    <Col className='text-center'>
                                        <div className='welcomecard-border'>
                                            <img src={"/images/setup.svg"} />
                                            <span className='welcome-brdr'></span>
                                        </div>
                                        <div className='mt-32'>
                                            <h4 className='fs-16'>Set up</h4>
                                            <p className='fs-12'>Create a hospital profile</p>
                                        </div>
                                    </Col>
                                    <Col className='text-center welcomecard'>
                                       <div className='welcomecard-border'>
                                            <img src={"/images/publish.svg"} />
                                            <span className='welcome-brdr'></span>
                                        </div>
                                        <div className='mt-32'>
                                            <h4 className='fs-16'>Publish</h4>
                                            <p className='fs-12'>Make your hospital profile live</p>
                                        </div>
                                    </Col>
                                    <Col className='text-center'>
                                        <img src={"/images/get-started.svg"} />
                                        <div className='mt-32'>
                                            <h4 className='fs-16'>Get Started</h4>
                                            <p className='fs-12'>Referrals will be sent to your way</p>
                                        </div>
                                    </Col>
                                    <div className='text-center mt-40'>
                                        <Link to={`/mainside?pid=p1234&step=1`} className='btn btn-primary btn-lg'>Add Hospital</Link>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
    </div>
  );
}

export default Welcomehome;
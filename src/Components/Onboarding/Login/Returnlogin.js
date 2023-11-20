import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation, useNavigate } from "react-router-dom";

function ReturnLogin(props) {
  const location = useLocation()
  const navigate = useNavigate()

  const navigateToReset = () => {
    navigate('/resetpass', { state: { email: location.state.email } })
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center h-100vh">
          <Col xs={12} xl={4}>
            <div className='logo'>
              <img src={"/images/qurfylogo.svg"} />
            </div>
            <div className="text-center">
              <div    >
                <img src={"/images/thumsup.svg"} />
                <p className="mt-16">We have sent you OTP on your registered email address/phone number. Please check and reset your password.</p>
                <div className='mt-24'>
                  <Button className='btn btn-primary btn-lg ml-20' type="Return to login" onClick={navigateToReset}>Reset Password</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReturnLogin;
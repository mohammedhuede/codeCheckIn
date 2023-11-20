import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function AutohideExample() {
  const [show, setShow] = useState(false);

  return (
    <>
        <Row>
          <Col xs={6}>
            <div className='toast-block'>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} >
                  <Toast.Header className='alert-success'>
                    <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                    <p className="me-auto">A new department added “Cardiology”</p>
                  </Toast.Header>
                </Toast>
            </div>
          </Col>
          <Col xs={6}>
            <Button onClick={() => setShow(true)}>Show Toast</Button>
          </Col>
        </Row> 
    </>
  );
}

export default AutohideExample;
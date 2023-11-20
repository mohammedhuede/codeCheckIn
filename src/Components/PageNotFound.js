import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function PageNotFound() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center h-100vh">
        <Col xs={12} xl={6}>
          <div>
            <div className='logo'>
              <img src={"/images/qurfylogo.svg"} />
            </div>
            <div className="w-100 text-center">
              <img src={"/images/page-not-found.svg"} className="img-fluid" />
              <h1 className="font-bold fs-32">Page not found</h1>
              <p className="text-grey mt-8">Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring out site:</p>
              <Link to="/" className='btn btn-sm btn-primary mt-24'>Go Home</Link>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PageNotFound;
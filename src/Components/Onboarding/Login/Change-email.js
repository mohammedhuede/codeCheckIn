import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Button } from 'react-bootstrap';

function ChangeEmail() {

    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center h-100vh">
                    <Col xs={6}>
                        <div >
                            <div className='logo'>
                                <img src={"/images/qurfylogo.svg"} />
                            </div>
                            <div className="w-100">
                                <h1 className="font-bold fs-32">Change Your email address</h1>
                                <p className="text-grey mt-8">Enter the new email address you want to use.</p>


                                <Form className="mt-24">
                                    <Form.Group className="mb-24" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Email" />
                                    </Form.Group>
                                    <div>
                                        <Button className='btn btn-primary btn-lg'>Generate OTP</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ChangeEmail;
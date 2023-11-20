import React, { useState } from 'react';
import { Modal, Button, Container, InputGroup, Row, Dropdown, ButtonGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BedIcon from '@mui/icons-material/Bed';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Col from 'react-bootstrap/Col';
import Wards from '../Onboarding/Onboardsteps/Review Profile/Ward-&-Beds';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Listingheader from "./listing-header";
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Sidebar from './Sidebar';
import Scheduled from './Referral-Modal/Move-to-Scheduled';
import Admit from './Referral-Modal/Admit';
import Rescheduled from './Referral-Modal/Rescheduled';
import Discharge from './Referral-Modal/Discharge';
import Toast from 'react-bootstrap/Toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Pagination from 'react-bootstrap/Pagination';

function Referrallisting() {

    const [modalShow, setModalShow] = React.useState(false);
    const [AdmitModalShow, setAdmitModalShow] = React.useState(false);
    const [RescheduledModalShow, setRescheduledModalShow] = React.useState(false);
    const [DischargeModalShow, setDischargeModalShow] = React.useState(false);
    const [showNoResponse, setNoResponse] = useState(false);

    const values = [true,];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <div className='referral-list'>
            <Listingheader></Listingheader>
            <Sidebar></Sidebar>
            <div className="listing-content">
                <div>
                    <div className="d-flex justify-content-between flex-mob-wrap">
                        <h2 className="form-main-title">Referrals</h2>
                    </div>
                    <div className="mt-24">
                        <Tabs
                            defaultActiveKey="Pending"
                            id="justify-tab-example"
                            className="mb-3 qur-tabs"
                            justify
                        >
                            <Tab eventKey="Pending" title={<span> Pending </span>}>

                                {/*--------- desktop data----- */}

                                <div className='referral-search d-flex justify-content-end'>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/search-icon.svg"} alt='search' /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="By name, mobile number or ID"
                                            aria-label="By name, mobile number or ID"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                        />
                                    </InputGroup>
                                </div>

                                <Table striped className='qur-table mt-24'>
                                    <thead className='table-head dep-head'>
                                        <tr>
                                            <th>Referral</th>
                                            <th>Contact Details</th>
                                            <th>Request For</th>
                                            <th>Created On</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kaylynn Westervelt <Badge className="ml-8 badge-purple">New</Badge>
                                                <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>General Consultation <br /> <span className='text-grey fs-12'>Cardiovascular</span></td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    /* show={modalShow}
                                                                    onHide={() => setModalShow(false)} */
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kaylynn Westervelt <Badge className="ml-8 badge-info">• follow up</Badge>
                                                <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>--</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {/*--------- desktop data----- */}

                                {/*--------- mobile data data----- */}
                                <div className='referral-mob-data mt-24'>
                                    <div className='res-white-card mb-16'>
                                        <div className='flex-between-center'>
                                            <Badge className="badge-info">follow up</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                        <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                        <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                    </div>

                                    <div className='res-white-card'>
                                        <div className='flex-between-center'>
                                            <Badge className="badge-purple">• New</Badge>
                                            <div className='flex-align-center'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                        <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                        <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                    </div>
                                </div>

                                <div className='Dr-list-pagination ref-pagination'>
                                    <div className='Dr-list'>
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item className='active'>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div>
                                </div>
                                {/*--------- mobile data data----- */}

                            </Tab>

                            <Tab eventKey="Schedule" title={<span> Scheduled </span>}>

                                {/*--------- desktop data----- */}

                                <div className='referral-search d-flex justify-content-end'>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/search-icon.svg"} alt='search' /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="By name, mobile number or ID"
                                            aria-label="By name, mobile number or ID"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                        />
                                    </InputGroup>
                                </div>

                                <Table striped className='qur-table mt-24'>
                                    <thead className='table-head dep-head'>
                                        <tr>
                                            <th>Referral</th>
                                            <th>Contact Details</th>
                                            <th>Treatment For</th>
                                            <th>Doctor name</th>
                                            <th>Appointment date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kaylynn Westervelt  <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'>Cardiovascular</span></td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>Cardiovascular</span> </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kaylynn Westervelt <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'>Gastroenterology</span></td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>Cardiovascular</span> </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kaylynn Westervelt <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>Surgery <br /> <span className='text-grey fs-12'>ENT</span></td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>Cardiovascular</span> </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kaylynn Westervelt <br /> <span className='text-grey fs-12'>REF0984532</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'>Cardiovascular</span></td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>Cardiovascular</span> </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>

                                {/*--------- desktop data----- */}


                                {/*--------- mobile data data----- */}
                                <div className='referral-mob-data mt-24'>
                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-info">• follow up</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-purple">• New</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Rescheduled
                                                                    show={RescheduledModalShow}
                                                                    onHide={() => setRescheduledModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Discharge
                                                                    show={DischargeModalShow}
                                                                    onHide={() => setDischargeModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Button className='no-response' onClick={() => setNoResponse(true)}>Not responding </Button>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>

                                <div className='Dr-list-pagination ref-pagination'>
                                    <div className='Dr-list'>
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item className='active'>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div>
                                </div>

                                {/*--------- mobile data data----- */}
                            </Tab>

                            <Tab eventKey="Admitted" title={<span> Admitted </span>}>

                                {/*--------- desktop data----- */}

                                <div className='referral-search d-flex justify-content-end'>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/search-icon.svg"} alt='search' /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="By name, mobile number or ID"
                                            aria-label="By name, mobile number or ID"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                        />
                                    </InputGroup>
                                </div>

                                <Table striped className='qur-table mt-24'>
                                    <thead className='table-head dep-head'>
                                        <tr>
                                            <th>Referral </th>
                                            <th>Contact Details</th>
                                            <th>Treatment For</th>
                                            <th>Doctor name</th>
                                            <th>Admission date & time</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> <span className='text-grey fs-12'>REF0984532</span><br /> Kaylynn Westervelt <br /><span className='text-grey fs-12'>IP# 123458697</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'> Cardiovascular </span> </td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span>  </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >

                                                            <Dropdown.Item eventKey="3">
                                                                <Link to='#'>Discharge</Link>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> <span className='text-grey fs-12'>REF0984532</span><br /> Kaylynn Westervelt <br /><span className='text-grey fs-12'>IP# 123458697</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'> Cardiovascular </span> </td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span>  </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >

                                                            <Dropdown.Item eventKey="3">
                                                                <Link to='#'>Discharge</Link>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> <span className='text-grey fs-12'>REF0984532</span><br /> Kaylynn Westervelt <br /><span className='text-grey fs-12'>IP# 123458697</span></td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span> </td>
                                            <td>O.P Consultation <br /> <span className='text-grey fs-12'> Cardiovascular </span> </td>
                                            <td>Dr. Lokesh Lingappa</td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'> kaylynn@gmail.com </span>  </td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >

                                                            <Dropdown.Item eventKey="3">
                                                                <Link to='#'>Discharge</Link>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>

                                {/*--------- desktop data----- */}

                                {/*--------- mobile data data----- */}
                                <div className='referral-mob-data mt-24'>
                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='d-flex justify-content-between align-items-start p-12'>
                                            <div className='pt-0'>
                                                <h3 className='fs-16'>K.M. Vekatamunusumay</h3>
                                                <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                                <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                            </div>
                                            <div className='d-flex'>
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >

                                                            <Dropdown.Item eventKey="3">
                                                                <Link to='#'>Discharge</Link>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-purple">• New</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >

                                                            <Dropdown.Item eventKey="3">
                                                                <Link to='#'>Discharge</Link>
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>

                                {/*--------- mobile data data----- */}
                                <div className='Dr-list-pagination ref-pagination'>
                                    <div className='Dr-list'>
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item className='active'>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div>
                                </div>

                            </Tab>

                            <Tab eventKey="Closed" title={<span>  Discharged </span>}>
                                {/*--------- desktop data----- */}

                                <div className='referral-search d-flex justify-content-end'>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/search-icon.svg"} alt='search' /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="By name, mobile number or ID"
                                            aria-label="By name, mobile number or ID"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                        />
                                    </InputGroup>
                                </div>

                                <div className='flex-between-center commision-block mt-24 flex-mob-wrap'>
                                    <p className='text-danger fs-12 font-bold'>Commission pending to pay: Rs 15000</p>
                                    <Form>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="qur-check mt-mob-8">
                                                <Form.Check
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={`Show only non payment cleared referrals`}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                </div>

                                <Table striped className='qur-table mt-24'>
                                    <thead className='table-head dep-head'>
                                        <tr>
                                            <th>Referral </th>
                                            <th>Contact Details</th>
                                            <th>Discharge date & time</th>
                                            <th>Final Bill Amount(in Rs)</th>
                                            <th>Qurfy commission @10%(in Rs.)</th>
                                            <th>Commission Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> <span className='fs-12 text-grey'> REF0984532 <br /> </span> Kaylynn Westervelt <br /> <span className='fs-12 text-grey'> IP# 123458697 </span></td>
                                            <td>74770752523 <br /> <span className='fs-12 text-grey'> kaylynn@gmail.com </span></td>
                                            <td>25 Sep, 2022 <br /> <span className='fs-12 text-grey'> 04:35 PM</span></td>
                                            <td>15,000</td>
                                            <td>2,000</td>
                                            <td><img src={"/images/qurfy-accept.svg"} alt='comission-paid' /></td>
                                        </tr>
                                        <tr>
                                            <td> <span className='fs-12 text-grey'> REF0984532 <br /> </span> Kaylynn Westervelt <br /> <span className='fs-12 text-grey'> IP# 123458697 </span></td>
                                            <td>74770752523 <br /> <span className='fs-12 text-grey'> kaylynn@gmail.com </span></td>
                                            <td>25 Sep, 2022 <br /> <span className='fs-12 text-grey'> 04:35 PM</span></td>
                                            <td>15,000</td>
                                            <td>2,000</td>
                                            <td><img src={"/images/qurfy-cancel.svg"} alt='comission-pending' /></td>
                                        </tr>
                                        <tr>
                                            <td> <span className='fs-12 text-grey'> REF0984532 <br /> </span> Kaylynn Westervelt <br /> <span className='fs-12 text-grey'> IP# 123458697 </span></td>
                                            <td>74770752523 <br /> <span className='fs-12 text-grey'> kaylynn@gmail.com </span></td>
                                            <td>25 Sep, 2022 <br /> <span className='fs-12 text-grey'> 04:35 PM</span></td>
                                            <td>15,000</td>
                                            <td>2,000</td>
                                            <td><img src={"/images/qurfy-cancel.svg"} alt='comission-pending' /></td>
                                        </tr>
                                    </tbody>
                                </Table>

                                {/*--------- desktop data----- */}

                                {/*--------- mobile data data----- */}
                                <div className='referral-mob-data mt-24'>
                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-info">• follow up</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />

                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-purple">• New</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>

                                <div className='Dr-list-pagination ref-pagination'>
                                    <div className='Dr-list'>
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item className='active'>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div>
                                </div>

                                {/*--------- mobile data data----- */}

                            </Tab>

                            <Tab eventKey="No-response" title={<span>  No Response </span>}>

                                {/*--------- desktop data----- */}

                                <div className='referral-search d-flex justify-content-end'>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/search-icon.svg"} alt='search' /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="By name, mobile number or ID"
                                            aria-label="By name, mobile number or ID"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                        />
                                    </InputGroup>
                                </div>

                                <Table striped className='qur-table mt-24'>
                                    <thead className='table-head dep-head'>
                                        <tr>
                                            <th>Referral Name</th>
                                            <th>Contact Details</th>
                                            <th>Request For</th>
                                            <th>Appointment Date</th>
                                            <th>Created On</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kaylynn Westervelt</td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>General Consultation <br /> <span className='text-grey fs-12'>Cardiovascular</span></td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                Delete
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kaylynn Westervelt</td>
                                            <td>74770752523 <br /> <span className='text-grey fs-12'>kaylynn@gmail.com</span> </td>
                                            <td>General Consultation <br /> <span className='text-grey fs-12'>Cardiovascular</span></td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>25 Sep, 2022 <br /> <span className='text-grey fs-12'>04:35 PM</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end" >
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                        <p className='text-center'>Action</p>
                                                                    </Button>

                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                Delete
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>

                                {/*--------- desktop data----- */}

                                {/*--------- mobile data data----- */}
                                <div className='referral-mob-data mt-24'>
                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-info">• follow up</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                Delete
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    <div className='res-white-card mb-16 p-0'>
                                        <div className='flex-between-center p-12 pb-0'>
                                            <Badge className="badge-purple">• New</Badge>
                                            <div className='d-flex'>
                                                <img src='/images/call-btn.svg' />
                                                <div className='ml-12'>
                                                    {['start'].map((direction) => (
                                                        <DropdownButton
                                                            as={ButtonGroup}
                                                            key={direction}
                                                            id={`dropdown-button-drop-${direction}`}
                                                            class={`dropdown-button-drop-${direction}`}
                                                            drop={direction}
                                                            variant="secondary"
                                                            autoClose="outside"
                                                            title={
                                                                <div className="action-btn-block">
                                                                    <Button className='d-flex align-items-center btn action-btn'>
                                                                        <img className="thumbnail-image"
                                                                            src={"/images/dropdown-toggle.svg"} alt='drop-toggle'
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            }
                                                        >
                                                            <Dropdown.Item eventKey="2">
                                                                <Scheduled
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                <Admit
                                                                    show={AdmitModalShow}
                                                                    onHide={() => setAdmitModalShow(false)}
                                                                />
                                                            </Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">
                                                                Delete
                                                            </Dropdown.Item>
                                                        </DropdownButton>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-12 pt-0'>
                                            <h3 className='fs-16 mt-8'>K.M. Vekatamunusumay</h3>
                                            <p className='fs-12 text-grey mt-4'>REF0984532</p>
                                            <p className='fs-12 text-grey'>Cardiovascular  •  Angioplasty</p>
                                        </div>
                                        <div className='refferal-grey-card'>
                                            <Row>
                                                <Col className='brdr-right'>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Dr.</p>
                                                        <h5 className='fs-10'>K.M. Vekatamunus...</h5>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='p-12'>
                                                        <p className='fs-10 text-grey'>Appointment date</p>
                                                        <h5 className='fs-10'>Jun 19, 2022 at 04:00 PM</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>

                                <div className='Dr-list-pagination ref-pagination'>
                                    <div className='Dr-list'>
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item className='active'>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div>
                                </div>

                                {/*--------- mobile data data----- */}
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                {/* When no refferals found after search */}

                {/* <div className='empty-block d-flex justify-content-center align-items-center'>
                        <div className='text-center'>
                            <img src={"/images/no-refferal.svg"} alt='no-refferal' />
                            <h4 className='mt-16'>No referral found</h4>
                            <p className='mt-4'>Please fill the correct referral code</p>
                            <Button varient="primary" className='mt-24 btn-sm'>View all referrals</Button>
                        </div>
                </div> */}

                {/* When no refferals found after search */}

                {/* For Edit Profile  */}

                <Modal show={show} fullscreen={fullscreen} className="large-modal" onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Referral</Modal.Title>
                        <div>
                            <Button varient="secondary" className='btn-secondary mr-16'>Cancel</Button>
                            <Button varient="secondary">Save Changes</Button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='flex-center'>
                            <Row className='blue-card w-75'>
                                <Col xs={3} className="d-flex align-items-center">
                                    <img src={"/images/current-customer.svg"} alt='customer' />
                                    <div className='ml-16'>
                                        <p className='text-grey fs-10'>Customer Name</p>
                                        <h5 className='text-dark fs-14'>Rajat Mehra</h5>
                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <div>
                                        <p className='text-grey fs-10'>Department</p>
                                        <h5 className='text-dark fs-14'>Cardiovascular</h5>
                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <div className='ml-16'>
                                        <p className='text-grey fs-10'>Procedure</p>
                                        <h5 className='text-dark fs-14'>Angioplasty</h5>
                                    </div>
                                </Col>
                                <Col xs={3} className="d-flex justify-content-end">
                                    <p className='text-grey fs-10'>Created On:  09 June 2022  •  4:45PM</p>
                                </Col>
                            </Row>
                        </div>

                        <div className="maintitle flex-center mt-32">
                            <div className='w-80'>
                                <Row>
                                    <Col className='d-flex'>
                                        <img src={"/images/basic_hospital.svg"} alt='hospital' />
                                        <h3 className="ml-12">More Details</h3>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className='flex-center mt-32'>
                            <div className='w-75'>
                                <Row>
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>Status <span className='required'>*</span></p>
                                            <Dropdown className='qur-dropdown' autoClose="outside">
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Select Status
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='qur-dropdown status-dropdown qur-search-dropdown'>
                                                    <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Appointment Scheduled</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4">Appointment Completed</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-5">Referral Payment Completed</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-5">Closed</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>IP Number <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="ipnumber">
                                                <Form.Control type="number" placeholder="Enter ip number" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>Admission Date<span className='required'>*</span></p>
                                            <Form.Group className="" controlId="admissiondate">
                                                <Form.Control type="text" placeholder="02/08/2022" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Discharge Date <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="dischargedate">
                                                <Form.Control type="text" placeholder="02/08/2022" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Final Bill Amount  <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="billamount">
                                                <Form.Control type="number" placeholder="Enter amount" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Referral Percentage <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="enterpercent">
                                                <Form.Control type="number" placeholder="Enter percentage" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="maintitle flex-center mt-32">
                            <div className='w-80'>
                                <Row>
                                    <Col className='d-flex'>
                                        <img src={"/images/basic_hospital.svg"} alt='hospital' />
                                        <h3 className="ml-12">Payment Details</h3>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className='flex-center mt-32'>
                            <div className='w-75'>
                                <Row>
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>Payment Date <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="paymentdate">
                                                <Form.Control type="text" placeholder="Select Date" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>Select Payment Method <span className='required'>*</span></p>
                                            <Dropdown className='qur-dropdown' autoClose="outside">
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Select payment
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='qur-dropdown status-dropdown qur-search-dropdown'>
                                                    <Dropdown.Item href="#/action-1">Online</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Offline</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>

                                    {/* This field will be visible only when payment method is online */}
                                    <Col xs={4}>
                                        <div className=''>
                                            <p className='form-label'>UPI Reference Number <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="upinumber">
                                                <Form.Control type="text" placeholder="SBI78698436243" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    {/* This field will be visible only when payment method is online */}

                                    <Col xs={8} className="mt-32">
                                        <Form.Label>Description </Form.Label>
                                        <FloatingLabel controlId="floatingTextarea2" label="Write here">
                                            <Form.Control as="textarea" placeholder="Write here" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-32">
                                        <Form.Label>DM & HO <span className="required"> *</span></Form.Label>
                                        <div class="form-group">
                                            <div class="form-upload text-left">
                                                <div class="form-upload-group">
                                                    <div class="upload-title d-flex justify-content-between">
                                                        <div className="d-flex align-items-center w-100">
                                                            <img src={"/images/upload-file.svg"} alt='upload-file' />
                                                            <div className="ml-12">
                                                                <a href='#' class="upload-link">Drag and drop documents to upload</a>
                                                                <p>or browse from your files</p>
                                                                <input type='file' />
                                                            </div>
                                                        </div>
                                                        <div className="w-100 d-flex justify-content-end">
                                                            <Button variant="secondary" className="btn-sm mt-12">Select file</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col className="mt-32">
                                        <Form.Label>DM & HO <span className="required"> *</span></Form.Label>
                                        <div class="form-group">
                                            <div class="form-upload text-left">
                                                <div class="form-upload-group">
                                                    <div class="upload-title d-flex justify-content-between">
                                                        <div className="d-flex align-items-center w-100">
                                                            <img src={"/images/upload-file.svg"} alt='upload-file' />
                                                            <div className="ml-12">
                                                                <a href='#' class="upload-link">Drag and drop documents to upload</a>
                                                                <p>or browse from your files</p>
                                                                <input type='file' />
                                                            </div>
                                                        </div>
                                                        <div className="w-100 d-flex justify-content-end">
                                                            <Button variant="secondary" className="btn-sm mt-12">Select file</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

                {/* For Edit Profile  */}
            </div>
            <div className='toast-block'>
                <Toast onClose={() => setNoResponse(false)} show={showNoResponse} delay={3000} autohide>
                    <Toast.Header className='alert-success'>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">Referral move no reponse successfully</p>
                    </Toast.Header>
                </Toast>
            </div>

        </div>
    );
}

export default Referrallisting;


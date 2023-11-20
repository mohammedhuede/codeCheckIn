import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BedIcon from '@mui/icons-material/Bed';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Row from "react-bootstrap/Row";
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import Listingheader from './listing-header';
import Header from '../header';
import Wards from '../Onboarding/Onboardsteps/Review Profile/Ward-&-Beds';
import Departments from '../Onboarding/Onboardsteps/Review Profile/Departments';
import Procedures from '../Onboarding/Onboardsteps/Review Profile/Procedures';
import Doctors from '../Onboarding/Onboardsteps/Review Profile/Doctors';
import Insurance from '../Onboarding/Onboardsteps/Review Profile/Insurance';
import StepFirst from '../Onboarding/Onboardsteps/StepFirst';
import ThirdStep from '../Onboarding/Onboardsteps/ThirdStep';
import SecondStep from '../Onboarding/Onboardsteps/SecondStep';
import FourthStep from '../Onboarding/Onboardsteps/FourthStep';
import FifthStep from '../Onboarding/Onboardsteps/FifthStep';
import SixthStep from '../Onboarding/Onboardsteps/SixthStep';
import SevenStep from '../Onboarding/Onboardsteps/SevenStep';


function Hospitalfullpage() {
    const previewprofile = [true,];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const previewprofileedit = [true];
    const [fullscreenedit, setFullscreenedit] = useState(true);
    const [showedit, setShowedit] = useState(false);

    function handleShowedit(breakpoint) {
        setFullscreen(breakpoint);
        setShowedit(true);
    }
  
  return (
    <div className=''>
        <Listingheader></Listingheader>
        <div className='side-nav'>
            <div className='listing-logo'>
                <Link to=""><img src={"/images/qurfylogo.svg"} /></Link>
            </div>
            <Nav defaultActiveKey="/hospitalfullpage" className="flex-column">
                <Nav.Link href="/dashboard"><img src={"/images/navdash.svg"} className="pr-8" /> Dashboard</Nav.Link>
                <Nav.Link href="/refferal"><img src={"/images/navrefferal.svg"} className="pr-8" /> Referrals </Nav.Link>
                    <div className='my-3'>
                        <hr
                            style={{
                            background: '#E4E7EC',
                            color: '#E4E7EC',
                            height: '1px',
                            width: '100%',
                            opacity:'1',
                            margin:'0px',
                            }}
                        />
                    </div>
                <Nav.Link href="/hospitallisting"><img src={"/images/navhospital.svg"} className="pr-8" /> Hospital</Nav.Link>
                <Nav.Link href="/doctorlisting"><img src={"/images/navdoctor.svg"} className="pr-8" /> Doctors</Nav.Link>
                <Nav.Link href="/adminlisting"><img src={"/images/navadmin.svg"} className="pr-8" /> Admin</Nav.Link>
            </Nav>
        </div>
        <div className='listing-content'>
            <Modal show={show} fullscreen={fullscreen} className="large-modal" onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Preview Hospital Profile</Modal.Title>
                <div>
                    <Button varient="secondary" className='btn-secondary mr-16'>Cancel</Button>
                    <Button varient="secondary">Save Changes</Button>
                </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex-center'>
                        <div className='w-80'>
                            <Row>
                                <Col xs={12}>
                                    <div>
                                        <Row>
                                        <Col className='white-card border-right-radius-0'>
                                                <div className='d-flex'>
                                                    <div>
                                                        <img src={"/images/hospital.png"} />
                                                    </div>
                                                    <div className='ml-16'>
                                                        <Badge  bg="danger">
                                                            Allopathy
                                                        </Badge> 
                                                        <Badge  bg="danger" className='ml-8'>
                                                        Naturopathy
                                                        </Badge> 
                                                        <h2 className='dashboard-title mt-8'>Apollo Hospital</h2>  
                                                        <div className='d-flex align-items-center mt-24'>
                                                            <img src={"/images/location.svg"} />
                                                            <p className='ml-12'>Sector-D, Scheme No 74C, Vijay Nagar, Indore, Madhya Pradesh 452010</p>
                                                        </div> 
                                                        <div className='d-flex align-items-center mt-16'>
                                                            <img src={"/images/contact.svg"} />
                                                            <p className='ml-12'>admin@apollo.com<br/>1860 500 1066</p>
                                                        </div> 
                                                        <div className='d-flex align-items-center mt-16'>
                                                            <img src={"/images/covid.svg"} />
                                                            <p className='ml-12'>COVID & Non-COVID</p>
                                                        </div> 
                                                    </div>
                                                </div>
                                        </Col>
                                        <Col xs={3} className="grey-card-block">
                                            <p>Amenities</p>
                                                <div className='d-flex align-items-center mt-12'>
                                                    <img src={"/images/wifi.svg"} />
                                                    <p className='ml-12'>Wifi</p>
                                                </div> 
                                                <div className='d-flex align-items-center mt-12'>
                                                    <img src={"/images/tv.svg"} />
                                                    <p className='ml-12'>TV</p>
                                                </div> 
                                                <div className='d-flex align-items-center mt-12'>
                                                    <img src={"/images/refrigerator.svg"} />
                                                    <p className='ml-12'>Refrigerator in room</p>
                                                </div> 
                                                <div className='d-flex align-items-center mt-12'>
                                                    <img src={"/images/canteen.svg"} />
                                                    <p className='ml-12'>Canteen/Cafetaria</p>
                                                </div> 
                                                <div className='d-flex align-items-center mt-12'>
                                                    <img src={"/images/ambulance.svg"} />
                                                    <p className='ml-12'>Ambulance for pickup/dropoff</p>
                                                </div> 
                                                <Link to='' className='anchor-link'> +2 more </Link>
                                        </Col>
                                        </Row>
                                        <Tabs
                                            defaultActiveKey="Ward-&-Beds"
                                            id="justify-tab-example"
                                            className="mb-3 qur-tabs mt-40"
                                            justify
                                            >
                                            <Tab eventKey="Ward-&-Beds" title={<span> <BedIcon className="mr-8"/> Ward & Beds (147) </span>}>
                                            
                                            </Tab>
                                            <Tab eventKey="Departments" title={<span> <DashboardOutlinedIcon className="mr-8"/> Departments (42) </span>}>
                                               
                                            </Tab>
                                            <Tab eventKey="Procedures" title={<span> <DescriptionOutlinedIcon className="mr-8"/> Procedures (24) </span>}>
                                               
                                            </Tab>
                                            <Tab eventKey="Doctors" title={<span> <MedicalServicesOutlinedIcon className="mr-8"/> Doctors (52) </span>}>
                                                
                                            </Tab>
                                            <Tab eventKey="Insurance" title={<span> <CreditCardOutlinedIcon className="mr-8"/> Insurance (12) </span>}>
                                               
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

            <Modal show={showedit} fullscreen={fullscreenedit} className="large-modal" onHide={() => setShowedit(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Hospital</Modal.Title>
                <div>
                    <Button varient="secondary" className='btn-secondary mr-16'>Cancel</Button>
                    <Button varient="secondary">Save Changes</Button>
                </div>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <div className='side-tab'>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row className='w-100'>
                                <Col sm={3}>
                                    <div className='side-tab-block'>
                                        <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Basic Details</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Departments</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Proceduress</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth">Wards & Beds</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fifth">Doctors</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="sixth">Amenities</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="seven">Insurance</Nav.Link>
                                        </Nav.Item>
                                        </Nav>
                                    </div>
                                </Col>
                                <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className='edit-step'>
                                            
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div className='edit-step'>
                                            
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                       <div className='edit-step'>
                                            
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                       <div className='edit-step'>
                                            
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fifth">
                                        <div className='edit-step'>
                                           
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="sixth">
                                        <div className='edit-step'>
                                           
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="seven">
                                        <div className='edit-step'>
                                           
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={"/images/arrow-back.svg"} className="pr-16" />
                    <h4 className="text-bold">Apollo Hospital</h4>
                </div>
                <div>
                   {previewprofile.map((v, idx) => (
                        <Button key={idx} className="btn-sm btn-secondary mr-16" onClick={() => handleShow(v)}>
                        Preview Profile
                        {typeof v === 'string' && `below ${v.split('-')[0]}`}
                        </Button>
                    ))}

                    {previewprofileedit.map((v, idx) => (
                        <Button key={idx} className="btn-sm btn-primary mr-16" onClick={() => handleShowedit(v)}>
                         Edit/Update Profile
                        {typeof v === 'string' && `below ${v.split('-')[0]}`}
                        </Button>
                    ))}

                </div>
            </div>
            <div className='mt-32'>
                <Row>
                   <Col className='white-card border-right-radius-0'>
                        <div className='d-flex'>
                            <div>
                                <img src={"/images/hospital.png"} />
                            </div>
                            <div className='ml-16'>
                                <Badge  bg="danger">
                                    Allopathy
                                </Badge> 
                                <Badge  bg="danger" className='ml-8'>
                                   Naturopathy
                                </Badge> 
                                <h2 className='dashboard-title mt-8'>Apollo Hospital</h2>  
                                <div className='d-flex align-items-center mt-24'>
                                    <img src={"/images/location.svg"} />
                                    <p className='ml-12'>Sector-D, Scheme No 74C, Vijay Nagar, Indore, Madhya Pradesh 452010</p>
                                </div> 
                                <div className='d-flex align-items-center mt-16'>
                                    <img src={"/images/contact.svg"} />
                                    <p className='ml-12'>admin@apollo.com<br/>1860 500 1066</p>
                                </div> 
                                <div className='d-flex align-items-center mt-16'>
                                    <img src={"/images/covid.svg"} />
                                    <p className='ml-12'>COVID & Non-COVID</p>
                                </div> 
                            </div>
                        </div>
                   </Col>
                   <Col xs={3} className="grey-card-block">
                       <p>Amenities</p>
                        <div className='d-flex align-items-center mt-12'>
                            <img src={"/images/wifi.svg"} />
                            <p className='ml-12'>Wifi</p>
                        </div> 
                        <div className='d-flex align-items-center mt-12'>
                            <img src={"/images/tv.svg"} />
                            <p className='ml-12'>TV</p>
                        </div> 
                        <div className='d-flex align-items-center mt-12'>
                            <img src={"/images/refrigeratorInRoom.svg"} />
                            <p className='ml-12'>Refrigerator in room</p>
                        </div> 
                        <div className='d-flex align-items-center mt-12'>
                            <img src={"/images/canteen.svg"} />
                            <p className='ml-12'>Canteen/Cafetaria</p>
                        </div> 
                        <div className='d-flex align-items-center mt-12'>
                            <img src={"/images/ambulancePickup.svg"} />
                            <p className='ml-12'>Ambulance for pickup/dropoff</p>
                        </div> 
                        <Link to='' className='anchor-link'> +2 more </Link>
                   </Col>
                </Row>
                <Tabs
                    defaultActiveKey="Ward-&-Beds"
                    id="justify-tab-example"
                    className="mb-3 qur-tabs mt-40"
                    justify
                    >
                    <Tab eventKey="Ward-&-Beds" title={<span> <BedIcon className="mr-8"/> Ward & Beds (147) </span>}>
                      
                    </Tab>
                    <Tab eventKey="Departments" title={<span> <DashboardOutlinedIcon className="mr-8"/> Departments (42) </span>}>
                        
                    </Tab>
                    <Tab eventKey="Procedures" title={<span> <DescriptionOutlinedIcon className="mr-8"/> Procedures (24) </span>}>
                       
                    </Tab>
                    <Tab eventKey="Doctors" title={<span> <MedicalServicesOutlinedIcon className="mr-8"/> Doctors (52) </span>}>
                        
                    </Tab>
                    <Tab eventKey="Insurance" title={<span> <CreditCardOutlinedIcon className="mr-8"/> Insurance (12) </span>}>
                       
                    </Tab>
                </Tabs>
            </div>
        </div>
    </div>
  );
}

export default Hospitalfullpage;
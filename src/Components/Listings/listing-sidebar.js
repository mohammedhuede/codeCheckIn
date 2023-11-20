import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Hospitallisting from './Hospital-listing';
import Doctorlisting from './Doctor-listing';
import { Link } from 'react-router-dom';
import Listingheader from './listing-header';
import Referrallisting from './Referrallisting';

function Listingsidebar() {
    return (

        <div>
            <Listingheader></Listingheader>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="listing-sidebar">
                    <div className='listing-logo'>
                        <Link to=""><img src={"/images/qurfylogo.svg"} /></Link>
                    </div>
                    <Nav variant="pills" className="flex-column side-nav">
                        <Nav.Item>
                            <Nav.Link eventKey="first"><img src={"/images/navdash.svg"} className="pr-8" />Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second"><img src={"/images/navrefferal.svg"} className="pr-8" />Referrals</Nav.Link>
                        </Nav.Item>
                        <div className='my-3'>
                            <hr
                                style={{
                                    background: '#E4E7EC',
                                    color: '#E4E7EC',
                                    height: '1px',
                                    width: '100%',
                                    opacity: '1',
                                    margin: '0px',
                                }}
                            />
                        </div>
                        <Nav.Item>
                            <Nav.Link eventKey="third"><img src={"/images/navhospital.svg"} className="pr-8" />Hospitals</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth"><img src={"/images/navdoctor.svg"} className="pr-8" />Doctors</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link eventKey="fifth"><img src={"/images/navadmin.svg"} className="pr-8" />Admins</Nav.Link>
                        </Nav.Item> */}
                    </Nav>
                </div>
                <div className='listingright'>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Hospitallisting></Hospitallisting>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Referrallisting></Referrallisting>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <Hospitallisting></Hospitallisting>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                            <Doctorlisting></Doctorlisting>
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="fifth">
                            <Adminlisting></Adminlisting>
                        </Tab.Pane> */}
                    </Tab.Content>
                </div>
            </Tab.Container>
        </div>
    );
}

export default Listingsidebar;
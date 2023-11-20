import Nav from 'react-bootstrap/Nav';
import { Link, useLocation, } from 'react-router-dom';
import Listingheader from '../Listings/listing-header';
import Badge from 'react-bootstrap/Badge';
import { useEffect } from 'react';

function Sidebar() {
    const location = useLocation()

    const getActiveClass = (path) => {
        return location.pathname.includes(path) ? 'sidemenu-active' : ''
    }

    return (
        <div>
            <Listingheader></Listingheader>
            <div className='side-nav d-flex flex-column justify-content-between'>
                <div>
                    <div className='listing-logo'>
                        <Link to="/dashboard"><img src={"/images/qurfylogo.svg"} alt="logo"/></Link>
                    </div>
                    <Nav defaultActiveKey="" className="flex-column">
                        <Link to="/dashboard" className={getActiveClass('dashboard')} activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                            background: "red"
                        }}><img src={"/images/navdash.svg"} className="pr-8" /> Dashboard</Link>
                        <Link to="/refferal" className={`d-flex justify-content-between  ${getActiveClass('refferal')}`}><div><img src={"/images/navrefferal.svg"} className="pr-8" /> Referrals </div><Badge className='badge-danger-primary'>3</Badge> </Link>
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
                        <div>
                            
                        </div>
                        <Link className={getActiveClass('hospitallisting')} to="/hospitallisting"><img src={"/images/navhospital.svg"} className="pr-8" /> Hospitals</Link>
                        <Link className={getActiveClass('doctorlisting')} to="/doctorlisting"><img src={"/images/navdoctor.svg"} className="pr-8" /> Doctors</Link>
                        {/* <Link to="/adminlisting"><img src={"/images/navadmin.svg"} className="pr-8" /> Admin</Link> */}
                    </Nav>
                </div>
                <Link to='#' className='mb-0 p-0'>
                    <span className='ex-light badge bg-light contact-support'><img src={"/images/support.svg"} /> <h5 className='fs-14 ml-12 text-dark'> Contact support</h5></span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
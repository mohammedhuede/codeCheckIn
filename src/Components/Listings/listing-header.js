import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import { Auth } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { removeItemsFromLocalStorage } from '../helper/helper';
import { Loader } from '../Loader';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Sidebar from './Sidebar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

function Listingheader() {
  const location = useLocation()

  const getActiveClass = (path) => {
    return location.pathname.includes(path) ? 'sidemenu-active' : ''
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const authContext = useContext(AuthContext)
  const onSignOut = authContext?.onSignOut
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setFullName(localStorage.getItem('fullName'))
  }, [])

  const navigate = useNavigate()

  const signOut = async () => {
    try {
      setLoading(true)
      await Auth.signOut()
      onSignOut()
      setLoading(false)
      navigate('/signin')
      removeItemsFromLocalStorage()
    } catch (error) {
      setLoading(false)
      console.log('error signing out')
    }
  }
  return (

    <div>
      <div className='listing-header'>
        <div className='desktop-menu d-flex justify-content-end'>
          {/* <Link to="" className='d-flex justify-content-end'><img src={"/images/header-notification.svg"} /></Link> */}
          <div className='header-dropdown list ml-16'>
            <Dropdown className='qur-dropdown listing-header-dropdown'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {fullName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={signOut}><LogoutIcon className='logout-icon'></LogoutIcon> Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>


        <div className='mob-listing-header flex-between-center'>
          <Button className='btn-no-brdr' onClick={handleShow}>
            <img src='/images/menu-icon-phone.svg' />
          </Button>
          <Link to=''>
            <img src='/images/mob-qurfy-logo.svg' />
          </Link>
          <img src='/images/profile-icon.svg' />
        </div>
      </div>

      <Offcanvas className="mob-menu" show={show} onHide={handleClose}>
        <Offcanvas.Header className='justify-content-end' closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
            <Link className={getActiveClass('hospitallisting')} to="/hospitallisting"><img src={"/images/navhospital.svg"} className="pr-8" /> Hospitals</Link>
            <Link className={getActiveClass('doctorlisting')} to="/doctorlisting"><img src={"/images/navdoctor.svg"} className="pr-8" /> Doctors</Link>
            {/* <Link to="/adminlisting"><img src={"/images/navadmin.svg"} className="pr-8" /> Admin</Link> */}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      {loading ? <Loader /> : false}
    </div>
  );
}

export default Listingheader;
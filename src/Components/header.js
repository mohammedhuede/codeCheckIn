import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import { Auth } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { removeItemsFromLocalStorage } from './helper/helper';
import { Loader } from './Loader';

function Header(props) {
    const authContext = useContext(AuthContext)
    const onSignOut = authContext?.onSignOut
    const loggedIn = authContext?.loggedIn
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const backToDashboard = () => {
        navigate(`/hospitallisting`)
    }

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
        <>
            <div className='header'>
                <img src={"/images/qurfylogo.svg"} alt="qurfy-logo" onClick={props.fromDashboard || loggedIn ? backToDashboard : null} />
                <div className='d-flex'>
                    {props.fromDashboard ? <Button className="btn btn-secondary btn-sm mr-16" onClick={backToDashboard}>Back to dashboard</Button> : null}
                    <div className='header-dropdown'>
                        <Dropdown className='qur-dropdown'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {localStorage.getItem('fullName')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={signOut}><LogoutIcon className='logout-icon'></LogoutIcon> Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {loading ? <Loader /> : false}
        </>
    );
}

export default Header;
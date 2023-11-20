import React, { useState, useEffect } from 'react';
import { Modal, Dropdown, Row, InputGroup, Button, Container } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Listingheader from "./listing-header";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../Redux/Actions'
import AddOrUpdateAdmin from '../modals/AddOrUpdateAdmin';
import { adminDetailsSample } from '../../constants/constants';
import Sidebar from './Sidebar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import moment from 'moment'

function Adminlisting(props) {
    let partnerId = localStorage.getItem('partnerId')

    const createadmin = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [fullscreenedit, setFullscreenedit] = useState(true);
    const [showeditprofile, setEditprofile] = useState(false);
    const [submitGetAllAdminReq, setSubmitGetAllAdminReq] = useState(false);
    const [adminsList, setAdminsList] = useState([]);
    const [adminToEdit, setAdminToEdit] = useState({});
    const [openCreateAdminModal, setOpenCreateAdminModal] = useState(false);
    const [hospitalIdsArr, setHospitalIdsArr] = useState(false);
    const [submitAllHospGetReq, setSubmitAllHospGetReq] = useState(false);

    const { getAllAdminsSuccess, allAdminsData, getAllHospitalsBasicDetailsSuccess, allHospitalBasicDetailsData } = props.hospitalDetails


    useEffect(() => {
        getAllAdminsRequest()
        getAllHospitalsBasicDetailsRequest()
    }, [])

    useEffect(() => {
        if (getAllAdminsSuccess && submitGetAllAdminReq) {
            setAdminsList(allAdminsData)
        }
    }, [getAllAdminsSuccess])

    useEffect(() => {
        if (submitAllHospGetReq && getAllHospitalsBasicDetailsSuccess) {
            setHospitalIdsArr(allHospitalBasicDetailsData.map(hosp => hosp.id))
            setSubmitAllHospGetReq(false)
        }
    }, [getAllHospitalsBasicDetailsSuccess])

    function handleShowadmin(breakpoint) {
        setFullscreen(breakpoint);
        setOpenCreateAdminModal(true)
        setEditprofile(true);
    }

    const editprofile = [true,];

    function handleShoweditprofile(breakpoint, admin) {
        setFullscreen(breakpoint);
        setEditprofile(true);
        setAdminToEdit(admin)
        setOpenCreateAdminModal(false)
    }

    const getAllHospitalsBasicDetailsRequest = () => {
        setSubmitAllHospGetReq(true)
        let params = {
            partnerId
        }
        props.getAllHospitalsBasicDetailsRequest(params)
    }

    const getAllAdminsRequest = () => {
        setSubmitGetAllAdminReq(true)
        let params = {
            partnerId
        }
        props.getAllAdminsRequest(params)
    }

    return (
        <>
            <Listingheader></Listingheader>
            <Sidebar></Sidebar>
            <div className='listing-content'>
                <div className="flex-between-center">
                    <h4>Admins</h4>
                    {createadmin.map((v, idx) => (
                        <Button key={idx} className="btn-primary" onClick={() => handleShowadmin(v)}>
                            Create New Admin
                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                        </Button>
                    ))}
                </div>
                {Array.isArray(adminsList) && adminsList.length ?
                    adminsList.map((admin, i) => {
                        return (
                            <div className="white-shadow-card mt-24 active-card" key={i}>
                                <div className="p-4 flex-between-center">
                                    <div className="d-flex align-items-start">
                                        <img src={"/images/listing-admin.svg"} />
                                        <div className="ml-16">
                                            <h4 className="fs-14 text-bold">{admin.adminName}</h4>
                                            <h4 className="fs-14 mt-4">{admin.designation}</h4>
                                        </div>`
                                    </div>
                                    <div>
                                        {editprofile.map((v, idx) => (
                                            <Button key={idx} className="btn-no-brdr fs-14 text-cap" onClick={() => handleShoweditprofile(v, admin)}>
                                                <img src={"/images/edit-profile.svg"} />
                                                {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                            </Button>
                                        ))}

                                        {['start'].map((direction) => (
                                            <DropdownButton
                                                as={ButtonGroup}
                                                key={direction}
                                                id={`dropdown-button-drop-${direction}`}
                                                className={`dropdown-button-drop-${direction}`}
                                                drop={direction}
                                                variant="secondary"
                                                autoClose="outside"
                                                title={
                                                    <div className="pull-left">
                                                        <img className="thumbnail-image" alt='thumb'
                                                            src={"/images/dropdown-toggle.svg"}
                                                        />
                                                    </div>
                                                }
                                            >
                                                
                                                <Dropdown.Item eventKey="2">
                                                    Delete
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="3">
                                                    Edit
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </div>
                                </div>
                                <div className='my-0'>
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
                                <div className="px-4 py-3 d-flex">
                                    <div>
                                        <p className="fs-10 text-grey"> Created On </p>
                                        <p className="fs-14">{moment(admin.createdOn).format("DD MMM YYYY")}</p>
                                    </div>
                                    <div className="ml-80">
                                        <p className="fs-10 text-grey"> Email Address </p>
                                        <p className="fs-14">{admin.email}</p>
                                    </div>
                                    <div className="ml-80">
                                        <p className="fs-10 text-grey"> Contact Number </p>
                                        <p className="fs-14">{admin.phoneNumber}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    : null}
            </div>
            {showeditprofile && <AddOrUpdateAdmin
                showeditprofile={showeditprofile}
                fullscreenedit={fullscreenedit}
                setEditprofile={setEditprofile}
                adminToEdit={openCreateAdminModal ? adminDetailsSample : adminToEdit}
                setAdminToEdit={setAdminToEdit}
                partnerId={partnerId}
                getAllAdminsRequest={getAllAdminsRequest}
                openCreateAdminModal={openCreateAdminModal}
                setOpenCreateAdminModal={setOpenCreateAdminModal}
                hospitalIdsArr={hospitalIdsArr}

            />}
        </>
    );
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllAdminsRequest: Actions.getAllAdminsRequest,
        getAllHospitalsBasicDetailsRequest: Actions.getAllHospitalsBasicDetailsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Adminlisting);

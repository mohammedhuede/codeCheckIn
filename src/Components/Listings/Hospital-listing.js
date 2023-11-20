import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import { useNavigate, useSearchParams } from "react-router-dom";
import Listingheader from "./listing-header";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../Redux/Actions'
import { DeleteConfirmationModal } from '../modals/DeleteConfirmationModal';
import EightStep from "../Onboarding/Onboardsteps/EightStep";
import Sidebar from "./Sidebar";

function Hospitallisting(props) {

    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')

    const [submitGetReq, setSubmitGetReq] = useState(false)
    const [hospitalsList, setHospitalsList] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [deleteHospitalReq, setDeleteHospitalReq] = useState(false);
    const [hospitalIdToDelete, setHospitalIdToDelete] = useState('');
    const [showReviewHospital, setShowReviewHospital] = useState(hospitalIdFromUrl?.length ? true : false);

    useEffect(() => {
        getAllHospitalsBasicDetailsRequest()
    }, [])

    const { getAllHospitalsBasicDetailsSuccess, allHospitalBasicDetailsData, deleteHospitalSuccess } = props.hospitalDetails

    useEffect(() => {
        if (submitGetReq && getAllHospitalsBasicDetailsSuccess) {
            setHospitalsList(allHospitalBasicDetailsData)
            setSubmitGetReq(false)
        }
    }, [getAllHospitalsBasicDetailsSuccess])

    useEffect(() => {
        if (deleteHospitalReq && deleteHospitalSuccess) {
            setModalShow(false)
            setDeleteHospitalReq(false)
            setHospitalIdToDelete('')
            getAllHospitalsBasicDetailsRequest()
        }
    }, [deleteHospitalSuccess])

    useEffect(() => {
    })

    window.addEventListener('popstate', function (event) {
        if (event.state.idx === 0) {
            setShowReviewHospital(false)
        } else {
            setShowReviewHospital(true)
        }

    })

    const getAllHospitalsBasicDetailsRequest = () => {
        setSubmitGetReq(true)
        const params = {
            partnerId
        }
        props.getAllHospitalsBasicDetailsRequest(params)
    }

    const handleConfirmDelete = () => {
        setDeleteHospitalReq(true)
        let params = {
            partnerId,
            hospitalId: hospitalIdToDelete,
        }
        props.deleteHospitalRequest(params)
    }

    const handleAddNewHospital = () => {
        navigate(`/mainside?step=1&fd=1`)
    }

    const redirectToReviewHospital = (id) => {
        setSearchParams({ hid: id, review: 1 })
        setShowReviewHospital(true)
    }

    const getBedsCount = (hospital, bedsType) => {
        let arr1 = hospital?.availableRoomCounts
        let arr2 = arr1?.length && arr1.map(el => el[bedsType])
        let arr3 = arr2?.length && arr2.filter(el => typeof el === 'number')
        let count = arr3?.length && arr3.reduce((a, b) => a + b)
        return typeof count === 'number' ? count : 0
    }

    const getReviewStatus = (status) => {
        switch (status) {
            case "Submitted":
                return "Under Review"
                break;
            case "NotStarted":
                return "Incomplete"
                break;
            case "Completed":
                return "Live"
                break;
        
            default: return "Not Submitted"
                break;
        }
    }

    const redirectToOnboarding = (hospitalId) => {
        navigate(`/mainside?hid=${hospitalId}&step=1`)
    }
    return (
        <div className=''>
            <Listingheader></Listingheader>
            <Sidebar></Sidebar>
            {!showReviewHospital ?
                <div className='listing-content'>
                    <div className="flex-between-center">
                        <h4>My Hospitals</h4>
                        <Button className="btn btn-primary btn-sm" onClick={handleAddNewHospital}>Add New Hospital</Button>
                    </div>

                    {/*header for edit hospital screen = oboarding */}

                    {/* <div className="d-flex justify-content-between align-items-center">
                        <h4>Edit Hospital</h4>
                        <div>
                            <Button className="btn btn-secondary btn-sm mr-16">Back to dashboard</Button>
                            <Button className="btn btn-primary btn-sm">Save Changes</Button>
                        </div>
                    </div> */}

                    {/*header for edit hospital screen = oboarding */}

                    {Array.isArray(hospitalsList) && hospitalsList?.length ?
                        hospitalsList.map((hospital, i) => {
                            return (
                                <div className="white-shadow-card mt-24 active-card" key={i}>
                                    {/* <div className="deactive-card">
                                        <div className="p-4 d-flex justify-content-end">
                                            <Button className="btn btn-primary btn-sm">Activate Listing</Button>
                                        </div>
                                    </div> */}
                                    <div className="p-4 flex-align-start justify-content-between">
                                        <div className="flex-align-start cursor-pointer" onClick={() => hospital?.reviewStatus === "Submitted" ? redirectToReviewHospital(hospital.id) : redirectToOnboarding(hospital.id)}>
                                            <img className="hospital-card-img" src={hospital?.hospitalThumbnailUrl ? hospital?.hospitalThumbnailUrl : "/images/default-hospital.svg"} alt='hospital' />
                                            <div className="ml-24">
                                                <div className="flex-align-center">
                                                    <h4 className="text-bold" >{hospital.name}</h4>
                                                    <Badge bg="danger" className="ml-16">{ getReviewStatus(hospital?.reviewStatus)}</Badge>
                                                </div>
                                                <p className="fs-14 mt-16"><span><img src={"/images/listing-location.svg"} className="mr-12" alt='address' /></span>{hospital.addressLine}</p>
                                                <p className="fs-14 mt-8"><span><img src={"/images/listing-call.svg"} className="mr-12" alt='call' />{hospital.email}</span><span className="ml-24">{hospital.phoneNumber}</span></p>
                                            </div>
                                        </div>
                                        {/* <div>
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
                                                    <Dropdown.Item eventKey="2" onClick={() => handleDeleteHospital(hospital.id)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            ))}
                                        </div> */}
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
                                    <div className="px-4 py-3 d-flex justify-content-between">
                                        <div>
                                            <Badge bg="light" className="mr-16 ex-light">Total Beds: <span className="ml-40">{hospital && (getBedsCount(hospital, 'acBedCount') + getBedsCount(hospital, 'nonACBedCount'))}</span></Badge>
                                        </div>
                                        <div>
                                            <Badge bg="badge" className="ml-16 bg-danger simple-badge">New Referrals: <span className="ml-40">12</span></Badge>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                        : null}

                    {/* When there are no hospital*/}

                    {/* <div className='empty-block d-flex justify-content-center align-items-center'>
                        <div className='text-center'>
                            <img src={"/images/no-hospital.svg"} alt='no-refferal' />
                            <h4 className='mt-16'>No Hospital Found</h4>
                            <p className='mt-4'>click to “Add new hospital” to add <br />hospital</p>
                            <Button varient="primary" className='mt-24 btn-sm'>Add New Hospital</Button>
                        </div>
                    </div> */}

                    {/* When there are no hospital */}
                </div>
                :
                <EightStep toReview={true} setShowReviewHospital={setShowReviewHospital} />
            }
            <DeleteConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                handleconfirmdelete={handleConfirmDelete}
                label={'Are you sure you want to delete the hospital'}
                heading='Delete Hospital'
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllHospitalsBasicDetailsRequest: Actions.getAllHospitalsBasicDetailsRequest,
        deleteHospitalRequest: Actions.deleteHospitalRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Hospitallisting);


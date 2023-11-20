import React from 'react';
import { Button, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { usePrevious } from '../../customHooks/usePrevious';
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateEmail } from '../../helper/helper';
import { adminDetailsSample } from '../../../constants/constants';
import { DeleteConfirmationModal } from '../../modals/DeleteConfirmationModal';

const Ninestep = (props) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)

    const [adminDetails, setAdminDetails] = useState(adminDetailsSample)
    const [selectRoleVal, setSelectRoleVal] = useState('')
    const [submitPostReq, setSubmitPostReq] = useState(false)
    const [hospitalIdsArr, setHospitalIdsArr] = useState([])
    const [listOfAllAdmins, setListOfAllAdmins] = useState([])
    const [errors, setErrors] = useState({})
    const [newDate, setNewDate] = useState(new Date());
    const [modalShow, setModalShow] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [adminIdToEdit, setAdminIdToEdit] = useState('');
    const [updateAdminReq, setUpdateAdminReq] = useState(false);
    const [adminIdToDelete, setAdminIdToDelete] = useState('');
    const [deleteAdminReq, setDeleteAdminReq] = useState(false);

    useEffect(() => {
        getAllAdminsRequest()
    }, [])

    const { getAllHospitalsBasicDetailsSuccess, allHospitalBasicDetailsData, postAdminDetailsSuccess, getAllAdminsSuccess, allAdminsData, getAdminDetailsFromIdSuccess,
        deleteAdminSuccess, updateAdminDetailsSuccess } = props.hospitalDetails

    const prevStatus1 = usePrevious(getAllHospitalsBasicDetailsSuccess)
    useEffect(() => {
        if (!prevStatus1?.getAllHospitalsBasicDetailsSuccess && getAllHospitalsBasicDetailsSuccess) {
            setHospitalIdsArr(allHospitalBasicDetailsData.map(hosp => hosp.id))
        }
    }, [getAllHospitalsBasicDetailsSuccess])


    useEffect(() => {
        if (submitPostReq) {
            if (postAdminDetailsSuccess) {
                getAllAdminsRequest()
                setAdminDetails(adminDetailsSample)
                setSelectRoleVal('')
                setSubmitPostReq(false)
            }
        }
    }, [postAdminDetailsSuccess])

    useEffect(() => {
        if (updateAdminReq) {
            if (updateAdminDetailsSuccess) {
                getAllAdminsRequest()
                setAdminDetails(adminDetailsSample)
                setSelectRoleVal('')
                setUpdateAdminReq(false)
                setIsEditable(false)
            }
        }
    }, [updateAdminDetailsSuccess])

    const prevStatus2 = usePrevious(getAllAdminsSuccess)
    useEffect(() => {
        if (!prevStatus2?.getAllAdminsSuccess && getAllAdminsSuccess) {
            setListOfAllAdmins(allAdminsData)
        }
    }, [getAllAdminsSuccess])

    useEffect(() => {
        if (updateAdminReq) {
            if (getAdminDetailsFromIdSuccess) {
                const { adminDetails, role } = props.hospitalDetails
                setAdminDetails(adminDetails)
                setSelectRoleVal({ label: adminDetails.role, value: adminDetails.role })
            }
        }
    }, [getAdminDetailsFromIdSuccess])

    useEffect(() => {
        if (deleteAdminReq && deleteAdminSuccess) {
            setDeleteAdminReq(false)
            setModalShow(false)
            setAdminIdToDelete(false)
            getAllAdminsRequest()
            setAdminDetails(adminDetailsSample)
            setSelectRoleVal('')
        }
    }, [deleteAdminSuccess])

    const getAllAdminsRequest = () => {
        let params = {
            partnerId
        }
        props.getAllAdminsRequest(params)
    }

    const handleChange = (e) => {
        let details = adminDetails
        details = {
            ...details,
            [e.target.name]: e.target.value
        }
        setAdminDetails(details)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (isValid()) {
            let reqBody = {
                body: { ...adminDetails, hospitalIds: [hospitalIdFromUrl] },
                partnerId
            }
            if (isEditable) {
                reqBody = {
                    ...reqBody,
                    adminId: adminIdToEdit
                }
                props.updateAdminDetailsRequest(reqBody)
            } else {
                props.postAdminDetailsRequest(reqBody)
            }
        }
    }

    const isValid = () => {
        let formIsValid = true
        let error = {}

        if (adminDetails.adminName.trim() === "" || adminDetails.adminName.trim() === undefined || adminDetails.adminName.trim() === null) {
            error['adminName'] = "Admin's name is required"
            formIsValid = false
        }

        if (adminDetails.email.trim() === "" || adminDetails.email.trim() === undefined || adminDetails.email.trim() === null || validateEmail(adminDetails.email.trim()) === null) {
            error['email'] = "Email is required"
            formIsValid = false
        }

        if (adminDetails.phoneNumber.trim() === "" || adminDetails.phoneNumber.trim() === undefined || adminDetails.phoneNumber.trim() === null || adminDetails.phoneNumber.trim().length !== 10) {
            error['phoneNumber'] = "Contact number is required"
            formIsValid = false
        }

        setErrors(error)
        formIsValid ? setSubmitPostReq(true) : setSubmitPostReq(false)
        return formIsValid
    }

    const handleSaveContinue = () => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=8&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=9${fromDashboard? '&fd=1': ''}`)
        !hospitalToEdit && props.setStepFromChild('9')
    }

    const editAdmin = (admin) => {
        setIsEditable(true)
        setAdminIdToEdit(admin.id)
        setUpdateAdminReq(true)
        let params = {
            partnerId,
            adminId: admin.id
        }
        props.getAdminDetailsFromIdRequest(params)
    }

    const handleDeleteAdmin = (admin) => {
        setModalShow(true)
        setAdminIdToDelete(admin.id)
    }

    const handleConfirmDelete = () => {
        let params = {
            partnerId,
            adminId: adminIdToDelete
        }
        props.deleteAdminRequest(params)
        setDeleteAdminReq(true)
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard? '&fd=1': ''}`)
        props.setStepFromChild(step)
    }

    const goBackToHospitalDetails = () => {
        navigate(`/hospitallisting?hid=${hospitalIdFromUrl}&review=1`)
    }

    return (
        <div className="right-form">
            <div className="right-form-head">
                {hospitalToEdit ? (
                    <div className="flex-between-center">
                        <h4>Edit Hospital</h4>
                        <div>
                            <Button className="btn btn-secondary btn-sm mr-16" onClick={goBackToHospitalDetails}>Go Back</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleSaveContinue}>Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="subhead">Step 8 of 8</p>
                        <h2 className="form-main-title">Basic Details</h2>
                        <p className="subpara">Add basic details of hospital</p>
                    </>
                )}
            </div>
            <div className='px-5'>
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
            <div className="px-5 flex-between">
                <div className='pr-24 w-100'>
                    <div class="form-group mt-32">
                        <div class="form-upload form-ulpoad-thumbnail">
                            <div class="form-upload-group">
                                <img src={"/images/add_thumbnail.svg"} />
                                <div>
                                    <a href='#' class="upload-link">Add admin image</a>
                                    <input type='file' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-between mt-32'>
                        <div className='w-50'>
                            <Form.Label>Name  <span className="required"> *</span></Form.Label>
                            <Form.Group className="w-100" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter name" name="adminName" value={adminDetails.adminName} onChange={handleChange} />
                            </Form.Group>
                            <span className="error-label">{errors['adminName']}</span>
                        </div>
                    </div>
                    <div className='flex-between mt-32'>
                        <div className='w-50'>
                            <Form.Label>Email Address <span className="required"> *</span></Form.Label>
                            <Form.Group className="w-100" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter Email" name="email" value={adminDetails.email} onChange={handleChange} />
                            </Form.Group>
                            <span className="error-label">{errors['email']}</span>
                        </div>
                        <div className='ml-24 w-50'>
                            <Form.Label>Contact Number   <span className="required"> *</span></Form.Label>
                            <Form.Group className="w-100" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Phone" name="phoneNumber" value={adminDetails.phoneNumber} onChange={handleChange} />
                            </Form.Group>
                            <span className="error-label">{errors['phoneNumber']}</span>
                        </div>
                    </div>
                    <div className='mt-32'>
                        <Button className='btn btn-primary btn-sm' onClick={handleSubmit}>{isEditable ? 'Update' : 'Add Member'}</Button>
                    </div>
                </div>
                <div className='rightside-empty qur-scroll'>
                    <div className='p-4'>

                        {listOfAllAdmins.length > 0 && <h2 className='fs-18'>{listOfAllAdmins.length} Member Added</h2>}
                        {
                            Array.isArray(listOfAllAdmins) && listOfAllAdmins.length > 0 ?
                                listOfAllAdmins.map((admin, i) => {
                                    return <div className='white-card p-3 d-flex mt-16 added-card' key={i}>
                                        <img src={"/images/manager.png"} />
                                        <div className='flex-between align-items-end w-100'>
                                            <div className='ml-12'>
                                                <h3 className='fs-16'>{admin.adminName}</h3>
                                                <p className='fs-12 text-grey'>{admin.role} • {admin.designation}</p>
                                            </div>
                                            <div className='edit-block'>
                                                <Button className='btn-no-brdr mr-16' onClick={() => editAdmin(admin)}>
                                                    <img src={"/images/edit.svg"} />
                                                </Button>
                                                <Button className='btn-no-brdr' onClick={() => handleDeleteAdmin(admin)}>
                                                    <img src={"/images/delete-profile.svg"} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }) :

                                // when no member added
                                <div className='flex-between-center'>
                                    <div className='text-center'>
                                        <img src={"/images/emptyicon.svg"} />
                                        <h4 className='empty-title'>No Member Added </h4>
                                        <p className='empty-para'>Please fill the form to add<br></br> the Member</p>
                                    </div>
                                </div>
                            // when no member added
                        }
                    </div>
                </div>
            </div>
            {!hospitalToEdit && (<div className="stepfooter">
                <Button className='btn btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('7')}>Back</Button>
                <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSaveContinue}>{`Save & Continue`}</Button>
            </div>)}
            <DeleteConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                handleconfirmdelete={() => handleConfirmDelete()}
                label='Are you sure you want to delete this admin card'
                heading='Delete Admin'
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        postAdminDetailsRequest: Actions.postAdminDetailsRequest,
        getAllAdminsRequest: Actions.getAllAdminsRequest,
        getAdminDetailsFromIdRequest: Actions.getAdminDetailsFromIdRequest,
        updateAdminDetailsRequest: Actions.updateAdminDetailsRequest,
        deleteAdminRequest: Actions.deleteAdminRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Ninestep);
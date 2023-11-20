import { Button, Container, Row, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { rolesSample } from '../../constants/constants';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../Redux/Actions'
import { validateEmail } from '../helper/helper';

function AddOrUpdateAdmin(props) {
    const [adminDetails, setAdminDetails] = useState({})
    const [selectRoleVal, setSelectRoleVal] = useState('')
    const [newDate, setNewDate] = useState(new Date());
    const [updateAdminReq, setUpdateAdminReq] = useState(false);
    const [postAdminReq, setPostAdminReq] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setAdminDetails(props.adminToEdit)
        setSelectRoleVal(props.openCreateAdminModal ? '' : { label: props.adminToEdit.role, value: props.adminToEdit.role })
    }, [])

    const { updateAdminDetailsSuccess, postAdminDetailsSuccess } = props.hospitalDetails

    useEffect(() => {
        if (updateAdminReq) {
            if (updateAdminDetailsSuccess) {
                props.getAllAdminsRequest()
                setSelectRoleVal('')
                setUpdateAdminReq(false)
                props.setEditprofile(false)
                props.setAdminToEdit({})
                props.setOpenCreateAdminModal(false)
            }
        }
    }, [updateAdminDetailsSuccess])

    useEffect(() => {
        if (postAdminReq) {
            if (postAdminDetailsSuccess) {
                props.getAllAdminsRequest()
                setSelectRoleVal('')
                setPostAdminReq(false)
                props.setEditprofile(false)
                props.setAdminToEdit({})
                props.setOpenCreateAdminModal(false)
            }
        }
    }, [postAdminDetailsSuccess])

    const handleChange = (e) => {
        let details = adminDetails
        details = {
            ...details,
            [e.target.name]: e.target.value
        }
        setAdminDetails(details)
    }

    const handleSelect = (val, key) => {
        let details = adminDetails
        details = {
            ...details,
            [key]: val.value
        }
        setAdminDetails(details)
        setSelectRoleVal(val)
    }

    const handleDateChange = newDate => {
        setNewDate(newDate);
        let details = adminDetails
        details = {
            ...details,
            createdOn: newDate
        }
        setAdminDetails(details)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (isValid()) {
            let reqBody = {
                body: { ...adminDetails },
                partnerId: props.partnerId,
            }
            if(!props.openCreateAdminModal){
                setUpdateAdminReq(true)
                reqBody = {
                    ...reqBody,
                    adminId: props.adminToEdit.id
                }
                props.updateAdminDetailsRequest(reqBody)
            } else {
                reqBody = {
                    ...reqBody,
                    body: {...adminDetails, hospitalIds: props.hospitalIdsArr},
                    adminId: props.adminToEdit.id
                }
                setPostAdminReq(true)
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

        if (adminDetails.designation.trim() === "" || adminDetails.designation.trim() === undefined || adminDetails.designation.trim() === null) {
            error['designation'] = "Designation is required"
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

        if (adminDetails.role.trim() === "" || adminDetails.role.trim() === undefined || adminDetails.role.trim() === null) {
            error['role'] = "Select a role for the admin"
            formIsValid = false
        }

        setErrors(error)
        return formIsValid
    }

    const onHide = () => {
        props.setEditprofile(false)
        props.setOpenCreateAdminModal(false)
    }

    return (
        <Modal show={props.showeditprofile} fullscreen={props.fullscreenedit} className="large-modal" onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.openCreateAdminModal ? 'Create New Admin': 'Edit Profile'}</Modal.Title>
                <div>
                    <Button varient="secondary" className='btn-secondary mr-16' onClick={onHide}>Cancel</Button>
                    <Button varient="secondary" onClick={handleSubmit}>{props.openCreateAdminModal ? 'Create Admin' :'Save Changes'}</Button>
                </div>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div>
                        <div className='flex-center mt-80'>
                            <div className='w-75'>
                                <Row>
                                    <Col xs={9}>
                                        <div className='form-group'>
                                            <div className='form-upload form-ulpoad-thumbnail'>
                                                <div className='form-upload-group'>
                                                    <img src={"/images/add_thumbnail.svg"} />
                                                    <div>
                                                        <a href='#' className='upload-link'>Add Thumbnail</a>
                                                        <input type='file' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='flex-center mt-32'>
                            <div className='w-75'>
                                <Row>
                                    <Col xs={6}>
                                        <div className=''>
                                            <p className='form-label'>Name <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="formBasicEmail">
                                                <Form.Control type="text" placeholder="Enter name" name="adminName" value={adminDetails.adminName} onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className=''>
                                            <p className='form-label'>Created On<span className='required'>*</span></p>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>                                            
                                                <DatePicker
                                                    label="Basic example"
                                                    value={adminDetails.createdOn}
                                                    onChange={handleDateChange}
                                                    name="createdOn"
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Designation <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="formBasicEmail">
                                                <Form.Control type="text" placeholder="Select designation" name="designation" value={adminDetails.designation} onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Select Right <span className='required'>*</span></p>
                                            <Select
                                                {...props}
                                                options={rolesSample}
                                                value={selectRoleVal}
                                                hasValue={true}
                                                placeholder='Select Role'
                                                onChange={(val) => handleSelect(val, 'role')}
                                                closeMenuOnSelect={true}
                                                isMulti={false}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Email Address <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="formBasicEmail">
                                                <Form.Control type="email" placeholder="Enter Email" name="email" value={adminDetails.email} onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="mt-32">
                                        <div className=''>
                                            <p className='form-label'>Contact Number <span className='required'>*</span></p>
                                            <Form.Group className="" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="Enter Phone" name="phoneNumber" value={adminDetails.phoneNumber} onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        updateAdminDetailsRequest: Actions.updateAdminDetailsRequest,
        postAdminDetailsRequest: Actions.postAdminDetailsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(AddOrUpdateAdmin);
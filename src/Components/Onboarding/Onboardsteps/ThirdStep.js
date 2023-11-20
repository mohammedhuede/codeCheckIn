import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Row, Badge, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate, useSearchParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap-floating-label";
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DeleteProcedureCard } from '../../modals/DeleteProcedureCard';
import { inclusionsOptions } from '../../../constants/constants'
import AddProcedure from './onboard-modals/procedureForm';



const Thirdstep = (props) => {
    const [modalProcedureShow, setModalProcedureShow] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    let fromDashboard = searchParams.get('fd')
    const editHospital = searchParams.get('editHospital')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)
    const navigate = useNavigate()

    const [departmentsForAutoComplete, setDepartmentsForAutoComplete] = useState([])
    const [department, setDepartment] = useState(null)
    const [proceduresList, setProceduresList] = useState([])
    const [procedure, setProcedure] = useState(null)
    // const [description, setDescription] = useState('')
    const [consultationCharge, setConsultationCharge] = useState(0)
    const [inclusions, setInclusions] = useState([])
    const [errors, setErrors] = useState({})
    const [procedureId, setProcedureId] = useState('')
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [getAllProceduresReq, setGetAllProceduresReq] = useState(false);
    const [allProceduresList, setAllProceduresList] = useState([]);
    const [procedureIdToDelete, setProcedureIdToDelete] = useState('');
    const [procedureNameToDelete, setProcedureNameToDelete] = useState('');
    const [deleteReq, setDeleteReq] = useState(false);
    const [postReq, setPostReq] = useState(false);
    const [updateReq, setUpdateReq] = useState(false);
    const [getProcedureDetailFromProcedureIdReq, setGetProcedureDetailFromProcedureIdReq] = React.useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [procedureAdded, setProcedureAdded] = useState('');
    const [procedureAddedSuccess, setProcedureAddedSuccess] = useState(false);
    const [getDeptReq, setGetDeptReq] = useState(false);
    const [getProcFromDeptReq, setGetProcFromDeptReq] = useState(false);
    const [getProcDetailFromProcIdReq, setGetProcDetailFromProcIdReq] = useState(false);

    useEffect(() => {
        getRequest()
        getDepartmentsRequest()
    }, [])

    let { getHospitalDepartmentsSuccess, proceduresFromDepartment, getProceduresFromDepartmentSuccess,
        postHospitalProceduresSuccess, getProcedureDetailFromProcedureIdSuccess, procedureDetailFromProcedureId, getHospitalProceduresSuccess,
        hospitalProceduresData, deleteProcedureSuccess, updateHospitalProceduresSuccess } = props?.hospitalDetails

    useEffect(() => {
        if (getDeptReq) {
            if (getHospitalDepartmentsSuccess) {
                let arr = props.hospitalDetails.hospitalDepartmentsData.filter(obj => obj.medical === true || obj.surgery === true)
                let departmentsArrWithLabel = arr.map(obj => {
                    return { ...obj, label: obj.name, value: obj.name }
                })
                setDepartmentsForAutoComplete(departmentsArrWithLabel)
            } else {
                setDepartmentsForAutoComplete([])
            }
            setGetDeptReq(false)
        }
    }, [getHospitalDepartmentsSuccess])

    useEffect(() => {
        if (getProcFromDeptReq) {
            if (getProceduresFromDepartmentSuccess) {
                let arr = proceduresFromDepartment.map(procedure => ({ ...procedure, label: procedure.procedure, value: procedure.procedure }))
                setProceduresList(arr)
                setGetProcFromDeptReq(false)
            } else {
                setProceduresList([])
            }
        }
    }, [getProceduresFromDepartmentSuccess])

    useEffect(() => {
        if (postReq) {
            if (postHospitalProceduresSuccess) {
                getRequest()
                resetInputFields()
                setPostReq(false)
                setProcedureAdded(hospitalProceduresData.procedure)
                setProcedureAddedSuccess(true)
                setModalProcedureShow(false)
            }
        }
    }, [postHospitalProceduresSuccess])

    useEffect(() => {
        if (procedureAddedSuccess) {
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
                setProcedureAdded('')
            }, 2000);
            setProcedureAddedSuccess(false)
        }
    }, [procedureAdded])

    useEffect(() => {
        if (updateReq) {
            if (updateHospitalProceduresSuccess) {
                getRequest()
                resetInputFields()
                setUpdateReq(false)
                setModalProcedureShow(false)
            }
        }
    }, [updateHospitalProceduresSuccess])

    useEffect(() => {
        if (getProcDetailFromProcIdReq) {
            if (getProcedureDetailFromProcedureIdSuccess) {
                // const { consultationCharge, description, inclusions, department, procedure } = procedureDetailFromProcedureId
                const { consultationCharge, inclusions, department, procedure } = procedureDetailFromProcedureId

                if (consultationCharge !== "" && consultationCharge !== undefined
                    && consultationCharge !== null) {
                    setConsultationCharge(consultationCharge)
                } else {
                    setConsultationCharge(0)
                }

                // if (description !== "" && description !== undefined
                //     && description !== null) {
                //     setDescription(description)
                // } else {
                //     setDescription('')
                // }

                if (inclusions !== "" && inclusions !== undefined
                    && inclusions !== null) {
                    setInclusions(inclusions)
                } else {
                    setInclusions('')
                }
                if (getProcedureDetailFromProcedureIdReq) {
                    setDepartment(department)
                    setProcedure(procedure)
                    setGetProcedureDetailFromProcedureIdReq(false)
                }
                setIsEditable(true)
            } else {
                setConsultationCharge(0)
                setInclusions('')
                setGetProcedureDetailFromProcedureIdReq(false)
                setProcedure(null)
                setDepartment(null)
                // setDescription(null)
            }
            setGetProcDetailFromProcIdReq(false)
        }
    }, [getProcedureDetailFromProcedureIdSuccess])

    useEffect(() => {
        getProceduresFromDepartmentRequest()
    }, [department])

    useEffect(() => {
        if (procedureId !== undefined && procedureId !== '' && hospitalIdFromUrl !== undefined) {
            getProcedureDetailFromProcedureIdRequest()
        }
    }, [procedureId])

    useEffect(() => {
        if (getAllProceduresReq) {
            if (getHospitalProceduresSuccess) {
                setAllProceduresList(hospitalProceduresData.filter(el => el.id))
            }
        }
    }, [getHospitalProceduresSuccess])

    useEffect(() => {
        if (deleteReq) {
            if (deleteProcedureSuccess) {
                setModalShow(false)
                setProcedureIdToDelete('')
                setProcedureNameToDelete('')
                resetInputFields()
                getRequest()
            }
        }
    }, [deleteProcedureSuccess])

    const getRequest = () => {
        setGetAllProceduresReq(true)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.getRequest(params)
    }

    const getDepartmentsRequest = () => {
        setGetDeptReq(true)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.getDepartmentsRequest(params)
    }

    const getProcedureDetailFromProcedureIdRequest = () => {
        setGetProcDetailFromProcIdReq(true)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl,
            procedureId
        }
        props.getProcedureDetailFromProcedureIdRequest(params)
    }

    const getProceduresFromDepartmentRequest = () => {
        setGetProcFromDeptReq(true)
        if (department !== null && department !== undefined && department !== "") {
            const params = {
                partnerId,
                hospitalId: hospitalIdFromUrl,
                departmentName: department,
            }
            props.getProceduresFromDepartmentRequest(params)
        }
    }

    const handleSearchDepartment = (e, value) => {
        setProcedure(null)
        if (value?.value !== null && value?.value !== undefined) {
            setDepartment(value.value)
        }
    }
    const handleSearchProcedure = (e, value) => {
        if (value?.value !== null && value?.value !== undefined) {
            setProcedure(value.procedure)
            setProcedureId(value.id)
            // setDescription('')
            setConsultationCharge(0)
            setInclusions([])
        }
    }

    const handleSubmit = () => {
        if (isValid()) {
            isEditable ? setUpdateReq(true) : setPostReq(true)
            const requestBody = {
                body: {
                    department,
                    procedure,
                    // description,
                    consultationCharge,
                    inclusions,
                },
                partnerId,
                hospitalId: hospitalIdFromUrl,
                procedureId,
            }
            isEditable ? props.updateHospitalProceduresRequest(requestBody) : props.postRequest(requestBody)
            setIsEditable(false)
        }
    }

    const isValid = () => {
        let formIsValid = true
        let error = {}
        if (department === null) {
            formIsValid = false
            error['department'] = "Department is required"
        }
        if (procedure === null) {
            formIsValid = false
            error['procedure'] = "Procedure is required"
        }

        if (consultationCharge <= 0 || consultationCharge === undefined || consultationCharge === null || consultationCharge === "" || isNaN(consultationCharge)) {
            formIsValid = false
            error['consultationCharge'] = "Charges is required"
        }
        if (inclusions.length <= 0) {
            formIsValid = false
            error['inclusions'] = "Select atleast one"
        }

        setErrors(error)
        return formIsValid
    }

    const handleChangeConsultationCharge = (e) => {
        setConsultationCharge(e.target.value)
    }

    const handleChangeInclusions = (e) => {
        if (inclusions.indexOf(e.target.value) < 0) {
            setInclusions([...inclusions, e.target.value])
        } else {
            let filteredArr = inclusions.filter(inclusion => inclusion !== e.target.value)
            setInclusions(filteredArr)
        }
    }

    const setConsultationChargeToTwoDigit = () => {
        setConsultationCharge(Number.parseFloat(consultationCharge).toFixed(2))
    }

    const handleSaveContinue = () => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=3&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=4${fromDashboard ? '&fd=1' : ''}`)
        props.setStepFromChild('4')
    }

    const openDeleteModal = (proc) => {
        setModalShow(true)
        setProcedureIdToDelete(proc.id)
        setProcedureNameToDelete(proc.procedure)
    }

    const confirmDelete = (bool) => {
        if (bool) {
            let params = {
                hospitalId: hospitalIdFromUrl,
                partnerId,
                procedureId: procedureIdToDelete
            }
            props.deleteProcedureRequest(params)
            setDeleteReq(true)
        }
    }

    const editProcedure = (id) => {
        setModalProcedureShow(true)
        setGetProcedureDetailFromProcedureIdReq(true)
        setProcedureId(id)
        setIsEditable(true)
        setErrors({})
    }

    const resetInputFields = () => {
        setProceduresList([])
        setProcedure(null)
        setConsultationCharge(0)
        setInclusions([])
        setDepartment(null)
        setProcedureId('')
        setIsEditable(false)
        setErrors({})
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard ? '&fd=1' : ''}`)
        props.setStepFromChild(step)
    }

    const goBackToHospitalDetails = () => {
        resetInputFields()
        navigate(`/hospitallisting?hid=${hospitalIdFromUrl}&review=1`)
    }

    const onHide = () => {
        setModalProcedureShow(false)
        resetInputFields()
    }

    return (
        <div className="right-form">
            <div className="right-form-head">
                {hospitalToEdit ? (
                    <div className="flex-between-center">
                        <h4>Edit Hospital</h4>
                        <div>
                            <Button className="btn btn-secondary btn-sm mr-16" onClick={goBackToHospitalDetails}>Go Back</Button>
                            <Button className="btn btn-primary btn-sm">Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="subhead">Step 3 of 8</p>
                        <h2 className="form-main-title">Procedures</h2>
                        <p className="subpara">Add procedures in departments provided by your hospital.</p>
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

            {/* ----new updated block */}

            <div className="px-5 mt-24">
                <div className='add-procedure-block'>
                    <Button className='btn-tertiary' onClick={() => setModalProcedureShow(true)}>+ Add New Procedure</Button>
                </div>
                <Row>
                    {Array.isArray(allProceduresList) && allProceduresList?.length ? allProceduresList.map((proc, j) => {
                        return (
                            <Col xs='12' xl='4'>
                                <div className='white-card added-card p-0 mt-24'>
                                    <div className='d-flex justify-content-between p-3 pb-0'>
                                        <div className='d-flex'>
                                            <img src={"/images/proced-2.png"} />
                                            <div className='ml-12'>
                                                <h3 className='fs-16'>{proc.procedure}</h3>
                                                <p className='fs-12 text-grey'>{proc.department}</p>
                                                <h5 className='fs-18 font-bold mt-16'>{proc.consultationCharge}/-</h5>
                                            </div>
                                        </div>
                                        <div className='edit-block procedure-edit'>
                                            <Button className='btn-no-brdr mr-16' onClick={() => editProcedure(proc.id)}>
                                                <img src={"/images/edit.svg"} />
                                            </Button>
                                            <Button className='btn-no-brdr' onClick={() => openDeleteModal(proc)}>
                                                <img src={"/images/delete-profile.svg"} />
                                            </Button>
                                        </div>
                                    </div>
    
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
                                    <div className='service-block'>
                                    {proc?.inclusions?.length &&
                                        <> <h5 className='text-small-bold'>Inclusions</h5>
                                            <div className='mt-8'>
                                                {proc?.inclusions?.map((inclusion, j) => {
                                                    return (
                                                        <Badge key={j} bg="light" className='mr-4 mb-4'>
                                                            {inclusion}
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    }
                                </div>
                                </div>
                            </Col>
                        )})
                        :
                        /* when no procedure add */

                        <div className='flex-center align-items-center h-100'>
                            <div className='text-center'>
                                <img src={"/images/emptyicon.svg"} />
                                <h4 className='empty-title'>No Procedures Added </h4>
                                <p className='empty-para'>Please fill the form to add<br></br> the procedures</p>
                                <AddProcedure
                                    show={modalProcedureShow}
                                    onHide={() => setModalProcedureShow(false)}
                                />
                            </div>
                        </div>

                        /* when no procedure add */
                    }
                </Row>
            </div>

            {/* ----new updated block */}

           
            {!hospitalToEdit && (<div className="stepfooter">
                <div className='d-flex justify-content-end w-100'>
                    <div>
                        <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('2')}>Back</Button>
                        <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSaveContinue}>Save & Continue</Button>
                    </div>
                </div>
            </div>)}
            <DeleteProcedureCard
                show={modalShow}
                onHide={() => setModalShow(false)}
                confirmdelete={() => confirmDelete(true)}
                procedureNameToDelete={procedureNameToDelete}
            />
            <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} >
                    <Toast.Header className='alert-success'>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{`A new procedure added "${procedureAdded}`}"</p>
                    </Toast.Header>
                </Toast>
            </div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='qur-modal scheduled'
                onHide={() => onHide()}
                show={modalProcedureShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>{isEditable ? 'Update Procedure' : 'Add Procedure'}</h5>
                        <span className='fs-14 text-grey font-normal'>Please fill the form </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='no-padding'>
                    <div className='p-4'>
                        <div className="px-5 flex-between">
                            <div className='pr-24 w-100'>
                                <div className='flex-between mt-32'>
                                    <div className='w-50'>
                                        <p className='form-label'>Select Department</p>
                                        <Autocomplete
                                            disablePortal
                                            id="autofield"
                                            options={departmentsForAutoComplete}
                                            className='autocomplete'
                                            onChange={(e, value) => handleSearchDepartment(e, value)}
                                            renderInput={(params) => <TextField {...params} placeholder='Department' />}
                                            value={department}
                                            isOptionEqualToValue={(option, value) => option.value === value}
                                            disabled={isEditable}
                                        />
                                        <span className="error-label">{errors['department']}</span>
                                    </div>
                                    <div className='ml-24 w-50'>
                                        <p className='form-label'>Select Procedure</p>
                                        <Autocomplete
                                            disablePortal
                                            id="autofield"
                                            options={proceduresList}
                                            className='autocomplete'
                                            onChange={(e, value) => handleSearchProcedure(e, value)}
                                            renderInput={(params) => <TextField {...params} placeholder='Procedures' />}
                                            value={procedure}
                                            isOptionEqualToValue={(option, value) => option.label === value}
                                            disabled={isEditable}
                                        />
                                        <span className="error-label">{errors['procedure']}</span>
                                    </div>
                                </div>

                                <div className='mt-32'>
                                    <Form.Label>Charges (in Rs)</Form.Label>
                                    <Form.Group className="w-50" controlId="formBasicEmail">
                                        <ClickAwayListener onClickAway={setConsultationChargeToTwoDigit}>
                                            <Form.Control type="number" placeholder="Enter charges" onChange={handleChangeConsultationCharge} value={consultationCharge} />
                                        </ClickAwayListener>
                                    </Form.Group>
                                    <span className="error-label">{errors['consultationCharge']}</span>
                                </div>
                                <div className='mt-24'>
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
                                <div className='mt-24'>
                                    <Form.Label className='mb-16'>Inclusions</Form.Label>
                                    <Row className='mt-16'>
                                        {inclusionsOptions?.map((obj, i) => {
                                            return (
                                                <Col xs={4} key={i}>
                                                    <Form.Group className="mb-16  qur-check d-flex" controlId="doctorconsultancy">
                                                        <Form.Check type="checkbox" name={obj.label} value={obj.value} label={obj.label} checked={inclusions.includes(obj.value)} onChange={handleChangeInclusions} />
                                                    </Form.Group>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                    <span className="error-label">{errors['inclusions']}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className='btn btn-secondary btn-lg' onClick={() => onHide()}>Cancel</Button> */}
                    {isEditable && <Button className='btn btn-secondary btn-sm ml-24' onClick={resetInputFields}>Reset</Button>}
                    <Button className='btn btn-primary btn-sm' onClick={handleSubmit}>{isEditable ? 'Update Procedure' : 'Add Procedure'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getDepartmentsRequest: Actions.getHospitalDepartmentsRequest,
        getRequest: Actions.getHospitalProceduresRequest,
        postRequest: Actions.postHospitalProceduresRequest,
        getProceduresFromDepartmentRequest: Actions.getProceduresFromDepartmentRequest,
        getProcedureDetailFromProcedureIdRequest: Actions.getProcedureDetailFromProcedureIdRequest,
        deleteProcedureRequest: Actions.deleteProcedureRequest,
        updateHospitalProceduresRequest: Actions.updateHospitalProceduresRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Thirdstep);

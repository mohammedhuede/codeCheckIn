import React from 'react';
import { Button, Row, Badge, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react"
import Select from 'react-select'
import { DeleteConfirmationModal } from '../../modals/DeleteConfirmationModal';
import { doctorInfoSample } from '../../../constants/constants'
import { qualifications } from '../../../constants/constants'
import DepartmentMultiSelect from '../../helper/DepartmentMultiSelect';
import { Toast } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePrevious } from '../../customHooks/usePrevious';
import { resizeImage } from '../../utils';
import { uploadFile } from '../../s3/s3';
import { Loader } from '../../Loader';
import LinearWithValueLabel from './UploadProgress';
import AddDoctor from './onboard-modals/doctorform';

const Fifthstep = (props) => {
    const [modalDoctorShow, setDoctorShow] = React.useState(false);
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)
    const [allDoctorsList, setAllDoctorsList] = useState([])
    const [doctorInfo, setDoctorInfo] = useState(doctorInfoSample)
    const [departments, setDepartments] = useState([])
    const [departmentsOptions, setDepartmentsOptions] = useState([])
    const [selectDepartmentVal, setSelectDepartmentVal] = useState('')
    const [qualificationOptions, setQualificationOptions] = useState(qualifications)
    const [selectQualVal, setSelectQualVal] = useState('')
    const [treatmentsOptions, setTreatmentsOptions] = useState([])
    const [selectTreatmentVal, setSelectTreatmentVal] = useState('')
    const [getDocInfoReq, setGetDocInfoReq] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [doctorId, setDoctorId] = useState('')
    const [updateDocReq, setUpdateDocReq] = useState(false)
    const [doctorIdToDelete, setDoctorIdToDelete] = useState('')
    const [deleteDocReq, setDeleteDocReq] = useState(false)
    const [errors, setErrors] = useState({})
    const [postDoctorInfo, setPostDoctorInfoReq] = useState(false)
    const [getAllDocReq, setGetAllDocReq] = useState(false)
    const [toastShow, setToastShow] = useState(false);
    const [toastClass, setToastClass] = useState('');
    const [docAdded, setDocAdded] = useState('');
    const [docAddedSuccess, setDocAddedSuccess] = useState(false);
    const [getDeptReq, setGetDeptReq] = useState(false);
    const [docImageFile, setDocImageFile] = useState('');
    const [docImageUrl, setDocImageUrl] = useState('');
    const [removeImageModalShow, setRemoveImageModalShow] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalProcedureShow, setModalProcedureShow] = React.useState(false);

    useEffect(() => {
        getDepartmentsRequest()
        getAllDoctorsRequest()
    }, [])

    const { getHospitalDepartmentsSuccess, hospitalDepartmentsData, getAllDoctorsSuccess, allDoctorsData, postDoctorInfoSuccess,
        getDoctorInfoSuccess, updateDoctorInfoSuccess, deleteDoctorSuccess } = props.hospitalDetails

    useEffect(() => {
        if (getDeptReq) {
            if (getHospitalDepartmentsSuccess) {
                setDepartments(hospitalDepartmentsData)
                const arr = hospitalDepartmentsData.filter(obj => obj.medical || obj.surgery).map(dept => ({ label: dept.name, value: dept.name }))
                setDepartmentsOptions(arr)
            } else {
                setDepartments([])
                setDepartmentsOptions([])
            }
            setGetDeptReq(false)
        }
    }, [getHospitalDepartmentsSuccess])

    const prevStatus = usePrevious(getAllDoctorsSuccess)

    useEffect(() => {
        if (getAllDocReq) {
            if (getAllDoctorsSuccess) {
                setAllDoctorsList(allDoctorsData)
                setGetAllDocReq(false)
            } else {
                setAllDoctorsList([])
                // setGetAllDocReq(false)
            }
        }
    }, [getAllDoctorsSuccess])

    useEffect(() => {
        if (postDoctorInfo) {
            if (postDoctorInfoSuccess) {
                getAllDoctorsRequest()
                setDoctorInfo(doctorInfoSample)
                setSelectTreatmentVal('')
                setSelectQualVal('')
                setSelectDepartmentVal('')
                setTreatmentsOptions([])
                setPostDoctorInfoReq(false)
                setDocAddedSuccess(true)
                setDocAdded(props.hospitalDetails.doctorInfo.name)
                resetInputFields()
                setModalProcedureShow(false)
            }
        }
    }, [postDoctorInfoSuccess])

    useEffect(() => {
        if (docAddedSuccess) {
            setToastClass('alert-success')
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
                setDocAddedSuccess(false)
                setToastClass('')
            }, 3000);
            setTimeout(() => {
                setDocAdded('')
            }, 3200);

        }
    }, [docAdded])

    useEffect(() => {
        if (getDocInfoReq) {
            if (getDoctorInfoSuccess) {
                setDoctorInfo(props.hospitalDetails.doctorInfo)
                setDocImageUrl(props.hospitalDetails.doctorInfo.docImageUrl)
                setSelectTreatmentVal(props.hospitalDetails.doctorInfo?.treatments)
                setSelectQualVal(props.hospitalDetails.doctorInfo?.qualification.map(el => ({ label: el, value: el })))
                setSelectDepartmentVal(props.hospitalDetails.doctorInfo?.department?.map(el => ({ label: el, value: el })))
                setGetDocInfoReq(false)
            }
        }
    }, [getDoctorInfoSuccess])

    useEffect(() => {
        if (updateDocReq) {
            if (updateDoctorInfoSuccess) {
                getAllDoctorsRequest()
                setUpdateDocReq(false)
                setIsEditable(false)
                setDoctorInfo(doctorInfoSample)
                setSelectTreatmentVal('')
                setSelectQualVal('')
                setSelectDepartmentVal('')
                setTreatmentsOptions([])
                setDoctorId('')
                resetInputFields()
                setModalProcedureShow(false)
            }
        }
    }, [updateDoctorInfoSuccess])

    useEffect(() => {
        if (deleteDocReq) {
            if (deleteDoctorSuccess) {
                setDeleteDocReq(false)
                setModalShow(false)
                setGetAllDocReq(true)
                getAllDoctorsRequest()
                resetInputFields()
            }
        }
    }, [deleteDoctorSuccess])

    const getAllDoctorsRequest = () => {
        setGetAllDocReq(true)
        setTimeout(() => {
            const params = {
                hospitalId: hospitalIdFromUrl,
                partnerId
            }
            props.getAllDoctorsRequest(params)
        }, 500);
    }

    const getDepartmentsRequest = () => {
        setGetDeptReq(true)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.getDepartmentsRequest(params)
    }

    const handleChange = (e, type) => {
        if (type !== 'checkbox') {
            setDoctorInfo({
                ...doctorInfo,
                [e.target.name]: e.target.value
            })
        } else {
            setDoctorInfo({
                ...doctorInfo,
                [e.target.name]: e.target.checked
            })
        }
    }

    const handleFloatingChange = e => {
        setDoctorInfo({
            ...doctorInfo,
            overview: e.target.value
        })
    }

    const handleSelect = (value, key) => {
        if (key === 'qualification' || key === 'department') {
            setDoctorInfo({
                ...doctorInfo,
                [`${key}`]: value.map(obj => obj.value)
            })
        } else if (key === 'treatments') {
            setDoctorInfo({
                ...doctorInfo,
                [`${key}`]: value
            })
        }
        if (key === 'department') {
            setSelectDepartmentVal(value)
        }
        if (key === 'qualification') {
            setSelectQualVal(value)
        }
        if (key === 'treatments') {
            setSelectTreatmentVal(value)
        }
    }

    const handleSaveContinue = () => {
        if (checkIfOneDocExist()) {
            hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=6&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=6${fromDashboard ? '&fd=1' : ''}`)
            props.setStepFromChild('6')
        } else {
            setToastShow(true)
            setToastClass('alert-failure')
            setTimeout(() => {
                setToastShow(false)
                setToastClass('')
            }, 3000);
        }
    }

    const checkIfOneDocExist = () => {
        return allDoctorsData?.length > 0 ? true : false
    }

    const handleSubmit = () => {
        if (isValid()) {
            let requestBody = {
                body: { ...doctorInfo, docImageUrl },
                partnerId,
                hospitalId: hospitalIdFromUrl
            }
            if (isEditable) {
                requestBody = {
                    ...requestBody,
                    doctorId
                }
                props.updateDoctorInfoRequest(requestBody)
                setUpdateDocReq(true)
            } else {
                setPostDoctorInfoReq(true)
                props.postDoctorInfoRequest(requestBody)
            }
        }
    }

    const isValid = () => {
        let isFormValid = true
        let error = {}
        if (doctorInfo.name.trim() === '' || doctorInfo.name === undefined || doctorInfo.name === null) {
            isFormValid = false
            error['name'] = 'Name is required'
        }

        if (doctorInfo.registrationNumber.trim() === '' || doctorInfo.registrationNumber === undefined || doctorInfo.registrationNumber === null) {
            isFormValid = false
            error['registrationNumber'] = 'Registration number is required'
        }

        if (doctorInfo.qualification.length === 0 || doctorInfo.qualification === undefined || doctorInfo.qualification === null) {
            isFormValid = false
            error['qualification'] = 'Select at lease one qualification'
        }

        if (doctorInfo.department.length === 0 || doctorInfo.department === undefined || doctorInfo.department === null) {
            isFormValid = false
            error['department'] = 'Select at lease one department'
        }

        if (doctorInfo.experience.trim() === '' || doctorInfo.experience === undefined || doctorInfo.experience === null) {
            isFormValid = false
            error['experience'] = 'Experience is required'
        }

        setErrors(error)
        return isFormValid
    }

    const getQualification = (qualArr) => {
        let arr = []
        for (let i = 0; i < qualArr.length; i++) {
            if (i === qualArr.length - 1) {
                arr.push(`${qualArr[i]}`)
            } else if (i === qualArr.length - 2) {
                arr.push(`${qualArr[i]} and `)
            }
            else {
                arr.push(`${qualArr[i]}, `)
            }
        }
        return arr.join('')
    }

    const getDoctorInfoRequest = (doctorId) => {
        setModalProcedureShow(true)
        setGetDocInfoReq(true)
        setIsEditable(true)
        setDoctorId(doctorId)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl,
            doctorId
        }
        props.getDoctorInfoRequest(params)
    }

    const resetInputFields = () => {
        setIsEditable(false)
        setDoctorInfo(doctorInfoSample)
        setSelectTreatmentVal('')
        setSelectQualVal('')
        setSelectDepartmentVal('')
        setTreatmentsOptions([])
        setDoctorId('')
        setSelectDepartmentVal([])
        setDocImageUrl('')
        setDocImageFile('')
        setErrors({})
    }

    const [modalShow, setModalShow] = React.useState(false);

    const handleDeleteDoctor = (id) => {
        setModalShow(true)
        setDoctorIdToDelete(id)
    }

    const handleConfirmDelete = () => {
        setDeleteDocReq(true)
        let params = {
            partnerId,
            hospitalId: hospitalIdFromUrl,
            doctorId: doctorIdToDelete
        }
        props.deleteDoctorRequest(params)
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard ? '&fd=1' : ''}`)
        props.setStepFromChild(step)
    }

    const setDepartForChild = (a, b) => {
        setDoctorInfo({ ...doctorInfo, department: a })
        setSelectDepartmentVal(b)
    }

    const getTreatmentOptionsFromChild = (procedures) => {
        setTreatmentsOptions(procedures)
    }

    const goBackToHospitalDetails = () => {
        navigate(`/hospitallisting?hid=${hospitalIdFromUrl}&review=1`)
    }

    const handleChooseFile = (e) => {
        let file = e.target.files[0]
        setDocImageFile(file)
    }

    useEffect(() => {
        if (docImageFile !== "") {
            uploadFileToS3()
        }
    }, [docImageFile])


    const handleOpenRemoveImageModal = () => {
        setRemoveImageModalShow(true)
    }

    const handleRemoveDocImage = () => {
        setDocImageFile('')
        setDocImageUrl('')
        setRemoveImageModalShow(false)
    }

    const uploadFileToS3 = async () => {
        setLoading(true)
        const reducedImage = await resizeImage(docImageFile, 1200, 1200);
        const imgRes = await uploadFile(reducedImage)
        if (imgRes) {
            setLoading(false)
        }
        setDocImageUrl(imgRes)
    }

    const knowDoctorCreatedOrUpdatedSuccessfully = () => {
        if (postDoctorInfoSuccess) {
            return true
        } else if (updateDoctorInfoSuccess) {
            return true
        } else {
            return false
        }
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
                        <p className="subhead">Step 5 of 8</p>
                        <h2 className="form-main-title">Doctors</h2>
                        <p className="subpara">Create profile of doctors working in your hospital.</p>
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
                    <Button className='btn-tertiary' onClick={() => setModalProcedureShow(true)}>+ Add New Doctor</Button>
                </div>
                <Row>
                    {Array.isArray(allDoctorsList) && allDoctorsList.length ? allDoctorsList.map((doc, j) => {
                        return (
                            <Col xs='12' xl='4'>
                                <div className='white-card p-0 mt-24'>
                                    <div className='ac-block p-3'>
                                        <div className='d-flex'>
                                            <img src={doc?.docImageUrl ? doc?.docImageUrl : "/images/dr-empty-state-image.svg"} className='replace-img' alt='doctor' />
                                            <div className='ml-12'>
                                                <h4 className='font-bold fs-18'>{doc.name}</h4>
                                                <p className='mt-4'>{getQualification(doc.qualification)}</p>
                                                <p className='mt-4'>{doc.experience}</p>
                                            </div>
                                        </div>
                                        <div className='edit-block'>
                                                <Button className='btn-no-brdr mr-16' onClick={() => getDoctorInfoRequest(doc.id)}>
                                                    <img src={"/images/edit.svg"} alt='edit' />
                                                </Button>
                                                <Button className='btn-no-brdr' onClick={() => handleDeleteDoctor(doc.id)}>
                                                    <img src={"/images/delete-profile.svg"} alt='delete' />
                                                </Button>
                                            </div>
                                    </div>
                                    <div className='p-3 pt-0'>
                                        <h5 className='fs-14 mt-16'>Treatments</h5>
                                        <div className='mt-8'>
                                            {doc.treatments.map((treat, k) => {
                                                return <Badge key={k} bg="light" className='mr-4 mb-4'>{treat.label}</Badge>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                    : 
                    <div className='flex-center align-items-center  h-100'>
                            <div className='text-center'>
                                <img src={"/images/no-doctor.svg"} />
                                <h4 className='empty-title'>No Doctors Added </h4>
                                <p className='empty-para'>Please fill the form to add <br /> the doctors</p>
                                <AddDoctor
                                    show={modalDoctorShow}
                                    onHide={() => setDoctorShow(false)}
                                />
                            </div>
                        </div>}

                </Row>
            </div>

            {/* ----new updated block */}

            {!hospitalToEdit && (< div className="stepfooter">
                <div className='d-flex justify-content-end w-100'>
                    {/* <Button className='btn-secondary btn-lg'>Save as draft</Button> */}
                    <div>
                        <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('4')}>Back</Button>
                        <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSaveContinue}>Save & Continue</Button>
                    </div>
                </div>
            </div >)}
            <DeleteConfirmationModal
                show={modalShow}
                onHide={() => { setModalShow(false) }}
                handleconfirmdelete={handleConfirmDelete}
                label='Are you sure you want to delete doctor'
                heading='Delete Doctor'
            />
            <DeleteConfirmationModal
                show={removeImageModalShow}
                onHide={() => { setRemoveImageModalShow(false) }}
                handleconfirmdelete={handleRemoveDocImage}
                label="Are you sure you want to remove doctor's image"
                heading='Remove Image'
            />
            <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} >
                    <Toast.Header className={toastClass}>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{toastClass === 'alert-success' ? `A new doctor added "${docAdded}"` : toastClass === 'alert-failure' ? 'At least one doctor is required' : ''}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {loading ? <Loader /> : null}
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
                        <div className='pr-24 w-100'>
                            {(!docImageFile && !docImageUrl) ?
                                <div class="form-group">
                                    <div class="form-upload form-ulpoad-thumbnail">
                                        <div class="form-upload-group">
                                            <img src={"/images/add_thumbnail.svg"} />
                                            <div>
                                                <a href='#' class="upload-link">Add doctor image</a>
                                                <input accept='image/*' type='file' onChange={handleChooseFile} />
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className='edit-image' >
                                    <img src={docImageFile ? window.URL.createObjectURL(docImageFile) : docImageUrl} className='replace-img' alt='doctor' />
                                    <div className='edit-image-block'>
                                        <img src={"/images/replace-delete.svg"} className='mr-12' alt='delete doctor image' onClick={handleOpenRemoveImageModal} />
                                        {/* <img src={"/images/replace-reload.svg"} alt='reload image' /> */}
                                    </div>
                                </div>}
                            {(docImageFile && !docImageUrl) && <Button className="btn-sm btn-tertiary text-cap" onClick={() => uploadFileToS3()}>Start Uploading</Button>}


                            <div className='d-flex  mt-32'>
                                <Form.Group controlId="formBasicEmail" className='w-50'>
                                    <Form.Label>Doctor Name <span className="required"> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={doctorInfo.name} name='name' onChange={handleChange} />
                                    <span className="error-label">{errors.name}</span>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail" className='w-50 ml-24'>
                                    <Form.Label>Registration Number   <span className="required"> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter no" value={doctorInfo.registrationNumber} name='registrationNumber' onChange={handleChange} />
                                    <span className="error-label">{errors.registrationNumber}</span>
                                </Form.Group>
                            </div>
                            <div className='flex-between mt-32'>
                                <div className='w-50 qur-select'>
                                    <Form.Label>Qualification <span className="required"> *</span></Form.Label>
                                    <Select
                                        {...props}
                                        options={qualificationOptions}
                                        value={selectQualVal}
                                        hasValue={true}
                                        placeholder='Select Qualification'
                                        onChange={(val) => handleSelect(val, 'qualification')}
                                        closeMenuOnSelect={false}
                                        isMulti={true}
                                    />
                                    <span className="error-label">{errors.qualification}</span>
                                </div>
                                <div className='ml-24 w-50 qur-select'>
                                    <Form.Label>Department <span className="required"> *</span></Form.Label>
                                    <DepartmentMultiSelect
                                        departmentsOptions={departmentsOptions}
                                        selectDepartmentVal={selectDepartmentVal}
                                        hasValue={true}
                                        placeholder='Select Departments'
                                        setDepartForChild={setDepartForChild}
                                        getProceduresFromDepartmentRequest={props.getProceduresFromDepartmentRequest}
                                        hospitalDetails={props.hospitalDetails}
                                        partnerId={partnerId}
                                        hospitalIdFromUrl={hospitalIdFromUrl}
                                        getTreatmentOptionsFromChild={getTreatmentOptionsFromChild}
                                        doctorCreatedOrUpdatedSuccessfully={knowDoctorCreatedOrUpdatedSuccessfully()}
                                    />
                                    <span className="error-label">{errors.department}</span>
                                </div>
                            </div>
                            <div className='d-flex  mt-32'>
                                <Form.Group controlId="formBasicEmail" className='w-50'>
                                    <Form.Label>Experience  <span className="required"> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Experience" value={doctorInfo.experience} name='experience' onChange={handleChange} />
                                    <span className="error-label">{errors.experience}</span>
                                </Form.Group>
                            </div>
                            <div className='flex-between mt-32'>
                                <div className='w-50 qur-select'>
                                    <Form.Label>Treatments </Form.Label>
                                    <Select
                                        {...props}
                                        options={treatmentsOptions}
                                        value={selectTreatmentVal}
                                        hasValue={true}
                                        placeholder='Select Treatments'
                                        onChange={(val) => handleSelect(val, 'treatments')}
                                        isMulti={true}
                                        closeMenuOnSelect={false}
                                    />
                                </div>
                            </div>
                            <div className='mt-32'>
                                <Form.Label>Overview</Form.Label>
                                <Form.Group controlId="floatingTextarea2" label="Comments" >
                                    <Form.Control className='text-area' as="textarea" placeholder="Write here" value={doctorInfo.overview} onChange={handleFloatingChange} />
                                </Form.Group>
                            </div>
                            <div className='mt-32'>
                                <p className='mb-16'>Other Services</p>
                                <Row>
                                    <Col xs={4}>
                                        <Form.Group className="mb-16  qur-check d-flex" controlId="Audio/Video">
                                            <Form.Check type="checkbox" label="Audio/Video" name='audioVideo' checked={doctorInfo.audioVideo} onChange={(e) => handleChange(e, 'checkbox')} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-16  qur-check d-flex" controlId="Hospital Visit">
                                            <Form.Check type="checkbox" label="Hospital Visit" name='hospitalVisit' checked={doctorInfo.hospitalVisit} onChange={(e) => handleChange(e, 'checkbox')} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-16  qur-check d-flex" controlId="Home Visit">
                                            <Form.Check type="checkbox" label="Home Visit" name='homeVisit' checked={doctorInfo.homeVisit} onChange={(e) => handleChange(e, 'checkbox')} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-16  qur-check d-flex" controlId="Free Consultation">
                                            <Form.Check type="checkbox" label="Free Consultation" name='freeConsultation' checked={doctorInfo.freeConsultation} onChange={(e) => handleChange(e, 'checkbox')} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isEditable && <Button className='btn btn-secondary btn-sm ml-24' onClick={resetInputFields}>Reset</Button>}
                    <Button className='btn btn-primary btn-sm' onClick={handleSubmit}>{isEditable ? 'Update Doctor' : 'Add Doctor'}</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getDepartmentsRequest: Actions.getHospitalDepartmentsRequest,
        postDoctorInfoRequest: Actions.postDoctorInfoRequest,
        getAllDoctorsRequest: Actions.getAllDoctorsRequest,
        getProceduresFromDepartmentRequest: Actions.getProceduresFromDepartmentRequest,
        getDoctorInfoRequest: Actions.getDoctorInfoRequest,
        updateDoctorInfoRequest: Actions.updateDoctorInfoRequest,
        deleteDoctorRequest: Actions.deleteDoctorRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Fifthstep);

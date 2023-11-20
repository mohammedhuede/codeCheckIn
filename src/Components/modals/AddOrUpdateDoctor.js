import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useSearchParams } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../Redux/Actions'
import { doctorInfoSample, qualifications } from '../../constants/constants';
import Select from 'react-select'
import DepartmentMultiSelect from '../helper/DepartmentMultiSelect';
import { resizeImage } from '../utils';
import { uploadFile } from '../s3/s3';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { Loader } from '../Loader';

function AddOrUpdateDoctor(props) {
    const [searchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')

    const [doctorInfo, setDoctorInfo] = useState(doctorInfoSample)
    const [departmentsOptions, setDepartmentsOptions] = useState([])
    const [selectDepartmentVal, setSelectDepartmentVal] = useState('')
    const [qualificationOptions, setQualificationOptions] = useState(qualifications)
    const [selectQualVal, setSelectQualVal] = useState('')
    const [treatmentsOptions, setTreatmentsOptions] = useState([])
    const [selectTreatmentVal, setSelectTreatmentVal] = useState('')
    const [getDocInfoReq, setGetDocInfoReq] = useState(false)
    const [doctorId, setDoctorId] = useState('')
    const [updateDocReq, setUpdateDocReq] = useState(false)
    const [getDeptReq, setGetDeptReq] = useState(false)
    const [errors, setErrors] = useState({})
    const [docImageFile, setDocImageFile] = useState('');
    const [docImageUrl, setDocImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false)

    const { getHospitalDepartmentsSuccess, hospitalDepartmentsData, getDoctorInfoSuccess,
        updateDoctorInfoSuccess } = props.hospitalDetails

    useEffect(() => {
        getDepartmentsRequest()
        getDoctorInfoRequest()
    }, [])

    useEffect(() => {
        if (getDeptReq) {
            if (getHospitalDepartmentsSuccess) {
                const arr = hospitalDepartmentsData.filter(obj => obj.medical || obj.surgery).map(dept => ({ label: dept.name, value: dept.name }))
                setDepartmentsOptions(arr)
            }
            setGetDeptReq(false)
        }

    }, [getHospitalDepartmentsSuccess])

    useEffect(() => {
        if (getDocInfoReq) {
            if (getDoctorInfoSuccess) {
                setDoctorInfo(props.hospitalDetails.doctorInfo)
                setSelectTreatmentVal(props.hospitalDetails.doctorInfo?.treatments)
                setSelectQualVal(props.hospitalDetails.doctorInfo?.qualification.map(el => ({ label: el, value: el })))
                setSelectDepartmentVal(props.hospitalDetails.doctorInfo?.department?.map(el => ({ label: el, value: el })))
                setGetDocInfoReq(false)
                setDocImageUrl(props.hospitalDetails.doctorInfo.docImageUrl)
            }
        }
    }, [getDoctorInfoSuccess])

    useEffect(() => {
        if (updateDocReq) {
            if (updateDoctorInfoSuccess) {
                setUpdateDocReq(false)
                setDoctorInfo(doctorInfoSample)
                setSelectTreatmentVal('')
                setSelectQualVal('')
                setSelectDepartmentVal('')
                setTreatmentsOptions([])
                setDoctorId('')
                props.getAllDoctorsFromDeptRequest()
                props.setShowEditProfile(false)
            }
        }
    }, [updateDoctorInfoSuccess])

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

    const handleSubmit = () => {
        if (isValid()) {
            let body = doctorInfo
            body = {
                ...body,
                docImageUrl
            }
            let requestBody = {
                body,
                partnerId,
                hospitalId: hospitalIdFromUrl,
                doctorId: props.doctorId
            }
            props.updateDoctorInfoRequest(requestBody)
            setUpdateDocReq(true)
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

    const getDoctorInfoRequest = (doctorId) => {
        setGetDocInfoReq(true)
        setDoctorId(doctorId)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl,
            doctorId: props.doctorId
        }
        props.getDoctorInfoRequest(params)
    }

    const setDepartForChild = (a, b) => {
        setDoctorInfo({ ...doctorInfo, department: a })
        setSelectDepartmentVal(b)
    }

    const getTreatmentOptionsFromChild = (procedures) => {
        setTreatmentsOptions(procedures)
    }

    const handleChooseFile = (e, setState) => {
        let file = e.target.files[0]
        setDocImageFile(file)        
    }

    useEffect(() => {
      if(docImageFile !== ""){
        uploadFileToS3(docImageFile)
      }
    }, [docImageFile])
    

    const uploadFileToS3 = async (file) => {
        setLoading(true)
        try {
            const reducedImage = await resizeImage(file, 1200, 1200);
            const imgRes = await uploadFile(reducedImage)
            if (imgRes) {
                setDocImageUrl(imgRes)
                setLoading(false)
            }
        } catch (error) {
            console.log('error', error.message)
            setLoading(false)
        }

    }

    const removeFile = () => {
        setDocImageFile('')
        setDocImageUrl('')
        setModalShow(false)
    }

    const openDeleteConfirmationModal = (setState1, setState2, setState3,) => {
        setModalShow(true)
    }

    return (
        <Modal show={props.showEditProfile} fullscreen={props.fullscreenedit} className="large-modal" onHide={() => props.setShowEditProfile(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit doctor</Modal.Title>
                <div>
                    <Button className='btn btn-secondary btn-lg mr-16' onClick={() => props.setShowEditProfile(false)}>Cancel</Button>
                    <Button className='btn btn-primary btn-lg' onClick={handleSubmit}>Save Changes</Button>
                </div>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <div className='p-5'>                  
                    <div className="">
                        {(!docImageFile && !docImageUrl) ? <div className='form-group'>
                            <div className='form-upload form-ulpoad-thumbnail'>
                                <div className='form-upload-group'>
                                    <img src={"/images/add_thumbnail.svg"} />
                                    <div>
                                        <a href='#' class="upload-link">Upload Image</a>
                                        <p className="fs-10">Max Size: 50kb</p>
                                        <input type='file' accept='image/*' onChange={(e) => handleChooseFile(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                            : (docImageFile || docImageUrl) && <div className='edit-image mt-12' >
                                <img src={docImageFile ? window.URL.createObjectURL(docImageFile) : docImageUrl} className='replace-img' alt='doctor' />
                                <div className='edit-image-block'>
                                    <img src={"/images/replace-delete.svg"} className='mr-12' alt='delete doctor' onClick={() => openDeleteConfirmationModal(setDocImageUrl, setDocImageFile, null)} />
                                </div>
                            </div>}

                    </div>

                    <Row className='mt-32'>
                        <Col xs={3}>
                            <div className=''>
                                <p className='form-label'>Doctor Name <span className='required'>*</span></p>
                                <Form.Group className="" controlId="formText">
                                    <Form.Control type="text" placeholder="Enter name" value={doctorInfo.name} name='name' onChange={handleChange} />
                                    <span className="error-label">{errors.name}</span>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className=''>
                                <p className='form-label'>Registration Number <span className='required'>*</span></p>
                                <Form.Group className="" controlId="formNumber">
                                    <Form.Control type="text" placeholder="Enter no" value={doctorInfo.registrationNumber} name='registrationNumber' onChange={handleChange} />
                                    <span className="error-label">{errors.registrationNumber}</span>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs={3} >
                            <div className='qur-select'>
                                <p className='form-label'>Qualification <span className='required'>*</span></p>
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
                        </Col>
                        <Col xs={3}>
                            <div className='qur-select'>
                                <p className='form-label'>Department <span className='required'>*</span></p>
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
                                />
                                <span className="error-label">{errors.department}</span>
                            </div>
                        </Col>
                        <Col xs={3} className="mt-32">
                            <p className='form-label'>Experience <span className='required'>*</span></p>
                            <Form.Control type="text" placeholder="Enter name" value={doctorInfo.experience} name='experience' onChange={handleChange} />
                            <span className="error-label">{errors.experience}</span>
                        </Col>
                        <Col xs={3} className="mt-32">
                            <div className='qur-select'>
                                <p className='form-label'>Treatments  <span className='required'>*</span></p>
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
                        </Col>
                        <Col xs={12} className="mt-32">
                            <p className='form-label'>Overview </p>
                            <Form.Control className='text-area' as="textarea" placeholder="Write here" value={doctorInfo.overview} onChange={handleFloatingChange} />
                        </Col>

                        <Col xs={12} className="mt-32">
                            <p className='form-label'>Other Services</p>
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
                        </Col>
                    </Row>
                </div>

            </Modal.Body>
            <DeleteConfirmationModal
                label={'Do you want to remove this file?'}
                heading={'Remove'}
                handleconfirmdelete={removeFile}
                show={modalShow}
                onHide={() => { setModalShow(false); }}
            />
            {loading ? <Loader /> : null}
        </Modal >
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getDepartmentsRequest: Actions.getHospitalDepartmentsRequest,
        getAllDoctorsRequest: Actions.getAllDoctorsRequest,
        getProceduresFromDepartmentRequest: Actions.getProceduresFromDepartmentRequest,
        getDoctorInfoRequest: Actions.getDoctorInfoRequest,
        updateDoctorInfoRequest: Actions.updateDoctorInfoRequest,
        deleteDoctorRequest: Actions.deleteDoctorRequest,
    },
        dispatch
    )
}

export default connect(mapStateToProps, mapActionToProps)(AddOrUpdateDoctor);

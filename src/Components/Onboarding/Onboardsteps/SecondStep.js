import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/esm/Table';
import { useNavigate, useSearchParams } from "react-router-dom";
import { InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Toast from 'react-bootstrap/Toast';
import { byDefaultDepartments } from '../../../constants/constants'

const Secondstep = (props) => {
    let [searchParams] = useSearchParams()
    const hospitalIdFromUrl = searchParams.get('hid')
    const fromDashboard = searchParams.get('fd')
    const editHospital = searchParams.get('editHospital')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)
    let navigate = useNavigate()
    const [departments, setDepartments] = useState([...byDefaultDepartments])
    const [departmentsForSearch, setDepartmentsForSearch] = useState([...byDefaultDepartments])
    const [submitGetRequest, setSubmitGetRequest] = useState(false)
    const [submitPostRequest, setSubmitPostRequest] = useState(false)
    const [showAddBox, setShowAddBox] = useState(false)
    const [newDeptName, setNewDeptName] = useState('')
    const [newDeptMedical, setNewDeptMedical] = useState(false)
    const [newDeptSurgery, setNewDeptSurgery] = useState(false)
    const [errors, setErrors] = useState({})
    const [toastClass, setToastClass] = useState('')
    const { partnerId, hospitalId } = props
    const { postHospitalDepartmentsSuccess, getHospitalDepartmentsSuccess, error, hospitalDepartmentsData } = props?.hospitalDetails

    useEffect(() => {
        getRequest()
    }, [])

    useEffect(() => {
        if (submitGetRequest && getHospitalDepartmentsSuccess) {
            setDepartments(hospitalDepartmentsData)
            setSubmitGetRequest(false)
        }
        if (submitPostRequest && postHospitalDepartmentsSuccess) {
            hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=2&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=3${fromDashboard ? '&fd=1' : ''}`)
            setDepartments(hospitalDepartmentsData)
            setSubmitPostRequest(false)
            !hospitalToEdit && props.setStepFromChild('3')
        }
        if (submitGetRequest && error) {
            setSubmitGetRequest(false)
        }
    })

    const getRequest = () => {
        const params = {
            partnerId,
            hospitalId
        }
        props.getRequest(params)
        setSubmitGetRequest(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postRequest()
    }

    const postRequest = () => {
        if (isValid()) {
            const requestBody = {
                partnerId,
                hospitalId,
                body: departments
            }
            props.postRequest(requestBody)
            setSubmitPostRequest(true)
        }
    }

    const isValid = () => {
        let filteredArr = departments.filter(obj => obj.medical || obj.surgery)
        if (filteredArr.length === 0) {
            setErrors({ 'depError': 'Hospital must have at least one department' })
            setToastClass('alert-failure')
            setShow(true)
            setTimeout(() => {
                setShow(false)
                setToastClass('')
            }, 2500);
            return false
        } else {
            return true
        }
    }

    const handleMedicalChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            if (obj.name === e.target.name) {
                return { ...obj, medical: e.target.checked }
            } else {
                return { ...obj }
            }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const handleSurgeryChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            if (obj.name === e.target.name) {
                return { ...obj, surgery: e.target.checked }
            } else {
                return { ...obj }
            }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const handleBothChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            if (obj.name === e.target.name) {
                return { ...obj, surgery: e.target.checked, medical: e.target.checked }
            } else {
                return { ...obj }
            }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const handleAllMedicalChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            return { ...obj, medical: e.target.checked }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const handleAllSurgeryChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            return { ...obj, surgery: e.target.checked }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const handleAllChange = (e) => {
        let departmentsArr = departments
        let arr = departmentsArr.map(obj => {
            return { ...obj, surgery: e.target.checked, medical: e.target.checked }
        })
        setDepartments(arr)
        setDepartmentsForSearch(arr)
    }

    const allMedicalChecked = () => {
        let departmentsArr = departments
        if (departmentsArr.every(obj => obj.medical === true)) {
            return true
        }
    }

    const allSurgeryChecked = () => {
        let departmentsArr = departments
        if (departmentsArr.every(obj => obj.surgery === true)) {
            return true
        }
    }

    const bothChecked = () => {
        let departmentsArr = departments
        if (departmentsArr.every(obj => obj.surgery === true && obj.medical === true)) {
            return true
        }
    }

    const searchDepartments = (e) => {
        e.preventDefault()
        let arr1 = [...departmentsForSearch]
        let arr = arr1.filter(obj => obj.name?.toLowerCase().includes((e.target.value).toLowerCase()))
        setDepartments(arr)

    }

    const [show, setShow] = useState(false);

    const removeAddDeptBox = () => {
        setShowAddBox(false)
    }

    const handleAddMoreDept = (e) => {
        e.preventDefault()
        setNewDeptName(e.target.value)
    }

    const handleNewDeptMedicalChange = e => {
        setNewDeptMedical(e.target.checked)
    }
    const handleNewDeptSurgeryChange = e => {
        setNewDeptSurgery(e.target.checked)
    }

    const addNewDept = () => {
        if (newDeptName.trim() !== '' && newDeptName.trim() !== null && newDeptName.trim() !== undefined && newDeptName.trim().length > 0) {
            const newDept = {
                name: newDeptName,
                medical: newDeptMedical,
                surgery: newDeptSurgery,
            }
            setDepartments([...departments, newDept])
            setShowAddBox(false)
            setShow(true)
            setToastClass('alert-success')
            setTimeout(() => {
                setShow(false)
                setToastClass('')
            }, 2000);
        } else {
            setErrors({ 'newDept': 'Department name cannot be empty' })
        }
    }

    const handleShowAddBox = () => {
        setNewDeptName('')
        setShowAddBox(true)
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard ? '&fd=1' : ''}`)
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
                            <Button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="subhead">Step 2 of 8</p>
                        <h2 className="form-main-title">Departments</h2>
                        <p className="subpara">Add services like departments provided by your hospital</p>
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
            {/* <div className="px-5 mt-32 flex-between align-items-end">
                <h2 className="form-main-title">Select Departments</h2>
                <div className='w-50 d-flex justify-content-end'>
                    <InputGroup className="qur-search w-50">
                        <InputGroup.Text id="basic-addon1"><img alt="search-icon" src={"/images/search-icon.svg"} /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search departments"
                            aria-label="Search departments"
                            aria-describedby="basic-addon1"
                            className='left-icon-placeholder'
                            onChange={searchDepartments}
                        />
                    </InputGroup>
                </div>
            </div> */}
            <div className="px-5 mt-32">
                <Table striped className='qur-table'>
                    <thead className='table-head dep-head'>
                        <tr>
                            <th>Departments</th>
                            <th className='w-120'>
                                <Form.Group className="qur-check d-flex" controlId="medical">
                                    <Form.Check type="checkbox" label="Medical" checked={allMedicalChecked()} onChange={handleAllMedicalChange} />
                                </Form.Group>
                            </th>
                            <th className='w-120'>
                                <Form.Group className="qur-check d-flex" controlId="surgical">
                                    <Form.Check type="checkbox" label="Surgical" checked={allSurgeryChecked()} onChange={handleAllSurgeryChange} />
                                </Form.Group>
                            </th>
                            <th className='w-120'>
                                <Form.Group className="qur-check d-flex" controlId="both">
                                    <Form.Check type="checkbox" label="Both" checked={bothChecked()} onChange={handleAllChange} />
                                </Form.Group>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(departments) && departments.length > 0 &&
                            departments.map((department, i) => {
                                return (
                                    <tr className='dep-check' key={i}>
                                        <td>{department.name}</td>
                                        <td>
                                            <Form.Group className="qur-check" controlId="medical">
                                                <Form.Check name={department.name} value={department.medical} checked={department.medical} onChange={handleMedicalChange} type="checkbox" label="" />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="qur-check" controlId="medical">
                                                <Form.Check name={department.name} value={department.surgery} checked={department.surgery} onChange={handleSurgeryChange} type="checkbox" label="" />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group className="qur-check" controlId="medical">
                                                <Form.Check name={department.name} checked={department.surgery && department.medical} onChange={handleBothChange} type="checkbox" label="" />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                )
                            })

                        }
                        <tr className={`dep-check ${showAddBox ? '' : 'display-none'}`}>
                            <td>
                                <InputGroup className='add-depart w-75'>
                                    <Form.Control
                                        placeholder="Enter department name"
                                        aria-label="Enter department name"
                                        value={newDeptName}
                                        onChange={handleAddMoreDept}
                                    />
                                    <Button variant="tertiary" className='anchor-link fs-16 done-btn pr-24' onClick={addNewDept}>Done</Button>
                                    <Button variant="tertiary" className='anchor-link fs-16 cancel-btn pr-16' onClick={removeAddDeptBox}>Cancel</Button>
                                </InputGroup>
                                <span className="error-label">{errors.newDept}</span>
                            </td>
                            <td>
                                <Form.Group className="qur-check d-flex mt-16" controlId="medical">
                                    <Form.Check type="checkbox" value={newDeptMedical} checked={newDeptMedical} onChange={handleNewDeptMedicalChange} label="" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="qur-check d-flex mt-16" controlId="medical" value={newDeptSurgery} checked={newDeptSurgery} onChange={handleNewDeptSurgeryChange}>
                                    <Form.Check type="checkbox" label="" />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="qur-check d-flex mt-16" controlId="medical">
                                    <Form.Check type="checkbox" label="" />
                                </Form.Group>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <p className='fs-14 text-grey d-flex'>{`Didn’t find the department? `}<Button className='anchor-link btn-no-brdr add-dep ml-8' onClick={handleShowAddBox}> Add Department</Button>  </p>
            </div>
            <div className='toast-block'>
                <Toast onClose={() => setShow(false)} show={show} delay={3000}>
                    <Toast.Header className={toastClass}>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{toastClass === 'alert-failure' ? errors['depError'] : `A new department added “${newDeptName}”`}</p>
                    </Toast.Header>
                </Toast>
            </div>
            {!hospitalToEdit && (<div className="stepfooter">
                <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('1')}>Back</Button>
                <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSubmit}>Save & Continue</Button>
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getRequest: Actions.getHospitalDepartmentsRequest,
        postRequest: Actions.postHospitalDepartmentsRequest,

    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Secondstep);
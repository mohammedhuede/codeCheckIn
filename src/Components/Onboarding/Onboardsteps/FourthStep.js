import { Button, Row, InputGroup, Toast } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { usePrevious } from '../../customHooks/usePrevious';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listOfAllWards } from '../../../constants/constants'
import { inclusionsOptionsForStepFour as inclusionsOptions } from '../../../constants/constants'
import Accordion from 'react-bootstrap/Accordion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Fourthstep = (props) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)
    const [wards, setWards] = useState(listOfAllWards)
    const [submitPostRequest, setSubmitPostRequest] = useState(false)
    const [errors, setErrors] = useState({})
    const [toastShow, setToastShow] = useState(false);

    useEffect(() => {
        getHospitalWardsBedsRequest()
    }, [])

    const { getHospitalWardsBedsSuccess, hospitalWardsBedsData, postHospitalWardsBedsSuccess } = props.hospitalDetails

    const prevStatus1 = usePrevious(getHospitalWardsBedsSuccess)
    useEffect(() => {
        if (!prevStatus1?.getHospitalWardsBedsSuccess && getHospitalWardsBedsSuccess) {
            setWards(hospitalWardsBedsData)
        }
    }, [getHospitalWardsBedsSuccess])

    const prevStatus2 = usePrevious(postHospitalWardsBedsSuccess)
    useEffect(() => {
        if (submitPostRequest) {
            if (!prevStatus2?.postHospitalWardsBedsSuccess && postHospitalWardsBedsSuccess) {
                setWards(hospitalWardsBedsData.counts)
                hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=4&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=5${fromDashboard ? '&fd=1' : ''}`)
                !hospitalToEdit ? props.setStepFromChild('5') : props.setStepFromChild('4')
                setSubmitPostRequest(false)
                getHospitalWardsBedsRequest()
            }
        }
    }, [postHospitalWardsBedsSuccess])


    const postHospitalWardsBedsRequest = () => {
        if (isValid()) {
            const requestBody = {
                body: wards,
                partnerId,
                hospitalId: hospitalIdFromUrl,
            }
            props.postHospitalWardsBedsRequest(requestBody)
        }
    }

    const getHospitalWardsBedsRequest = () => {
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.getHospitalWardsBedsRequest(params)
    }

    const goBackToHospitalDetails = () => {
        navigate(`/hospitallisting?hid=${hospitalIdFromUrl}&review=1`)
    }

    const handleChangeWard = (e, ward, type) => {
        let arr = wards
        let blankArr = []
        arr.forEach(el => {
            if (type !== 'checkbox') {
                if (el.roomType === ward.roomType) {
                    let int = e.target.value > 0 ? parseInt(e.target.value) : ''
                    blankArr.push({
                        ...el,
                        [e.target.name]: int
                    })
                } else {
                    blankArr.push(el)
                }
            } else {
                if (el.roomType === ward.roomType) {
                    if (!el[e.target.name].includes(e.target.value)) {
                        blankArr.push({
                            ...el,
                            [e.target.name]: [...el[e.target.name], e.target.value]

                        })
                    } else {
                        blankArr.push({
                            ...el,
                            [e.target.name]: el[e.target.name].filter(option => option !== e.target.value)

                        })
                    }
                } else {
                    blankArr.push(el)
                }
            }
        })
        setWards(blankArr)
    }

    const handleSubmit = () => {
        setSubmitPostRequest(true)
        postHospitalWardsBedsRequest()
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard ? '&fd=1' : ''}`)
        props.setStepFromChild(step)
    }


    const isValid = () => {
        let error = {}
        let errorMessage = ''
        let isValid
        let bedCountArr = wards.filter(ward => ward.nonACBedCount > 0 || ward.acBedCount > 0 || ward.nonACBedPrice > 0 || ward.acBedPrice > 0)
        let bedCountValid = wards.some(ward => ward.nonACBedCount > 0 || ward.acBedCount > 0 || ward.nonACBedPrice > 0 || ward.acBedPrice > 0)
        if (bedCountValid) {
            let arr1 = []
            bedCountArr.forEach(ward => {
                if (ward.nonACBedCount > 0 || ward.nonACBedPrice > 0) {
                    if (ward.nonACBedCount > 0 && ward.nonACBedPrice > 0) {
                        arr1.push('valid')
                    } else {
                        arr1.push('inValid')
                        errorMessage = 'Please enter both bed count and price/day'
                    }
                }

                if (ward.acBedCount > 0 || ward.acBedPrice > 0) {
                    if (ward.acBedCount > 0 && ward.acBedPrice > 0) {
                        arr1.push('valid')
                    } else {
                        arr1.push('inValid')
                        errorMessage = 'Please enter both bed count and price/day'
                    }
                }
            })

            isValid = arr1.includes('inValid') ? false : true
        } else {
            isValid = false
            errorMessage = 'At least one bed count and bed price is required'
        }
        if (isValid === false) {
            setToastShow(true)
            setTimeout(() => {
                setToastShow(false)
            }, 3000);

            error['beds'] = errorMessage
            setErrors(error)
        } else {
            setErrors({})
        }
        return isValid
    }

    const getTotalBeds = () => {
        let totalBedsArr = wards?.map((obj) => (typeof obj.acBedCount === 'number' ? obj.acBedCount : 0) + (typeof obj.nonACBedCount === 'number' ? obj.nonACBedCount : 0))
        let total = totalBedsArr?.reduce((a, b) => a + b)
        return total
    }

    const checkToggleButton = (ward) => {
        return ward?.acBedCount > 0 || ward?.nonACBedCount > 0
    }

    const handleToggle = (e, ward) => {
        if(e.target.checked){

        }
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
                        <p className="subhead">Step 4 of 8</p>
                        <h2 className="form-main-title">Wards & Beds</h2>
                        <p className="subpara">Enter the beds and medical care availability</p>
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

            {wards?.length > 0 && wards?.map((ward, i) => {
                return (
                    <div className="qur-accordian px-5 mt-24" key={i}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header >
                                    <div>
                                        {ward.roomType}
                                    </div>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            className="qur-switch"
                                            id="disabled-custom-switch"
                                            checked={checkToggleButton(ward)}
                                            onChange={e => handleToggle(e, ward)}
                                        />
                                    </Form>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="pt-0">
                                                <div key={i}>
                                                    <div className="mt-24">
                                                        <div className="d-flex">
                                                            <div className="non-ac">
                                                                {/* <h2 className='form-main-title'>{ward.roomType} <span className='required'>*</span></h2>  */}
                                                                <div className="flex-align-center">
                                                                    <h5 className="fs-12">{ward.roomType === 'ICU' ? "Non-Ventilator Beds" : "Non-AC Beds"}</h5>
                                                                    <div className="ml-24">
                                                                        <InputGroup className="qur-search">
                                                                            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                                                                            <Form.Control
                                                                                placeholder="Total Beds"
                                                                                aria-label="Total Beds"
                                                                                aria-describedby="basic-addon1"
                                                                                type='number'
                                                                                onChange={(e) => handleChangeWard(e, ward)}
                                                                                value={ward.nonACBedCount}
                                                                                name='nonACBedCount'
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                    <div className="ml-12">
                                                                        <InputGroup className="qur-search">
                                                                            <Form.Control
                                                                                placeholder="Price"
                                                                                aria-label="Price"
                                                                                aria-describedby="basic-addon2"
                                                                                className='right-icon-placeholder'
                                                                                type='number'
                                                                                onChange={(e) => handleChangeWard(e, ward)}
                                                                                value={ward.nonACBedPrice}
                                                                                name='nonACBedPrice'
                                                                            />
                                                                            <InputGroup.Text className='right-icon' id="basic-addon2">/day</InputGroup.Text>
                                                                        </InputGroup>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="ac ml-32">
                                                                {/* <h2 className='form-main-title'>{ward.roomType} <span className='required'>*</span></h2> */}
                                                                <div className="flex-align-center">
                                                                    <h5 className="fs-12">{ward.roomType === 'ICU' ? "Ventilator Beds" : "AC Beds"}</h5>
                                                                    <div className="ml-24">
                                                                        <InputGroup className="qur-search">
                                                                            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                                                                            <Form.Control
                                                                                placeholder="Total Beds"
                                                                                aria-label="Total Beds"
                                                                                aria-describedby="basic-addon1"
                                                                                type='number'
                                                                                onChange={(e) => handleChangeWard(e, ward)}
                                                                                value={ward.acBedCount}
                                                                                name='acBedCount'
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                    <div className="ml-12">
                                                                        <InputGroup className="qur-search">
                                                                            <Form.Control
                                                                                placeholder="Price"
                                                                                aria-label="Price"
                                                                                aria-describedby="basic-addon2"
                                                                                className='right-icon-placeholder'
                                                                                type='number'
                                                                                onChange={(e) => handleChangeWard(e, ward)}
                                                                                value={ward.acBedPrice}
                                                                                name='acBedPrice'
                                                                            />
                                                                            <InputGroup.Text className='right-icon' id="basic-addon2">/day</InputGroup.Text>
                                                                        </InputGroup>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Form.Label className="mt-24">Inclusions</Form.Label>
                                                        <div className="d-flex w-100">
                                                            {inclusionsOptions.map((option, i) => {
                                                                return (
                                                                    <Form.Group className="qur-check d-flex" controlId="Room keeping">
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            label={option}
                                                                            onChange={(e) => handleChangeWard(e, ward, 'checkbox')}
                                                                            value={option}
                                                                            name='inclusions'
                                                                            checked={ward.inclusions.includes(option)}
                                                                            className='mr-24'
                                                                        />
                                                                    </Form.Group>
                                                                )
                                                            })}
                                                        </div>
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
                                                </div>

                                            </div>
                                        </Col>

                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>
                )
            })}


            {/* <div className="p-5 pt-0">
                {wards.length > 0 && wards.map((ward, i) => {
                    return (
                        <div className='mt-32' key={i}>
                            <h2 className='form-main-title'>{ward.roomType} <span className='required'>*</span></h2>
                            <Row className='mt-16'>
                                <Col xs={3}>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/non-ac.svg"} /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Non-AC Beds"
                                            aria-label="Non-AC Beds"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                            type='number'
                                            onChange={(e) => handleChangeWard(e, ward)}
                                            value={ward.nonACBedCount}
                                            name='nonACBedCount'
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={3}>
                                    <InputGroup className="qur-search">
                                        <Form.Control
                                            placeholder="Enter Price"
                                            aria-label="Enter Price"
                                            aria-describedby="basic-addon2"
                                            className='right-icon-placeholder'
                                            type='number'
                                            onChange={(e) => handleChangeWard(e, ward)}
                                            value={ward.nonACBedPrice}
                                            name='nonACBedPrice'
                                        />
                                        <InputGroup.Text className='right-icon' id="basic-addon2">/day</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={3}>
                                    <InputGroup className="qur-search">
                                        <InputGroup.Text id="basic-addon1"><img src={"/images/ac.svg"} /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="AC Beds"
                                            aria-label="AC Beds"
                                            aria-describedby="basic-addon1"
                                            className='left-icon-placeholder'
                                            type='number'
                                            onChange={(e) => handleChangeWard(e, ward)}
                                            value={ward.acBedCount}
                                            name='acBedCount'
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={3}>
                                    <InputGroup className="qur-search">
                                        <Form.Control
                                            placeholder="Enter Price"
                                            aria-label="Enter Price"
                                            aria-describedby="basic-addon2"
                                            className='right-icon-placeholder'
                                            type='number'
                                            onChange={(e) => handleChangeWard(e, ward)}
                                            value={ward.acBedPrice}
                                            name='acBedPrice'
                                        />
                                        <InputGroup.Text className='right-icon' id="basic-addon2">/day</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={3} className="mt-24 w-100">
                                    <Form.Label>Inclusions</Form.Label>
                                    <div className="d-flex w-100">
                                        {inclusionsOptions.map((option, i) => {
                                            return (
                                                <Form.Group className="qur-check d-flex" controlId="Room keeping">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={option}
                                                        onChange={(e) => handleChangeWard(e, ward, 'checkbox')}
                                                        value={option}
                                                        name='inclusions'
                                                        checked={ward.inclusions.includes(option)}
                                                        className='mr-24'
                                                    />
                                                </Form.Group>
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
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
                        </div>
                    )
                })}
            </div> */}
        
             <div className='toast-block'>
                <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000}>
                    <Toast.Header className='alert-failure'>
                        <CheckCircleIcon className='mr-8'></CheckCircleIcon>
                        <p className="me-auto">{errors['beds']}</p>
                    </Toast.Header>
                </Toast>
            </div>
            <div className="stepfooter flex-between-center">
                <div>
                    <div class="total-bed-count">
                        <div>Total Beds : <span class="ml-12">{getTotalBeds()}</span></div>
                    </div>
                </div>
                {!hospitalToEdit && (<div>
                    <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('3')}>Back</Button>
                    <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSubmit}>Save & Continue</Button>
                </div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        postHospitalWardsBedsRequest: Actions.postHospitalWardsBedsRequest,
        getHospitalWardsBedsRequest: Actions.getHospitalWardsBedsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Fourthstep);


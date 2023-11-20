import { useEffect } from 'react';
import { Button, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { useNavigate, useSearchParams } from "react-router-dom";
import { generalAmenities } from '../../../constants/constants'
import { roomAmenities } from '../../../constants/constants'
import { sampleReqBody } from '../../../constants/constants'


const Sixstep = (props) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)

    const [reqBody, setreqBody] = useState(sampleReqBody)
    const [submitPostReq, setSubmitPostReq] = useState(false)
    const [getAmenitiesReq, setGetAmenitiesReq] = useState(false)

    useEffect(() => {
        getAmenitiesRequest()
    }, [])

    useEffect(() => {
    })

    const getAmenitiesRequest = () => {
        setGetAmenitiesReq(true)
        const params = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.getAmenitiesRequest(params)
    }
    const { getAmenitiesSuccess, amenitiesData, postAmenitiesSuccess } = props.hospitalDetails

    useEffect(() => {
        if(getAmenitiesReq){
            if (getAmenitiesSuccess) {
                if (Object.keys(amenitiesData).length > 0) {
                    setreqBody(amenitiesData)
                }
            } else {
                // setreqBody(sampleReqBody)
            }
            setGetAmenitiesReq(false)
        }
    }, [getAmenitiesSuccess])

    useEffect(() => {
        if (submitPostReq) {
            if (postAmenitiesSuccess) {
                hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=6&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=7${fromDashboard? '&fd=1': ''}`)
                !hospitalToEdit && props.setStepFromChild('7')
                setSubmitPostReq(false)
            }
        }
    }, [postAmenitiesSuccess])

    const handleChange = (e, key) => {
        let obj = reqBody
        setreqBody({
            ...obj,
            [`${key}`]: e.target.checked
        })
    }

    const handleSaveContinue = () => {
        const requestBody = {
            hospitalId: hospitalIdFromUrl,
            partnerId,
            body: reqBody
        }
        props.postAmenitiesRequest(requestBody)
        setSubmitPostReq(true)
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
            {/* <Header></Header> */}
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
                        <p className="subhead">Step 6 of 8</p>
                        <h2 className="form-main-title">Amenities</h2>
                        <p className="subpara">Select the extra services provided by you</p>
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
            <div className="px-5">
                <div className='mt-32'>
                    <p><strong>General Amenities</strong></p>
                    <Row className='mt-16'>
                        {Array.isArray(generalAmenities) && generalAmenities.length > 0 && generalAmenities.map((amen, i) => {
                            return (
                                <Col xs={3} key={i}>
                                    <Form.Group className="qur-check d-flex" controlId={amen.label}>
                                        {/* <Form.Check type="checkbox" label={amen.label} checked={() => checkIfChecked(amen.value)} onClick={(e) => handleChange(e, amen.value)} /> */}
                                        <Form.Check type="checkbox" label={amen.label} checked={reqBody[amen.value]} onClick={(e) => handleChange(e, amen.value)} />
                                    </Form.Group>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
                <div className='mt-32'>
                    <p><strong>Room Amenities</strong></p>
                    <Row className='mt-16'>
                        {Array.isArray(roomAmenities) && roomAmenities.length > 0 && roomAmenities.map((amen, i) => {
                            return (
                                <Col xs={3} key={i}>
                                    <Form.Group className="qur-check d-flex" controlId={amen.label}>
                                        <Form.Check type="checkbox" label={amen.label} checked={reqBody[amen.value]} onClick={(e) => handleChange(e, amen.value)} />
                                    </Form.Group>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
            {!hospitalToEdit && (<div className="stepfooter">
                <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('5')}>Back</Button>
                <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSaveContinue}>Save & Continue</Button>
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAmenitiesRequest: Actions.getAmenitiesRequest,
        postAmenitiesRequest: Actions.postAmenitiesRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Sixstep);
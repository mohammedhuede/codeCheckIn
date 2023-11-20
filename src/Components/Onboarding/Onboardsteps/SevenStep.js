import { useEffect } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { useNavigate, useSearchParams } from "react-router-dom";
import { insuranceListSample } from '../../../constants/constants'

const Sevenstep = (props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)

    const [insuranceList, setInsuranceList] = useState(insuranceListSample)
    const [showInsurances, setShowInsurances] = useState(true)
    const [selectedInsurances, setSelectedInsurances] = useState([])
    const [errors, setErrors] = useState({})
    const [submitPostReq, setSubmitPostReq] = useState(false)
    const [submitGetReq, setSubmitGetReq] = useState(false)

    const ifInsuranceAccepted = (bool) => {
        setShowInsurances(bool)
        if (bool === false) {
            setSelectedInsurances([])
        }
    }

    useEffect(() => {
        let params = {
            hospitalId: hospitalIdFromUrl,
            partnerId
        }
        props.getInsurancesRequest(params)
        setSubmitGetReq(true)
    }, [])

    useEffect(() => {
    }, [selectedInsurances])

    const { getInsurancesSuccess, insurancesData, postInsurancesSuccess } = props.hospitalDetails
    useEffect(() => {
        if (submitGetReq) {
            if (getInsurancesSuccess) {
                if (insurancesData?.length > 0) {
                    setSelectedInsurances(insurancesData)
                } else {
                    setShowInsurances(false)
                }
                setSubmitGetReq(false)
            }
        }
    }, [getInsurancesSuccess])

    useEffect(() => {
        if (submitPostReq) {
            if (postInsurancesSuccess) {
                hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=7&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=8${fromDashboard? '&fd=1': ''}`)
                !hospitalToEdit && props.setStepFromChild('8')
                setSubmitPostReq(false)
            }
        }
    }, [postInsurancesSuccess])

    const handleChange = (e, insurance) => {
        if (e.target.checked) {
            setSelectedInsurances([...selectedInsurances, insurance])
        } else {
            setSelectedInsurances(selectedInsurances.filter(el => el !== insurance))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValid()) {
            const reqBody = {
                body: {
                    names: selectedInsurances
                },
                hospitalId: hospitalIdFromUrl,
                partnerId
            }
            props.postInsurancesRequest(reqBody)
        }
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedInsurances(insuranceListSample)
        } else {
            setSelectedInsurances([])
        }
    }

    const isValid = () => {
        let formIsValid = true
        let error = {}
        if (showInsurances) {
            if (selectedInsurances.length === 0) {
                error['noInsuranceSelected'] = 'Please select at least one insurance company'
                formIsValid = false
            }
        }
        setErrors(error)
        setSubmitPostReq(true)
        return formIsValid
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
                            <Button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="subhead">Step 7 of 8</p>
                        <h2 className="form-main-title">Insuarance</h2>
                        <p className="subpara">Select the insuarance service provided by you</p>
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
            <div className="px-5 mt-32">
                <div className="d-flex">
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Yes, we accept insuarance"
                                    name="showdiv"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    className="qur-check insurance-yes"
                                    onChange={() => ifInsuranceAccepted(true)}
                                    checked={showInsurances}
                                />
                                <Form.Check
                                    inline
                                    label="No, we don’t accept insuarance"
                                    name="showdiv"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    className="qur-check"
                                    onChange={() => ifInsuranceAccepted(false)}
                                    checked={!showInsurances}
                                />
                            </div>
                        ))}
                    </Form>
                </div>
                <span className="error-label">{errors['noInsuranceSelected']}</span>
                {showInsurances && <div className='insurance-block'>
                    <div className=''>
                        <Form className='qur-check'>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Select All"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        onChange={handleSelectAll}
                                        checked={selectedInsurances.length === insuranceList.length}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                    <div>
                        <Row>
                            {insuranceList.length > 0 && insuranceList?.map((insurance, i) => {
                                return (
                                    <Col key={i} xs={3}>
                                        <Form className='qur-check'>
                                            {['checkbox'].map((type) => (
                                                <div key={`inline-${type}`} className="mb-3">
                                                    <Form.Check
                                                        inline
                                                        label={insurance}
                                                        name="group1"
                                                        type={type}
                                                        id={`inline-${type}-${i + 2}`}
                                                        onChange={(e) => handleChange(e, insurance)}
                                                        checked={selectedInsurances.includes(insurance)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>}

            </div>
            {!hospitalToEdit && (<div className="stepfooter">
                <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('6')}>Back</Button>
                <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSubmit}>{`Save & Continue`}</Button>
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getInsurancesRequest: Actions.getInsurancesRequest,
        postInsurancesRequest: Actions.postInsurancesRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Sevenstep);

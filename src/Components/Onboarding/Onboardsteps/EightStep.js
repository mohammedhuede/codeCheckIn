import react from 'react';
import React from 'react';
import { Button, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Header from '../../header';
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BedIcon from '@mui/icons-material/Bed';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Wards from './Review Profile/Ward-&-Beds';
import Departments from './Review Profile/Departments';
import Procedures from './Review Profile/Procedures';
import Doctors from './Review Profile/Doctors';
import Insurance from './Review Profile/Insurance';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { amenitiesSample } from '../../../constants/constants'
import HospitalImageGallery from './Review Profile/HospitalImageGallery';

const Eightstep = (props) => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let partnerId = localStorage.getItem('partnerId')
    let hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const beingReviewed = searchParams.get('review')
    const fromDashboard = searchParams.get('fd')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)

    const [basicDetails, setBasicDetails] = useState([])
    const [departments, setDepartments] = useState({})
    const [doctors, setDoctors] = useState([])
    const [procedures, setProcedures] = useState([])
    const [wardsBeds, setWardsBeds] = useState([])
    const [untilFiveAmenities, setUntilFiveAmenities] = useState([])
    const [afterFiveAmenities, setAfterFiveAmenities] = useState([])
    const [getHospitalReviewReq, setGetHospitalReviewReq] = useState(false);
    const [submitPostReviewReq, setSubmitPostReviewReq] = useState(false);

    useEffect(() => {
        getHospitalReviewRequest()
    }, [])

    const { getHospitalReviewSuccess, reviewData, postHospitalReviewSuccess } = props.hospitalDetails
    const previewprofileedit = [true];

    useEffect(() => {
        if (getHospitalReviewReq) {
            if (getHospitalReviewSuccess) {
                setBasicDetails(reviewData?.basicDetails)
                setDepartments(reviewData?.departments)
                setDoctors(reviewData?.doctors)
                setProcedures(reviewData?.procedures)
                setWardsBeds(reviewData?.wardsBends)
                let amenitiesObj = reviewData?.basicDetails?.amenities
                let amenitiesArr = []
                for (let amen in amenitiesObj) {
                    if (amenitiesObj[amen] === true) {
                        amenitiesArr.push({ value: amen })
                    }
                }
                let filteredArr = amenitiesArr.map((x) => amenitiesSample.filter(y => y.value === x.value))
                let arr1 = []
                let arr2 = []

                for (let i = 0; i < 5; i++) {
                    filteredArr[i] !== undefined && arr1.push(filteredArr[i][0])
                }

                for (let j = 5; j < filteredArr.length; j++) {
                    filteredArr[j] !== undefined && arr2.push(filteredArr[j][0])
                }

                setUntilFiveAmenities(arr1)
                setAfterFiveAmenities(arr2)
            } else {
                setBasicDetails([])
                setDepartments({})
                setDoctors([])
                setProcedures([])
                setWardsBeds([])
                setUntilFiveAmenities([])
                setAfterFiveAmenities([])
            }
            setGetHospitalReviewReq(false)
        }
    }, [getHospitalReviewSuccess])

    const getHospitalReviewRequest = () => {
        setGetHospitalReviewReq(true)
        const params = {
            hospitalId: hospitalIdFromUrl,
            partnerId
        }
        props.getHospitalReviewRequest(params)
    }

    const totalWards = () => {
        let nonAcObjArr = wardsBeds.length > 0 && wardsBeds?.filter(obj => typeof obj?.nonACBedCount === 'number')
        let nonAcArr = Array.isArray(nonAcObjArr) && nonAcObjArr.length > 0 && nonAcObjArr.map(el => el.nonACBedCount)
        let nonAcCount = Array.isArray(nonAcObjArr) && nonAcArr.length > 0 && nonAcArr?.reduce((a, b) => a + b)

        let acObjArr = wardsBeds.length > 0 && wardsBeds?.filter(obj => typeof obj?.acBedCount === 'number')
        let acArr = Array.isArray(acObjArr) && acObjArr.length > 0 && acObjArr.map(el => el.acBedCount)
        let acCount = Array.isArray(acArr) && acArr.length > 0 && acArr?.reduce((a, b) => a + b)
        let totalCount = nonAcCount + acCount
        return totalCount > 0 ? totalCount : 0
    }

    const totalDepartments = () => {
        let filteredDepts = departments?.filter(obj => obj.medical || obj.surgery)
        return filteredDepts.length
    }

    const goToPreviousStep = (step) => {
        hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=${step}${fromDashboard ? '&fd=1' : ''}`)
        props.setStepFromChild(step)
    }

    const redirectToHospitalListing = () => {
        props.setShowReviewHospital(false)
        navigate(`/hospitallisting`)
    }

    const submitForReview = () => {
        setSubmitPostReviewReq(true)
        postHospitalReviewRequest()
    }

    const postHospitalReviewRequest = () => {
        let data = {
            partnerId,
            hospitalId: hospitalIdFromUrl
        }
        props.postHospitalReviewRequest(data)
    }

    useEffect(() => {
        if(postHospitalReviewSuccess){
          if(submitPostReviewReq){
            console.log('===========submitted successfully')
          }
        }
      }, [postHospitalReviewSuccess])

    return (
        <div className="right-form">
            {beingReviewed === '1' ? <div className="flex-between-center">
                <div className="flex-align-center">
                    <img alt='back-arrow' src={"/images/arrow-back.svg"} className="pr-16 cursor-pointer" onClick={redirectToHospitalListing} />
                    <h4 className="text-bold">{basicDetails?.name}</h4>
                </div>
                <div>
                    {previewprofileedit.map((v, idx) => (
                        <Link to={`/mainside?hid=${hospitalIdFromUrl}&step=1&editHospital=true`}><Button key={idx} className="btn-sm btn-primary mr-16">
                            Edit/Update Profile
                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                        </Button></Link>
                    ))}

                </div>
            </div> :
                <Header></Header>
            }

            <div className='p-40'>
                <Row>
                    <Col className='white-card border-right-radius-0'>
                        <div className='d-flex'>
                            <div className='gallery-block'>
                                {basicDetails?.galleryImages?.length > 0 ? <HospitalImageGallery images={basicDetails?.galleryImages}></HospitalImageGallery> : <img alt="emptyhospital" src={"/images/default-hospital.svg"} className='w-100' />}
                            </div>
                            <div className='ml-16'>
                                <Badge bg="danger">
                                    {basicDetails?.category}
                                </Badge>
                                <h2 className='dashboard-title mt-8'>{basicDetails?.name}</h2>
                                <div className='flex-align-center mt-24'>
                                    <img src={"/images/location.svg"} />
                                    <p className='ml-12'>{basicDetails?.addressLine}</p>
                                </div>
                                <div className='flex-align-center mt-16'>
                                    <img src={"/images/contact.svg"} />
                                    <p className='ml-12'>{basicDetails?.email}<br />{basicDetails?.phoneNumber}</p>
                                </div>
                                <div className='flex-align-center mt-16'>
                                    <img src={"/images/covid.svg"} />
                                    <p className='ml-12'>{basicDetails?.covidTreatment}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={3} className="grey-card-block">
                        <p>Amenities</p>
                        {basicDetails?.amenities && untilFiveAmenities.length ?
                            <>{untilFiveAmenities.length && untilFiveAmenities.map((el, m) => {
                                return (
                                    <div className='flex-align-center mt-12' key={m}>
                                        <img src={`/images/${el.value}.svg`} alt='am' />
                                        <p className='ml-12'>{el.label}</p>
                                    </div>
                                )
                            })}
                                {Array.isArray(afterFiveAmenities) && afterFiveAmenities.length > 0 ? ['top'].map((placement) => (
                                    <OverlayTrigger
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                                <div>
                                                    {
                                                        afterFiveAmenities?.map((amen, i) => {
                                                            return <div key={i} className='tootltip-item'><img alt='amen' className='mr-8' src={`/images/${amen.value}.svg`} />{amen.label}</div>
                                                        })
                                                    }
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-tertiary mt-16'>+{afterFiveAmenities.length} more </Button>
                                    </OverlayTrigger>
                                )) : null} </>
                            :
                            <div className='text-center pt-40'>
                                <img src={"/images/no-amenities.svg"} />
                                <h4 className='fs-12 text-grey'>No Amenties Available</h4>
                                <p className='fs-10 text-grey mt-4'>Go to Edit hostipal and add amenities</p>
                            </div>
                        }
                    </Col>
                </Row>
                <Tabs
                    defaultActiveKey="Ward-&-Beds"
                    id="justify-tab-example"
                    className="mb-3 qur-tabs mt-40"
                    justify
                >
                    <Tab eventKey="Ward-&-Beds" title={<span> <BedIcon className="mr-8" /> Ward & Beds ({totalWards() !== false ? totalWards() : 0}) </span>}>
                        <Wards totalWards={totalWards} wardsBeds={wardsBeds}></Wards>
                    </Tab>
                    <Tab eventKey="Departments" title={<span> <DashboardOutlinedIcon className="mr-8" /> Departments ({departments.length && totalDepartments()}) </span>}>
                        <Departments departments={departments.length && departments}></Departments>
                    </Tab>
                    <Tab eventKey="Procedures" title={<span> <DescriptionOutlinedIcon className="mr-8" /> Procedures ({procedures?.length}) </span>}>
                        <Procedures procedures={procedures.length && procedures}></Procedures>
                    </Tab>
                    <Tab eventKey="Doctors" title={<span> <MedicalServicesOutlinedIcon className="mr-8" /> Doctors ({doctors?.length}) </span>}>
                        <Doctors doctors={doctors.length && doctors}></Doctors>
                    </Tab>
                    <Tab eventKey="Insurance" title={<span> <CreditCardOutlinedIcon className="mr-8" /> Insurance ({basicDetails?.insurances ? basicDetails?.insurances?.length : 0}) </span>}>
                        {basicDetails?.insurances && <Insurance insurances={basicDetails.insurances}></Insurance>}
                    </Tab>
                </Tabs>
            </div>
            {!props.toReview &&
                <div className="stepfooter">
                    <Button className='btn-secondary btn-lg mr-16' type='submit' onClick={() => goToPreviousStep('7')}>Back</Button>
                    <Button className='btn btn-primary btn-lg' type='submit' onClick={() => submitForReview()} disabled={false}>{`Submit for review`}</Button>
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getHospitalReviewRequest: Actions.getHospitalReviewRequest,
        postHospitalReviewRequest: Actions.postHospitalReviewRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Eightstep);
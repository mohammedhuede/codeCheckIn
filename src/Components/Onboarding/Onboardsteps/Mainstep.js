import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Fifthstep from './FifthStep';
import Fourthstep from './FourthStep';
import Secondstep from './SecondStep';
import Firststep from './StepFirst';
import Thirdstep from './ThirdStep';
import Sixthstep from './SixthStep';
import Sevenstep from './SevenStep';
import Eightstep from './EightStep';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import Header from '../../header';

function Mainside(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const partnerId = localStorage.getItem('partnerId')
    const fromDashboard = searchParams.get('fd')
    const editHospital = searchParams.get('editHospital')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)
    // useState
    const [step, setStep] = useState('1')
    const [completedSteps, setcompletedSteps] = useState(['1'])
    const [hospitalId, setHospitalId] = useState('')
    const [getReq, setGetReq] = useState(false)


    // useEffect // on refreshin or opening the component for the first time, step can be found from URL
    useEffect(() => {
        findStepFromUrl()
        getAllHospitalsBasicDetailsRequest()
    }, [])

    // for setting the active or complete className
    useEffect(() => {
        let arr1 = []
        for (let i = 1; i <= step - 1; i++) {
            arr1.push(i)
        }
        setcompletedSteps(arr1)
    }, [step])

    // 1. Setting hospital id and setting it to URL. Step one is already called and we can check whether hospital is created or not 
    //    from redux state
    // 2. comparing the previous and current state of 'getHospitalBasicDetailsSuccess'
    let { getHospitalBasicDetailsSuccess, hospitalBasicDetailsData } = props?.hospitalDetails
    useEffect(() => {
        if(getReq){
            if (getHospitalBasicDetailsSuccess) {
                setHospitalId(hospitalBasicDetailsData?.id)
                editHospital === 'true' ? setSearchParams({ hid: hospitalBasicDetailsData?.id, step: step, editHospital: editHospital }) : fromDashboard ? setSearchParams({ hid: hospitalBasicDetailsData?.id, step: step, fd: fromDashboard }): setSearchParams({ hid: hospitalBasicDetailsData?.id, step: step })
            }
            setGetReq(false)
        }
       
    }, [getHospitalBasicDetailsSuccess])

    // check the step from URL
    const findStepFromUrl = () => {
        let step = searchParams.get('step')
        setStep(step)
    }

    const getCompletedClass = (step) => {
        if (!hospitalToEdit) {
            if (completedSteps.includes(step)) {
                return 'completed'
            }
        }
    }

    const getActiveClass = (stepNum) => {
        return step == stepNum ? 'proceed' : ''
    }

    // to be passed to children
    const setStepFromChild = (step) => {
        setStep(step)
    }

    // to be passed to children
    const getHospitalId = (hospitalId) => {
        setHospitalId(hospitalId)
    }

    const getAllHospitalsBasicDetailsRequest = () => {
        setGetReq(true)
        let params = {
            partnerId
        }
        props.getAllHospitalsBasicDetailsRequest(params)
    }

    const redirectTo = (stepNumber) => {
        if (hospitalId !== "") {
            navigate(`/mainside?hid=${hospitalId}&step=${stepNumber}&editHospital=true`)
        } else {
            navigate(`/mainside?step=${stepNumber}`)
        }
        setStep(stepNumber)
    }

    return (
        <>
            <Nav variant="pills" defaultActiveKey="link-0" className={`mainpills ${hospitalToEdit ? 'editscreen-mainpills' : ''}`}>
                <div className='left-line'></div>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('1') : null} eventKey="link-0" className={`${getCompletedClass(1)} ${getActiveClass(1)} ${!hospitalToEdit ? '' : null}`}>{!hospitalToEdit ? <span className='order-no'>1</span> : null} Basic Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('2') : null} eventKey="link-1" className={`${getCompletedClass(2)} ${getActiveClass(2)} ${!hospitalToEdit ? '' : null}`}>{!hospitalToEdit ? <span className='order-no'>2</span> : null} Departments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('3') : null} eventKey="link-2" className={`${getCompletedClass(3)} ${getActiveClass(3)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}>{!hospitalToEdit ? <span className='order-no'>3</span> : null}Procedures</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('4') : null} eventKey="link-3" className={`${getCompletedClass(4)} ${getActiveClass(4)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}>{!hospitalToEdit ? <span className='order-no'>4</span> : null}{`Wards & Beds`}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('5') : null} eventKey="link-4" className={`${getCompletedClass(5)} ${getActiveClass(5)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}>{!hospitalToEdit ? <span className='order-no'>5</span> : null} Doctors</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('6') : null} eventKey="link-5" className={`${getCompletedClass(6)} ${getActiveClass(6)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}> {!hospitalToEdit ? <span className='order-no'>6</span> : null} Amenities</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('7') : null} eventKey="link-6" className={`${getCompletedClass(7)} ${getActiveClass(7)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}>{!hospitalToEdit ? <span className='order-no'>7</span> : null} Insurance</Nav.Link>
                </Nav.Item>
                {!hospitalToEdit && <Nav.Item>
                    <Nav.Link onClick={() => !hospitalToEdit ? redirectTo('8') : null} eventKey="link-8" className={`${getCompletedClass(8)} ${getActiveClass(8)} ${!hospitalToEdit ? 'cursor-pointer-default' : null}`}>{!hospitalToEdit ? <span className='order-no'>8</span> : null}Review Profile</Nav.Link>
                </Nav.Item>}
            </Nav>
            <div >
                <Header fromDashboard={fromDashboard}></Header>
                {step === '1' && partnerId !== "" && <Firststep setStepFromChild={setStepFromChild} getHospitalId={getHospitalId} partnerId={partnerId} />}
                {step === '2' && <Secondstep setStepFromChild={setStepFromChild} hospitalId={hospitalId} partnerId={partnerId} />}
                {step === '3' && <Thirdstep setStepFromChild={setStepFromChild} />}
                {step === '4' && <Fourthstep setStepFromChild={setStepFromChild} />}
                {step === '5' && <Fifthstep setStepFromChild={setStepFromChild} />}
                {step === '6' && <Sixthstep setStepFromChild={setStepFromChild} />}
                {step === '7' && <Sevenstep setStepFromChild={setStepFromChild} />}
                {step === '8' && <Eightstep setStepFromChild={setStepFromChild} />}
            </div>
        </>
    );

}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllHospitalsBasicDetailsRequest: Actions.getAllHospitalsBasicDetailsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Mainside);
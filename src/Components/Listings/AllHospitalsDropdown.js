import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Dropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../Redux/Actions'
import Select from 'react-select'

const  AllHospitalsDropdown = (props, ref) => {
    let partnerId = localStorage.getItem('partnerId')

    const [submitGetReq, setSubmitGetReq] = useState(false)
    const [allHospitals, setAllHospitals] = useState([])
    const [hospitalIdsArr, setHospitalIdsArr] = useState([])

    const { getAllHospitalsBasicDetailsSuccess, allHospitalBasicDetailsData } = props.hospitalDetails

    useEffect(() => {
        getAllHospitalsBasicDetailsRequest()
    }, [])

    const getAllHospitalsBasicDetailsRequest = () => {
        setSubmitGetReq(true)
        const params = {
            partnerId
        }
        props.getAllHospitalsBasicDetailsRequest(params)
    }

    useEffect(() => {
        if (submitGetReq) {
            if (getAllHospitalsBasicDetailsSuccess) {
                let allhospitalsArr = allHospitalBasicDetailsData.map(obj => ({ name: obj.name, id: obj.id }))
                setAllHospitals(allhospitalsArr)
            }
        }
    }, [getAllHospitalsBasicDetailsSuccess])

    const handleSelectHospitals = (e, id) => {
        if(!hospitalIdsArr.includes(id)){
            setHospitalIdsArr([...hospitalIdsArr, id])
        } else {
            setHospitalIdsArr(hospitalIdsArr.filter(el => el !== id))
        }
    }

    useEffect(() => {
        let arr = []
        if(hospitalIdsArr.length > 0){
            props.setIsFilteringDocs(true)
            arr = props.completeListOfDocs.filter(obj => hospitalIdsArr.includes(obj.hospitalId))
            props.setlistForFilteredDoc(arr)
            let arr1 = arr.filter((el, i) => i < props.docPerPage)
            props.setDoctorsList(arr1)
        } else {
            props.setIsFilteringDocs(false)
            props.setDoctorsList(props.completeListOfDocs)
            arr = props.completeListOfDocs
            let arr1 = arr.filter((el, i) => i < props.docPerPage)
            props.setDoctorsList(arr1)
        }
            
        let numOfPagesInPagination = Math.floor((arr.length) / props.docPerPage) + 1
        if ((arr.length) === props.docPerPage) {
          numOfPagesInPagination = 1
        }
        if (arr.length / props.docPerPage === arr.length) {
          numOfPagesInPagination = Math.floor((arr.length) / props.docPerPage)
        }
        if (arr.length % props.docPerPage === 0) {
          numOfPagesInPagination = Math.floor((arr.length) / props.docPerPage)
        }
        const arr2 = []
        for (let i = 0; i < numOfPagesInPagination; i++) {
          arr2.push(i + 1)
        }
        props.setNumOfPages(arr2)
        props.setActivePage(1)
        
    }, [hospitalIdsArr])
    

    return (
       <> <Dropdown className='hospital-dropdown' autoClose="outside">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                All hospitals
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0 qur-dropmenu all-hospital-menu'>
            {Array.isArray(allHospitals) && allHospitals.length && allHospitals.map((hos, i) => {
                console.log('hospitalIdsArr.includes(hos.id)', hospitalIdsArr.includes(hos.id))
                console.log('hospitalIdsArr', hospitalIdsArr)
                return (
                        <Dropdown.Item key={i}>
                            {['checkbox'].map((type, j) => (
                                <div key={i} className="qur-check">
                                    <Form.Check
                                        type={type}
                                        id={i}
                                        label={hos.name}
                                        onChange={(e)=> handleSelectHospitals(e, hos.id)}
                                        checked={hospitalIdsArr.includes(hos.id)}
                                    />
                                </div>
                            ))}
                        </Dropdown.Item>
                )
             
            })}
            </Dropdown.Menu>
        </Dropdown>
        </>
    )
}

const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllDoctorsFromDeptRequest: Actions.getAllDoctorsFromDeptRequest,
        deleteDoctorRequest: Actions.deleteDoctorRequest,
        getAllHospitalsBasicDetailsRequest: Actions.getAllHospitalsBasicDetailsRequest,
    },
        dispatch
    )
}

export default connect(mapStateToProps, mapActionToProps)(AllHospitalsDropdown);


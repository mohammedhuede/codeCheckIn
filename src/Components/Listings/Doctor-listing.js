import React, { useState, useEffect } from 'react';
import { InputGroup } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Listingheader from "./listing-header";
import { useSearchParams } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { Example } from './Drdetail';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from '../../Redux/Actions'
import { inclusionsOptionsForStep5 as inclusionsOptions } from '../../constants/constants';
import { DeleteConfirmationModal } from '../modals/DeleteConfirmationModal';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddOrUpdateDoctor from '../modals/AddOrUpdateDoctor';
import AllHospitalsDropdown from './AllHospitalsDropdown';

function Doctorlisting(props) {
  let [searchParams, setSearchParams] = useSearchParams()
  let partnerId = localStorage.getItem('partnerId')

  const [submitGetReq, setSubmitGetReq] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])
  const [docIdToDelete, setDocIdToDelete] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [deleteDoctorReq, setDeleteDoctorReq] = useState(false)
  const [hospitalIdToDelete, setHospitalIdToDelete] = useState('')
  const [docIdToEdit, setDocIdToEdit] = useState('')
  const [docPerPage, setDocPerPage] = useState(5)
  const [numOfPages, setNumOfPages] = useState([])
  const [completeListOfDocs, setCompleteListOfDocs] = useState([])
  const [activePage, setActivePage] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [listForSearchPagination, setListForSearchPagination] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilteringDocs, setIsFilteringDocs] = useState('')
  const [listForFilteredDoc, setlistForFilteredDoc] = useState([])
  const [fullscreenedit, setFullscreenedit] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { getAllDoctorsFromDeptSuccess, allDoctorsFromDeptData, deleteDoctorSuccess } = props.hospitalDetails

  useEffect(() => {
    getAllDoctorsFromDeptRequest()
  }, [])

  useEffect(() => {
    if (submitGetReq && getAllDoctorsFromDeptSuccess) {
      setSearchTerm('')
      setIsSearching(false)
      setSubmitGetReq(false)
      setCompleteListOfDocs(allDoctorsFromDeptData)
      let arr1 = allDoctorsFromDeptData.filter((el, i) => i < docPerPage)
      setDoctorsList(arr1)
      let numOfPagesInPagination = Math.floor((allDoctorsFromDeptData.length) / docPerPage) + 1
      if ((allDoctorsFromDeptData.length) === docPerPage) {
        numOfPagesInPagination = 1
      }
      if (allDoctorsFromDeptData.length / docPerPage === allDoctorsFromDeptData.length) {
        numOfPagesInPagination = Math.floor((allDoctorsFromDeptData.length) / docPerPage)
      }

      if (allDoctorsFromDeptData.length % docPerPage === 0) {
        numOfPagesInPagination = Math.floor((allDoctorsFromDeptData.length) / docPerPage)
      }

      const arr2 = []
      for (let i = 0; i < numOfPagesInPagination; i++) {
        arr2.push(i + 1)
      }
      setNumOfPages(arr2)
      setActivePage(1)
    }
  }, [getAllDoctorsFromDeptSuccess])

  const handlePageChange = (e, page) => {
    let arr = []
    setActivePage(page)
    let firstDocIndex = (page * docPerPage) - (docPerPage - 1)
    let lastDocIndex = page * docPerPage
    if (!isSearching) {
      arr = completeListOfDocs.filter((el, i) => i + 1 >= firstDocIndex && i + 1 <= lastDocIndex)
    } else {
      arr = listForSearchPagination.filter((el, i) => i + 1 >= firstDocIndex && i + 1 <= lastDocIndex)
    }

    if (!isFilteringDocs) {
      arr = completeListOfDocs.filter((el, i) => i + 1 >= firstDocIndex && i + 1 <= lastDocIndex)
    } else {
      arr = listForFilteredDoc.filter((el, i) => i + 1 >= firstDocIndex && i + 1 <= lastDocIndex)
    }
    setDoctorsList(arr)
  }

  useEffect(() => {
    if (deleteDoctorReq && deleteDoctorSuccess) {
      getAllDoctorsFromDeptRequest()
      setDeleteDoctorReq('')
      setHospitalIdToDelete('')
      setModalShow(false)
    }
  }, [deleteDoctorSuccess])

  const getAllDoctorsFromDeptRequest = () => {
    setSubmitGetReq(true)
    props.getAllDoctorsFromDeptRequest({ partnerId })
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

  const getTreatments = (treatments) => {
    let filteredArr = treatments.map(el => el.label)
    let arr1 = []
    let arr2 = []
    for (let i = 0; i < 3; i++) {
      filteredArr[i] !== undefined && arr1.push(filteredArr[i])
    }
    for (let j = 3; j < filteredArr.length; j++) {
      filteredArr[j] !== undefined && arr2.push(filteredArr[j])
    }
    return [arr1, arr2.length]
  }

  const inclusions = (doctor) => {
    let arr = inclusionsOptions.filter(obj => doctor[obj.value])
    return arr
  }

  const openDeleteDoctorModal = (doc) => {
    setModalShow(true)
    setDocIdToDelete(doc.id)
    setHospitalIdToDelete(doc.hospitalId)
  }

  const handleConfirmDelete = () => {
    setDeleteDoctorReq(true)
    let params = {
      partnerId,
      doctorId: docIdToDelete,
      hospitalId: hospitalIdToDelete,
    }
    props.deleteDoctorRequest(params)
  }

  function editDoctorProfile(doc) {
    setShowEditProfile(true);
    setSearchParams({ hid: doc.hospitalId })
    setDocIdToEdit(doc.id)
  }

  const searchDoctor = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value.trim() !== "") {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }

    let arr = completeListOfDocs.filter(el => el.name.toLowerCase().includes((e.target.value).toLowerCase()))
    setListForSearchPagination(arr)
    let arr1 = arr.filter((el, i) => i < docPerPage)
    setDoctorsList(arr1)

    let numOfPagesInPagination = Math.floor((arr.length) / docPerPage) + 1
    if ((arr.length) === docPerPage) {
      numOfPagesInPagination = 1
    }
    if (arr.length / docPerPage === arr.length) {
      numOfPagesInPagination = Math.floor((arr.length) / docPerPage)
    }
    if (arr.length % docPerPage === 0) {
      numOfPagesInPagination = Math.floor((arr.length) / docPerPage)
    }
    const arr2 = []
    for (let i = 0; i < numOfPagesInPagination; i++) {
      arr2.push(i + 1)
    }
    setNumOfPages(arr2)
    setActivePage(1)
  }

  return (
    <div className='referral-list'>
      <Listingheader></Listingheader>
      <Sidebar></Sidebar>

      <div className='listing-content'>
        <div className="flex-between-center mob-flex-direction mob-align-start">
          <h4>Doctors</h4>
          <div className='d-flex mob-w-100 mt-mob-16'>
            <InputGroup className="qur-search">
              <InputGroup.Text id="basic-addon1"><img alt="search-icon" src={"/images/search-icon.svg"} /></InputGroup.Text>
              <Form.Control
                placeholder="Search doctors"
                aria-label="Search doctors"
                aria-describedby="basic-addon1"
                className='left-icon-placeholder'
                value={searchTerm}
                onChange={(e) => searchDoctor(e)}
              />
            </InputGroup>

            {/* <AllHospitalsDropdown
              completeListOfDocs={completeListOfDocs}
              setDoctorsList={setDoctorsList}
              setNumOfPages={setNumOfPages}
              setActivePage={setActivePage}
              docPerPage={docPerPage}
              setIsFilteringDocs={setIsFilteringDocs}
              setlistForFilteredDoc={setlistForFilteredDoc}
            /> */}
          </div>

        </div>
        {doctorsList.map((doc, i) => {
          return (
            <div className="white-shadow-card mt-24" key={i}>
              <div className="p-4 flex-between align-items-start">
                <Example doc={doc} inclusions={inclusions(doc)}>
                  <div className="d-flex align-items-start">
                    <img src={doc?.docImageUrl ? doc?.docImageUrl : "/images/dr-empty-state-image.svg"} alt='doctor' className='listing-image' />
                    <div className="ml-16">
                      <Badge bg="secondary">{doc.hospitalName}</Badge>
                      <div>
                        <h4 className="fs-14 mt-12 text-bold">{doc.name}</h4>
                        <h4 className="fs-14 mt-4">{doc.experience}  •  {getQualification(doc.qualification)}</h4>
                      </div>
                    </div>
                  </div>
                </Example>
                <div className="d-flex justify-content-end mob-display-none">
                  {['start'].map((direction) => (
                    <DropdownButton
                      as={ButtonGroup}
                      key={direction}
                      id={`dropdown-button-drop-${direction}`}
                      className={`dropdown-button-drop-${direction}`}
                      drop={direction}
                      variant="secondary"
                      autoClose="outside"
                      title={
                        <div className="pull-left">
                          <img className="thumbnail-image" alt='thumb'
                            src={"/images/dropdown-toggle.svg"}
                          />
                        </div>
                      }
                    >
                      <Dropdown.Item eventKey="1" onClick={() => openDeleteDoctorModal(doc)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => editDoctorProfile(doc)}>
                        Edit
                      </Dropdown.Item>
                    </DropdownButton>
                  ))}
                </div>
              </div>
              <div className='my-0'>
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
              <div className="px-4 py-3 d-flex justify-content-between">
                <div>
                  {getTreatments(doc.treatments)[0].map((treat, j) => {
                    return (
                      <Badge key={j} bg="light" className="mr-16 mb-mob-8">{treat}</Badge>
                    )
                  })}
                  {getTreatments(doc.treatments)[1] ? <Badge bg="light">+{getTreatments(doc.treatments)[1]} More</Badge> : null}
                </div>
                <div className='mob-display-none'>
                  <Badge bg="light">Facilities Offered</Badge>
                  {
                    Array.isArray(inclusions(doc)) && inclusions(doc).length ? inclusions(doc).map((inc, l) => {
                      return (
                        <div style={{ display: 'inline' }} key={l}>
                          {['top'].map((placement) => (
                            <OverlayTrigger
                              key={placement}
                              placement={placement}
                              overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                  <div>
                                    <div className='tootltip-item'>{inc.label}</div>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <img key={l} src={`/images/${inc.value}.svg`} className="ml-12 w-12" alt='inclusions' />
                              {/* <Button className='btn-tertiary ml-16'><img src={`/images/${inc.value}.svg`} alt='inclusion' /></Button> */}
                            </OverlayTrigger>
                          ))}
                        </div>
                        // <img key={l} src={`/images/${inc.value}.svg`} className="ml-12" alt='inclusions' />
                      )
                    }) : null
                  }
                </div>
              </div>
            </div>
          )
        })
        }
      </div>

      <DeleteConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleconfirmdelete={handleConfirmDelete}
        label={'Are you sure you want to delete this doctor?'}
        heading='Delete Hospital'
      />

      {showEditProfile && <AddOrUpdateDoctor
        showEditProfile={showEditProfile}
        fullscreenedit={fullscreenedit}
        setShowEditProfile={setShowEditProfile}
        doctorId={docIdToEdit}
        getAllDoctorsFromDeptRequest={getAllDoctorsFromDeptRequest}
      />}


      <div className='Dr-list-pagination'>
        {Array.isArray(numOfPages) && numOfPages.length > 0 ? <div className='Dr-list'>
          <Pagination>
            <Pagination.Prev disabled={activePage === 1} className='pagination-icon' onClick={(e) => handlePageChange(e, activePage - 1)} />
            {numOfPages.map((p, i) => {
              return <Pagination.Item activeLabel={true} active={activePage === p ? true : false} key={i} onClick={(e) => handlePageChange(e, p)}>{p}</Pagination.Item>
            })}
            <Pagination.Next disabled={activePage === numOfPages.length} className='pagination-icon' onClick={(e) => handlePageChange(e, activePage + 1)} />
          </Pagination>
        </div> : null}
      </div>


    </div>
  );
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
export default connect(mapStateToProps, mapActionToProps)(Doctorlisting);




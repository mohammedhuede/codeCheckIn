import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Modal,
  Button,
  Container,
  InputGroup,
  Row,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Listingheader from "./listing-header";
import DropdownButton from "react-bootstrap/DropdownButton";

import Sidebar from "./Sidebar";
import Scheduled from "./Referral-Modal/Move-to-Scheduled";
import Admit from "./Referral-Modal/Admit";
import Rescheduled from "./Referral-Modal/Rescheduled";
import Discharge from "./Referral-Modal/Discharge";
import Pagination from "react-bootstrap/Pagination";

import { Loader } from "../Loader";
import { Actions } from "../../Redux/Actions";
import Toaster from "../Toast";

const tabObj = {
  Pending: "Pending",
  Scheduled: "Scheduled",
  Admitted: "Admitted",
  Discharged: "Discharged",
  NoResponse: "NoResponse",
};

const recordsPerPage = 2;

function ReferralListing() {
  const [admitModalShow, setAdmitModalShow] = useState(false);

  const [scheduleModalShow, setScheduleModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [toasterData, setToasterData] = useState({ show: false });

  const [tabKey, setTabKey] = useState("Pending");
  const [filteredReferral, setFilteredReferral] = useState([]);
  const [numOfPage, setNumOfPage] = useState(0);

  const dispatch = useDispatch();
  const { isLoading, listReferral, isUpdated } = useSelector(
    (state) => state.Referral
  );

  useEffect(() => {
    //Pending, Scheduled, Admitted, Discharged, NoResponse
    dispatch(
      Actions.getListReferralRequest({
        partnerId: localStorage.getItem("partnerId"),
      })
    );
  }, []);

  const filterByTab = (currentTab) => {
    return listReferral?.data?.filter((ref) => ref.status === currentTab);
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(
        Actions.getListReferralRequest({
          partnerId: localStorage.getItem("partnerId"),
        })
      );
      setToasterData({
        show: true,
        message: "Referral Updated.",
      });
    }
  }, [isUpdated]);

  useEffect(() => {
    listReferral?.data?.length && setFilteredReferral(filterByTab(tabKey));
  }, [listReferral]);

  useEffect(() => {
    if (filteredReferral.length) {
      setNumOfPage(Math.ceil(filteredReferral.length / recordsPerPage));
    }
  }, [filteredReferral]);

  const handleTab = (key) => {
    setTabKey(key);
    setFilteredReferral(filterByTab(key));
  };

  const handleScheduleModal = (data) => {
    setScheduleModalShow(true);
    setModalData(data);
  };

  const handleAdmitModal = (data) => {
    setAdmitModalShow(true);
    setModalData(data);
  };

  const submitSchedule = (payload) => {
    dispatch(
      Actions.updateReferralRequest({
        partnerId: localStorage.getItem("partnerId"),
        customerId: payload.customerId,
        referralId: payload.referralId,
        body: payload.body,
      })
    );
  };

  const submitNoResponse = (ref) => {
    dispatch(
      Actions.updateReferralRequest({
        partnerId: localStorage.getItem("partnerId"),
        customerId: ref.customerId,
        referralId: ref.id,
        body: {
          status: "NoResponse",
        },
      })
    );
  };

  const submitAdmit = (payload) => {
    dispatch(
      Actions.updateReferralRequest({
        partnerId: localStorage.getItem("partnerId"),
        customerId: payload.customerId,
        referralId: payload.referralId,
        body: payload.body,
      })
    );
  };

  return (
    <div className="referral-list">
      <Listingheader />
      <Sidebar />
      {isLoading && <Loader />}
      <div className="listing-content">
        <div>
          <div className="d-flex justify-content-between flex-mob-wrap">
            <h2 className="form-main-title">Referrals</h2>
          </div>
          <div className="mt-24">
            <Tabs
              id="justify-tab-example"
              className="mb-3 qur-tabs"
              justify
              activeKey={tabKey}
              onSelect={handleTab}
            >
              {Object.keys(tabObj).map((tabObjKey, indexTab) => (
                <Tab
                  key={indexTab}
                  eventKey={tabObjKey}
                  title={<span> {tabObj[tabObjKey]} </span>}
                >
                  {tabObjKey === tabKey && (
                    <>
                      <div className="referral-search d-flex justify-content-end">
                        <InputGroup className="qur-search">
                          <InputGroup.Text id="basic-addon1">
                            <img src={"/images/search-icon.svg"} alt="search" />
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="By name, mobile number or ID"
                            aria-label="By name, mobile number or ID"
                            aria-describedby="basic-addon1"
                            className="left-icon-placeholder"
                          />
                        </InputGroup>
                      </div>

                      <Table striped className="qur-table mt-24">
                        <thead className="table-head dep-head">
                          <tr>
                            <th>Referral</th>
                            <th>Contact Details</th>

                            {tabObjKey === "Pending" && (
                              <>
                                <th>Request For</th>
                                <th>Created On</th>
                              </>
                            )}

                            {tabObjKey === "Scheduled" && (
                              <>
                                <th>Treatment For</th>
                                <th>Doctor name</th>
                                <th>Appointment date</th>
                              </>
                            )}

                            {tabObjKey === "Admitted" && (
                              <>
                                <th>Treatment For</th>
                                <th>Doctor name</th>
                                <th>Admission date & time</th>
                              </>
                            )}

                            {tabObjKey === "Discharged" && (
                              <>
                                <th>Discharge date & time</th>
                                <th>Final Bill Amount(in Rs)</th>
                                <th>Qurfy commission @10%(in Rs.)</th>
                                <th>Commission Paid</th>
                              </>
                            )}

                            {tabObjKey === "NoResponse" && (
                              <>
                                <th>Request For</th>
                                <th>Appointment Date</th>
                                <th>Created On</th>
                              </>
                            )}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReferral.map((ref, i) => (
                            <tr key={i}>
                              <td>
                                {ref?.customerName}{" "}
                                <Badge className="ml-8 badge-purple">
                                  • New
                                </Badge>
                                <br />{" "}
                                <span className="text-grey fs-12">
                                  {ref.id}
                                </span>
                              </td>

                              <td>
                                {ref?.customerPhoneNumber} <br />{" "}
                                <span className="text-grey fs-12">
                                  {ref?.customerEmail}
                                </span>{" "}
                              </td>

                              {[
                                "Pending",
                                "Scheduled",
                                "Admitted",
                                "NoResponse",
                              ].includes(tabObjKey) && (
                                <>
                                  <td>
                                    {ref?.referringProcedure} <br />{" "}
                                    <span className="text-grey fs-12">
                                      {ref?.referringDepartment}
                                    </span>
                                  </td>
                                </>
                              )}

                              {tabObjKey === "Pending" && (
                                <>
                                  <td>
                                    {/* 25 Sep, 2022 <br />{" "}
                                    <span className="text-grey fs-12">
                                      04:35 PM
                                    </span> */}
                                    <span className="text-grey fs-12">
                                      {ref?.created}
                                    </span>
                                  </td>
                                </>
                              )}

                              {tabObjKey === "Scheduled" && (
                                <>
                                  <td>{ref?.appointmentDoctorName}</td>
                                  <td>{ref?.appointmentDate}</td>
                                </>
                              )}

                              {tabObjKey === "Admitted" && (
                                <>
                                  <td>{ref?.appointmentDoctorName}</td>
                                  <td>{ref?.admissionDate}</td>
                                </>
                              )}

                              {tabObjKey === "Discharged" && (
                                <>
                                  <td>
                                    {/* 25 Sep, 2022 <br />{" "}
                                    <span className="fs-12 text-grey">
                                      {" "}
                                      04:35 PM
                                    </span> */}
                                    {ref?.dischargeDate}
                                  </td>
                                  <td>{ref?.finalBillAmount}</td>
                                  <td>2,000</td>
                                  <td>
                                    <img
                                      src={"/images/qurfy-accept.svg"}
                                      alt="comission-paid"
                                    />
                                    <img
                                      src={"/images/qurfy-cancel.svg"}
                                      alt="comission-pending"
                                    />
                                  </td>
                                </>
                              )}

                              {tabObjKey === "NoResponse" && (
                                <>
                                  <td>
                                    {/* 25 Sep, 2022 <br />{" "}
                                    <span className="text-grey fs-12">
                                      04:35 PM
                                    </span> */}
                                    {ref?.appointmentDate}
                                  </td>
                                  <td>
                                    {/* 25 Sep, 2022 <br />{" "}
                                    <span className="text-grey fs-12">
                                      04:35 PM
                                    </span> */}
                                    {ref?.created}
                                  </td>
                                </>
                              )}

                              {tabObjKey !== "Discharged" && (
                                <td>
                                  <div className="d-flex justify-content-end">
                                    <DropdownButton
                                      as={ButtonGroup}
                                      key={i}
                                      id={`dropdown-button-drop-${i}`}
                                      drop={"start"}
                                      variant="secondary"
                                      autoClose="outside"
                                      title={
                                        <div className="action-btn-block">
                                          <Button className="d-flex align-items-center btn action-btn">
                                            <img
                                              className="thumbnail-image"
                                              src={
                                                "/images/dropdown-toggle.svg"
                                              }
                                              alt="drop-toggle"
                                            />
                                            <p className="text-center">
                                              Action
                                            </p>
                                          </Button>
                                        </div>
                                      }
                                    >
                                      {["Pending", "NoResponse"].includes(
                                        tabObjKey
                                      ) && (
                                        <Dropdown.Item
                                          onClick={() =>
                                            handleScheduleModal(ref)
                                          }
                                        >
                                          Scheduled
                                        </Dropdown.Item>
                                      )}

                                      {tabObjKey === "Scheduled" && (
                                        <>
                                          <Dropdown.Item
                                            onClick={() =>
                                              handleAdmitModal(ref)
                                            }
                                          >
                                            Admit
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            onClick={() =>
                                              handleScheduleModal(ref)
                                            }
                                          >
                                            Rescheduled
                                          </Dropdown.Item>
                                          <Dropdown.Item>
                                            OPD Consultation
                                          </Dropdown.Item>
                                        </>
                                      )}

                                      {tabObjKey === "Admitted" && (
                                        <Dropdown.Item>
                                          <Link to="#">Discharge</Link>
                                        </Dropdown.Item>
                                      )}

                                      {["Pending", "Scheduled"].includes(
                                        tabObjKey
                                      ) && (
                                        <Dropdown.Item>
                                          <Button
                                            className="no-response"
                                            onClick={() =>
                                              submitNoResponse(ref)
                                            }
                                          >
                                            Not responding{" "}
                                          </Button>
                                        </Dropdown.Item>
                                      )}

                                      {tabObjKey === "NoResponse" && (
                                        <>
                                          <Dropdown.Item
                                            onClick={() =>
                                              handleAdmitModal(ref)
                                            }
                                          >
                                            Admit
                                          </Dropdown.Item>
                                          <Dropdown.Item>Delete</Dropdown.Item>
                                        </>
                                      )}
                                    </DropdownButton>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {/* <div className="Dr-list-pagination ref-pagination">
                        <div className="Dr-list">
                          <Pagination>
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Item active={true}>{3}</Pagination.Item>
                            <Pagination.Next />
                          </Pagination>
                        </div>
                      </div> */}
                    </>
                  )}
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div>

      {scheduleModalShow && (
        <Scheduled
          modalShow={scheduleModalShow}
          data={modalData}
          toggleModal={() => setScheduleModalShow(!scheduleModalShow)}
          submitSchedule={submitSchedule}
        />
      )}

      {admitModalShow && (
        <Admit
          modalShow={admitModalShow}
          data={modalData}
          toggleModal={() => setAdmitModalShow(!admitModalShow)}
          submitAdmit={submitAdmit}
        />
      )}

      <Toaster
        show={toasterData?.show}
        message={toasterData?.message}
        setToasterData={setToasterData}
      />
    </div>
  );
}

export default ReferralListing;

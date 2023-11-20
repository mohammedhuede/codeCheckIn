import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Row, Col, Dropdown, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useDispatch, useSelector } from "react-redux";

import { Actions } from "../../../Redux/Actions";

function Scheduled(props) {
  const [input, setInput] = useState({
    appointmentDate: "",
    appointmentDoctorId: "",
    appointmentDoctorName: "",
    selectedDoctor: {
      label: "",
      value: "",
    },
  });
  const [doctorList, setDoctorList] = useState([]);

  const dispatch = useDispatch();
  const { allDoctorsFromDeptData } = useSelector(
    (state) => state.HospitalDetails
  );

  const {
    customerName,
    referringProcedure,
    referringDepartment,
    appointmentDoctorId,
    customerId,
    id,
  } = props?.data || {};
  const { modalShow, toggleModal, submitSchedule } = props;

  useEffect(() => {
    dispatch(
      Actions.getAllDoctorsFromDeptRequest({
        partnerId: localStorage.getItem("partnerId"),
      })
    );
  }, []);

  useEffect(() => {
    if (allDoctorsFromDeptData.length) {
      const doctorOptions = allDoctorsFromDeptData.map((doc) =>
        Object.assign({}, { label: doc.name, value: doc.id })
      );

      if (appointmentDoctorId) {
        const selectedDoctor = allDoctorsFromDeptData.find(
          (doc) => doc.id === appointmentDoctorId
        );

        setInput({
          ...input,
          appointmentDoctorName: selectedDoctor.name,
          appointmentDoctorId: selectedDoctor.id,
          selectedDoctor: {
            label: selectedDoctor.name,
            value: selectedDoctor.id,
          },
        });
      }

      setDoctorList(doctorOptions);
    }
  }, [allDoctorsFromDeptData]);

  const handleDateTime = (e) => {
    setInput({
      ...input,
      appointmentDate: e.toISOString(),
    });
  };

  const handleDocChange = (e, selectedDoctor) => {
    setInput({
      ...input,
      appointmentDoctorName: selectedDoctor.label,
      appointmentDoctorId: selectedDoctor.value,
      selectedDoctor: {
        label: selectedDoctor.label,
        value: selectedDoctor.value,
      },
    });
  };

  const submitForm = () => {
    const { appointmentDoctorName, appointmentDoctorId, appointmentDate } =
      input;
    const payload = {
      body: {
        appointmentDoctorName,
        appointmentDoctorId,
        appointmentDate,
        status: "Scheduled",
      },
      customerId,
      referralId: id,
    };

    submitSchedule(payload);
    toggleModal();
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={toggleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="qur-modal scheduled"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schedule an appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="no-padding">
          <div className="px-12">
            <Row className="grey-card">
              <Col className="pl-24 pr-0 pl-mob-24">
                <p className="fs-12">
                  <span className="font-bold text-grey">Referral </span> -
                  {customerName}{" "}
                </p>
              </Col>
              <Col className="p-0 text-grey-brdr">
                <p className="pl-16 fs-12">
                  <span className="font-bold text-grey">Request for </span> -
                  {`${referringDepartment} (${referringProcedure})`}{" "}
                </p>
              </Col>
            </Row>
          </div>
          <div className="mt-24 px-4 mb-24 px-mob-4">
            <Row>
              <Col xs="12" xl="6">
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      label="Appointment Date & Time"
                      value={input.appointmentDate}
                      onChange={handleDateTime}
                    />
                  </LocalizationProvider>
                </div>
              </Col>
              <Col xs="12" xl="6">
                <div className=" mt-mob-16  ">
                  <p className="form-label">
                    Doctor Name <span className="required">*</span>
                  </p>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    className="autocomplete"
                    options={doctorList}
                    value={input.selectedDoctor}
                    onChange={handleDocChange}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select doctor" />
                    )}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary btn-lg" onClick={toggleModal}>
            Cancel
          </Button>
          <Button className="btn btn-primary btn-lg" onClick={submitForm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Scheduled;

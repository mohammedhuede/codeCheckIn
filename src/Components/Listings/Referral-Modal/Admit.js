import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Dropdown, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function Admit(props) {
  const [input, setInput] = useState({
    ipNumber: "",
    admissionDate: "",
  });

  const { customerId, id } = props?.data || {};
  const { modalShow, toggleModal, submitAdmit } = props;

  const handleDateTime = (e) => {
    setInput({
      ...input,
      admissionDate: e.toISOString(),
    });
  };

  const submitForm = () => {
    const { ipNumber, admissionDate } = input;
    const payload = {
      body: {
        ipNumber,
        admissionDate,
        status: "Admitted",
      },
      customerId,
      referralId: id,
    };

    submitAdmit(payload);
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
            Admit the patient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="no-padding">
          <div className="mt-24 px-4 mb-24">
            <Row>
              <Col xs="12" xl="6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Admission Date & Time"
                    value={input.admissionDate}
                    onChange={handleDateTime}
                  />
                </LocalizationProvider>
              </Col>
              <Col xs="12" xl="6" className="mt-mob-16">
                <div className="">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      IP Number <span className="required">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter IP number "
                      value={input.ipNumber}
                      onChange={(e) =>
                        setInput({ ...input, ipNumber: e.target.value })
                      }
                    />
                  </Form.Group>
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

export default Admit;

import React from 'react';
import Modal from 'react-bootstrap/Modal';

function Drdetail(props) {
  return (
    <Modal
      {...props}
      size="lg"
      className='dr-detail'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.doctor?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='dr-detail-body qur-scroll'>
        <h5 className='fs-16 font-medium text-dark'>Treatments</h5>
        <div class="mt-12">
          {Array.isArray(props.doctor?.treatments) && props.doctor.treatments?.length ? props.doctor.treatments?.map((el, i) => {
            return (
              <span class="badge bg-light" key={i}>{el.label}</span>
            )
          }): null}

        </div>

        <h5 className='fs-16 font-medium text-dark mt-24'>Overview</h5>
        <div class="mt-12">
          {props.doctor?.overview}
   
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Drdetail;
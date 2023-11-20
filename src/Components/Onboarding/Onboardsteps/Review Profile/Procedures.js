import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import HospitalImageGallery from './HospitalImageGallery';

const inclusionsOptions = ["Doctor consultancy", "Lab & Pharmacy", "Neurosurgery"]
function Procedures({ procedures }) {
  
    return (
        <div className=''>
            <Row className='mt-24'>
                {Array.isArray(procedures) && procedures?.length && procedures?.map((procedure, i) => {
                    return (
                        <Col xs={4} className="pl-0 pr-24" key={i}>
                            <div className='white-card p-0 mb-24    '>
                                <div className='ac-block px-4 pt-16'>
                                    <div className='d-flex'>
                                        <div className='procedure-gallery'>
                                            <HospitalImageGallery></HospitalImageGallery>
                                        </div>
                                        <div className='ml-12'>
                                            <h4 className='font-bold fs-18'>{procedure.procedure}</h4>
                                            <p className='mt-4'>{procedure.department}</p>
                                            <p className='font-bold fs-16 mt-16'>{procedure.consultationCharge}/-</p>
                                        </div>
                                    </div>
                                    <p className='mt-16 text-grey'>{procedure.description}</p>
                                </div>
                                <div className='service-block'>
                                    {procedure?.inclusions?.length &&
                                        <> <h5 className='text-small-bold'>Inclusions</h5>
                                            <div className='mt-8'>
                                                {procedure?.inclusions?.map((inclusion, j) => {
                                                    return (
                                                        <Badge key={j} bg="light" className='mr-4 mb-4'>
                                                            {inclusion}
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </Col>
                    )
                })}
                
            </Row>
            {/* <div className='empty-state text-center mt-120'>
               <img src={"/images/emptyicon.svg"} />
               <p className='fs-16 font-medium'>No Procedures Found  </p>
          </div> */}
        </div>
    );
}

export default Procedures;
import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

function Wards({ wardsBeds, totalWards }) {


    return (
        <div className=''>
            <Row className='mt-24'>
                {wardsBeds?.length > 0 && wardsBeds?.map((el, i) => {
                    return (
                        <Col xs={4} md={6} sm={6} className="pl-0 pr-24" key={i}>
                            <div className='white-card p-0 mb-24'>
                                <div className='title-card'>
                                    <h4>{el.roomType}</h4>
                                </div>
                                <div className='ac-block px-4 py-3'>
                                    <Row>
                                        <Col xs={6} className="mb-16">

                                            <span className='text-bold fs-16'>{el.roomType === "ICU" ? "Non Ventilator" : "Non AC"} </span>
                                        </Col>
                                        <Col xs={6}>
                                            <div className='d-flex'>
                                                <h5 className='bed-counting pr-16'>{el.nonACBedCount}<span className='small-grey-text'>Beds</span></h5>
                                                <h5 className='bed-counting pl-16 text-grey-brdr'>{el.nonACBedPrice}/-<span className='small-grey-text'>per day</span></h5>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <span className='text-bold fs-16'> {el.roomType === "ICU" ? "Ventilator" : "AC"} </span>
                                        </Col>
                                        <Col xs={6}>
                                            <div className='d-flex'>
                                                <h5 className='bed-counting pr-16'>{el.acBedCount}<span className='small-grey-text'>Beds</span></h5>
                                                <h5 className='bed-counting pl-16 text-grey-brdr'>{el.acBedPrice}/-<span className='small-grey-text'>per day</span></h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='service-block'>
                                    <h5 className='text-small-bold'>Inclusions</h5>
                                    <div className='mt-8'>
                                        {el.inclusions?.length > 0 && el.inclusions.map((inclusion, j) => {
                                            return (<Badge bg="light" className='mr-4 mb-4' key={j}>
                                                {inclusion}
                                            </Badge>)
                                        })}

                                    </div>

                                </div>
                            </div>
                        </Col>)
                })}
            </Row>
        </div>
    );
}

export default Wards;
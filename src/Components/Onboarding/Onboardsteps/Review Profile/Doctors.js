import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Drdetail from '../../../modals/Drdetail';
import { inclusionsOptionsForStep5 as inclusionsOptions } from '../../../../constants/constants';
import { Example } from '../../../Listings/Drdetail';

function Doctors({ doctors }) {

    const [modalShow, setModalShow] = React.useState(false);
    const [doctorViewMoreDetails, setDoctorViewMoreDetails] = React.useState({});

    const inclusions = (doctor) => {
        let arr = inclusionsOptions.filter(obj => doctor[obj.value])
        return arr
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

    return (

        <div className='' >
            <Row className='mt-24'>
                {doctors?.length && doctors?.map((doctor, i) => {
                    return (
                        <Col xs={6} className="pl-0 pr-24" key={i}>
                            <div className='white-card p-0 mb-24'>
                                <div className='ac-block px-4 py-3'>
                                    <div className='flex-between'>
                                        <div className='d-flex'>
                                            <img className='replace-img' src={doctor?.docImageUrl.length > 0 ? doctor?.docImageUrl : "/images/dr-empty-state-image.svg" } alt='doc'/>
                                            <div className='ml-12'>
                                                <h4 className='font-bold fs-18'>{doctor.name}</h4>
                                                <p className='mt-4'>{getQualification(doctor.qualification)}</p>
                                                <p className='mt-4'>{doctor.experience} experience</p>
                                            </div>
                                        </div>
                                        <div className='d-flex'>
                                            {
                                                Array.isArray(inclusions(doctor)) && inclusions(doctor).length ? inclusions(doctor).map((inc, l) => {
                                                    return (
                                                        <div key={l}>
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
                                                                    <Button className='btn-tertiary ml-16'><img src={`/images/${inc.value}.svg`} alt='inclusion' /></Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </div>
                                                    )
                                                }) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='service-block'>
                                    <Example doc={doctor} inclusions={inclusions(doctor)}>
                                        <Button className='btn-tertiary btn text-cap p-0'>
                                            View More Details
                                        </Button>
                                    </Example>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <Drdetail
                show={modalShow}
                onHide={() => setModalShow(false)}
                doctor={doctorViewMoreDetails}
            />
        </div >
    );
}

export default Doctors;
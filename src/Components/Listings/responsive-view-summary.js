import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className="me-2 btn-tertiary w-100 mt-16">
                View Summary
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header className='pb-0' closeButton>
                    <Offcanvas.Title>
                        <div className='flex-align-center'>
                            <img src={"/images/summary.svg"} />
                            <h4 className='font-semi-bold fs-18 ml-12'>Summary</h4>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

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
                    <div className='flex-align-center mt-24 mb-16'>
                        <img src={'/images/date-range.svg'} />
                        <div className='ml-12'>
                            <p className='fs-12 text-grey'>Created On</p>
                            <p className='fs-14'>22 Sept, 2022  |  05:12 PM</p>
                        </div>
                    </div>
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
                    <div className='flex-align-center mt-16 mb-16'>
                        <img src={'/images/admission-date.svg'} />
                        <div className='ml-12'>
                            <p className='fs-12 text-grey'>Admission  Date & Time</p>
                            <p className='fs-14'>22 Sept, 2022  |  05:12 PM</p>
                        </div>
                    </div>
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
                    <div className='flex-align-center mt-16 mb-16'>
                        <img src={'/images/discharge.svg'} />
                        <div className='ml-12'>
                            <p className='fs-12 text-grey'>Discharge Date & Time</p>
                            <p className='fs-14'>22 Sept, 2022  |  05:12 PM</p>
                        </div>
                    </div>
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
                    <div className='flex-align-center mt-16'>
                        <img src={'/images/dr-img.svg'} />
                        <div className='ml-12'>
                            <p className='fs-12 text-grey'>Consultant Doctor</p>
                            <p className='fs-14'>Dr. Bhagwan Swaroop Gupta </p>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function Viewsummary() {
    return (
        <>
            {['bottom'].map((placement, idx) => (
                <OffCanvasExample key={idx} placement={placement} name={placement} />
            ))}
        </>
    );
}

export default Viewsummary;
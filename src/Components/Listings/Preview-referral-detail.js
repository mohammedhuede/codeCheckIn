import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { Link, } from 'react-router-dom';
import Listingheader from '../Listings/listing-header';
import { Button, Col, Container, Row } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Sidebar from './Sidebar';
import { Dropdown, Form } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FinalBill from './Referral-Modal/FinalBill';

function PreviewReferralDetail() {
    const [FinalBillModalShow, setFinalBillModalShow] = React.useState(false);
    return (

        <div className='referral-list discharge-patient'>
            <Listingheader></Listingheader>
            <Sidebar></Sidebar>
            <div className='listing-content'>
                <div className="flex-between-center">
                    <div className='flex-align-center'>
                        <img src={"/images/arrow-back.svg"} className="pr-16" />
                        <div>
                            <h4 className="text-bold fs-16">Preview Referral Details</h4>
                            <div className='flex-align-center patient-detail'>
                                <span><PersonIcon className='mr-4' /> </span>  Burhanuddin Baroor <span className='ml-8 mr-8'> | </span> <span><LocalPhoneIcon className='mr-4' /> </span>  7477075253  <span className='ml-8 mr-8'> | </span> <span><EmailIcon className='mr-4' /> </span>  burhanuddinbaroor5253@gmail.com
                            </div>
                        </div>
                    </div>
                    <Button type='submit' className='btn btn-primary btn-lg mt-16'>Save</Button>
                </div>
                <div className="p-4 mt-32">
                    <Row>
                    <Col xs={12} xl={4}>
                            <div className='white-card-default summary-card mob-summary-card'>
                                <div className='flex-align-center mb-16'>
                                    <img src={"/images/summary.svg"} />
                                    <h4 className='font-semi-bold fs-18 ml-12'>Summary</h4>
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
                                <div className='flex-align-center mt-24 mb-16'>
                                    <img src={'/images/ref-id.svg'} />
                                    <div className='ml-12'>
                                        <p className='fs-12 text-grey'>Referral ID</p>
                                        <p className='fs-14'>REF0984532</p>
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
                                    <img src={'/images/ref-id.svg'} />
                                    <div className='ml-12'>
                                        <p className='fs-12 text-grey'>In Patient Number (IP Number)</p>
                                        <p className='fs-14'>145236579</p>
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
                                    <img src={'/images/calendar.svg'} />
                                    <div className='ml-12'>
                                        <p className='fs-12 text-grey'>Created On</p>
                                        <p className='fs-14'>25 Sep, 2022 |  04:35 PM</p>
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
                                    <img src={'/images/calendar.svg'} />
                                    <div className='ml-12'>
                                        <p className='fs-12 text-grey'>Appointment Date & Time</p>
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
                                    <img src={'/images/calendar.svg'} />
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
                                    <img src={'/images/calendar.svg'} />
                                    <div className='ml-12'>
                                        <p className='fs-12 text-grey'>Department</p>
                                        <p className='fs-14'>Endocrinology</p>
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
                            </div>
                        </Col>
                        <Col xs={12} xl={8}>
                            <h3 className='fs-18 font-semi-bold'>Upload commision fee reciept</h3>
                            <div className='form-group mt-16'>
                                <div className='form-upload text-left'>
                                    <input type='file' accept="image/*" />
                                    <div className='form-upload-group'>
                                        <div className='upload-title flex-between-center'>
                                            <div className='flex-align-center'>
                                                <img src={"/images/upload-file.svg"} />
                                                <div className='ml-12'>
                                                    <a href='#' class="upload-link">Drag and drop documents to upload</a>
                                                    <p>or browse from your files</p>
                                                    <input type='file' accept="image/*" />
                                                </div>
                                            </div>
                                            <Button variant="secondary" className="btn-sm mt-12">Select file</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='light-grey-bg p-3 mt-24'>
                                <Form>
                                    <Row>
                                        <Col xs={6}>
                                            <p className='fs-16'>Rs 15,000</p>
                                            <p className='fs-14'>Final Bill Amount</p>
                                        </Col>
                                        <Col xs={6}>
                                            <p className='fs-16'>Rs 2,000 @10%</p>
                                            <p className='fs-14'>Commision fees</p>
                                        </Col>
                                        <Col xs={12} xl={6} className='mt-16'>
                                            <Form.Label>{`Final Bill Amount `} <span className="required"> *</span></Form.Label>

                                            <div className="upload-card mt-12">
                                                <a target='_blank' rel='noopener noreferrer'>
                                                    <div className="flex-align-center">
                                                        <img src={"/images/reciept.svg"} alt='fileType' />
                                                        <FinalBill
                                                            show={FinalBillModalShow}
                                                            onHide={() => setFinalBillModalShow(false)}
                                                        />
                                                        {/* <p className="fs-14 ml-12">frontview.jpeg</p> */}
                                                    </div>
                                                </a>
                                                <Button className="btn-no-brdr ml-80"><img src={"/images/delete-icon.svg"} alt='delete' /></Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='mt-24'>
                                        <p className='fs-10 text-grey'>Notes</p>
                                        <p className='fs-14 mt-4'>The half payment was done via online platform - GPay amd other half was given in cash. </p>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default PreviewReferralDetail;
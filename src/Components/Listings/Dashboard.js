import Nav from 'react-bootstrap/Nav';
import { Link, } from 'react-router-dom';
import Listingheader from '../Listings/listing-header';
import { Button, Container, Row, Col, Form, Tab, Tabs } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Sidebar from './Sidebar';


function Listingdashboard() {

  document.body.classList.add('dashboard-bg');

  return (

    <div className='referral-list'>
      <Listingheader></Listingheader>
      <Sidebar></Sidebar>
      <div className='listing-content dashboard'>
        <div className='dash-header bg-light-purple'>
          <h4>Referral Overview</h4>
          <Row className='mt-16'>
            <Col>
              <div className='dash-white-card mb-mob-16'>
                <div className='flex-align-center'>
                  <img src={"/images/new-referral.svg"} />
                  <div className='ml-16'>
                    <h3 className='fs-20'>2</h3>
                    <p className='text-grey fs-16'>New Referrals</p>
                  </div>
                </div>
                <img src={"/images/card-open-chevron.svg"} />
              </div>
            </Col>
            <Col>
              <div className='dash-white-card mb-mob-16'>
                <div className='flex-align-center'>
                  <img src={"/images/appointment.svg"} />
                  <div className='ml-16'>
                    <h3 className='fs-20'>2</h3>
                    <p className='text-grey fs-16'>Appointments Scheduled</p>
                  </div>
                </div>
                <img src={"/images/card-open-chevron.svg"} />
              </div>
            </Col>
            <Col>
              <div className='dash-white-card'>
                <div className='flex-align-center'>
                  <img src={"/images/admitted.svg"} />
                  <div className='ml-16'>
                    <h3 className='fs-20'>2</h3>
                    <p className='text-grey fs-16'>Admitted</p>
                  </div>
                </div>
                <img src={"/images/card-open-chevron.svg"} />
              </div>
            </Col>
          </Row>
        </div>
        <div className='dash-content'>
          <Row>
            <Col xs={12} xl={8}>
              <div className='dash-white-default p-0 mt-32'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row className='align-items-center p-3  x'>
                    <Col xs={12} xl={6}>
                      <h3 className='fs-16'>Profile Summary</h3>
                    </Col>
                    <Col xs={12} xl={6} className='d-flex justify-content-end  mob-flex-start mt-mob-16'>
                      <Nav variant="pills" className='qur-pills'>
                        <Nav.Item>
                          <Nav.Link eventKey="first">Last Week</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">1M</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">6M</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="fourth">1Y</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <hr className='dash-devider m-0'></hr>

                  <div className='p-3'>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col xs={12} xl={4}>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>144</h4>
                              <p className='fs-12 text-grey'>People viewed your profile</p>
                            </div>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>9</h4>
                              <p className='fs-12 text-grey'>Appeared in search results</p>
                            </div>
                            <div className='lightgreen-block'>
                              <h4 className='fs-21'>5</h4>
                              <p className='fs-12 text-grey'>Average daily visits</p>
                            </div>
                          </Col>
                          <Col xs={12} xl={8}>
                            <img src={"/images/pie-chart.svg"} className="img-fluid mt-mob-16" />
                            {/* Empty state when there are no data */}

                            {/* <div className='d-flex justify-content-center align-items-center h-100'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                            {/* Empty state when there are no data */}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          <Col xs={12} xl={4}>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>144</h4>
                              <p className='fs-12 text-grey'>People viewed your profile</p>
                            </div>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>9</h4>
                              <p className='fs-12 text-grey'>Appeared in search results</p>
                            </div>
                            <div className='lightgreen-block'>
                              <h4 className='fs-21'>5</h4>
                              <p className='fs-12 text-grey'>Average daily visits</p>
                            </div>
                          </Col>
                          <Col xs={12} xl={8}>
                            <img src={"/images/pie-chart.svg"} className="img-fluid mt-mob-16" />
                            {/* Empty state when there are no data */}

                            {/* <div className='d-flex justify-content-center align-items-center h-100'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                            {/* Empty state when there are no data */}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          <Col xs={12} xl={4}>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>144</h4>
                              <p className='fs-12 text-grey'>People viewed your profile</p>
                            </div>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>9</h4>
                              <p className='fs-12 text-grey'>Appeared in search results</p>
                            </div>
                            <div className='lightgreen-block'>
                              <h4 className='fs-21'>5</h4>
                              <p className='fs-12 text-grey'>Average daily visits</p>
                            </div>
                          </Col>
                          <Col xs={12} xl={8}>
                            <img src={"/images/pie-chart.svg"} className="img-fluid mt-mob-16" />
                            {/* Empty state when there are no data */}

                            {/* <div className='d-flex justify-content-center align-items-center h-100'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                            {/* Empty state when there are no data */}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <Row>
                          <Col xs={12} xl={4}>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>144</h4>
                              <p className='fs-12 text-grey'>People viewed your profile</p>
                            </div>
                            <div className='lightgreen-block mb-16'>
                              <h4 className='fs-21'>9</h4>
                              <p className='fs-12 text-grey'>Appeared in search results</p>
                            </div>
                            <div className='lightgreen-block'>
                              <h4 className='fs-21'>5</h4>
                              <p className='fs-12 text-grey'>Average daily visits</p>
                            </div>
                          </Col>
                          <Col xs={12} xl={8}>
                            <img src={"/images/pie-chart.svg"} className="img-fluid mt-mob-16" />

                            {/* Empty state when there are no data */}

                            {/* <div className='d-flex justify-content-center align-items-center h-100'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                            {/* Empty state when there are no data */}

                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
              <div className='dash-white-default p-0 mt-24'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="Today">
                  <Row className='align-items-center p-3'>
                    <Col xs={12} xl={6}>
                      <h3 className='fs-16'>Revenue Statistics</h3>
                    </Col>
                    <Col xs={12} xl={6} className='d-flex justify-content-end mt-mob-16'>
                      <Nav variant="pills" className='qur-pills'>
                        <Nav.Item>
                          <Nav.Link eventKey="Today">Today</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="Yesterday">Yesterday</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="Lastweek">Last Week</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mt-mob-16'>
                          <Nav.Link eventKey="1M">1M</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mt-mob-16'>
                          <Nav.Link eventKey="6M">6M</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <hr className='dash-devider m-0'></hr>
                  <div>
                    <Tab.Content>
                      <Tab.Pane eventKey="Today">
                        <div className='total-dash-block d-flex align-items-center'>
                          <img src={"/images/rupee.svg"} className="img-fluid" />
                          <h3 className='fs-20 ml-8'>Total: Rs. 5,21,768</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/total-revenue.svg"} className="img-fluid" />

                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Yesterday">
                        <div className='total-dash-block d-flex align-items-center'>
                          <img src={"/images/rupee.svg"} className="img-fluid" />
                          <h3 className='fs-20 ml-8'>Total: Rs. 5,21,768</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/total-revenue.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Lastweek">
                        <div className='total-dash-block d-flex align-items-center'>
                          <img src={"/images/rupee.svg"} className="img-fluid" />
                          <h3 className='fs-20 ml-8'>Total: Rs. 5,21,768</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/total-revenue.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="1M">
                        <div className='total-dash-block d-flex align-items-center'>
                          <img src={"/images/rupee.svg"} className="img-fluid" />
                          <h3 className='fs-20 ml-8'>Total: Rs. 5,21,768</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/total-revenue.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="6M">
                        <div className='total-dash-block d-flex align-items-center'>
                          <img src={"/images/rupee.svg"} className="img-fluid" />
                          <h3 className='fs-20 ml-8'>Total: Rs. 5,21,768</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/total-revenue.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
              <div className='dash-white-default p-0 mt-24'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="deplastweek">
                  <Row className='align-items-center p-3'>
                    <Col xs={12} xl={6}>
                      <h3 className='fs-16'>Appointment by Departments</h3>
                    </Col>
                    <Col xs={12} xl={6} className='d-flex justify-content-end mob-flex-start mt-mob-16'>
                      <Nav variant="pills" className='qur-pills'>
                        <Nav.Item>
                          <Nav.Link eventKey="deplastweek">Last Week</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="dep1m">1M</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="dep6m">6M</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="dep1y">1Y</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <hr className='dash-devider m-0'></hr>

                  <div>
                    <Tab.Content>
                      <Tab.Pane eventKey="deplastweek">
                        <div className='total-dash-block flex-align-center'>
                          <h3 className='fs-20 ml-8'>Total appointment : 53</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/dep-appointment.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="dep1m">
                        <div className='total-dash-block flex-align-center'>
                          <h3 className='fs-20 ml-8'>Total appointment : 53</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/dep-appointment.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="dep6m">
                        <div className='total-dash-block flex-align-center'>
                          <h3 className='fs-20 ml-8'>Total appointment : 53</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/dep-appointment.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="dep1y">
                        <div className='total-dash-block flex-align-center'>
                          <h3 className='fs-20 ml-8'>Total appointment : 53</h3>
                        </div>
                        <hr className='dash-devider m-0'></hr>
                        <div className='p-3'>
                          <img src={"/images/dep-appointment.svg"} className="img-fluid" />
                          {/* Empty state when there are no data */}

                          {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                              <div className='text-center'>
                                <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                                <h4 className='fs-12 mt-16'>No Data Available</h4>
                                <p className='fs-10 text-grey'>Track your profile view growth</p>
                              </div>
                            </div> */}

                          {/* Empty state when there are no data */}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </Col>
            <Col xs={12} xl={4}>
              <div className='dash-white-default p-0 mt-32'>
                <div className='brdr-bttm p-3'>
                  <h3 className='fs-14 text-prim'>Update current beds availability</h3>
                </div>
                <Row className='px-12'>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                        label="AC"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                        label="AC"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <p className='fs-12 text-grey'>General ward</p>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <p className='fs-12 text-grey'>Semi-Private</p>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right flex-center py-18">
                    <p className='fs-12 text-grey'>Privat e Ward</p>
                  </Col>
                  <Col xs={4} className="brdr-right flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                </Row>
              </div>
              <div className='dash-white-default p-0 mt-24'>
                <Row className='px-12'>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <p className='fs-12 text-grey'>ICU</p>
                  </Col>
                  <Col xs={8} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right brdr-bttm flex-center py-18">
                    <p className='fs-12 text-grey'>PICU</p>
                  </Col>
                  <Col xs={8} className="brdr-right brdr-bttm flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                  <Col xs={4} className="brdr-right flex-center py-18">
                    <p className='fs-12 text-grey'>NICU</p>
                  </Col>
                  <Col xs={8} className="brdr-right flex-center py-18">
                    <Form>
                      <Form.Check
                        type="switch"
                        className="qur-switch"
                        id="disabled-custom-switch"
                      />
                    </Form>
                  </Col>
                </Row>
              </div>
              <div className='dash-white-default p-0 mt-24'>
                <div className='flex-between-center p-3 brdr-bttm'>
                  <p>Upcoming Appointments</p>
                  <Button className='btn btn-tertiary'>View More</Button>
                </div>
                {/* Empty state when there are no data */}

                {/* <div className='d-flex justify-content-center align-items-center h-100 pt-120 pb-120'>
                  <div className='text-center'>
                    <img src={"/images/dash-no-data.svg"} className="img-fluid" />
                    <h4 className='fs-12 mt-16'>No Data Available</h4>
                    <p className='fs-10 text-grey'>Track your profile view growth</p>
                  </div>
                </div> */}

                {/* Empty state when there are no data */}

                <div className='appointment-block'>
                  <div className='flex-between-center p-3 brdr-bttm'>
                    <div className='flex-align-center'>
                      <img alt='thumb' src={"/images/appointment-1.svg"} />
                      <div className='ml-12'>
                        <h4 className='fs-14'>Dr.Jel Chibuzo</h4>
                        <p className='fs-12 text-grey'>Cardiology</p>
                      </div>
                    </div>
                    <div>
                      <p className='fs-12 text-grey'>4.30 PM</p>
                      <p className='fs-12 text-grey'>12 sep 2022</p>
                    </div>
                  </div>
                  <div className='flex-between-center p-3 brdr-bttm'>
                    <div className='flex-align-center'>
                      <img alt='thumb' src={"/images/appointment-4.svg"} />
                      <div className='ml-12'>
                        <h4 className='fs-14'>Dr.Jel Chibuzo</h4>
                        <p className='fs-12 text-grey'>Cardiology</p>
                      </div>
                    </div>
                    <div>
                      <p className='fs-12 text-grey'>4.30 PM</p>
                      <p className='fs-12 text-grey'>12 sep 2022</p>
                    </div>
                  </div>
                  <div className='flex-between-center p-3 brdr-bttm'>
                    <div className='flex-align-center'>
                      <img alt='thumb' src={"/images/appointment-1.svg"} />
                      <div className='ml-12'>
                        <h4 className='fs-14'>Dr.Jel Chibuzo</h4>
                        <p className='fs-12 text-grey'>Cardiology</p>
                      </div>
                    </div>
                    <div>
                      <p className='fs-12 text-grey'>4.30 PM</p>
                      <p className='fs-12 text-grey'>12 sep 2022</p>
                    </div>
                  </div>
                  <div className='flex-between-center p-3 brdr-bttm'>
                    <div className='flex-align-center'>
                      <img alt='thumb' src={"/images/appointment-2.svg"} />
                      <div className='ml-12'>
                        <h4 className='fs-14'>Dr.Jel Chibuzo</h4>
                        <p className='fs-12 text-grey'>Cardiology</p>
                      </div>
                    </div>
                    <div>
                      <p className='fs-12 text-grey'>4.30 PM</p>
                      <p className='fs-12 text-grey'>12 sep 2022</p>
                    </div>
                  </div>
                  <div className='flex-between-center p-3'>
                    <div className='flex-align-center'>
                      <img alt='thumb' src={"/images/appointment-3.svg"} />
                      <div className='ml-12'>
                        <h4 className='fs-14'>Dr.Jel Chibuzo</h4>
                        <p className='fs-12 text-grey'>Cardiology</p>
                      </div>
                    </div>
                    <div>
                      <p className='fs-12 text-grey'>4.30 PM</p>
                      <p className='fs-12 text-grey'>12 sep 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Listingdashboard;
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

function Departments({ departments }) {
    const medicalDeptData = () => {
        let arr = departments?.length && departments?.filter(obj => obj.medical)
        return arr
    }
    const surgeryDeptData = () => {
        let arr = departments?.length && departments?.filter(obj => obj.surgery)
        return arr
    }

    return (
        <div>
            <div className='dep-sec'>
                <Tabs
                    defaultActiveKey="medical"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3 department-tab"
                >
                    {medicalDeptData()?.length && <Tab eventKey="medical" title={`Medical (${medicalDeptData()?.length})`}>
                        <Row className='p-3'>
                            {departments?.length && medicalDeptData()?.length && medicalDeptData().map((dept, i) => {
                                return (
                                    <Col xs={4} key={i}>
                                        <div className='white-card p-3 d-flex'>
                                            <img src={"/images/grey-circle.svg"} />
                                            <p className='ml-12'>{dept.name}</p>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Tab>}
                    {surgeryDeptData()?.length ?
                        (<Tab eventKey="surgical" title={`Surgical (${surgeryDeptData()?.length})`}>
                            <Row className='p-3'>
                                {departments?.length && surgeryDeptData()?.length && surgeryDeptData().map((dept, j) => {
                                    return (
                                        <Col xs={4} key={j}>
                                            <div className='white-card p-3 d-flex'>
                                                <img src={"/images/grey-circle.svg"} />
                                                <p className='ml-12'>{dept.name}</p>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Tab>)
                        : null}
                </Tabs>
            </div>
        </div>
    );
}

export default Departments;
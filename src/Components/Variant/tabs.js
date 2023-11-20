import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BedIcon from '@mui/icons-material/Bed';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Wards from '../Onboarding/Onboardsteps/Review Profile/Ward-&-Beds';

function Tabexmp() {
  return (
    <div className='p-5'>
        <Row>
            <Col xs={8}>
                <Tabs
                    defaultActiveKey="Ward-&-Beds"
                    id="justify-tab-example"
                    className="mb-3 qur-tabs"
                    justify
                    >
                    <Tab eventKey="Ward-&-Beds" title={<span> <BedIcon className="mr-8"/> Ward & Beds (147) </span>}>
                       <Wards></Wards>
                    </Tab>
                    <Tab eventKey="Departments" title={<span> <DashboardOutlinedIcon className="mr-8"/> Departments (42) </span>}>
                        <p>Tabs2</p>
                    </Tab>
                    <Tab eventKey="Procedures" title={<span> <DescriptionOutlinedIcon className="mr-8"/> Procedures (24) </span>}>
                        <p>Tabs3</p>
                    </Tab>
                    <Tab eventKey="Doctors" title={<span> <MedicalServicesOutlinedIcon className="mr-8"/> Doctors (52) </span>}>
                        <p>Tabs3</p>
                    </Tab>
                    <Tab eventKey="Insurance" title={<span> <CreditCardOutlinedIcon className="mr-8"/> Insurance (12) </span>}>
                        <p>Tabs3</p>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    </div>
  );
}

export default Tabexmp;
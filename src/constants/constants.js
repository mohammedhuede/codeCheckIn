// Base URL
export const REACT_APP_API_URL = 'https://dev.api.qurfy.com/v1.0'

export const byDefaultDepartments = [{ name: "Neurosurgery", medical: false, surgery: false }, { name: "Cardiology", medical: false, surgery: false }, { name: "Dermitology", medical: false, surgery: false },
{ name: "General Surgery", medical: false, surgery: false }, { name: "Bariatrics", medical: false, surgery: false }, { name: "Endocrinology", medical: false, surgery: false },
{ name: "Endodontics", medical: false, surgery: false }, { name: "Gynaecology", medical: false, surgery: false }, { name: "Gastroenterology", medical: false, surgery: false },
{ name: "Ophthalmology", medical: false, surgery: false }, { name: "Urology", medical: false, surgery: false }]

export const inclusionsOptions = [{ label: "Hospital Stay", value: "Hospital Stay" }, { label: "Lab", value: "Lab" }, { label: "Pharmacy", value: "Pharmacy" },
{ label: "Doctor Consultaion", value: "Doctor Consultaion" }, { label: "Surgeon Charges", value: "Surgeon Charges" }, { label: "Anesthetist Charges", value: "Anesthetist Charges" }, 
{ label: "OT Charges", value: "OT Charges" },]

export const wardTypes = ['General Ward', 'Shared Room', 'Single Room', 'ICU', 'PICU', 'NICU']
export const listOfAllWards = wardTypes.map(ward => ({
    roomType: ward, nonACBedCount: '', nonACBedPrice: '', acBedCount: '', acBedPrice: '',
    inclusions: []
}))
export const inclusionsOptionsForStepFour = ['Room Keeping', 'Nurse Availability', 'Pharmacy', 'Video consultation']

// step 5
export const doctorInfoSample = {
    name: '', registrationNumber: '', qualification: [], department: [], experience: '', designation: '', treatments: [],
    overview: '', audioVideo: false, hospitalVisit: false, homeVisit: false, freeConsultation: false,
}

export const inclusionsOptionsForStep5 = [{ label: "Audio/Video", value: "audioVideo" }, { label: "Free Consultation", value: "freeConsultation" }, { label: "Home Visit", value: "homeVisit" },
{ label: "Hospital Visit", value: "hospitalVisit" },]

export const qualifications = [{ label: 'MBBS', value: 'MBBS' }, { label: 'MD', value: 'MD' }, { label: 'BPT', value: 'BPT' }]

export const generalAmenities = [{ label: 'WiFi', value: 'wifi' }, { label: 'Canteen/Cafetaria', value: 'canteen' }, { label: 'Ambulance for pickup/dropoff', value: 'ambulancePickup' }]
export const roomAmenities = [{ label: 'Refrigerator in Room', value: 'refrigeratorInRoom' }, { label: 'Hot water supply', value: 'hotwaterSupply' }, { label: 'TV', value: 'tv' }, { label: 'Free Food for Patient', value: 'freeFoodForPatient' }]

export const sampleReqBody = { 'wifi': false, 'canteen': false, 'ambulancePickup': false, 'refrigeratorInRoom': false, 'hotwaterSupply': false, 'tv': false, 'freeFoodForPatient': false }

export const insuranceListSample = ['Aditya Birla', 'AarogyaSri', 'Bajaj Allianz', 'Bharti AXA', 'Care', 'Cholamandalam', 'Digit', 'Edelweiss', 'Kotak Mahindra', 'Liberty', 'Max Bupa', 'ManipalCigna',
    'New India Assurance', 'Oriental', 'Raheja QuBE', 'Royal Sundaram', 'Star', 'SBI', 'Tata AIG', 'United India', 'Future Generali', 'IFFCO Tokio', 'National', 'Reliance', 'Universal Sompo']

export const amenitiesSample = [{ label: 'TV', value: 'tv' }, { label: 'Refrigerator in room', value: 'refrigeratorInRoom' },
{ label: 'Canteen/Cafetaria', value: 'canteen' }, { label: 'Free food for patients', value: 'freeFoodForPatient' }, { label: 'Wifi', value: 'wifi' },
{ label: 'Hot water supply', value: 'hotwaterSupply' }, { label: 'Ambulance for pickup/dropoff', value: 'ambulancePickup' }]

// step 8
export const rolesSample = [{ label: 'Admin', value: 'Admin' }, { label: 'Super Admin', value: 'Super Admin' }, { label: 'Manager', value: 'Manager' }]
export const adminDetailsSample = { adminName: '', email: '', phoneNumber: '' } // Timezone issue

// review > insurances
export const reviewInsuranceListSample = [{ img: 'aditya-birla', label: 'Aditya Birla' }, { img: 'aarogyaSri', label: 'AarogyaSri' },
{ img: 'bajaj-Allianz', label: 'Bajaj Allianz' }, { img: 'bharti-axa', label: 'Bharti AXA' }, { img: 'care', label: 'Care' },
{ img: 'cholamandalam', label: 'Cholamandalam' }, { img: 'digit', label: 'Digit' }, { img: 'edelweiss', label: 'Edelweiss' },
{ img: 'kotak-mahindra', label: 'Kotak Mahindra' }, { img: 'liberty', label: 'Liberty' }, { img: 'max-bupa', label: 'Max Bupa' },
{ img: 'manipal-cigna', label: 'ManipalCigna' }, { img: 'new-india-sssurance', label: 'New India Assurance' }, { img: 'oriental', label: 'Oriental' },
{ img: 'raheja-qube', label: 'Raheja QuBE' }, { img: 'royal-sundaram', label: 'Royal Sundaram' }, { img: 'star', label: 'Star' }, { img: 'sbi', label: 'SBI' },
{ img: 'tata-aig', label: 'Tata AIG' }, { img: 'united-india', label: 'United India' }, { img: 'future-generali', label: 'Future Generali' },
{ img: 'iffco-tokio', label: 'IFFCO Tokio' }, { img: 'national', label: 'National' }, { img: 'Reliance', label: 'Reliance' },
{ img: 'universal-sompo', label: 'Universal Sompo' }]


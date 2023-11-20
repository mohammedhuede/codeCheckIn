import { createReducer } from 'reduxsauce'
import { Constants } from '../Actions'

const INITIAL_STATE = {
    error: false,
    loader: false,
    errorMessage: null,
    hospitalBasicDetailsData: {},
    postHospitalBasicDetailsSuccess: false,
    getHospitalBasicDetailsSuccess: false,
    updateHospitalBasicDetailsSuccess: false,
    deleteHospitalSuccess: false,
    hospitalDepartmentsData: [],
    getHospitalDepartmentsSuccess: false,
    postHospitalDepartmentsSuccess: false,
    hospitalProceduresData: {},
    getHospitalProceduresSuccess: false,
    postHospitalProceduresSuccess: false,
    updateHospitalProceduresSuccess: false,
    getProceduresFromDepartmentSuccess: false,
    proceduresFromDepartment: [],
    getHospitalWardsBedsSuccess: false,
    hospitalWardsBedsData: [],
    postHospitalWardsBedsSuccess: false,
    getProcedureDetailFromProcedureIdSuccess: false,
    procedureDetailFromProcedureId: {},
    getAllDoctorsSuccess: false,
    getAllDoctorsFromDeptSuccess: false,
    allDoctorsData: [],
    postDoctorInfoSuccess: false,
    doctorInfo: {},
    getDoctorInfoSuccess: false,
    deleteDoctorSuccess: false,
    allDoctorsFromDeptData: [],
    getAmenitiesSuccess: false,
    amenitiesData: {},
    postAmenitiesSuccess: false,
    getInsurancesSuccess: false,
    insurancesData: {},
    postInsurancesSuccess: false,
    getAllAdminsSuccess: false,
    allAdminsData: [],
    postAdminDetailsSuccess: false,
    adminDetails: {},
    deleteAdminSuccess: false,
    getAllHospitalsBasicDetailsSuccess: false,
    allHospitalBasicDetailsData: [],
    getHospitalReviewSuccess: false,
    reviewData: {},
    updateDoctorInfoSuccess: false,
    deleteProcedureSuccess: false,
    postHospitalReviewSuccess: false,
}

// Basic Details
const postHospitalBasicDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        postHospitalBasicDetailsSuccess: false,
        errorMessage: null,
        loader: true,
        hospitalBasicDetailsData: {},
    }
}

const postHospitalBasicDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        postHospitalBasicDetailsSuccess: true,
        errorMessage: null,
        loader: false,
        hospitalBasicDetailsData: action.data,
    }
}

const postHospitalBasicDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        postHospitalBasicDetailsSuccess: false,
        errorMessage: action.error,
        loader: false,
        hospitalBasicDetailsData: {},
    }
}

const getHospitalBasicDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getHospitalBasicDetailsSuccess: false,
        errorMessage: null,
        hospitalBasicDetailsData: {},
        loader: true,
    }
}

const getHospitalBasicDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getHospitalBasicDetailsSuccess: true,
        errorMessage: null,
        hospitalBasicDetailsData: action.data,
        loader: false,
    }
}

const getHospitalBasicDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getHospitalBasicDetailsSuccess: false,
        errorMessage: action.error,
        hospitalBasicDetailsData: {},
        loader: false,
    }
}

const updateHospitalBasicDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        updateHospitalBasicDetailsSuccess: false,
        errorMessage: null,
        hospitalBasicDetailsData: {},
        loader: true,
    }
}

const updateHospitalBasicDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        updateHospitalBasicDetailsSuccess: true,
        errorMessage: null,
        hospitalBasicDetailsData: action.data,
        loader: false,
    }
}

const updateHospitalBasicDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        updateHospitalBasicDetailsSuccess: false,
        errorMessage: action.error,
        hospitalBasicDetailsData: {},
        loader: false,
    }
}

const getAllHospitalsBasicDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getAllHospitalsBasicDetailsSuccess: false,
        errorMessage: null,
        allHospitalBasicDetailsData: [],
        loader: true,
    }
}

const getAllHospitalsBasicDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getAllHospitalsBasicDetailsSuccess: true,
        errorMessage: null,
        allHospitalBasicDetailsData: action.data,
        loader: false,
    }
}

const getAllHospitalsBasicDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getAllHospitalsBasicDetailsSuccess: false,
        errorMessage: action.error,
        allHospitalBasicDetailsData: [],
        loader: false,
    }
}
const deleteHospitalRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        deleteHospitalSuccess: false,
        errorMessage: null,
        hospitalBasicDetailsData: {},
        loader: true,
    }
}

const deleteHospitalSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        deleteHospitalSuccess: true,
        errorMessage: null,
        hospitalBasicDetailsData: action.data,
        loader: false,
    }
}

const deleteHospitalError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        deleteHospitalSuccess: false,
        errorMessage: action.error,
        hospitalBasicDetailsData: {},
        loader: false,
    }
}

// Departments
const getHospitalDepartmentsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getHospitalDepartmentsSuccess: false,
        errorMessage: null,
        hospitalDepartmentsData: [],
        loader: true,
    }
}

const getHospitalDepartmentsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getHospitalDepartmentsSuccess: true,
        errorMessage: null,
        hospitalDepartmentsData: action.data,
        loader: false,
    }
}

const getHospitalDepartmentsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getHospitalDepartmentsSuccess: false,
        errorMessage: action.error,
        hospitalDepartmentsData: [],
        loader: false,
    }
}

const postHospitalDepartmentsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        postHospitalDepartmentsSuccess: false,
        errorMessage: null,
        loader: true,
        hospitalDepartmentsData: [],
    }
}

const postHospitalDepartmentsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        postHospitalDepartmentsSuccess: true,
        errorMessage: null,
        loader: false,
        hospitalDepartmentsData: action.data,
    }
}

const postHospitalDepartmentsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        postHospitalBasicDetailsSuccess: false,
        errorMessage: action.error,
        loader: false,
        hospitalDepartmentsData: [],
    }
}

// Procedures
const getHospitalProceduresRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getHospitalProceduresSuccess: false,
        hospitalProceduresData: {},
    }
}

const getHospitalProceduresSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getHospitalProceduresSuccess: true,
        hospitalProceduresData: action.data,
    }
}

const getHospitalProceduresError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getHospitalProceduresSuccess: false,
        errorMessage: action.error,
        hospitalProceduresData: {},
        loader: false,
    }
}

const postHospitalProceduresRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        postHospitalProceduresSuccess: false,
        hospitalProceduresData: {},
    }
}

const postHospitalProceduresSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postHospitalProceduresSuccess: true,
        hospitalProceduresData: action.data,
    }
}

const postHospitalProceduresError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postHospitalProceduresSuccess: false,
        hospitalProceduresData: {},
    }
}

const updateHospitalProceduresRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        updateHospitalProceduresSuccess: false,
        hospitalProceduresData: {},
    }
}

const updateHospitalProceduresSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        updateHospitalProceduresSuccess: true,
        hospitalProceduresData: action.data,
    }
}

const updateHospitalProceduresError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        updateHospitalProceduresSuccess: false,
        proceduresFromDepartment: {},
    }
}

const getProceduresFromDepartmentRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getProceduresFromDepartmentSuccess: false,
        errorMessage: null,
        proceduresFromDepartment: {},
        loader: true,
    }
}

const getProceduresFromDepartmentSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getProceduresFromDepartmentSuccess: true,
        errorMessage: null,
        proceduresFromDepartment: action.data,
        loader: false,
    }
}

const getProceduresFromDepartmentError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getProceduresFromDepartmentSuccess: false,
        errorMessage: action.error,
        hospitalBasicDetailsData: {},
        loader: false,
    }
}

const getProcedureDetailFromProcedureIdRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getProcedureDetailFromProcedureIdSuccess: false,
        errorMessage: null,
        procedureDetailFromProcedureId: {},
        loader: true,
    }
}

const getProcedureDetailFromProcedureIdSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        getProcedureDetailFromProcedureIdSuccess: true,
        errorMessage: null,
        procedureDetailFromProcedureId: action.data,
        loader: false,
    }
}

const getProcedureDetailFromProcedureIdError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getProcedureDetailFromProcedureIdSuccess: false,
        errorMessage: action.error,
        procedureDetailFromProcedureId: {},
        loader: false,
    }
}

const deleteProcedureRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        deleteProcedureSuccess: false,
        procedureDetailFromProcedureId: {},
    }
}

const deleteProcedureSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        deleteProcedureSuccess: true,
        procedureDetailFromProcedureId: action.data,
    }
}

const deleteProcedureError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        deleteProcedureSuccess: false,
        procedureDetailFromProcedureId: {},
    }
}

// Wards & Beds
const getHospitalWardsBedsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getHospitalWardsBedsSuccess: false,
        hospitalWardsBedsData: {},
    }
}

const getHospitalWardsBedsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getHospitalWardsBedsSuccess: true,
        hospitalWardsBedsData: action.data,
    }
}

const getHospitalWardsBedsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        getHospitalWardsBedsSuccess: false,
        errorMessage: action.error,
        hospitalWardsBedsData: {},
        loader: false,
    }
}


const postHospitalWardsBedsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        postHospitalWardsBedsSuccess: false,
        hospitalWardsBedsData: {},
    }
}

const postHospitalWardsBedsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postHospitalWardsBedsSuccess: true,
        hospitalWardsBedsData: action.data,
    }
}

const postHospitalWardsBedsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postHospitalWardsBedsSuccess: false,
        hospitalWardsBedsData: {},
    }
}

// Doctors
const getAllDoctorsFromDeptRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getAllDoctorsFromDeptSuccess: false,
        allDoctorsFromDeptData: [],
    }
}

const getAllDoctorsFromDeptSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getAllDoctorsFromDeptSuccess: true,
        allDoctorsFromDeptData: action.data,
    }
}

const getAllDoctorsFromDeptError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getAllDoctorsFromDeptSuccess: false,
        allDoctorsFromDeptData: [],
    }
}

const getAllDoctorsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getAllDoctorsSuccess: false,
        allDoctorsData: [],
    }
}

const getAllDoctorsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getAllDoctorsSuccess: true,
        allDoctorsData: action.data,
    }
}

const getAllDoctorsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getAllDoctorsSuccess: false,
        allDoctorsData: [],
    }
}

const postDoctorInfoRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        postDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const postDoctorInfoSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postDoctorInfoSuccess: true,
        doctorInfo: action.data,
    }
}

const postDoctorInfoError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const getDoctorInfoRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const getDoctorInfoSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getDoctorInfoSuccess: true,
        doctorInfo: action.data,
    }
}

const getDoctorInfoError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const updateDoctorInfoRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        updateDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const updateDoctorInfoSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        updateDoctorInfoSuccess: true,
        doctorInfo: action.data,
    }
}

const updateDoctorInfoError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        updateDoctorInfoSuccess: false,
        doctorInfo: {},
    }
}

const deleteDoctorRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: true,
        deleteDoctorSuccess: false,
        doctorInfo: {},
    }
}

const deleteDoctorSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        deleteDoctorSuccess: true,
        doctorInfo: action.data,
    }
}

const deleteDoctorError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        deleteDoctorSuccess: false,
        doctorInfo: {},
    }
}

//Amenities 
const getAmenitiesRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getAmenitiesSuccess: false,
        amenitiesData: {},
    }
}

const getAmenitiesSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getAmenitiesSuccess: true,
        amenitiesData: action.data,
    }
}

const getAmenitiesError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getAmenitiesSuccess: false,
        amenitiesData: {},
    }
}

const postAmenitiesRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        postAmenitiesSuccess: false,
        amenitiesData: {},
    }
}

const postAmenitiesSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postAmenitiesSuccess: true,
        amenitiesData: action.data,
    }
}

const postAmenitiesError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postAmenitiesSuccess: false,
        amenitiesData: {},
    }
}

// Insurances
const getInsurancesRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getInsurancesSuccess: false,
        insurancesData: {},
    }
}

const getInsurancesSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getInsurancesSuccess: true,
        insurancesData: action.data,
    }
}

const getInsurancesError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getInsurancesSuccess: false,
        insurancesData: {},
    }
}

const postInsurancesRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        postInsurancesSuccess: false,
        insurancesData: {},
    }
}

const postInsurancesSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postInsurancesSuccess: true,
        insurancesData: action.data,
    }
}

const postInsurancesError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postInsurancesSuccess: false,
        insurancesData: {},
    }
}

// Admins 

const getAllAdminsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getAllAdminsSuccess: false,
        allAdminsData: {},
    }
}

const getAllAdminsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getAllAdminsSuccess: true,
        allAdminsData: action.data,
    }
}

const getAllAdminsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getAllAdminsSuccess: false,
        allAdminsData: {},
    }
}

const postAdminDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        postAdminDetailsSuccess: false,
        adminDetails: {},
    }
}

const postAdminDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postAdminDetailsSuccess: true,
        adminDetails: action.data,
    }
}

const postAdminDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postAdminDetailsSuccess: false,
        adminDetails: {},
    }
}

const getAdminDetailsFromIdRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getAdminDetailsFromIdSuccess: false,
        adminDetails: {},
    }
}

const getAdminDetailsFromIdSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getAdminDetailsFromIdSuccess: true,
        adminDetails: action.data,
    }
}

const getAdminDetailsFromIdError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getAdminDetailsFromIdSuccess: false,
        adminDetails: {},
    }
}

const updateAdminDetailsRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        updateAdminDetailsSuccess: false,
        adminDetails: {},
    }
}

const updateAdminDetailsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        updateAdminDetailsSuccess: true,
        adminDetails: action.data,
    }
}

const updateAdminDetailsError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        updateAdminDetailsSuccess: false,
        adminDetails: {},
    }
}

const deleteAdminRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        deleteAdminSuccess: false,
        adminDetails: {},
    }
}

const deleteAdminSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        deleteAdminSuccess: true,
        adminDetails: action.data,
    }
}

const deleteAdminError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        deleteAdminSuccess: false,
        adminDetails: {},
    }
}
// Review
const getHospitalReviewRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        getHospitalReviewSuccess: false,
        reviewData: {},
    }
}

const getHospitalReviewSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        getHospitalReviewSuccess: true,
        reviewData: action.data,
    }
}

const getHospitalReviewError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        getHospitalReviewSuccess: false,
        reviewData: {},
    }
}
const postHospitalReviewRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        loader: true,
        errorMessage: null,
        postHospitalReviewSuccess: false,
        reviewData: {},
    }
}

const postHospitalReviewSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: null,
        loader: false,
        postHospitalReviewSuccess: true,
        reviewData: action.data,
    }
}

const postHospitalReviewError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error,
        loader: false,
        postHospitalReviewSuccess: false,
        reviewData: {},
    }
}


const HANDLERS = {
    // Basic Details
    [Constants.POST_HOSPITAL_BASIC_DETAILS_REQUEST]: postHospitalBasicDetailsRequest,
    [Constants.POST_HOSPITAL_BASIC_DETAILS_SUCCESS]: postHospitalBasicDetailsSuccess,
    [Constants.POST_HOSPITAL_BASIC_DETAILS_ERROR]: postHospitalBasicDetailsError,
    [Constants.GET_HOSPITAL_BASIC_DETAILS_REQUEST]: getHospitalBasicDetailsRequest,
    [Constants.GET_HOSPITAL_BASIC_DETAILS_SUCCESS]: getHospitalBasicDetailsSuccess,
    [Constants.GET_HOSPITAL_BASIC_DETAILS_ERROR]: getHospitalBasicDetailsError,
    [Constants.UPDATE_HOSPITAL_BASIC_DETAILS_REQUEST]: updateHospitalBasicDetailsRequest,
    [Constants.UPDATE_HOSPITAL_BASIC_DETAILS_SUCCESS]: updateHospitalBasicDetailsSuccess,
    [Constants.UPDATE_HOSPITAL_BASIC_DETAILS_ERROR]: updateHospitalBasicDetailsError,
    [Constants.GET_ALL_HOSPITALS_BASIC_DETAILS_REQUEST]: getAllHospitalsBasicDetailsRequest,
    [Constants.GET_ALL_HOSPITALS_BASIC_DETAILS_SUCCESS]: getAllHospitalsBasicDetailsSuccess,
    [Constants.GET_ALL_HOSPITALS_BASIC_DETAILS_ERROR]: getAllHospitalsBasicDetailsError,
    [Constants.DELETE_HOSPITAL_REQUEST]: deleteHospitalRequest,
    [Constants.DELETE_HOSPITAL_SUCCESS]: deleteHospitalSuccess,
    [Constants.DELETE_HOSPITAL_ERROR]: deleteHospitalError,

    //Departments
    [Constants.GET_HOSPITAL_DEPARTMENTS_REQUEST]: getHospitalDepartmentsRequest,
    [Constants.GET_HOSPITAL_DEPARTMENTS_SUCCESS]: getHospitalDepartmentsSuccess,
    [Constants.GET_HOSPITAL_DEPARTMENTS_ERROR]: getHospitalDepartmentsError,
    [Constants.POST_HOSPITAL_DEPARTMENTS_REQUEST]: postHospitalDepartmentsRequest,
    [Constants.POST_HOSPITAL_DEPARTMENTS_SUCCESS]: postHospitalDepartmentsSuccess,
    [Constants.POST_HOSPITAL_DEPARTMENTS_ERROR]: postHospitalDepartmentsError,

    //Procedures
    [Constants.GET_HOSPITAL_PROCEDURES_REQUEST]: getHospitalProceduresRequest,
    [Constants.GET_HOSPITAL_PROCEDURES_SUCCESS]: getHospitalProceduresSuccess,
    [Constants.GET_HOSPITAL_PROCEDURES_ERROR]: getHospitalProceduresError,
    [Constants.POST_HOSPITAL_PROCEDURES_REQUEST]: postHospitalProceduresRequest,
    [Constants.POST_HOSPITAL_PROCEDURES_ERROR]: postHospitalProceduresError,
    [Constants.POST_HOSPITAL_PROCEDURES_SUCCESS]: postHospitalProceduresSuccess,
    [Constants.UPDATE_HOSPITAL_PROCEDURES_REQUEST]: updateHospitalProceduresRequest,
    [Constants.UPDATE_HOSPITAL_PROCEDURES_SUCCESS]: updateHospitalProceduresSuccess,
    [Constants.UPDATE_HOSPITAL_PROCEDURES_ERROR]: updateHospitalProceduresError,
    [Constants.GET_PROCEDURES_FROM_DEPARTMENT_REQUEST]: getProceduresFromDepartmentRequest,
    [Constants.GET_PROCEDURES_FROM_DEPARTMENT_SUCCESS]: getProceduresFromDepartmentSuccess,
    [Constants.GET_PROCEDURES_FROM_DEPARTMENT_ERROR]: getProceduresFromDepartmentError,
    [Constants.GET_PROCEDURE_DETAIL_FROM_PROCEDURE_ID_REQUEST]: getProcedureDetailFromProcedureIdRequest,
    [Constants.GET_PROCEDURE_DETAIL_FROM_PROCEDURE_ID_SUCCESS]: getProcedureDetailFromProcedureIdSuccess,
    [Constants.GET_PROCEDURE_DETAIL_FROM_PROCEDURE_ID_ERROR]: getProcedureDetailFromProcedureIdError,
    [Constants.DELETE_PROCEDURE_REQUEST]: deleteProcedureRequest,
    [Constants.DELETE_PROCEDURE_SUCCESS]: deleteProcedureSuccess,
    [Constants.DELETE_PROCEDURE_ERROR]: deleteProcedureError,
    
    //Wards And Beds
    [Constants.GET_HOSPITAL_WARDS_BEDS_REQUEST]: getHospitalWardsBedsRequest,
    [Constants.GET_HOSPITAL_WARDS_BEDS_SUCCESS]: getHospitalWardsBedsSuccess,
    [Constants.GET_HOSPITAL_WARDS_BEDS_ERROR]: getHospitalWardsBedsError,
    [Constants.POST_HOSPITAL_WARDS_BEDS_REQUEST]: postHospitalWardsBedsRequest,
    [Constants.POST_HOSPITAL_WARDS_BEDS_SUCCESS]: postHospitalWardsBedsSuccess,
    [Constants.POST_HOSPITAL_WARDS_BEDS_ERROR]: postHospitalWardsBedsError,
    
    //Doctors
    [Constants.GET_ALL_DOCTORS_REQUEST]: getAllDoctorsRequest,
    [Constants.GET_ALL_DOCTORS_SUCCESS]: getAllDoctorsSuccess,
    [Constants.GET_ALL_DOCTORS_ERROR]: getAllDoctorsError,
    [Constants.POST_DOCTOR_INFO_REQUEST]: postDoctorInfoRequest,
    [Constants.POST_DOCTOR_INFO_SUCCESS]: postDoctorInfoSuccess,
    [Constants.POST_DOCTOR_INFO_ERROR]: postDoctorInfoError,
    [Constants.GET_DOCTOR_INFO_REQUEST]: getDoctorInfoRequest,
    [Constants.GET_DOCTOR_INFO_SUCCESS]: getDoctorInfoSuccess,
    [Constants.GET_DOCTOR_INFO_ERROR]: getDoctorInfoError,
    [Constants.UPDATE_DOCTOR_INFO_REQUEST]: updateDoctorInfoRequest,
    [Constants.UPDATE_DOCTOR_INFO_SUCCESS]: updateDoctorInfoSuccess,
    [Constants.UPDATE_DOCTOR_INFO_ERROR]: updateDoctorInfoError,
    [Constants.DELETE_DOCTOR_REQUEST]: deleteDoctorRequest,
    [Constants.DELETE_DOCTOR_SUCCESS]: deleteDoctorSuccess,
    [Constants.DELETE_DOCTOR_ERROR]: deleteDoctorError,
    [Constants.GET_ALL_DOCTORS_FROM_DEPT_REQUEST]: getAllDoctorsFromDeptRequest,
    [Constants.GET_ALL_DOCTORS_FROM_DEPT_SUCCESS]: getAllDoctorsFromDeptSuccess,
    [Constants.GET_ALL_DOCTORS_FROM_DEPT_ERROR]: getAllDoctorsFromDeptError,
    
    //Amenities
    [Constants.GET_AMENITIES_REQUEST]: getAmenitiesRequest,
    [Constants.GET_AMENITIES_SUCCESS]: getAmenitiesSuccess,
    [Constants.GET_AMENITIES_ERROR]: getAmenitiesError,
    [Constants.POST_AMENITIES_REQUEST]: postAmenitiesRequest,
    [Constants.POST_AMENITIES_SUCCESS]: postAmenitiesSuccess,
    [Constants.POST_AMENITIES_ERROR]: postAmenitiesError,

    //Insurances
    [Constants.GET_INSURANCES_REQUEST]: getInsurancesRequest,
    [Constants.GET_INSURANCES_SUCCESS]: getInsurancesSuccess,
    [Constants.GET_INSURANCES_ERROR]: getInsurancesError,
    [Constants.POST_INSURANCES_REQUEST]: postInsurancesRequest,
    [Constants.POST_INSURANCES_SUCCESS]: postInsurancesSuccess,
    [Constants.POST_INSURANCES_ERROR]: postInsurancesError,
    
    //Admins
    [Constants.GET_ALL_ADMINS_REQUEST]: getAllAdminsRequest,
    [Constants.GET_ALL_ADMINS_SUCCESS]: getAllAdminsSuccess,
    [Constants.GET_ALL_ADMINS_ERROR]: getAllAdminsError,
    [Constants.POST_ADMIN_DETAILS_REQUEST]: postAdminDetailsRequest,
    [Constants.POST_ADMIN_DETAILS_SUCCESS]: postAdminDetailsSuccess,
    [Constants.POST_ADMIN_DETAILS_ERROR]: postAdminDetailsError,
    [Constants.GET_ADMIN_DETAILS_FROM_ID_REQUEST]: getAdminDetailsFromIdRequest,
    [Constants.GET_ADMIN_DETAILS_FROM_ID_SUCCESS]: getAdminDetailsFromIdSuccess,
    [Constants.GET_ADMIN_DETAILS_FROM_ID_ERROR]: getAdminDetailsFromIdError,
    [Constants.UPDATE_ADMIN_DETAILS_REQUEST]: updateAdminDetailsRequest,
    [Constants.UPDATE_ADMIN_DETAILS_SUCCESS]: updateAdminDetailsSuccess,
    [Constants.UPDATE_ADMIN_DETAILS_ERROR]: updateAdminDetailsError,
    [Constants.DELETE_ADMIN_REQUEST]: deleteAdminRequest,
    [Constants.DELETE_ADMIN_SUCCESS]: deleteAdminSuccess,
    [Constants.DELETE_ADMIN_ERROR]: deleteAdminError,

    //Review
    [Constants.GET_HOSPITAL_REVIEW_REQUEST]: getHospitalReviewRequest,
    [Constants.GET_HOSPITAL_REVIEW_SUCCESS]: getHospitalReviewSuccess,
    [Constants.GET_HOSPITAL_REVIEW_ERROR]: getHospitalReviewError,
    [Constants.POST_HOSPITAL_REVIEW_REQUEST]: postHospitalReviewRequest,
    [Constants.POST_HOSPITAL_REVIEW_SUCCESS]: postHospitalReviewSuccess,
    [Constants.POST_HOSPITAL_REVIEW_ERROR]: postHospitalReviewError,
}

export default createReducer(INITIAL_STATE, HANDLERS)
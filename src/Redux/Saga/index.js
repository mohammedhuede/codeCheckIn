import { call, put, takeLatest } from 'redux-saga/effects'
import { Actions } from '../Actions'

import {
    PostHospitalBasicDetailsAPI,
    GetHospitalBasicDetailsAPI,
    UpdateHospitalBasicDetailsAPI,
    DeleteHospitalAPI,
    GetHospitalDepartmentsAPI,
    PostHospitalDepartmentsAPI,
    GetHospitalProceduresAPI,
    PostHospitalProceduresAPI,
    UpdateHospitalProceduresAPI,
    GetProceduresFromDepartmentAPI,
    GetHospitalWardsBedsAPI,
    PostHospitalWardsBedsAPI,
    GetProcedureDetailFromProcedureIdAPI,
    PostDoctorInfoAPI,
    GetAllDoctorsAPI,
    GetAmenitiesAPI,
    PostAmenitiesAPI,
    GetInsurancesAPI,
    PostInsurancesAPI,
    GetAllAdminsAPI,
    PostAdminDetailsAPI,
    GetAdminDetailsAPI,
    UpdateAdminDetailsAPI,
    GetAllHospitalsBasicDetailsAPI,
    GetHospitalReviewAPI,
    GetDoctorInfoAPI,
    UpdateDoctorInfoAPI,
    DeleteProcedureAPI,
    DeleteAdminAPI,
    DeleteDoctorAPI,
    GetAllDoctorsFromDeptAPI,
    PostHospitalReviewAPI,
    GetReferralListAPI,
    UpdateReferralAPI,
} from '../API'

// Basic Details

function* getHospitalBasicDetails(actions) {
    const response = yield call(GetHospitalBasicDetailsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getHospitalBasicDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getHospitalBasicDetailsError(response.message))
    }
}

function* postHospitalBasicDetails(actions) {
    const response = yield call(PostHospitalBasicDetailsAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postHospitalBasicDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postHospitalBasicDetailsError(response.message))
    }
}

function* updateHospitalBasicDetails(actions) {
    const response = yield call(UpdateHospitalBasicDetailsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.updateHospitalBasicDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.updateHospitalBasicDetailsError(response.message))
    }
}

function* getAllHospitalsBasicDetails(actions) {
    const response = yield call(GetAllHospitalsBasicDetailsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAllHospitalsBasicDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getAllHospitalsBasicDetailsError(response.message))
    }
}
function* deleteHospital(actions) {
    const response = yield call(DeleteHospitalAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.deleteHospitalSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.deleteHospitalError(response.message))
    }
}

// Department

function* getHospitalDepartments(actions) {
    const response = yield call(GetHospitalDepartmentsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getHospitalDepartmentsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getHospitalDepartmentsError(response.message))
    }
}

function* postHospitalDepartments(actions) {
    const response = yield call(PostHospitalDepartmentsAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postHospitalDepartmentsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postHospitalDepartmentsError(response.message))
    }
}

// Procedures
function* getHospitalProcedures(actions) {
    const response = yield call(GetHospitalProceduresAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getHospitalProceduresSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getHospitalProceduresError(response.message))
    }
}

function* postHospitalProcedures(actions) {
    const response = yield call(PostHospitalProceduresAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postHospitalProceduresSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postHospitalProceduresError(response.message))
    }
}

function* updateHospitalProcedures(actions) {
    const response = yield call(UpdateHospitalProceduresAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.updateHospitalProceduresSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.updateHospitalProceduresError(response.message))
    }
}

function* getProceduresFromDepartment(actions) {
    const response = yield call(GetProceduresFromDepartmentAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getProceduresFromDepartmentSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getProceduresFromDepartmentError(response.message))
    }
}
function* getProcedureDetailFromProcedureId(actions) {
    const response = yield call(GetProcedureDetailFromProcedureIdAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getProcedureDetailFromProcedureIdSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getProcedureDetailFromProcedureIdError(response.message))
    }
}

// Wards and beds
function* getHospitalWardsBeds(actions) {
    const response = yield call(GetHospitalWardsBedsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getHospitalWardsBedsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getHospitalWardsBedsError(response.message))
    }
}

function* postHospitalWardsBeds(actions) {
    const response = yield call(PostHospitalWardsBedsAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postHospitalWardsBedsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postHospitalWardsBedsError(response.message))
    }
}

// Doctors
function* postDoctorInfo(actions) {
    const response = yield call(PostDoctorInfoAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postDoctorInfoSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postDoctorInfoError(response.message))
    }
}

function* getAllDoctors(actions) {
    const response = yield call(GetAllDoctorsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAllDoctorsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getAllDoctorsError(response.message))
    }
}
function* getAllDoctorsFromDept(actions) {
    const response = yield call(GetAllDoctorsFromDeptAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAllDoctorsFromDeptSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getAllDoctorsFromDeptError(response.message))
    }
}

function* getDoctorInfo(actions) {
    const response = yield call(GetDoctorInfoAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getDoctorInfoSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getDoctorInfoError(response.message))
    }
}

function* updateDoctorInfo(actions) {
    const response = yield call(UpdateDoctorInfoAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.updateDoctorInfoSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.updateDoctorInfoError(response.message))
    }
}

function* deleteProcedure(actions) {
    const response = yield call(DeleteProcedureAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.deleteProcedureSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.deleteProcedureError(response.message))
    }
}

function* deleteDoctor(actions) {
    const response = yield call(DeleteDoctorAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.deleteDoctorSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.deleteDoctorError(response.message))
    }
}

//Amenities

function* getAmenities(actions) {
    const response = yield call(GetAmenitiesAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAmenitiesSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getAmenitiesError(response.message))
    }
}

function* postAmenities(actions) {
    const response = yield call(PostAmenitiesAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postAmenitiesSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postAmenitiesError(response.message))
    }
}

// Insurances

function* getInsurances(actions) {
    const response = yield call(GetInsurancesAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getInsurancesSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getInsurancesError(response.message))
    }
}

function* postInsurances(actions) {
    const response = yield call(PostInsurancesAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postInsurancesSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postInsurancesError(response.message))
    }
}

// Admins
function* getAllAdmins(actions) {
    const response = yield call(GetAllAdminsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAllAdminsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getAllAdminsError(response.message))
    }
}

function* postAdminDetails(actions) {
    const response = yield call(PostAdminDetailsAPI, actions.data)
    if (response.status === 201) {
        yield put(
            Actions.postAdminDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postAdminDetailsError(response.message))
    }
}

function* getAdminDetails(actions) {
    const response = yield call(GetAdminDetailsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getAdminDetailsFromIdSuccess(
                response.data
            )
            )
    } else {
        yield put(Actions.getAdminDetailsFromIdError(response.message))
    }
}

function* updateAdminDetails(actions) {
    const response = yield call(UpdateAdminDetailsAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.updateAdminDetailsSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.updateAdminDetailsError(response.message))
    }
}

function* deleteAdmin(actions) {
    const response = yield call(DeleteAdminAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.deleteAdminSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.deleteAdminError(response.message))
    }
}

// Review

function* getHospitalReview(actions) {
    const response = yield call(GetHospitalReviewAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.getHospitalReviewSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.getHospitalReviewError(response.message))
    }
}

function* postHospitalReview(actions) {
    const response = yield call(PostHospitalReviewAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.postHospitalReviewSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.postHospitalReviewError(response.message))
    }
}

//referral
function* GetReferralList(actions) {
    const response = yield call(GetReferralListAPI, actions.data);
    if (response.status === 200) {
      yield put(Actions.getListReferralSuccess(response.data));
    } else {
      yield put(Actions.getListReferralError(response.message));
    }
  }

  function* UpdateReferralDetails(actions) {
    const response = yield call(UpdateReferralAPI, actions.data)
    if (response.status === 200) {
        yield put(
            Actions.updateReferralSuccess(
                response.data
            )
        )
    } else {
        yield put(Actions.updateReferralError(response.message))
    }
}

export default function* rootSaga() {
    yield takeLatest('POST_HOSPITAL_BASIC_DETAILS_REQUEST', postHospitalBasicDetails)
    yield takeLatest('GET_HOSPITAL_BASIC_DETAILS_REQUEST', getHospitalBasicDetails)
    yield takeLatest('UPDATE_HOSPITAL_BASIC_DETAILS_REQUEST', updateHospitalBasicDetails)
    yield takeLatest('GET_ALL_HOSPITALS_BASIC_DETAILS_REQUEST', getAllHospitalsBasicDetails)
    yield takeLatest('DELETE_HOSPITAL_REQUEST', deleteHospital)
    yield takeLatest('GET_HOSPITAL_DEPARTMENTS_REQUEST', getHospitalDepartments)
    yield takeLatest('POST_HOSPITAL_DEPARTMENTS_REQUEST', postHospitalDepartments)
    yield takeLatest('GET_HOSPITAL_PROCEDURES_REQUEST', getHospitalProcedures)
    yield takeLatest('POST_HOSPITAL_PROCEDURES_REQUEST', postHospitalProcedures)
    yield takeLatest('UPDATE_HOSPITAL_PROCEDURES_REQUEST', updateHospitalProcedures)
    yield takeLatest('GET_PROCEDURES_FROM_DEPARTMENT_REQUEST', getProceduresFromDepartment)
    yield takeLatest('GET_PROCEDURE_DETAIL_FROM_PROCEDURE_ID_REQUEST', getProcedureDetailFromProcedureId)
    yield takeLatest('DELETE_PROCEDURE_REQUEST', deleteProcedure)
    yield takeLatest('GET_HOSPITAL_WARDS_BEDS_REQUEST', getHospitalWardsBeds)
    yield takeLatest('POST_HOSPITAL_WARDS_BEDS_REQUEST', postHospitalWardsBeds)
    yield takeLatest('GET_ALL_DOCTORS_REQUEST', getAllDoctors)
    yield takeLatest('POST_DOCTOR_INFO_REQUEST', postDoctorInfo)
    yield takeLatest('GET_DOCTOR_INFO_REQUEST', getDoctorInfo)
    yield takeLatest('UPDATE_DOCTOR_INFO_REQUEST', updateDoctorInfo)
    yield takeLatest('DELETE_DOCTOR_REQUEST', deleteDoctor)
    yield takeLatest('GET_AMENITIES_REQUEST', getAmenities)
    yield takeLatest('POST_AMENITIES_REQUEST', postAmenities)
    yield takeLatest('GET_INSURANCES_REQUEST', getInsurances)
    yield takeLatest('POST_INSURANCES_REQUEST', postInsurances)
    yield takeLatest('GET_ALL_ADMINS_REQUEST', getAllAdmins)
    yield takeLatest('POST_ADMIN_DETAILS_REQUEST', postAdminDetails)
    yield takeLatest('GET_ADMIN_DETAILS_FROM_ID_REQUEST', getAdminDetails)
    yield takeLatest('UPDATE_ADMIN_DETAILS_REQUEST', updateAdminDetails)
    yield takeLatest('DELETE_ADMIN_REQUEST', deleteAdmin)
    yield takeLatest('GET_HOSPITAL_REVIEW_REQUEST', getHospitalReview)
    yield takeLatest('GET_ALL_DOCTORS_FROM_DEPT_REQUEST', getAllDoctorsFromDept)
    yield takeLatest('POST_HOSPITAL_REVIEW_REQUEST', postHospitalReview)
    yield takeLatest("GET_LIST_REFERRAL_REQUEST", GetReferralList)
    yield takeLatest("UPDATE_REFERRAL_REQUEST", UpdateReferralDetails)
}
import axios from 'axios'
import { getAccessToken } from '../../Components/helper/helper'
import { REACT_APP_API_URL } from '../../constants/constants'

const URL = REACT_APP_API_URL
const headers = ()=>  {
    return (
        {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken()
        }
    )
    
}

// Basic Details
export const GetHospitalBasicDetailsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/basicdetails`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostHospitalBasicDetailsAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/basicdetails`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const UpdateHospitalBasicDetailsAPI = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetAllHospitalsBasicDetailsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const DeleteHospitalAPI = async (data) => {
    try {
        const res = await axios.delete(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Departments
export const GetHospitalDepartmentsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/departments`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostHospitalDepartmentsAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/departments`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Procedures
export const PostHospitalProceduresAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/procedures`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetHospitalProceduresAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/procedures`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const UpdateHospitalProceduresAPI = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/procedures/${data.procedureId}`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetProceduresFromDepartmentAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/department/${data.departmentName}/procedures`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetProcedureDetailFromProcedureIdAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/procedures/${data.procedureId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}
export const DeleteProcedureAPI = async (data) => {
    try {
        const res = await axios.delete(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/procedures/${data.procedureId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Wards and Beds
export const GetHospitalWardsBedsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/wards_beds`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostHospitalWardsBedsAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/wards_beds`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Doctors
export const PostDoctorInfoAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/doctors`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetAllDoctorsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/doctors`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}
export const GetAllDoctorsFromDeptAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/doctors`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetDoctorInfoAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/doctors/${data.doctorId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const UpdateDoctorInfoAPI = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/doctors/${data.doctorId}`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const DeleteDoctorAPI = async (data) => {
    try {
        const res = await axios.delete(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/doctors/${data.doctorId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}
// Amenities
export const GetAmenitiesAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/amenities`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostAmenitiesAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/amenities`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Insurances
export const GetInsurancesAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/insurances`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostInsurancesAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/insurances`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Admins
export const GetAllAdminsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/admins`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostAdminDetailsAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/admins`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const GetAdminDetailsAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/admins/${data.adminId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}
export const UpdateAdminDetailsAPI = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/partners/${data.partnerId}/admins/${data.adminId}`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const DeleteAdminAPI = async (data) => {
    try {
        const res = await axios.delete(
            `${URL}/partners/${data.partnerId}/admins/${data.adminId}`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

// Review
export const GetHospitalReviewAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/review`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const PostHospitalReviewAPI = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/partners/${data.partnerId}/hospitals/${data.hospitalId}/review`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

//Referral
export const GetReferralListAPI = async (data) => {
    try {
        const res = await axios.get(
            `${URL}/partners/${data.partnerId}/referrals`,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}

export const UpdateReferralAPI = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/partners/${data.partnerId}/customer/${data.customerId}/referrals/${data.referralId}`,
            data.body,
            {
                headers: headers()
            }
        )
        return res
    } catch (error) {
        return error
    }
}
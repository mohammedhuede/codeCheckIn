import { combineReducers } from 'redux'

import HospitalDetails from './hospital-details.reducer'
import Referral from "./referral.reducer";

export default combineReducers({
    HospitalDetails,
    Referral,
})
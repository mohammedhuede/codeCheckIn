import HospitalDetailsCreators, {Constants as HospitalDetailsConstants} from './hospital-details.action'
import ReferralCreators, {
  Constants as ReferralConstants,
} from "./referral.action";


export const Constants = {
    ...HospitalDetailsConstants,
    ...ReferralConstants,
}

export const Actions = {
    ...HospitalDetailsCreators,
    ...ReferralCreators,
}
import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  postReferralRequest: ["data"],
  postReferralSuccess: ["data"],
  postReferralError: ["error"],
  getReferralRequest: ["data"],
  getReferralSuccess: ["data"],
  getReferralError: ["error"],
  updateReferralRequest: ["data"],
  updateReferralSuccess: ["data"],
  updateReferralError: ["error"],
  getListReferralRequest: ["data"],
  getListReferralSuccess: ["data"],
  getListReferralError: ["error"],
  deleteReferralRequest: ["data"],
  deleteReferralSuccess: ["data"],
  deleteReferralError: ["error"],
});

export const Constants = Types;
export default Creators;
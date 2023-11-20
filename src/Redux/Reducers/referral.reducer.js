import { createReducer } from "reduxsauce";
import { Constants } from "../Actions";

const INITIAL_STATE = {
  isSubmitted: false,
  isUpdated: false,
  isDeleted: false,
  isError: false,
  isLoading: false,
  listReferral: {},
  getReferral: {},
  error: null,
  updatedReferral:{}
};

const postReferralRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const postReferralSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
  };
};

const postReferralError = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    isError: true,
    error: action.data,
  };
};

const getListReferralRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const getListReferralSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    listReferral: action.data,
  };
};

const getListReferralError = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    isError: true,
    error: action.data,
  };
};

const updateReferralRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    isUpdated:false,
    
  };
};

const updateReferralSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    isUpdated:true,
    updatedReferral:action.data
  };
};

const updateReferralError = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    isError: true,
    error:action.error
  };
};

const HANDLERS = {
  [Constants.GET_LIST_REFERRAL_REQUEST]: getListReferralRequest,
  [Constants.GET_LIST_REFERRAL_SUCCESS]: getListReferralSuccess,
  [Constants.GET_LIST_REFERRAL_ERROR]: getListReferralError,
  [Constants.UPDATE_REFERRAL_REQUEST]: updateReferralRequest,
  [Constants.UPDATE_REFERRAL_SUCCESS]: updateReferralSuccess,
  [Constants.UPDATE_REFERRAL_ERROR]: updateReferralError,
  [Constants.POST_REFERRAL_REQUEST]: postReferralRequest,
  [Constants.POST_REFERRAL_SUCCESS]: postReferralSuccess,
  [Constants.POST_REFERRAL_ERROR]: postReferralError,
};

export default createReducer(INITIAL_STATE, HANDLERS);
import { SIGN_UP_INIT, SIGN_UP_SUCCESSFUL, SIGN_UP_FAILED, OTP_VERIFICATION, MERCHANT_SIGNUP_OTP_FAILED, MERCHANT_SIGN_UP_OTP_VERIFY_INIT, MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, MERCHANT_FORGET_PASSWORD_FAILED, MERCHANT_FORGET_PASSWORD_INIT, MERCHANT_FORGET_PASSWORD_SUCCESS, MERCHAT_LOGIN_FAILED, MERCHANT_LOGIN_INIT, MERCHANT_LOGIN_SUCCESS, MERCHANT_FORGET_PWD_OTP_INIT, MERCHANT_FORGET_PWD_OTP_FAIL, MERCHANT_FORGET_PWD_OTP_SUCCESS, MERCHANT_CREATE_NEW_PWD_SUCCESS, MERCHANT_CREATE_NEW_PWD_FAILED, MERCHANT_CREATE_NEW_PWD_INIT, MERCHANT_LOGOUT } from "../../authentication/signup/actionTypes";

const initialState = {
  status: "",
  username: "",
  accessToken: "",
  isLoggedIn: false,
  isLoading: false,
  error: "",
  message: "",
  phoneNumber: 0,
  otpMsg: 0,
  page: "",
  email: "",
  uniqueNumber: 0,
  formattedMblNumber: "xxxxxxxxxx",
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_INIT:
      return {
        ...state,
        isLoading: true,
        page: "signup",
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        message: "Sucessfully Signed up",
        phoneNumber: action.payload.phoneNumber,
        page: "signup",
        formattedMblNumber: action.payload?.phoneNumber.slice(0, 2) + "xxxxxxx" + action.payload.phoneNumber.slice(7, 10),
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case MERCHANT_SIGN_UP_OTP_VERIFY_INIT:
      return {
        ...state,
        isLoading: false,
        message: "Loading",
        error: "",
      };
    case MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: "",
      };
    case MERCHANT_SIGNUP_OTP_FAILED:
      return {
        ...state,
        isLoading: false,
        otpMsg: "",
        error: action.payload,
      };
    case MERCHANT_LOGIN_INIT:
      return {
        ...state,
        isLoading: true,
        page: "login",
        uniqueNumber: action.payload,
      };
    case MERCHANT_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.accessToken,
        message: "Sucessfully Logged In",
        phoneNumber: action.payload.phoneNumber,
        page: "login",
        email: action.payload.email,
        username: action.payload.username,
      };
    case MERCHAT_LOGIN_FAILED:
      return {
        ...state,
        username: "",
        accessToken: "",
        isLoggedIn: false,
        isLoading: false,
        error: action.payload,
        message: "",
        phoneNumber: 0,
        otpMsg: 0,
        page: "",
        email: "",
        uniqueNumber: 0,
      };
    case MERCHANT_FORGET_PWD_OTP_INIT:
      return {
        ...state,
        isLoading: true,
        message: "Loading",
        error: "",
      };
    case MERCHANT_FORGET_PWD_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: "",
      };
    case MERCHANT_FORGET_PWD_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        otpMsg: "",
      };
    case MERCHANT_CREATE_NEW_PWD_INIT:
      return {
        ...state,
        isLoading: true,
        message: "Loading",
        error: "",
      };
    case MERCHANT_CREATE_NEW_PWD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: "",
      };
    case MERCHANT_CREATE_NEW_PWD_FAILED:
      return {
        ...state,
        isLoading: false,
        message: "",
        error: action.payload,
      };
    case MERCHANT_FORGET_PASSWORD_INIT:
      return {
        ...state,
        isLoading: true,
        message: "Loading",
        error: "",
        page: "login",
      };
    case MERCHANT_FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        error: "",
        phoneNumber: action.payload.phoneNumber,
        formattedMblNumber: action.payload.phoneNumber.slice(0, 2) + "xxxxxxx" + action.payload.phoneNumber.slice(7, 10),
        page: "login",
      };
    case MERCHANT_LOGOUT:
      return {
        ...state,
        status: "",
        username: "",
        accessToken: "",
        isLoggedIn: false,
        isLoading: false,
        error: "",
        message: "",
        phoneNumber: 0,
        otpMsg: 0,
        page: "",
        email: "",
        uniqueNumber: 0,
        formattedMblNumber: "xxxxxxxxxx",
      };
    default:
      return state;
  }
};

export default signupReducer;

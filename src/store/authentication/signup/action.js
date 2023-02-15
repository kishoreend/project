import { SIGN_UP_INIT, SIGN_UP_SUCCESSFUL, SIGN_UP_FAILED, OTP_VERIFICATION } from "./actionTypes";
import { reduxPostData } from "../../../ServiceCall";

export const getSignUpDetails = (data) => {
    return {
        type: SIGN_UP_INIT,
        payload: data
    }
}

export const getOtpVerification = (data) => {
    return {
        type: OTP_VERIFICATION,
        payload: data
    }
}

export const getUserDetails = (data) => {
    return {
        type: SIGN_UP_SUCCESSFUL,
        payload: data
    }
}

export const signUpFailed = (data) => {
    return {
        type: SIGN_UP_FAILED,
        payload: data
    }
}

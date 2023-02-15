import * as adminActionTypes from "./actionTypes";

const initialState = {

    status: '',
    username: '',
    accessToken: '',
    isLoggedIn: false,
    message: '',
    isLoading: false,
    error: '',
    merchants: [],
    selectedMerchantRequest: {},
    newMerhant: {},
    phoneNumber: 0,
    formattedPhoneNumber: 'xxxxxxxxxx',
    email: '',
    uniqueNumber: 0
}

const adminReducer = (state = initialState, action) => {
  
    switch (action.type) {

        case adminActionTypes.ADMIN_CHECK_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: "",
                message: "Loading"
            }
        case adminActionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                message: "success",
                error: "",
                isLoading: false,
                phoneNumber: action.payload.phoneNumber,
                email: action.payload.email
            }
        case adminActionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                username: '',
                accessToken: '',
                isLoading: false,
                message: 'Failed',
                error: action.payload === undefined ? "Something went wrong! Please try again later" : action.payload
            }

        case adminActionTypes.ADMIN_LOGOUT:
            return {
                ...state,
                status: '',
                username: '',
                accessToken: '',
                isLoggedIn: false,
                message: '',
                isLoading: false,
                error: '',
                merchants: [],
                newMerhant: {},
                phoneNumber: 0,
                email: ''
            }

        case adminActionTypes.ADMIN_CHECK_FETCH_MERCHANT:
            // state.merchants = action.payload;
            return {
                ...state,
                isLoading: true,
                message: "Please wait..."
            }

        case adminActionTypes.ADMIN_FETCH_MERCHANT:
            // state.merchants = action.payload;
            return {
                ...state,
                merchants: action.payload,
                isLoading: false,
                message: ""
            }

        case adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL:
            return {
                ...state,
                error: action.payload === undefined ? "Something went wrong! Please try again later" : action.payload,
                isLoading: false,
                message: ""
            }
        case adminActionTypes.ADMIN_CREATE_MERCHANT_INIT:
            return {
                ...state,
                isLoading: true,
                message: "Loading",
                error: "",
                newMerhant: {}
            }
        case adminActionTypes.ADMIN_CREATE_MERCHANT:
            // state.merchants = action.payload;
            return {
                ...state,
                isLoading: false,
                error: "",
                newMerhant: action.payload,
                merchants: [...state.merchants, action.payload],
                message: 'Merchant Created Successfully!!'
            }

        case adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE:
            // state.merchants = action.payload;
            return {
                ...state,
                error: action.payload === undefined ? "Something went wrong! Please try again later" : action.payload,
                isLoading: false,
                message: "",
            }

        case adminActionTypes.ADMIN_FORGET_PWD_OTP_INIT:
            return {
                ...state,
                isLoading: true,
                message: "Loading",
                error: "",
                phoneNumber: action.payload.phoneNumber,
                formattedPhoneNumber: action.payload.formattedPhoneNumber
            }
        case adminActionTypes.ADMIN_FORGET_PWD_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                error: "",
                username: ""

            }
        case adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                otpMsg: '',
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_INIT:
            return {
                ...state,
                isLoading: true,
                message: "Loading",
                error: ""
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                error: ""
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_FAILED:
            return {
                ...state,
                isLoading: false,
                message: "",
                error: action.payload
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_INIT:
            return {
                ...state,
                isLoading: true,
                message: '',
                error: ''
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                error: ''
            }
        case adminActionTypes.ADMIN_CREATE_NEW_PWD_FAILED:
            return {
                ...state,
                isLoading: false,
                message: "",
                error: action.payload
            }
        case adminActionTypes.ADMIN_SELECTED_MERCHANT:
            return {
                ...state,
                isLoading: false,
                message: "",
                uniqueNumber: action.payload
            }
        case adminActionTypes.ADMIN_SELECTED_MERCHANT_REQUEST:
            return {
                ...state,
                isLoading: false,
                message: "",
                selectedMerchantRequest: action.payload
            }
        default:
            return state;
    }
}

export default adminReducer;
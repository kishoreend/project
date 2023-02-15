import {
    ADMIN_CHECK_LOGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_FETCH_MERCHANT
    , ADMIN_CREATE_MERCHANT, ADMIN_MERCHANT_FAILED_TO_CREATE, ADMIN_SELECTED_MERCHANT, ADMIN_SELECTED_MERCHANT_REQUEST
} from "../admin/actionTypes";
import axios from "../../axios";
import config from "../../../src/container/app/navigation.json";
// import config from "../src/container/app/navigation.json";
import { reduxPostData } from '../../ServiceCall';
import { useHistory } from 'react-router-dom';

export const reduxPostData1 = (url, data, module, InitialCheckType, successType, FailureType, payload) => async (dispatch) => {
    console.log("Entered");
    dispatch({ type: InitialCheckType });
    console.log("from redux action service call");
    const response = await axios({
        baseURL:
            module === "admin"
                ? config.endpoint.url + ":8082"
                : module === "customer"
                    ? config.endpoint.url + ":8081"
                    : config.endpoint.url + ":8080",
        method: "post",
        url: url,
        data: JSON.stringify(data),
    })
        //console.log("url", url);
        .then((response) => {
            console.log('success', response)
            dispatch({ type: successType, payload: response })
        })
        .catch((err) => {
            console.log('failure', err);
            dispatch({ type: FailureType, payload: err.response })
        }
            //err.response
        );
}
// const result = await response;
// console.log("from service call response data", result);
// return result;


// export const reduxtData = (url, data, module) => (dispatch, getState) => {
//     console.log("Entered");
//     dispatch({ type: ADMIN_CHECK_LOGIN });
//     console.log("from redux action service call");
//     const response = reduxPostData(url, data, module)
//         .then((response) => {
//             console.log('success', response)
//             if (response.status === 200) {
//                 dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
//                 console.log(response);
//             }
//             else {
//                 dispatch({ type: ADMIN_LOGIN_FAIL, payload: response.data.error });
//             }
//         })
//         .catch((err) => {
//             console.log('failure', err);
//             if (err.response === undefined || err.response.data === undefined) {
//                 dispatch({ type: ADMIN_LOGIN_FAIL, payload: err.response })
//             }
//             else {
//                 dispatch({ type: ADMIN_LOGIN_FAIL, payload: err.response.data.error })
//             }
//         }
//             //err.response
//         );

// }


export const checkAdminLogin = () => {
    return {
        type: ADMIN_CHECK_LOGIN,
    }
}

export const adminLoginSuccess = (data) => {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        payload: data
    }
}

export const adminLoginFail = () => {
    return {
        type: ADMIN_LOGIN_FAIL
    }
}

export const getMerchantDetailsFromAdmin = (data) => {
    return {
        type: ADMIN_FETCH_MERCHANT,
        payload: data
    }
}

export const createMerchantFromAdmin = (merchant) => {
    return {
        type: ADMIN_CREATE_MERCHANT,
        payload: merchant
    }
}

export const failedMerchantCreation = (data) => {
    return {
        type: ADMIN_MERCHANT_FAILED_TO_CREATE,
        payload: data
    }
}

export const setSelectedMerchantRequest = (data) => {
    return {
        type: ADMIN_SELECTED_MERCHANT_REQUEST,
        payload: data
    }
}
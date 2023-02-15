import {
  CUSTOMER_LOGIN,
  CUSTOMER_LOGIN_FAILED,
  CUSTOMER_LOGIN_SUCCESSFUL,
  CUSTOMER_OTP_VERIFICATION_INIT,
  CUSTOMER_SIGN_UP,
  CUSTOMER_SIGN_UP_FAILED,
  CUSTOMER_SIGN_UP_SUCCESSFUL,
  FOODSTALLS_DETAILS_LOADED,
  GET_CART_ITEMS,
  ADD_CART_ITEM,
  RESET_CART,
  GET_ACTIVE_FC,
  SET_ACTIVE_FC,
  SET_ACTIVE_FS,
  SET_ACTIVE_MENU_ITEM,
  GET_ACTIVE_MENU_ITEM
} from "./actionTypes";
import axios from "axios";
import { getData } from "../../ServiceCall";
export const getCustomerSignUpDetails = (data) => {
  return {
    type: CUSTOMER_SIGN_UP,
    payload: data,
  };
};

export const getCustomerOtpVerification = (data) => {
  return {
    type: CUSTOMER_OTP_VERIFICATION_INIT,
    payload: data,
  };
};

export const getCustomerSuccessfulSignup = (data) => {
  return {
    type: CUSTOMER_SIGN_UP_SUCCESSFUL,
    payload: data,
  };
};

export const getCustomerFailedSignup = (data) => {
  return {
    type: CUSTOMER_SIGN_UP_FAILED,
    payload: data,
  };
};

export const customerLoginSuccessful = (data) => {
  return {
    type: CUSTOMER_LOGIN_SUCCESSFUL,
    payload: data,
  };
};

export const customerLoginFailed = (data) => {
  return {
    type: CUSTOMER_LOGIN_FAILED,
    payload: data,
  };
};

export const foodStallsInformation = (data) => {
  return {
    type: FOODSTALLS_DETAILS_LOADED,
    payload: data,
  };
};

export const addFoodItemToCart = (item) => {
  console.log("addig item to redux store", item);
  return {
    type: ADD_CART_ITEM,
    payload: item,
  };
};

export const resetCart = (items) => {
  console.log("removing item from redux store", items);
  return {
    type: RESET_CART,
    payload: items,
  };
};
export const getActivetFc = (id) => async (dispatch) => {
  // console.log("inside getactivefc")
  try {
    const { data } = await getData(
      `/api/customer/get-foodcourt-details?fcId=${id}`
    );
    dispatch(setActiveFc(data.data));
  } catch (e) {
    // console.log(data)
    dispatch(setActiveFc({}));
  }
};
export const setActiveFc = (data) => {
  return {
    type: GET_ACTIVE_FC,
    payload: data,
  };
};
export const setActiveFs = (id) => {
  return {
    type: SET_ACTIVE_FS,
    payload: id,
  };
};

export const setActiveMenuItem = (item) => {
  return {
    type: SET_ACTIVE_MENU_ITEM,
    payload: item
  }
}

export const getActiveMenuItem = (item) => {
  return {
    type: GET_ACTIVE_MENU_ITEM,
    payload: item
  }
}

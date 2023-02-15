import {
  CUSTOMER_LOGIN_INIT,
  CUSTOMER_LOGIN_FAILED,
  CUSTOMER_LOGIN_SUCCESSFUL,
  CUSTOMER_OTP_VERIFICATION,
  CUSTOMER_SIGN_UP,
  CUSTOMER_SIGN_UP_FAILED,
  CUSTOMER_SIGN_UP_SUCCESSFUL,
  CUSTOMER_OTP_VERIFICATION_SUCCESS,
  CUSTOMER_OTP_VERIFICATION_FAILED,
  CUSTOMER_LOGIN_PHONENUMBER,
  CUSTOMER_OTP_VERIFICATION_INIT,
  FOODSTALLS_DETAILS_LOADED,
  ADD_CART_ITEM,
  RESET_CART,
  GET_ACTIVE_FC,
  SET_ACTIVE_FS,
  RESET_CUSTOMER_STORE,
  SET_ACTIVE_MENU_ITEM,
  GET_ACTIVE_MENU_ITEM
} from "./actionTypes";

const initialState = {
  user: {
    status: "",
    username: "",
    accessToken: "",
    isLoggedIn: false,
    phoneNumber: 0,
    otpMsg: 0,
    error: "",
    message: "",
    isLoading: true,
  },
  foodStalls: [],
  cartItems: [],
  activeFC: {
    buType: ''
  },
  activeFs: {},
  activeMenuItem: ''
};

const customerReducer = (state = initialState, action) => {
  console.log("In reducer", action.payload);
  switch (action.type) {
    case CUSTOMER_LOGIN_INIT:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          phoneNumber: action.payload,
        },
      };

    case CUSTOMER_LOGIN_PHONENUMBER:
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          message: action.payload,
          isLoading: false,
        },
      };
    case CUSTOMER_OTP_VERIFICATION_INIT:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };
    case CUSTOMER_OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: "",
          message: action.payload,
        },
      };
    case CUSTOMER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          accessToken: action.payload.accessToken,
        },
      };
    case CUSTOMER_LOGIN_FAILED:
    case CUSTOMER_OTP_VERIFICATION_FAILED:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: false,
          error: action.payload,
        },
      };
    case FOODSTALLS_DETAILS_LOADED:
      return {
        ...state,
        foodStalls: [...action.payload],
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
          },
        ],
      };
    case RESET_CART:
      return {
        ...state,
        cartItems: [...action.payload],
      };
    case GET_ACTIVE_FC:
      return {
        ...state,
        activeFC: action.payload,
      };
    case SET_ACTIVE_FS: {
      let activeFs = {};
      if (action.payload && state.foodStalls)
      activeFs = state.foodStalls.filter(
          (fs) => fs.shop_id == action.payload
        );
      return { ...state, activeFs: activeFs };
    }
    case RESET_CUSTOMER_STORE: {
      return {
        ...state, ...initialState
      }
    }
    case SET_ACTIVE_MENU_ITEM: {
      return{
        ...state, activeMenuItem: action.payload
      }
    }
    default:
      return state;
  }
};

export default customerReducer;

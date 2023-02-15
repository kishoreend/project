import { combineReducers } from "redux";
import signupReducer from "./authentication/signup/reducer";
import adminReducer from "./admin/adminreducer";
import customerReducer from "./customer/customerreducer";
import merchantReducer from "./authentication/merchant/merchantReducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  admin: adminReducer,
  customer: customerReducer,
  merchant: merchantReducer,
});

export default rootReducer;

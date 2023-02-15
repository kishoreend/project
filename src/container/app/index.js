import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import config from "./navigation.json";
//merchant
import SignupPage from "../Pages/Merchant/SignupPage";
import OTPVerificationPage from "../Pages/Merchant/OTPVerificationPage";
import CreateLoginPage from "../Pages/Merchant/CreateLoginPage";
import ForgetPasswordPage from "../Pages/Merchant/ForgetPasswordPage";
import CreateNewPasswordPage from "../Pages/Merchant/CreateNewPasswordPage";
import ChangePasswordPage from "../Pages/Merchant/ChangePasswordPage";
import Merchant_DashboardPage from "../Pages/Merchant/DashboardPage";
import SubscriptionDes from "../Pages/Merchant/SubscriptionDes";
//Admin
import Admin_OTPVerificationPage from "../Pages/Admin/OTPVerificationPage";
import Admin_CreateLoginPage from "../Pages/Admin/CreateLoginPage";
import Admin_ForgetPasswordPage from "../Pages/Admin/ForgetPasswordPage";
import Admin_CreateNewPasswordPage from "../Pages/Admin/CreateNewPasswordPage";
import Admin_ChangePasswordPage from "../Pages/Admin/ChangePasswordPage";
import Admin_Dashboard from "../Pages/Admin/AdminDashboardPage";
import Admin_AboutUs from "../Pages/Admin/Admin_AboutUs";
import Admin_Merchants from "../Pages/Admin/AdminMerchants";
import Admin_QRCodeGenerator from "../Pages/Admin/Admin_QRCodeGenerator";
import Admin_Approvals from "../Pages/Admin/Admin_Approvals";
import AdminMerchants_FoodStall from "../Pages/Admin/AdminMerchants_FoodStall";
import Admin_Roles from "../Pages/Admin/Admin_Roles";
import Admin_Merchant_Requests from "../Pages/Admin/Admin_Merchant_Requests";
import Admin_TermsandCondition from "../Pages/Admin/Admin_TermsandCondition";
import Admin_Grievance from "../Pages/Admin/Admin_Grievance";
import Admin_OrderHistory from "../Pages/Admin/Admin_OrderHistory";
import Admin_Customer from "../Pages/Admin/Admin_Customer";
import Admin_FAQ from "../Pages/Admin/Admin_FAQ";
import Admin_Inbox from "../Pages/Admin/Admin_Inbox";
import Admin_Subscription from "../Pages/Admin/Admin_Subscription";
import Admin_Notifications from "../Pages/Admin/Admin_Notifications";
//customer
import CustomerHome from "../Pages/Customer/CustomerHome";
import AboutUs from "../Pages/Customer/AboutUs";
import Customer_FAQ from "../Pages/Customer/FAQ";
import HowSiteWorks from "../Pages/Customer/HowSiteWorks";
import Customer_Account from "../Pages/Customer/Customer_Account";
import Customer_Account_Mobile from "../Pages/Customer/Customer_Account_Mobile";
import Customer_Account_OTP from "../Pages/Customer/Customer_Account_OTP";
import Customer_MyAccount from "../Pages/Customer/Customer_MyAccount";
import Customer_OrderDetails from "../Pages/Customer/Customer_OrderDetails";
import Customer_FeedbackReview from "../Pages/Customer/Customer_FeedbackReview";
import Customer_Report from "../Pages/Customer/Customer_Report";
import TermsandCondition from "../Pages/Customer/TermsandCondition";
import Customer_ContactUs from "../Pages/Customer/Customer_ContactUs";
import Customer_Menu from "../Pages/Customer/Customer_Menu";
import Customer_Cart from "../Pages/Customer/Customer_Cart";
import Customer_ScanQR from "../Pages/Customer/Customer_ScanQR";

//Common
import PasswordSucessPage from "../../components/Common/PasswordSucessPage";
import AdminPasswordSucessPage from "../../components/Common/AdminPasswordSucessPage";
import DevPage from "../Pages/Dev/DevPage";
import SignUpSucessMessagePage from "../../components/Common/SignUpSucessMessagePage";
import SuccessMessage from "../../components/Common/SuccessMessage";

import FoodMenu from "../Pages/Merchant/FoodMenu";
import MyProfile from "../Pages/Merchant/MyProfile";
import OrderHistory from "../Pages/Merchant/OrderHistory";
import Orders from "../Pages/Merchant/Orders";
import Subscription from "../Pages/Merchant/Subscription";
import Merchant_Roles from "../Pages/Merchant/Merchant_Roles";
import CustomerGrievance from "../Pages/Merchant/CustomerGrievance";
import Notifications from "../Pages/Merchant/Notifications";
import Merchant_FAQ from "../Pages/Merchant/Faq";
import Feedback from "../Pages/Merchant/Feedback";
import TermsAndConditions from "../Pages/Merchant/TermsAndConditions";
import ContactUs from "../Pages/Merchant/ContactUs";
import Settings from "../Pages/Merchant/Settings";
import Inventory from "../Pages/Admin/Inventory";

const App = () => {
  console.log(config.merchanturl.SignupPage);
  return (
    <Fragment>
      <BrowserRouter>
        <ToastContainer autoClose={2500} position="top-center" />
        <Switch>
          <Route exact path="/" component={SignupPage} />
          <Route exact path="/en" component={SignupPage} />
          <Route exact path="/ar" component={SignupPage} />
          <Route exact path={config.merchanturl.SignupPage} component={SignupPage} />
          <Route exact path={config.merchanturl.OTPVerificationPage} component={OTPVerificationPage} />
          <Route exact path={config.merchanturl.CreateLoginPage} component={CreateLoginPage} />
          <Route exact path={config.merchanturl.ForgetPasswordPage} component={ForgetPasswordPage} />
          <Route exact path={config.merchanturl.CreateNewPasswordPage} component={CreateNewPasswordPage} />
          <Route exact path={config.merchanturl.ChangePasswordPage} component={ChangePasswordPage} />
          <Route exact path={config.merchanturl.Merchant_DashboardPage} component={Merchant_DashboardPage} />
          <Route exact path={config.merchanturl.FoodMenu} component={FoodMenu} />
          <Route exact path={config.merchanturl.MyProfile} component={MyProfile} />
          <Route exact path={config.merchanturl.Orders} component={Orders} />
          <Route exact path={config.merchanturl.OrderHistory} component={OrderHistory} />          
          <Route exact path={config.merchanturl.Merchant_Roles} component={Merchant_Roles} />
          <Route exact path={config.merchanturl.Subscription} component={Subscription} />
          <Route exact path={config.merchanturl.SubscriptionDes} component={SubscriptionDes} />
          <Route exact path={config.merchanturl.CustomerGrievance} component={CustomerGrievance} />
          <Route exact path={config.merchanturl.Notifications} component={Notifications} />
          <Route exact path={config.merchanturl.Merchant_FAQ} component={Merchant_FAQ} />
          <Route exact path={config.merchanturl.Feedback} component={Feedback} />
          <Route exact path={config.merchanturl.TermsAndConditions} component={TermsAndConditions} />
          <Route exact path={config.merchanturl.ContactUs} component={ContactUs} />
          <Route exact path={config.merchanturl.Settings} component={Settings} />
          {/* admin */}
          <Route exact path={config.adminurl.Admin_OTPVerificationPage} component={Admin_OTPVerificationPage} />
          <Route exact path={config.adminurl.Admin_CreateLoginPage} component={Admin_CreateLoginPage} />
          <Route exact path={config.adminurl.Admin_ForgetPasswordPage} component={Admin_ForgetPasswordPage} />
          <Route exact path={config.adminurl.Admin_CreateNewPasswordPage} component={Admin_CreateNewPasswordPage} />
          <Route exact path={config.adminurl.Admin_ChangePasswordPage} component={Admin_ChangePasswordPage} />
          <Route exact path={config.adminurl.Admin_Dashboard} component={Admin_Dashboard} />
          <Route exact path={config.adminurl.Admin_AboutUs} component={Admin_AboutUs} />
          <Route exact path={config.adminurl.Admin_Merchants} component={Admin_Merchants} />
          <Route exact path={config.adminurl.Admin_QRCodeGenerator} component={Admin_QRCodeGenerator} />
          <Route exact path={config.adminurl.AdminMerchants_FoodStall} component={AdminMerchants_FoodStall} />
          <Route exact path={config.adminurl.Admin_Roles} component={Admin_Roles} />
          <Route exact path={config.adminurl.Admin_Approvals} component={Admin_Approvals} />
          <Route exact path={config.adminurl.Admin_Merchant_Requests} component={Admin_Merchant_Requests} />
          <Route exact path={config.adminurl.Admin_TermsandCondition} component={Admin_TermsandCondition} />
          <Route exact path={config.adminurl.Admin_Grievance} component={Admin_Grievance} />
          <Route exact path={config.adminurl.Admin_OrderHistory} component={Admin_OrderHistory} />
          <Route exact path={config.adminurl.Admin_Customer} component={Admin_Customer} />
          <Route exact path={config.adminurl.Admin_FAQ} component={Admin_FAQ} />
          <Route exact path={config.adminurl.Admin_Inbox} component={Admin_Inbox} />
          <Route exact path={config.adminurl.Admin_Subscription} component={Admin_Subscription} />
          <Route exact path={config.adminurl.Admin_Notifications} component={Admin_Notifications} />
          <Route exact path={config.adminurl.Admin_Inventory} component={Inventory} />

          {/* customer
           */}
          <Route exact path={config.customerurl.CustomerHome} component={CustomerHome} />
          <Route exact path={config.customerurl.AboutUs} component={AboutUs} />
          <Route exact path={config.customerurl.Customer_FAQ} component={Customer_FAQ} />
          <Route exact path={config.customerurl.HowSiteWorks} component={HowSiteWorks} />
          {/* <Route exact path={config.customerurl.Customer_Account} component={Customer_Account} /> */}
          <Route exact path={config.customerurl.Customer_Account} render={props => <Customer_Account {...props}/>} />

          <Route exact path={config.customerurl.Customer_Account_Mobile} component={Customer_Account_Mobile} />
          <Route exact path={config.customerurl.Customer_Account_OTP} component={Customer_Account_OTP} />
          <Route exact path={config.customerurl.Customer_MyAccount} component={Customer_MyAccount} />
          <Route exact path={config.customerurl.Customer_OrderDetails} component={Customer_OrderDetails} />
          <Route exact path={config.customerurl.Customer_FeedbackReview} component={Customer_FeedbackReview} />
          <Route exact path={config.customerurl.Customer_Report} component={Customer_Report} />
          <Route exact path={config.customerurl.TermsandCondition} component={TermsandCondition} />
          <Route exact path={config.customerurl.Customer_ContactUs} component={Customer_ContactUs} />
          <Route exact path={config.customerurl.Customer_Menu} component={Customer_Menu} />
          <Route exact path={config.customerurl.Customer_Cart} component={Customer_Cart} />
          <Route exact path={config.customerurl.Customer_ScanQR} component={Customer_ScanQR} />
          {/* common */}
          <Route exact path={config.common.DevPage} component={DevPage} />
          <Route exact path={config.common.PasswordSucessPage} component={PasswordSucessPage} />
          <Route exact path={config.common.AdminPasswordSucessPage} component={AdminPasswordSucessPage} />
          <Route exact path={config.common.SignUpSucessMessagePage} component={SignUpSucessMessagePage} />
          <Route exact path={config.common.SuccessMessage} component={SuccessMessage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;

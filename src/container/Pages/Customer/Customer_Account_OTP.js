import React, { useState, useEffect } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Timer from "otp-timer";
import OtpInput from "react-otp-input";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import cus_mobile from "../../../assets/icons/cus-mobile.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { getData, postData, reduxPostData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";
import { CUSTOMER_OTP_VERIFICATION_FAILED, CUSTOMER_OTP_VERIFICATION_INIT, CUSTOMER_OTP_VERIFICATION_SUCCESS, CUSTOMER_LOGIN_SUCCESSFUL } from "../../../store/customer/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import foodstall_default from "../../../assets/icons/foodstall.jpg";
import greater_arrow from "../../../assets/icons/greater_arrow.png";
import * as userActionTypes from "../../../store/customer/actionTypes";

const Customer_Account_OTP = (props) => {
  const [otpMsg, setotpMsg] = useState(0);
  const [guiMsg, setGuiMsg] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [type, setType] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const customerDetails = useSelector((state) => state.customer.user);

  const activeFC = useSelector(state => state.customer.activeFC)
  console.log(activeFC);

  const handleChange = (otpMsg) => {
    console.log(otpMsg);
    setotpMsg(otpMsg);
  };
  const message = customerDetails.phoneNumber === 0 ? history.push(config.customerurl.Customer_Account) : "Enter OTP sent to " + customerDetails.phoneNumber;

  const verifyCustomerOTP = () => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    if (otpMsg === "" || otpMsg === 0) {
      setGuiMsg("Please enter OTP");
      return;
    }

    console.log('otp ', otpMsg);
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: CUSTOMER_OTP_VERIFICATION_INIT });
    let result = await reduxPostData(
      "/auth/user/signin",
      {
        otp: otpMsg,
        phoneNumber: customerDetails.phoneNumber,
      },
      "customer",
      "post"
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          dispatch({ type: CUSTOMER_LOGIN_SUCCESSFUL, payload: response.data });
          setIsLoaded((isLoaded) => !isLoaded);
          localStorage.setItem("customerLoggedinmobile", customerDetails.phoneNumber);
          const selfStallId = localStorage.getItem('selfStallId');

          if (selfStallId) {
            // {config.customerurl.Customer_Menu + "?fs-id=" + selfStallId}
            dispatch(getStalls(selfStallId));
          } else {
            history.push(config.customerurl.CustomerHome);
          }

        } else if (response.status === 401) {
          console.log("else", response);
          dispatch({ type: CUSTOMER_OTP_VERIFICATION_FAILED, payload: response.data.error });
          validationMessage = response?.data?.error;
          setIsLoaded((isLoaded) => !isLoaded);
        }
        updateCustomerDetails();
      })
      .catch((err) => {
        console.log("failure", err.response);
        type = "danger";
        if (err.response.status == '401') {
          validationMessage = "Invalid OTP."
        } else {
          validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        }
        err.response?.data?.error === "Unauthorized" ? (validationMessage = "Invalid OTP") : (validationMessage = validationMessage);
        dispatch({
          type: CUSTOMER_OTP_VERIFICATION_FAILED,
          payload: validationMessage,
        });
        setGuiMsg(validationMessage);
        setType(type);
        setIsLoaded((isLoaded) => !isLoaded);
        console.log(guiMsg);
      });
  };

  const updateCustomerDetails = async () => {
    await postData(
      `/api/customer/update-profile?phone-number=${customerDetails.phoneNumber}`,
      {
        email: "",
        fullName: localStorage.getItem("fullname"),
      },
      "customer",
      "POST"
    );
  }

  const getStalls = (selfStallId) => async (dispatch) => {
    console.log("in getStalls");
    let validationMessage = "";
    let type = "info";

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/', '_');
    console.log(timezone);

    let result = await getData("/api/customer/get-foodstalls?fcId=" + activeFC.foodCourtId + "&timezone=" + timezone, "get", "customer")
      .then((response) => {
        if (response.status === 200) {
          console.log("foodstalls1", response);
          const foodStalls = response.data && response.data.data;
          const Shops = foodStalls.map((foodStall) => {
            return {
              shop_id: foodStall.foodStallId,
              shop_image: foodStall.foodStallPics ? foodStall.foodStallPics[0] : foodstall_default,
              shop_name: foodStall.foodStallName,
              arrow: greater_arrow,
              deliverTime: foodStall.deliveryTime,
              foodCourtName: foodStall.foodCourtName,
              tax: foodStall.tax
            };
          });

          dispatch({
            type: userActionTypes.FOODSTALLS_DETAILS_LOADED,
            payload: Shops,
          });

          localStorage.setItem("foodStalls", JSON.stringify(Shops));

          // history.push(config.customerurl.CustomerHome);
          history.push(config.customerurl.Customer_Menu + "?fs-id=" + selfStallId);
        } else {
          console.log("else", response);
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        type = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
  };

  const handleSubmit = () => {
    // hide register button and display mobile numberin label in sidebar menu in customer screen
    //if sucess go here
    dispatch(verifyCustomerOTP());
  };

  useEffect(() => {
    console.log("resendOTP_after5min Timer started");
    setTimeout(() => {
      dispatch(resendOTP_after10min());
      console.log("resendOTP_after5min end");
    }, 300000); // call the below api after 5 min
  }, []);

  const resendOTP_after10min = () => async (dispatch) => {
    console.log("resendOTP");
    let validationMessage = "";
    let type = "";
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: CUSTOMER_OTP_VERIFICATION_INIT });

    let result = await reduxPostData("/auth/user/update-otp-expiry?phone-number=" + customerDetails.phoneNumber, "", "customer", "post")
      .then((response) => {
        if (response.status === 200) {
          console.log("resendOTP", response);
          validationMessage = "OTP expired, please resend OTP and verify";
          type = "warn";
          //dispatch({ type: CUSTOMER_LOGIN_SUCCESSFUL, payload: response.data });
        } else {
          console.log("else", response);
          validationMessage = "OTP sending failed. Please try again";
          type = "danger";
          //dispatch({ type: CUSTOMER_OTP_VERIFICATION_FAILED, payload: response.data.error });
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        type = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({
          type: CUSTOMER_OTP_VERIFICATION_FAILED,
          payload: validationMessage,
        });
      });
    setGuiMsg(validationMessage);
    setType(type);
    setIsLoaded((isLoaded) => !isLoaded);
  };

  const resendOTP = () => {
    dispatch(resend());
    console.log("resendOTP_after5min Timer started");
    setTimeout(() => {
      dispatch(resendOTP_after10min());
      console.log("resendOTP_after5min end");
    }, 300000); // call the below api after 5 min
  };
  const resend = () => async (dispatch) => {
    console.log("resendOTP");
    let validationMessage = "";
    let type = "";
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: CUSTOMER_OTP_VERIFICATION_INIT });

    let result = await reduxPostData("/auth/user/resent-otp?phone-number=" + customerDetails.phoneNumber, "", "customer", "post")
      .then((response) => {
        if (response.status === 200) {
          console.log("resendOTP", response);
          validationMessage = response.data.data;
          type = "success";
          // dispatch({ type: CUSTOMER_LOGIN_SUCCESSFUL, payload: response.data });
        } else {
          console.log("else", response);
          validationMessage = "OTP sending failed. Please try again";
          type = "danger";
          dispatch({ type: CUSTOMER_OTP_VERIFICATION_FAILED, payload: response.data.error });
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        type = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({
          type: CUSTOMER_OTP_VERIFICATION_FAILED,
          payload: validationMessage,
        });
      });
    setGuiMsg(validationMessage);
    setType(type);
    setIsLoaded((isLoaded) => !isLoaded);
  };
  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            {
              // customerDetails.isLoggedIn && (
              //   <SideNavBar />
              // )
            }

            <div className="mobile_header_gray p-2">
              <span>
                <b>Verify Details</b>
              </span>
            </div>
            {/* <img src={cus_mobile} className="img-fluid p-5" /> */}
            <div className="lglogo"><img src={logo} className="w-25" /></div>
            <div className="w-100 text-center mt-2">
              <p>{message}</p>
              <div className="row">
                <div className="col-md-12">
                  <Row>
                    <Col lg={12}>
                      <div className="p-3">
                        <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                          <FormGroup className="mb-2 d-flex justify-content-center">
                            <OtpInput value={otpMsg} onChange={handleChange} numInputs={4} isInputNum separator=" " className="otpinput mb-2" />
                          </FormGroup>

                          <div className="t4f_link_otp px-2">
                            <Timer seconds={30} minutes={0} ButtonText={"Resend OTP"} text="Resend OTP in: " resend={resendOTP} />
                          </div>

                          <Alert message={guiMsg} type={type} />

                          <div className="mt-4 text-center">
                            <button color="primary" className="t4fbutton-dark w-75" type="submit">
                              {!isLoaded ? "Verify & Proceed" : "Please Wait..."}
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    </Col>
                  </Row>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_Account_OTP;

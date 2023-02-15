import React, { Component, useState, useEffect } from "react";
import Timer from "otp-timer";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../../../components/Footer";
import OtpInput from "react-otp-input";
import "../../../../../assets/styles/t4fstyle.scss";
import otp from "../../../../../assets/icons/orderotp.png";

import Alert from "../../../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, signUpFailed } from "../../../../../store/authentication/signup/action";
import axios from "../../../../../axios";
import { getData, reduxGetData, reduxPostData, callApi } from "../../../../../ServiceCall";
import config from "../../../../../container/app/navigation.json";
import { MERCHANT_FORGET_PWD_OTP_FAIL, MERCHANT_FORGET_PWD_OTP_INIT, MERCHANT_FORGET_PWD_OTP_SUCCESS, MERCHANT_SIGNUP_OTP_FAILED, MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, MERCHANT_SIGN_UP_OTP_VERIFY_INIT } from "../../../../../store/authentication/signup/actionTypes";

const SendOTP = (props) => {
  const phoneNumber = props.phone;
  const module = props.module;
  console.log(phoneNumber);
  const { t } = useTranslation();
  const [otpMsg, setotpMsg] = useState(0);
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const fullMobileNumber1 = localStorage.getItem("fullMobileNumber");
  const handleChange = (otpMsg) => {
    setotpMsg(otpMsg);
  };
  
  const verifyOtp = () => async (dispatch) => {
    if (otpMsg === 0) {
      setType("warn");
      setMessage("Please enter OTP");
      return;
    }
    setIsLoaded((isLoaded) => !isLoaded);
    
    let url = "/auth/merchant/verify-otp?otp=" + otpMsg + "&phone-number=" + phoneNumber;

    const response = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          // history.push(config.common.SignUpSucessMessagePage);

          props.handleViewingOrderOtpVerificationFlag(true);
          console.log(response);
        } else if (response.status === 404) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.errorMessage);
          setType("warn");
        } else if (response.status === 400) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.data);
          setType("warn");
        } else {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.errorMessage);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        } else if (err.response.data.errorCode === "NOT_FOUND") {
          console.log(err.response);
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("warn");
        } else if (err.response.data.data === "Invalid OTP.") {
          console.log("Invalid OTP.", err.response);
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.data);
          setType("warn");
        } else {
          console.log(err.response);
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("danger");
        }
      });
  };
  useEffect(() => {
    const sendOtp = callApi('/auth/user/phone-number-login?phone-number=' + phoneNumber, 'POST');
  }, []);

  const resendOTP = () => {
    dispatch(resend());
  };

  const resend = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: MERCHANT_SIGN_UP_OTP_VERIFY_INIT });
    let url = "auth/merchant/resent-otp?phone-number=" + phoneNumber;
    const output = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          
          setMessage(response.data.data);
          setType("success");
          setIsLoaded((isLoaded) => !isLoaded);
          
        } else if (response.status === 404) {
          
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.errorMessage);
          setType("danger");
        } else {
          
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.errorMessage);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        } else if (err.response.data.errorCode === "NOT_FOUND") {
          console.log(err.response);
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("warn");
        } else {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("warn");
        }
      });
  };
  const handleSubmit = () => {
    
    dispatch(verifyOtp());   
  };
  return (
    <div>
      <div>
        <div className="p-2 text-center">
          <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
            <FormGroup className="mb-2">
              <div className="mb-2 text-center ">
                <img src={otp} height="60" alt="otp" />
                <div className="t4f_label my-2">Enter the OTP</div>
                <div className="d-flex justify-content-center">
                  <div>
                    {" "}
                    <OtpInput value={otpMsg} onChange={handleChange} isInputNum numInputs={4} separator=" " className="otpinput" />
                  </div>
                </div>
              </div>
            </FormGroup>
            <span className="t4f_label">
              <div className="d-flex justify-content-center">
                <div className="t4f_link_otp px-2">
                  <Timer seconds={30} minutes={0} ButtonText={t("resend-otp")} text="Resend OTP in: " resend={resendOTP} />
                </div>
              </div>
            </span>
            <div className="d-flex justify-content-center">
              <div className="t4f_link_otp px-2">
                <Alert message={message} type={type} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button color="primary" className="t4fbutton w-50 p-2 waves-effect waves-light" type="submit">
                {!isLoaded ? t("submit") : "Please Wait..."}
              </button>
            </div>
          </AvForm>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;

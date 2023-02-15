import React, { Component, useState, useEffect } from "react";
import Timer from "otp-timer";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import OtpInput from "react-otp-input";
import "../../../assets/styles/t4fstyle.scss";
import otp from "../../../assets/icons/otp.png";
import logo from "../../../assets/icons/logo.png";
import Alert from "../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, signUpFailed } from "../../../store/authentication/signup/action";
import axios from "../../../axios";
import { getData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import config from "../../../container/app/navigation.json";
import { MERCHANT_FORGET_PWD_OTP_FAIL, MERCHANT_FORGET_PWD_OTP_INIT, MERCHANT_FORGET_PWD_OTP_SUCCESS, MERCHANT_SIGNUP_OTP_FAILED, MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, MERCHANT_SIGN_UP_OTP_VERIFY_INIT } from "../../../store/authentication/signup/actionTypes";

const OTPVerificationPage = (props) => {
  const { t } = useTranslation();
  const [otpMsg, setotpMsg] = useState(0);
  const history = useHistory();
  const sel_userdetails = useSelector((state) => state.signup);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const fullMobileNumber1 = localStorage.getItem("fullMobileNumber");
  const handleChange = (otpMsg) => {
    setotpMsg(otpMsg);
  };
  const verifyOtp_forgetpwd = () => async (dispatch) => {
    if (otpMsg === 0) {
      setType("warn");
      setMessage("Please enter OTP");
      return;
    }
    console.log("inside forget pwd service", otpMsg);
    dispatch({ type: MERCHANT_FORGET_PWD_OTP_INIT });
    let url = "/auth/merchant/verify-otp?forgot-password=true&otp=" + otpMsg + "&phone-number=" + sel_userdetails.phoneNumber;
    setIsLoaded((isLoaded) => !isLoaded);
    const output = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          dispatch({ type: MERCHANT_FORGET_PWD_OTP_SUCCESS, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          history.push(config.common.SuccessMessage);
          console.log(response);
        } else if (response.status === 400) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.error);
          setType("warn");
        } else {
          dispatch({ type: MERCHANT_FORGET_PWD_OTP_FAIL, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure1", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: MERCHANT_FORGET_PWD_OTP_FAIL, payload: err.response });
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
          dispatch({ type: MERCHANT_FORGET_PWD_OTP_FAIL, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("danger");
        }
      });
  };
  const verifyOtp = () => async (dispatch) => {
    if (otpMsg === 0) {
      setType("warn");
      setMessage("Please enter OTP");
      return;
    }
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: MERCHANT_SIGN_UP_OTP_VERIFY_INIT });
    let url = "/auth/merchant/verify-otp?otp=" + otpMsg + "&phone-number=" + sel_userdetails.phoneNumber;

    const response = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          history.push(config.common.SignUpSucessMessagePage);
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
    console.log("resendOTP_after5min Timer started", new Date());
    setTimeout(() => {
      dispatch(resendOTP_after10min());
      console.log("resendOTP_after5min end", new Date());
    }, 300000); // call the below api after 5 min
  }, []);

  const resendOTP_after10min = () => async (dispatch) => {
    console.log("resendOTP");
    let validationMessage = "";
    let type = "";
    setIsLoaded((isLoaded) => !isLoaded);

    let result = await reduxPostData("/auth/user/update-otp-expiry?phone-number=" + sel_userdetails.phoneNumber, "", "merchant", "post")
      .then((response) => {
        if (response.status === 200) {
          console.log("resendOTP", response);
          validationMessage = "OTP is expired, please resend OTP and verify";
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
          type: MERCHANT_SIGNUP_OTP_FAILED,
          payload: validationMessage,
        });
      });
    setMessage(validationMessage);
    setType(type);
    setIsLoaded((isLoaded) => !isLoaded);
  };
  const resendOTP = () => {
    dispatch(resend());
    console.log("resendOTP_after5min Timer started", new Date());
    setTimeout(() => {
      dispatch(resendOTP_after10min());
      console.log("resendOTP_after5min end", new Date());
    }, 300000); // call the below api after 5 min
  };

  const resend = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: MERCHANT_SIGN_UP_OTP_VERIFY_INIT });
    let url = "auth/merchant/resent-otp?phone-number=" + sel_userdetails.phoneNumber;
    const output = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_VERIFY_SUCCESS, payload: response.data.data });
          setMessage(response.data.data);
          setType("success");
          setIsLoaded((isLoaded) => !isLoaded);
          sel_userdetails.status = "valid";
        } else if (response.status === 404) {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.errorMessage);
          setType("danger");
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
        } else {
          dispatch({ type: MERCHANT_SIGNUP_OTP_FAILED, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.errorMessage);
          setType("warn");
        }
      });
  };
  const handleSubmit = () => {
    // console.log(props.location.state.page);
    if (sel_userdetails.page === "signup") dispatch(verifyOtp());
    if (sel_userdetails.page === "login") dispatch(verifyOtp_forgetpwd());
  };
  return (
    <div>
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <div>
                <div className="login_sideimage">
                  <Col lg={5}>
                    <div className="p-4 d-flex align-items-center min-vh-100">
                      <div className="w-100">
                        <Row className="justify-content-center">
                          <Col lg={9}>
                            <div className="login_logo_container">
                              <span>
                                <a href="/">
                                  <img src={logo} className="login_logo" alt="logo" height="150" />
                                </a>
                              </span>
                            </div>
                            <div className="t4f_login_bg ">
                              <div className="p-2 mt-5">
                                <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                                  <h5 className="mb-3">{t("otp-verification")}</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={otp} height="20" alt="otp" />
                                      <span className="t4f_label">
                                        {" "}
                                        {t("enter-the-otp")} {sel_userdetails.phoneNumber === "" ? t("your-mobile-number") : sel_userdetails.formattedMblNumber}
                                      </span>
                                    </div>
                                    <OtpInput value={otpMsg} onChange={handleChange} numInputs={4} separator=" " className="otpinput" />
                                  </FormGroup>
                                  <span className="t4f_label">
                                    <div className="d-flex align-items-center">
                                      <div>{t("didnot-receive-otp")} </div>
                                      {/* <Link href="#" className="tf4_linklabel" onClick={resendOTP}>
                                      {" "}
                                      {t("resend-otp")}
                                    </Link> */}
                                      <div className="t4f_link_otp px-2">
                                        <Timer seconds={30} minutes={0} ButtonText={t("resend-otp")} text="Resend OTP in: " resend={resendOTP} />
                                      </div>
                                    </div>
                                  </span>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                                      {!isLoaded ? t("verify") : "Please Wait..."}
                                    </button>
                                  </div>
                                </AvForm>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Footer />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div></div>
                  </Col>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default OTPVerificationPage;

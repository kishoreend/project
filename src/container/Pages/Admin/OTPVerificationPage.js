import React, { Component, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { Link, Redirect, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import OtpInput from "react-otp-input";
import "../../../assets/styles/t4fstyle.scss";
import otp from "../../../assets/icons/otp.png";
import logo from "../../../assets/icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../container/app/navigation.json";
import Alert from "../../../components/Common/Alert";
import { useTranslation } from "react-i18next";
import { getData, reduxGetData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";

const OTPVerificationPage = (props) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [otpMsg, setotpMsg] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const adminDetails = useSelector((state) => state.admin);
  const handleChange = (otpMsg) => {
    setotpMsg(otpMsg);
  };
  // console.log(state_allproducts);
  const verifyOtp = () => async (dispatch) => {
    console.log("inside forget pwd service", otpMsg);
    console.log("moble", adminDetails.formatterM);

    let url = "/auth/admin/verify-otp?forgot-password=true&otp=" + otpMsg + "&phone-number=" + adminDetails.phoneNumber
    setIsLoaded((isLoaded) => !isLoaded);
    const output = await reduxGetData(url, "post", "admin")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || (response.data?.status === "success")) {
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_SUCCESS, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          history.push(config.common.SuccessMessage);
          console.log(response);
        }
        else {
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log('failure', err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: err.response });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        }
        else {
          console.log(err.response);
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.data);
          setType("danger");
        }
      });
  };
  const handleSubmit = () => {
    console.log("otpMsg", otpMsg);
    dispatch(verifyOtp());
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
                <div className="admin-login_sideimage">
                  <Col lg={5}>
                    <div className="p-4 d-flex align-items-center min-vh-100">
                      <div className="w-100">
                        <Row className="justify-content-center">
                          <Col lg={9}>
                            <div className="login_logo_container">
                              <span>
                                <a href="/">
                                  <img
                                    src={logo}
                                    className="login_logo"
                                    alt="logo"
                                    height="150"
                                  />
                                </a>
                              </span>
                            </div>
                            <div className="t4f_login_bg_admin">
                              <div className="p-2 mt-5">
                                <AvForm
                                  className="form-horizontal"
                                  onValidSubmit={handleSubmit}
                                >
                                  <h5 className="mb-3">
                                    {" "}
                                    {t("otp-verification")}
                                  </h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={otp} height="20" alt="otp" />
                                      <span className="t4f_label">
                                        {" "}
                                        {t("enter-the-otp")}
                                      </span>
                                      <span className="t4f_label">
                                        {" "}
                                        {adminDetails.phoneNumber === 0
                                          ? t("your-mobile-number")
                                          : adminDetails.formattedPhoneNumber}
                                      </span>
                                    </div>
                                    <OtpInput
                                      value={otpMsg}
                                      onChange={handleChange}
                                      numInputs={4}
                                      separator=" "
                                      className="otpinput"
                                    />
                                  </FormGroup>
                                  <span className="t4f_label">
                                    {" "}
                                    {t("didnot-receive-otp")}{" "}
                                    <Link href="#" className="tf4_linklabel">
                                      {" "}
                                      {t("resend-otp")}
                                    </Link>
                                  </span>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button
                                      color="primary"
                                      className="t4fbutton w-100 waves-effect waves-light"
                                      type="submit"
                                    >
                                      {!isLoaded
                                        ? t("verify")
                                        : "Please Wait..."}
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

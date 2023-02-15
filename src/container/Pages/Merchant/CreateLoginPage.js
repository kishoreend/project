import React, { useState } from "react";
import { Row, Col, Button, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import Alert from "../../../components/Common/Alert";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lock from "../../../assets/icons/lock.png";
import logo from "../../../assets/icons/logo.png";
import otp from "../../../assets/icons/otp.png";
import show from "../../../assets/icons/show.png";
import hide from "../../../assets/icons/hide.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSignUpDetails, signUpFailed, getUserDetails } from "../../../store/authentication/signup/action";
import axios from "../../../axios";
import { postData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import config from "../../../container/app/navigation.json";
import { MERCHANT_FORGET_PASSWORD_FAILED, MERCHANT_FORGET_PASSWORD_SUCCESS, MERCHANT_FORGET_PASSWORD_INIT, MERCHANT_LOGIN_INIT, MERCHANT_LOGIN_SUCCESS, MERCHAT_LOGIN_FAILED } from "../../../store/authentication/signup/actionTypes";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";

const CreateLoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [eyeToggle, setEyeToggle] = React.useState(false);
  const [password, setPassword] = useState("");
  const [uNumber, setUNumber] = useState(0);
  const sel_userdetails = useSelector((state) => state.signup);
  const { t } = useTranslation();
  const postLogin = (props) => async (dispatch) => {
    const data = {
      password: password,
      uniqueNumber: uNumber,
    };

    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: MERCHANT_LOGIN_INIT, payload: data.uniqueNumber });
    let result = await reduxPostData("/auth/merchant/signin", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: MERCHANT_LOGIN_SUCCESS, payload: response.data });
          console.log(response);
          localStorage.setItem("auth", JSON.stringify({ username: response.data.username, token: response.data.accessToken }));
          dispatch(getMerchantDetails(data.uniqueNumber));
        } else {
          dispatch({
            type: MERCHAT_LOGIN_FAILED,
            payload: response.data.error,
          });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.error);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: MERCHAT_LOGIN_FAILED, payload: err.response });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        } else {
          console.log(err.response);
          let errorMessage = "Something went wrong. Please try again";
          switch (err.response.status) {
            case 401:
              dispatch({
                type: MERCHAT_LOGIN_FAILED,
                payload: err.response.data.error,
              });
              errorMessage = 'Invalid login credentials';
              break;
            case 400:
              dispatch({
                type: MERCHAT_LOGIN_FAILED,
                payload: err.response.data,
              });
              errorMessage = err.response.data;
              break;
            default:
              dispatch({
                type: MERCHAT_LOGIN_FAILED,
                payload: err.response.data.error,
              });
              errorMessage = err.response.data.error;
              break;
          }
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(errorMessage);
          setType(err.response.status == 400 ? "warn" : "danger");

          console.log('errorMessage', errorMessage)
        }
      });
  };
  const handleSubmit = () => {
    if (password == null || password === "") {
      setMessage("Please enter password");
      setType("danger");
    } else {
      dispatch(postLogin());
    }
  };

  const getMerchantDetails = (uno) => {
    return (dispatch) => {
      let validationMsg = "";
      console.log("Enter Redux Merchant data");
      dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_INIT });
      const response = reduxGetData(`/api/merchant/get-merchant-details?uniqueNumber=${uno}`, "get", "merchant")
        .then((response) => {
          console.log("get merchant details login", response);
          if (response.status === 200) {
            console.log("get merchant", response);
            dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS, payload: response.data?.data });
            if (response.data?.data?.uniqueNumber > 0) {
              history.push({
                pathname: config.merchanturl.MyProfile,
              });
            }
          } else {
            dispatch({ type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED, payload: response.data.error });
          }
        })
        .catch((err) => {
          console.log("failure", err.response);
          validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
          dispatch({ type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED, payload: validationMsg });
        });
    };
    setIsLoaded((isLoaded) => !isLoaded);
  };

  const checkForgetPassword = () => {
    if (uNumber == null || uNumber == 0 || uNumber === "") {
      setMessage("Please enter valid Unique Number");
      setType("danger");
    } else {
      //send unumner to the service here
      setIsLoaded((isLoaded) => !isLoaded);
      dispatch(forgetPassword());
      setIsLoaded((isLoaded) => !isLoaded);
    }
  };

  const forgetPassword = () => async (dispatch) => {
    dispatch({ type: MERCHANT_FORGET_PASSWORD_INIT });
    let result = await reduxPostData("/auth/merchant/forgot-password?unique-number=" + uNumber, {}, "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === 200) {
          dispatch({
            type: MERCHANT_FORGET_PASSWORD_SUCCESS,
            payload: response.data.data,
          });
          history.push({
            pathname: config.merchanturl.OTPVerificationPage,
          });
        } else {
          console.log(response);
          dispatch({
            type: MERCHANT_FORGET_PASSWORD_FAILED,
            payload: response.data.data,
          });
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: MERCHANT_FORGET_PASSWORD_FAILED, payload: validationMessage });
        setIsLoaded((isLoaded) => !isLoaded);
        setMessage(validationMessage);
        setType("danger");
      });
  };
  const toggleShowPassword = () => {
    setEyeToggle((eyeToggle) => !eyeToggle);
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
                                  <h5>{t("create-login")}</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={otp} height="15" alt="otp" />
                                        <span className="t4f_label"> {t("enter-unique-number")}</span>
                                      </span>
                                    </div>
                                    <AvField
                                      name="uniquenumber"
                                      //value={this.state.username}
                                      type="number"
                                      className="t4finput"
                                      id="uniquenumber"
                                      validate={{
                                        number: true,
                                        required: true,
                                        maxLength: { value: 4 },
                                      }}
                                      onChange={(e) => setUNumber(e.target.value)}
                                      errorMessage="Please enter valid Unique Number
"
                                    //placeholder="Enter username"
                                    />
                                  </FormGroup>

                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={lock} height="15" alt="lock" />
                                        <span className="t4f_label"> {t("password")}</span>
                                      </span>
                                    </div>

                                    <AvField
                                      name="password"
                                      //value={this.state.username}

                                      type={eyeToggle ? "text" : "password"}
                                      className="t4finput"
                                      id="password"
                                      //validate={{ required: true }}
                                      onChange={(e) => (setPassword(e.target.value), setMessage(""), setEyeToggle(false))}
                                    //placeholder="Enter username"
                                    />
                                    <div className="position-relative">
                                      <div className="inputPrefixicon">
                                        <img className={!eyeToggle ? "" : "d-none"} src={show} height="15" alt="show" onClick={toggleShowPassword} />
                                        <img className={eyeToggle ? "" : "d-none"} src={hide} height="15" alt="hide" onClick={toggleShowPassword} />
                                      </div>
                                    </div>
                                  </FormGroup>
                                  <span className="t4f_label">
                                    <Link className="tf4_linklabel" onClick={checkForgetPassword}>
                                      {" "}
                                      {t("forget-password?")}
                                    </Link>
                                  </span>

                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" disabled={isLoaded} className="t4fbutton w-100 waves-effect waves-light" type="submit">
                                      {!isLoaded ? t("submit") : "Please Wait..."}
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

export default CreateLoginPage;

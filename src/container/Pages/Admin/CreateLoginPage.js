import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lock from "../../../assets/icons/lock.png";
import logo from "../../../assets/icons/logo.png";
import user from "../../../assets/icons/user.png";
import config from "../../../container/app/navigation.json";
import Alert from "../../../components/Common/Alert";
import { useTranslation } from "react-i18next";
import { reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const AdminCreateLoginPage = () => {
  //#region constants
  const { t } = useTranslation();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [aUserName, setaUserName] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const adminLogin = useSelector((state) => state.admin);
  console.log(adminLogin);
  const dispatch = useDispatch();
  // const isLoading = adminLogin.isLoading;
  // const loginUser = adminLogin.data;
  // const reduxError = adminLogin.error;
  //#endregion

  //#region  redux action calls
  const reduxtData = (url, data, module) => async (dispatch) => {
    dispatch({ type: adminActionTypes.ADMIN_CHECK_LOGIN });
    const response = await reduxPostData(url, data, module)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: adminActionTypes.ADMIN_LOGIN_SUCCESS, payload: response.data });
          console.log(response);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              username: response.data.username,
              token: response.data.accessToken,
            })
          );
          history.push({
            pathname: config.adminurl.Admin_Dashboard,
            state: { username: response.data.username },
          });
        } else {
          dispatch({ type: adminActionTypes.ADMIN_LOGIN_FAIL, payload: response.data.error });
          setMessage(response.data.error);
          setType("danger");
          setIsLoaded((isLoaded) => !isLoaded);
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.error || "Invalid credentials.";
        dispatch({ type: adminActionTypes.ADMIN_LOGIN_FAIL, payload: validationMessage });
        setMessage(validationMessage);
        setType("danger");
        setIsLoaded((isLoaded) => !isLoaded);
      });
  };
  //#endregion

  //#region LoginPage Local Methods

  const handleSubmit = () => {
    postLogin();
  };
  const postLogin = async (props) => {
    const data = {
      password: adminPwd,
      username: aUserName,
    };
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch(reduxtData("/auth/admin/signin", data, "admin"));

    console.log(adminLogin, "before go to next page");
  };

  const checkForgetPassword = () => {
    if (aUserName == null || aUserName === "") {
      setMessage("Please enter admin username");
      setType("warn");
    } else {
      //send unumner to the service here
      dispatch(forgetPassword1());
    }
  };

  const forgetPassword1 = () => async (dispatch) => {
    console.log("inside forgetword method");
    setIsLoaded((isLoaded) => !isLoaded);
    let result = await reduxPostData("/auth/admin/forgot-password?user-name=" + aUserName, {}, "admin", "post")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          let mobileNumber = response.data.data.phoneNumber;
          let first2 = mobileNumber.slice(0, 2);
          let last3 = mobileNumber.slice(7, 10);
          // alert('OTP has been delivered to customer registed phone number' + first2 + "xxxxxxxx" + last2);
          dispatch({
            type: adminActionTypes.ADMIN_FORGET_PWD_OTP_INIT,
            payload: { phoneNumber: response.data.data.phoneNumber, formattedPhoneNumber: first2 + "xxxxxxxx" + last3 },
          });
          history.push({
            pathname: config.adminurl.Admin_OTPVerificationPage,
          });
        } else {
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: err.response });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        } else {
          console.log(err.response);
          dispatch({ type: adminActionTypes.ADMIN_FORGET_PWD_OTP_FAIL, payload: err.response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(err.response.data.data);
          setType("danger");
        }
      });

    //console.log("forget password link from login", result);
  };
  //#endregion
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
                                  <img src={logo} className="login_logo" alt="logo" height="150" />
                                </a>
                              </span>
                            </div>
                            <div className="t4f_login_bg_admin">
                              <div className="p-2 mt-5">
                                <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                                  <h5>{t("admin-login")}</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={user} height="15" alt="user" />
                                        <span className="t4f_label"> {t("username")}</span>
                                      </span>
                                    </div>
                                    <AvField
                                      name="username"
                                      //value={this.state.username}
                                      type="text"
                                      className="t4finput"
                                      id="username"
                                      validate={{
                                        required: true,
                                      }}
                                      onChange={(e) => setaUserName(e.target.value)}
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
                                      name="contactnumnber"
                                      //value={this.state.username}
                                      type="password"
                                      className="t4finput"
                                      id="password"
                                      validate={{ required: true }}
                                      onChange={(e) => setAdminPwd(e.target.value)}
                                      //placeholder="Enter username"
                                    />
                                  </FormGroup>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                                      {!isLoaded ? t("sign-in") : "Please Wait..."}
                                    </button>
                                  </div>
                                  <span className="t4f_label text-left">
                                    <Link onClick={checkForgetPassword} className="tf4_linklabel">
                                      {" "}
                                      {t("forget-password?")}
                                    </Link>
                                  </span>
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

export default AdminCreateLoginPage;

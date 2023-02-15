import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import axios from "axios";
import Footer from "../../../components/Footer";
import Loading from "../../../components/Common/Loading";
import "../../../assets/styles/t4fstyle.scss";
import user from "../../../assets/icons/user.png";
import call from "../../../assets/icons/call.png";
import lock from "../../../assets/icons/lock.png";
import logo from "../../../assets/icons/logo.png";
import loading from "../../../assets/icons/loading.gif";
import Alert from "../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getSignUpDetails, signUpFailed, reduxSignup } from "../../../store/authentication/signup/action";
import { SIGN_UP_INIT, SIGN_UP_FAILED, SIGN_UP_SUCCESSFUL } from "../../../store/authentication/signup/actionTypes";
import axios from "../../../axios";
import { postData, reduxPostData } from "../../../ServiceCall";
import config from "../../../container/app/navigation.json";

const SignupPage = (props) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const sel_userdetails = useSelector((state) => state.signup);
  console.log(sel_userdetails, "at the top");
  const signUpDetails = {
    username: name,
    phoneNumber: phoneNumber,
    otpMsg: 0,
    email: email,
  };
  const handleSubmit = () => {
    console.log("From Signup", signUpDetails);
    postSignUp();
  };

  const reduxSignup = (url, data, module) => async (dispatch) => {
    console.log("Entered");

    dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(url, data, module)
      .then((response) => {
        if (response.status === 200) {
          setIsLoaded((isLoaded) => !isLoaded);
          dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          console.log(response);
          history.push({
            pathname: config.merchanturl.OTPVerificationPage,
            state: { mobilenumber: phoneNumber, page: "signup" },
          });
        } else if (response.status === 400) {
          dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.data);
          setType("warn");
        } else {
          dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          setIsLoaded((isLoaded) => !isLoaded);
          setMessage(response.data.error);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("sign up failure", err.response);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: SIGN_UP_FAILED, payload: validationMessage });
        setIsLoaded((isLoaded) => !isLoaded);
        setMessage(validationMessage);
        setType("danger");
      });
  };
  const postSignUp = async () => {
    const data = {
      email: email,
      phoneNumber: phoneNumber,
      roles: ["MERCHANT"],
      username: name,
    };
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch(reduxSignup("/auth/merchant/signup", data));
    console.log(sel_userdetails, "at the top");
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
                                  <h5>{t("sign_up")}</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={user} height="13" alt="user" />
                                        <span className="t4f_label"> {t("name")}*</span>
                                      </span>
                                    </div>

                                    <AvField
                                      name="name"
                                      //value={this.state.username}
                                      type="text"
                                      className="t4finput"
                                      id="name"
                                      validate={{
                                        required: {
                                          value: true,
                                          errorMessage: "Please enter a name",
                                        },
                                        minLength: { value: 2 },
                                        maxLength: { value: 30 },
                                      }}
                                      //placeholder="Enter username"
                                      //minLength= {value: 2}

                                      onChange={(e) => setName(e.target.value)}
                                    />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={lock} height="13" alt="lock" />
                                        <span className="t4f_label"> {t("email_id")}*</span>
                                      </span>
                                    </div>
                                    <AvField
                                      name="emailid"
                                      //value={this.state.username}
                                      type="text"
                                      className="t4finput"
                                      id="emailid"
                                      validate={{ email: true, required: true }}
                                      errorMessage="Please enter valid Email id"
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </FormGroup>

                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <span>
                                        <img src={call} height="13" alt="call" />
                                        <span className="t4f_label"> {t("contact_no")}*</span>
                                      </span>
                                    </div>
                                    <AvField
                                      name="contactnumnber"
                                      //value={this.state.username}
                                      type="number"
                                      className="t4finput"
                                      id="contactnumnber"
                                      validate={{
                                        required: {
                                          value: true,
                                          errorMessage: "Please enter valid 10 digit contact number",
                                        },
                                        number: true,
                                        maxLength: {
                                          value: 10,
                                          errorMessage: "Please enter valid 10 digit contact number",
                                        },
                                        minLength: {
                                          value: 10,
                                          errorMessage: "Please enter valid 10 digit contact number",
                                        },
                                      }}
                                      errorMessage="Please enter valid 10 digit contact number"
                                      //placeholder="Enter username"
                                      onChange={(e) => setphoneNumber(e.target.value)}
                                    />
                                  </FormGroup>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                                      {!isLoaded ? t("submit") : "Please Wait..."}

                                      {/* {!isLoaded ? t("submit") : <Loading />} */}
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

export default SignupPage;

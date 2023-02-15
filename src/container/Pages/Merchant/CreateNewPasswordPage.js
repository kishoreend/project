import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lockopen from "../../../assets/icons/lockopen.png";
import logo from "../../../assets/icons/logo.png";
import { getUserDetails, signUpFailed } from "../../../store/authentication/signup/action";
import { getData, reduxGetData } from "../../../ServiceCall";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../container/app/navigation.json";
import Alert from "../../../components/Common/Alert";
import show from "../../../assets/icons/show.png";
import hide from "../../../assets/icons/hide.png";
import { MERCHANT_CREATE_NEW_PWD_FAILED, MERCHANT_CREATE_NEW_PWD_INIT, MERCHANT_CREATE_NEW_PWD_SUCCESS } from "../../../store/authentication/signup/actionTypes";
const CreateNewPasswordPage = () => {
  const uniqueNumber_queryString = window.location.search.substring(1);
  console.log("unumber", uniqueNumber_queryString);
  //const message = "Sucessfully Created";
  const history = useHistory();
  const [confirmPwd, SetConfirmPwd] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const sel_userdetails = useSelector((state) => state.signup);
  const [eyeToggle, setEyeToggle] = React.useState(false);
  const verifyAndCreatePassword = () => async (dispatch) => {
    let url = "/auth/merchant/create-password?password=" + confirmPwd + "&" + uniqueNumber_queryString;
    console.log("url", url);
    dispatch({ type: MERCHANT_CREATE_NEW_PWD_INIT });
    const output = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: MERCHANT_CREATE_NEW_PWD_SUCCESS, payload: response.data.data });
          history.push(config.common.PasswordSucessPage);
          console.log(response);
        } else {
          dispatch({ type: MERCHANT_CREATE_NEW_PWD_FAILED, payload: response.data.data });
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: MERCHANT_CREATE_NEW_PWD_FAILED, payload: validationMessage });
        setMessage(validationMessage);
        setType("danger");
      });
    console.log("change pwd", output);
  };

  const handleSubmit = () => {
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch(verifyAndCreatePassword());
    setIsLoaded((isLoaded) => !isLoaded);
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
                                  <h5 className="mb-3">Create New Password</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> New Password </span>
                                    </div>
                                    <AvField
                                      name="password"
                                      //value={this.state.username}
                                      type={eyeToggle ? "text" : "password"}
                                      className="t4finput"
                                      id="password"
                                      validate={{
                                        required: true,
                                        pattern: {
                                          value: "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$",
                                          errorMessage: "Your password must be minimum 6 characters with atlease 1 special character",
                                        },
                                      }}
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
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> Confirm Password </span>
                                    </div>

                                    <AvField
                                      name="c_password"
                                      //value={​​​​​​​​this.state.username}​​​​​​​​
                                      type="password"
                                      className="t4finput"
                                      id="c_password"
                                      validate={{
                                        required: true,
                                        minLength: { value: 6 },
                                        match: { value: "password" },
                                      }}
                                      errorMessage="Confirm password did not match"
                                      onChange={(e) => SetConfirmPwd(e.target.value)}
                                      //placeholder="Enter username"
                                    />
                                  </FormGroup>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                                      {!isLoaded ? "Verify" : "Please Wait..."}
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

export default CreateNewPasswordPage;

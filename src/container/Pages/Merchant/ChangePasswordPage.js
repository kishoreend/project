import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lockopen from "../../../assets/icons/lockopen.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
import { postData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";
import { useTranslation } from "react-i18next";
const ChangePasswordPage = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  //const message = "Sucessfully Created";
  const { t } = useTranslation();
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const history = useHistory();
  const handleSubmit = (event, errors, values) => {

    const newPassword = values.newPassword;

    const  paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(newPassword.length < 7 || !newPassword.match(paswd)) 
    { 
      alert('New password must be minimum 6 characters with atlease 1 special character and 1 number.')
      return false;
    }
    

    let data = {
      newPassword: newPassword,
      oldPassword: values.oldPassword,
      uniqueNumber: uniqueNumber,
    };

    changePassword(data);
  };

  const changePassword = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered changePassword", data);
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxPostData(`/auth/merchant/change-password`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.data;
          messageType = "success";
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
      });
      history.push(config.merchanturl.CreateLoginPage);
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
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
                                <AvForm className="form-horizontal" onSubmit={handleSubmit}>
                                  <h5 className="mb-3">Change Password</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> Old Password </span>
                                    </div>
                                    <AvField name="oldPassword" type="password" className="t4finput" id="oldPassword" validate={{ required: true }} />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> New Password </span>
                                    </div>
                                    <AvField
                                      name="c_newPassword"
                                      type="password"
                                      className="t4finput"
                                      id="c_newPassword"
                                      validate={{
                                        required: true,
                                        pattern: {
                                          value: "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$",
                                          errorMessage: "Your password must be minimum 6 characters with atlease 1 special character",
                                        },
                                      }}
                                    />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> Confirm Password </span>
                                    </div>
                                    <AvField
                                      name="newPassword"
                                      type="password"
                                      className="t4finput"
                                      id="newPassword"
                                      validate={{
                                        required: true,
                                        match: { value: "c_newPassword" },
                                      }}
                                      errorMessage="Confirm password did not match"
                                    />
                                  </FormGroup>
                                  <Alert message={message} type={type} />
                                  <div className="mt-4 text-center">
                                    <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit" href="#">
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

export default ChangePasswordPage;

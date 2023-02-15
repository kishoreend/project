import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lockopen from "../../../assets/icons/lockopen.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { postData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";
const ChangePasswordPage = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { t } = useTranslation();
  const phoneNumber = useSelector((state) => state.admin.phoneNumber);
  const email = useSelector((state) => state.admin.email);

  const history = useHistory();
  const handleSubmit = (event, errors, values) => {
    let data = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
      phoneNumber: phoneNumber,
      email: email,
    };

    changePassword(data);
  };

  const changePassword = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered admin changePassword", data);
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxPostData(`/auth/admin/change-password`, data, "admin")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = response.data.data;
          messageType = "success";
          history.push(config.common.AdminPasswordSucessPage);
        } else {
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
      });
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
                            <div className="t4f_login_bg ">
                              <div className="p-2 mt-5">
                                <AvForm className="form-horizontal" onSubmit={handleSubmit}>
                                  <h5 className="mb-3">{t("change-pwd")}</h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> {t("old-pwd")} </span>
                                    </div>
                                    <AvField name="oldPassword" type="password" className="t4finput" id="oldPassword" validate={{ required: true }} />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> {t("new-pwd")}</span>
                                    </div>
                                    <AvField
                                      name="cnewPassword"
                                      type="password"
                                      className="t4finput"
                                      id="cnewPassword"
                                      validate={{
                                        required: true,
                                        pattern: {
                                          value: "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$",
                                          //value: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
                                          errorMessage: "Your password must be minimum 6 characters with atlease 1 special character",
                                        },
                                      }}
                                    />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={lockopen} height="20" alt="lockopen" />
                                      <span className="t4f_label"> {t("cnf-pwd")} </span>
                                    </div>
                                    <AvField
                                      name="newPassword"
                                      //value={this.state.username}
                                      type="password"
                                      className="t4finput"
                                      id="newPassword"
                                      validate={{
                                        required: true,
                                        match: { value: "cnewPassword" },
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

import React from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../assets/styles/t4fstyle.scss";
import otp from "../../../assets/icons/otp.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { useTranslation } from "react-i18next";
const ForgetPasswordPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const handleSubmit = () => {
    history.push(config.adminurl.Admin_OTPVerificationPage);
  };
  const message = t("we-will-send-otp");
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
                                    {t("forget-password")}
                                  </h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img src={otp} height="20" alt="otp" />
                                      <span className="t4f_label">
                                        {" "}
                                        {t("enter-your-mobile-number")}{" "}
                                      </span>
                                    </div>
                                    <AvField
                                      name="contactnumnber"
                                      //value={this.state.username}
                                      type="number"
                                      className="t4finput"
                                      id="contactnumnber"
                                      validate={{ required: true }}
                                      //placeholder="Enter username"
                                    />
                                  </FormGroup>
                                  <span className="t4f_label"> {message} </span>
                                  <div className="mt-4 text-center">
                                    <button
                                      color="primary"
                                      className="t4fbutton w-100 waves-effect waves-light"
                                      type="submit"
                                      href="create-new-password"
                                    >
                                      {t("verify")}{" "}
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

export default ForgetPasswordPage;

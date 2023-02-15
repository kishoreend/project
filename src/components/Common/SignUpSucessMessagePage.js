import React from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Footer";
import "../../assets/styles/t4fstyle.scss";
import sucesslock from "../../assets/icons/sucess-lock.png";
import logo from "../../assets/icons/logo.png";

const SignUpSucessMessagePage = () => {
  const history = useHistory();
  const handleSubmit = (props) => {
    // history.push("/admin-login");
  };
  const message =
    // "Thanks for Signing up with us. Your request has been send for approval process. Please check your email for Uniquie number to log in.";
    "Thank you for registering with us. Your request has been submitted for approval. Please check your email for your unique number to login.";
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
                                  <img
                                    src='https://merchant.tap4food.com/tap4food/images/logo/logo.png'
                                    className="login_logo"
                                    alt="logo"
                                    height="150"
                                  />
                                </a>
                              </span>
                            </div>
                            <div className="t4f_login_bg ">
                              <div className="p-2 mt-5">
                                <AvForm
                                  className="form-horizontal"
                                  onValidSubmit={handleSubmit}
                                >
                                  <h5 className="mb-3">Sign Up</h5>
                                  <div className="mb-1">
                                    {" "}
                                    <img
                                      src={sucesslock}
                                      height="40"
                                      alt="successlock"
                                    />
                                  </div>
                                  <br />
                                  <span> {message} </span>
                                  <div className="mt-4 text-center"></div>
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

export default SignUpSucessMessagePage;

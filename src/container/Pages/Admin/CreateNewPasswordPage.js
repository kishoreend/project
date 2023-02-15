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
import Alert from "../../../components/Common/Alert";
import { getData, reduxGetData } from "../../../ServiceCall";
import { useDispatch } from "react-redux";
import * as adminActionTypes from "../../../store/admin/actionTypes";
const CreateNewPasswordPage = () => {
  var adminUsername = window.location.search.substring(1).split("&");
  console.log("query", adminUsername[1]);
  //const message = "Sucessfully Created";
  const history = useHistory();
  const [password, SetPassword] = useState("");
  const [confirmPwd, SetConfirmPwd] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const verifyAndCreatePassword = () => async (dispatch) => {
    dispatch({ type: adminActionTypes.ADMIN_CREATE_NEW_PWD_INIT });
    setIsLoaded((isLoaded) => !isLoaded);
    let url =
      "/auth/admin/create-password?password=" +
      confirmPwd +
      "&" +
      adminUsername[1];
    console.log("url", url);
    const output = await reduxGetData(url, "post", "admin")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: adminActionTypes.ADMIN_CREATE_NEW_PWD_SUCCESS, payload: response.data.data });
          history.push(config.adminurl.Admin_CreateLoginPage);
          console.log(response);
        }
        else {
          dispatch({ type: adminActionTypes.ADMIN_CREATE_NEW_PWD_FAILED, payload: response.data.data });
          setMessage(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log('failure', err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: adminActionTypes.ADMIN_CREATE_NEW_PWD_FAILED, payload: err.response });
          setMessage("Something went wrong, Please try again later");
          setType("danger");
        }
        else {
          console.log(err.response);
          dispatch({ type: adminActionTypes.ADMIN_CREATE_NEW_PWD_FAILED, payload: err.response.data.data });
          setMessage(err.response.data.data);
          setType("danger");
        }
      });
    console.log("change pwd", output);

  };

  const handleSubmit = () => {
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch(verifyAndCreatePassword());
    setIsLoaded((isLoaded) => !isLoaded);
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
                                    {t("create-new-pwd")}
                                  </h5>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img
                                        src={lockopen}
                                        height="20"
                                        alt="lockopen"
                                      />
                                      <span className="t4f_label">
                                        {" "}
                                        {t("new-pwd")}{" "}
                                      </span>
                                    </div>
                                    <AvField
                                      name="password"
                                      //value={this.state.username}
                                      type="password"
                                      className="t4finput"
                                      id="password"
                                      validate={{
                                        required: true,
                                        minLength: {
                                          value: 5,
                                          errorMessage:
                                            "Your password must be between 5 and 20 characters",
                                        },
                                        maxLength: {
                                          value: 20,
                                          errorMessage:
                                            "Your password must be between 5 and 20 characters",
                                        },
                                      }}
                                      onChange={(e) =>
                                        SetPassword(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                  <FormGroup className="mb-2">
                                    <div className="mb-2">
                                      <img
                                        src={lockopen}
                                        height="20"
                                        alt="lockopen"
                                      />
                                      <span className="t4f_label">
                                        {" "}
                                        {t("cnf-pwd")}{" "}
                                      </span>
                                    </div>
                                    <AvField
                                      name="c_password"
                                      //value={this.state.username}
                                      type="password"
                                      className="t4finput"
                                      id="c_password"
                                      validate={{
                                        required: true,
                                        match: { value: "password" },
                                      }}
                                      errorMessage="Confirm password did not match"
                                      onChange={(e) =>
                                        SetConfirmPwd(e.target.value)
                                      }
                                    />
                                  </FormGroup>
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

export default CreateNewPasswordPage;

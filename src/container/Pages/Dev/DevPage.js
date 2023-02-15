import React, { useState } from "react";
import { Row, Col, Button, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Footer from "../../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import "../../../assets/styles/t4fstyle.scss";
import lock from "../../../assets/icons/lock.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";

const DevPage = () => {
  const history = useHistory();
  const admin = () => {
    history.push(config.adminurl.Admin_CreateLoginPage);
  };
  const customer = () => {
    history.push(config.customerurl.Customer_ScanQR);
  };
  const merchant = () => {
    history.push(config.merchanturl.CreateLoginPage);
  };
  const merchant_signup = () => {
    history.push(config.merchanturl.SignupPage);
  };
  return (
    <div>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <Container fluid className="p-0">
              <div className="p-4 d-flex align-items-center min-vh-100">
                <Row className="justify-content-center">
                  <div className="t4f_login_bg ">
                    <div className="p-4">
                      <AvForm className="form-horizontal">
                        <h5>Modules</h5>

                        <div className="mt-4 text-center">
                          <button color="primary" className="t4fbutton w-100 px-5" onClick={customer}>
                            Customer
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <button color="primary" className="t4fbutton w-100 px-5" onClick={merchant}>
                            Merchant Sign in
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <button color="primary" className="t4fbutton w-100 px-5" onClick={merchant_signup}>
                            Merchant Sign Up
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <button color="primary" className="t4fbutton w-100 px-5" onClick={admin}>
                            Admin
                          </button>
                        </div>
                      </AvForm>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Footer />
                  </div>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevPage;

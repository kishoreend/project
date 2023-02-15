import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import search_dark from "../../../assets/icons/search_dark.png";
import backarrow from "../../../assets/icons/back-arrow.png";
import config from "../../../container/app/navigation.json";
import { reduxPostData } from "../../../ServiceCall";

const Customer_ContactUs = () => {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log(fullName);
    if(fullName === ""){
      setError("Full name can't be empty.")
    }else if(email === ""){
      setError("Email can't be empty.")
    }else if(phoneNumber === ""){
      setError("Phone Number can't be empty.")
    }else if(message === ""){
      setError("Comments can't be empty!")
    }else{

      const data = {
        fullName,
        email,
        phoneNumber,
        message
      }

      reduxPostData('/api/customer/submitContactUsForm', data, 'user')
      .then(res => {
        console.log(res);
        setSubmitted(true);
      })
    }
  };

  return (
    <React.Fragment>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={6} />
            <div className="mobile_header_gray p-2">
              <span>
                <a href={config.customerurl.CustomerHome}>
                  <img src={backarrow} height="10" />
                </a>
                <b> Contact us</b>
              </span>
            </div>

            {
              submitted && (
                <div style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  color: 'green'
                }}>
                  The details are saved successfully. Our team will revert you as soon as possible.
                </div>
              )
            }

            <div id="pills-tabContent-orders">
              <div class="tab-content">
                <Row>
                  <Col lg={12}>
                    <div className="p-3">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={handleSubmit}
                      >
                        <FormGroup className="mb-2">
                          <div className="mb-2">
                            <span>
                              <span className="t4f_label">Full Name</span>
                            </span>
                          </div>

                          <AvField
                            name="name"
                            //value={this.state.username}
                            type="text"
                            className="t4finput"
                            id="name"
                            //validate={{ email: true, required: true }}
                            //placeholder="Enter username"
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setError("");
                              setSubmitted(false);
                            }}
                          />
                        </FormGroup>
                        <FormGroup className="mb-2">
                          <div className="mb-2">
                            <span>
                              <span className="t4f_label">Email</span>
                            </span>
                          </div>
                          <AvField
                            name="emailid"
                            //value={this.state.username}
                            type="text"
                            className="t4finput"
                            id="emailid"
                            validate={{ email: true }}
                            //placeholder="Enter username"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                              setSubmitted(false);
                            }}
                          />
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <div className="mb-2">
                            <span>
                              <span className="t4f_label"> Phone</span>
                            </span>
                          </div>
                          <AvField
                            name="contactnumnber"
                            //value={this.state.username}
                            type="number"
                            className="t4finput"
                            id="contactnumnber"
                            //validate={{ required: true }}
                            //placeholder="Enter username"
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              setError("");
                              setSubmitted(false);
                            }}
                          />
                        </FormGroup>
                        <FormGroup className="mb-2">
                          <div className="mb-2">
                            <span>
                              <span className="t4f_label"> Comments</span>
                            </span>
                          </div>
                          <textarea
                            id="review"
                            name="review"
                            rows="6"
                            className="t4finput"
                            onChange={(e) => {
                              setMessage(e.target.value);
                              setError("");
                              setSubmitted(false);
                            }}
                          />
                        </FormGroup>
                        <div style={{
                          color: 'red'
                        }}>
                          {error}
                        </div>
                        <div className="mt-4 text-center">
                          <button
                            color="primary"
                            className="t4fbutton-dark w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Save
                            {/* {!isLoaded ? t("submit") : <Loading />} */}
                          </button>
                        </div>
                      </AvForm>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Customer_ContactUs;

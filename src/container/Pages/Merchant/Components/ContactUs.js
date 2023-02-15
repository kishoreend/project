import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/styles/t4fstyle.scss";

import contactus from "../../../../assets/icons/contactusmail.png";
import config from "../../../../container/app/navigation.json";
import * as moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import { reduxPostData } from "../../../../ServiceCall";
const ContactUs = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [message, setMsg] = useState("")

  const [validationMsg, setValidationMsg] = useState("")

  const merchantData = useSelector(state => state.merchant.merchants);
  const stallData = useSelector(state => state.merchant.currentFoodstallDetail);

  console.log(merchantData);

  const handleSubmit = () => {
    console.log(message);

    if(message === ""){
      
      toast("Message can't be empty.");
    }else{
      const data = {
        merchantId: merchantData.uniqueNumber,
        email: merchantData.email,
        phone: merchantData.phoneNumber,
        comments: message
      }

      reduxPostData('/api/merchant/writeToAdmin', data, 'admin')
      .then(res => {
        console.log(res);
        toast("Your message is saved successfully!");
        setMsg("");
        setValidationMsg("");
      }).catch(ex => {
        console.log(ex.response.data.errorMessage);
        setValidationMsg(ex.response.data.errorMessage);
      })

    }
    
  };

  return (
    <div>
      <div className="p-3 bg-white shadow heightfull justify-content-center align-items-center">
        <div className="">
          <div className="w-100">
            <div className="row">
              <div className="col-lg-6 text-center d-flex align-items-center justify-content-center">
                <div>
                  <img src={contactus} height="250" />
                </div>
              </div>
              
              <div className="col-lg-6">
                <div>
                {/* <ToastContainer /> */}
                  <Row>
                    <Col lg={12}>
                      <div className="p-3">
                        <div className="t4f_label font-weight-bold mb-3">Please use the form below to get in touch, we are happy to help.</div>
                        <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <span className="t4f_label"> {t('phone')}</span>
                              </span>
                            </div>
                            <AvField
                              name="contactnumnber"
                              value={merchantData.phoneNumber}
                              disabled
                              type="number"
                              className="t4finput"
                              id="contactnumnber"
                              //validate={{ required: true }}
                              //placeholder="Enter username"
                            />
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <span className="t4f_label">{t('email')}</span>
                              </span>
                            </div>
                            <AvField
                              name="emailid"
                              //value={this.state.username}
                              type="text"
                              className="t4finput"
                              id="emailid"
                              value={merchantData.email}
                              disabled
                              validate={{ email: true }}
                              //placeholder="Enter username"
                            />
                          </FormGroup>

                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <span className="t4f_label"> Comments</span>
                              </span>
                            </div>
                            <textarea onChange={(e) => setMsg(e.target.value)} id="review" name="review" rows="6" className="t4finput" />
                          </FormGroup>
                          <div className="mt-4 ">
                            <button color="primary" className="t4fbutton" type="submit">
                              {!isLoaded ? t("submit") : "Please Wait.."}
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
      </div>
    </div>
  );
};

export default ContactUs;

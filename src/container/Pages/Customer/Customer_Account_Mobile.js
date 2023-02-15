import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import cus_mobile from "../../../assets/icons/cus-mobile.png";
import backarrow from "../../../assets/icons/back-arrow.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { postData, reduxPostData } from "../../../ServiceCall";
import { CUSTOMER_LOGIN_FAILED, CUSTOMER_LOGIN_INIT, CUSTOMER_LOGIN_PHONENUMBER } from "../../../store/customer/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const Customer_Account_Mobile = (props) => {
  const [contactNo, setContactNo] = useState(0);
  const [fullName, setName] = useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const message = "Enter your 10 digit mobile number";
  const name = "Enter your Name";
  const user = useSelector(state => state.customer.user);

  console.log(user)

  const [redirectUrl, setRedirectUrl] = useState('')
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const selfStallId = localStorage.getItem('selfStallId');

    console.log('selfStallId', selfStallId);

    if (selfStallId) {
      setRedirectUrl(config.customerurl.Customer_Menu + "?fs-id=" + selfStallId)
    } else {
      setRedirectUrl(config.customerurl.CustomerHome);
    }

    setLoggedIn(user ? user.isLoggedIn : false)
  }, [])

  const loginPhoneNumber = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    dispatch({ type: CUSTOMER_LOGIN_INIT, payload: contactNo });
    await reduxPostData("/auth/user/phone-number-login?phone-number=" + contactNo, {}, "customer", "post")
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          dispatch({ type: CUSTOMER_LOGIN_PHONENUMBER, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          history.push({
            pathname: config.customerurl.Customer_Account_OTP,
            state: { mobilenumber: contactNo },
          });
        } else {
          console.log("else", response.data);
          dispatch({ type: CUSTOMER_LOGIN_FAILED, payload: response.data.error });
          setIsLoaded((isLoaded) => !isLoaded);
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({
          type: CUSTOMER_LOGIN_FAILED,
          payload: validationMessage,
        });
        // setGuiMsg("Something went wrong, Please try again later");
        // setType("danger");
        setIsLoaded((isLoaded) => !isLoaded);
      });

    // console.log("From customer Phone Login", result);
    // if (result.status === 200) {
    //   setIsLoaded((isLoaded) => !isLoaded);
    //   history.push({
    //     pathname: config.customerurl.Customer_Account_OTP,
    //     state: { mobilenumber: contactNo },
    //   });
    // } else {
    //   // do nothing or display error message
    // }
  };
  const handleSubmit = () => {
    console.log(contactNo);
    dispatch(loginPhoneNumber());
  };


  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            {
              isLoggedIn && history.push(redirectUrl)
            }

            <div className="mobile_header_gray p-2">
              <span>
                <a href={config.customerurl.Customer_Account}>
                  <img src={backarrow} height="10" />
                </a>
                <b> Log in</b>
              </span>
            </div>
            {/* <img src={cus_mobile} className="img-fluid p-5" /> */}
            <div className="lglogo"><img src={logo} className="  w-25" /></div>
            
            <div className="w-100 text-center mt-2">
              <p className="mb-0">{message}</p>
              <div className="row">
                <div className="col-md-12">
                  <Row>
                    <Col lg={12}>
                      <div className="p-3 mobileinfo">
                        <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                          <FormGroup className="mb-2 justify-content-center">
                            <AvField
                              name="contactnumnber"
                              //value={this.state.username}
                              type="number"
                              className="t4finput"
                              id="contactnumnber"
                              validate={{
                                required: true,
                                minLength: { value: 10 },
                                maxLength: { value: 10 },
                              }}
                              errorMessage="Please enter 10 digit contact number"
                              onChange={(e) => setContactNo(e.target.value)}
                            />
                           <div className="mt-3">
                           <p className="mb-3">{name}</p>
                           <AvField
                              name="fullname"
                              //value={this.state.username}
                              type="text"
                              className="t4finput"
                              id="username"
                              validate={{
                                required: true
                              }}
                              errorMessage="Please enter the name"
                              onBlur={(e) => {
                                setName(e.target.value);
                                localStorage.setItem("name", e.target.value)
                              }}
                            />
                           </div>
                        
                          </FormGroup>

                          <div className="mt-4 text-center">
                            <button color="primary" className="t4fbutton-dark w-50" type="submit">
                              {!isLoaded ? "Continue" : "Please Wait..."}
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    </Col>
                  </Row>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_Account_Mobile;

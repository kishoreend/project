import { React, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Link, useHistory } from "react-router-dom";
import { Accordion, AccordionContext } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import cus_log from "../../../assets/icons/cus-login.png";
import leftarrow from "../../../assets/icons/left-arrow.png";
import user_login from "../../../assets/icons/user_login.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
import { getActivetFc, setActiveFc } from "../../../store/customer/action";
import { useLocation } from "react-router"
import { getData } from "../../../ServiceCall";
import {
  CUSTOMER_LOGIN_FAILED,
  CUSTOMER_LOGIN_INIT,
  CUSTOMER_LOGIN_PHONENUMBER
} from "../../../store/customer/actionTypes";
import * as REDUX_ACTION from "../../../store/customer/action";
import { postData, reduxPostData } from "../../../ServiceCall";
import backarrow from "../../../assets/icons/back-arrow.png";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

const Customer_Account = (props) => {

  const [isFcLoaded, setFcLoaded] = useState(false);
  const [isStallOpened, setStallOpened] = useState(true);
  const [stall, setStall] = useState({});

  const fcId = new URLSearchParams(props.location.search).get('fc');
  const isRestaurant = new URLSearchParams(props.location.search).get('restaurant');
  const stallId = new URLSearchParams(props.location.search).get('stallId');
  const logoutFlag = new URLSearchParams(props.location.search).get('l');

  const history = useHistory();
  // const handleSubmit = () => {
  //   if (stallId) {
  //     localStorage.setItem('selfStallId', stallId);
  //   } else {
  //     // localStorage.removeItem('')
  //   }
  //   history.push(config.customerurl.Customer_Account_Mobile);
  // };
  const dispatch = useDispatch()
  const loginmessage = "Login/Create Account to manage orders";
  const store = useSelector(store => store)
  console.log("store ", store)
  // console.log('fcId', fcId)
  const activeFC = useSelector(store => store.customer.activeFC)
  const [isValidFC, setValidFCFlag] = useState(true);
  const [isLogout, setLogout] = useState(false);

  useEffect(async () => {

    // localStorage.clear();

    // dispatch(getActivetFc(fcId))

    localStorage.setItem("t4fcart", JSON.stringify([]));
    localStorage.removeItem("selfStallId");
    dispatch(REDUX_ACTION.resetCart([]));

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/', '_');
    console.log(timezone);

    try {
      if (logoutFlag && parseInt(logoutFlag) === 1) {
        setValidFCFlag(true);
        setLogout(true);
      } else {
        if (stallId) {
          await getData('/api/customer/get-foodstall?fs-id=' + stallId + '&timezone=' + timezone).then(data => {
            console.log(data.data.data);
            setStallOpened(data.data.data.isOpened);
            setStall(data.data.data);
          })
        }
        await getData('/api/customer/get-foodcourt-details?fcId=' + fcId).then(data => {
          console.log(data.data)
          if (data.data) {
            dispatch(setActiveFc(data.data.data));

            setFcLoaded(true);
            console.log(activeFC);
            setValidFCFlag(true);
          } else {
            setValidFCFlag(false);
          }
          console.log('activeFC', activeFC)
        });
      }

    } catch (e) {
      // console.log(data)
      dispatch(setActiveFc({}));
    }



  }, []);

  const [contactNo, setContactNo] = useState(0);
  const [fullName, setName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  // const history = useHistory();
  // const dispatch = useDispatch();
  const message = "Enter your 10 digit mobile number";
  const name = "Enter your Name";
  const user = useSelector(state => state.customer.user);

  console.log(user)

  const [redirectUrl, setRedirectUrl] = useState('')
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(stallId){
      localStorage.setItem("selfStallId", stallId);
    }
    const selfStallId = localStorage.getItem('selfStallId');

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
    let result = await reduxPostData("/auth/user/phone-number-login?phone-number=" + contactNo, {}, "customer", "post")
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
            {/* {
              isFcLoaded && ((<SideNavBar login={false} />))
            } */}
{/* 
            <div className="mobile_header_gray p-2">
              <span>
                <b>Account</b>
              </span>
            </div>
           
            <div className="lglogo">
              <img src={logo} className="w-25" />
            </div> */}


            {
              isStallOpened ? (
                !isValidFC ? ((
                  <div style={{
                    textAlign: 'center',
                    height: '70px',
                    // width: '100%',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    marginLeft: '10%',
                    marginRight: '10%',
                    fontSize: '20px',
                    paddingTop: '3%'
                  }}>
                    Invalid food court
                  </div>
                )) : isLogout ? ((
                  <div style={{
                    textAlign: 'center',
                    height: '120px',
                    // width: '100%',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    marginLeft: '10%',
                    marginRight: '10%',
                    fontSize: '20px',
                    paddingTop: '3%'
                  }}>
                    You are logged out. <br />
                    Please scan the QR code again and enjoy the food!
                  </div>
                )) : ((
                  <>
                    <div className="mobile_wrapper">
                      <div className="row mobilecontainer justify-content-center">
                        <div className="w-100" style={{ maxWidth: "500px" }}>
                          {
                            isLoggedIn && history.push(redirectUrl)
                          }

                          <div className="mobile_header_gray p-2">
                            <span>
                              {/* <a href={config.customerurl.Customer_Account}>
                                <img src={backarrow} height="10" />
                              </a> */}
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
                                                localStorage.setItem("fullname", e.target.value)
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
                  // <div className="w-100 text-center mt-2">
                  //   <p>{loginmessage}</p>

                  //   <button color="primary" className="t4fbutton-dark w-50" onClick={handleSubmit}>
                  //     <span>
                  //       <img src={user_login} height="15" /> Log in
                  //     </span>
                  //   </button>
                  //   <div className="mt-2">
                  //     {/* <a href={config.customerurl.CustomerHome} className="tf4_linklabel_mobile text-small">
                  //   Skip Log in{" "}
                  //   <span>
                  //     {" "}
                  //     <img src={leftarrow} height="8" />
                  //   </span>
                  // </a> */}
                  //   </div>
                  // </div>
                ))) : ((
                  <div style={{
                    textAlign: 'center',
                    height: '120px',
                    // width: '100%',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    marginLeft: '10%',
                    marginRight: '10%',
                    fontSize: '20px',
                    paddingTop: '3%'
                  }}>
                    <u>Temporarily Closed.</u> <br />
                    {stall.foodStallName} foodstall is temporarily closed and it will be opened soon.
                  </div>
                ))
            }


          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_Account;

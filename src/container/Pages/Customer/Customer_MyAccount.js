import React, { useState, useEffect } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import search_dark from "../../../assets/icons/search_dark.png";
import kfc from "../../../assets/icons/kfc.png";
import config from "../../../container/app/navigation.json";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getData, postData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";
import { RESET_CUSTOMER_STORE } from "../../../store/customer/actionTypes";
const Orders = [
  {
    orderid: 4326,
    shopname: "KFC",
    price: "₹.20",
    orderdate: "15/05/2021",
    orderstatus: "order-status-green",
  },
  {
    orderid: 4326,
    shopname: "KFC KFC",
    price: "₹.20",
    orderdate: "15/05/2021",
    orderstatus: "order-status-green",
  },
  {
    orderid: 4326,
    shopname: "Subway Subway",
    price: "₹.20",
    orderdate: "15/05/2021",
    orderstatus: "order-status-red",
  },
  {
    orderid: 4326,
    shopname: "KFC KFC",
    price: "₹.20",
    orderdate: "15/05/2021",
    orderstatus: "order-status-orange",
  },
  {
    orderid: 1,
    shopname: "KFC",
    price: "₹.20",
    orderdate: "15/05/2021",
    orderstatus: "order-status-orange",
  },
];
const Customer_MyAccount = () => {
  const [mobileno, setMobileno] = React.useState("0");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const phNo = useSelector((store) => store.customer.user.phoneNumber);
  const fsId = useSelector((store) => store.customer.activeFs[0]?.shop_id);
  const [myOrders, setMyOrders] = useState([]);
  const dispatch = useDispatch();
  // console.log(phNo);
  // console.log(localStorage.getItem("customerLoggedinmobile"));
  useEffect(() => {
    //get user data on load of page
    const getCustomerDetails = async () => {
      const resp = await getData(
        `/api/customer/get-userdata?phoneNumber=${phNo}`
      );
      setUserData(resp.data.data);
    };
    getCustomerDetails();
    // setMobileno(localStorage.getItem("customerLoggedinmobile"));
    const myOrdersResponse = async () => {

      console.log(fsId);
      const resp = await getData(
        "/api/customer/getOrders?phoneNumber=" + phNo
      );
      setMyOrders(resp.data.data);
    };
    myOrdersResponse();
    // if (myOrders) console.log("myOrders", myOrders);
    setMobileno(phNo);
  }, []);
  const message = "Shop list";
  const orderStatus = (status) => {
    if (status == "DELIVERED") return "order-status-green";
    if (status == "CANCELLED") return "order-status-red";
    else return "order-status-yellow";
  };
  const signOut = () => {
    // localStorage.removeItem("customerLoggedinmobile");
    localStorage.clear();
    history.push(config.customerurl.Customer_Account + "?l=1");
    dispatch({ type: RESET_CUSTOMER_STORE });
    window.location.reload();
};

  const handleSubmit = async () => {
    console.log("here");
    const resp = await postData(
      `/api/customer/update-profile?phone-number=${phNo}`,
      {
        email: userData.email,
        fullName: userData.fullName,
      },
      "customer",
      "POST"
    );
    setAlertMsg("Updated Successfully!");
    setAlert(true);
  };
  const activeFC = useSelector((store) => store.customer.activeFC);

  return (
    <React.Fragment>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={4} />
            <div className="mobile_header_white p-1" style={{
              fontSize: '24px',
              backgroundColor: '#223554',
              color: 'white'
            }}>
              {/* <img src={kfc} height="30" /> */}
              {activeFC.buName}
            </div>
    <div className="m-3 accbord">
    <div className="mobile_header_gray p-2">
              <span>
                <b>My Account</b>
              </span>

              <div id="mobile-cus-profile" className="mt-1">
                <ul
                  className="nav nav-pills mb-2"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#orders"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      My Orders
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#orders"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                        onClick={signOut}
                      >
                      Sign Out
                      {/* <img src={logout} height="20" /> */}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div id="pills-tabContent-orders">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <Row>
                    <Col lg={12}>
                      <div className="p-3">
                        <AvForm
                          className="form-horizontal"
                          // onValidSubmit={handleSubmit}
                        >
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <span className="t4f_label">Full Name</span>
                              </span>
                            </div>

                            <AvField
                              name="name"
                              value={userData.fullName}
                              type="text"
                              className="t4finput"
                              id="name"
                              onChange={(e) =>
                                setUserData({
                                  email: userData.email,
                                  fullName: e.target.value,
                                })
                              }
                              //validate={{ email: true, required: true }}
                              //placeholder="Enter username"
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
                              value={userData.email}
                              type="text"
                              className="t4finput"
                              id="emailid"
                              validate={{ email: true }}
                              onChange={(e) =>
                                setUserData({
                                  email: e.target.value,
                                  fullName: userData.fullName,
                                })
                              }

                              //placeholder="Enter username"
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
                              validate={{ required: true }}
                              value={mobileno}
                              disabled
                              //placeholder="Enter username"
                            />
                          </FormGroup>
                          <div
                            style={{
                              width: "50%",
                              marginLeft: "25%",
                              marginRight: "25%",
                            }}
                            onClick={() => setAlert(false)}
                          >
                            {alert ? (
                              <Alert message={alertMsg} type="success" />
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              color="primary"
                              className="t4fbutton-dark w-100 waves-effect waves-light"
                              type="submit"
                              onClick={() => handleSubmit()}
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
                {/* Orders */}
                <div
                  className="tab-pane fade mt-1"
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <Row>
                    <Col lg={12}>
                      <Row style={{backgroundColor: "#223554", color: 'white', height: '45px', paddingTop: '9px', paddingLeft: '5px'}}>
                        <Col xs={3}>
                          Food Stall
                        </Col>
                        <Col xs={2}>
                          Order ID
                        </Col>
                        <Col xs={2}>
                          Price
                        </Col>
                        <Col xs={5}>
                          Order Date
                        </Col>
                      </Row>
                      {myOrders.map((order) => (
                        <Link
                          className="decoration-none"
                          to={
                            config.customerurl.Customer_OrderDetails +
                            "?orderid=" +
                            order.orderId
                          }
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            localStorage.setItem(
                              "currentOrderDetails",
                              JSON.stringify(order)
                            );
                          }}
                        >
                          <div
                            className={
                              order.status == "DELIVERED"
                                ? "order-status-delivered"
                                : order.status == "CANCELLED"
                                ? "order-status-red"
                                : order.status == "NEW" ? "order-status-violet" 
                                : order.status == "READY" ? "order-status-green" : "order-status-orange"
                            }
                          >
                            <Row style={{height: '60px', paddingTop: '11px', paddingLeft: '5px', borderBottom: '1px solid #e8ebee'}}>
                              <Col xs={3}>
                                {order.foodStallName}
                              </Col>
                              <Col xs={2}>
                                {order.orderId}
                              </Col>
                              <Col xs={2}>
                                {order.totalAmount}
                              </Col>
                              <Col xs={5}>
                                {order.orderedTime}
                              </Col>
                            </Row>
                          </div>
                        </Link>
                      ))}
                    </Col>
                  </Row>
                  <div className="p-2">
                    <span>
                      <span className="dot color-voilet"> </span> New Orders
                    </span>
                    <span>
                      <span className="dot color-green"></span>Ready
                    </span>
                    <span>
                      <span className="dot color-lightgreen"></span>Delivered
                    </span>
                    <span>
                      <span className="dot color-red"></span>Cancelled
                    </span>
                  </div>
                </div>
              </div>
            </div>
    </div>
         
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Customer_MyAccount;

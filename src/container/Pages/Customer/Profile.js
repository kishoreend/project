import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Language from "../../../components/VerticalLayout/Language";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import search_dark from "../../../assets/icons/search_dark.png";
import kfc from "../../../assets/icons/kfc.png";
import { StickyContainer, Sticky } from 'react-sticky';
import user from "../../../assets/icons/user_white.png";
import config from "../../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { callApi, getData, postData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import bell from "../../../assets/icons/bell.png";
import { setActiveMenuItem } from "../../../store/customer/action";
import { MenuItem } from "react-pro-sidebar";
import { RESET_CUSTOMER_STORE } from "../../../store/customer/actionTypes";
import logout from "../../../../src/assets/icons/logout.png";
import SockJS from "sockjs-client";
import { over } from 'stompjs';
import notificationMp3 from '../../../assets/mp3/notification.mp3'

var stompClient = null;

const Profile = (props) => {

    const [showNotificationsFlag, setShowNotificationsFlag] = useState(false);
    const [profileFlag, setShowProfileFlag] = useState(false);
    const [mobileno, setMobileno] = React.useState("0");
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const phNo = useSelector((store) => store.customer.user.phoneNumber);
    const fsId = useSelector((store) => store.customer.activeFs[0]?.shop_id);
    const [myOrders, setMyOrders] = useState([]);
    const [newOrderNotificationCount, setNewOrderNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const activeMenuItem = useSelector(store => store.customer.activeMenuItem);

    const dispatch = useDispatch();
    // console.log(phNo);
    // console.log(localStorage.getItem("customerLoggedinmobile"));
    useEffect(() => {
        //get user data on load of page
        const getCustomerDetails = async () => {
            const resp = await getData(
                `/api/customer/get-userdata?phoneNumber=${phNo}`
            );
            setUserData(resp?.data.data);
           
            console.log(resp.data.data);
            
        };
        getCustomerDetails();
        // setMobileno(localStorage.getItem("customerLoggedinmobile"));
        const myOrdersResponse = async () => {

            console.log(fsId);
            const resp = await getData(
                "/api/customer/getOrders?phoneNumber=" + {phNo}
            );
            setMyOrders(resp?.data.data);
            
           
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
        setTimeout(() => {
            setShowNotificationsFlag(!showNotificationsFlag)
        }, 2000);
    };
    const activeFC = useSelector((store) => store.customer.activeFC);
    const customerMobileNumber = useSelector(state => state.customer.user.phoneNumber);
    useEffect(() => {
        setMobileno(customerMobileNumber);
        if (customerMobileNumber) {
            connect();
        }
    }, [props, customerMobileNumber]);

    const signOut = () => {
        // localStorage.removeItem("customerLoggedinmobile");
        localStorage.clear();
        history.push(config.customerurl.Customer_Account + "?l=1");
        dispatch({ type: RESET_CUSTOMER_STORE });
        window.location.reload();
    };

    const markNotifocationAsRead = async (notification) => {
        console.log("Mark Read Notification", notification)
        await callApi('/api/customer/notifications/mark-notification-as-read?notificationId=' + notification.notificationId, 'PUT')
            .then(notificationsResponse => {
                console.log(notificationsResponse)
            });
    }

    const connect = () => {
        // let Sock = new SockJS("http://localhost:8081/tf/wsUser");
        let Sock = new SockJS("https://api.tap4food.com/tf/wsUser");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
        console.log('connected....')
    };

    const onConnected = () => {
        // setUserData({...userData,"connected": true});
        console.log('Notification channel is enabled')

        // for(let i = 0; i < foodStalls.length; i++){
        //   stompClient.subscribe("/user/tfChannel/public", onMessageReceived);
        // }
        stompClient.subscribe("/user/tfChannel/public", onMessageReceived);
        stompClient.subscribe(
            "/user/" + customerMobileNumber + "/private",
            onPrivateMessage
        );
        // userJoin();
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData);
    };

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);

        const notification = [payloadData]

        setNotifications(notification);

        setNewOrderNotificationCount(newOrderNotificationCount + 1);
        new Audio(notificationMp3).play();
    };

    const onError = (err) => {
        console.log(err);
    };

    return (
        <>
       
           <div style={{position:'sticky', top:'0', zIndex:1}}>
            <div className="d-flex mobile_header_white justify-content-between" style={{
                fontSize: '18px',
                backgroundColor: '#223554',
                color: 'white',
                padding: '15px',
                position: '-webkit-sticky',
                position:'sticky',
                top:0,
               // marginTop:'4vh'
               

            }}>
                {/* <img src={inorbit} className="headericon" height="30" /> */}
                < img src="https://merchant.tap4food.com/merchant/static/media/logo.b73fb1c0.png" position="absolute" height={60} width={60}/>
                <div style={{
                    fontSize: '18px',
                    width: '85%',
                    height:"90%",
                    marginLeft:'2vh',
                    paddingTop:'3vh',
                    position: '-webkit-sticky',
                    position:'sticky',
                    top:'0'
                   


                }}>
                    {activeFC.buName}
                </div>

                {/* <div className="d-flex pad-right-5 bd-highlight align-items-center display-none-mobile" style={{height:'20px',width:'20px',position:'absolute',marginLeft:'60vh'}}>
                  <span className="headerlabelbox t4h-color-gray " >
                    <Language />
                  </span>
                </div> */}

                <div style={{position:'sticky',top:0}}>
                    <div >
                        <Modal show={showNotificationsFlag} className="fadepop" onHide={() => setShowNotificationsFlag(false)} centered animation={false}>
                            <Modal.Body>
                                <div>
                                    {notifications?.map(notification => (
                                        <>
                                            <label style={{
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                // position:'absolute',
                                                // alignSelf:'flex-end',
                                                paddingLeft:'4vh'
                                            }} onClick={() => markNotifocationAsRead(notification)} >
                                                {notification.message}
                                            </label>
                                            <hr />
                                        </>
                                    )
                                    )}
                                    {
                                        notifications.length == 0 && (
                                            <>
                                
                                                No Notifications
                                            </>
                                        )
                                    }
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>



                </div>
                {/* <BottomNavigationAction
                    value="4"
                    className={activeMenuItem === 'notification' ? "bg-search_mobile_footer link_mobile_footer nopad" : "link_mobile_footer"}
                    icon={
                        <div className="btn" >
                            <div className="" >
                                <span className="position-relative" >
                                    <img className="position-relative" src={bell} alt="notification header" height="18" color="#039d10"  position="absolute" paddingLeft="4vh" onClick={() => {
                                        dispatch(setActiveMenuItem('notification'));
                                        setShowNotificationsFlag(!showNotificationsFlag);
                                        setNewOrderNotificationCount(0);
                                    }} />
                                    {
                                        activeMenuItem === 'notification' ? (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill someClass">{newOrderNotificationCount}</span>
                                        ) :
                                            (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill someClass">{newOrderNotificationCount}</span>
                                            )
                                    }


                                </span>
                            </div>
                        </div>
                    }
                /> */}
                <button onClick={() => {
                    setShowProfileFlag(!profileFlag)
                }} style={{ background: 'none', border: 'none', padding: '0',marginTop:'-2vh' }}><img src={user} height="20" width="20" /> </button>

 <div>
<div className="d-flex pad-right-5 bd-highlight align-items-center display-none-mobile" style={{height:"18px",width:"20px",position:'absolute',marginLeft:'-10vh'}}>
                  <span className="headerlabelbox t4h-color-gray " >
                    <Language />
                  </span>
                </div>
                </div> 
                 <Modal show={profileFlag}
                    className="fadepop" onHide={() => setShowProfileFlag(false)}
                    centered animation={false}>
                    <Modal.Body>
                        <React.Fragment>
                            <div className="mobile_wrapper profilewrap">
                                <div className="row mobilecontainer justify-content-center">
                                    <div className="w-100" style={{ maxWidth: "500px" }}>
                                        {/*  <SideNavBar id={4} />
                                    <div className="mobile_header_white p-1">
                                       <img src={kfc} height="30" /> 
                                        {activeFC.buName}
                                    </div>*/}
                                        <div className="accbord">
                                            <div className="closebtn" onClick={() => setShowProfileFlag(false)}>x</div>
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

                                                        {/* <li className="nav-item" role="presentation">
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
                                                                Follow Us
                                                            </button>
                                                        </li> */}
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
                                                                                value={userData?.fullName}
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
                                                                                value={userData?.email}
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
                                                                <Row style={{ backgroundColor: "#223554", color: 'white', height: '45px', paddingTop: '9px', paddingLeft: '5px' }}>
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
                                                                {myOrders?.map((order) => (
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
                                                                            <Row style={{ height: '60px', paddingTop: '11px', paddingLeft: '5px', borderBottom: '1px solid #e8ebee' }}>
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
                    </Modal.Body>

                </Modal>
            </div>
            </div>
            
          
            
        </>
    )
}

export default Profile
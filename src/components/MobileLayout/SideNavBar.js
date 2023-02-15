import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../../assets/styles/mobileheader.scss";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Modal from "react-bootstrap/Modal";
import bell from "../../assets/icons/bell.png";
import "../../assets/styles/mobile.scss";
//import Language from "../VerticalLayout/Language";
import Language from "../VerticalLayout/Language";
import information from "../../assets/icons/information.png";
import help from "../../assets/icons/help.png";
import sitework from "../../assets/icons/sitework.png";
import contactus_cus from "../../assets/icons/contactus_cus.png";

import terms from "../../assets/icons/terms.png";
import notifications from "../../assets/icons/notifications.png";
import megaphone from "../../assets/icons/megaphone.png";
import menu from "../../assets/icons/menu.png";
import search from "../../assets/icons/search.png";
import home from "../../assets/icons/home.png";
import carticon from "../../assets/icons/cart.png";
import orderhistory from "../../assets/icons/orderhistory.png";
import smartphone from "../../assets/icons/smartphone.png";
import logout from "../../assets/icons/logout.png";
import logo from "../../assets/icons/logo.png";
import globe from "../../assets/icons/globe_white.png";
import config from "../../container/app/navigation.json";
import gowhite from "../../assets/icons/gowhite.png";
import { useSelector, useDispatch} from "react-redux";
import { Customer_ScreenData } from "../../container/Pages/Customer/Customer_ScreenData";
import { callApi } from "../../ServiceCall";
import Notifications, {notify} from 'react-notify-toast';
import notificationMp3 from '../../assets/mp3/notification.mp3'
import { RESET_CUSTOMER_STORE } from "../../store/customer/actionTypes";
import SockJS from "sockjs-client";
import {over} from 'stompjs';
import { setActiveMenuItem } from "../../store/customer/action";
import { useTranslation } from "react-i18next";

var stompClient = null;

const SideNavBar = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(true);
  const [activeID, setActiveID] = useState(1);
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [value, setValue] = React.useState("0");
  const [mobileno, setMobileno] = React.useState(0);
  // const customerMobileNumber = localStorage.getItem("customerLoggedinmobile");
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState(false);
  const carItems = useSelector(state => state.customer.cartItems);
 const buType=useSelector(store=>store.customer.activeFC.buType)
 const activeFC=useSelector(store=>store.customer.activeFC);

 const activeFSData=useSelector(store=>store.customer.activeFs);

 const activeMenuItem=useSelector(store=>store.customer.activeMenuItem);
 
 const [activeFS, setActiveFS]= useState(0);

 console.log('activeMenuItem:', activeMenuItem);
 
  const customerMobileNumber = useSelector(state => state.customer.user.phoneNumber);

  const [newOrderNotificationCount, setNewOrderNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const playAudio = () => {
    console.log(newOrderNotificationCount)
    if(newOrderNotificationCount > 0){
      new Audio(notificationMp3).play();
    }    
  }

  const {t} = useTranslation();
  const [selfStallId, setSelfStallId] = useState(0);

  useEffect(() => {
    if (window.location.href.indexOf("customer/cart") > -1) {
      setCart(true);
    }
    setMobileno(customerMobileNumber);
    if(customerMobileNumber){
      console.log('activeFSData :', activeFSData)

      const selfStallId = localStorage.getItem('selfStallId');
      
        if(selfStallId){
          setActiveFS(selfStallId);
          setSelfStallId(selfStallId);
        }else{
          if(Array.isArray(activeFSData)){
            setActiveFS(activeFSData?.length == 0 ? 0 : activeFSData[0].shop_id);
          }
        }

      // if(Array.isArray(activeFSData)){
      //   setActiveFS(activeFSData?.length == 0 ? 0 : activeFSData[0].shop_id);
      //  }else{
        
      //   const selfStallId = localStorage.getItem('selfStallId');
      
      //   if(selfStallId){
      //     setActiveFS(selfStallId);
      //   }
      //  }      
        // try {
        //   setInterval(async () => {
        // getNotifications(customerMobileNumber);
            
        //     // notifications.map(notification => {
        //     //   notify.show(
        //     //     <>  
        //     //     {notification.message}
        //     //     </>
                
        //     //   );
        //     // })
        //   }, 30000);
        // } catch(e) {
        //   console.log(e);
        // }

        connect();
    }
  }, []);

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

  const getNotifications = async (phoneNumber) => {
    await callApi('/api/customer/notifications/get-pending-notifications?phoneNumber=' + phoneNumber)
    .then(notificationsResponse => {  
      
      setNotifications(notificationsResponse.data.data);    

    });
  }

  console.log("sidebar", customerMobileNumber);
  const Menus = [
    {
      id: 1,
      name: "About us",
      link: config.customerurl.AboutUs,
      image: information,
    },
    {
      id: 2,
      name: "How Site Works",
      link: config.customerurl.HowSiteWorks,
      image: sitework,
    },
    { id: 3, name: "FAQ", link: config.customerurl.Customer_FAQ, image: help },
    {
      id: 4,
      name: "My account",
      link: config.customerurl.Customer_MyAccount,
      image: help,
    },
    {
      id: 5,
      name: "T & C",
      link: config.customerurl.TermsandCondition,
      image: terms,
    },
    {
      id: 6,
      name: "Contact Us",
      link: config.customerurl.Customer_ContactUs,
      image: contactus_cus,
    },
    // {
    //   id: 7,
    //   name: "Share app",
    //   link: config.customerurl.shareapp,
    //   image: megaphone,
    // },
  ];
  const handleShow = () => setShow((show) => !show);
  const handleClose = () => setShow((show) => !show);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const signOut = () => {
    // localStorage.removeItem("customerLoggedinmobile");
    localStorage.clear();
    history.push(config.customerurl.Customer_Account + "?l=1");
    dispatch({ type: RESET_CUSTOMER_STORE});
    window.location.reload();
  };
  const toggleMenu = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const placeOrder = () => {
    // localStorage.removeItem("t4fcart");
    console.log('Final Cart', carItems);

    const requestBody = {
      ...carItems
    }

    console.log('Placing order with CartItems', requestBody);
  };
  const cartcount = JSON.parse(localStorage.getItem("t4fcart")) == undefined ? 0 : JSON.parse(localStorage.getItem("t4fcart")).length;
  const localStorageCart = JSON.parse(localStorage.getItem("t4fcart"));
  const taxprice = localStorageCart?.reduce((a, v) => (a = a + v.foodItemTotalPrice), 0) * config.keys.taxpercentage;

  const [showNotificationsFlag, setShowNotificationsFlag] = useState(false);

  const markNotifocationAsRead = async (notification) => {
    console.log("Mark Read Notification", notification)
    await callApi('/api/customer/notifications/mark-notification-as-read?notificationId=' + notification.notificationId, 'PUT')
    .then(notificationsResponse => {        
      console.log(notificationsResponse)
    });
  }

  return (
    <>
      <div>
        <Modal show={showNotificationsFlag} className="fadepop" onHide={() => setShowNotificationsFlag(false)} centered animation={false}>
          <Modal.Body>
              <div>
                {notifications?.map(notification => (
                  <>
                  <label style={{
                    fontSize: '16px',
                    cursor: 'pointer'
                  }} onClick={()=> markNotifocationAsRead(notification)}>
                    {notification.message}
                  </label>
                  <hr/>
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
      <div id="mobileheader">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar
          collapsed={menuCollapse}
          toggled={true}
          onMouseLeave={() => {
            setMenuCollapse(true);
          }}
        >
          <SidebarHeader>
            <div className="p-2">
              <div className="mt-2">
                <div className="d-flex">
                  <div className="align-items-center">
                    <img src={logo} height="60" />
                  </div>
                  <div className="px-2 align-items-center">
                    <div className="mb-1  text-white pt-1">{t('welcome')}</div>
                    {customerMobileNumber === 0 || customerMobileNumber === null ? (
                      <a className="t4f_linkbutton_mobile w-100 text-center d-flex" href={config.customerurl.Customer_Account}>
                        <span>
                          <img src={smartphone} height="15" /> <span>Register your mobile</span>
                        </span>
                      </a>
                    ) : (
                      <div className="text-white lg-text"> {customerMobileNumber}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              {Menus.map((menu) => (
                <MenuItem active={menu.id === props.id} icon={<img src={menu.image} height="15" />} key={menu.id} onClick={(e) => (setActiveItem(true), setActiveID(e.target.key), history.push(menu.link))}>
                  {menu.name}
                </MenuItem>
              ))}
              <MenuItem
                //active={8}
                icon={<img src={logout} height="15" />}
                key={8}
                onClick={signOut}
              >
                Sign Out
              </MenuItem>
              {/* <MenuItem
                //active={8}
                icon={<img src={globe} height="15" />}
                key={8}
                onClick={handleShow}
              >
                Language
              </MenuItem> */}

              <div className="mt-5 d-none">
                <div className="mt-5">
                  <div className="mt-5 p-2">
                    <button color="primary" onClick={toggleMenu} className=" mb-2 t4fbutton_mobile_tran w-100">
                      Close
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="p-2 px-4">
                <span className="mobile-language">
                  <Language mobileclass={"drpmobileLanguange"} />
                </span>
              </div> */}
            </Menu>
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
        </ProSidebar>
      </div>

      {/* View Cart */}
      
      {/* Bottom menu */}
      <div className="d-flex align-items-end position-absolute">
       
        {/* <div className="d-flex flex-column text-light bottom_navbar mobilefooter mb-5"> */}
          {/* self pickup and order */}
       {/* {buType==="THEATRE" &&   <Customer_ScreenData/>} */}
          {/* <div className="mb-2">
            {cart ? (
              <div className="d-flex justify-content-between bg-red p-2 px-3">
                <div>
                  Total: {config.keys.rupee} {taxprice + localStorageCart?.reduce((a, v) => (a = a + v.foodItemTotalPrice), 0)}
                </div>
                <div>
                  <Link className="text-light text-decoration-none" to={config.customerurl.Customer_Cart} onClick={placeOrder()}>
                    <b> Place Order </b>
                    <img src={gowhite} height="10" />
                  </Link>
                </div>
              </div>
            ) : cartcount != 0 ? (
              <div className="d-flex justify-content-between bg-red p-2 px-3">
                <div>{cartcount} Item</div>
                <div>
                  <Link className="text-light text-decoration-none" to={config.customerurl.Customer_Cart}>
                    <b> View Cart </b>
                    <img src={gowhite} height="10" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div> */}
          <div>
          
            <BottomNavigation value={value} onChange={handleChange} className="bottom_navbar mobilefooter">
               <BottomNavigationAction value="1" icon={<img src={menu} height="18" />} onClick={toggleMenu} className="link_mobile_footer" /> 
               <BottomNavigationAction value="2" 
              icon={<img src={home} height="18" marginLeft="3vh" />} 
              href={customerMobileNumber === 0 || customerMobileNumber === null ? "#" : config.customerurl.CustomerHome} 
              className={activeMenuItem === 'home' ? "bg-search_mobile_footer link_mobile_footer" : "link_mobile_footer"}
              />  
               
                {/* <BottomNavigationAction value="3"  />
                  <span className="headerlabelbox t4h-color-gray " height="18" paddingLeft='3vh'>
                    <Language />
                  </span>  */}
              <BottomNavigationAction
                value="4"
                href={config.customerurl.Customer_Cart}
                className={activeMenuItem === 'cart' ? "bg-search_mobile_footer link_mobile_footer" : "link_mobile_footer"}
                icon={
                  <div className="btn">
                    <div >
                      <span className="position-relative">
                        <img className="position-relative" src={carticon} alt="notification header" height="18"/>
                        {
                          activeMenuItem === 'cart' ? (
                            <span className={"position-absolute top-0 start-100 translate-middle badge rounded-pill"}>{cartcount}</span>
                          ):
                          (
                            <span className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-teal"}>{cartcount}</span>
                          )
                        }
                        
                        {/* .bg-warn add color in css if needed */}
                      </span>
                    </div>
                  </div>
                } // link_mobile_footer_active"
              />

               {/* <BottomNavigationAction value="5" icon={<img src={cart} height="18" />} className="link_mobile_footer" />  */}
              

               <BottomNavigationAction
                value="4"
                className={activeMenuItem === 'notification' ? "bg-search_mobile_footer link_mobile_footer" : "link_mobile_footer"}
                icon={
                  <div className="btn">
                    <div className="">
                      <span className="position-relative">
                        <img className="position-relative" src={bell} alt="notification header" height="18" onClick={() => {
                          dispatch(setActiveMenuItem('notification'));
                          setShowNotificationsFlag(!showNotificationsFlag);
                          setNewOrderNotificationCount(0);
                          }} />
                          {
                            activeMenuItem === 'notification' ? (
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">{newOrderNotificationCount}</span>
                            ) :
                            (
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill someClass">{newOrderNotificationCount}</span>
                            )
                          }
                        
                         
                      </span>
                    </div>
                  </div>
                }                
              /> 
              {/* <BottomNavigationAction value="3"  />
                  <span className="headerlabelbox t4h-color-gray " height="18" >
                    <Language />
                  </span>  */}

               {/* <div className="bg-search_mobile_footer">
                <BottomNavigationAction value="3" className="link_mobile_footer" icon={<img src={search} height="18" />} />
              </div>  */}
               
              
               

              {/* <div className="d-flex pad-right-5 bd-highlight align-items-center display-none-mobile" style={{height:100,width:100,position:'absolute',marginLeft:'2vh',marginTop:'-4vh'}}>
                 <BottomNavigationAction value="3" className="link_mobile_footer" />
                  <span className="headerlabelbox t4h-color-gray " >
                    <Language />
                  </span>
                </div> */}

              {/* {
                ((Array.isArray(activeFSData) && activeFSData.length > 0) || selfStallId > 0) && (
                  <BottomNavigationAction value="5" icon={
                    <div style={{
                      color: 'white',
                      border: '1px solid white',
                      borderRadius: '4px',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                      paddingTop: '2px',
                      paddingBottom: '2px'
                    }}>
                      {'Stall'}
                    </div>
                  } href={customerMobileNumber === 0 || customerMobileNumber === null ? "#" : config.customerurl.Customer_Menu + "?fs-id=" + (Array.isArray(activeFSData) ? (activeFSData.length > 0 ? activeFSData[0].shop_id : 0) : selfStallId)} 
                  className={activeMenuItem === 'stall' ? "bg-search_mobile_footer link_mobile_footer" : "link_mobile_footer"}>
                    
                    </BottomNavigationAction>
                )
              } */}
              
            </BottomNavigation>
            
          </div>
        {/* </div> */}
      </div>

      <Modal show={show} onHide={handleClose} size="sm" centered animation={false}>
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Select Language</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <span className="t4fradioCF">
              <label>
                <label for="en" className="w-25">
                  English
                </label>
                <input type="radio" name="lan" />
                <span></span>
              </label>
            </span>
            <span className="t4fradioCF">
              <label>
                <label for="ar" className="w-25">
                  Arabic
                </label>
                <input type="radio" name="lan" />
                <span></span>
              </label>
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SideNavBar;

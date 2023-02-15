import React, { useEffect, useState } from "react";

//import { Navbar, Nav } from "react-bootstrap";
import Language from "./Language";
import AccountStatus from "./AccountStatus";
import StallStatus from "./StallStatus";
import Notification from "./Notification";
import Profile from "./Profile";
import FoodStall from "./FoodStall";
//import sample from "./icons/sample.png";

import SockJS from "sockjs-client";
import {over} from 'stompjs';
import { useSelector } from "react-redux";
import { callApi } from "../../ServiceCall";
import Notifications, {notify} from 'react-notify-toast';
import notifMp3 from '../../assets/mp3/notification.mp3'
import { Modal } from "react-bootstrap";
import tick from "../../assets/icons/tick.png";

var stompClient = null;

const Header = (props) => {

  const selectedFoodStallDetails = useSelector(
    (state) => state.merchant.currentFoodstallDetail
  );

  const [newOrderNotificationCount, setNewOrderNotificationCount] = useState(0);
  const [notification, setNotification] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    console.log('IN Header selectedFoodStallDetails', selectedFoodStallDetails);

    connect();
   
  }, [])

  // const getNotifications = async () => {
  //   await callApi('/api/merchant/notifications/get-pending-notifications?fsId=' + selectedFoodStallDetails.foodStallId)
  //   .then(notificationsResponse => {

  //     console.log(notificationsResponse.data)
        
      
  //       setNewOrderNotificationCount(notificationsResponse.data.data.activeCount);

  //       setNotifications(notificationsResponse.data.data.notifications);
  //       localStorage.setItem("PENDING_NOTIFICATIONS_" + selectedFoodStallDetails.foodStallId, JSON.stringify(notificationsResponse.data.data.notifications));
  //       localStorage.setItem("ACTIVE_NOTIFICATIONS_COUNT_" + selectedFoodStallDetails.foodStallId, notificationsResponse.data.data.activeCount);
  //       // console.log(localStorage.getItem("PENDING_NOTIFICATIONS"))        
  //   });
  // }

  const connect = () => {
    // let Sock = new SockJS("http://localhost:8080/tf/wsMerchant");
    let Sock = new SockJS("https://api.tap4food.com/tf/wsMerchant");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log('connected....')
  };

  const onConnected = () => {
    // setUserData({...userData,"connected": true});
    console.log('Notification channel is enabled')

    console.log(selectedFoodStallDetails.foodStallId)
    stompClient.subscribe(
      "/user/" + selectedFoodStallDetails.foodStallId + "/private",
      onPrivateMessage
    );
    // userJoin();
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log('In Header',payloadData);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload, newOrderNotificationCount);
    var payloadData = JSON.parse(payload.body);

    setNotification(payloadData);

    setShowModal(true);

    setNewOrderNotificationCount(newOrderNotificationCount + 1);

    new Audio(notifMp3).play();
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="topheader ">
        {/* <Notifications /> */}
        <div className="d-flex bd-highlight ">
          <div className="p-2 flex-grow-1 bd-highlight display-none-mobile">
            <span className="t4ftitle d-flex p-2 bd-highlight">{props.title}</span>{" "}
          </div>
          {!props ||
            (props.role == "admin" && props.viewmerchant == true && (
              <div className="d-flex pad-right-10 bd-highlight align-items-center">
                <span className="d-flex headerlabelbox align-items-center">
                  <FoodStall role='admin'/>
                </span>
              </div>
            ))}
          {!props ||
            (props.role !== "admin" && (
              <div className="d-flex pad-right-10 bd-highlight align-items-center">
                <span className="headerlabelbox align-items-center">
                  <FoodStall />
                </span>
              </div>
            ))}
          {!props ||
            (props.role !== "admin" && (
              <>
                <div className="d-flex pad-right-10 bd-highlight align-items-center">
                  <span className="headerlabelbox">
                    <AccountStatus />
                  </span>
                </div>
                <div className="d-flex pad-right-10 bd-highlight align-items-center display-none-mobile">
                  <span className="headerlabelbox t4h-color-gray ">
                    <Language />
                  </span>
                </div>
                <div className="d-flex pad-right-10 bd-highlight align-items-center">
                  <span className="headerlabelbox">
                    <StallStatus />
                  </span>
                </div>
              </>
            ))}

          <div className="d-flex pad-right-10 bd-highlight align-items-center display-none-mobile">
            <span className="headerlabelbox">
            {
              props.role === 'admin' ? (
                <Notification role='admin' stallId={selectedFoodStallDetails.foodStallId} notifCount = {0} />
              ) : (
                <Notification role='merchant' stallId={selectedFoodStallDetails.foodStallId} notifCount = {newOrderNotificationCount}/>
              )
            }
              
            </span>
          </div>
          <div className="profile-icon bd-highlight">
            <span className="headerlabelbox-profile">
              <Profile username={JSON.stringify(localStorage.getItem("auth")).username} role={props && props.role} />
            </span>
          </div>
        </div>

        <Modal show={showModal} onEscapeKeyDown className="fadepop" onHide={() => setShowModal(false)} centered animation={false}>
        <Modal.Body>
            {/* <div style={{
              color: 'red',
              fontSize: '24px',
              fontWeight: 'bolder',
              height: '200px',
              textAlign: 'center',
              paddingTop: '15%'
            }}>
            {
              notification.message
            }
            </div> */}
            <div className="mt-4 text-center">
                <img src={tick} height="50  " />
                <div className="mt-2 h5">{notification.message}</div>
            </div>
              
        </Modal.Body>
        </Modal>
        

      </div>
    </>
  );
};

export default Header;

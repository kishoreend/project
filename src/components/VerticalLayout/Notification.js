import React, { useEffect, useState } from "react";
import notificationheader from "../../assets/icons/notificationheader.png";
import Notifications from "react-notifications-menu";
import { Link } from "react-router-dom";
import notifMp3 from '../../assets/mp3/notification.mp3'
import { callApi } from "../../ServiceCall";
import SockJS from "sockjs-client";
import {over} from 'stompjs';

var stompClient = null;

const Notification = (props) => {

  const role = props.role;
  const stallId = props.stallId;
  const notifCount = props.notifCount;

  const [count, setCount] = useState(0);
  const [isCompleted, setCompleted] = useState(true);
  const [notifLink, setNotifUrl] = useState('/merchant/notifications');

  useEffect(() => {

    if(role === 'admin'){
      setNotifUrl('#admin_notifications');
    }
    
  }, []);

  const connect = () => {
    // let Sock = new SockJS("http://3.7.67.199:8080/tf/ws");
    let Sock = new SockJS("https://api.tap4food.com/tf/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log('connected....')
  };

  const onConnected = () => {
    // setUserData({...userData,"connected": true});
    console.log('Notification channel is enabled')

    console.log(stallId)
    stompClient.subscribe(
      "/user/" + stallId + "/private",
      onPrivateMessage
    );
    // userJoin();
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log('In Header',payloadData);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload, count);
    var payloadData = JSON.parse(payload.body);

    setCount(count + 1);

    new Audio(notifMp3).play();
  };

  const onError = (err) => {
    console.log(err);
  };

  const getNotifications = () => {
    callApi('/api/merchant/notifications/get-pending-notifications?fsId=' + props.stallId)
    .then(notificationsResponse => {

        console.log(notificationsResponse.data)   
        
        if(notificationsResponse.data.data.activeCount > 0){

          setCount(notificationsResponse.data.data.activeCount);

          localStorage.setItem("PENDING_NOTIFICATIONS_" + props.stallId, JSON.stringify(notificationsResponse.data.data.notifications));
          
          
          if(count > 0){
            new Audio(notifMp3).play();
            localStorage.setItem("ACTIVE_NOTIFICATIONS_COUNT_" + props.stallId, count);
            // setCompleted(true);
          }
          
        }
        console.log(count)
    });
  }

  const data = props.notifications?.map(notif => {
    return {
      message : notif.message + ' from ' + notif.customerPhoneNumber,
      receivedTime: "Just now"
    }
  })


  return (
    <React.Fragment>
      {/* <div> */}
        {/* <Notifications
          data={data}
          header={{
            title: "Notifications",
            option: { text: "View All", onClick: () => console.log("Clicked") }
          }}
          markAsRead={(data) => {
            console.log(data);
          }}
        /> */}
        {/* </div> */}
      {/* <Notification
        data={[
          {
            image: notificationheader,
            message: 'Kameshwaran S had shared a feedback with you.',
            detailPage: '/',
          },
          {
            image: notificationheader,
            message: (
              <p>
                Kameshwaran S had shared a{' '}
                <span style={{ color: '#7ac2fa' }}>feedback</span> with you.
              </p>
            ),
            detailPage: '/',
          },
        ]}
        header={{
          title: 'Notifications',
          option: { text: 'View All', onClick: () => console.log('Clicked') },
        }}
        classNamePrefix="okrjoy"
        icon={notificationheader}
      /> */}
      <div className="btn">
        <Link to={notifLink}>
        <div className="text-small">
          <span type="button1" className="position-relative">
            <img className="position-relative" src={notificationheader} alt="notification header" height="14" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{notifCount}</span>
          </span>
        </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Notification;

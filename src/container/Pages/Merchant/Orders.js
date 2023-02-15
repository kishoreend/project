import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import OrdersHome from "./Components/Orders/OrdersHome";
import {
  postData,
  getData,
  reduxGetData,
  reduxPostData,
  callApi,
} from "../../../ServiceCall";
import { useSelector } from "react-redux";

import SockJS from "sockjs-client";
import {over} from 'stompjs';

var stompClient = null;

const Orders = () => {
  const [ordersRefreshFlag, setOrdersRefreshFlag] = useState(false);

  const selectedFoodStallDetails = useSelector(
    (state) => state.merchant.currentFoodstallDetail
  );
  const [orders, setOrders] = useState({});
  const [newOrders, setNewOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [newOrderNotificationCount, setNewOrderNotificationCount] = useState(0);

  const { t } = useTranslation();
  //let title = t("my_profile");
  let title = "Orders";
  const [activeTab, setActiveTab] = useState(1);

  const toggle = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const ordersRefresh = () => {
    setNewOrders([]);
    setPreparingOrders([]);
    setReadyOrders([]);
    setCancelledOrders([]);
    setDeliveredOrders([]);
    setOrdersRefreshFlag(!ordersRefreshFlag);
    setNewOrderNotificationCount(0);

    // const notificationsToMark = JSON.parse(localStorage.getItem("PENDING_NOTIFICATIONS_" + selectedFoodStallDetails.foodStallId));

    // notificationsToMark.map(notif => {
    //   callApi('/api/merchant/notifications/mark-notification-as-read?notificationId=' + notif.notificationId, 'PUT')
    // })
    

  };

  useEffect(() => {
    setAllOrders([]); // Just to make sure the all orders array becomes empty..

    // try {
    //   setInterval(() => {

    //     const pendingNotifications = JSON.parse(localStorage.getItem("PENDING_NOTIFICATIONS_" + selectedFoodStallDetails.foodStallId));
    //     console.log('pendingNotifications', pendingNotifications)
    //     setNotifications(...pendingNotifications);

    //     // const newNotifications = localStorage.getItem("ACTIVE_NOTIFICATIONS_COUNT_" + selectedFoodStallDetails.foodStallId);
    //     const count = localStorage.getItem("ACTIVE_NOTIFICATIONS_COUNT_" + selectedFoodStallDetails.foodStallId);
    //     if(count > 0){
    //       setNewOrderNotificationCount(count);
    //     }        

    //   }, 11000);
    // } catch(e) {
    //   console.log(e);
    // }  

    const foodStallId = selectedFoodStallDetails.foodStallId;

    console.log(foodStallId);

    getOrders(foodStallId);

    connect();
  }, [ordersRefreshFlag]);

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
    console.log(payloadData);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload, newOrderNotificationCount);
    var payloadData = JSON.parse(payload.body);

    setNewOrderNotificationCount(newOrderNotificationCount + 1);
  };

  const onError = (err) => {
    console.log(err);
  };

  const getOrders = async (foodStallId) => {
    const ordersResponse = await getData(
      "/api/merchant/orders/get-orders?fsId=" + foodStallId
    );

    console.log(ordersResponse);

    setOrders(ordersResponse.data.data);
    if (ordersResponse.data.data && ordersResponse.data.data.NEW) {
      setNewOrders(ordersResponse.data.data.NEW);
      setAllOrders((previousState) => {
        return [...previousState, ...ordersResponse.data.data.NEW];
      });
    }
    if (ordersResponse.data.data && ordersResponse.data.data.START_PREPARING) {
      setPreparingOrders(
        ordersResponse.data.data && ordersResponse.data.data.START_PREPARING
      );
      setAllOrders((previousState) => {
        return [...previousState, ...ordersResponse.data.data.START_PREPARING];
      });
    }
    if (ordersResponse.data.data && ordersResponse.data.data.READY) {
      setReadyOrders(ordersResponse.data.data.READY);
      setAllOrders((previousState) => {
        return [...previousState, ...ordersResponse.data.data.READY];
      });
    }
    if (ordersResponse.data.data && ordersResponse.data.data.CANCELLED) {
      setCancelledOrders(ordersResponse.data.data.CANCELLED);
      setAllOrders((previousState) => {
        return [...previousState, ...ordersResponse.data.data.CANCELLED];
      });
    }
    if (ordersResponse.data.data && ordersResponse.data.data.DELIVERED) {
      setDeliveredOrders(ordersResponse.data.data.DELIVERED);
      setAllOrders((previousState) => {
        return [...previousState, ...ordersResponse.data.data.DELIVERED];
      });
    }

    console.log(orders);
    console.log("NEW", newOrders);
  };

  return (
    <div>
      <SideNavBar id={4} />

      <div className="merchange-content ">
        <Header title={title} />
        <div className="rounded">
          <div className="px-2   ">
            <div className="profile-tabs rounded shadow bg-white">
              <ul className="nav">
                <li className="nav-item" onClick={() => toggle(1)}>
                  <a
                    className={
                      activeTab === 1 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    <div className="text-center">
                      {<br></br>}
                    </div>

                    <div style={{
                      width: '100px',
                      height: '40px',
                      backgroundColor: '#6456d9',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px'
                    }}>{t('new')} ({newOrders.length})</div>
                  </a>
                </li>
                <li className="nav-item" onClick={() => toggle(2)}>
                  <a
                    className={
                      activeTab === 2 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    
                    <div className="text-center">
                      {<br></br>}
                    </div>
                    <div style={{
                      width: '100px',
                      height: '40px',
                      backgroundColor: '#457b9d',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px'
                    }}>
                      
                      {t('All')} ({allOrders.length})
                    </div>
                    
                  </a>
                </li>
                <li className="nav-item" onClick={() => toggle(3)}>
                  <a
                    className={
                      activeTab === 3 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    <div className="text-center">
                      {<br></br>}
                    </div>
                    <div style={{
                      width: '170px',
                      height: '40px',
                      backgroundColor: '#ffb304',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px',
                    }}>
                      
                      Preparing ({preparingOrders.length})
                    </div>
                  </a>
                </li>
                <li className="nav-item" onClick={() => toggle(4)}>
                  <a
                    className={
                      activeTab === 4 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    <div className="text-center">
                      {<br></br>}
                    </div>
                    
                    <div style={{
                      width: '120px',
                      height: '40px',
                      backgroundColor: '#48c837',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px'
                    }}>
                      
                      Ready ({readyOrders.length})
                    </div>
                  </a>
                </li>
                <li className="nav-item" onClick={() => toggle(5)}>
                  <a
                    className={
                      activeTab === 5 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    <div className="text-center">
                      {<br></br>}
                    </div>
                    
                    <div style={{
                      width: '170px',
                      height: '40px',
                      backgroundColor: '#ff5c4d',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px'
                    }}>
                      
                      {t('cancelled')} ({cancelledOrders.length})
                    </div>
                  </a>
                </li>
                <li className="nav-item" onClick={() => toggle(6)}>
                  <a
                    className={
                      activeTab === 6 ? "tab-nav-link active" : "tab-nav-link"
                    }
                  >
                    <div className="text-center">
                      {<br></br>}
                    </div>
                    
                    <div style={{
                      width: '170px',
                      height: '40px',
                      backgroundColor: '#62c8cf',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      borderRadius: '6px'
                    }}>
                      
                      {t('delivered')} ({deliveredOrders.length})
                    </div>
                  </a>
                </li>
              </ul>
              <div
                className={
                  activeTab === 1
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status="New"
                    orders={newOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
              <div
                className={
                  activeTab === 2
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status="All"
                    orders={allOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
              <div
                className={
                  activeTab === 3
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status={"Preparing"}
                    orders={preparingOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
              <div
                className={
                  activeTab === 4
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status={"Ready"}
                    orders={readyOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
              <div
                className={
                  activeTab === 5
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status={"Cancelled"}
                    orders={cancelledOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
              <div
                className={
                  activeTab === 6
                    ? "active-tab-content profile-tabs"
                    : "inactive profile-tabs"
                }
              >
                <div className="p-2">
                  <OrdersHome
                    status={"Delivered"}
                    orders={deliveredOrders}
                    refreshOrders={ordersRefresh}
                    newOrderNotificationCount={newOrderNotificationCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Orders;

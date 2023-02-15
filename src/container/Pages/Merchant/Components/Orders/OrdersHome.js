import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import downarrow from "../../../../../assets/icons/downarrow.png";
import SendOTP from "./SendOTP";
import OrderDetailsbyId from "./OrderDetailsbyId";
import downarrowwhite from "../../../../../assets/icons/down-arrow-white.png";
import rightarrow from "../../../../../assets/icons/right-arrow.png";
import printer from "../../../../../assets/icons/printer.png";
import back from "../../../../../assets/icons/back.png";
import { callApi, getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
 

const OrdersHome = (props) => {
  const [showOTP, setShowOTP] = useState(false);
  const [showOTPresend, setShowOTPResend] = useState(false);
  const [menu, setMenu] = useState(false);
  const [orderview, setOrderview] = useState(false);
  const [viewingOrder, setViewingOrder] = useState({})
  const [otpVerified, setOTPVerified] = useState(false);
  const currentFSId = useSelector(state => state.merchant.currentFoodstallDetail.foodStallId)
  const [customerPhoneNumber, setCustPhoneNumber] = useState('');

  let newOrderCount = 0;

  let inputOrders = props.orders;
  const status = props.status;
  console.log(status)
  console.log(inputOrders)

  const handleViewingOrderOtpVerificationFlag = async (flag) => {
    setOTPVerified(flag);
    setShowOTP(false);
    await callApi('/api/merchant/orders/update-status?orderId=' + otpVerifyingOrder.orderId + "&status=OTP_VERIFIED", 'PUT');
    props.refreshOrders();
  }

  const [orderNotifications, setOrderNotifications] = useState([]);
  const [otpVerifyingOrder, setOTPVerifyingOrder] = useState({});

  useEffect(() => {

  }, [])


  const toggle = (props) => {
    setMenu(!menu);
  };
  const handleClose = () => {
    setShowOTP((showOTP) => !showOTP);
    setOTPVerifyingOrder({});
  };
  const handleShowOTP = (a) => {
    console.log('Send OTP', a)
    setCustPhoneNumber(a.customerPhoneNumber);
    setShowOTP((showOTP) => !showOTP);
    setOTPVerifyingOrder(a);
  };
  const handleShowOTPresend = (a) => {
    setShowOTPResend((showOTPresend) => !showOTPresend);
  };
  const otp = () => { };

  const viewOrder = (order) => {
    setOrderview(!orderview)
    console.log(order);
    setViewingOrder(order);
  }

  const refreshOrders = () => {
    setOrderview(!orderview)
    setViewingOrder({});
    props.refreshOrders();
  }

  const updateOrderStatus = async (orderId, status) => {
    console.log(status)
    const apiResponse = await getData('/api/merchant/orders/update-status?orderId=' + orderId + "&status=" + status, 'PUT');
    console.log(apiResponse);
    props.refreshOrders();
  }

  /* Print code starts*/
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {

    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current;
    }
  });
  // const handlePrint = useReactToPrint({
  //   content: reactToPrintContent,
  //   documentTitle: "AwesomeFileName",
  //   onBeforeGetContent: handleOnBeforeGetContent,
  //   onBeforePrint: handleBeforePrint,
  //   onAfterPrint: handleAfterPrint,
  //   removeAfterPrint: true
  // });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);
  /*ends*/

  return (
    <>
      <div className="tab-content rounded">
        <div className="bg-danger p-2 text-light text-center rounded font-weight-bold boderdotteddark">
          You have {props.newOrderNotificationCount} new Orders <img src={rightarrow} width="20"></img>
        </div>
        <div style={{
          width: '100%',
          textAlign: 'center'
        }}>
          {props.newOrderNotificationCount > 0 && (
            <button className="btn btn-danger" style={{
              width: '200px',
              color: 'white'
            }} onClick={() => props.refreshOrders()}>Load New orders</button>
          )}
        </div>

        <div id="orderlist" className={orderview ? "d-none" : ""}>
          {inputOrders && inputOrders.map((order, index) => (
            <>

              <div className="border rounded mt-2 lightgray">
                <div className={order.status === "NEW" ? "order-status-violet" : order.status === "START_PREPARING" ? "order-status-orange" : order.status === "CANCELLED" ? "order-status-red" : order.status === "READY" ? "order-status-green" : order.status === 'DELIVERED' ? 'order-status-delivered': "rounded"}>
                  <div className="d-flex justify-content-between align-items-center text-dark ">
                    <div className=" d-flex p-2">
                      <div className="px-2">
                        <span className="font-weight-bold">Order No:</span>
                        <span>{order.orderNumber}</span>
                      </div>
                      <div className="px-2">
                        <span className="font-weight-bold">Order ID:</span> <span>{order.orderId}</span>
                      </div>
                      <div className="px-2">
                        Customer Phone: <span className="font-weight-bold">{order.customerPhoneNumber}</span>
                      </div>
                      <div className="px-2">
                        Order Time: <span className="font-weight-bold">{order.orderedTime}</span>
                      </div>
                      <div className="px-2">
                        {
                          order.selfPickup ? 'Screen/Seat/Table #: Self Pickup' : (
                            <>
                              Screen: {order.screen} {" & "} Seat: {order.seatNumber}
                            </>
                          )
                        }

                      </div>
                    </div>
                    <div className="d-flex align-items-center">

                      {order.status === 'READY' && !order.isOtpVerified && (
                        <div className="mx-1">

                          <button className="btn btn-success"
                            style={{
                              width: '100px',
                              color: 'white'
                            }}
                            onClick={(e) => handleShowOTP(order)}>
                            Enter OTP
                          </button>

                        </div>)}
                      <div className="mx-1">
                        {
                          order.status === 'START_PREPARING' && (
                            <button type="button" className="px-4 border rounded p-1 t4fbutton-sm"
                              onClick={() => updateOrderStatus(order.orderId, 'READY')}>
                              Ready
                            </button>)
                        }
                        {
                          order.status === 'NEW' && (<button type="button" className="px-4 border rounded p-1 t4fbutton-sm"
                            onClick={() => updateOrderStatus(order.orderId, 'START_PREPARING')}>
                            Prepare
                          </button>)
                        }
                        {
                          order.status === 'READY' && order.isOtpVerified && (<button type="button" className="px-4 border rounded p-1 t4fbutton-sm"
                            onClick={() => updateOrderStatus(order.orderId, 'DELIVERED')}>
                            Delivered
                          </button>)
                        }


                      </div>
                    </div>
                  </div>
                  <div className="borderbottomdotted"></div>

                  <div className="p-3 ">
                    <div className="bg-white p-2 d-flex">
                      <div className="mx-2">
                        <button type="button" className="t4fbutton-dgreen text-light"
                          onClick={
                            () => viewOrder(order)
                          }
                        >
                          <img src={downarrowwhite} height="7"></img>
                        </button>
                      </div>
                      <div className="w-100">
                        {order.orderedItems && order.orderedItems.map((item) => (
                          <div className="d-flex justify-content-between pb-1">
                            <div className="text-head-teal-bold">
                              <span>{item.quantity}</span> <span> x </span> {item.itemName}
                            </div>
                            <div className="text-dark font-weight-bold">
                              <span>Rs {item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between text-dark">
                    <div className="p-2">
                      Total Items: <span>{order.totalItems}</span>
                    </div>

                    <div className="d-flex">
                      {status === 'NEW' && (<div className="p-2">Customer is arriving shortly</div>)}
                      <div className="p-2">
                        Total Amount:
                        <span className="font-weight-bold">Rs {order.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div id="orderdetailsbyid" className={!orderview ? "d-none" : ""}>
          <div className="mt-2 d-flex justify-content-between">
            <button type="button" className="bg-white  text-small p-1 px-3 border" onClick={(e) => setOrderview((orderview) => !orderview)}>
              <img src={back} className="" alt="back" height="14" />
            </button>
            <button type="button" className="bg-white  text-small p-1 px-3 border" onClick={(e) => {
              e.preventDefault();
              handlePrint()
            }}>
              <img src={printer} className="px-1" alt="print" height="14" /> Print
              <div style={{ display: "none" }} >
                {/* <PrintBill viewingOrder={viewingOrder} refreshOrders={refreshOrders}
                  ref={componentRef}
                ></PrintBill> */}

              </div>
            </button>
          </div>
          <div className="border mt-2 rounded">
            <OrderDetailsbyId viewingOrder={viewingOrder} refreshOrders={refreshOrders} ref={componentRef}></OrderDetailsbyId>
          </div>
        </div>
      </div>
      {/* Modal pop */}
      <Modal show={showOTP} onEscapeKeyDown className="fadepop" onHide={handleClose} centered animation={false}>
        <Modal.Body>
          <SendOTP type={"sendotp"} module="merchant" phone={customerPhoneNumber} handleViewingOrderOtpVerificationFlag={handleViewingOrderOtpVerificationFlag} />
        </Modal.Body>
      </Modal>
      <Modal show={showOTPresend} className="fadepop" onHide={handleShowOTPresend} centered animation={false}>
        <Modal.Body>
          <SendOTP type={"resendotp"} module="merchant" phone={customerPhoneNumber} handleViewingOrderOtpVerificationFlag={handleViewingOrderOtpVerificationFlag} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrdersHome;

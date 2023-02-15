import React, { useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import backarrow from "../../../assets/icons/back-arrow.png";
import kfc from "../../../assets/icons/kfc.png";
import repeatorder from "../../../assets/icons/repeatorder.png";
import config from "../../../container/app/navigation.json";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
const OrderDetails = [
  {
    orderid: 4326,
    orderdate: "15/05/2021, 02:00 PM",
    mallname: "Sarath City mall",
    mallfood_court_name: "Food Court 1",
    shopname: "KFC",
    shopimage: kfc,
    itemno: 1,
    itemname: "Chicken",
    price: "₹.20",
    quantity: 1,
    amount: "₹.200",
    tax: "5%",
    total_roundoff: "₹.210",
    grand_total: "₹.210",
    orderstatus: "order-status-green",
  },
];

const Customer_OrderDetails = () => {
  let x = 1;
  const history = useHistory();
  const orderDetails = JSON.parse(localStorage.getItem("currentOrderDetails"));
  const activeFC = useSelector((state) => state.customer.activeFC);
  console.log(activeFC)
  const fcName = useSelector((state) => state.customer.activeFC.foodCourtName);
  const message = "Shop list";
  const handleSubmit = () => { };

  const [cancelOrder, setCancelOrder] = useState(false);

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
              {activeFC.buName}
            </div>
            <div className="mobile_header_gray p-2">
              <span>
                <a href={config.customerurl.Customer_MyAccount}>
                  <img src={backarrow} height="10" />
                </a>
                <b> Order Details</b>
              </span>
            </div>
            {/* {OrderDetails.map((order) => ( */}
            <div>
              <div className="mobile_header_lightgray p-2 px-3">
                <div>
                  {/* <span>{orderDetails.foodStallName}</span>/ */}
                  <span>{fcName}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {orderDetails.foodStallName}
                  </div>
                  <div>
                    {
                      orderDetails.status.toUpperCase() == "READY" ?
                        <>

                          <p style={{
                            margin: "0 0 0 0"
                          }}>OTP : {orderDetails.otp ? orderDetails.otp : 1234}</p>
                          <a
                            className="status-color-orange px-1"
                          >
                            {orderDetails.status.toUpperCase()}
                          </a>


                        </>
                        :
                        <>
                          <a
                            className={
                              orderDetails.status == "DELIVERED"
                                ? "status-color-green px-1"
                                : orderDetails.status == "CANCELLED"
                                  ? "status-color-red px-1"
                                  : "status-color-orange px-1"
                            }
                          >
                            {orderDetails.status == "NEW"
                              ? "Order Placed"
                              : orderDetails.status == "START_PREPARING"
                                ? "Preparing"
                                : orderDetails.status}
                          </a>
                        </>
                    }

                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Order ID :{" "}
                    <span>
                      <b>{orderDetails.orderId}</b>
                    </span>
                  </div>
                  <div>
                    {orderDetails.orderedTime || new Date().toLocaleString() + ""}
                  </div>
                </div>
                {
                  !orderDetails.selfPickup && orderDetails.screen && (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        Screen Number :{" "}
                        <span>
                          <b>{orderDetails.screen}</b>
                        </span>
                      </div>

                      <div>
                        Seat Number :{" "}
                        <span>
                          <b>{orderDetails.seatNumber}</b>
                        </span>
                      </div>

                    </div>
                  )
                }

              </div>
              <div id="customer_orders">
                {/* Orders */}
                <Row>
                  <Col lg={12}>
                    <div className="d-flex justify-content-between bottom-border p-2 font-weight-bold">
                      <div className="w-20">#</div>
                      <div className="w-25">Item Name</div>
                      <div className="w-20">Qty</div>
                      <div className="w-20">Price</div>
                      <div className="w-20">Amount</div>
                    </div>
                    {orderDetails.orderedItems.map((item, index) => (
                      <>
                        <div className="d-flex justify-content-between cus_home_orderdetails">
                          <div className="w-20 p-2  ">{index + 1}</div>
                          <div className="w-25 p-2  ">{item.itemName}</div>
                          <div className="w-20 p-2 ">{item.quantity}</div>
                          <div className="w-20 p-2 ">
                            {config.keys.rupee}
                            {item.price}
                          </div>
                          <div className="w-20 p-2 ">
                            {config.keys.rupee} {item.price}
                          </div>
                        </div>
                      </>
                    ))}
                    <div className="d-flex justify-content-between cus_home_orderdetails ">
                      <div className="w-20 p-2  "></div>
                      <div className="w-25 p-2 text-nowrap ">Sub Total</div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 ">
                        {config.keys.rupee}{" "}
                        {
                          orderDetails.subTotal
                        }
                      </div>
                    </div>

                    <div className="d-flex justify-content-between cus_home_orderdetails">
                      <div className="w-20 p-2  "></div>
                      <div className="w-25 p-2  text-nowrap">Tax@{orderDetails.tax}%</div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 ">
                        {config.keys.rupee}{" "}
                        {/* {(orderDetails.totalAmount -Math.round(
                          orderDetails.totalAmount -
                            (orderDetails.totalAmount * 0.05)
                        )).toFixed(2)} */}
                        {
                          (orderDetails.taxAmount).toFixed(2)
                        }
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cus_home_orderdetails ">
                      <div className="w-20 p-2  "></div>
                      <div className="w-25 p-2 text-nowrap ">
                        Total (Round off)
                      </div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 ">
                        {config.keys.rupee}{" "}
                        {Math.round(orderDetails.totalAmount)}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cus_home_orderdetails ">
                      <div className="w-20 p-2  "></div>
                      <div className="w-25 p-2 text-nowrap ">
                        <b>Grand Total</b>
                      </div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 "></div>
                      <div className="w-20 p-2 ">
                        <b>
                          {config.keys.rupee}{" "}
                          {orderDetails.totalAmount}
                        </b>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            {/* // ))} */}
            {/* <div className="p-2">
              <b>Refund Processed/Thanks for the order</b>
              <p>Sub Message, Refund Message.</p>
            </div> */}
            <div className="d-flex justify-content-between align-items-center p-2 px-3">
              <div>
                <a
                  href={config.customerurl.Customer_FeedbackReview}
                  className="feedback-status-color px-1"
                >
                  Feedback/Review
                </a>
              </div>
              {
                orderDetails.status === 'NEW' && (
                  <div>
                    <a
                      href="#cancelOrder"
                      className="status-color-red px-1"
                      onClick={() => setCancelOrder(true)}
                    >
                      Cancel Order
                    </a>
                  </div>
                )
              }

              <div>
                <a
                  href={config.customerurl.Customer_Report}
                  className="status-color-red px-1"
                >
                  Report
                </a>
              </div>
            </div>

            <Modal show={cancelOrder} onEscapeKeyDown className="fadepop" onHide={() => setCancelOrder(false)} centered animation={false}>
              <Modal.Body>
                Please visit the stall counter to cancel your order.
              </Modal.Body>
            </Modal>

            {/* <div className="mt-2 p-3 text-center">
              <button
                color="primary"
               
                className="t4fbutton-dark w-100 text-large"
                type="submit"
              >
                <img src={repeatorder} height="20" /> Repead Order
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Customer_OrderDetails;

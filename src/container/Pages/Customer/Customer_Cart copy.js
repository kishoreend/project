import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import ReactStars from "react-rating-stars-component";
//import Slider from "infinite-react-carousel";
import {
  AvForm,
  FormGroup,
  AvField,
  Col,
  Row,
} from "availity-reactstrap-validation";
import OtpInput from "react-otp-input";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import search_dark from "../../../assets/icons/search_dark.png";
import kfc from "../../../assets/icons/kfc.png";
import inorbit from "../../../assets/icons/inorbit.png";
import greater_arrow from "../../../assets/icons/greater_arrow.png";
import rectangle from "../../../assets/icons/Rectangle.png";
import clock from "../../../assets/icons/clock.png";
import slider1 from "../../../assets/icons/slider1.png";
import slider2 from "../../../assets/icons/slider2.png";
import slider3 from "../../../assets/icons/slider3.png";
import spoon_menu from "../../../assets/icons/spoon_menu.png";
import Loading from "../../../components/Common/Loading";
import darkclose from "../../../assets/icons/darkclose.png";
import burger from "../../../assets/icons/burger.png";
import foodmenu from "../../../assets/icons/no-image.jpg";
import veg from "../../../assets/icons/veg.png";
import carticon from "../../../assets/icons/cart.png";
import nonveg from "../../../assets/icons/nonveg.png";
import bin from "../../../assets/icons/bin.png";
import config from "../../../container/app/navigation.json";
import Slider from "./Component/Slider";
import Customer_MenuDetails from "./Component/Customer_MenuDetails";
import {
  postData,
  getData,
  reduxGetData,
  reduxPostData,
  callApi,
} from "../../../ServiceCall";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import * as REDUX_ACTION from "../../../store/customer/action";
import { Button } from "reactstrap";
import { Customer_ScreenData } from "./Customer_ScreenData";
import Customer_Suggestion from "./Customer_Suggestion";

import useRazorpay from "react-razorpay";
import SockJS from "sockjs-client";
import { over } from 'stompjs';
import Alert from "../../../components/Common/Alert";
import SuccessfulPayment from "./Component/SuccessfulPayment";
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var stompClient = null;

let menus = [];

const queryString = window.location.search.substring(1);
// const fs_id = parseInt(queryString.substring(queryString.indexOf("=") + 1));
// console.log("fs_id", fs_id);
const Customer_Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [menu, setMenu] = React.useState(false);
  const [menuShow, setMenuShow] = React.useState(false);
  const [foodstallMenu, setFoodstallMenu] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [fooditemid, setFooditemid] = useState(0);
  const [fooditemname, setFooditemname] = useState(0);
  const [fooditemprice, setFooditemprice] = useState(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  const [activeFoodStall, setActiveFoodstall] = useState({});
  const [localStorageCart, setlocalStorageCart] = useState(
    JSON.parse(localStorage.getItem("t4fcart"))
  );
  const dispatch = useDispatch();
  const [foodStallWiseItems, setFoodStallWiseItems] = useState([]);
  //const [localStorageCart, setlocalStorageCart] = useState([]);
  const userData = useSelector((state) => state.customer);
  console.log('userData', userData)
  const activeFC = useSelector((state) => state.customer.activeFC);
  const foodStalls = useSelector((store) => store.customer.foodStalls);
  const handleClose = () => {
    setMenuShow((menuShow) => !menuShow);
  };
  const handleChange = () => { };
  const cartItems = useSelector((store) => store.customer.cartItems);
  const phoneNumber = useSelector((state) => state.customer.user.phoneNumber);
  const [placedOrder, setOrderPlacedFlag] = useState(false);

  const [paymentResponse, setPaymentResponse] = useState({});
  const [customerApiData, setCustomerApiData] = useState({});

  const [screenData, setScreenData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentStatusApiCall, setPaymentStatusApiCall] = useState(false);

  console.log('cartItems', cartItems);
  const handleSubmit = () => { };
  //var localStorageCart = JSON.parse(localStorage.getItem("t4fcart"));
  const taxprice =
    localStorageCart?.reduce(
      (a, v) =>
      (a =
        a + v.offerId
          ? v.foodItemTotalPrice
          : v.foodItemPrice * v.foodItemQuantity),
      0
    ) * config.keys.taxpercentage;

  let foodstallWiseItems_temp = [];

  const Razorpay = useRazorpay();

  const getCustomerDetails = async () => {
    const resp = await getData(
      '/api/customer/get-userdata?phoneNumber=' + userData.user.phoneNumber
    );

    setCustomerApiData(resp.data.data);
    console.log(customerApiData);
  };

  const handleTheatreScreenData = (data) => {
    console.log('ScreenData', data);
    setScreenData(data);
  }


  useEffect(() => {

    dispatch(REDUX_ACTION.setActiveMenuItem('cart'));

    console.log("foodStalls, activeFoodStall", foodStalls, activeFoodStall);
    getCustomerDetails();
    console.log("localStoragecart", localStorageCart);
    for (let i = 0; i < foodStalls.length; i++) {
      let temp = {
        foodStallId: foodStalls[i].shop_id,
        foodStallName: foodStalls[i].shop_name,
        items: [],
        tax: foodStalls[i].tax
      };

      foodstallWiseItems_temp.push(temp);
    }
    console.log("foodstallWiseItems_temp", foodstallWiseItems_temp);
    console.log('cartItems', cartItems)

    for (let i = 0; i < cartItems.length; i++) {
      const fsId = cartItems[i].foodStallId;

      const customizationItems =
        !cartItems[i].customizations.length > 0
          ? []
          : cartItems[i].customizations.map((custItem) => {
            const item = custItem.item;
            let modifiedItem = "";
            if (Array.isArray(item)) {
              for (let k = 0; k < item.length; k++) {
                if (k === item.length - 1) modifiedItem += item[k];
                else modifiedItem += item[k] + "###";
              }
            } else {
              modifiedItem = item;
            }

            return {
              ...custItem,
              item: modifiedItem,
            };
          });

      console.log(customizationItems);
      console.log(cartItems[i]);

      cartItems[i].customizations = customizationItems;

      console.log('foodstallWiseItems_temp, i', i, foodstallWiseItems_temp);

      for (let j = 0; j < foodstallWiseItems_temp.length; j++) {
        console.log('foodstallWiseItems_temp[j]', fsId, foodstallWiseItems_temp[j])
        if (parseInt(fsId) === parseInt(foodstallWiseItems_temp[j].foodStallId)) {
          let existingCartItems = [...foodstallWiseItems_temp[j].items];
          existingCartItems.push(cartItems[i]);
          console.log('existingCartItems', existingCartItems)

          setSubTotal(
            subTotal + cartItems[i].offerId
              ? cartItems[i].foodItemTotalPrice
              : cartItems[i].foodItemPrice * cartItems[i].foodItemQuantity
          );
          const fsWiseNewData = {

          }
          foodstallWiseItems_temp[j] = {
            ...foodstallWiseItems_temp[j],
            items: existingCartItems,
          };

          break;
        }

        // if(cartItems[i].foodStallId==foodStallWiseItems[j].id){
        //   let items=foodStallWiseItems
        //   items[j].items.push(cartItems[i])
        //   setFoodStallWiseItems(items)

        // }
      }
    }
    // console.log('foodstallWiseItems_temp', foodstallWiseItems_temp)
    setFoodStallWiseItems(foodstallWiseItems_temp);

    //getFoodStalls();

    connect();
  }, [cartItems]);
  const getSubtotal = (items) => {
    console.log('getSubtotal', items);
    let subTotalTemp = 0;
    for (let i = 0; i < items.length; i++) {
      subTotalTemp += items[i].isOffer
        ? items[i].foodItemTotalPrice
        : items[i].foodItemPrice * items[i].foodItemQuantity;
    }
    return subTotalTemp;
  };
  const clearCart = () => {
    localStorage.removeItem("t4fcart");
  };
  const keys = Object.keys(foodstallMenu);
  console.log("KEYS :: ", keys);
  menus = keys.map((key) => {
    return {
      menu: key,
      count: foodstallMenu[key].length,
    };
  });

  console.log(menus);

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
      "/user/" + phoneNumber + "/private",
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
  };

  const onError = (err) => {
    console.log(err);
  };

  const sendValue = (foodStallId) => {
    if (stompClient) {
      var message = {
        sender: phoneNumber,
        message: "Order is recieved from " + phoneNumber,
        status: "MESSAGE",
        reciever: foodStallId
      };
      console.log(message);
      stompClient.send("/app/private-notification", {}, JSON.stringify(message));
      // setUserData({...userData,"message": ""});
    }
  }

  const allItems = Object.keys(foodstallMenu).map((key, index) => {
    if (key != "veg" && key != "egg") {
      return (
        <div class="accordion-item">
          <h2 class="accordion-header" id={"heading" + index}>
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + index}
              aria-expanded="true"
              aria-controls={"collapse" + index}
            >
              {key}
            </button>
          </h2>
          <div
            id={"collapse" + index}
            class="accordion-collapse collapse"
            aria-labelledby={"heading" + index}
            data-bs-parent="#accordionExample"
          >
            {foodstallMenu[key].map((menuItem) => {
              return (
                <div class="accordion-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span>
                        <a href="#">
                          <img
                            src={
                              menuItem.pic != null &&
                                menuItem.pic[0].data != null
                                ? `data:image/jpeg;base64,${menuItem.pic[0].data}`
                                : foodmenu
                            }
                            className="foodimage"
                            height="80"
                          />
                        </a>
                      </span>
                    </div>
                    <div className="flex-grow-1 px-3">
                      <div>
                        <span className="text-wrap">
                          <Link className="decoration-none">
                            <b> {menuItem.foodItemName}</b>
                          </Link>
                        </span>
                        <span className="bestseller text-small text-nowrap">
                          Best Seller
                        </span>
                      </div>
                      <div className="d-flex">
                        <div>
                          <ReactStars
                            count={5}
                            //onChange={ratingChanged}
                            value={4}
                            size={14}
                            activeColor="#ffd700"
                          ></ReactStars>
                        </div>
                        <div className="px-1">(23)</div>
                      </div>
                      <div className="font-weight-bold">
                        ₹ {menuItem?.price || 0.0}
                      </div>
                    </div>
                    <div className="align-items-end">
                      <div>
                        <button
                          className="borderbtn text-nowrap"
                          to="#"
                          onClick={(e) =>
                            menuItem.availableCustomisation
                              ? (setMenuShow((menuShow) => !menuShow),
                                setFooditemid(menuItem.foodItemId),
                                setFooditemname(menuItem.foodItemName),
                                setFooditemprice(menuItem?.price || 100))
                              : ""
                          }
                        >
                          + Add
                        </button>{" "}
                      </div>
                      <div>
                        {menuItem.availableCustomisation ? (
                          <span className="text-red">customizable</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  const getCategoryItems = (category) => { };

  const updateQuantity = (fid, price, quantity, foodItem, isOffer) => {
    
    console.log(foodItem, cartItems);

    const _localStorageCartItems = JSON.parse(localStorage.getItem("t4fcart"));

    console.log("local_storage cart", localStorage.getItem("t4fcart"))

    let index = _localStorageCartItems.findIndex((fs) => fs.foodItemId == fid); //finding index of the item
    let newArray = [];

    for (let i = 0; i < _localStorageCartItems.length; i++) {

      const _cartItem = _localStorageCartItems[i];
      const _customizations = _cartItem.customizations ? _cartItem.customizations : [];

      if (_cartItem.foodItemId === fid && _.isEqual(foodItem.customizations, _customizations)) {
        if (quantity > 0) {
          _cartItem.foodItemQuantity = quantity;
          _cartItem.foodItemTotalPrice = quantity * price;

          newArray.push(_cartItem);
        }
      } else {
        newArray.push(_cartItem);
      }
    }

    console.log("localStorageCart quantity", newArray);

    setlocalStorageCart(newArray);
    localStorage.clear("t4fcart");
    localStorage.setItem("t4fcart", JSON.stringify(newArray));
    dispatch(REDUX_ACTION.resetCart(newArray));
  };

  const placeOrder = (foodStallId) => {
    let cartItemsToPlaceOrder = [];

    const isTheater = activeFC.buType === "THEATRE" ? true : false;

    console.log(screenData);

    if (!screenData.selfPickup) {
      if (screenData.screenNumber === '' && screenData.seatNumber === '') {
        console.log('Delivery required');
        toast.error('Screen Number & Seat Number are mandatory', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else if (screenData.screenNumber === '') {
        console.log('Delivery required');
        toast.error('Screen Number is mandatory', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else if (screenData.seatNumber === '') {
        console.log('Delivery required');
        toast.error('Seat Number is mandatory', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }

    for (let i = 0; i < foodStallWiseItems.length; i++) {
      if (foodStallWiseItems[i].foodStallId === foodStallId) {
        cartItemsToPlaceOrder = foodStallWiseItems[i].items;
        break;
      }
    }

    let tax = 0.05;

    const matchedStalls = foodStalls.filter(f => f.shop_id === foodStallId);

    if (matchedStalls.length > 0) {
      tax = matchedStalls[0].tax;
      tax = tax / 100;
    }

    console.log('TAX', tax);

    const customerData = {
      phoneNumber: phoneNumber,
      email: customerApiData.email,
      fullName: customerApiData.fullName,
    };

    console.log('cartItemsToPlaceOrder', cartItemsToPlaceOrder);

    let cartItemsForRequest = [];
    let subTotal = 0;
    for (let i = 0; i < cartItemsToPlaceOrder.length; i++) {

      const isOffer = cartItemsToPlaceOrder[i].isOffer;

      const itemObject = {
        customizationFlag:
          cartItemsToPlaceOrder[i].customizations.length === 0 ? false : true,
        customizations: [...cartItemsToPlaceOrder[i].customizations],
        offerItems: isOffer ? [...cartItemsToPlaceOrder[i].offerItems] : [],
        finalPrice: isOffer
          ? cartItemsToPlaceOrder[i].foodItemTotalPrice
          : cartItemsToPlaceOrder[i].foodItemPrice *
          cartItemsToPlaceOrder[i].foodItemQuantity,
        foodItemId: cartItemsToPlaceOrder[i].foodItemId,
        itemName: cartItemsToPlaceOrder[i].foodItemName,
        pizza: cartItemsToPlaceOrder[i].isPizza,
        quantity: cartItemsToPlaceOrder[i].foodItemQuantity,
        isOffer: isOffer
      };

      cartItemsForRequest.push(itemObject);

      subTotal += isOffer
        ? cartItemsToPlaceOrder[i].foodItemTotalPrice
        : cartItemsToPlaceOrder[i].foodItemPrice *
        cartItemsToPlaceOrder[i].foodItemQuantity;
    }

    console.log("cartItemsForRequest", cartItemsForRequest);

    // let screenNumber = screenData.screenNumber;
    // let seatNumber = screenData.seatNumber;
    // let selfPickup = screenData.selfPickup;

    const requestBody = {
      customer: { ...customerData },
      cartItems: [...cartItemsForRequest],
      foodStallId: foodStallId,
      grandTotal: subTotal + subTotal * tax,
      subTotalAmount: subTotal,
      taxAmount: subTotal * tax,
      theatre: isTheater,
      screenNumber: screenData.screenNumber,
      seatNumber: screenData.seatNumber,
      selfPickup: screenData.selfPickup,
    };

    // Need to call API here....

    const apiCall = async (reqBody) => {
      const placeOrderResponse = await postData(
        "/api/customer/placeOrder",
        reqBody,
        "customer",
        "POST"
      );

      console.log(placeOrderResponse);

      console.log(foodStallId, cartItems);

      if (placeOrderResponse.status === 200) {
        const razorpayOrderDetails =
          placeOrderResponse.data.data.razorPayOrderDetails;

        console.log("razorpayOrderDetails", razorpayOrderDetails);

        const options = {
          // key: "rzp_test_rMdZ1T7Z6asYXb", // Enter the Key ID generated from the Dashboard
          key: "rzp_live_ozqtNqhs4Il6ST",
          amount: razorpayOrderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Tap4Food",
          description: "Live Transaction",
          image: "https://merchant.tap4food.com/tap4food/images/logo/logo.png",
          // order_id: razorpayOrderDetails.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: async function (response) {
            console.log('Payment Response', response);
            console.log('cartItems', cartItems);
            console.log('foodStallId', foodStallId);

            let cartItemsToReset = cartItems.filter(
              (item) => parseInt(item.foodStallId) !== foodStallId
            );

            console.log(cartItems, cartItemsToReset);

            localStorage.setItem("t4fcart", JSON.stringify(cartItemsToReset));
            dispatch(REDUX_ACTION.resetCart(cartItemsToReset));

            const paymentStatusUpdateReq = {
              orderId: placeOrderResponse.data.data.orderId,
              rzpOrderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
              paymentStatus: 'Completed',
              phoneNumber: customerApiData.phoneNumber
            }

            console.log('paymentStatusUpdateReq', paymentStatusUpdateReq);

            await postData(
              "/api/customer/updatePaymentStatus",
              paymentStatusUpdateReq,
              "customer",
              "PUT"
            ).then(res => {
              setPaymentStatusApiCall(true);
              setPaymentStatus(res.data.data.paymentStatus);
              setPaymentResponse(paymentStatusUpdateReq);
              setOrderPlacedFlag(true);
              sendValue(foodStallId);
            })

            // console.log('paymentStatusUpdateApiResponse', paymentStatusUpdateApiResponse);      

          },
          prefill: {
            name: customerApiData.fullName,
            email: customerApiData.email,
            contact: customerApiData.phoneNumber,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", async function (response) {
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
          const paymentStatusUpdateReq = {
            orderId: placeOrderResponse.data.data.orderId,
            rzpOrderId: response.error.metadata.order_id,
            paymentId: response.error.metadata.payment_id,
            paymentSignature: '',
            paymentStatus: 'Failed'
          }

          console.log('paymentStatusUpdateReq', paymentStatusUpdateReq);

          const paymentStatusUpdateApiResponse = await postData(
            "/api/customer/updatePaymentStatus",
            paymentStatusUpdateReq,
            "customer",
            "PUT"
          );
          alert("Payment is failed. Please try again.");
        });

        rzp1.open();
      }

      /*
      if (placeOrderResponse.status === 200) {
        let cartItemsToReset = cartItems.filter(
          (item) => item.foodStallId !== foodStallId
        );

        console.log(cartItems, cartItemsToReset);

        localStorage.setItem("t4fcart", JSON.stringify(cartItemsToReset));
        dispatch(REDUX_ACTION.resetCart(cartItemsToReset));
      }
      */
    };

    apiCall(requestBody);


  };

  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar active="cart" />
            <div className="mobile_header_white p-1">
              {/* <img src={inorbit} className="headericon" height="30" /> */}
              {activeFC.buName}
            </div>
            <div>
              <button>Back</button>
              {foodStalls[0].shop_name}
            </div>
            <div className="mobile_header_gray">
              <div className="p-2">
                <span>{activeFoodStall.foodCourtName}</span>
                {/* <div id="searchbox" className="input-group mb-1 mt-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img src={search_dark} height="20" />
                    </span>
                  </div>
                  <input
                    id="search"
                    type="text"
                    className="form-control"
                    placeholder="Search Restaurant, Food Items"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div> */}
              </div>
            </div>
            {
              placedOrder && paymentStatusApiCall && paymentStatus === 'Completed' && ((
                <>
                  {/* <Alert message="Your order is placed successfully" type="success"/> */}

                  <SuccessfulPayment {...paymentResponse} />
                </>
              ))
            }

            {/* {JSON.stringify(foodStallWiseItems)} */}

            {!placedOrder && cartItems.length === 0 ? (
              <div
                style={{
                  height: "50px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  marginLeft: "2%",
                  marginRight: "2%",
                  marginTop: "2%",
                  fontSize: "18px",
                  paddingTop: "2%",
                }}
              >
                Cart is empty
              </div>
            ) : (
              foodStallWiseItems.map(
                (item) =>
                  item.items.length > 0 && (
                    <>
                      <div className="mobile_header_white px-3 py-1">
                        <div className="d-flex py-2 align-items-center">
                          {/* <div className="align-items-center">
                            {item.foodStallName}
                            <img
                              className="shopimage"
                              src={activeFoodStall.shop_image}
                              height="30"
                            />
                          </div>
                          <div className="align-items-center px-3">
                            <img src={clock} className="pb-1" height="15" />{" "}
                            <b>{JSON.stringify(activeFoodStall).deliveryTime}</b>
                          </div> */}
                          <div className="align-items-center px-3">
                            <Link
                              className="text-decoration-none tf4_linklabel d-none"
                              onClick={(e) => clearCart()}
                            >
                              {" "}
                              Clear cart
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="px-3">
                        {isLoaded ? (
                          <div className="d-flex justify-content-center">
                            <div className="align-items-center h-100">
                              <Loading size={24} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="border rounded">
                              {/* loop this */}
                              {item.items.map((foodItem) => (
                                <>
                                  {/* {JSON.stringify(foodItem)} */}
                                  <div className="bottomborder ">
                                    <div className="p-3">

                                      {foodItem.isOffer && (
                                        <div className="btn btn-danger btn-sm" style={{
                                          color: 'white',
                                          width: '60px'
                                        }}>
                                          Offer
                                        </div>
                                      )}

                                      <div className="d-flex justify-content-between">

                                        <div className="align-items-center">
                                          <img src={veg} height="14" />
                                          <span className="font-weight-bold">
                                            {" "}
                                            {foodItem.foodItemName}

                                          </span>
                                        </div>
                                        <div
                                          id="quantity"
                                          class="d-flex plus-minus-input"
                                        >
                                          {foodItem.isOffer ? (
                                            <div>
                                              <button
                                                type="button"
                                                class="quantitybtnminus px-2"

                                                onClick={(e) =>
                                                  updateQuantity(
                                                    foodItem.foodItemId,
                                                    foodItem.foodItemPrice,
                                                    0,
                                                    foodItem,
                                                    true
                                                  )
                                                }
                                              >
                                                <img
                                                  src={bin}
                                                  className="pb-1"
                                                  height="17"
                                                />
                                              </button>
                                            </div>
                                          ) : (<>
                                            <div>
                                              <button
                                                type="button"
                                                class="quantitybtnminus px-2"
                                                disabled={
                                                  foodItem.foodItemQuantity > 0
                                                    ? false
                                                    : true
                                                }
                                                onClick={(e) =>
                                                  updateQuantity(
                                                    foodItem.foodItemId,
                                                    foodItem.foodItemPrice,
                                                    foodItem.foodItemQuantity - 1,
                                                    foodItem,
                                                    false
                                                  )
                                                }
                                              >
                                                {foodItem.foodItemQuantity >=
                                                  1 ? (
                                                  <img
                                                    src={bin}
                                                    className="pb-1"
                                                    height="17"
                                                  />
                                                ) : (
                                                  "-"
                                                )}
                                              </button>
                                            </div>
                                            <input
                                              className="text-light borderteal w-50px text-center bg-teal "
                                              disabled
                                              type="text"
                                              value={foodItem.foodItemQuantity}
                                              min="0"
                                              name="quantity"
                                            />
                                            <div>
                                              <button
                                                type="button"
                                                className="quantitybtnplus px-2"
                                                onClick={(e) =>
                                                  updateQuantity(
                                                    foodItem.foodItemId,
                                                    foodItem.foodItemPrice,
                                                    foodItem.foodItemQuantity + 1,
                                                    foodItem
                                                  )
                                                }
                                              >
                                                +
                                              </button>
                                            </div>
                                          </>)}

                                        </div>
                                      </div>
                                      <div>
                                        {foodItem.customizations.map((cust, i) => (
                                          cust.item ? cust.item + (i < foodItem.customizations.length - 1 ? ", " : "") : ""
                                        ))}
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          {foodItem.isOffer ? (
                                            <>
                                              {" "}
                                              Actual Price {
                                                config.keys.rupee
                                              }{" "}
                                              {foodItem.foodItemPrice}
                                            </>
                                          ) : (
                                            <>
                                              {config.keys.rupee}{" "}
                                              {foodItem.foodItemPrice}{" "}
                                            </>
                                          )}
                                        </div>
                                        <div>
                                          {foodItem.isOffer ? (
                                            <>
                                              {" "}
                                              {config.keys.rupee} Offer Price{" "}
                                              {foodItem.foodItemTotalPrice > 0
                                                ? foodItem.foodItemTotalPrice
                                                : "FREE"}{" "}
                                            </>
                                          ) : (
                                            <>
                                              {config.keys.rupee}
                                              {foodItem.foodItemPrice *
                                                foodItem.foodItemQuantity}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      {foodItem.isOffer && (
                                        <div style={{
                                          border: '1px solid gray',
                                          borderRadius: '4px',
                                          minHeight: '100px',
                                          padding: '2%'
                                        }} className="container">

                                          <div className="row">
                                            <div className="col-xs-6 col-sm-6" style={{ width: '50%' }}>
                                              <strong>Item</strong>
                                            </div>
                                            <div className="col-xs-3 col-sm-3" style={{ width: '25%' }}>
                                              <strong>Quantity</strong>
                                            </div>
                                            <div className="col-xs-3 col-sm-3" style={{ width: '25%' }}>
                                              <strong>Price</strong>
                                            </div>
                                          </div>
                                          {foodItem.offerItems.map((offerItem, i) => (
                                            <div className="row">
                                              <div className="col-xs-6" style={{ width: '50%' }}>
                                                {offerItem.itemName} {" "} {offerItem.combination}
                                              </div>
                                              <div className="col-xs-3" style={{ width: '25%' }}>
                                                {offerItem.quantity > 1 ? offerItem.quantity + " Items" : offerItem.quantity + " Item"}
                                              </div>
                                              <div className="col-xs-3" style={{ width: '25%' }}>
                                                {
                                                  offerItem.offerPrice === 0 ? (
                                                    <>
                                                      Free
                                                    </>
                                                  ) : (
                                                    <>
                                                      {config.keys.rupee}{" "}{offerItem.offerPrice}
                                                    </>
                                                  )
                                                }
                                                {
                                                  offerItem.offerPrice != (offerItem.actualPrice * offerItem.quantity) && (
                                                    <>
                                                      {" ("}<strike>{config.keys.rupee}{" "}{offerItem.actualPrice * offerItem.quantity}</strike> {")"}
                                                    </>
                                                  )
                                                }

                                              </div>
                                            </div>
                                          )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* {
                                    !foodItem.isOffer && (
                                      <Customer_Suggestion
                                        foodItemId={foodItem.foodItemId}
                                      />
                                    )
                                  } */}

                                </>
                                // ) : (
                                //   <div className="p-2">No Item in Cart</div>
                                // )}
                                // </div>
                              ))}
                              {
                                <Customer_Suggestion />
                              }
                              {/* total */}
                              {foodStallWiseItems &&
                                foodStallWiseItems.length > 0 && (
                                  <div className="mt-1 border rounded mobile_header_gray">
                                    <div className="p-3">
                                      <div className="d-flex justify-content-between">
                                        <div className="align-items-center">
                                          <span> Sub total:</span>
                                        </div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {getSubtotal(item.items)}
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <div>Tax @ {item.tax}%</div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {((item.tax / 100) * getSubtotal(item.items)).toFixed(2)}
                                        </div>
                                      </div>
                                      <div className="bottomborder my-2"></div>
                                      <div className="d-flex justify-content-between">
                                        <div className="align-items-center">
                                          <span className="font-weight-bold">
                                            {" "}
                                            Grand total
                                          </span>
                                        </div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {((item.tax / 100) * getSubtotal(item.items) +
                                            getSubtotal(item.items)).toFixed(2)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div>
                              {activeFC.buType === "THEATRE" && (
                                <Customer_ScreenData handleTheatreScreenData={handleTheatreScreenData} />
                              )}
                            </div>
                            <div style={{ textAlign: "center", margin: "2%" }}>
                              {" "}
                              <Button
                                onClick={() => placeOrder(item.foodStallId)}
                                style={{
                                  width: "90%",
                                  backgroundColor: "#1d3557",
                                  color: "white",
                                  paddingBottom: "4px !important",
                                  height: "40px",
                                }}
                              >
                                <img
                                  src={carticon}
                                  width={18}
                                  height={18}
                                  style={{
                                    marginBottom: "6px",
                                    marginRight: "2%",
                                  }}
                                />{" "}
                                Place Order
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_Cart;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import ReactStars from "react-rating-stars-component";
import { Modal} from "react-bootstrap";
import Privacy_Policy from "./Privacy_Policy";
//import Modal from '@mui/material/Modal';
//import Dialog from '@mui/material/Dialog';
//import Slider from "infinite-react-carousel";
import { ReactInternetSpeedMeter } from 'react-internet-meter';
//import "../../node_modules/react-internet-meter/dist/index.css";
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
//import Modal from "react-bootstrap/Modal";
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
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import backarrow from "../../../assets/icons/back-arrow.png";
import Profile from "./Profile";
import { SettingsBackupRestoreOutlined, SettingsPowerRounded } from "@mui/icons-material";
import { style } from "@mui/system";

var stompClient = null;

let menus = [];

const queryString = window.location.search;
// const fs_id = parseInt(queryString.substring(queryString.indexOf("=") + 1));
// const parameters = new URLSearchParams(queryString);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

console.log("params", params.status, params.stallId);


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
  const[isOnline,setIsOnline]= useState(navigator.onLine);
  const [activeFoodStall, setActiveFoodstall] = useState({});
  const [localStorageCart, setlocalStorageCart] = useState(
    JSON.parse(localStorage.getItem("t4fcart"))
  );
  const [checkBoxStatus,setcheckBoxStatus] = useState(false)
  const [open,setOpen]=useState(false);
  const [speed, setSpeed] = useState("0.0");
  const [addrow,setAddRow]= useState(false);
  const [about,setAbout]= useState(false);
const[close,setClose]=useState(false);
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
  const [agree, setAgree] = useState(false);

  const [paymentResponse, setPaymentResponse] = useState({});
  const [customerApiData, setCustomerApiData] = useState({});

  const [screenData, setScreenData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentStatusApiCall, setPaymentStatusApiCall] = useState(false);
  const [showErrorMsg,setShowErrorMsg] = useState(false)
  const [foodStallId, setFoodStallId] = useState('')
  console.log('cartItems', cartItems);

   const checkboxHandler =()=>{
   const checkBoxElement = document.getElementById("agree")
   setcheckBoxStatus(checkBoxElement.checked)
   setShowErrorMsg(false)
   }
   const handleAbout =()=>{
    setAbout (true);
   }
   const handleCancel = ()=>{
    setAbout(false);
   }
   
  const handleOpen =()=>{
     setOpen(true);
   }

   const handleDrop = ()=>{
    setOpen(false);
    console.log(open)
   }

   const addLines = ()=>{
    console.log(addrow)
    setAddRow(true)
    

   }
  //  useEffect(()=>{
  //      setOpen(false)
  //   },[3000])
   useEffect(()=>{
     const handleStatusChange = ()=>{
       setIsOnline(navigator.onLine);
       if(isOnline === true){
         toast.error("you lost your connection. please check your internet coonection")
        }
     };

     window.addEventListener('online',handleStatusChange);
     window.addEventListener('offline',handleStatusChange);
 
     return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  
  
  
 }, [isOnline]);





  const btnHandler = () => {
    alert('The buttion is clickable!');
  };
  const handleSubmit = () => { };
  //var localStorageCart = JSON.parse(localStorage.getItem("t4fcart"));
  const taxprice =
    localStorageCart?.reduce(
      (a, v) =>      
      (a =
        a + v.offerId
          ? v.foodItemTotalPrice
          : (v.taxType === 'E' ? v.foodItemPrice * v.foodItemQuantity * config.keys.taxpercentage : 0)),
      0
    );

  const [taxValue, setTaxValue] = useState(2.5);
  const [taxData, setTaxData] = useState({});
  const taxPrices = {};

  let foodstallWiseItems_temp = [];

  // const Razorpay = useRazorpay();

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
    if(params.status && params.status === 'S'){
      const stallId = params.stallId;

      let cartItemsToReset = cartItems.filter(
        (item) => parseInt(item.foodStallId) !== parseInt(stallId)
      );

      console.log(cartItems, cartItemsToReset);

      localStorage.setItem("t4fcart", JSON.stringify(cartItemsToReset));
      dispatch(REDUX_ACTION.resetCart(cartItemsToReset));
  
      history.push(config.customerurl.Customer_Cart);
    }
  }, []); 

  useEffect(() => { 

    dispatch(REDUX_ACTION.setActiveMenuItem('cart'));

    console.log("foodStalls, activeFoodStall", foodStalls, activeFoodStall);
    foodStalls.map(fs => {
      taxData[fs.shop_id] = fs.tax;
    });
    console.log('TaxData', taxData);

    getCustomerDetails();
    console.log("localStoragecart", localStorageCart);
    for (let i = 0; i < foodStalls.length; i++) {
      setFoodStallId(foodStalls[i].shop_id)
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
    console.log('getSubtotal', items, taxValue, taxprice);
    let subTotalTemp = 0;
    let tax = 0;
    for (let i = 0; i < items.length; i++) {
      if(items[i].taxType === 'E'){
        const val = items[i].isOffer
        ? items[i].foodItemTotalPrice
        : items[i].foodItemPrice * items[i].foodItemQuantity;
        
        subTotalTemp += val;

        tax += val * taxData[items[i].foodStallId] / 100;
      }else if(items[i].taxType === 'I'){

        const _price = items[i].foodItemPrice * items[i].foodItemQuantity;
        const taxPart = _price * taxData[items[i].foodStallId] / 100; 

        const val = items[i].isOffer
        ? items[i].foodItemTotalPrice
        : (_price - taxPart);

        subTotalTemp += val;

        tax += val * taxData[items[i].foodStallId] / 100;

      }else {
        subTotalTemp += items[i].isOffer
        ? items[i].foodItemTotalPrice
        : items[i].foodItemPrice * items[i].foodItemQuantity;

        tax += 0;
      }
      
    }
    taxPrices[items[0].foodStallId] = tax;
    console.log('taxPrices', taxPrices)
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
    console.log(foodItem, cartItems, quantity);

    let _localStorageCartItems = JSON.parse(localStorage.getItem("t4fcart"));

    console.log("local_storage cart", _localStorageCartItems)

    let updateCartItem = _localStorageCartItems.filter(x => x.foodItemId == fid);

    console.log('updateCartItem', updateCartItem)

    if (quantity == 0) {
      if (foodItem && foodItem.customizations.length > 0 && foodItem.customizations[0].item != undefined) {
        updateCartItem.map((item, index) => {
          let custItemsVal = item.customizations[0].item;
          if(Array.isArray(item.customizations[0].item)){
            custItemsVal = '';
            item.customizations[0].item.map((i, index) => {
              if(index === item.customizations[0].item.length - 1){
                custItemsVal += i
              }else{
                custItemsVal += i + '###'
              }
              
            })
          }
          if (custItemsVal == foodItem.customizations[0].item) {
            _localStorageCartItems = _localStorageCartItems.filter(x => x != item);
          }
        })
      }
      else {
        updateCartItem.map((item, index) => {
          _localStorageCartItems = _localStorageCartItems.filter(x => x != item);
        })
      }
    }

    else {
      if (foodItem && foodItem.customizations.length > 0 && foodItem.customizations[0].item != undefined) {
        updateCartItem.map((item, i) => {
          let custItemsVal = item.customizations[0].item;
          if(Array.isArray(item.customizations[0].item)){
            custItemsVal = '';
            item.customizations[0].item.map((i, index) => {
              if(index === item.customizations[0].item.length - 1){
                custItemsVal += i
              }else{
                custItemsVal += i + '###'
              }
              
            })
          }
          if (custItemsVal == foodItem.customizations[0].item) {
            item.foodItemQuantity = quantity;
            item.foodItemTotalPrice = quantity * price;
          }
        })
      }
      else {
        updateCartItem.map((item) => {
          item.foodItemQuantity = quantity;
          item.foodItemTotalPrice = quantity * price;
        })
      }
    }

    if (foodItem.isOffer) {
      updateCartItem.map(item => {
        item.offerItems.map(item => {
          if (item.offerPrice > 0) {
            item.quantity = quantity;
            item.offerPrice = quantity * price;
          }
          else
            item.quantity = quantity;
        })
      })
    }

    console.log("localStorageCart quantity", _localStorageCartItems);
    setlocalStorageCart(_localStorageCartItems);
    localStorage.clear("t4fcart");
    localStorage.setItem("t4fcart", JSON.stringify(_localStorageCartItems));
    dispatch(REDUX_ACTION.resetCart(_localStorageCartItems));
  };

  const placeOrder = (foodStallId, sTotal, gTotal, taxAmount) => {
    let cartItemsToPlaceOrder = [];

    console.log(sTotal, gTotal, taxAmount);

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
      grandTotal: gTotal,
      subTotalAmount: sTotal,
      sTaxAmount: taxAmount,
      cTaxAmount: taxAmount,
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

      if(placeOrderResponse.status === 200){
        const paytmData = placeOrderResponse.data.data.paytmReceipt;

        const payTmRequestBody = {
          mobileNumber : customerData.phoneNumber,
          email: customerData.email,
          orderId: placeOrderResponse.data.data.orderId,
          totalAmount: placeOrderResponse.data.data.grandTotal,
          checksum: paytmData.checksum
        }

        console.log('payTmRequestBody', payTmRequestBody);

        // var paytmParams = {};
        // paytmParams["MID"] = "FcMBkw70050182336717";
        // paytmParams["ORDERID"] = placeOrderResponse.data.data.orderId + "";
        // const paytmParams = {
        //   MID: 'FcMBkw70050182336717',
        //   ORDERID: placeOrderResponse.data.data.orderId
        // }

        // const paytmChecksum = generateSignature(paytmParams, 'i6L53XjsAuGweLsZ');
        // paytmChecksum.then(function(checksum){
        //   console.log("generateSignature Returns: " + checksum);
        //   const paytmUrl = `https://securegw-stage.paytm.in/order/process?MID=FcMBkw70050182336717&CHANNEL_ID=WEB&INDUSTRY_TYPE_ID=Retail&CHECKSUMHASH=${checksum}&WEBSITE=WEBSTAGING&CALLBACK_URL=http://localhost/tf/api/customer/payments/pgresponse&&ORDER_ID=${placeOrderResponse.data.data.orderId}&TXN_AMOUNT=${placeOrderResponse.data.data.grandTotal}&CUST_ID=${customerData.phoneNumber}&MOBILE_NO=${customerData.phoneNumber}`;
        //   window.location.replace(paytmUrl);
        // }).catch(function(error){
        //   console.log(error);
        // });

        // console.log(paytmUrl);
        // const paymentUrl = `http://localhost/tf/api/customer/payments/submitPaymentDetail?MOBILE_NO=${customerData.phoneNumber}&EMAIL=${customerData.email}&ORDER_ID=${placeOrderResponse.data.data.orderId}&TXN_AMOUNT=${placeOrderResponse.data.data.grandTotal}`;

        const paymentUrl = `https://api.tap4food.com/tf/api/customer/payments/submitPaymentDetail?MOBILE_NO=${customerData.phoneNumber}&EMAIL=${customerData.email}&ORDER_ID=${placeOrderResponse.data.data.orderId}&TXN_AMOUNT=${placeOrderResponse.data.data.grandTotal}`;

        var form = document.createElement("form");
        form.setAttribute("method", 'POST');
        form.setAttribute("action", paymentUrl);

        document.body.appendChild(form);
        
        form.submit();

        // window.location.replace(paytmUrl);
      }

      // if (placeOrderResponse.status === 201) {
      //   const razorpayOrderDetails =
      //     placeOrderResponse.data.data.razorPayOrderDetails || {};

      //   console.log("razorpayOrderDetails", razorpayOrderDetails);

      //   const options = {
      //     // key: "rzp_test_rMdZ1T7Z6asYXb", // Enter the Key ID generated from the Dashboard
      //     key: "rzp_live_ozqtNqhs4Il6ST",
      //     amount: razorpayOrderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      //     currency: "INR",
      //     name: "Tap4Food",
      //     description: "Live Transaction",
      //     image: "https://merchant.tap4food.com/tap4food/images/logo/logo.png",
      //     // order_id: razorpayOrderDetails.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      //     handler: async function (response) {
      //       console.log('Payment Response', response);
      //       console.log('cartItems', cartItems);
      //       console.log('foodStallId', foodStallId);

      //       let cartItemsToReset = cartItems.filter(
      //         (item) => parseInt(item.foodStallId) !== foodStallId
      //       );

      //       console.log(cartItems, cartItemsToReset);

      //       localStorage.setItem("t4fcart", JSON.stringify(cartItemsToReset));
      //       dispatch(REDUX_ACTION.resetCart(cartItemsToReset));

      //       const paymentStatusUpdateReq = {
      //         orderId: placeOrderResponse.data.data.orderId,
      //         rzpOrderId: response.razorpay_order_id,
      //         paymentId: response.razorpay_payment_id,
      //         paymentSignature: response.razorpay_signature,
      //         paymentStatus: 'Completed',
      //         phoneNumber: customerApiData.phoneNumber
      //       }

      //       console.log('paymentStatusUpdateReq', paymentStatusUpdateReq);

      //       await postData(
      //         "/api/customer/updatePaymentStatus",
      //         paymentStatusUpdateReq,
      //         "customer",
      //         "PUT"
      //       ).then(res => {
      //         setPaymentStatusApiCall(true);
      //         setPaymentStatus(res.data.data.paymentStatus);
      //         setPaymentResponse(paymentStatusUpdateReq);
      //         setOrderPlacedFlag(true);
      //         sendValue(foodStallId);
      //       })

      //       // console.log('paymentStatusUpdateApiResponse', paymentStatusUpdateApiResponse);      

      //     },
      //     prefill: {
      //       name: customerApiData.fullName,
      //       email: customerApiData.email,
      //       contact: customerApiData.phoneNumber,
      //     },
      //     notes: {
      //       address: "Razorpay Corporate Office",
      //     },
      //     theme: {
      //       color: "#3399cc",
      //     },
      //   };

      //   const rzp1 = new Razorpay(options);

      //   rzp1.on("payment.failed", async function (response) {
      //     // alert(response.error.code);
      //     // alert(response.error.description);
      //     // alert(response.error.source);
      //     // alert(response.error.step);
      //     // alert(response.error.reason);
      //     // alert(response.error.metadata.order_id);
      //     // alert(response.error.metadata.payment_id);
      //     const paymentStatusUpdateReq = {
      //       orderId: placeOrderResponse.data.data.orderId,
      //       rzpOrderId: response.error.metadata.order_id,
      //       paymentId: response.error.metadata.payment_id,
      //       paymentSignature: '',
      //       paymentStatus: 'Failed'
      //     }

      //     console.log('paymentStatusUpdateReq', paymentStatusUpdateReq);

      //     const paymentStatusUpdateApiResponse = await postData(
      //       "/api/customer/updatePaymentStatus",
      //       paymentStatusUpdateReq,
      //       "customer",
      //       "PUT"
      //     );
      //     alert("Payment is failed. Please try again.");
      //   });

      //   rzp1.open();
      // }

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

  const activeFSData = useSelector(store => store.customer.activeFs);
  const [selfStallId, setSelfStallId] = useState(0);

  const gotoMenu = (foodStallId) => {
    history.push(config.customerurl.Customer_Menu + "?fs-id=" + foodStallId);
  }


  return (
    <>
    <div style={{}}>
     {isOnline ? (<h1 className="online"></h1>) : (<h1 className="offline" style={{fontSize:"20px",textAlign:"center"}}></h1>)}
    </div>  
       <div>
       {/* <ReactInternetSpeedMeter  
            txtSubHeading="Internet is too slow"
            outputType="alert"
            customClassName={null}
            txtMainHeading="Opps..." 
            pingInterval={4000} // milliseconds 
            thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
            threshold={10}
           // imageUrl="https://res.cloudinary.com/dcwxsms2l/image/upload/v1610376487/pexels-ivan-samkov-6291574_bzqgps.jpg"
            downloadSize="1781287"  //bytes
            callbackFunctionOnNetworkDown={(speed)=>console.log(`Internet speed is down ${speed}`)}
            callbackFunctionOnNetworkTest={(speed)=>setSpeed(speed)}
          />
          {/* <h2 style={{textalign:"center",fontSize:"10px", marginLeft:"100vh"}}>Download Size: {1781287 * 0.000001} mb</h2>
          <h2 style={{textalign:"center",fontSize:"10px",marginLeft:"100vh"}}>Ping Interval: 4000 ms</h2>
          <h2 style={{textalign:"center",fontSize:"10px",marginLeft:"100vh"}}>Internet Speed {speed} mb</h2>
          <h4 style={{textalign:"center",fontSize:"10px",marginLeft:"100vh"}}>
          <strong>Image being Downloaded : </strong>
          <u>
            https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg?cs=srgb&dl=pexels-josiah-farrow-3396664.jpg&fm=jpg
          </u>
          </h4> */}
        </div>   
   
      <div className="mobile_wrapper_cart justify-content-center">
        <div className="row mobilecontainer ">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar active="cart" />
            <Profile />
            {/* </div> */}




            <div className="mobile_header_gray">
              <div className="p-2">
                <span>{activeFoodStall.foodCourtName}</span>

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
                              {
                                <div className="d-flex p-3 bg-light justify-content-between">
                                  <div className="backarrow" onClick={() => gotoMenu(item.foodStallId)}>
                                    <img src={backarrow} height="15" width="15" />
                                  </div>
                                  <div className="resname">
                                    <text style={{
                                      fontSize: "18px"
                                    }}>{item.foodStallName}</text></div>
                                  <div className="namelast"></div>
                                </div>
                              }
                              {item.items.map((foodItem) => {
                                if (isNaN(foodItem.foodItemQuantity)) {
                                  foodItem.foodItemQuantity = 1;
                                }
                                return (
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

                                        <div className="d-flex justify-content-between pt-2">

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
                                            {/* {foodItem.isOffer ? (
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
                                            ) :
                                              (
                                                <>
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
                                                      {foodItem.foodItemQuantity ==
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
                                                </>
                                              )
                                            } */}
                                            <>
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
                                                  {foodItem.foodItemQuantity ==
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
                                            </>
                                          </div>
                                        </div>
                                        <div>
                                          {/* {JSON.stringify(foodItem)} */}
                                          {foodItem.customizations.map((cust, i) => {
                                            return (
                                             <>{ cust.item ? cust.key + ' : ' + cust.item.replaceAll("###", ', ') + "\n" : "" }<br/></>
                                            )
                                            })}
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
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
                                                {foodItem.taxType === 'I' && ('(Inclusive Tax)')}
                                                {foodItem.taxType === 'N' && ('(No Tax)')}
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
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            minHeight: '100px',
                                            padding: '2%',
                                            margin: '2% 0 0 0',
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
                                            {
                                              foodItem.offerItems.map((offerItem, i) => {

                                                return (
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
                                              }

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
                                )
                              }
                              )}
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
                                          {getSubtotal(item.items).toFixed(2)}
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        {/* <div>Tax @ {item.tax}%</div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {((item.tax / 100) * getSubtotal(item.items)).toFixed(2)}
                                        </div> */}
                                        <div>SGST @ {taxData[item.items[0].foodStallId] / 2}%</div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {/* {((taxValue / 100) * getSubtotal(item.items)).toFixed(2)} */}
                                          {((taxPrices[item.items[0].foodStallId]) / 2).toFixed(2)}
                                        </div>

                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <div>CGST @ {taxData[item.items[0].foodStallId] / 2}%</div>
                                        <div>
                                          {config.keys.rupee}{" "}
                                          {((taxPrices[item.items[0].foodStallId]) / 2).toFixed(2)}
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
                                          {Math.ceil(((getSubtotal(item.items)) +
                                            taxPrices[item.items[0].foodStallId]).toFixed(2))}
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
                            <div class="accordion-body" style={{
                              margin: "10px 0 0 0"
                            }} onClick={() => gotoMenu(item.foodStallId)}>
                              <p class="text-right">
                                <button class="mobiledarkbtn">Add more </button>
                              </p>
                            </div>
                            <div style={{ textAlign: "center", margin: "2% 0 0 0" }}>
                              {" "}
                              <Button
			      	onClick={() => {
                                  if(checkBoxStatus){
                                    placeOrder(item.foodStallId, 
	                                  getSubtotal(item.items).toFixed(2), 
	                                  Math.ceil(((getSubtotal(item.items)) +
	                                  taxPrices[item.items[0].foodStallId]).toFixed(2)),
	                                  ((taxPrices[item.items[0].foodStallId]) / 2).toFixed(2))
                                  }else{
                                    setShowErrorMsg(true)
                                  }
                                }}
                                style={{
                                  width: "100%",
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
           
                                <label className="switch" style={{marginLeft:"32px"}}>
                                   <input  type="checkbox" onClick={checkboxHandler} checked={checkBoxStatus}/> 
                                   
                                 {/* <span className="slider round" ></span> */}
                                
                        
                                </label>
                              </Button>
                             
                            

                              <div className="container" errorMessage="Please enter Description">
                              <div style={{paddingTop:"22px"}}>
                                 <input type="checkbox" id="agree" onClick={checkboxHandler} checked={checkBoxStatus}  />
             
                                 <label  htmlFor="agree">  &nbsp; &nbsp;I agree to <b onClick={handleOpen}>   terms and conditions </b>
                                 <Modal show={open} onHide={handleDrop} >
                                        <Modal.Header closeButton>
                                          <Modal.Title>Terms & Conditions(Customers)</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        1.	The terms of use govern the use of the Tap4Food website, our Tap4Food User application for Merchant stores, other personal handheld devices and other Tap4Food Discover and Order and/or Scan and Go (contact-less shopping) services (all these are collectively termed as services). Please read the Terms of Use section carefully. By using the service, scanning the QR, ordering merchandise through the website, you are agreeing to the Terms of Use.<br/>
                                        2. 	The Services are provided under the brand Tap4Food, which is owned and operated by TrueValue E-Commerce Pvt Ltd.(hereinafter referred to as “Tap4Food”, “we”, “us” or “our”).<br/>
                                        3.	We are an IT Solutions company that provides a Technology solution for the companies to modernize the shopping and food experience of customers by providing them top-class technology solutions in the form of our website. We integrate the Merchants in the retail space (cafeteria/food court) on our platform through an admin application which is used for managing customer orders. We do not own any of the Merchants and have no control over the quality of the products or over services that are provided by the Merchant.<br/>
                                        4. 	We reserve the right to change the Terms of Use anytime without providing any notice and you are liable to update with the updated Terms of Use through this section <br/>
                                        5.	Only individuals who are 18 years or older may use the services. You may use our services if you are less than 18 years old but we hold no responsibility for the same.<br/>
                                        6.	You agree to receive Notifications, SMSs and emails from Tap4Food regarding order intimations and updates <br/>
                                        7.	You permit us to share your details (name, email and phone) with the Merchant(s).<br/>
                                        8.	As a standard practice, all orders placed on Tap4Food are treated as confirmed and cannot be cancelled or transferred to another Merchant.<br/>
                                        9.	You will be entitled for a refund of any order only if the Merchant cancels your order due to unavailability of merchandise ordered or any other reason as mentioned by the Merchant<br/>
                                        10.	You are responsible for keeping your login credentials private and not share them with anyone else. You will not use the services for any activity that is of commercial in nature or unlawful or harmful for any individual or organization. If you use the same, all activities undertaken by the individual are attributed to the individual without any blame or responsibility assigned to Tap4Food.<br/>
                                        11.	We are the owner of intellectual property for all the services provided by us and hence are governed by the necessary copyright laws.<br/>
                                        12.	We are the owner of the Admin application, Merchant application, User application and Dashboard for Android and iOS and the website (desktop and mobile) and hence any attempt to destroy, imitate or harm these applications will be considered as a breach of the Terms of Use<br/>
                                        <div>
                                        <h1 style={{fontWeight:"bold"}}>T&C for CONTACTLESS FOOD COURTS ORDERING SERVICES</h1>
                                        1.	The food that will be consumed by you in the cafeterias/QSRs will be prepared by the Merchants of that cafeteria/QSR. Tap4Food does not hold any responsibility on the food prepared by these Merchants.<br/>
                                        2.	We integrate the Merchants in the cafeteria/food court on our platform through an admin application which is used for managing customer orders. We do not own any of the Merchants and have no control over the services that are provided by the Merchant.<br/>
                                        3.	The products that will be ordered/bought by you through our application will be provided by the Merchants of that stall. Tap4Food does not hold any responsibility on the quality of products provided by these Merchants. We integrate the Merchants in the market on our platform through a merchant application which is used for managing customer orders. We do not own any of the Merchants and have no control over the services that are provided by the Merchant.<br/>
                                        4.	The delivery of the order collecting is the responsibility of the Customer.<br/>
                                        </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button variant="danger"  style={{ width: '80px', color: 'white' ,backgroundColor:"#e63946"}} onClick={handleDrop}>
                                            Close
                                          </Button>
                                         
                                        </Modal.Footer>
                                      </Modal>

                                         </label>

                               
                               
                              </div>
                              <div style={{color:"red",fontWeight:"600",marginLeft:"2px",paddingTop:"5px"}}> {showErrorMsg && "Please agree terms & conditions"  }</div>
                              </div>
                             
                              <div className="mt-1 border rounded mobile_header_gray" >
                                    <div className="p-3"  >
                                      <div className="d-flex justify-content-between" >
                                      <div className="d-felx justify-content-left">
                                          <div style={{fontWeight:"bold",float:"left"}}> Cancellation Policy:</div> <br/>
                                          <div style={{float:"left"}}>It is not appropriate to cancel. Please approach the stall counter <br/></div>
                                          <div style={{float:"left"}}>if you wish to cancel the order.You need to go to the stall</div>
                                         {/* <div> <button>Load more</button></div> */}
                                          <div style={{ visibility : addrow == true? 'visible':'hidden'
                                          }} >  to cancel your order <br/> and receive a refund there.The stall will <br/>cancel your order due to the unavailability<br/> of the items you ordered, and you will be<br/> able to receive your refund at the stall.</div> 
                                         <div class="accordion-body" style={{
                              margin: "10px 0 0 0"
                              
                            }} >
                               <p class="text-right" style={{float:"left",marginTop:"2vh"}}>
                               {/* {readMore ? body : `${body.substring(0, 80)}...`} */}
                                <button class="mobiledarkbtn" onClick={() => setAddRow(!addrow)}>
                                        {addrow ? "show less" : "  Load more"} </button>
                              </p> 
                           </div>
                            
                                        </div>
                                       
                                      </div>
                                      
                                    </div>
                                </div> &nbsp;
                                <div className="d-flex justify-content-between" style={{fontWeight:"bold",paddingTop:"5px",marginLeft:"1vh"}}>
                                   {/* <a >  AboutUs </a>           &nbsp;&nbsp; */}
                                   <b onClick={handleAbout}>About&nbsp;Us </b> 
                                   <Modal show={about} onHide={handleCancel} >
                                        <Modal.Header closeButton>
                                          <Modal.Title>About Us</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                      	Our digital platform links customers with restaurant partners that can meet their various needs. We believes technology should be used to benefit people and increase their convenience. The amount of time customers waste in lines is currently one of the biggest obstacles in malls and restaurants.Our platform is used by customers to scan QR codes to find eateries, place meal orders, pay for their purchases, and submit reviews. On the other side, we provide our restaurant partners enterprise marketing solutions that help them attract clients, grow their business, and offer a dependable and effective service.
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button variant="success"  style={{ width: '80px', color: 'white',backgroundColor:"#e63946" }} onClick={handleCancel}>
                                            Close
                                          </Button>
                                         
                                        </Modal.Footer>
                                      </Modal>
                                      <Privacy_Policy/>
                                 <div style={{marginLeft:"5vh",fontWeight:"2000"}}>
                                 Contact&nbsp;Us: &nbsp;
                                 </div> &nbsp;
                                 <div>
                                 <b onClick={handleOpen}><a href="">support@tap4food.com </a>   </b>
                                 </div>             
                                    
                                  <div className="col-xs-3 col-sm-3" style={{ width: '25%' }}>
                                                <strong></strong>
                                              </div> 
                                              <div className="col-xs-3 col-sm-3" style={{ width: '25%' }}>
                                                <strong></strong>
                                              </div>      
                                </div>
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

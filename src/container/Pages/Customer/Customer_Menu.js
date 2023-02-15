import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import ReactStars from "react-rating-stars-component";
import { ReactInternetSpeedMeter } from 'react-internet-meter';

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
import config from "../../../container/app/navigation.json";
import Slider from "./Component/Slider";
import Customer_MenuDetails from "./Component/Customer_MenuDetails";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  postData,
  getData,
  reduxGetData,
  reduxPostData,
} from "../../../ServiceCall";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import * as REDUX_ACTION from "../../../store/customer/action";
import { Button, Container } from "reactstrap";
import { Checkbox, Grid, Input } from "@material-ui/core";

import Accordion from "react-bootstrap/Accordion";
import constants from '../../../constants/constants';
import _ from 'lodash'
import Profile from "./Profile";
let menus = [];
let showOffers = true;
let showRecommended = false;
let shownonRecommended = true;

const queryString = window.location.search.substring(1);
var showOffersCustomizationModal = false;
const Customer_Menu = (props) => {

  console.log("constants", constants.minLength);
  const fs_id = new URLSearchParams(props.location.search).get("fs-id");
  console.log("fs_id", fs_id);

  const dispatch = useDispatch();
  const [showOfferItemModal, setShowOfferItemModal] = useState(false);
  // const [showOffersCustomizationModal, setShowOffersCustomizationModal] = useState(false);
  const [showdata, setShowdata] = useState(false);
  const [showOffersData, setShowOffersData] = useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuShow, setMenuShow] = React.useState(false);
  const [foodstallMenu, setFoodstallMenu] = useState([]);
  const [foodstallActualMenu, setFoodstallActualMenu] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [fooditemid, setFooditemid] = useState(0);
  const [fooditemname, setFooditemname] = useState(0);
  const [fooditemprice, setFooditemprice] = useState(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isPizza, setisPizza] = useState(false);
  const history = useHistory();
  const [activeFoodStall, setActiveFoodstall] = useState({});
  const [msg, setMsg] = useState("");
  const userData = useSelector((state) => state.customer);
  const [smShow, setSmShow] = useState(false);
  const [offers, setOffers] = useState(false);
  const [offerList, setOfferList] = useState([]);
  const [offerImages, setOfferImages] = useState([]);
  const cartItems = useSelector((state) => state.customer.cartItems);
  const stateData = useSelector(state => state.customer);
  console.log('STATE_DATA', stateData);
  const [speed, setwifiSpeed] = useState('0.0');
  const [currentOfferData, setCurrentOfferData] = useState({});
  const handleClose = () => {
    setMenuShow((menuShow) => !menuShow);
  };
  const { t } = useTranslation();
  const handleChange = () => { };
  const [offerErrorMsg, setOfferErrorMsg] = useState("");
  const [offerItems, setOfferItems] = useState([]);
  const [toppingsItems, setToppingsItems] = useState([]);
  const [toppingItem, setToppingItem] = useState("");
  const [toppingtitle, setToppingTitle] = useState("");
  const [selectedOfferItems, setSelectedOfferItems] = useState({});
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const [listWisePrices, setListWisePrices] = useState({});

  const [searchWord, setSearchWord] = useState("");
  const [minLength, setMinLength] = useState(constants.minLength);
  const [loarMoreOffers, setLoadmMoreOffers] = useState([]);
  const [loarMoreMenuItems, setLoadMoreMenu] = useState([]);
  const handleSubmit = () => { };

  const isItemInCart = (itemId) => {
    var flag = false;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].foodItemId === itemId) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  const notifyCartSuccessMessage = () => toast.success('Item added to cart', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyCartSuccessMessageOffer = () => toast.success('Offer added to cart', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyCartErrorMessageOffer = () => toast.error('Please select items from all lists', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyCartErrorMessageOfferAlreadyAdded = () => toast.error('Offer already added to cart.', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const addItemPrice = (listCount, item) => {

    setListWisePrices({ ...listWisePrices, [listCount]: item.offerPrice });

    console.log('addItemPrice..1.', listCount)
    console.log('addItemPrice..2.', item)
    console.log('addItemPrice..3.', listWisePrices, listCount, item)

    console.log('addItemPrice', listWisePrices);
    var totalPrice = 0;
    Object.keys(listWisePrices).map(listNum => {
      if (listNum != listCount)
        totalPrice += listWisePrices[listNum];
    })

    totalPrice += item.offerPrice;

    setCartTotalPrice(totalPrice);

    const itemData = {

      foodItemId: item.foodItemId,
      itemName: item.itemName,
      actualPrice: item.actualPrice,
      offerPrice: item.offerPrice,
      combination: item.combination,
      offerId: currentOfferData.offerId,
      offerTitle: currentOfferData.title,
      description: currentOfferData.descriptions[listCount],
      quantity: item.quantity
    }

    setSelectedOfferItems({ ...selectedOfferItems, [listCount]: itemData })

    console.log('itemData', selectedOfferItems)
  }

  const isSelectedItemsError = () => {
    // console.log('TEST_PK', currentOfferData.buttonTypes);
    let buttonTypes = Object.keys(currentOfferData.buttonTypes);
    for (let i = 0; i < buttonTypes.length; i++) {
      if (
        currentOfferData.buttonTypes &&
        buttonTypes[i] in selectedOfferItems &&
        currentOfferData.buttonTypes[buttonTypes[i]] == "multiple" &&
        selectedOfferItems[buttonTypes[i]].length >= 1
      )
        continue;
      else if (
        currentOfferData.buttonTypes &&
        buttonTypes[i] in selectedOfferItems &&
        currentOfferData.buttonTypes[buttonTypes[i]] == "single" &&
        Object.keys(selectedOfferItems[buttonTypes[i]]).length >= 1
      ) {
        // console.log(
        //   "butype",
        //   selectedOfferItems[buttonTypes[i]],
        //   buttonTypes[i]
        // );
        continue;
      } if (
        currentOfferData.buttonTypes &&
        buttonTypes[i] in selectedOfferItems &&
        currentOfferData.buttonTypes[buttonTypes[i]] == "Optional" &&
        selectedOfferItems[buttonTypes[i]].length >= 1
      )
        continue;
      else {
        return false;
      }
    }
    setOfferErrorMsg("");
    return true;
  };
  const addToCartSelectedItems = () => {
    console.log("before add to cart", selectedOfferItems);

    let keys = Object.keys(selectedOfferItems);
    if (!isSelectedItemsError()) {
      setOfferErrorMsg("Selected Offer Items are Invalid!");
      return;
    }
    for (let i = 0; i < Object.keys(selectedOfferItems).length; i++) {
      let key = keys[i];
      if (currentOfferData.buttonTypes[key] == "single")
        addtocart(
          selectedOfferItems[key].foodItemId,
          selectedOfferItems[key].itemName,
          selectedOfferItems[key].actualPrice,
          selectedOfferItems[key].offerPrice,
          selectedOfferItems[key].combination,
          currentOfferData.offerId,
          currentOfferData.title
        );
      else
        for (let j = 0; j < selectedOfferItems[key].length; j++) {
          let curr_item = selectedOfferItems[key][j];
          addtocart(
            curr_item.foodItemId,
            curr_item.itemName,
            curr_item.actualPrice,
            curr_item.offerPrice,
            curr_item.combination,
            currentOfferData.offerId,
            currentOfferData.title
          );
        }
    }
    setOfferErrorMsg("");
    setShowOfferItemModal(false);
    // setShowToppingsItemModal(false);
  };
  const cartTotal = () => {
    console.log("before totalPrice selected Items ", selectedOfferItems);
    let total = 0;
    let keys = Object.keys(selectedOfferItems);
    for (let i = 0; i < Object.keys(selectedOfferItems).length; i++) {
      let key = keys[i];
      if (currentOfferData.buttonTypes[key] == "single")
        total += selectedOfferItems[key].offerPrice || 0;
      else
        for (let j = 0; j < selectedOfferItems[key].length; j++)
          total += selectedOfferItems[key][j].offerPrice || 0;
    }
    setCartTotalPrice(total);
  };


  const fetchOfferDetails = async (offer) => {

    setShowOfferItemModal(true);
    setCartTotalPrice(0);
    const offerData = await getData(
      "api/customer/offers/get-offer-details?offerId=" + offer.offerId,
      "GET"
    );
    // console.log(data);

    if (offerData.data.data) {
      setCurrentOfferData(offerData.data.data);
    }

    console.log("current offer", currentOfferData);
    if (currentOfferData.length > 0) {
      setCurrentOfferData(currentOfferData);
    }
    if (currentOfferData && currentOfferData.offerLists) {
      for (
        let i = 0;
        i < Object.keys(currentOfferData.offerLists).length;
        i++
      ) {
        var temp = selectedOfferItems;
        let num = i + 1;
        let key = "LIST-" + num;
        // for single={ } for multiple =[]
        if (currentOfferData.buttonTypes[key] == "Single") temp[key] = {};
        else temp[key] = [];
        setSelectedOfferItems(temp);
      }
    }

    if (currentOfferData && currentOfferData.offerType === 'Combo Offers') {

      setCartTotalPrice(currentOfferData.offerPrice);
      setShowOfferItemModal(true);
    }

    console.log("selected Offer items prototype", selectedOfferItems);

  };

  const addComboOfferToCart = () => {

    var comboOfferItems = [];

    const _fsId = stateData.activeFs[0].shop_id;

    Object.keys(currentOfferData.offerLists).map(listKey => {
      Object.keys(currentOfferData.offerLists[listKey]).map(itemKey => {

        const items = currentOfferData.offerLists[listKey][itemKey];

        items.map(itemObject => {

          setListWisePrices({ ...listWisePrices, [listKey]: itemObject.offerPrice });

          const itemData = {
            foodItemId: itemObject.foodItemId,
            itemName: itemObject.itemName,
            actualPrice: itemObject.actualPrice,
            offerPrice: itemObject.offerPrice,
            combination: itemObject.combination,
            offerId: currentOfferData.offerId,
            offerTitle: currentOfferData.title,
            description: currentOfferData.descriptions[listKey],
            quantity: itemObject.quantity
          }

          const tempSelectedOfferItem = {
            [listKey]: itemData, ...selectedOfferItems
          }

          if (comboOfferItems[listKey]) {

            comboOfferItems[listKey].push(itemData);
          } else {
            comboOfferItems[listKey] = [];
            comboOfferItems[listKey].push(itemData);
          }
        })
      })

    })
    console.log("add to cart in menu page :: ", comboOfferItems);
    console.log('Current Offer Data', currentOfferData);

    let actualPrice = 0;
    let offerItems = [];

    Object.keys(comboOfferItems).map(listKey => {
      comboOfferItems[listKey] && comboOfferItems[listKey].map(comboOfferItem => {

        actualPrice += (comboOfferItem.actualPrice * comboOfferItem.quantity);
        const offerItem = {
          itemId: comboOfferItem.foodItemId,
          itemName: comboOfferItem.itemName,
          combination: comboOfferItem.combination,
          offerPrice: comboOfferItem.offerPrice,
          actualPrice: comboOfferItem.actualPrice,
          quantity: comboOfferItem.quantity,
        }

        offerItems.push(offerItem);
      })

    })

    let cartdata = {
      foodItemId: currentOfferData.offerId,
      foodItemName: currentOfferData.title,
      foodItemPrice: actualPrice,
      foodItemTotalPrice: currentOfferData.offerPrice,
      foodStallId: fs_id === null ? _fsId : fs_id,
      isPizza: isPizza,
      customizations: [],
      offerItems: [...offerItems],
      isOffer: true
    };

    console.log('cartdata = ', cartdata)

    let cartarray =
      JSON.parse(localStorage.getItem("t4fcart")) == undefined
        ? []
        : JSON.parse(localStorage.getItem("t4fcart"));

    let active = cartarray.filter((filter) => filter.foodItemId === currentOfferData.offerId && filter.isOffer);
    console.log('active : ', active)
    if (active.length > 0) {
      setMsg("Offer already added");
      handleVisible();
    } else {
      setMsg("Offer is added to cart");
      handleVisible();
      cartarray.push(cartdata);
      notifyCartSuccessMessageOffer();
    }
    setSmShow(false);
    localStorage.setItem("t4fcart", JSON.stringify(cartarray));
    dispatch(REDUX_ACTION.resetCart(cartarray));

    console.log('LATEST_CART', cartItems);
    setShowOfferItemModal(false);
  }

  const defaultCheckToppingsModel = (id, offerList) => {
    // console.log(selectedOfferItems, "selectedOfferItems");
    for (let i = 0; i < selectedOfferItems[offerList].length; i++) {
      if (selectedOfferItems[offerList][i].foodItemId == id) {
        // console.log("return true");
        return true;
      }
    }
    // console.log("return false", item);
    return false;
  };
  const isSelectedItem = (item, offerList) => {
    // console.log(selectedOfferItems, "selectedOfferItems");
    for (let i = 0; i < selectedOfferItems[offerList].length; i++) {
      if (selectedOfferItems[offerList][i].itemName == item) {
        // console.log("return true");
        return true;
      }
    }
    // console.log("return false", item);
    return false;
  };
  const getMenuPrice = (item, offerList) => {
    if (
      currentOfferData &&
      selectedOfferItems[offerList] &&
      currentOfferData.buttonTypes[offerList] == "single" &&
      selectedOfferItems[offerList].itemName == item
    ) {
      return selectedOfferItems[offerList].offerPrice;
    } else if (
      currentOfferData &&
      selectedOfferItems[offerList] &&
      currentOfferData.buttonTypes[offerList] == "multiple"
    )
      for (let i = 0; i < selectedOfferItems[offerList].length; i++) {
        if (selectedOfferItems[offerList][i].itemName == item)
          return selectedOfferItems[offerList][i].offerPrice;
      }
    // if(currentOfferData.buttonTypes[offerList]=='single')
    // console.log('TEST_PK', currentOfferData.offerLists[offerList][item][0])

    return currentOfferData.offerLists[offerList][item][0].offerPrice;

    // for (let i = 0; i < currentOfferData.offerLists[offerList].length; i++)
    //   if (currentOfferData.offerLists[offerList][i].itemName == item)
    //     return currentOfferData.offerLists[offerList][i].offerPrice;
  };
  const setSelectedOfferItem = (item, offerList) => {
    // console.log(offerList, "offerList", " item", item);

    let temp = selectedOfferItems;
    // for single button type
    if (
      currentOfferData.buttonTypes &&
      currentOfferData.buttonTypes[offerList] == "single"
    ) {
      temp[offerList] = item;
      setSelectedOfferItems(temp);
    }
    // for multiple button type
    else {
      let tempOfferList = [];
      // console.log("temp is ", temp);
      if (offerList in temp) {
        tempOfferList = temp[offerList].filter(
          (x) => x.itemName !== item.itemName
        );
      }
      tempOfferList.push(item);
      temp[offerList] = tempOfferList;
      setSelectedOfferItems(temp);
    }
    showOffersCustomizationModal = false;
    cartTotal(item, offerList);
    let x = isSelectedItemsError();
    // console.log("after func selectedOfferItems are ", selectedOfferItems);
  };

  useEffect(async () => {
    // console.log("Cart Items from redux", cartItems);
    // console.log("UserData", userData);
    localStorage.setItem("foodStalls", JSON.stringify(stateData.foodStalls));
    const localStorageData = JSON.parse(localStorage.getItem("foodStalls"));
    console.log("localStorage stateData", stateData);
    // console.log("Current foodstall", fs_id);
    let fsId = parseInt(new URLSearchParams(props.location.search).get("fs-id"));

    if (isNaN(fsId) || fsId === null || fsId === '') {
      fsId = stateData.foodStalls[0].shop_id;
      console.log('in true fsId');
    } else {
      console.log('in else fsId', fsId);
    }

    dispatch(REDUX_ACTION.setActiveFs(fsId));

    dispatch(REDUX_ACTION.setActiveMenuItem('stall'));

    console.log("food stall id is : ", fsId);
    let offerListData = await getData(
      "/api/customer/offers/get-offers?fsId=" + fsId,
      "GET"
    );
    console.log(offerListData.data.data.length)

    if (offerListData.data.data.length == 0) {
      showOffers = false
    }


    if (foodstallMenu[keys] === showRecommended) {
      showRecommended = false
    }

    // console.log(offerListData.data);
    if (offerListData.data.data) {
      setOfferList(offerListData.data.data);
      let arr = offerListData.data.data.slice(0, minLength)
      setLoadmMoreOffers(arr);
      const _offerImages = offerListData.data.data.map(offer => {
        if (offer.offerImage) {
          return {
            offerImage: offer.offerImage,
            offerTitle: offer.title
          }
        } else {
          return '';
        }
      })

      setOfferImages(_offerImages.filter(offerImg => offerImg !== ''));

      console.log('_offerImages', _offerImages);
    }

    // console.log("offerList ", offerList);
    localStorageData.map((data) => {
      console.log(data.shop_id, fs_id);
      if (data.shop_id === fsId) {
        setActiveFoodstall(data);
        return;
      }
    });

    console.log(">>", activeFoodStall);

    getFoodStalls();
  }, []);

  const loadMore = () => {
    let length = offerList.length;
    if (length <= offerList.length) {
      let arr = offerList.slice(0, length);
      setMinLength(length);
      setLoadmMoreOffers(arr);
    }
  }


  const showLess = () => {
    let length = constants.minLength;
    if (length <= offerList.length) {
      let arr = offerList.slice(0, length);
      setMinLength(length);
      setLoadmMoreOffers(arr);
    }
  }


  const loadMoreMenu = (key) => {

    let length = foodstallMenu[key].length;
    if (length <= foodstallMenu[key].length) {
      let arr = foodstallMenu[key].slice(0, length);
      loarMoreMenuItems[key] = arr;
      setLoadMoreMenu({ ...loarMoreMenuItems });
    }

  }


  const showLessMenu = (key) => {

    let length = constants.minLength;
    if (length <= foodstallMenu[key].length) {
      let arr = foodstallMenu[key].slice(0, length);
      loarMoreMenuItems[key] = arr;
      setLoadMoreMenu({ ...loarMoreMenuItems });
    }

  }

  const getFoodStalls = async () => {
    let validationMessage = "";
    let messageType = "";

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });

    let fsId = fs_id;

    if (isNaN(fsId) || fsId === null || fsId === '') {
      fsId = stateData.foodStalls[0].shop_id;
      console.log('in true fsId');
    } else {
      console.log('in else fsId', fsId);
    }

    const response = await reduxGetData(
      `/api/customer/get-foodstall-menu?fs-id=${fsId}`,
      "get",
      "customer"
    )
      .then((response) => {
        if (response.status === 200) {

          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          // console.log("get 200 setFoodstalls", response);
          setFoodstallMenu(response.data.data);
          setFoodstallActualMenu(response.data.data);

          //console.log(response.data.data);


          let data = _.cloneDeep(response.data.data) //{ ...response.data.data };

          Object.keys(data).map((item, index) => {
            if (data[item].length > 1)
              data[item].splice(minLength, data[item].length);
          })
          setLoadMoreMenu(data);

          validationMessage = response.data.status;
          messageType = "success";
          // console.log("TEST", foodstallMenu);
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        // console.log("failure", err);
        messageType = "danger";
        validationMessage =
          err.response?.data?.error ||
          "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
  };

  const keys = Object.keys(foodstallMenu);
  // console.log("KEYS :: ", keys);
  menus = keys.map((key) => {
    return {
      menu: key,
      count: foodstallMenu[key].length,
    };
  });

  // console.log(menus);

  const noMenu = (
    <div style={{
      fontSize: '20px',
      textAlign: 'center',
      paddingTop: '2%'
    }}>

      No items found for the entered keyword.

    </div>
  )
  // Object.keys(foodstallMenu).map((key, index) => {
  const allItems = Object.keys(loarMoreMenuItems).map((key, index) => {

    if (key != "veg" && key != "egg") {
      return (
        <div className="panel panel-default" >
          <h3 className="offerhead" style={{
            visibility: shownonRecommended != false ? 'visible' : 'hidden', position: 'sticky', top: 10
          }} >{key}</h3>

          <div
            className="accordion-body" style={{ paddingTop: "-5px", }}
          >
            {loarMoreMenuItems[key].map((menuItem) => {
              return (
                <div className="accordion-body p-0" style={{ paddingTop: "-5px" }}>
                  <div className="cardview d-flex justify-content-between" style={{ paddingTop: "-5px" }} >
                    <div className="imgblock">
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
                    <div className="flex-grow-1 px-3" style={{ width: '50%', marginTop: "5px" }}>
                      <div>
                        <span className="text-wrap">
                          <Link className="decoration-none text-nowrap">
                            <b> {menuItem.foodItemName}</b>
                          </Link>
                        </span>
                      </div>
                      <span className="bestseller text-small text-nowrap">
                        Best Seller
                      </span>

                      <div className="d-flex">
                        <div>
                          {/* <ReactStars
                            count={5}
                            //onChange={ratingChanged}
                            value={4}
                            size={14}
                            activeColor="#ffd700"
                          ></ReactStars> */}
                          {menuItem.description.length > 150 ? (
                            <span title={menuItem.description}>
                              {
                                menuItem.description.substring(0, 149)
                              } {"..."}
                            </span>
                          ) : menuItem.description}
                        </div>
                        {/* <div className="px-1">(23)</div> */}
                      </div>
                      <div className="font-weight-bold">
                        ₹ {menuItem?.price || 100.0}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="d-flex justify-content-end">
                        {console.log(isItemInCart(menuItem.foodItemId))}
                        {menuItem.availableCustomisation ? (
                          // isItemInCart(menuItem.foodItemId) ? ((
                          //   <button
                          //   className="borderbtn text-nowrap"
                          //   to="#"
                          // >
                          //   Added
                          // </button>
                          // )) : ((
                          <button
                            className="borderbtn text-nowrap"
                            to="#"
                            onClick={(e) => (
                              setMenuShow((menuShow) => !menuShow),
                              setFooditemid(menuItem.foodItemId),
                              setFooditemname(menuItem.foodItemName),
                              setisPizza(menuItem.pizza),
                              setFooditemprice(menuItem?.price || 0)
                              //  setCurrentOfferData(show ? "show" : "Hide")
                            )}
                          >
                            + Add
                          </button>
                          // ))

                        ) : (
                          isItemInCart(menuItem.foodItemId) ? ((
                            <button
                              className="borderbtn text-nowrap"
                              to="#"
                            >
                              Added
                            </button>
                          )) : ((
                            <button
                              className="borderbtn text-nowrap"
                              to="#"
                              onClick={(e) =>
                                addtocart(
                                  menuItem.foodItemId,
                                  menuItem.foodItemName,
                                  menuItem?.price || 100
                                )
                              }
                            >
                              + Add
                            </button>
                          ))

                        )}
                      </div>
                      <div>
                        {menuItem.availableCustomisation ? (
                          <span className="text-red" style={{
                            fontSize: '12px', fontWeight: 'bold'
                          }}>Customizable</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {
            foodstallMenu[key].length != loarMoreMenuItems[key].length &&
            <div className="text-right">
              <button className="mobiledarkbtn" style={{
                margin: "0 0 10px",
              }} onClick={() => loadMoreMenu(key)}>Load more</button>
            </div>
          }

          {
            foodstallMenu[key].length > constants.minLength &&
            foodstallMenu[key].length == loarMoreMenuItems[key].length
            &&
            <p className="text-right">
              <button className="mobiledarkbtn" onClick={() => showLessMenu(key)}>Show less </button>
            </p>
          }
        </div>

      );
    }
  });

  const getCategoryItems = (category) => { };

  const addOfferToCart = () => {
    console.log("add to cart in menu page :: ", selectedOfferItems);
    console.log('Current Offer Data', currentOfferData);

    const totalLists = Object.keys(currentOfferData.offerLists).length;
    console.log('totalLists', totalLists)

    let actualPrice = 0;
    let offerItems = [];

    if (Object.keys(selectedOfferItems).length < totalLists) {
      notifyCartErrorMessageOffer();
      return;
    }

    const _fsId = stateData.activeFs[0].shop_id;

    Object.keys(selectedOfferItems).map(listKey => {

      const listItem = selectedOfferItems[listKey];

      console.log('listItem', listItem);

      actualPrice += (selectedOfferItems[listKey].actualPrice * selectedOfferItems[listKey].quantity);
      const offerItem = {
        itemId: selectedOfferItems[listKey].foodItemId,
        itemName: selectedOfferItems[listKey].itemName,
        combination: selectedOfferItems[listKey].combination,
        offerPrice: selectedOfferItems[listKey].offerPrice,
        actualPrice: selectedOfferItems[listKey].actualPrice,
        quantity: selectedOfferItems[listKey].quantity,
      }

      offerItems.push(offerItem);
    })

    let cartdata = {
      foodItemId: currentOfferData.offerId,
      foodItemName: currentOfferData.title,
      foodItemPrice: actualPrice,
      foodItemTotalPrice: cartTotalPrice,
      foodStallId: fs_id === null ? _fsId : fs_id,
      isPizza: isPizza,
      customizations: [],
      offerItems: [...offerItems],
      isOffer: true
    };

    console.log('cartdata = ', cartdata)

    let cartarray =
      JSON.parse(localStorage.getItem("t4fcart")) == undefined
        ? []
        : JSON.parse(localStorage.getItem("t4fcart"));

    console.log('cartarray', cartarray);

    let active = cartarray.filter((filter) => filter.foodItemId === currentOfferData.offerId && filter.isOffer);

    if (active.length > 0) {
      // setMsg("Offer already added");
      notifyCartErrorMessageOfferAlreadyAdded();
      // handleVisible();
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    } else {
      setMsg("Offer is added to cart");
      handleVisible();
      cartarray.push(cartdata);
      notifyCartSuccessMessage();
    }
    setSmShow(false);
    localStorage.setItem("t4fcart", JSON.stringify(cartarray));
    dispatch(REDUX_ACTION.resetCart(cartarray));

    console.log('LATEST_CART', cartItems);
  };

  const addtocart = (
    foodItemId,
    foodname,
    actualPrice,
    offerPrice,
    customization,
    offerId,
    offerName
  ) => {
    console.log("add to cart in menu page");
    const custName = customization;
    const custObject = {
      order: 1,
      key: "Customization",
      item: custName,
    };
    let cartarray =
      JSON.parse(localStorage.getItem("t4fcart")) == undefined
        ? []
        : JSON.parse(localStorage.getItem("t4fcart"));

    const _fsId = stateData.activeFs[0].shop_id;

    let cartdata = {
      foodItemId: foodItemId,
      foodItemName: foodname,
      foodItemPrice: actualPrice,
      foodItemQuantity: 1,
      foodItemTotalPrice: offerPrice,
      foodStallId: fs_id === null ? _fsId : fs_id,
      isPizza: isPizza,
      customizations: [custObject],
      offerId: offerId,
      offerName: offerName,
    };

    let active = cartarray.filter((filter) => filter.foodItemId === foodItemId);
    if (active.length > 0) {
      setMsg("Item already exist in the cart");
      handleVisible();
      console.log("Item already exist in the cart");
    } else {
      setMsg("Item added to cart");
      handleVisible();
      cartarray.push(cartdata);

      notifyCartSuccessMessage();
    }
    setSmShow(false);
    localStorage.setItem("t4fcart", JSON.stringify(cartarray));
    dispatch(REDUX_ACTION.resetCart(cartarray));

    console.log('LATEST_CART', cartItems);
  };
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const activeFC = useSelector((state) => state.customer.activeFC);

  const filterVeg = (e) => {
    console.log(e.target.checked);

    if (!e.target.checked) {
      let data = _.cloneDeep(foodstallActualMenu);
      Object.keys(data).map((item, index) => {
        if (data[item].length > 1)
          data[item].splice(minLength, data[item].length);
      })
      setLoadMoreMenu(data);
      return;
    }

    console.log(loarMoreMenuItems);
    let tempMenu = {}
    Object.keys(loarMoreMenuItems).map(menuCategory => {

      const filteredItems = loarMoreMenuItems[menuCategory].filter(item => item.veg === e.target.checked)

      if (filteredItems.length > 0) {
        tempMenu[menuCategory] = [...filteredItems];
      }

    });

    console.log('tempMenu', tempMenu)
    setLoadMoreMenu(tempMenu);
    // setFoodstallMenu(tempMenu);
  }

  const searchMenu = (e) => {
    console.log(e.target.value);

    const keyword = e.target.value;

    if (keyword.length === 0 || keyword.length > 2) {
      console.log(foodstallActualMenu);
      let tempMenu = {}
      Object.keys(foodstallActualMenu).map(menuCategory => {

        const filteredItems = foodstallActualMenu[menuCategory].
          filter(item => item.foodItemName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)

        if (filteredItems.length > 0) {
          tempMenu[menuCategory] = [...filteredItems];
        }

      });

      console.log('tempMenu', tempMenu)
      setLoadMoreMenu(tempMenu)
      //setFoodstallMenu(tempMenu);
    }


  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0 }}>
        <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
          <Modal.Header closeButton>{msg}</Modal.Header>
        </Modal>
        <div className="mobile_wrapper">
          <div className="row mobilecontainer justify-content-center">
            <div className="w-100" style={{ maxWidth: "500px" }}>
              <SideNavBar />
              <Profile />
              {/* <div className="mobile_header_white" style={{
              fontSize: '20px',
              backgroundColor: '#223554',
              color: 'white',
              padding: '15px'
            }}>
           
              {activeFC.buName}
            </div> */}
              <div style={{ overflow: 'scroll',position:'sticky',top:2 }}>
                <div className="mobile_header_gray" >
                  <div className="p-2" >
                    <span >{activeFoodStall.foodCourtName}</span>
                    <div id="searchbox" className="input-group mb-1 mt-1" >
                      <div className="input-group-prepend">
                        <span className="input-group-text" >
                          <img src={search_dark} height="20" />
                        </span>
                      </div>
                      <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Search Food Items"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={e => searchMenu(e)}
                      />
                    </div>
                  </div>
                </div>


                <div className="" >
                  <div className="" >
                    <div className="d-flex py-2 justify-content-between align-items-center position-relative" style={{ backgroundColor: "#223554", borderStyle: "solid", position: 'sticky', top: 0 }}>
                      <div>
                        <img
                          className="shopimage"
                          src={activeFoodStall.shop_image}
                          height="30"

                        />
                      </div>

                      <div className="" style={{ fontWeight: '1000', fontSize: "25PX", position: 'absolute', marginLeft: 35, color: "white" }}>
                        <div style={{}}>{activeFoodStall.shop_name}</div>


                      </div>
                      {/*<div className="align-items-center">
                    <img src={clock} className="pb-1" height="15" />{" "}
                     <b>{activeFoodStall.deliverTime}</b> 
                  </div>*/}
                      <div >
                        <span style={{ fontWeight: "1000", color: "white" }}>Veg </span>
                        <label className="switch">
                          <input id="veg" name="veg" type="checkbox" onChange={e => filterVeg(e)} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {/* <div>
                    <span>Egg </span>
                    <label className="switch">
                      <input id="egg" name="egg" type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div> */}
                    </div>
                    <div className="d-flex justify-content-between py-1 align-items-center position-relative" style={{ fontWeight: '1000', fontSize: "25PX" }}>
                      {/*<div style={{fontSize: '500'}}>{activeFoodStall.shop_name}</div>*/}
                      <div>
                        {/* <div className="d-flex align-items-center">
                      <div>
                        <ReactStars
                          count={5}
                          //onChange={ratingChanged}
                          value={4}
                          size={16}
                          activeColor="#ffd700"
                        ></ReactStars>
                      </div>
                      <div className="px-1">(23)</div>
                    </div> */}
                      </div>
                    </div>
                    {/* <div id="slider">
                   <Slider dots>
                    <div>
                      <img className="mobile_ad_image_slider" src={slider1} width="100%" />
                    </div>
                    <div>
                      <img className="mobile_ad_image_slider" src={slider2} width="100%" />
                    </div>
                    <div>
                      <img className="mobile_ad_image_slider" src={slider3} width="100%" />
                    </div>
                  </Slider> 
                  <Slider offerImages={offerImages} loarMoreOffers={loarMoreOffers} fetchOfferDetails={fetchOfferDetails} />
                </div>*/}
                    {/*  <Slider offerImages={offerImages} loarMoreOffers={loarMoreOffers} fetchOfferDetails={fetchOfferDetails} /> */}
                  </div>
                </div>
              </div>
              {isLoaded ? (
                <div className="d-flex justify-content-center">
                  <div className="align-items-center h-100">
                    <Loading size={24} />
                  </div>
                </div>
              ) : (
                <div style={{ overflow: 'scroll',position:'sticky',top:0 }}>
                  <h3 className="offerhead" style={{
                    visibility: shownonRecommended != false ? 'visible' : 'hidden', 
                  }} >Recommended</h3>
                  <div className="mobile_header_white p-2 position-relative" style={{ paddingTop: "-5px",position:'sticky',top:0  }}>

                    <h3 className="offerhead" style={{ visibility: showOffers != false ? 'visible' : 'hidden', backgroundColor: "#223554", overflow:'scroll',position:'sticky',top:0 }}>Offers</h3>
                    <div className="accordion-body">

                      {loarMoreOffers &&
                        loarMoreOffers.map((offer) => {

                          return (
                            <>
                              <ReactInternetSpeedMeter
                                txtSubHeading="Internet is  slow"
                                outputType="alert"
                                customClassName={null}
                                txtMainHeading="Opps..."
                                pingInterval={4000} // milliseconds 
                                thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                                threshold={100}
                                // imageUrl="https://res.cloudinary.com/dcwxsms2l/image/upload/v1610376487/pexels-ivan-samkov-6291574_bzqgps.jpg"
                                downloadSize="1781287"  //bytes
                                callbackFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
                                callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
                              />
                              {" "}
                              <Grid container className="cardview">
                                <Grid item={true} xs={3} sm={4} md={3}>
                                  {" "}
                                  <img
                                    src={offer.offerImage || burger}
                                    className="foodimage"
                                    height="auto" width="32"
                                  />
                                </Grid>
                                <Grid item={true} xs={6} sm={4} md={6}>
                                  {" "}
                                  <div style={{
                                    paddingLeft: '5px',
                                    paddingTop: '1px'
                                  }}>
                                    <span>
                                      <b>{offer.title}</b>
                                    </span>
                                    <div
                                      className=" text-small "
                                      style={{ overFlowWrap: "break-line" }}
                                    >
                                      {offer.offerDescription ? (
                                        offer.offerDescription
                                      ) : (
                                        <>{offer.title}</>
                                      )}
                                    </div>
                                  </div>
                                </Grid>
                                <Grid>
                                  <div style={{
                                    textAlign: 'right'
                                  }}>
                                    <div style={{ display: "none", marginTop: '115px' }}>
                                      <button
                                        className="borderbtn"
                                        onClick={() =>
                                          fetchOfferDetails(offer)
                                          // (setCurrentOfferData(show ? "show" : "Hide") )
                                        }

                                      >
                                        + Add
                                      </button>{" "}
                                    </div>
                                    <div>
                                      <span className="text-red" style={{
                                        fontSize: '12px'
                                      }}>
                                        Customizable
                                      </span>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                              {/* <hr /> */}
                            </>
                          )
                        })}
                      {
                        loarMoreOffers.length != offerList.length
                        &&
                        <p className="text-right">
                          <button className="mobiledarkbtn" onClick={() => loadMore()}>Load more </button>
                        </p>
                      }

                      {
                        (loarMoreOffers.length == offerList.length && offerList.length > constants.minLength) &&
                        <p className="text-right">
                          <button className="mobiledarkbtn" onClick={() => showLess()}>Show less </button>
                        </p>
                      }
                      {/* mui grid */}
                      {/* Modal Popup */}
                      <>
                        {" "}
                        <Modal
                          show={showOfferItemModal}
                          className="fadepop"
                          onHide={() => setShowOfferItemModal(false)}
                          centered
                          animation={false}
                        >
                          <Modal.Header
                            // className="t4h-color-gray"
                            closeButton
                            style={{ border: "none" }}
                          >
                            <Modal.Title>
                              <b>{currentOfferData.title}</b>
                              <h6 style={{ color: "red" }}>
                                <b> {offerErrorMsg}</b>
                              </h6>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {/* list 1 */}
                            {/* {JSON.stringify(currentOfferData)} */}
                            {currentOfferData &&
                              currentOfferData.descriptions &&
                              Object.keys(
                                currentOfferData.descriptions
                              ).map((offerList, index) => (
                                <>
                                  <h5 className="mt-3">
                                    <b
                                      onClick={() =>
                                        console.log(
                                          currentOfferData.descriptions
                                        )
                                      }
                                    >
                                      {" "}
                                      {
                                        currentOfferData.descriptions[
                                        offerList
                                        ]
                                      }
                                    </b>
                                  </h5>
                                  <hr className="mt-2 mb-2" />
                                  {/* {currentOfferData.offerLists[
                                        offerList
                                      ].map((offerItem) => ( */}
                                  {[
                                    ...new Set(
                                      Object.keys(currentOfferData.offerLists[
                                        offerList
                                      ])
                                    ),
                                  ].map((item) => (
                                    <Grid container>
                                      <Grid item={true} xs={3}>
                                        <span style={{
                                          fontSize: '14px',
                                          fontWeight: 700
                                        }}>{item}</span>
                                      </Grid>

                                      <Grid item={true} xs={9}>
                                        {" "}
                                        {currentOfferData && currentOfferData.offerLists &&
                                          currentOfferData.offerLists[
                                            offerList
                                          ][item].map((itemObject, index) => (
                                            <Grid container>
                                              <Grid item={true} xs={3}>
                                                <span style={{ fontSize: '12px', wordWrap: 'break-word' }}>

                                                  {itemObject.combination}
                                                </span>

                                              </Grid>
                                              <Grid item={true} xs={1}>
                                                {" "}
                                                {currentOfferData.offerType === 'Combo Offers' ? (<></>) : (
                                                  <input

                                                    name={offerList}
                                                    type={
                                                      currentOfferData
                                                        .buttonTypes[offerList] ==
                                                        "Single" || currentOfferData
                                                          .buttonTypes[offerList] === "Mandatory"
                                                        ? "radio"
                                                        : "checkbox"
                                                    }
                                                    // name={offerList}
                                                    onChange={() => {
                                                      addItemPrice(offerList, itemObject)
                                                      // setCartTotalPrice(itemObject.offerPrice);
                                                    }}
                                                  />
                                                )}

                                              </Grid>
                                              <Grid item={true} xs={3}>
                                                <h6
                                                  style={{
                                                    display: "inline",
                                                    marginLeft: "10%",
                                                  }}
                                                >
                                                  ₹{" "}
                                                  {itemObject.offerPrice}

                                                </h6>
                                              </Grid>
                                              <Grid item={true} xs={5}>
                                                <h6
                                                  style={{
                                                    display: "inline",
                                                    marginLeft: "10%",
                                                  }}
                                                >
                                                  {itemObject.quantity > 1 ? itemObject.quantity + " Items" : itemObject.quantity + " Item"}
                                                  {" "}
                                                  {
                                                    itemObject.offerPrice != itemObject.actualPrice * itemObject.quantity && (
                                                      (<strike>₹{" "}{itemObject.actualPrice * itemObject.quantity}</strike>)
                                                    )
                                                  }

                                                </h6>
                                              </Grid>

                                            </Grid>
                                          ))
                                        }
                                      </Grid>

                                    </Grid>
                                  ))}
                                  {/* ))} */}
                                </>
                              ))}
                          </Modal.Body>
                          <Modal.Footer className="bg-danger">
                            <Grid container>
                              <Grid item={true} xs={6}></Grid>
                              <Grid item={true} xs={6}>
                                <Grid container>
                                  <Grid item={true} xs={6}>
                                    {currentOfferData.offerType === 'Combo Offers' ? (
                                      <button className="btn btn-outline-light"
                                        style={{
                                          color: "white",
                                          cursor: "pointer",
                                          border: '1px thick white',
                                          padding: '8px 5px 8px 5px  !important',
                                          width: '100px',
                                          fontWeight: 'bold',
                                          height: '30px'
                                        }}

                                        onClick={() => {
                                          // addToCartSelectedItems();
                                          addComboOfferToCart();
                                        }}
                                      >
                                        Add To Cart
                                      </button>
                                    ) : (
                                      <button className="btn btn-outline-light"
                                        style={{
                                          color: "white",
                                          cursor: "pointer",
                                          backgroundColor: 'transparent',
                                          padding: '8px 5px 8px 5px  !important',
                                          width: '100px',
                                          height: '30px',
                                          fontWeight: 'bold'
                                        }}
                                        onClick={() => {
                                          // addToCartSelectedItems();
                                          addOfferToCart();
                                        }}
                                      >
                                        Add To Cart
                                      </button>
                                    )}

                                  </Grid>
                                  <Grid item={true} xs={2} style={{ color: "white" }}>

                                  </Grid>
                                  <Grid item={true} xs={3} style={{ color: "white" }}>
                                    <strong style={{ fontSize: '20px' }}>₹{currentOfferData.offerType === 'Combo Offers' ? currentOfferData.offerPrice : cartTotalPrice}</strong>
                                  </Grid>
                                  <Grid item={true} xs={1} style={{ color: "white" }}>

                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Modal.Footer>
                        </Modal>
                        {/* toppings modal  */}
                      </>
                    </div>


                    <div className="panel-group">

                      {Object.keys(loarMoreMenuItems).length === 0 ? noMenu : allItems}
                    </div>
                  </div>


                  <div className="d-flex justify-content-end px-3">
                    <div className="floatingmenudiv_mob position-fixed mb-5">
                      <div
                        className={menu ? "floatingmenu_mob shadow" : "d-none"}
                      >
                        {menus.map((menu) => (
                          <div className="d-flex justify-content-between p-2 font-weight-bold bottom-border">
                            <div>{menu.menu}</div>
                            <div>{menu.count}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-end px-3">
                  <button
                    type="button"
                    className="mobiledarkbtn mobilefloatmennu text-small"
                    onClick={(e) => setMenu((menu) => !menu)}
                  >
                    <img src={spoon_menu} href="" alt="edit" height="15" />
                    {!menu ? " Menu" : " Close"}
                  </button>
                </div> */}
                </div>
              )}

              <div id="customer_Fooditem_modal">
                <Modal
                  show={menuShow}
                  onHide={handleClose}
                  size="sm-down"
                  className="customer_Fooditem_modal"
                  centered
                  animation={false}
                >
                  <Modal.Body>
                    <div>
                      <Customer_MenuDetails
                        fsId={fs_id}
                        handleClose={handleClose}
                        fooditemid={fooditemid}
                        isPizza={isPizza}
                        fooditemname={fooditemname}
                        fooditemprice={fooditemprice}
                      ></Customer_MenuDetails>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default Customer_Menu;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import OrderHistory from "./Components/Orders/OrderHistory";

import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../assets/icons/eye.png";
import hide from "../../../assets/icons/hide.png";
import deleteicon from "../../../assets/icons/delete.png";
import edit from "../../../assets/icons/edit.png";
import add from "../../../assets/icons/add.png";
import clockcross from "../../../assets/icons/clockcross.png";
import Alert from "../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";

import { Link, useHistory } from "react-router-dom";

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const [editable, setEditable] = useState(null);
  const [updateValue, setUpdateValue] = useState(null);
  const [toggle, setToggle] = React.useState(false);
  const [pricing, setPricing] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [orders, setOrders] = useState({});
  //let title = t("my_profile");
  let title = "Order History";
  
  useEffect(() => {
    
  }, []);
 

  return (
    <div>
      <SideNavBar id={5} />

      <div className="merchange-content rounded ">
        <Header title={title} />
        <div className="rounded p-2">
          <OrderHistory></OrderHistory>
        </div>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Orders;

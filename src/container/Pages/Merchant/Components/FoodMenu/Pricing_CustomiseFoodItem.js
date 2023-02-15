import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import clockcross from "../../../../../assets/icons/clockcross.png";
import Alert from "../../../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as adminActionTypes from "../../../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import ViewOfferDetails from "./ViewOfferDetails";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Pricing_CustomiseFoodItem() {
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
  const {t} = useTranslation();
  //const [datatable, setDatatable] = React.useState(_datatable);

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
        sort: "disabled",
      },
      {
        label: t("category"),
        field: "category",
        width: 350,
      },
      {
        label: t("sub_category"),
        field: "subCategory",
        width: 100,
      },
      {
        label: t("Fooditem"),
        field: "foodItemName",
        width: 100,
      },
      {
        label: t('customize_type'),
        field: "customiseType",
        width: 100,
      },

      {
        label: t("price"),
        field: "price",
        width: 100,
      },
      {
        label: t("actions"),
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      pricing &&
      pricing?.sort((a, b) => a.id < b.id) &&
      pricing.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        category: obj.category,
        subCategory: obj.subCategory,
        foodItemName: obj.foodItemName,
        customiseType: obj.customiseType.replaceAll("##", " "),
        price: obj.id === editable || obj.id === 0 ? <input name="price" type="number" className="t4finput-sm" id="category" defaultValue={obj.price} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.price,

        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => updatePricing(obj.id, updateValue, index)}>
                Update
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              {/* <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button> */}
              <button className="t4fbutton-gray d-none" onClick={(e) => (setEditable(obj.id), setMessage(""))}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
            </div>
          </>
        ),
      })),
  };

  const updatePricing = (id, price, index) => {
    if (price !== null) {
      console.log("inside update");
      updatePricing_({ price: price, id: id });
    }
    setUpdateValue(null);
    setEditable(null);
  };

  const updatePricing_ = (data) => {
    console.log(data);
    console.log("inside update1");
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    const result = reduxPostData(`/api/menu/update-fooditem-customization-price?fs-id=${foodstallid}&price=${data.price}&pricing-id=${data.id}`, "merchant", "post")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Pricing Updated Sucessfully";
          console.log(response);
          //dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
          setSuccess((success) => !success);
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(type);
  };

  useEffect(() => {
    getPricing();
  }, [foodstallid, success, isFoodItemAdded]);
  const getPricing = async () => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/menu/get-fooditems-customizing-pricing-details?fs-id=${foodstallid}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 getPricing", response);
          setPricing(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setPricing([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setPricing([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };

  return (
    <div className="px-3">
      {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
      <div id="view-offer-list">
        <MDBDataTableV5 entriesOptions={[10]} entries={10} disableRetreatAfterSorting={true} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
      </div>
    </div>
  );
}

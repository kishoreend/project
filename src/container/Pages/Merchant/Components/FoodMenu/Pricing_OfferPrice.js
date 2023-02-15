import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import clockcross from "../../../../../assets/icons/clockcross.png";
import ViewOfferDetails from "./ViewOfferDetails";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import Alert from "../../../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import { useTranslation } from "react-i18next";

export default function Pricing_OfferPrice() {
  const dispatch = useDispatch();
  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const [toggle, setToggle] = React.useState(false);
  const [pricing, setOfferPricing] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const {t} = useTranslation();

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
        sort: "disabled",
      },
      {
        label: t("title"),
        field: "foodItemName",
        width: 350,
      },
      {
        label: t("customize_type"),
        field: "customizeType",
        width: 350,
      },

      {
        label: t("total_price"),
        field: "actualPrice",
        width: 100,
      },

      {
        label: t("offer_price"),
        field: "offerPrice",
        width: 100,
      },
      // {
      //   label: "Actions",
      //   field: "actions",
      //   sort: "disabled",
      //   width: 100,
      // },
    ],
    rows:
      pricing &&
      pricing?.sort((a, b) => a.id < b.id) &&
      pricing.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        foodItemName: obj.foodItemName,
        customizeType: obj.customizeType,

        actualPrice: obj.actualPrice,
        // quantity: <input type="number" name="quantity" defaultValue="1" min="1" class="t4finput-sm w-50 text-center" placeholder="" />,
        offerPrice: obj.offerPrice,

        // actions: (
        //   <>
        //     <div>
        //       <button className="t4fbutton-gray" to="#">
        //         <img src={clockcross} alt="clock" height="15" />{" "}
        //       </button>
        //       <button className="t4fbutton-gray" to="#">
        //         <img src={hide} alt="hide" height="15" />{" "}
        //       </button>
        //       <button className="t4fbutton-gray" to="#">
        //         <img src={edit} alt="edit" height="15" />{" "}
        //       </button>
        //     </div>
        //   </>
        // ),
      })),
  };

  useEffect(() => {
    getOfferPricing();
  }, [isFoodItemAdded]);
  const getOfferPricing = async () => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/merchant/offer/get-offers-fooditems?fsId=${foodstallid}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 offer price", response);
          setOfferPricing(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setOfferPricing([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setOfferPricing([]);
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

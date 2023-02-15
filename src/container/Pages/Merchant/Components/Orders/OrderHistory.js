import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../../assets/styles/t4fstyle.scss";
import { MDBDataTableV5 } from "mdbreact";
import Alert from "../../../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as adminActionTypes from "../../../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";

import { Link, useHistory } from "react-router-dom";

const OrderHistory = () => {
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
  const [orders, setOrders] = useState([]);

  const datatable = {
    columns: [
      {
        label: t("order-id"),
        field: "orderId",
        width: 1,
        sort: "disabled",
      },
      {
        label: t('phone'),
        field: "customerPhoneNumber",
        width: 350,
      },
      {
        label: t("date"),
        field: "date",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        width: 100,
      },
      {
        label: "Amount",
        field: "totalAmount",
        width: 100,
      },

      {
        label: t("status"),
        field: "status",
        width: 100,
      },
      {
        label: "Transaction",
        field: "paymentId",
        width: 100,
      },
      // {
      //   label: "Action",
      //   field: "actions",
      //   sort: "disabled",
      //   width: 100,
      // },
    ],
    rows:
      orders &&
      orders.map((obj, index) => ({
        orderId: obj.orderId,
        customerPhoneNumber: obj.customerPhoneNumber,
        date: obj.orderedTime,
        quantity: obj.orderedItems.length,
        totalAmount: t("currency") + " " + obj.totalAmount,
        status: (
          <>
            {obj.status === 'NEW' && (
              <button className="orderstatusbtn border-0 rounded px-2 color-orange text-light" to="#">
                New Order
            </button>
            )}  
            {obj.status === 'START_PREPARING' && (
              <button className="orderstatusbtn border-0 rounded px-2 color-green text-light" to="#">
                Preparing
            </button>
            )}  
            {obj.status === 'DELIVERED' && (
              <button className="orderstatusbtn border-0 rounded px-2 color-green text-light" to="#">
                Delivered
            </button>
            )} 

            {obj.status === 'READY' && (
              <button className="orderstatusbtn border-0 rounded px-2 color-green text-light" to="#">
                Ready
            </button>
            )} 

            {obj.status === 'CANCELLED' && (
              <button className="orderstatusbtn border-0 rounded px-2 color-green text-light" to="#">
                Cancelled
            </button>
            )}  
                      
          </>
        ),
        paymentId: obj.paymentId
        // actions: (
        //   <>
        //     <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
        //       <button className="t4fbutton-gray border px-2" to="#">
        //         View
        //       </button>
        //     </div>
        //   </>
        // ),
      })),
  };
  useEffect(() => {
    getOrders(foodstallid);
  }, [foodstallid, success, isFoodItemAdded]);
  
  const getOrders = async (foodStallId) => {

    const ordersResponse = await getData('/api/merchant/orders/get-order-history?fsId=' + foodStallId);
   
    setOrders(ordersResponse.data.data);
    //console.log(ordersResponse.data);
  }

  return (
    <div className="rounded">
      <div className="profile-tabs tab-content bg-white rounded shadow bg-white">
        <div className="p-2">
          <MDBDataTableV5 entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

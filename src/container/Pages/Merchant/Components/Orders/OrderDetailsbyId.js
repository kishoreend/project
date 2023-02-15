import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import check from "../../../../../assets/icons/check.png";
import Alert from "../../../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, signUpFailed } from "../../../../../store/authentication/signup/action";
import axios from "../../../../../axios";
import { getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import config from "../../../../../container/app/navigation.json";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import { MDBDataTableV5 } from "mdbreact";


const OrderDetailsbyId = React.forwardRef((props, ref) => {

  const viewingOrder = props.viewingOrder;

  const refreshOrders = () => {
    props.refreshOrders();
  }

  // const viewingOrder = props.viewingOrder;
  const getGrossTotal = () => {
    let grossTotal = 0;

    if (viewingOrder.orderedItems) {
      for (let i = 0; i < viewingOrder.orderedItems.length; i++) {
        grossTotal += viewingOrder.orderedItems[i].price;
      }
    }

    return grossTotal;
  }
  console.log("viewingOrder", viewingOrder);

  const [altview, setAltView] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [pricing, setPricing] = useState([]);
  const [pricing_fooditem, setPricing_fooditem] = useState([]);

  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(false);
  const [grossTotal, setGrossTotal] = useState(0);
  const [taxCharges, setTaxCharges] = useState(0);
  const [callCustModal, setCallCustModal] = useState(false);
  const [callCustObject, setCallCustObject] = useState({});
  const [cancelModal, setCancelModal] = useState(false);

  const handleClose = () => {
    setAltView((altview) => !altview);
  };
  const handleAltview = (a) => {
    setAltView((altview) => !altview);
  };
  useEffect(() => {
    console.log('Viewing Order', viewingOrder);

  }, [currentFoodstallID, isFoodItemAdded]);


  let foodItemList = "123";
  //let _arry_fooditem = [];

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
      },
      {
        label: "Category",
        field: "category",
        width: 350,
      },
      {
        label: "SubCategory",
        field: "subCategory",
        width: 100,
      },
      {
        label: "Fooditem",
        field: "foodItemName",
        width: 100,
      },
      {
        label: "CustomiseFooditem",
        field: "customiseType",
        width: 100,
      },

      {
        label: "Price",
        field: "price",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        width: 100,
      },

      {
        label: "Status",
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      pricing.concat(pricing_fooditem) &&
      pricing.concat(pricing_fooditem)?.sort((a, b) => a.id < b.id) &&
      pricing.concat(pricing_fooditem).map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        category: obj.category,
        subCategory: obj.subCategory,
        foodItemName: obj.foodItemName,
        customiseType: obj.customiseType !== null && obj.customiseType !== undefined && obj.customiseType !== "" && obj.customiseType.replaceAll("##", " "),
        price: obj.price,
        quantity: <input type="number" defaultValue="1" min="1" class="t4finput-sm w-50 text-center" placeholder="" />,
        //offerpriceper: <input type="number" id={"gridofferpriceper" + index} name={"gridofferpriceper" + index} min="0" class="t4finput_bottomborder w-50 text-center" placeholder="" />,
        //offerprice: <input type="number" min="0" id={"gridofferprice" + index} defaultValue={obj.price} name={"gridofferprice" + index} class="t4finput_bottomborder w-50 text-center" placeholder="" />,
        actions: (
          <div class="form-check">
            <span className="">
              <input type="checkbox" id={"fooditemsselect" + index} />
              <label for={"fooditemsselect" + index}></label>
            </span>
          </div>
        ),
      })),
  };

  const SuggestAlternatives = () => {
    return <div>d</div>;
  };

  const updateOrderStatus = async (status) => {
    console.log(status)
    await getData('/api/merchant/orders/update-status?orderId=' + viewingOrder.orderId + "&status=" + status, 'PUT')
    .then(res => {
      setCancelModal(false);
      refreshOrders();
    })
    
    
  }

  const callCustomer = () => {
    setCallCustModal(true);
  }

  const callCustModalCLose = () => {
    setCallCustModal(false);
  }

  return (
    <div >
      <div style={{ display: "none" }}>
        <div ref={ref} className="lightgray">
          <style type="text/css" media="print">
            {"\
   @page {  size: 2.5in 4in; }\
"}
          </style>
          <div className="p-2">
            <div className="d-flex justify-content-between">
              <div>Order id: {viewingOrder.orderId}</div>

            </div>
            <div className="d-flex justify-content-between">
              <div>Customer Phone: {viewingOrder.customerPhoneNumber}</div>
              {/* <div>Date# 31/04/2001</div> */}
            </div>
            <div className="d-flex justify-content-between">
              <div>Ordered Time: {viewingOrder.orderedTime}</div>
              {/* <div>Date# 31/04/2001</div> */}
            </div>
          </div>
          <div className="borderbottomdotted"></div>
          <div className="p-2 d-flex justify-content-between">
            <div>Total Items   <b> {viewingOrder.totalItems}</b></div>
            <div style={{
              display: "inline-block",
              borderLeft: "2px solid #ccc",
              margin: "0 10px",
              height: "50px"
            }}></div>
            <div>{viewingOrder.selfPickup ? "Self Pickup" : "Screen/Seat # " + viewingOrder.screen + "-"+viewingOrder.seatNumber}</div>
          </div>
          {
            viewingOrder.orderedItems && viewingOrder.orderedItems.map((item) => ((<div className="p-2">
              <div className=" bg-white p-2">

                <div className="d-flex  justify-content-between align-items-center">
                  <div className="teal_text" style={{width: '80%', wordWrap: 'break-word'}}>
                    {/* <input type="checkbox" className="p-1"></input> */}
                    <span className="px-2" style={{fontSize: '11px'}}> {item.quantity} X {item.itemName}</span>
                  </div>
                  <div className=" font-weight-bold text-dark " style={{fontSize: '11px'}}>Rs {item.price}</div>
                </div>
                <div className="bottomborder my-1"></div>
                {
                  item.customizations && item.customizations.map(cust => ((
                    <div className="d-flex">
                      {
                        cust.items.length > 0 && (
                          <div className="w-25" style={{fontSize: '11px'}}>{cust.name}</div>
                        )
                      }
                      
                      <div>
                        {cust.items && cust.items.map(custItem => ((
                          <div style={{fontSize: '11px'}}>
                            {/* <img src={check} height="13"></img> */}
                            {custItem === 'Customization' ? "" : custItem}
                          </div>
                        )))}
                      </div>
                    </div>
                  )))
                }

              </div>
            </div>
            )))
          }

          <div className="p-2 text-dark font-weight-bold">
            <div className="d-flex justify-content-between">
              <div>Gross Total</div>
              <div>Rs {getGrossTotal()}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Taxes & Charges({viewingOrder.tax}%)</div>
              <div>Rs {getGrossTotal() * viewingOrder.tax * 0.01}</div>
            </div>
            <div className="bottomborder px-2 my-2"></div>
            <div className="d-flex teal_text_bold  justify-content-between">
              <div>Grand Total</div>
              <div>Rs {viewingOrder.totalAmount}</div>
            </div>
            <div className="bottomborder px-2 my-2"></div>

            {
              viewingOrder.orderedTime &&
              <div>
                <div className="d-flex teal_text_bold  justify-content-between">
                  <div>Order Time</div>
                  <div>  {viewingOrder.orderedTime}</div>
                </div>
                <div className="bottomborder px-2 my-2"></div>
              </div>
            }
          </div>

        </div>
      </div>
      <div className="lightgray">

        <div className="p-2">
          <div className="d-flex justify-content-between">
            <div>Order id: {viewingOrder.orderId}</div>
            <div>Order Number: {viewingOrder.orderNumber}</div>
            <div>Order Placed Time: {viewingOrder.orderedTime}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Customer Phone Number: {viewingOrder.customerPhoneNumber}</div>
            {/* <div>Date# 31/04/2001</div> */}
          </div>
        </div>
        <div className="borderbottomdotted"></div>
        <div className="p-2 d-flex justify-content-between">
          <div>Total Items : {viewingOrder.totalItems}</div>
          <div>{viewingOrder.selfPickup ? "Self Pickup" : "Screen/Seat/Table # " + viewingOrder.screen + "/"+viewingOrder.seatNumber + "/" + viewingOrder.tableNumber}</div>
        </div>
        {
          viewingOrder.orderedItems && viewingOrder.orderedItems.map((item) => ((<div className="p-2">
            <div className=" bg-white p-2">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="teal_text_bold  ">
                  <input type="checkbox" className="p-1" checked disabled></input>
                  <span className="px-2"> {item.quantity} X {item.itemName}</span>
                </div>
                <div className=" font-weight-bold text-dark ">Rs {item.price}</div>
              </div>
              <div className="bottomborder my-1"></div>
              {
                item.customizations && item.customizations.map(cust => ((
                  <div className="d-flex">
                    {
                      cust.items.length > 0 && (
                        <div className="w-25">{cust.name}</div>
                      )
                    }                    
                    <div>
                      {cust.items && cust.items.map(custItem => ((
                        <div><img src={check} height="13"></img> {custItem}</div>
                      )))}
                    </div>
                  </div>
                )))
              }

            </div>
          </div>
          )))
        }

        <div className="p-2 text-dark font-weight-bold">
          <div className="d-flex justify-content-between">
            <div>Gross Total</div>
            <div>Rs {getGrossTotal()}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Taxes & Charges({viewingOrder.tax}%)</div>
            <div>Rs {getGrossTotal() * viewingOrder.tax * 0.01}</div>
          </div>
          <div className="bottomborder px-2 my-2"></div>
          <div className="d-flex teal_text_bold  justify-content-between">
            <div>Grand Total</div>
            <div>Rs {viewingOrder.totalAmount}</div>
          </div>
          <div className="bottomborder px-2 my-2"></div>
        </div>
      </div>

      {
        (viewingOrder.status === 'NEW') && (<div className="p-2">
          {/* <button className="border-0 px-5 py-2 mx-1 primary-color text-light font-weight-bold rounded" onClick={(e) => handleAltview()}>
          Suggest <br />
          Alernatives
        </button> */}
          <button className="border-0 px-5 py-2  mx-1 color-teal text-light font-weight-bold  rounded"
            onClick={() => updateOrderStatus('START_PREPARING')}>
            Start <br /> Preparing
          </button>
          <button className="border-0 px-5 py-2  mx-1 color-red text-light font-weight-bold  rounded"
            onClick={() => setCancelModal(true)}>
            Cancel <br />
            Order
          </button>
          <button className="border-0 px-5 py-2  mx-1 color-green text-light font-weight-bold  rounded"
            onClick={() => callCustomer()}>
            Call to <br />
            Customer
          </button>
        </div>)
      }

      {
        (viewingOrder.status === 'START_PREPARING') && (<div className="p-2">
          <button className="border-0 px-5 py-2 mx-1 primary-color text-light font-weight-bold rounded"
            onClick={() => updateOrderStatus('READY')}>
            Food Item <br />
            Ready
          </button>
          <button className="border-0 px-5 py-2  mx-1 color-green text-light font-weight-bold  rounded"
            onClick={() => callCustomer()}>
            Call to <br />
            Customer
          </button>
        </div>)
      }


      <Modal id="offerfoodItem" show={altview} className="fadepop" size="xl" onHide={handleAltview} animation={false}>
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Veg Treat for home</h6>
          </Modal.Title>
        </Modal.Header>
        {isLoaded ? (
          <Modal.Body>
            <Alert className="w-100" message="Please wait...." type="info" />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <MDBDataTableV5 hover entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} pagesAmount={4} data={datatable} paging={false} pagingTop={false} searchTop searchBottom={false} barReverse />
          </Modal.Body>
        )}
        <Modal.Footer>
          <div>
            <button type="button" className="mx-1 px-2 p-1 rounded text-light color-red border-0">
              Cancel Item
            </button>
            <button type="button" className="mx-1 px-2 p-1 rounded text-light color-teal border-0">
              Proceed
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal id="callCustomer" show={callCustModal} onHide={callCustModalCLose} animation={false}>

        <Modal.Body>
          <div style={{
            height: '200px',
            textAlign: 'center',
            paddingTop: '15%',
            fontSize: '20px'
          }}>
            Call customer <br /><strong>{"+91-"}{viewingOrder.customerPhoneNumber}</strong>
          </div>

        </Modal.Body>

      </Modal>

      <Modal id="cancelModal" show={cancelModal} onHide={() => setCancelModal(false)} animation={false}>

        <Modal.Body>
          {/* <div style={{
            // height: '100px',
            textAlign: 'center',
            paddingTop: '15%',
            fontSize: '20px'
          }}> */}
            Are you sure to cancel this order ?
          {/* </div> */}

        </Modal.Body>

        <Modal.Footer>
          <div>
            <button type="button" className="mx-1 px-2 p-1 rounded text-light color-red border-0" onClick={() => setCancelModal(false)}>
              No
            </button>
            <button type="button" className="mx-1 px-2 p-1 rounded text-light color-teal border-0" onClick={() => updateOrderStatus('CANCELLED')}>
              Yes
            </button>
          </div>
        </Modal.Footer>

      </Modal>
    </div>
  );
});

export default OrderDetailsbyId;

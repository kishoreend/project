import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import ReactStars from "react-rating-stars-component";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import Alert from "../../../components/Common/Alert";
import ViewMerchantProfile from "../Merchant/Components/ViewProfile";
import config from "../../../container/app/navigation.json";
import "../../../assets/styles/t4fstyle.scss";
import deleteicon from "../../../assets/icons/delete.png";
import eye from "../../../assets/icons/eye.png";
import add from "../../../assets/icons/add.png";
import searchmerchant_admin from "../../../assets/icons/searchmerchant_admin.png";
import burger from "../../../assets/icons/burger.png";

import { callApi, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
const Feedback = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const currentFoodstallDetail = useSelector(state => state.merchant.currentFoodstallDetail);

  console.log(currentFoodstallDetail);

  const allMerchants1 = [
    {
      id: 1,
      date: "10/12/2021",
      name: "Tap4food",
      phone: "98872387465",
      orderid: "12121",
      item: "Dosa",
      email: "Tap4food@gmail.com",
      rating: "4",
      review: "This is good. tasty. Worth price",
      order: [
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
      ],
    },
    {
      id: 2,
      date: "10/12/2021",
      name: "Tap4food",
      phone: "98872387465",
      orderid: "12121",
      item: "Dosa",
      email: "Tap4food2@gmail.com",
      rating: "3",
      review: "This is good. tasty. Worth price",
      order: [
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
      ],
    },
    {
      id: 3,
      date: "10/12/2021",
      name: "Tap4food",
      phone: "98872387465",
      orderid: "12121",
      item: "Dosa",
      email: "Tap4food@gmail.com",
      rating: "5",
      review: "This is good. tasty. Worth price",
      order: [
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
        {
          id: "234",
          name: "dosaa",
          quantity: "Hyderabad",
          price: 100,
        },
      ],
    },
  ];
  
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    callApi('/api/merchant/orders/get-orders-feedback?fsId=' + currentFoodstallDetail.foodStallId, 'GET')
    .then(response => {
      console.log(response);
      setData(response.data.data);
      setFilteredData(response.data.data);
    })
  }

  const [filteredData, setFilteredData] = useState(data);

  const filterData = (keyword) => {
    console.log(keyword);
    if(keyword === ""){
      setFilteredData(data);
    }else{
      setFilteredData(data.filter(d => d.orderId.toString().indexOf(keyword) > -1));
    }
    console.log('filterData', filteredData);
  }

  const datatable = {
    columns: [
      {
        field: "orderId",
        sort: "disabled",
        width: 100,
        label:'Orders Feedback'
      },
    ],
    rows:
        data &&
        data.map((obj) => ({
        // 'handle':<MDBBtn className="btn-sm orange darken-3 white-text" >
        //  <MDBIcon icon="angle-double-right" /></MDBBtn>,
        orderId: (
          <span className="title_color">
            <div className="d-flex ">
              <div className="flex-grow-1 ">
                <div className="d-flex flex-column ">
                  <div id="customer" className="">
                    <div className="d-flex justify-content-between px-2">
                      <div className="col-md-4">
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Date : </div>
                          <div className="px-2">{obj.orderDate}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Orderid : </div>
                          <div className="px-2">{obj.orderId}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Items : </div>
                          <div className="px-2">{obj.items.map(item => item + ", ")}</div>
                        </div>
                      </div>
                      <div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Customer Name : </div>
                          <div> {obj.customerName}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel">Customer Phone : </div>
                          <div> {obj.phoneNumber}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel">Customer email : </div>
                          <div> {obj.email}</div>
                        </div>
                      </div>
                      <div id="ratting">
                        <div className="tf4_linklabel">Rating </div>
                        <div>
                          {" "}
                          <ReactStars
                            count={5}
                            //onChange={ratingChanged}
                            value={obj.ratingVal}
                            activeColor="#ffd700"
                            edit={false}
                          ></ReactStars>
                        </div>
                      </div>
                      {/* <div id="view order">
                        <button className="t4fbutton-sm px-2 border" onClick={(e) => setGuiMsg("")}>
                          View Order details
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div id="review">
                    <div className="px-2 py-2 lightgray rounded w-auto">
                      <div className="tf4_linklabel">Review </div>
                      <div className="">{obj.review} </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div>
                <img src={burger} className="rounded" height="150" />
              </div> */}
            </div>
          </span>
        ),
      })),
  };

  return (
    <div>
      <SideNavBar id={10} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("feedback")} />
        <div className="px-2 ">
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={"table-border bg-white tab-content shadow p-2"}>
            <MDBDataTableV5 header={false} disableRetreatAfterSorting={true} entriesOptions={[10]} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searching ={false} barReverse/>
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

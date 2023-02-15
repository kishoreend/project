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

import { reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
const FAQ = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [filterData, setFilterData] = useState("");

  const [merchantGrid, setMerchantGrid] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(false);

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
  const [allMerchants, setallMerchants] = React.useState(allMerchants1);
  const Feedback = () => async () => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    const response = await reduxGetData("/api/admin/fetch-merchant-requests", "get", "admin")
      .then((response) => {
        console.log("fetch-Feedback", response);
        if (response.status === 200) {
          setallMerchants(response.data.data);
          console.log(response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };

  useEffect(() => {
    console.log(allMerchants.merchants);
    if (allMerchants.merchants === undefined || allMerchants.merchants.length === 0) {
      //Feedback();
    }
  }, []);

  const datatable = {
    columns: [
      {
        field: "name",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      allMerchants &&
      allMerchants.sort((a, b) => a.id < b.id) &&
      allMerchants.map((obj) => ({
        // 'handle':<MDBBtn className="btn-sm orange darken-3 white-text" >
        //  <MDBIcon icon="angle-double-right" /></MDBBtn>,
        name: (
          <span className="title_color">
            <div className="d-flex ">
              <div className="flex-grow-1 ">
                <div className="d-flex flex-column ">
                  <div id="customer" className="">
                    <div className="d-flex justify-content-between px-2">
                      <div className="">
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Date : </div>
                          <div className="px-2">{obj.date}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Orderid : </div>
                          <div className="px-2">{obj.orderid}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Item : </div>
                          <div className="px-2">{obj.item}</div>
                        </div>
                      </div>
                      <div>
                        <div class="d-flex">
                          <div className="tf4_linklabel ">Customer Name : </div>
                          <div> {obj.name}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel">Customer Phone : </div>
                          <div> {obj.phone}</div>
                        </div>
                        <div class="d-flex">
                          <div className="tf4_linklabel">Customer email : </div>
                          <div> {obj.email}</div>
                        </div>
                      </div>
                      <div id="ratting">
                        <div className="tf4_linklabel">Ratting </div>
                        <div>
                          {" "}
                          <ReactStars
                            count={5}
                            //onChange={ratingChanged}
                            value={4}
                            size={14}
                            activeColor="#ffd700"
                          ></ReactStars>
                        </div>
                      </div>
                      <div id="view order">
                        <button className="t4fbutton-sm px-2 border" onClick={(e) => setGuiMsg("")}>
                          View Order details
                        </button>
                      </div>
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

              <div>
                <img src={burger} className="rounded" height="150" />
              </div>
            </div>
          </span>
        ),
      })),
  };

  return (
    <div>
      <SideNavBar id={9} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("faq")} />
        <div className="px-2 ">
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>
          <div className={"table-border bg-white tab-content shadow p-1"}>
            <div id="merchant-faq" class="">
              <div class="accordion" id="myAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      Heading 1
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                    <div class="card-body p-2">
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      Heading 2
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#myAccordion">
                    <div class="card-body p-2">
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                      Heading 3
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                    <div class="card-body p-2">
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                      <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

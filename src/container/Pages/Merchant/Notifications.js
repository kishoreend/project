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
const Notification = () => {
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

  const selectedFoodStallDetails = useSelector(
    (state) => state.merchant.currentFoodstallDetail
  );

  const allMerchants1 = [
    {
      id: 1,
      date: "10/12/2021",
      name: "Subscription",

      desc: "Please renew on 04/04/2022",
    },
    {
      id: 2,
      date: "10/12/2021",
      name: "Notification",

      desc: "This is good. tasty. Worth price",
    },
    {
      id: 3,
      date: "10/12/2021",
      name: "Notifications",

      desc: "This is good. tasty. Worth price",
    },
  ];

  const [notifications, setNotifications] = useState([]);

  console.log(notifications);

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

    getNotifications();

    if (allMerchants.merchants === undefined || allMerchants.merchants.length === 0) {
      //Feedback();
    }
  }, []);

  const getNotifications = async () => {
    await callApi('/api/merchant/notifications/get-pending-notifications?fsId=' + selectedFoodStallDetails.foodStallId)
    .then(notificationsResponse => {
      setNotifications(notificationsResponse.data.data.notifications);
      console.log(notifications);
    });
  }

  const datatable = {
    columns: [
      {
        label: 'Description',
        field: "name",
        sort: "disabled",
        width: 100,
      },
      {
        label: 'Time',
        field: "time",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      notifications &&
      notifications.map((obj) => ({
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
                          <div className="tf4_linklabel ">{obj.message} {" by "} </div>
                          <div className="px-2">{obj.customerPhoneNumber}</div>
                        </div>
                      </div>

                      {/* <div id="view order" className={obj.name == "Subscription" ? "" : "d-none"}>
                        <button className="t4fbutton-sm px-2 border" onClick={(e) => setGuiMsg("")}>
                          Renew Now
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        ),
        time: obj.notifTime ? (new Date(obj.notifTime).toLocaleDateString("en-US") + ' : ' + new Date(obj.notifTime).toLocaleTimeString("en-US")) : '' 
      })),
  };

  return (
    <div>
      <SideNavBar id={8} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("notifications")} />
        <div className="px-2 ">
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={"table-border bg-white tab-content shadow p-2"}>
            <MDBDataTableV5 header={false} disableRetreatAfterSorting={true} entriesOptions={[10]} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Notification;

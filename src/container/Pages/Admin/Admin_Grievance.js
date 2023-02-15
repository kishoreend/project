import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
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
import close from "../../../assets/icons/close.png";
import lock from "../../../assets/icons/lock.png";
import user from "../../../assets/icons/user.png";
import call from "../../../assets/icons/call.png";
import { reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
const Admin_Grievance = () => {
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
  const [allMerchants, setallMerchants] = React.useState([]);

  const CustomerGrievance = () => async () => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    const response = await reduxGetData("/api/admin/fetch-merchant-requests", "get", "admin")
      .then((response) => {
        console.log("fetch-cus-grivance", response);
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
      CustomerGrievance();
    }
  }, []);

  const datatable = {
    columns: [
      // {
      //     label: '',
      //     field: '',
      //     width: 1,
      //     sort: 'disabled'
      // }
      // ,
      {
        label: t("uno"),
        field: "uno",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Customer Name",
        field: "foodstallname",
        sort: "disabled",
        width: 270,
      },
      {
        label: "Customer Phone",
        field: "owner",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Grievance",
        field: "phone",
        sort: "asc",
        sort: "disabled",
        width: 100,
      },

      {
        label: t("date"),
        field: "date",
        sort: "disabled",
        width: 100,
      },

      {
        label: t("action"),
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      allMerchants &&
      allMerchants.merchants &&
      allMerchants.merchants.sort((a, b) => a.merchantId < b.merchantId) &&
      allMerchants.merchants.map((obj) => ({
        // 'handle':<MDBBtn className="btn-sm orange darken-3 white-text" >
        //  <MDBIcon icon="angle-double-right" /></MDBBtn>,
        uno: (
          <span className="title_color">
            <span className="tf4_linklabel">{obj.merchantId}</span>
          </span>
        ),
        uno_search: obj.merchantId,
        //foodstallname: obj.foodStalls && obj.foodStalls[0] ? obj.foodStalls[0].foodStallName : "No Foodstall",
        foodstallname: obj.foodStallName,
        owner: obj.owner,
        phone: obj.phoneNumber,
        subscription: "",
        date: obj.date,
        status_search: obj.status,
        action: (
          <>
            <button className="t4fbutton-gray px-2 border" onClick={(e) => setGuiMsg("")}>
              View
            </button>
          </>
        ),
      })),
  };

  return (
    <div>
      <SideNavBar id={11} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("grievance")} role={"admin"} viewmerchant={viewprofile} />

        <div className="px-2 ">
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={"table-border bg-white tab-content shadow p-2"}>
            <div className="position-realtive">
              <div className="d-flex justify-content-end">
                <div>
                  <button className="t4fbutton-gray-sm" type="button">
                    Export to Excel
                  </button>
                </div>
              </div>
            </div>

            <MDBDataTableV5 disableRetreatAfterSorting={true} entriesOptions={[10]} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin_Grievance;

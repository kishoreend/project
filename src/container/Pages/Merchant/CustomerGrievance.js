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
import { callApi, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
const CustomerGrievance = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [complaints, setComplaints] = React.useState([]);

  const currentFoodstallDetail = useSelector(state => state.merchant.currentFoodstallDetail);

  const CustomerGrievance = async () => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    const response = await callApi("/api/merchant/orders/get-orders-complaints?fsId=" + currentFoodstallDetail.foodStallId, "GET")
      .then((response) => {
        console.log("fetch-cus-grivance", response);
        if (response.status === 200) {
          setComplaints(response.data.data);
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
    CustomerGrievance();
  }, []);

  const datatable = {
    columns: [
      {
        label: "Customer Phone",
        field: "phoneNumber",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Customer Name",
        field: "customerName",
        sort: "disabled",
        width: 270,
      },
      
      {
        label: t("grievance"),
        field: "review",
        sort: "asc",
        sort: "disabled",
        width: 100,
      }
    ],
    rows:
      complaints &&
      complaints.map((obj) => ({
        //foodstallname: obj.foodStalls && obj.foodStalls[0] ? obj.foodStalls[0].foodStallName : "No Foodstall",
        phoneNumber: obj.phoneNumber,
        customerName: obj.customerName,
        review: obj.review,
        
      })),
  };

  return (
    <div>
      <SideNavBar id={7} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("customer_grievance")} />
        <div className="px-2 ">
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={"table-border bg-white tab-content shadow p-2"}>
            <div className="position-realtive">
              <div className="d-flex justify-content-end">
                <div>
                  {/* <button className="t4fbutton-gray-sm" type="button">
                    Export to Excel
                  </button> */}
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

export default CustomerGrievance;

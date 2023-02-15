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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "../../../assets/styles/t4fstyle.scss";
import deleteicon from "../../../assets/icons/delete.png";
import downarrow from "../../../assets/icons/downarrow.png";
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
const Admin_Customer = () => {
  

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [isLoaded, setLoading] = useState(false);
  
  const getUsers = async () => {
    await callApi('/api/admin/getCustomers')
    .then(res => {
      console.log(res);
      setLoading(true);
      setUsers(res.data.data);
    })
  };

  const downloadCustomer = async () => {
    await callApi("/api/admin/downloadCustomers")
    .then(response => {
      console.log(response.headers.filename);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Customers_' + new Date().toISOString() + '.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
}

  useEffect(() => {
    getUsers();

    //setMerchantGrid(merchantGrid.filter((mer) => mer.uniqueNumber != null));
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
        label: t("phone"),
        field: "phoneNumber",
        sort: "disabled",
        width: 100,
      },
      {
        label: t("name"),
        field: "fullName",
        sort: "disabled",
        width: 270,
      },
      {
        label: t("email"),
        field: "email",
        sort: "asc",
        sort: "disabled",
        width: 100,
      }
    ],
    rows:
      users &&
      users.map((user, index) => ({
        
        phoneNumber: user.phoneNumber,
        //foodstallname: obj.foodStalls && obj.foodStalls[0] ? obj.foodStalls[0].foodStallName : "No Foodstall",
        fullName: user.fullName,
        email: user.email,        
      })),
  };

  return (
    <div>
      <SideNavBar id={5} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("Customer")} role={"admin"} />
        <div className="px-2">
          <div>{!isLoaded && <Alert message="Please wait...." type="info" />}</div>

          <div className="table-border bg-white tab-content admin-merchants p-2">
            <div className="position-realtive">
              <div className="d-flex justify-content-end">
                <button className="t4fbutton-gray-sm" type="button" onClick={() => downloadCustomer()}>
                  Export to Excel
                </button>
              </div>
            </div>
            <MDBDataTableV5 hover disableRetreatAfterSorting={true} entriesOptions={[10]} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
          </div>

          <footer className="py-3 px-2">
            <Footer />
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin_Customer;

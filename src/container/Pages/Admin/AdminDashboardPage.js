import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import BarChart from "../Merchant/BarChart";
import CardTile from "../Merchant/CardTile";
import DonutChart from "../Merchant/DonutChart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getSignUpDetails } from "../../../store/authentication/signup/action";
import mall from "../../../assets/icons/mall.png";
import dash_theatre from "../../../assets/icons/dash_theatre.png";
import dash_restaurent from "../../../assets/icons/dash_restaurent.png";
import dash_foodstall from "../../../assets/icons/dash_foodstall.png";
import dash_customer from "../../../assets/icons/dash_customer.png";
import dash_merchant from "../../../assets/icons/dash_merchant.png";
import dash_foodcourt from "../../../assets/icons/dash_foodcourt.png";
import dash_orders from "../../../assets/icons/dash_orders.png";
import { callApi } from "../../../ServiceCall";

const AdminDashboardPage = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const sel_userdetails = useSelector((state) => state.signup);
  const [userDetails, setUserDetails] = useState(sel_userdetails);
  console.log(sel_userdetails);

  const [data, setData] = useState({});

  const dashboard_data = [
    {
      shoppingMalls: 26,
      theaters: 969,
      restaurants: 78,
      totalOrders: 16071,
      totalFoodStalls: 724,
      totalFoodCourts: 50,
      totalMerchants: 610,
      totalCustomers: 8236,
      reportMap: {
        2021: {
          JAN: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          FEB: {
            foodStalls: 100,
            restaurants: 200,
            customers: 500,
          },
          MAR: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          APR: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          MAY: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          JUN: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          JUL: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
          AUG: {
            foodStalls: 12,
            restaurants: 68,
            customers: 699,
          },
        },
      },
      subscriptionsMap: {
        "MAR-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "JUN-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "JUL-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "JAN-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "MAY-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "FEB-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
        "APR-2021": {
          newSubscriptions: 27,
          expired: 16,
          renewal: 25,
        },
      },
      merchantRequestsMap: {
        "MAR-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "JUN-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "JUL-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "JAN-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "MAY-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "FEB-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
        "APR-2021": {
          open: 89,
          inProgress: 500,
          rejected: 7,
          approved: 80,
        },
      },
      cuisinesMap: {
        "APR-2021": {
          northIndian: 100,
          southIndian: 300,
          streetFood: 200,
          italinCusine: 150,
          mexicanCusine: 200,
        },
      },
      merchantVsRevenueMap: {
        "AUG-2021": {
          merchants: 200,
          revenue: 1500,
        },
        "MAR-2021": {
          merchants: 200,
          revenue: 15000,
        },
        "JUN-2021": {
          merchants: 200,
          revenue: 15000,
        },
        "JUL-2021": {
          merchants: 200,
          revenue: 15000,
        },
        "JAN-2021": {
          merchants: 200,
          revenue: 15000,
        },
        "MAY-2021": {
          merchants: 200,
          revenue: 15000,
        },
        "FEB-2021": {
          merchants: 200,
          revenue: 1500,
        },
        "APR-2021": {
          merchants: 200,
          revenue: 1500,
        },
      },
    },
  ];
  useEffect(() => {
    setUserDetails(history.location.state);
    dispatch(getSignUpDetails(props.sel_userdetails));
    getAdminDashboardData();
    console.log("admin1", sel_userdetails);
    console.log("admin2", userDetails);
  }, []);

  const getAdminDashboardData = () => {
    callApi('/api/admin/get-dashboard-data')
    .then(res => {
      console.log(res);
      setData(res.data.data);
    })
  }

  return (
    <div>
      <SideNavBar id={2} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("dashboard")} role={"admin"} />
        {/* <h3>{t("dashboard_title")}</h3> */}
        {/* <div className="card"> */}
        {/* <div className="card-tile"> */}
        <div className="px-2">
          <div id="dashboard_card" className="row">
            {dashboard_data.map((data2) => (
              <>
                <CardTile title={t("shopping-malls")} clas={"col-md-3 card_title"} image={mall} total={data.shoppingMalls}></CardTile>
                <CardTile title={t("theaters")} clas={"col-md-3 card_title"} image={dash_theatre} total={data.theaters}></CardTile> <CardTile title={t("restaurents")} clas={"col-md-3 card_title"} image={dash_restaurent} total={data.restaurants}></CardTile> <CardTile title={t("orders")} clas={"col-md-3 card_title"} image={dash_orders} total={data.totalOrders}></CardTile> <CardTile title={t("food-stalls")} clas={"col-md-3 card_title"} image={dash_foodstall} total={data.totalFoodStalls}></CardTile> <CardTile title={t("food-courts")} clas={"col-md-3 card_title"} image={dash_foodcourt} total={data.totalFoodCourts}></CardTile> <CardTile title={t("merchants")} clas={"col-md-3 card_title"} image={dash_merchant} total={data.totalMerchants}></CardTile> <CardTile title={t("customers")} clas={"col-md-3 card_title"} image={dash_customer} total={data.totalCustomers}></CardTile>
              </>
            ))}
          </div>
          <div className="card my-2 mx-1">
            <div className="p-1">
              {dashboard_data.map((data) => (
                <BarChart l1={t("food-stalls")} l2={t("restaurents")} l3={t("customers")} barchartdata={data.reportMap}></BarChart>
              ))}
            </div>
          </div>
          <div className="row">
            {dashboard_data.map((data) => (
              <>
                <DonutChart name={t("merchants-vs-revenue")} clas={"col-md-6 card_title"} chartdata={data.merchantVsRevenueMap} type="revenue"></DonutChart>
                <DonutChart name={t("subscriptions")} clas={"col-md-6 card_title"} chartdata={data.subscriptionsMap} type="subscription"></DonutChart>
                <DonutChart name={t("merchant-requests")} clas={"col-md-6 card_title"} chartdata={data.merchantRequestsMap} type="request"></DonutChart>
                <DonutChart name={t("cuisines")} clas={"col-md-6 card_title"} chartdata={data.cuisinesMap} type="cuisine"></DonutChart>
              </>
            ))}
          </div>
          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

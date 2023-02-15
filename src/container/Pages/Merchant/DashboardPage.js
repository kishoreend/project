import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";

import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import BarChart from "./BarChart";
import CardTile from "./CardTile";
import DonutChart from "./DonutChart";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../store/authentication/signup/action";
import dash_merchant from "../../../assets/icons/dash_merchant.png";
import upgrade from "../../../assets/icons/upgrade.png";
import { callApi } from "../../../ServiceCall";
const DashboardPage = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  console.log(props.location.state, "dashboard");
  const dispatch = useDispatch();
  const sel_userdetails = useSelector((state) => state.signup);

  const currentFoodstallDetail = useSelector((state) => state.merchant.currentFoodstallDetail);

  console.log(currentFoodstallDetail);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    callApi(`/api/foodstall/get-dashboard?foodstallId=${currentFoodstallDetail.foodStallId}`, 'GET')
    // callApi(`/api/foodstall/get-dashboard?foodstallId=262`, 'GET')
    .then(res => {
      console.log(res.data.data);
      setDashboardData(res.data.data);
    })
  }, [])

  const Merchant_dashboard_data = [
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
      cuisinesMap: null,
      merchantVsRevenueMap: {
        "AUG-2021": {
          merchants: 200,
          revenue: 15000,
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
          revenue: 15000,
        },
        "APR-2021": {
          merchants: 200,
          revenue: 15000,
        },
      },
    },
  ];
  useEffect(() => {
    console.log(sel_userdetails);
  });

  return (
    <div>
      <SideNavBar id={1} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("dashboard")} username={props.location.state === undefined ? "Not Signed in" : props.location.state.username} />
        {/* <h3>{t("dashboard_title")}</h3> */}
        {/* <div className="card"> */}
        {/* <div className="card-tile"> */}
        <div className="px-2">
          <div id="dashboard_card" className="row">
            <CardTile title={t("orders-received")} clas={"col-md-4 card_title"} image={dash_merchant} total={dashboardData.allOrders}></CardTile>
            <CardTile title={t("completed-orders")} clas={"col-md-4 card_title"} image={dash_merchant} total={dashboardData.deliveredOrders}></CardTile>
            <CardTile title={t("cancelled-received")} clas={"col-md-4 card_title"} image={dash_merchant} total={dashboardData.cancelledOrders}></CardTile>

            <CardTile title={t("open-orders")} clas={"col-md-4 card_title"} image={dash_merchant} total={dashboardData.openOrders}></CardTile>
            <CardTile title={t("present-day-orders")} clas={"col-md-4 card_title"} image={dash_merchant} total={dashboardData.todayOrders}></CardTile>
            <CardTile title={t("subscriptions")} clas={"col-md-4 card_title"} image={dash_merchant} link={"Upgrade"} linkimg={upgrade} total={dashboardData.subscription}></CardTile>
          </div>
          <div className="card my-2 mx-1">
            <div className="p-1">
              {Merchant_dashboard_data.map((data) => (
                <BarChart l1={t("orders-completed")} l2={t("orders-cancelled")} l3={t("orders-received")} barchartdata={{"2022": {...dashboardData.orderStatistics}}}></BarChart>
              ))}
            </div>
          </div>
          <div className="row">
            {Merchant_dashboard_data.map((data) => (
              <>
                {/* <DonutChart name={t("order-vs-revenue")} clas={"col-md-4 card_title"} chartdata={data.merchantVsRevenueMap} type="revenue"></DonutChart>
                <DonutChart name={t("popular-food")} clas={"col-md-4 card_title"} chartdata={data.merchantRequestsMap} type="request"></DonutChart>
                <DonutChart name={t("popular-days")} clas={"col-md-4 card_title"} chartdata={data.subscriptionsMap} type="subscription"></DonutChart> */}
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

export default DashboardPage;

import React, { Component, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
const BarChart = (props) => {
  const [value, onChange] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  console.log(props.barchartdata);
  console.log("year", props.barchartdata);
  const barchartData = props.barchartdata;
  var allMonths = [];
  var deliveredOrders = [];
  var cancelledOrders = [];
  var recievedOrders = [];

  // const fetchData = barchartData.map((report) => {
  // to get the years
  if (barchartData) {
    console.log(barchartData);
    const reportYear = Object.keys(barchartData);
    reportYear.forEach((key, index) => {
      //console.log(barchartData[key]);
      // to get the months
      const Months = Object.keys(barchartData[key]);
      Object.values(Months).forEach((val) => allMonths.push(val));

      const dataInMonths = barchartData[key];
      Object.values(dataInMonths).forEach((val) => {
        deliveredOrders.push(val.deliveredOrders);
        cancelledOrders.push(val.cancelledOrders);
        recievedOrders.push(val.recievedOrders);
        //console.log(foodStalls);
        //console.log(customers);
      });

      // console.log(Object.keys[Months]);
    });
  }
  // }
  // );
  const { t } = useTranslation();
  const data = {
    series: [
      {
        name: "Cancelled",
        data: cancelledOrders,
      },
      {
        name: "Delivered",
        data:  deliveredOrders,
      },
      {
        name: "Recieved",
        data: recievedOrders,
      },
    ],
    options: {
      plotOptions: {
        bar: {
          columnWidth: "30%",
          //barHeight: "10%",
          borderRadius: 4,
          dataLabels: {
            position: "bottom", // top, center, bottom
          },
        },
      },
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },

      colors: ["rgb(168,218,220)", "rgb(69,123,157)", "rgb(255,135,144)"],
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: allMonths,
      },
      legend: {
        show: false,
      },
    },
  };
  return (
    <div id="dashboard_barchart">
      <div className="white dash_title">
        <div className="d-flex ">
          <div className="p-2 flex-grow-1">
            <b>{t("reports")}</b>
          </div>
          <div className="p-2 d-flex align-items-center">
            {" "}
            <div className="dot color-dgreen"> </div>
            <div>{props.l1}</div>
          </div>
          <div className="p-2 d-flex align-items-center">
            {" "}
            <div className="dot color-lgreen"> </div>
            <div>{props.l2}</div>
          </div>
          <div className="p-2 d-flex align-items-center">
            {" "}
            <div className="dot color-pink"> </div>
            <div>{props.l3}</div>
          </div>
          <div className="p-2">
            <select className="t4finput-dropdown" onClick={(e) => setToggle((toggle) => !toggle)}>
                <option value="">2022</option>
            </select>
            {/* <div className={toggle ? "" : "d-none"}>
              {" "}
              <Calendar className="bg-white position-absolute end-0 zindex" onChange={(e) => (onChange, setToggle((toggle) => !toggle))} value={value} />
            </div> */}
          </div>
        </div>
      </div>
      <div id="das_barchart">
        <ReactApexChart options={data.options} series={data.series} type="bar" height="250" className="barchart"/>
      </div>
    </div>
  );
};

export default BarChart;

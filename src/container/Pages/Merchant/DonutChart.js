import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = (props) => {
  const chartData = props.chartdata;
  const type = props.type;
  const yearmonth = "APR-2021";
  var allLabels = [];
  var allseries = [];

  if (chartData) {
    const reportYear = Object.keys(chartData);
    reportYear.forEach((key, index) => {
      if (key == yearmonth) {
        const Label = Object.keys(chartData[yearmonth]);
        // Object.values(Label).forEach((val) => allLabels.push(val));
        const value = chartData[yearmonth];
        let keyValues = [
          { key1: "merchants", key2: "revenue" },
          { key1: "newSubscriptions", key2: "expired", key3: "renewal" },
          { key1: "open", key2: "inProgress", key3: "rejected", key4: "approved" },
          { key1: "northIndian", key2: "southIndian", key3: "streetFood", key4: "italinCusine", key5: "mexicanCusine" },
        ];

        console.log(keyValues, "key values");
        if (type === "subscription") {
          // console.log("revenue value", value[keyValues.key1]);
          // console.log("revenue value", value[keyValues.key2]);
          allLabels.push(keyValues[1].key1);
          allLabels.push(keyValues[1].key2);
          allLabels.push(keyValues[1].key3);
          allseries.push(value[keyValues[1].key1]);
          allseries.push(value[keyValues[1].key2]);
          allseries.push(value[keyValues[1].key3]);
          console.log(allLabels, "all labels");
          console.log(allseries, "all series");
        }
        if (type === "revenue") {
          allLabels.push(keyValues[0].key1);
          allLabels.push(keyValues[0].key2);
          allseries.push(value[keyValues[0].key1]);
          allseries.push(value[keyValues[0].key2]);
        }
        if (type === "request") {
          allLabels.push(keyValues[2].key1);
          allLabels.push(keyValues[2].key2);
          allLabels.push(keyValues[2].key3);
          allLabels.push(keyValues[2].key4);
          allseries.push(value[keyValues[2].key1]);
          allseries.push(value[keyValues[2].key2]);
          allseries.push(value[keyValues[2].key3]);
          allseries.push(value[keyValues[2].key4]);
        }
        if (type === "cuisine") {
          allLabels.push(keyValues[3].key1);
          allLabels.push(keyValues[3].key2);
          allLabels.push(keyValues[3].key3);
          allLabels.push(keyValues[3].key4);
          allLabels.push(keyValues[3].key5);
          allseries.push(value[keyValues[3].key1]);
          allseries.push(value[keyValues[3].key2]);
          allseries.push(value[keyValues[3].key3]);
          allseries.push(value[keyValues[3].key4]);
          allseries.push(value[keyValues[3].key5]);
        }
      }
      // console.log("donut value", value["approved"]);
      // console.log("donut label value", Label);
      // console.log('all data', allLabels)
    });
  }

  const data = {
    series: allseries,
    options: {
      labels: allLabels,
      colors: ["#FE912B", "#FF5C4D", "#467C9D", "#62C8CF", "#2BCC5F", "#FEC760"],
      dataLabels: {
        enabled: false,
      },
      chart: {
        width: 1,
      },
      legend: {
        show: true,
        position: "right",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        //fontSize: "14px",
        offsetX: 0,
        offsetY: 0,
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              height: 240,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };
  return (
    <div className={props.clas}>
      <div className="white dash_title">
        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            <b>{props.name}</b>
          </div>

          <div className="p-2">
            <select className="t4finput-dropdown">
              <option value="">2020</option>
              <option value="">2021</option>
              <option value="">2022</option>
            </select>
          </div>
        </div>
      </div>
      <ReactApexChart options={data.options} series={data.series} type="donut" height="200" />
    </div>
  );
};

export default DonutChart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/VerticalLayout/Header";
import SideNavBar from "../../../../components/VerticalLayout/SideNavBar";
import "../../../../assets/styles/t4fstyle.scss";
import CreateUpdateProfile from "./CreateUpdateProfile";
import { useSelector } from "react-redux";
import { callApi } from "../../../../ServiceCall";

const ViewProfile = (props) => {
  const { t } = useTranslation();
  let title = t("my_profile");
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);

  const selectedFoodstallDtl =
    useSelector((state) => state.merchant.currentFoodstallDetail) || {};

    console.log(selectedFoodstallDtl)
  const toggle = (tab) => {

    if(selectedFoodstallDtl.foodStallId){
      getFoodStallTimings(selectedFoodstallDtl.foodStallId);
    }
    
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if(selectedFoodstallDtl.foodStallId){
      getFoodStallTimings(selectedFoodstallDtl.foodStallId);
    }
  }, [setActiveTab]);

  const [foodstallTimings, setFoodStallTimings] = useState([]);

  const getFoodStallTimings = async (fsId) => {
    await callApi(`/api/foodstall/${fsId}/get-foodstall-timings`, "GET")
    .then(timingsResponse => {
      setFoodStallTimings(timingsResponse.data.data.days)
    });

    console.log('FoodStall Timings, ' , foodstallTimings);
  }

  const updateFoodstallTimings = (timings) => {
    setFoodStallTimings(timings);
  }

  return (
    <div>
      <div className="px-2 ">
        <div className="profile-tabs bg-white">
          <ul className="nav">
            <li className="nav-item" onClick={() => toggle(1)}>
              <a className={activeTab === 1 ? "tab-nav-link active" : "tab-nav-link"}>{t("view_profile")}</a>
            </li>
            <li className="nav-item" onClick={() => toggle(2)}>
              <a className={activeTab === 2 ? "tab-nav-link active" : "tab-nav-link"}>{t("update_or_create_profile")}</a>
            </li>
          </ul>
          <div className={activeTab === 1 ? "active-tab-content profile-tabs" : "inactive profile-tabs"}>
            <div className="p-2">
              {/* view */}
              <CreateUpdateProfile edit={false} toggle={toggle} role={props.role} foodstallTimings={foodstallTimings} updateFoodstallTimings={updateFoodstallTimings}></CreateUpdateProfile>
            </div>
          </div>
          <div className={activeTab === 2 ? "active-tab-content profile-tabs" : "inactive profile-tabs"}>
            <div className="p-2">
              {/* update profile */}
              <CreateUpdateProfile edit={true} toggle={toggle} role={props.role} foodstallTimings={foodstallTimings} updateFoodstallTimings={updateFoodstallTimings}></CreateUpdateProfile>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import ViewProfile from "./Components/ViewProfile";

const MyProfile = () => {
  const { t } = useTranslation();
  let title = t("my_profile");
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);
  const toggle = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {}, [setActiveTab]);

  return (
    <div>
      <SideNavBar id={2} />

      <div className="merchange-content">
        <Header title={title} />
        <ViewProfile toggle={toggle}/>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MyProfile;

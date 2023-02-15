import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import hand from "../../../assets/icons/hand.png";
import diamond from "../../../assets/icons/diamond.png";
import star from "../../../assets/icons/star.png";
import crown from "../../../assets/icons/crown.png";
import config from "../../../container/app/navigation.json";
import Subscription_ from "./Components/Orders/Subscriptions";
const Subscription = () => {
  const { t } = useTranslation();
  //let title = t("my_profile");
  let title = "Subscription";

  return (
    <div>
      <SideNavBar id={6} />

      <div className="merchange-content">
        <Header title={title} />
        <div className="mx-2">
          <Subscription_ />
        </div>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Subscription;

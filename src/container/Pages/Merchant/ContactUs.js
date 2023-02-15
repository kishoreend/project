import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Contact from "./Components/ContactUs";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SideNavBar id={12} />

      <div className="merchange-content">
        <Header title={t("contact_us")} />

        <div className="mx-2">
          <Contact />
        </div>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;

import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Link, useHistory } from "react-router-dom";
import { Accordion, AccordionContext } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import qrcode_customer from "../../../assets/icons/qrcode_customer1.png";
import leftarrow from "../../../assets/icons/left-arrow.png";
import user_login from "../../../assets/icons/user_login.png";
import logo from "../../../assets/icons/logo.png";
import config from "../../../container/app/navigation.json";
const Customer_ScanQR = () => {
  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            {/* <SideNavBar login={false} /> */}
            <div className="mobile_header_gray p-2">
              <div className="text-center">
                <b>Welcome to Tap 4 food</b>
              </div>
            </div>
            <div className="text-center">
              <img src={logo} height="80" className="p-1" />
            </div>
            <div className="text-center">
              <img src={"https://trydemoo.com/tap4food/images/QRCodes/2.png"} className="border rounded img-fluid p-5" />
            </div>
            <div className="w-100 text-center mt-2">
              <p className="tf4_linklabel_mobile">
                {" "}
                <h6>Scan QR code to begin</h6>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_ScanQR;

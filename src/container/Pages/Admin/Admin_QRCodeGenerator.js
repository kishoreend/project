import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import QRCodeLists from "./Components/QRCodeLists";

const TabContent = () => {
  return (
    <div>
      <div className="food-menu-tabs">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-roles" type="button" role="tab" aria-controls="pills-roles" aria-selected="true">
              QR codes
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-roles" role="tabpanel" aria-labelledby="pills-home-tab">
          <QRCodeLists />
        </div>
      </div>
    </div>
  );
};
const Admin_QRCodeGenerator = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SideNavBar id={14} role={"admin"} />
      <div className="merchange-content">
        <Header title="QR Code Generator" role={"admin"} />
        <div className="p-2">
          <TabContent></TabContent>
          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin_QRCodeGenerator;

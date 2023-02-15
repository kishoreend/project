import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import Notifications from "./Components/Notifications";
import Announcements from "./Components/Announcements";

const TabContent = () => {
  return (
    <div>
      <div className="food-menu-tabs">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-roles" type="button" role="tab" aria-controls="pills-roles" aria-selected="true">
              Notifications
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-rolesconfigure" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
              Announcements
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-roles" role="tabpanel" aria-labelledby="pills-home-tab">
          <Notifications />
        </div>
        <div className="tab-pane fade" id="pills-rolesconfigure" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Announcements />
        </div>
      </div>
    </div>
  );
};
const Admin_Notificaitons = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SideNavBar id={7} role={"admin"} />
      <div className="merchange-content">
        <Header title={t("notifications")} role={"admin"} />
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

export default Admin_Notificaitons;

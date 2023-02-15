import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import ViewOffers from "./Components/FoodMenu/ViewOffers";
import AddCreateMenu from "./Components/FoodMenu/AddCreateMenu";
import View_Menu from "./Components/FoodMenu/View_Menu";
import Pricing from "./Components/FoodMenu/Pricing";
import { useLocation } from "react-router-dom";

const TabContent = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(1);
  const {t} = useTranslation();

  const handleCurrentTab = (tabNum) => {
    setCurrentTab(tabNum);
  }
  
  return (
    <div>
      <div className="food-menu-tabs">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation" onClick={() => setCurrentTab(1)}>
            <button className={location?.fromAddFoodItem === true ? "nav-link" : "nav-link active"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-viewmenu" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >
              {t('Viewmenu')}
            </button>
          </li>
          <li className="nav-item" role="presentation" onClick={() => setCurrentTab(2)}>
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
            {t('Viewoffers')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button onClick={() => setCurrentTab(3)} className={location?.fromAddFoodItem === true ? "nav-link active" : "nav-link"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
              {t('add/create_menu')}
            </button>
          </li>{" "}
          <li className="nav-item" role="presentation">
            <button onClick={() => setCurrentTab(4)} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pricing" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
              {t('pricing')}
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        
        {currentTab == 1 && (
          <div className={location?.fromAddFoodItem === true ? "tab-pane fade" : "tab-pane fade active show"} id="pills-viewmenu" role="tabpanel" aria-labelledby="pills-home-tab">
          {/* <View_Menu /> */}
          <View_Menu />
        </div>
        )}

        {currentTab == 2 && (
          // <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div>
            <ViewOffers handleCurrentTab={handleCurrentTab}></ViewOffers>
          </div>
        )}

        {currentTab == 3 && (
          // <div className={location?.fromAddFoodItem === true ? "tab-pane fade active show" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <AddCreateMenu handleCurrentTab={handleCurrentTab} fromAddFoodItem={location?.fromAddFoodItem === true ? true : false}></AddCreateMenu>
          // </div>
        )}

        {currentTab == 4 && (
          // <div className="tab-pane fade" id="pricing" role="tabpanel" aria-labelledby="pills-contact-tab">
            <Pricing></Pricing>
          // </div>
        )}       
        
      </div>
    </div>
  );
};
const FoodMenu = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SideNavBar id={3} />

      <div className="merchange-content">
        <Header title={t("food_menu")} />
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

export default FoodMenu;

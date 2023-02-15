import React from "react";
import CreateListing from "./CreateListing";
import CreateFoodItem from "./CreateFoodItem";
import CreateOffer from "./CreateOffer";
import { useTranslation } from "react-i18next";

const AddCreateMenu = (props) => {

  const {t} = useTranslation();
 
  const handleCurrentTab = (tabNum) => {
    props.handleCurrentTab(tabNum);
  }

  return (
    <>
      <div className="underline-tab px-1">
        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={props?.fromAddFoodItem === true ? "nav-link " : "nav-link active"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#create-listing" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
              {t('create_listing')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={props?.fromAddFoodItem === true ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#create-food-item" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
            {t('create_food_item')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#create-offers" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
              {t('create_Offers')}
            </button>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="createListing">
        <div className={props?.fromAddFoodItem === true ? "tab-pane fade " : "tab-pane fade active show"} id="create-listing" role="tabpanel" aria-labelledby="pills-home-tab">
          <CreateListing></CreateListing>
        </div>
        <div className={props?.fromAddFoodItem === true ? "tab-pane fade active show" : "tab-pane fade"} id="create-food-item" role="tabpanel" aria-labelledby="pills-profile-tab">
          <CreateFoodItem role={props.role}></CreateFoodItem>
        </div>
        <div className="tab-pane fade" id="create-offers" role="tabpanel" aria-labelledby="pills-contact-tab">
          <CreateOffer handleCurrentTab={handleCurrentTab}/>
        </div>
      </div>
    </>
  );
};

export default AddCreateMenu;

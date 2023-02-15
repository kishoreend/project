import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import call from "../../assets/icons/call.png";
import downarrow from "../../assets/icons/downarrow.png";
import sample from "../../assets/icons/sample.png";
import config from "../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_LOGOUT } from "../../store/admin/actionTypes";
import { MERCHANT_LOGOUT } from "../../store/authentication/signup/actionTypes";
import { CLEAR_MERCHANT_DETAILS_ON_LOGOUT } from "../../store/authentication/merchant/actionTypes";
import { useTranslation } from "react-i18next";

const Profile = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profilePicture = useSelector((state) => state.merchant.profilePicture);
  const signOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("fullMobileNumber");
    localStorage.removeItem("page");
    if (props?.role === "admin") {
      dispatch({ type: ADMIN_LOGOUT });
      dispatch({ type: CLEAR_MERCHANT_DETAILS_ON_LOGOUT });
      window.localStorage.clear();
      localStorage.removeItem("persist:root");
      history.push(config.adminurl.Admin_CreateLoginPage);
    } else {
      dispatch({ type: MERCHANT_LOGOUT });
      dispatch({ type: CLEAR_MERCHANT_DETAILS_ON_LOGOUT });
      dispatch({ type: ADMIN_LOGOUT });
      window.localStorage.clear();
      localStorage.removeItem("persist:root");
      history.push(config.merchanturl.CreateLoginPage);
    }
  };
  const changePassword = () => {
    if (props?.role === "admin") {
      history.push(config.adminurl.Admin_ChangePasswordPage);
    } else {
      history.push(config.merchanturl.ChangePasswordPage);
    }
  };

  const [menu, setMenu] = useState(false);
  const [lng, setLng] = useState("English");
  const [flag, setFlag] = useState(call);
  console.log(props, "profile");

  const toggle = (props) => {
    // this.setState((prevState) => ({
    //   menu: !prevState.menu,
    // }));
    setMenu(!menu);
  };

  const changeLanguageAction = (lng) => {
    //set the selected language to i18n
    //i18n.changeLanguage(lng);

    if (lng === "ar") {
      setLng("Arabic");
      setFlag(call);
    } else if (lng === "eng") {
      setLng("English");
      setFlag(call);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth")) === 1) {
      if (window.location.href.contains("admin") > -1) {
        history.push(config.adminurl.Admin_CreateLoginPage);
      } else {
        history.push(config.merchanturl.CreateLoginPage);
      }
    }
  }, []);
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-sm-inline-block text-small">
        <DropdownToggle tag="button" className="btn header-item waves-effect">
          <span className="">
            <img height="30" className="headerlabelbox-profile-image" src={props?.role === "admin" ? sample : profilePicture ? profilePicture : sample}></img>
            {/* <img src={sample} alt="profileimage" height="30" /> */}
          </span>{" "}
          <span className="align-middle text-small display-none-mobile">
            {props?.role === "admin" ? t("welcome") : t("welcome")} {JSON.parse(localStorage.getItem("auth"))?.username !== null ? JSON.parse(localStorage.getItem("auth"))?.username : ""} <img className="" src={downarrow} alt="downarrow" height="5" />
          </span>
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem href="" className="notify-item py-2 bottomborder" onClick={changePassword}>
            <span className="align-middle text-small">Change Password</span>
          </DropdownItem>

          <DropdownItem href="" className="notify-item py-2" onClick={signOut}>
            <span className="align-middle text-small">Sign Out</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default Profile;

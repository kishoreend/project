import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./header.scss";
import { useTranslation } from "react-i18next";
import logo from "../../assets/icons/logo.png";
import dashboard from "../../assets/icons/dashboard.png";
import question from "../../assets/icons/question.png";
import contactus from "../../assets/icons/contactus.png";
import terms from "../../assets/icons/terms.png";
import privacy from "../../assets/icons/privacy.png";
import cus_gre from "../../assets/icons/cus_gre.png";
import notifications from "../../assets/icons/notifications.png";
import orders from "../../assets/icons/orders.png";
import subscription from "../../assets/icons/subscription.png";
import orderhistory from "../../assets/icons/orderhistory.png";
import user_white from "../../assets/icons/user_white.png";
import food_menu from "../../assets/icons/food_menu.png";
import settings from "../../assets/icons/settings.png";
import feedback from "../../assets/icons/feedback.png";
import roles from "../../assets/icons/roles.png";
//admin
import about from "../../assets/icons/about.png";
import merchant from "../../assets/icons/merchant.png";
import customer from "../../assets/icons/customer.png";
import qrcode from "../../assets/icons/qrcode.png";
import approval from "../../assets/icons/file.png";
import { useHistory } from "react-router-dom";
import config from "../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
const SideNavBar = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const { manager } = useSelector((state) => state.merchant.merchants);
  const history = useHistory();
  const { t } = useTranslation();
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const [activeItem, setActiveItem] = useState(true);
  const [activeID, setActiveID] = useState(1);

  const MerchantMenus = [
    {
      id: 1,
      name: t("Dashboard"),
      link: config.merchanturl.Merchant_DashboardPage,
      image: dashboard,
    },
    {
      id: 2,
      name: t("My_Profile"),
      link: config.merchanturl.MyProfile,
      image: user_white,
    },
    {
      id: 3,
      name: t("Food_Menu"),
      link: config.merchanturl.FoodMenu,
      image: food_menu,
    },
    {
      id: 4,
      name: t("Orders"),
      link: config.merchanturl.Orders,
      image: orders,
    },
    {
      id: 5,
      name: t("Order_History"),
      link: config.merchanturl.OrderHistory,
      image: orderhistory,
    },
    {
      id: 6,
      name: t("Subscriptions"),
      link: config.merchanturl.Subscription,
      image: subscription,
    },
    {
      id: 7,
      name: t("Customer_Grievance"),
      link: config.merchanturl.CustomerGrievance,
      image: cus_gre,
    },

    // {
    //   id: 14,
    //   //name: t("roles"),
    //   name: "Stall Managers",
    //   link: config.merchanturl.Merchant_Roles,
    //   image: roles,
    // },
    {
      id: 8,
      name: t("Notifications"),
      link: config.merchanturl.Notifications,
      image: notifications,
    },
    {
      id: 9,
      name: t("FAQ"),
      link: config.merchanturl.Merchant_FAQ,
      image: question,
    },
    {
      id: 10,
      name: t("Feedback"),
      link: config.merchanturl.Feedback,
      image: feedback,
    },
    {
      id: 11,

      name: t("Terms & Conditions"),
      link: config.merchanturl.TermsAndConditions,
      image: terms,
    },
    {
      id: 12,

      name: t("Privacy Policy"),
      link: config.merchanturl.PrivacyPolicy,
      image: privacy,
    },
    {
      id: 13,
      name: t("Contact Us"),
      link: config.merchanturl.ContactUs,
      image: contactus,
    },
    {
      id: 14,
      name: t("Settings"),
      link: config.merchanturl.Settings,
      image: settings,
    },
  ];

  const AdminMenus = [
    {
      id: 2,
      name: t("dashboard"),
      link: config.adminurl.Admin_Dashboard,
      image: dashboard,
    },
    {
      id: 13,
      name: t("merchant-requests"),
      link: config.adminurl.Admin_Merchant_Requests,
      image: merchant,
    },
    {
      id: 3,
      name: t("merchants"),
      link: config.adminurl.Admin_Merchants,
      image: merchant,
    },
    {
      id: 14,
      name: "QR Code Generator",
      link: config.adminurl.Admin_QRCodeGenerator,
      image: qrcode,
    },
    {
      id: 5,
      name: t("customers"),
      link: config.adminurl.Admin_Customer,
      image: customer,
    },
    {
      id: 7,
      name: t("notifications"),
      link: config.adminurl.Admin_Notificaitons,
      image: cus_gre,
    },
    {
      id: 8,
      name: t("roles"),
      link: config.adminurl.Admin_Roles,
      image: roles,
    },
    {
      id: 16,
      name: "Master Data",
      link: config.adminurl.Admin_Inventory,
      image: settings,
    },
    {
      id: 6,
      name: t("subscriptions"),
      link: config.adminurl.Admin_Subscription,
      image: subscription,
    },
    {
      id: 1,
      name: t("about-us"),
      link: config.adminurl.Admin_AboutUs,
      image: about,
    },
    
    
    // {
    //   id: 4,
    //   name: t("order_history"),
    //   link: config.adminurl.Admin_OrderHistory,
    //   image: orders,
    // },
    
    
    
    // {
    //   id: 15,
    //   name: "Approvals",
    //   link: config.adminurl.Admin_Approvals,
    //   image: approval,
    // },
    
    {
      id: 9,
      name: t("faq"),
      link: config.adminurl.Admin_FAQ,
      image: question,
    },
    {
      id: 10,
      name: t("terms_and_conditions"),
      link: config.adminurl.Admin_TermsandCondition,
      image: terms,
    },
    {
      id: 11,

      name: t("grievance"),
      link: config.adminurl.Admin_Grievance,
      image: orders,
    },
    {
      id: 12,
      name: t("inbox"),
      link: config.adminurl.Admin_Inbox,
      image: contactus,
    },
    
  ];

  const Menus = props?.role == "admin" ? AdminMenus : MerchantMenus;
  return (
    <>
      <div id="header" className={menuCollapse && "collapsed"}>
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar
          collapsed={menuCollapse}
          toggled={true}
          onMouseLeave={() => {
            setMenuCollapse(true);
          }}
          onMouseOver={() => {
            setMenuCollapse(false);
          }}
        >
          <SidebarHeader>
            <div className="logotext p-2">
              <a onClick={menuIconClick}>
                <img src={logo} height="60" />
              </a>
            </div>
          </SidebarHeader>
          <SidebarContent className={props?.role == "admin" ? "adminsidebar_bg overflow-scroll" : ""}>
            <Menu>
              {Menus.map((menu) =>
                menu.id === 14 && manager === true ? (
                  ""
                ) : (
                  <MenuItem active={menu.id === props.id} icon={<img src={menu.image} height="15" />} key={menu.id} onClick={(e) => (setActiveItem(true), setActiveID(e.target.key), history.push(menu.link))}>
                    {menu.name}
                  </MenuItem>
                )
              )}
              {/* <MenuItem onClick={() => setActiveItem(true)}
                active={activeItem}
                icon={<img src={dashboard} height="15" />}
              >
                DashboardPage
              </MenuItem> */}
            </Menu>
          </SidebarContent>
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
        </ProSidebar>
      </div>
    </>
  );
};

export default SideNavBar;

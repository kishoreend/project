import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { AvForm, FormGroup, AvField, Col, Row } from "availity-reactstrap-validation";
import OtpInput from "react-otp-input";
import Alert from "../../../components/Common/Alert";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import search_dark from "../../../assets/icons/search_dark.png";
import foodstall_default from "../../../assets/icons/foodstall.jpg";

import burger from "../../../assets/icons/burger.png";
import kfc from "../../../assets/icons/kfc.png";
import inorbit from "../../../assets/icons/inorbit.png";
import { getData, postData, reduxPostData } from "../../../ServiceCall";
import greater_arrow from "../../../assets/icons/greater_arrow.png";
import rectangle from "../../../assets/icons/Rectangle.png";
import language from "../../../assets/icons/language.png";
import config from "../../../container/app/navigation.json";
import { useDispatch, useSelector } from "react-redux";
import * as userActionTypes from "../../../store/customer/actionTypes";
import * as REDUX_ACTION from "../../../store/customer/action";
import Profile from "./Profile";

let Shops = [];

const Customer_Home = () => {
  const [otpMsg, setotpMsg] = useState(0);
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const userData = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const activeFC = useSelector(state => state.customer.activeFC)

  console.log('userData', userData)

  const handleChange = (otpMsg) => {

    setotpMsg(otpMsg);
  };
  const message = "Shop list";
  const handleSubmit = () => { };

  useEffect(() => {
    console.log("test", userData, activeFC);
    localStorage.removeItem('selfStallId');

    dispatch(REDUX_ACTION.setActiveFs(-1));
    dispatch(REDUX_ACTION.setActiveMenuItem('home'))

    dispatch(getStalls());
  }, []);

  const loadFoodCourtDetails = () => {

  }

  const getStalls = () => async (dispatch) => {
    console.log("in getStalls");
    let validationMessage = "";
    let type = "info";

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/', '_');
    console.log(timezone);

    setIsLoaded((isLoaded) => !isLoaded);
    let result = await getData("/api/customer/get-foodstalls?fcId=" + activeFC.foodCourtId + "&timezone=" + timezone, "get", "customer")
      .then((response) => {
        if (response.status === 200) {
          console.log("foodstalls1", response);
          const foodStalls = response.data && response.data.data;
          Shops = foodStalls.map((foodStall) => {
            return {
              shop_id: foodStall.foodStallId,
              shop_image: foodStall.foodStallPics ? foodStall.foodStallPics[0] : foodstall_default,
              shop_name: foodStall.foodStallName,
              arrow: greater_arrow,
              deliverTime: foodStall.deliveryTime,
              foodCourtName: foodStall.foodCourtName,
              isOpened: foodStall.isOpened,
              tax: foodStall.tax
            };
          });

          dispatch({
            type: userActionTypes.FOODSTALLS_DETAILS_LOADED,
            payload: Shops,
          });

          localStorage.setItem("foodStalls", JSON.stringify(Shops));

          history.push(config.customerurl.CustomerHome);
        } else {
          console.log("else", response);
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        type = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    //setGuiMsg(validationMessage);
    setIsLoaded((isLoaded) => !isLoaded);
  };
  return (
    <>
      <div className="mobile_wrapper_menu">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar />
            {/* <div className="mobile_header_white p-1" style={{
              fontSize: '20px',
              backgroundColor: '#223554',
              color: 'white',
              padding: '15px'
            }}>
               
              {userData.activeFC && userData.activeFC.buName}
            </div> */}
            <Profile />
            <div className="mobile_header_gray">
              <div className="p-2">
                <span>              {userData.activeFC && userData.activeFC.foodCourtName}
                </span>
                <div id="searchbox" className="input-group mb-1 mt-1">
                  <div className="input-group-prepend">
                    {/* <span className="input-group-text">
                      <img src={search_dark} height="20" />
                    </span> */}
                  </div>
                  {/* <input id="search" type="text" className="form-control" placeholder="Search Restaurant, Food Items" aria-label="Username" aria-describedby="basic-addon1" /> */}
                </div>
              </div>
            </div>
            <div className="mobile_header_white p-3">
              <span>Restaurants around you</span>
            </div>

            <div className="mobile_header_white d-flex menuitemsbolock">
              {isLoaded ? <Alert message={"Please wait while we are fetching food stalls.."} type={type} /> : <Alert message={guiMsg} type={type} />}
              {userData.foodStalls.map((shop) => {
                
                return (
                  shop.isOpened ? (
                    <div className="itembox">
                      <a className="mobileDarkLink menuitem"
                        href={config.customerurl.Customer_Menu + "?fs-id=" + shop.shop_id}>
                        <div className="items">
                          <img className="" src={shop.shop_image} weight="100%" height="auto" />
                        </div>
                      </a>
                    </div>
                  ) : (
                    <div className="itembox" style={{
                      opacity: 0.5
                    }}>
                      <a className="mobileDarkLink menuitem closed" >
                        <div className="items">
                          <img className="" src={shop.shop_image} weight="100%" height="auto" />
                        </div>
                      </a>
                    </div>
                    // <a className="mobileDarkLink" href="#temp_closed">
                    //   <div className="d-flex cus_home_shoplist">
                    //     <div className="w-25">

                    //       <img className="shopimage" src={shop.shop_image} height="30" />
                    //     </div>
                    //     <div className="flex-fill text-left align-self-center">{shop.shop_name}</div>
                    //     <div className="ml-auto">
                    //       <button className="btn btn-danger btn-sm" style={{ color: 'white' }}>Temporarily Closed</button>
                    //     </div>
                    //   </div>
                    // </a>
                  )


                )
              })}
            </div>
            {/* <div className="d-flex p-2">
              <div className="w-50 p-2">
                <img className="tile" src={burger} weight="100%" height="auto" />
              </div>
              <div className="w-50 p-2">
                <img className="tile" src={burger} weight="100%" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_Home;

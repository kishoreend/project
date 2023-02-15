import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import close from "../../../../assets/icons/close.png";
import tick from "../../../../assets/icons/tick.png";
import config from "../../../../container/app/navigation.json";
import Timekeeper from "react-timekeeper";

const ProfileCreatedPop = (props) => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [toggle, setToggle] = React.useState(false);
  const navFoodmenu = () => {
    // history.push(config.merchanturl.FoodMenu);
    if (props.role != undefined || props.role === "admin") {
      history.push({
        pathname: config.adminurl.AdminMerchants_FoodStall,
        fromAddFoodItem: true,
        role: "admin",
      });
    } else {
      history.push({
        pathname: config.merchanturl.FoodMenu,
        fromAddFoodItem: true,
      });
    }
  };
  return (
    <div id="profile-updatepop">
      <div>
        <div>
          {" "}
          <Row>
            <Col lg={12} className="text-align-center">
              <div className="mt-4 text-center">
                <img src={tick} height="50  " />
                <div className="mt-2 h5">Your Profile has been saved successfully!</div>
              </div>
              {/* <div className="mt-4 text-center">
                <button color="primary" className=" t4fbutton-gray" type="button" onClick={(e) => setToggle((toggle) => !toggle)}>
                  {!isLoaded ? "Request for Approval" : "Please Wait..."}
                </button>{" "}
                <button color="primary" className="t4fbutton-gray" onClick={navFoodmenu} type="button">
                  Add Food Menu
                </button>
                <div className="mt-4 mb-4 ">
                  {" "}
                  <div color="primary" className={toggle ? "t4fbutton-gray" : "d-none"}>
                    Sent for Approval
                  </div>
                </div>
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreatedPop;

import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "./Alert";
import addblue from "../../assets/icons/addblue.png";
import tick from "../../assets/icons/tick.png";
import Timekeeper from "react-timekeeper";
import config from "../../container/app/navigation.json";
const CreateofferAddSuccess = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const history = useHistory();
  const handleSubmit = () => {};
  const viewmenu = () => {
    //history.push(config.merchanturl.FoodMenu);
  };
  return (
    <div>
      <div className="fixedContainer ">
        <Row>
          <Col lg={12} className="text-align-center">
            <div className="mt-4 text-center">
              <img src={tick} height="60  " />
              <div className="mt-2">Offer Created Successfully!</div>
            </div>
            <div className="mt-4 text-center">
              {/* <button color="primary" className=" t4fbutton-gray" type="button">
                {!isLoaded ? "Request for Approval" : "Please Wait..."}
              </button>{" "} */}
              <button color="primary" className="t4fbutton-gray" type="button" onClick={(e) => props.toggle()}>
                View Offers
              </button>
              {/* <a href={props.role === undefined && props.role !== "admin" ? config.merchanturl.FoodMenu : ""} className={props.role === undefined && props.role !== "admin" ? "" : "d-none"}>
                <button color="primary" className="t4fbutton-gray" type="button">
                  Close
                </button>
              </a> */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateofferAddSuccess;

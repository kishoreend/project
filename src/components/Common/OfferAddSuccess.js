import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "./Alert";
import addblue from "../../assets/icons/addblue.png";
import tick from "../../assets/icons/tick.png";
import Timekeeper from "react-timekeeper";

const FoodItemAddSuccess = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const handleSubmit = () => {};
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
              <button color="primary" className=" t4fbutton-gray" type="submit">
                {!isLoaded ? "Request for Approval" : "Please Wait..."}
              </button>{" "}
              <button color="primary" className="t4fbutton-gray" type="submit">
                <img src={addblue} height="15  " /> Create New Offer
              </button>
              <button color="primary" className="t4fbutton-gray" type="submit">
                View offer
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FoodItemAddSuccess;

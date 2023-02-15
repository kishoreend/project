import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import backarrow from "../../../assets/icons/back-arrow.png";
import kfc from "../../../assets/icons/kfc.png";
import repeatorder from "../../../assets/icons/repeatorder.png";
import config from "../../../container/app/navigation.json";
import { callApi, reduxPostData } from "../../../ServiceCall";

const Customer_Report = () => {
  const history = useHistory();
  const [validationMessage, setValidationMsg] = useState("")

  // const message = "Shop list";

  const ratingChanged = (newRating) => {
    console.log("rating", newRating);
  };
  const handleSubmit = () => {
    if(message === ""){
      setValidationMsg("Message should not be blank.");
      return;
    }
    const data = {
      foodStallId: orderDetails.foodStallId,
      orderId: orderDetails.orderId,
      customerPhoneNumber: orderDetails.customerPhoneNumber,
      review: message
    }

    console.log(data);

    reduxPostData('/api/customer/feedback/createComplaint', data, "customer")
    .then(res => {
      setSubmittedReviewFlag(true);
    })
  };

  const orderDetails = JSON.parse(localStorage.getItem("currentOrderDetails"));

  const [fsData, setFSData] = useState({});
  const [flag, setFlag] = useState(false);

  const [ratings, setRatings] = useState({});
  const [message, setMessage] = useState("");

  const [submittedReviewFlag, setSubmittedReviewFlag] = useState(false);

  useEffect(async () => {

    const foodstallData =  await callApi('/api/foodstall/' + orderDetails.foodStallId + '/get-details');

    console.log(foodstallData.data.data);

    setFSData(foodstallData.data.data);
    setFlag(true);

  }, []);

  return (
    <React.Fragment>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={4} />
            <div className="mobile_header_white p-1">
              {flag && fsData.buName}
            </div>

            <div className="mobile_header_gray p-2">
              <span>
                <a href={config.customerurl.Customer_OrderDetails}>
                  <img src={backarrow} height="10" />
                </a>
                <b> Report</b>
              </span>
            </div>

            <div>
              <div className="mobile_header_lightgray p-2 px-3">
                <div>
                <span>{fsData.buName}</span>{" / "}<span>{fsData.foodCourtName}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {fsData.foodStallName}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Order Number :{" "}
                    <span>
                    <b>{orderDetails.orderId}</b>
                    </span>
                  </div>
                </div>
              </div>
              {
              submittedReviewFlag ? ((
                    <div style={{
                      height: '200px',
                      marginTop: '10%',
                      textAlign: 'center',
                      width: '100%',
                      fontSize: '20px'
                    }}>
                    The details are saved. 
                    <p>We may contact you for the same.</p>
                    </div>
                )): ((
              <div id="customer_orders">
                {/* Orders */}
                <Row>
                  <Col lg={12}>
                    <div className="py-1 mobile_header_gray">
                      {
                        orderDetails.orderedItems.map(order => (
                          <div className="d-flex justify-content-between align-items-center  px-3">
                          <div className="py-1">{order.itemName}</div>
                          <div className="py-1">
                            {/* <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" /> */}
                          </div>
                          </div>
                        ))
                      }
                    </div>

                    <div className="p-3">
                      <p>Tell us about it, we will look into the issue</p>
                      <textarea id="review" name="review" rows="6" className="t4finput" 
                        onChange={(e) => {setMessage(e.target.value); setValidationMsg("")}} />
                    </div>
                  </Col>
                </Row>
              </div>
              ))
            }
            </div>
            <div style={{textAlign: 'center'}}>
              <span style={{color: 'red'}}>{validationMessage}</span>
            </div>
            {
              !submittedReviewFlag && (
                <div className=" p-3 text-center">
                  <button color="primary" className="t4fbutton-dark w-100 text-large" type="submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              )
            }
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Customer_Report;

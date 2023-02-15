import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../../assets/styles/t4fstyle.scss";
import hand from "../../../../../assets/icons/hand.png";
import diamond from "../../../../../assets/icons/diamond.png";
import star from "../../../../../assets/icons/star.png";
import crown from "../../../../../assets/icons/crown.png";
import free from "../../../../../assets/icons/free-trial.png";
import config from "../../../../../container/app/navigation.json";
import * as moment from "moment";
import { useDispatch, useSelector } from "react-redux";
const Subscriptions = () => {
  const { createdDate } = useSelector((state) => state.merchant.merchants);

  return (
    <div>
      <div className="p-3 d-flex  bg-white shadow heightfull justify-content-center align-items-center">
        <div className="d-flex ">
          <div className="w-100">
            <div className="child">
              <div className="row p-1 mb-2 ">
                <div className="col-sm-12 p-3 border rounded lightgray border">
                  <div className="row">
                    <div className="col-sm-2 px-2 ">
                      <img src={hand} height="50"></img>
                    </div>
                    <div className="col-sm-10 px-1">
                      <span>
                        <h5 className="text-color-dgreen">Your Subscription:Basic Pack</h5>
                      </span>

                      <div>
                        <span className="font-weight-bold">
                          Start Date: {createdDate == null ? moment(new Date()).format("DD-MMM-YYYY") : createdDate} - End Date: {createdDate == null ? moment(new Date(new Date().setMonth(new Date().getMonth() + 3))).format("DD-MMM-YYYY") : createdDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span></span>
                </div>
              </div>
              <div className="d-flex row justify-content-between">
                <div className="col-sm-3 p-1 ">
                  <div className="rounded text-center lightgray border ">
                    <div className=" p-2 px-4  rounded subscribed shadow">
                      <div className="py-4">
                        {" "}
                        <img src={free} height="50"></img>
                      </div>
                      <div className="py-2">
                        <h5 className="text-color-dgreen">Basic</h5>
                      </div>
                      <div className="py-2 font-weight-bold">Free</div>
                      <div className="py-2 text-nowarp">
                        <button type="button" className="px-3 p-1 btnRoundTeal">
                          <span className="text-nowarp">Active</span>
                        </button>
                      </div>
                      {/* <div className="py-2">
                        {" "}
                        <Link to={config.merchanturl.SubscriptionDes} className="text-color-dgreen tf4_linklabel font-weight-bold">
                          View Feature
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 p-1 ">
                  <div className="rounded text-center lightgray border ">
                    <div className=" p-2 px-4  rounded">
                      <div className="py-4">
                        {" "}
                        <img src={crown} height="50"></img>
                      </div>
                      <div className="py-2">
                        <h5 className="text-color-dgreen">Monthly</h5>
                      </div>
                      <div className="py-2 font-weight-bold">₹ 1000</div>
                      <div className="py-2 text-nowarp">
                        <button type="button" className="px-3 p-1 btnRoundTeal">
                          <span className="text-nowarp">
                            Subscribe<span className="teal_text_bold">a</span>Now
                          </span>
                        </button>
                      </div>
                      {/* <div className="py-2">
                        {" "}
                        <Link to={config.merchanturl.SubscriptionDes} className="text-color-dgreen tf4_linklabel font-weight-bold">
                          View Feature
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 p-1 ">
                  <div className="rounded text-center lightgray border ">
                    <div className=" p-2 px-4  rounded">
                      <div className="py-4">
                        {" "}
                        <img src={star} height="50"></img>
                      </div>
                      <div className="py-2">
                        <h5 className="text-color-dgreen">Half-Yearly</h5>
                      </div>
                      <div className="py-2 font-weight-bold">₹ 5500</div>
                      <div className="py-2">
                        <button type="button" className="px-3 p-1 btnRoundTeal text-nowarp">
                          <span className="text-nowarp">
                            Subscribe<span className="teal_text_bold">a</span>Now
                          </span>
                        </button>
                      </div>
                      {/* <div className="py-2">
                        <Link to={config.merchanturl.SubscriptionDes} className="text-color-dgreen tf4_linklabel font-weight-bold">
                          View Feature
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>{" "}
                <div className="col-sm-3 p-1  ">
                  <div className="rounded text-center lightgray border ">
                    <div className=" p-2 px-4  rounded">
                      <div className="py-4">
                        {" "}
                        <img src={diamond} height="50"></img>
                      </div>
                      <div className="py-2">
                        <h5 className="text-color-dgreen">Yearly</h5>
                      </div>
                      <div className="py-2 font-weight-bold">₹ 10000</div>
                      <div className="py-2">
                        <button type="button" className="px-3 p-1 btnRoundTeal">
                          Subscribe<span className="teal_text_bold">a</span>Now
                        </button>
                      </div>
                      {/* <div className="py-2">
                        <Link to={config.merchanturl.SubscriptionDes} className="text-color-dgreen tf4_linklabel font-weight-bold">
                          View Feature
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { reduxPostData, reduxGetData } from "../../ServiceCall";
import * as merchantActionTypes from "../../store/authentication/merchant/actionTypes";

const StallStatus = () => {
  const dispatch = useDispatch();
  const stallstatus_ = useSelector((state) => state.merchant.currentFoodstallDetail.isOpened);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);

  const [stallstatus, setStallstatus] = useState(stallstatus_);
  const { t } = useTranslation();

  const stallStatusChange = async () => {
    //let url = "test";
    console.log("stallStatusChange", 1);
    let url = `/api/foodstall/${currentFoodstallID}/update-open-status?openStatus=` + !stallstatus;
    const result = await reduxGetData(url, "post", "merchant")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          dispatch({ type: merchantActionTypes.UPDATE_STALL_STATUS, payload:  !stallstatus});
          console.log("stallStatusChange", response);
          setStallstatus((stallstatus) => !stallstatus);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
      });
  };

  return (
    <React.Fragment>
      <div className="btn">
        <div className="text-small">
          {t("stall-status")}{" "}
          <label className="switch">
            <input type="checkbox" checked={stallstatus} onChange={(e) => stallStatusChange()} />
            <span className="slider round"></span>
          </label>
          {/* <span className="px-1">{stallstatus ? "Open " : "Close"}</span> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StallStatus;

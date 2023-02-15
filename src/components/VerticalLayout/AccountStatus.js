import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { reduxPostData, reduxGetData } from "../../ServiceCall";
import * as merchantActionTypes from "../../store/authentication/merchant/actionTypes";
import Modal from "react-bootstrap/Modal";
const AccountStatus = () => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState(false);
  const accountstatus = "Active";
  const selectedFoodstallDtl = useSelector((state) => state.merchant.currentFoodstallDetail) || [];
  const { status } = selectedFoodstallDtl;
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const { uniqueNumber } = useSelector((state) => state.merchant.merchants);
  const foodStalls = useSelector((state) => state.merchant.foodStalls) || [];
  const statusupdate_MerchantDetails = () => async (dispatch) => {
    //let url = "test";
    let url = "/api/admin/update-foodstall-status?foodStallId=" + currentFoodstallID + "merchantUniqueId=" + uniqueNumber + "&status=" + "SENT_FOR_APPROVAL";
    const result = await reduxGetData(url, "put", "admin")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS, payload: response.data?.data });
          console.log("status update", response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
      });
  };
  const handleClose = () => {
    setAlert(false);
  };

  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <div className="btn1">
        <div className="text-small">
          {status === "REQUEST_FOR_APPROVAL" ? (
            <>
              {t("account_status")}{" "}
              <Link className="text-decoration-none" onClick={(e) => (foodStalls.length == 0 ? setAlert((alert) => !alert) : statusupdate_MerchantDetails())}>
                <span className="t4h-color-red">{status?.replaceAll("_", " ")}</span>
              </Link>
            </>
          ) : (
            <>
              {" "}
              {t("account_status")} 
              {
                status == 'Inactive' ? (<span className="t4h-color-red">{status?.replaceAll("_", " ")}</span>) 
                : 
                (<span className="t4h-color-green">{status?.replaceAll("_", " ")}</span>)
              }
            </>
          )}{" "}
        </div>
      </div>

      <Modal show={alert} onHide={handleClose} centered animation={false}>
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Alert</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Please add foodstall and request for approval.</Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AccountStatus;

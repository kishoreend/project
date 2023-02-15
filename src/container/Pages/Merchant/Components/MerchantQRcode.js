import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import close from "../../../../assets/icons/close.png";
import qrcodelarge from "../../../../assets/icons/qrcodelarge.png";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../../ServiceCall";
const MerchantQRcode = (props) => {
  
  const isSelfQR = props.selfQR;

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [bankDetails, setBankDetails] = useState({});
  const uniqueNumber = useSelector((state) => state.merchant.merchants.uniqueNumber);
  const [updated, setUpdated] = useState(false);
  const selectedFoodstallDtl = useSelector((state) => state.merchant.currentFoodstallDetail) || [];
  const { id, city, state, country, location, buType, buName, foodCourtName, qrCode, selfQrCode, foodStallName } = selectedFoodstallDtl;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("qr url", selectedFoodstallDtl);
    
    // {
    getQRCode();
    console.log("Entered inside", bankDetails);
    setUpdated(false);
    // }
  }, []);

  const { branchName, bankName, ifscCode, accountHolderName, accountNumber, upiId } = bankDetails;

  const handleSubmit = (event, errors, values) => {
    if (errors?.length == 0) {
      console.log(uniqueNumber);
      values.merchantId = uniqueNumber;
      values.id = uniqueNumber;

      console.log(JSON.stringify(values));
      addBankDetails(values);
      setUpdated(false);
    }
  };
  const getQRCode = async (uno) => {
    let validationMsg = "";
    const response = await reduxGetData(`/api/merchant/${uniqueNumber}/get-bank-details`, "get", "merchant")
      .then((response) => {
        //   console.log("get merchant details login", response);
        if (response.status === 200) {
          console.log("get bank details", response.data.data);
          setBankDetails(response.data.data);

          console.log(response.data.data, "bank details get");
        } else {
          setBankDetails(response.data.error);
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
        setBankDetails(validationMsg);
      });
  };
  const addBankDetails = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered");

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/merchant/${uniqueNumber}/add-bank-details`, data, module)
      .then((response) => {
        console.log("bank", response);
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
          setBankDetails(response.data.data.bankDetails);
          setUpdated(true);
          console.log(response);
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
  };
  return (
    <div>
      <div>
        {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
        <div>
          <div className="mt-4">
            {
              isSelfQR === 'true' ? (
                selfQrCode !== null ? (
                  <>
                    <div className="mb-2 font-weight-bold">
                      {foodStallName}({location})
                    </div>
                    {
                      (buType === 'Restaurant') ? <img src={qrCode} className="imgQR" /> : <img src={selfQrCode} className="imgQR" />
                    }
                    
                  </>
                ) : (
                  (buType === 'Restaurant') ? <img src={qrCode} className="imgQR" /> : "QR code not generated. Please contact support@tap4food.com."
                  
                )
              ) : (
                qrCode !== null ? (
                  <>
                    <div className="mb-2 font-weight-bold">
                      {foodCourtName}({location})
                    </div>
                    <img src={qrCode} className="imgQR" />
                    {/* <button color="primary" className="t4fbutton-long mt-2" type="submit">
                      {!isLoaded ? "Download QR code" : "Please Wait..."}
                    </button> */}
                  </>
                ) : (
                  "QR code not generated. Please contact support@tap4food.com."
                )
              )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantQRcode;

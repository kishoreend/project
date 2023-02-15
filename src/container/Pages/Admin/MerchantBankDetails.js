import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import close from "../../../assets/icons/close.png";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../ServiceCall";
import Alert from "../../../components/Common/Alert";

const MerchantBankDetails = (props) => {

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [bankDetails, setBankDetails] = useState({});
  const uniqueNumber = useSelector((state) => state.merchant.merchants.uniqueNumber);
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Entered");
    // {
    getBankDetails();
    console.log("Entered inside", bankDetails);
    setUpdated(false);
    // }
  }, []);

  const getBankDetails = async (uno) => {
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
          //dispatch({ type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED, payload: response.data.error });
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
        setBankDetails(validationMsg);
      });
  };
  
  return (
    <div>
      <div>
        <div>
          <AvForm id="addMerchantForm" className="form-horizontal">
            {" "}
            <Row>
              <Col className="px-2" sm={6}>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> Account Holder Name*</span>
                  </div>

                  <AvField
                    name="accountHolderName"
                    type="text"
                    className="t4finput-sm w-100"
                    id="ac_holder_name"
                    value={bankDetails.accountHolderName}
                    validate={{
                      required: {
                        value: true,
                      },
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> Branch Name*</span>
                  </div>

                  <AvField
                    name="branchName"
                    type="text"
                    className="t4finput-sm w-100"
                    id="branch_name"
                    value={bankDetails.branchName}
                    validate={{
                      required: {
                        value: true,
                      },
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> Account Number*</span>
                  </div>

                  <AvField
                    name="accountNumber"
                    type="text"
                    className="t4finput-sm w-100"
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    validate={{
                      required: {
                        value: true,
                      },
                      number: true,
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> Enter your UPI ID*</span>
                  </div>

                  <AvField
                    name="upiId"
                    type="text"
                    className="t4finput-sm w-100"
                    value={bankDetails.upiId}
                    id="upi_id"
                    validate={{
                      required: {
                        value: true,
                      },
                    }}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col className="px-2" sm={6}>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> Bank Name*</span>
                  </div>

                  <AvField
                    name="bankName"
                    type="text"
                    className="t4finput-sm w-100"
                    id="bank_name"
                    value={bankDetails.bankName}
                    validate={{
                      required: {
                        value: true,
                      },
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label"> IFSC Code*</span>
                  </div>

                  <AvField
                    name="ifscCode"
                    type="text"
                    className="t4finput-sm w-100"
                    id="ifsc_code"
                    value={bankDetails.ifscCode}
                    validate={{
                      required: {
                        value: true,
                      },
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <div className="mb-2">
                    <span className="t4f_label">Re-type Account number*</span>
                  </div>

                  <AvField
                    name="re_acct_number"
                    type="text"
                    className="t4finput-sm w-100"
                    id="re_acct_number"
                    value={bankDetails.accountNumber}
                    validate={{
                      required: {
                        value: true,
                      },
                      match: { value: "accountNumber" },
                    }}
                    disabled
                    errorMessage="Confirm Account number did not match"
                  />
                </FormGroup>
              </Col>
            </Row>
          </AvForm>
        </div>
      </div>
    </div>
  );
};

export default MerchantBankDetails;

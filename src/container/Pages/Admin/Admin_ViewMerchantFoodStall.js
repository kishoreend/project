import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/t4fstyle.scss";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Modal, Row, Col } from "reactstrap";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import AvField from "availity-reactstrap-validation/lib/AvField";
import move from "../../../assets/icons/move.png";
import close from "../../../assets/icons/close.png";
// import Alert from "../../../components/Common/Alert";
import addblue from "../../../assets/icons/addblue.png";
import info from "../../../assets/icons/info.png";
import qrcodedark from "../../../assets/icons/qrcodedark.png";
import { Link } from "react-router-dom";
import moment from "moment";

import MerchantBankDetails from "./MerchantBankDetails";
import { callApi } from "../../../ServiceCall";

const ViewMerchantFoodStallDetails = (props) => {

  const selectedMerchantData = useSelector(
    (state) => state.admin.selectedMerchantRequest
  );

  const adminData = useSelector(
    (state) => state.admin
  );

  console.log('selectedMerchantData', selectedMerchantData);
  console.log('adminData', adminData);

  const deliveryTime = selectedMerchantData.deliveryTime || '10 mins';
  const personalIdNumber = selectedMerchantData.personalIdNumber;
  const buType = selectedMerchantData.buType;
  const selectedFCType = selectedMerchantData.buType;
  const foodStallName = selectedMerchantData.foodStallName;
  const foodStallLicenseNumber = selectedMerchantData.licenceNumber;

  const profilePicture = '';
  const personalIdCard = selectedMerchantData.personalIDUrl;
  const menuPics = selectedMerchantData.menuPics;
  const foodStallPics = selectedMerchantData.stallPics;
  const currentFoodstallTiming = []

  const [showQR, setShowQR] = useState(false);
  const [approveButton, setApproveButton] = useState('Approve')
  const [rejectButton, setRejectButton] = useState('Reject')

  const currentFoodstallID = selectedMerchantData?.foodStallId;


  const Shophours = [
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Monday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Tuesday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Wednesday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Thursday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Friday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Saturday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Sunday" },
  ];

  const [foodStallTimings, setFoodStallTimings] = useState();
  const [showBank, setShowBankDetails] = useState(false);
  const handleShowBank = () => {

    setShowBankDetails(true);
  }

  const handleShowQR = () => {
    console.log('Showing QR Code...')
    setShowQR(!showQR);
  }

  const getFoodStallTimings = async (fsId) => {
    if (fsId != undefined) {
      await callApi(`/api/foodstall/${fsId}/get-foodstall-timings`, "GET")
        .then(timingsResponse => {
          setFoodStallTimings(timingsResponse.data.data.days.length == 7 ? timingsResponse.data.data.days : Shophours);
        });

      console.log('FoodStall Timings, ', foodStallTimings);
    }
  }

  const approveFoodstall = async () => {

    // setApproveButton('Processing..');

    const fsId = selectedMerchantData.foodStallId;
    const merchantId = selectedMerchantData.merchantId;
    const newStatus = 'Active'

    const updateStatusApiResponse = await callApi('/api/admin/update-foodstall-status?foodStallId=' + fsId + '&merchantUniqueId=' + merchantId + '&status=' + newStatus, 'PUT');

    props.dataRefreshFlagHandler();
    props.handleViewMerchantFlag();
  }

  const rejectFoodstall = async () => {
    const fsId = selectedMerchantData.foodStallId;
    const merchantId = selectedMerchantData.merchantId;
    const newStatus = 'Rejected'

    const updateStatusApiResponse = await callApi('/api/admin/update-foodstall-status?foodStallId=' + fsId + '&merchantUniqueId=' + merchantId + '&status=' + newStatus, 'PUT');

    props.dataRefreshFlagHandler();
    props.handleViewMerchantFlag();
  }

  const { t } = useTranslation();
  let title = t("my_profile");
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);
  const toggle = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    console.log('Fetching the foodstall timings for FS', selectedMerchantData.foodStallId);
    setApproveButton("Approve")
    getFoodStallTimings(selectedMerchantData.foodStallId);
  }, [setActiveTab]);

  return (
    <>
      <div className=" px-2 position-relative">
        <Row>
          <Col lg={11}>
            <AvForm id="updateProfile" className="form-horizontal">
              <Row>
                <Col lg={4}>
                  <FormGroup className="mb-2">
                    <div className="font-weight-bold"> Unique ID</div>

                    <span className="t4f_label">
                      {selectedMerchantData.merchantId}
                    </span>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className="font-weight-bold"
                      >
                        {" "}
                        Country
                      </span>
                    </div>

                    <div>
                      <span className="t4f_label mt-1 view">
                        {selectedMerchantData.country}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span className="font-weight-bold"> State</span>
                    </div>

                    <div>
                      <span className="t4f_label mt-1 view">
                        {selectedMerchantData.state}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        City
                      </span>
                    </div>

                    <div>
                      <span className="t4f_label mt-1 view">
                        {selectedMerchantData.city}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span className="font-weight-bold"> Location</span>
                    </div>

                    <div>
                      <span className="t4f_label mt-1 view">
                        {selectedMerchantData.location}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span className="font-weight-bold"> Type</span>
                    </div>

                    <div>
                      <span className="t4f_label mt-1 view">
                        {selectedMerchantData.buType}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={
                      !props?.edit
                        ? buType == "RESTAURANT"
                          ? "d-none"
                          : ""
                        : selectedFCType == "RESTAURANT"
                          ? "d-none"
                          : "mb-2"
                    }
                  >
                    <div>
                      <span
                        className="font-weight-bold"
                      >
                        {selectedMerchantData.buType}
                        <img
                          src={info}
                          className="tooltipt4f"
                          height="12"
                          alt="..."
                          title={selectedMerchantData.address}
                        />
                      </span>
                    </div>
                    <div>
                      <div>
                        {selectedMerchantData.buName}
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <span
                        className="font-weight-bold"
                      >
                        {" "}
                        Foodcourt
                      </span>
                    </div>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.fcName}
                      </span>
                    </div>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      {" "}
                      Foodstall
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {foodStallName}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      Food Stall License Number
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {foodStallLicenseNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      Personal ID Number
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.personalIDNumber ? selectedMerchantData.personalIDNumber : 'Not Found'}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className="font-weight-bold"
                      >
                        {" "}
                        Personal ID Photo
                      </span>
                    </div>

                    <span>

                      <img
                        className="personalid_image"
                        //ref={uploadedImage_personalId}
                        src={personalIdCard}
                      ></img>

                    </span>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      GST Number/Tax Identification Number
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.gstNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      Phone Number
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.phoneNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      Username
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.userName}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className="font-weight-bold"
                    >
                      Email ID
                    </span>

                    <div>
                      <span
                        className="t4f_label mt-1 view"
                      >
                        {selectedMerchantData.email}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      Delivery Time
                    </span>

                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {deliveryTime}
                      </span>
                    </div>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  {" "}
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className="font-weight-bold"
                      >
                        {"Profile Picture"}
                      </span>
                    </div>

                    <div className="w-75 mt-1">
                      <a href={selectedMerchantData.profilePic} target="newTab"><img
                        className="profile_image"
                        src={selectedMerchantData.profilePic}
                      ></img> </a>
                    </div>

                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className="font-weight-bold"
                      >
                        {"Menu Image"}
                      </span>
                    </div>
                    <div className="imagecontent w-75 mt-1">
                      <div className="row">
                        {(menuPics || []).map((pic) => (
                          <>
                            {/* close */}

                            <div className="col float-right">

                              <div className="">
                                <img
                                  className="multi_image"
                                  src={pic}
                                  alt="..."
                                ></img>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>

                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {props?.edit
                          ? "Upload Foodstall Image"
                          : "Foodstall Image"}
                      </span>
                    </div>


                    {(
                      foodStallPics != null && (
                        <div className="imagecontent w-75 mt-1">
                          <div className="row">
                            {(foodStallPics || []).map((pic) => (
                              <>
                                <div className="col float-right">

                                  <div className="">
                                    <img
                                      className="multi_image"
                                      src={pic}
                                      alt="..."
                                    ></img>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </FormGroup>
                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      Bank Details
                    </div>
                    {/* <button type="button" className="t4fbutton-gray w-50 " data-toggle="modal" data-target={props?.edit ? "#bank-mechant-modal" : "#bank-mechant-modal-view"} onClick={(e) => setMessage("")} to="#">
                          {props.edit ? <img src={addblue} alt="edit" height="13" /> : ""}
                          {!props.edit ? "View Details" : " Add Bank Detials"}
                        </button> */}
                    <button
                      type="button"
                      className="t4fbutton-gray w-50 font-weight-bold"
                      onClick={(e) => handleShowBank()}
                      to="#"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      QR Code
                    </div>

                    <img src={selectedMerchantData.fcQRCode} alt="edit" height="240" />

                  </div>
                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      Timings
                    </div>
                    <button
                      type="button"
                      className={
                        props?.edit
                          ? "t4fbutton-gray w-50 font-weight-bold"
                          : "d-none"
                      }
                      data-toggle="modal"
                      data-target={
                        props?.edit
                          ? "#hour-mechant-modal"
                          : "#hour-mechant-modal-view"
                      }
                      to="#"
                    >
                      View Timings
                    </button>
                  </div>
                  <div className="mb-1">
                    {foodStallTimings &&
                      foodStallTimings.map((hour, index) => (
                        <div className="d-flex">
                          <div className="px-1 w-25">{hour.weekDayName}</div>
                          <div className="px-1">
                            {hour.opened24Hours
                              ? "Open 24Hours"
                              : hour.closed
                                ? "Closed"
                                : (hour.openTime != ""
                                  ? moment(hour.openTime, "hh").format("LT")
                                  : hour.openTime) +
                                " - " +
                                (hour.closeTime != ""
                                  ? moment(hour.closeTime, "hh").format("LT")
                                  : hour.closeTime)}
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
              <div className="my-4">
                <button
                  color="primary"
                  className="t4fbutton-long "
                  style={{ marginRight: '4px' }}
                  type="submit"
                  onClick={() => approveFoodstall()}
                >
                  {approveButton}
                </button>
                <button
                  color="primary"
                  className="t4fbutton-long "
                  onClick={() => rejectFoodstall()}
                  type="submit"
                >
                  {rejectButton}
                </button>
                <button
                  type="button"
                  id={props?.edit ? "cancel" : "cancelupdate"}
                  color="primary"
                  className={
                    props?.edit
                      ? "mx-1 t4fbutton-long color-gray edit"
                      : "mx-1 t4fbutton-long color-gray"
                  }
                  onClick={props.toggle}
                >
                  Go Back
                </button>
              </div>
            </AvForm>
          </Col>

        </Row>
      </div>
      {/* <span className={!props.edit ? "t4f_label mt-1 view" : "t4f_label d-none"}>{phoneNumber}</span> */}
      {showBank && (
        <div
          className={"modal fade fadepop"}
          id="bank-mechant-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <MerchantBankDetails />
          </div>
        </div>
      )}
      {!props?.edit && (
        <div
          className="modal fade fadepop"
          id="bank-mechant-modal-view"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            {/* <BankDetails edit={props.edit} sendid="bank-merchant-modal-view" /> */}
          </div>
        </div>
      )}
      <div
        className="modal fade fadepop"
        id={props?.edit ? "hour-mechant-modal" : "hour-mechant-modal-view"}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          {/* <Hours edit={props.edit} /> */}
        </div>
      </div>
      {/* <Modal show={showHours} className="fadepop" onHide={handleClose} centered animation={false}>
            <Modal.Header className="t4h-color-gray" closeButton>
              <Modal.Title>
                <h6>Hours</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Hours />
            </Modal.Body>
          </Modal> */}

      {/* <Modal show={showBank} className="fadepop" onHide={handleShowBank} centered animation={false}>
            <Modal.Header className="t4h-color-gray" closeButton>
              <Modal.Title>
                <h6>Bank Details</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BankDetails edit={props.edit} />
            </Modal.Body>
          </Modal> */}

      {/* <Modal show={showQR} onHide={handleShowQR} centered animation={false}>
            <Modal.Header className="t4h-color-gray" closeButton>
              <Modal.Title>
                <h6>QR code</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedMerchantData.fcQRCode} />
            </Modal.Body>
          </Modal> */}
    </>
  );
};

export default ViewMerchantFoodStallDetails;

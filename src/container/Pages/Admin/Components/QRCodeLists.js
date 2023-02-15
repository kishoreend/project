import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import { Link, useHistory } from "react-router-dom";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import * as adminActionTypes from "../../../../store/admin/actionTypes";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import addblue from "../../../../assets/icons/addblue.png";
import close from "../../../../assets/icons/close.png";
import edit from "../../../../assets/icons/edit.png";
import deleteicon from "../../../../assets/icons/delete.png";
import { MDBDataTableV5 } from "mdbreact";
const QRCodeLists = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState(false);
  const [userrole, setRole] = useState("Add New User");
  const [foodcourts, setFoodcourts] = useState([]);
  const [QRurl, setQRurl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const datatable = {
    columns: [
      {
        label: "#",
        field: "id",
        width: 10,
        sort: "disabled",
      },

      {
        label: "Mall/Theatre",
        field: "buName",
        width: 100,
      },
      {
        label: "Food Court",
        field: "foodCourtName",
        width: 100,
      },
      // {
      //   label: "QR Code Generated",
      //   field: "qrcodeGenerated",
      //   sort: "disabled",
      //   width: 100,
      // },
      {
        label: "Generate QR Code",
        field: "generate",
        sort: "disabled",
        width: 100,
      },

      {
        label: "Download",
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: foodcourts?.map((obj, index) => ({
      id: index + 1,
      buName: (
        <>
          <b>{obj.buName}</b>
          <br />{" "}
          <span>
            {obj.city},{obj.state},{obj.country}
          </span>
        </>
      ),
      searchname: obj.buName,
      searchcity: obj.city,
      searchstate: obj.state,
      searchcountry: obj.country,

      foodCourtName: obj.foodCourtName + " (" + obj.foodCourtId + ")",
      //qrcodeGenerated: <span className={obj.qrcodeGenerated ? "t4h-color-green" : "t4h-color-red"}>{obj.qrcodeGenerated ? "Yes" : "No"}</span>,
      generate: obj.qrcodeGenerated ? (
        <img src={obj.qrCodeUrl} height="70" />
      ) : (
        <button className="t4fbutton-gray2" onClick={(e) => generateQRcode(obj.foodCourtId)}>
          Generate QR Code
        </button>
      ),
      actions: (
        <div>
          {/* <button className="t4fbutton-gray2" disabled={!obj.qrcodeGenerated} onClick={(e) => (setQRurl(obj.qrCodeUrl), handleShowQR())}>
            Download
          </button> */}
          <a className="p-2 px-3" disabled={!obj.qrcodeGenerated} href={obj.qrCodeUrl} target="_new">
            <i className="fa fa-download text-color-dgreen" />
          </a>
        </div>
      ),
    })),
  };

  const getFoodCourt = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("get getFoodCourt", data);
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/get-food-courts`, "", "admin", false, "get")
      .then((response) => {
        if (response.status === 200 && response.data.status !== "Error") {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          console.log("get 200 getFoodCourt", response);
          setFoodcourts(response.data?.data);
          console.log("get 200 getFoodCourts", foodcourts);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          //setFoodcourts([]);
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

  const generateQRcode = async (fid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("get generateQRcode", fid);
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/qrcode/generate?foodcourtid=${fid}`, "", "admin", false, "post")
      .then((response) => {
        if (response.status === 200 && response.data.status !== "Error") {
          console.log("get 200 generateQRcode", response);
          //setFoodcourts(response.data?.data);
          validationMessage = "QR code Sucessfully Generated";
          messageType = "success";
          getFoodCourt();
        } else if (response.status === "Error") {
          //setFoodcourts([]);
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
  const handleShowQR = () => {
    console.log("qr in");
    setShowQR((showQR) => !showQR);
  };
  const handleClose = () => {
    setShowQR((showQR) => !showQR);
  };
  useEffect(() => {
    getFoodCourt();
  }, []);

  return (
    <>
      <div className="px-2 qrcode-merchant">
        <div className="py-1">
          {/* <button className="t4fbutton-gray" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
            <b> Generate QR code for all Food courts </b>
          </button> */}
        </div>
        <div>{!isLoaded ? "" : <Alert message="Please wait...." type="info" />}</div>

        <div className="table-border tab-content">
          <MDBDataTableV5 disableRetreatAfterSorting={true} hover entriesOptions={[10]} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
        </div>
      </div>

      <Modal show={showQR} className="fadepop" onHide={handleClose} centered animation={false}>
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>QR code</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={QRurl} className="imgQR"></img>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QRCodeLists;

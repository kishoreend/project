import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import * as adminActionTypes from "../../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import addblue from "../../../../assets/icons/addblue.png";
import close from "../../../../assets/icons/close.png";
import edit from "../../../../assets/icons/edit.png";
import deleteicon from "../../../../assets/icons/delete.png";
import lock from "../../../../assets/icons/lock.png";
import user1 from "../../../../assets/icons/user.png";
import call from "../../../../assets/icons/call.png";
import dash_foodstall from "../../../../assets/icons/dash_foodstall.png";
import Modal from "react-bootstrap/Modal";
const Roles = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState(false);
  const [userrole, setRole] = useState("Add New User");
  const [stallManagers, setStallManagers] = useState([]);
  const [viewusers, setViewusers] = useState([]);
  const { role, description } = "";
  const [show, setShow] = useState(false);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const currentFoodstall = useSelector((state) => state.merchant.currentFoodstall);
  const { uniqueNumber } = useSelector((state) => state.merchant.merchants);

  const roles = [
    {
      name: "Bala",
      email: "bala@gmail.com",
      foodstall: "Food Stall 1",
      location: "Hyderabad",
      id: "1",
    },
    {
      name: "Bala",
      email: "bala@gmail.com",
      foodstall: "Food Stall 1",
      location: "Hyderabad",
      id: "2",
    },
  ];

  const handleShow = () => {
    setShow((show) => !show);
  };
  const handleClose = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    setShow((show) => !show);
  };
  const handleSubmit = (event, errors, values) => {
    if (errors?.length == 0) {
      let merchatData = {
        email: values.email,
        password: "",
        phoneNumber: values.phoneNumber,
        userName: values.userName,
      };
      postMerchantDetails(merchatData);
    }
  };
  const postMerchantDetails = async (merchatData) => {
    setIsLoaded((isLoaded) => !isLoaded);

    console.log(merchatData);
    let result = await reduxPostData(`/api/merchant/create-merchant?fs-id=${currentFoodstallID}&parent-merchant=${uniqueNumber}&stall-manager-creation-flag=${true}`, merchatData, "merchant")
      .then((response) => {
        if (response.status === 200) {
          setMessage("Food Stall owner is Successfully Created for the Current food stall");
          setType("success");
          console.log(response);
          setIsLoaded((isLoaded) => !isLoaded);
          handleClose();
          setSuccess((success) => !success);
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          setMessage("Something went wrong, Please try again later");
          setType("danger");
          setIsLoaded((isLoaded) => !isLoaded);
        } else {
          setMessage(err.response.data.errorMessage);
          setType("danger");
          setIsLoaded((isLoaded) => !isLoaded);
        }
      });
  };

  const getStallManagers = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("get getStallManagers", data);
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxGetData(`/api/merchant/get-stall-managers?parent-merchant=${uniqueNumber}`, "", "merchant", false, "get")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          console.log("get 200 getStallManagers", response.data);
          setStallManagers(response.data?.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === 500) {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          setStallManagers([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setStallManagers([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
  };

  useEffect(() => {
    getStallManagers();
  }, [success, currentFoodstallID]);

  return (
    <>
      <div className="px-3">
        <div className="py-1">
          <button className="t4fbutton-gray" onClick={(e) => (handleShow(), setMessage(""))}>
            <img src={addblue} alt="edit" height="13" />
            <b> Add New Stall Manager </b>
          </button>
        </div>

        <div class="d-flex bottomborder">
          <div class="p-2 w-20 text-head-teal-bold">Manager id</div>
          <div class="p-2 w-20 text-head-teal-bold">Manager Name</div>
          <div class="p-2 flex-fill w-20 text-head-teal-bold">Email</div>
          <div class="p-2 flex-fill w-20 text-head-teal-bold">Phone Number</div>

          <div class="p-2 flex-fill w-20 text-head-teal-bold">Food Stall Name</div>
        </div>
        {roles.length > 0
          ? stallManagers.map((role) => (
              <div class="d-flex bottomborder">
                <div class="p-2 w-20 text-head-teal-bold ">{role.managerId}</div>
                <div class="p-2 w-20 text-head-teal-bold ">{role.managerName}</div>
                <div class="p-2 flex-fill w-20">{role.email}</div>
                <div class="p-2 flex-fill w-20">{role.phoneNumber}</div>
                <div class="p-2 w-20  flex-fill ">
                  ({role.foodStallId}) - {role.foodStallName}
                </div>
              </div>
            ))
          : "No Food Stall Manager Found"}
      </div>

      <Modal show={show} className="fadepop" onHide={handleShow} centered animation={false}>
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>
              Create Food Stall Manager for <span className="text-color-dgreen">{currentFoodstall}</span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
          <div>
            <Row>
              <Col lg={12}>
                <div>
                  <AvForm id="addMerchantForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <FormGroup className="mb-2">
                      <div className="mb-2">
                        <span>
                          <img src={user1} height="13" alt="user" />
                          <span className="t4f_label"> Name*</span>
                        </span>
                      </div>
                      <AvField
                        name="userName"
                        //value={this.state.username}
                        type="text"
                        className="t4finput"
                        id="userName"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter a name",
                          },
                          minLength: { value: 2 },
                          maxLength: { value: 30 },
                        }}
                        onChange={(e) => setMessage("")}
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-2">
                        <span>
                          <img src={lock} height="13" alt="lock" />
                          <span className="t4f_label"> Email ID*</span>
                        </span>
                      </div>
                      <AvField name="email" type="text" className="t4finput" id="email" validate={{ email: true, required: true }} errorMessage="Please enter valid Email id" onChange={(e) => setMessage("")} />
                    </FormGroup>

                    <FormGroup className="mb-2">
                      <div className="mb-2">
                        <span>
                          <img src={call} height="13" alt="call" />
                          <span className="t4f_label"> Merchant Phone Number*</span>
                        </span>
                      </div>
                      <AvField
                        name="phoneNumber"
                        type="number"
                        className="t4finput"
                        id="phoneNumber"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter valid 10 digit contact number",
                          },
                          number: true,
                          maxLength: {
                            value: 10,
                            errorMessage: "Please enter valid 10 digit contact number",
                          },
                          minLength: {
                            value: 10,
                            errorMessage: "Please enter valid 10 digit contact number",
                          },
                        }}
                        errorMessage="Please enter valid 10 digit contact number"
                        //placeholder="Enter username"
                        onChange={(e) => setMessage("")}
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-2">
                        <span>
                          <img src={call} height="13" alt="call" />
                          <span className="t4f_label"> Contact Number</span>
                        </span>
                      </div>
                      <AvField
                        name="contactnumnber"
                        type="number"
                        className="t4finput"
                        id="contactnumnber"
                        validate={{
                          number: true,
                          maxLength: { value: 10 },
                        }}
                        errorMessage="Please enter valid 10 digit contact number"
                        onChange={(e) => setMessage("")}
                      />
                    </FormGroup>

                    <div className="mt-4 text-center">
                      <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                        {!isLoaded ? "Submit" : "Please Wait..."}
                      </button>
                    </div>
                  </AvForm>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Roles;

import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import * as adminActionTypes from "../../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import addblue from "../../../../assets/icons/add.png";
import close from "../../../../assets/icons/close.png";
import edit from "../../../../assets/icons/edit.png";
import deleteicon from "../../../../assets/icons/delete.png";
const Notifications = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState(false);
  const [userrole, setRole] = useState("Add New User");
  const [adminroles, setAdminRoles] = useState([]);
  const [viewusers, setViewusers] = useState([]);
  const { role, description } = "";
  const roles = [
    {
      role: "Not found",
      description: "Role not found. Please add new roles",
      id: "1",
    },
  ];
  const users = [
    {
      userid: "102",
      name: "Srinivas",
      email: "srini.sk@gmail.com",
      phone: "9876543210",
      role: "Phone Admin",
      status: "Active",
    },
    {
      userid: "103",
      name: "Srinivas",
      email: "srini.sk@gmail.com",
      phone: "9876543210",
      role: "Phone Admin",
      status: "Active",
    },
    {
      userid: "104",
      name: "Srinivas",
      email: "srini.sk@gmail.com",
      phone: "9876543210",
      role: "Phone Admin",
      status: "Inactive",
    },
  ];
  const handleSubmit_addRole = (event, errors, values) => {
    console.log("values", values);
    if (errors?.length == 0) {
      let data = {
        role: values.role,
        description: values.description,
      };
      addAdminRole(data);
    }
  };

  const handleSubmit_addUser = (event, errors, values) => {
    console.log("values", values);
    let data = {
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      role: userrole,
      userName: values.userName,
    };
    addAdminUser(data);
  };

  const viewUser = async (role) => {
    setViewusers([]);
    let validationMessage = "";
    let messageType = "";
    console.log("get viewUser");

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const userResponse = await reduxGetData(`/api/admin/get-admin-user?role=${role}`, "get", "admin")
      .then((response) => {
        console.log("response.status", response.status);
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          setViewusers(response.data?.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log("viewUser1", viewUser);
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

  const addAdminRole = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addAdminRole", data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/add-admin-role`, data, "admin")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
          console.log("addAdminRole2", response.data.data);
          setAdminRoles([...adminroles, response.data.data]);
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

  const updateAdminRole = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered updateAdminRole", data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/update-admin-role`, data, "admin")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
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

  const getAdminRole = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("get addAdminRole", data);
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/get-admin-roles`, "", "admin", false, "get")
      .then((response) => {
        if (response.status === 200 && response.data.status !== "Error") {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          console.log("get 200 addAdminRole", response);
          setAdminRoles(response.data?.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          setAdminRoles([]);
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

  const addAdminUser = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addAdminUser", data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/add-admin-user`, data, "admin", false, "post")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
          setViewusers([...viewusers, response.data.data]);
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

  const updateAdminUser = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered updateAdminUser", data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/admin/update-admin-user`, data, "admin")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
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

  useEffect(() => {
    //getAdminRole();
  }, []);

  return (
    <>
      <div className={"px-3"}>
        <div className="py-1 d-flex justify-content-between">
          <button className="t4fbutton-gray px-2" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
            <b> Create </b>
          </button>
          <button className="t4fbutton-gray border px-2" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
            All Notifications
          </button>
        </div>
        <div>
          <div className="row  rounded ">
            <div className="col-6 p-1">
              <div className="border p-1">
                <div className="px-2"> Merchant</div>
                <div className="d-flex align-items-center">
                  <div className="px-2">Merchant Id/ Phone</div>
                  <div className="px-2">
                    <input type="textbox" className="t4finput" />
                  </div>
                  <div className="px-2">
                    {" "}
                    <button className="t4fbutton-round bg-gray border px-2" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
                      <img src={addblue} height="20" className="p-1" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6  p-1">
              <div className="border p-1 ">
                <div className="px-2"> Customer</div>
                <div className="d-flex align-items-center">
                  <div className="px-2">Customer Id/ Phone</div>
                  <div className="px-2">
                    <input type="textbox" className="t4finput" />
                  </div>
                  <div className="px-2">
                    {" "}
                    <button className="t4fbutton-round bg-gray border px-2" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
                      <img src={addblue} height="20" className="p-1" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light-gray p-2 mt-1">
          <div className="row mt-1">
            <div className="col-6">
              <div className="row">
                <div className="col">Title</div>
                <div className="col">
                  {" "}
                  <input type="textbox" className="t4finput" />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">Topic</div>
                <div className="col">
                  {" "}
                  <input type="textbox" className="t4finput" />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">Message</div>
                <div className="col">
                  {" "}
                  <textarea type="textbox" className="t4finput" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button className="t4fbutton-sm border px-5" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Notifications;

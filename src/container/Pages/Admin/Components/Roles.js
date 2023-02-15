import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData, callApi } from "../../../../ServiceCall";
import * as adminActionTypes from "../../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import addblue from "../../../../assets/icons/addblue.png";
import close from "../../../../assets/icons/close.png";
import edit from "../../../../assets/icons/edit.png";
import deleteicon from "../../../../assets/icons/delete.png";
import {  Modal } from "react-bootstrap";

const Roles = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState(false);
  const [userrole, setRole] = useState("Add New User");
  const [adminroles, setAdminRoles] = useState([]);
  const [viewusers, setViewusers] = useState([]);
  const { role, description } = "";
  const [userId, setUserId] = useState("");
  const [deleteUserFlag, setDeleteUserFlag] = useState(false);

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

          setTimeout(() => {
            // After 3 seconds set the show value to false
            window.location.reload(1);
          }, 1000)
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err.response.data.errorMessage);
        messageType = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
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

  const deleteUser = (userId) => {

    console.log(userId);
    setUserId(userId);
    setDeleteUserFlag(true);
    
  }

  const confirmDeleteUser = () => {
      callApi('api/admin/delete-admin-user?adminUserId=' + userId, 'DELETE', 'ADMIN')
      .then(res => {
        console.log(res);
        setDeleteUserFlag(false);
        getAdminRole();
      })
  }

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
    getAdminRole();
  }, [deleteUserFlag]);

  return (
    <>
      <div className={!user ? "px-3" : "d-none"}>
        <div className="py-1">
          <button className="t4fbutton-gray" data-toggle="modal" data-target="#addRole-modal" onClick={(e) => setMessage("")}>
            <img src={addblue} alt="edit" height="12" />
            <b> Add New Role </b>
          </button>
        </div>

        <div class="d-flex bottomborder">
          <div class="p-2 w-25 text-head-teal-bold">Roles</div>
          <div class="p-2 flex-fill w-50 text-head-teal-bold">Description</div>
          <div class="p-2 flex-fill text-head-teal-bold"></div>
        </div>
        {adminroles.length > 0
          ? adminroles.map((role) => (
              <div class="d-flex bottomborder">
                <div class="p-2 w-25 text-head-teal-bold ">{role.role}</div>
                <div class="p-2 flex-fill w-50">{role.description}</div>
                <div class="p-2 flex-fill">
                  <button className="t4fbutton-gray2" onClick={(e) => (setUser((user) => !user), setRole(role.role), viewUser(role.role))}>
                    Add/View
                  </button>
                </div>
              </div>
            ))
          : "No Roles found"}
      </div>

      <div className="modal fade fadepop" id="addRole-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="text-color-dgreen " id="exampleModalCenterTitle">
                Create New Role
              </h6>
              {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
              <a data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src={close} alt="close" height="16" />
                </span>
              </a>
            </div>
            <div class="modal-body">
              {" "}
              <Row>
                <AvForm id="roleform" className="form-horizontal" onSubmit={handleSubmit_addRole}>
                  <Row>
                    <Col lg={2}>Role</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <AvField
                          name="role"
                          //value={this.state.username}
                          type="text"
                          className="t4finput-sm w-100"
                          id="role"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter Role",
                            },
                            pattern: {
                              value: "^[A-Za-z ]+$",
                              errorMessage: "Your Role must be composed only with letter",
                            },
                          }}
                          onChange={(e) => setMessage("")}
                          value={role}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>Description</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        {/* <textarea id="description" name="description" rows="6" className="t4finput" value={description} onChange={(e) => setMessage("")} /> */}

                        <AvField
                          name="description"
                          type="text"
                          className="t4finput-sm w-100"
                          id="role"
                          rows="6"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter description",
                            },
                          }}
                          onChange={(e) => setMessage("")}
                          value={description}
                        />
                      </FormGroup>
                      <button type="submit" disabled={isLoaded} className="t4fbutton-long">
                        {isLoaded ? "Please Wait..." : "Save"}
                      </button>
                    </Col>
                  </Row>
                </AvForm>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div className={user ? "px-3" : "d-none"}>
        <div className="py-1 d-flex align-items-center">
          <div>
            <button className="t4fbutton-gray" data-toggle="modal" data-target="#adduser-modal" onClick={(e) => setMessage("")}>
              <img src={addblue} alt="edit" height="13" />
              <b> Add New {userrole}</b>
            </button>
          </div>
          <div className="px-3"> {!isLoaded ? "" : <Alert message="Please wait...." type="info" />}</div>
        </div>

        <Modal show={deleteUserFlag} onHide={() => setDeleteUserFlag(false)} centered animation={false} >
          <Modal.Header closeButton>
            Are you sure to delete this user ?
          </Modal.Header>
          <Modal.Footer>
          <button className="btn" style={{color: 'white', width: '70px',backgroundColor: 'gray'}} onClick={() => setDeleteUserFlag(false)}>
              Cancel
            </button>
            <button className="btn btn-success" style={{color: 'white', width: '70px'}} onClick={() => confirmDeleteUser()}>
              Delete
            </button>
            
          </Modal.Footer>
        </Modal>

        <table class="table">
          <tbody>
            <tr className="text-head-teal-bold ">
              <td scope="col">User ID</td>
              <td scope="col">Name</td>
              <td scope="col">Email</td>
              <td scope="col">Phone</td>
              <td scope="col">Role</td>
              <td scope="col">Status</td>
              <td scope="col">Action</td>
            </tr>
            {viewusers.length > 0
              ? viewusers.map((user, index) => (
                  <tr>
                    <th scope="row" className="text-head-teal-bold ">
                      {user.adminUserId}
                    </th>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td>
                      {" "}
                      <button className={user.status.toUpperCase() === "ACTIVE" || user.status === "نشط" ? "status-active" : "status-inactive"}>{user.status === null || user.status.toUpperCase() === "INACTIVE" ? "Inactive" : user.status}</button>
                    </td>
                    <td>
                      <button className="t4fbutton-gray" onClick={() => deleteUser(user.id)}>
                        <img src={deleteicon} alt="delete" height="15" />{" "}
                      </button>{" "}
                      <button className="t4fbutton-gray" >
                        <img src={edit} alt="edit" height="15" />
                      </button>
                    </td>
                  </tr>
                ))
              : "No Users found."}
          </tbody>
        </table>
        <button className="t4fbutton-gray2" onClick={(e) => setUser((user) => !user)}>
          Back
        </button>
      </div>

      <div className="modal fade fadepop" id="adduser-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="text-color-dgreen " id="exampleModalCenterTitle">
                Create New User
              </h6>
              {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
              <a data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src={close} alt="close" height="16" />
                </span>
              </a>
            </div>
            <div class="modal-body">
              {" "}
              <Row>
                <AvForm id="roleform" className="form-horizontal" onSubmit={handleSubmit_addUser}>
                  <Row>
                    <Col lg={2}>Name</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <AvField
                          name="userName"
                          //value={this.state.username}
                          type="text"
                          className="t4finput-sm w-100"
                          id="userName"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter Name",
                            },
                            pattern: {
                              value: "^[A-Za-z ]+$",
                              errorMessage: "Your name must be composed only with letter",
                            },
                          }}
                          onChange={(e) => setMessage("")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>Email</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <AvField
                          name="email"
                          type="text"
                          className="t4finput-sm w-100"
                          id="email"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter Email",
                            },
                          }}
                          onChange={(e) => setMessage("")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col lg={2}>Phone</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <AvField
                          name="phoneNumber"
                          type="number"
                          className="t4finput"
                          id="phoneNumber"
                          validate={{
                            number: true,
                            maxLength: { value: 10 },
                          }}
                          errorMessage="Please enter valid 10 digit contact number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col lg={2}>Password</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <AvField
                          name="password"
                          //value={this.state.username}
                          type="password"
                          className="t4finput-sm w-100"
                          id="password"
                          validate={{
                            required: true,
                            pattern: {
                              value: "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$",
                              errorMessage: "Your password must be minimum 6 characters with atlease 1 special character",
                            },
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>Role</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">{userrole}</FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>Profile Picture</Col>
                    <Col lg={10}>
                      <FormGroup className="mb-2">
                        <input type="file" accept="image/*" multiple="false" className="t4finput-sm w-100 "></input>
                      </FormGroup>
                      <button type="submit" disabled={isLoaded} className="t4fbutton-long">
                        {isLoaded ? "Please Wait..." : "Save"}
                      </button>
                    </Col>
                  </Row>
                </AvForm>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;

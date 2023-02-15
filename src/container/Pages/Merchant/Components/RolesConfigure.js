import React, { useEffect, useState } from "react";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import Alert from "../../../../components/Common/Alert";
const RolesConfigure = () => {
  const screens = [
    {
      screenName: "Dashboard",
      hasReadAccess: false,
      hasWriteAccess: true,
    },
    {
      screenName: "Order History",
      hasReadAccess: false,
      hasWriteAccess: true,
    },
    {
      screenName: "Subscription",
      hasReadAccess: true,
      hasWriteAccess: false,
    },
    {
      screenName: "Customers",
      hasReadAccess: true,
      hasWriteAccess: true,
    },
    {
      screenName: "Notificaitons",
      hasReadAccess: true,
      hasWriteAccess: false,
    },
    {
      screenName: "Terms & Condition",
      hasReadAccess: true,
      hasWriteAccess: true,
    },
    {
      screenName: "Contact Us",
      hasReadAccess: false,
      hasWriteAccess: true,
    },
    {
      screenName: "About Us",
      hasReadAccess: false,
      hasWriteAccess: true,
    },
    {
      screenName: "Grievnce",
      hasReadAccess: true,
      hasWriteAccess: true,
    },
  ];
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [adminroles, setAdminRoles] = useState([]);
  const [screenAccess, setScreenAccess] = useState(screens);
  const handleChange = (index, e) => {
    const values = [...screenAccess];
    if (e.target.name === "view" || e.target.name === "edit") {
      values[index][e.target.name] = e.target.checked;
    }
    setScreenAccess(values);
  };
  const getAdminRole = async (data) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let messageType = "";
    console.log("get addAdminRole", data);
    const response = await reduxPostData(`/api/admin/get-admin-roles`, "", "admin", false, "get")
      .then((response) => {
        if (response.status === 200) {
          setAdminRoles(response.data.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else {
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
  }, []);
  return (
    <div className="px-3">
      <span className="text-head-teal-bold">Select role</span>
      <div className="d-flex align-items-center">
        <div className="py-2 w-25">
          {" "}
          <select id="role" className="t4finput-sm-drp w-100">
            <option value="">Select</option>
            {adminroles.map((role) => (
              <option value={role.role}>{role.role}</option>
            ))}
          </select>
        </div>
        <div className="px-3"> {!isLoaded ? "" : <Alert message="Please wait...." type="info" />}</div>
      </div>
      <div className="fullborder">
        <table class="table ">
          <tbody>
            <tr className="text-head-teal-bold bg-light-gray ">
              <td scope="col">Screen</td>
              <td scope="col">View</td>
              <td scope="col">View/Edit</td>
              <td></td>
            </tr>
            {screenAccess.map((screen, index) => (
              <tr key={index}>
                <th scope="row" className="px-3 text-head-teal-bold ">
                  {screen.screenName}
                </th>
                <td>
                  <label className="switch" key={index}>
                    <input id={index + "view"} name="view" type="checkbox" checked={screen.hasReadAccess} onChange={(e) => handleChange(index, e)} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  {" "}
                  <label className="switch">
                    <input id={index + "edit"} name="edit" type="checkbox" checked={screen.hasWriteAccess} onChange={(e) => handleChange(index, e)} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-2">
        <button type="button" className="t4fbutton-long">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default RolesConfigure;

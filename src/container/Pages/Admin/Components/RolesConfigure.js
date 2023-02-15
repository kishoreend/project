import React, { useEffect, useState } from "react";
import { postData, getData, reduxGetData, reduxPostData, callApi } from "../../../../ServiceCall";
import Alert from "../../../../components/Common/Alert";
const RolesConfigure = () => {

  const [saveBtn, setSaveBtn] = useState("");

  const screens = [
    {
      screenName: "Dashboard",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Merchant Requests",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Merchants",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "QR Code Generator",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Customers",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Notifications",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Subscription",
      hasAccess: true,
      hasEditAccess: false,
    },   
    {
      screenName: "Roles",
      hasAccess: true,
      hasEditAccess: false,
    },
    {
      screenName: "Terms & Condition",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Contact Us",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "About Us",
      hasAccess: true,
      hasEditAccess: true,
    },
    {
      screenName: "Grievance",
      hasAccess: true,
      hasEditAccess: true,
    },
  ];

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [adminroles, setAdminRoles] = useState([]);
  const [screenAccess, setScreenAccess] = useState(screens);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setRole] = useState("");

  const handleChange = (index, e) => {
    setSaveBtn("Save Changes");
    console.log(index, e.target.name);
    const values = [...rolePermissions];
    // if (e.target.name === "view" || e.target.name === "edit") {
    //   values[index][e.target.name] = e.target.checked;
    // }
    if(e.target.name === "view"){
      values[index].hasAccess = !values[index].hasAccess;
    }

    if(e.target.name === "edit"){
      values[index].hasEditAccess = !values[index].hasEditAccess;
    }
    setRolePermissions(values);
  };

  const getAdminRole = async (data) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let messageType = "";
    console.log("get addAdminRole", data);
    const response = await reduxPostData(`/api/admin/get-admin-roles`, "", "admin", false, "get")
      .then((response) => {
        if (response.status === 200 && response.data.status !== "Error") {
          console.log("get addAdminRole", response.data.data);
          setAdminRoles(response.data.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.data.status === "Error") {
          setAdminRoles([]);
          validationMessage = response.data.data;
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
    console.log("get addAdminRole count", adminroles.length);
  };
  useEffect(() => {
    getAdminRole();
  }, []);

  const changeRole = (role) => {

    if(role === "" || role === undefined){
      setRolePermissions([]);
      setSaveBtn("");
      return;
    }

    setRolePermissions([]);
    setRole(role);
    callApi('/api/admin/get-admin-role?role=' + role)
    .then(res => {
      console.log(res);

      if(res.data.data.rolesConfiguration.accessDetails !== null){
        console.log('res.data.data.rolesConfiguration.accessDetails', res.data.data.rolesConfiguration.accessDetails)
        if(res.data.data.rolesConfiguration.accessDetails.length > 0)
          setRolePermissions(res.data.data.rolesConfiguration.accessDetails);
        else
          setRolePermissions(screens);
      }else{
        setRolePermissions(screens);
      }
    })
    setSaveBtn("Save Changes");
    console.log('rolePermissions', rolePermissions)
  }

  const getReadPermission = (role) => {
    let flag = false;
    for(let i = 0; i < rolePermissions.length; i++){
      if(rolePermissions[i].screenName === role){

        flag = rolePermissions[i].hasAccess;
        break;
      }
    }

    return flag;
  }

  const getEditPermission = (role) => {
    let flag = false;
    for(let i = 0; i < rolePermissions.length; i++){
      if(rolePermissions[i].screenName === role){

        flag = rolePermissions[i].hasEditAccess;
        break;
      }
    }

    return flag;
  }

  const savePermissions = () => {
    console.log(rolePermissions);
    setSaveBtn("Updating...")
    postData('/api/admin/add-admin-role-configuration?roleName=' + selectedRole, rolePermissions, 'ADMIN', "POST")
    .then(res => {
      console.log(res);
      setSaveBtn("Updated")
    })
  }

  return (
    <div className="px-3">
      <span className="text-head-teal-bold">Select role</span>
      <div className="d-flex align-items-center">
        <div className="py-2 w-25">
          {" "}
          <select id="role" className="t4finput-sm-drp w-100" onChange={(e) => changeRole(e.target.value)}>
            <option value="">Select</option>
            {adminroles.length > 0 ? adminroles.map((role) => <option value={role.role}>{role.role}</option>) : <option>No roles</option>}
          </select>
        </div>
        <div className="px-3"> {!isLoaded ? "" : <Alert message="Please wait...." type="info" />}</div>
      </div>
      <div className="fullborder">
        <table class="table ">
          <tbody>
            <tr className="text-head-teal-bold bg-light-gray ">
              <td scope="col">Screen</td>
              <td scope="col">Access</td>
              {/* <td scope="col">View/Edit</td> */}
              <td></td>
            </tr>
            {rolePermissions.map((screen, index) => (
              <tr key={index}>
                <th scope="row" className="px-3 text-head-teal-bold ">
                  {screen.screenName}
                </th>
                <td>
                  <label className="switch" key={index}>
                    <input id={index + "view"} name="view" type="checkbox" checked={getReadPermission(screen.screenName)} onChange={(e) => handleChange(index, e)} />
                    <span className="slider round"></span>
                  </label>
                </td>
                {/* <td>
                  {" "}
                  <label className="switch">
                    <input id={index + "edit"} name="edit" type="checkbox" checked={getEditPermission(screen.screenName)} onChange={(e) => handleChange(index, e)} />
                    <span className="slider round"></span>
                  </label>
                </td> */}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        saveBtn.length > 0 && (
          <div className="my-2">
            <button type="button" className="t4fbutton-long" onClick={() => savePermissions()}>
              {saveBtn}
            </button>
          </div>
        )
      }
      
    </div>
  );
};

export default RolesConfigure;

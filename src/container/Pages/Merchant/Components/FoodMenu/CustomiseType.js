import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import hide from "../../../../../assets/icons/hide.png";
import show from "../../../../../assets/icons/show.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import Alert from "../../../../../components/Common/Alert";
const CustomiseType = () => {
  const {t} = useTranslation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const allCustomizeType = useSelector((state) => state.merchant.customizeType);
  const newRecord = {
    id: 0,
    index: 0,
    type: "",
  };

  useEffect(() => {
    console.log("category effect");
    if (allCustomizeType === undefined || allCustomizeType.length === 0) {
      dispatch(fetchCustomizeTypes());
    }
  }, [allCustomizeType, addnew]);

  const addNewRecord = () => {
    if (!addnew && !allCustomizeType.find((s) => s.id === 0)) {
      allCustomizeType.push(newRecord);
      setAddnew(true);
      console.log("new record");
    }
  };

  const addCustomizeType = (data, index) => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-customize-type`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          allCustomizeType.splice(index, 1);
          console.log("custype", response.data?.data);
          dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_TYPE_SUCCESS, payload: response.data?.data });
          validationMessage = "Added Successfully";
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setAddnew(false);
    setMessage(validationMessage);
    setType(type);
    console.log(addnew);
  };

  const fetchCustomizeTypes = () => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-customise-types`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall id", currentFoodstallID);
          console.log("all categories", response.data);
          dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          //validationMessage = response.data.data;
          type = "success";
        }
      })
      .catch((err) => {
        //changed data since they sending error msg in data
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });

    setMessage(validationMessage);
    setType(type);
  };

  const updateCustomizeType = (data) => async (dispatch) => {
    console.log(data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-customize-type`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Updated Successfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };

  const removeCustomizeType = (data) => async (dispatch) => {
    console.log("remove category", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/remove-customize-type`, data, "merchant", false, "delete")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Removed Successfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };
  const addorUpdateCustomizeType = (id, type, index) => {
    console.log(id, type);
    if (id === 0) {
      console.log("inside add");
      dispatch(addCustomizeType({ type: type, visible: true }, index));
    } else if (type !== null) {
      console.log("inside update");
      dispatch(updateCustomizeType({ type: type, id: id, visible: true }));
    }
    setUpdateValue(null);
    setEditable(null);
  };
  const showHide = (data) => async (dispatch) => {
    console.log("showhide ", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/toggle-customize-type`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Updated Visiblity Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setMessage(validationMessage);
    setType(type);
  };
  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
      },
      {
        label: t("customize_type"),
        field: "type",
      },

      {
        label: t("actions"),
        field: "actions",
        width: 100,
      },
    ],
    rows:
      allCustomizeType &&
      allCustomizeType?.sort((a, b) => a.id < b.id) &&
      allCustomizeType.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        type: obj.id === editable || obj.id === 0 ? <input name="type" type="text" className="t4finput-sm" id="type" defaultValue={obj.type} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.type,
        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addorUpdateCustomizeType(obj.id, updateValue, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => setEditable(obj.id)}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              <button className="t4fbutton-gray" onClick={(e) => dispatch(removeCustomizeType({ id: obj.id, type: obj.type, visible: true }))}>
                <img src={deleteicon} alt="delete" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={(e) => dispatch(showHide({ id: obj.id, visible: !obj.visible }))}>
                {obj.visible ? <img src={show} alt="hide" height="15" /> : <img src={hide} alt="hide" height="15" />}
              </button>
            </div>
          </>
        ),
      })),
  };

  return (
    <div className="foodmenu_customizetype">
      <div>
        <MDBDataTableV5 entriesOptions={[10]} entries={10} disableRetreatAfterSorting={true} data={datatable} paging={false} searchTop searchBottom={false} />
      </div>
      <div className="d-flex align-items-center">
        <div>
          <button type="button" className="t4fbutton-round" onClick={addNewRecord}>
            <img src={add} height="12" /> Add New
          </button>{" "}
        </div>
        <div className="px-2 ">{!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
      </div>
    </div>
  );
};

export default CustomiseType;

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
import Alert from "../../../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
const Cusine = () => {
  const {t} = useTranslation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const allCuisines = useSelector((state) => state.merchant.cuisines);
  const newRecord = {
    id: 0,
    index: 0,
    name: "",
  };

  const addNewRecord = () => {
    if (!addnew && !allCuisines.find((s) => s.id === 0)) {
      allCuisines.push(newRecord);
      setAddnew(true);
      console.log("new record");
    }
  };

  const addCuisine = (data, index) => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-cuisine`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          allCuisines.splice(index, 1);
          setAddnew(false);
          dispatch({ type: merchantActionTypes.ADD_CUISINE_SUCCESS, payload: response.data?.data });
          validationMessage = "Added Successfully";
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.ADD_CUISINE_FAILED, payload: validationMessage });
      });
    setUpdateValue(null);
    setMessage(validationMessage);
    setType(type);
  };

  const fetchCuisines = () => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-cuisines`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall id", currentFoodstallID);
          console.log("all categories", response.data);
          dispatch({ type: merchantActionTypes.FETCH_CUISINE_SUCCESS, payload: response.data.data });
          //validationMessage = response.data.data;
          type = "success";
        }
      })
      .catch((err) => {
        //changed data since they sending error msg in data
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.FETCH_CUISINE_FAILED, payload: validationMessage });
        type = "danger";
      });

    setMessage(validationMessage);
    setType(type);
  };

  const updateCuisine = (data) => async (dispatch) => {
    console.log(data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-cuisine`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          validationMessage = "Updated Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUISINE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CUISINE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setUpdateValue(null);
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };

  const removeCuisine = (data) => async (dispatch) => {
    console.log("remove category", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/remove-cuisine`, data, "merchant", false, "delete")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Sucessfully Removed";
          console.log(response);
          dispatch({ type: merchantActionTypes.DELETE_CUISINE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.DELETE_CUISINE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };
  const addOrUpdateCuisine = (id, name, index) => {
    console.log(updateValue);
    console.log(id, name);
    if (id === 0) {
      console.log("inside add");
      dispatch(addCuisine({ name: name, visible: true }, index));
    } else if (name !== null) {
      console.log("inside update");
      dispatch(updateCuisine({ name: name, id: id, visible: true }));
    }
  };
  const showHide = (data) => async (dispatch) => {
    console.log("showhide ", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/toggle-cuisine`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Updated Visiblity Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUISINE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CUISINE_FAILED, payload: validationMessage });
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
        label: t("cuisine"),
        field: "name",
      },

      {
        label: t("actions"),
        field: "actions",
        width: 100,
      },
    ],
    rows:
      allCuisines &&
      allCuisines?.sort((a, b) => a.id < b.id) &&
      allCuisines.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        name: obj.id === editable || obj.id === 0 ? <input name="cuisine" type="text" className="t4finput-sm" id="cuisine" defaultValue={obj.name} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.name,
        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addOrUpdateCuisine(obj.id, updateValue, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => setEditable(obj.id)}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              <button className="t4fbutton-gray" onClick={(e) => dispatch(removeCuisine({ id: obj.id, name: obj.name, visible: true }))}>
                <img src={deleteicon} alt="delete" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={(e) => dispatch(showHide({ id: obj.id, name: obj.name, visible: !obj.visible }))}>
                {obj.visible ? <img src={show} alt="hide" height="15" /> : <img src={hide} alt="hide" height="15" />}
              </button>
            </div>
          </>
        ),
      })),
  };

  useEffect(() => {
    console.log("category effect");
    if (allCuisines === undefined || allCuisines.length === 0) {
      dispatch(fetchCuisines());
    }
  }, [allCuisines, addnew]);

  return (
    <div className="foodmenu_caetogory">
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

export default Cusine;

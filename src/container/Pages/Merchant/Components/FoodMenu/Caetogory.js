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
import Alert from "../../../../../components/Common/Alert";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
const Caetogory = () => {

  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const allCategories = useSelector((state) => state.merchant.categories);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const newRecord = {
    id: 0,
    index: 0,
    category: "",
  };

  const addNewRecord = () => {
    if (!addnew && !allCategories.find((s) => s.id === 0)) {
      allCategories.push(newRecord);
      setAddnew(true);
      console.log("new record");
    }
  };

  const addCategory = (data, index) => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-category`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          allCategories.splice(index, 1);
          dispatch({ type: merchantActionTypes.ADD_CATEGORY_SUCCESS, payload: response.data?.data });
          // validationMessage = response.data.data?.status;
          validationMessage = "Added Successfully";
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        type = "danger";
        dispatch({ type: merchantActionTypes.ADD_CATEGORY_FAILED, payload: validationMessage });
      });
    setAddnew(false);
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(type);
    console.log(addnew);
  };

  const fetchCategory = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-categories`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall id", currentFoodstallID);
          console.log("all categories", response.data.data);
          dispatch({ type: merchantActionTypes.FETCH_CATEGORY_SUCCESS, payload: response.data.data });
          //validationMessage = "Sucessfully Retrived";
          type = "success";
        }
      })
      .catch((err) => {
        //changed data since they sending error msg in data
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.FETCH_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    //setIsLoaded((isLoaded) => !isLoaded);
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(type);
  };

  const updateCategory = (data) => async (dispatch) => {
    console.log(data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-category`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Updated Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setMessage(validationMessage);
    setType(type);
  };

  const showHide = (data) => async (dispatch) => {
    console.log("showhide ", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/toggle-category`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Updated Visiblity Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setMessage(validationMessage);
    setType(type);
  };

  const removeCategory = (data) => async (dispatch) => {
    console.log("remove category", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/remove-category`, data, "merchant", false, "delete")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Sucessfully Removed";
          console.log(response);
          dispatch({ type: merchantActionTypes.DELETE_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.DELETE_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };

  const addOrUpdateCategory = (id, category, visible, index) => {
    console.log("addorupdatecategory", id, category);
    if (id === 0) {
      console.log("inside add");
      dispatch(addCategory({ category: category, visible: visible }, index));
    } else if (category !== null) {
      console.log("inside update");
      dispatch(updateCategory({ category: category, id: id, visible: visible }));
    }
    setUpdateValue(null);
    setEditable(null);
  };

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
      },
      {
        label: t("category"),
        field: "category",
      },

      {
        label: t("actions"),
        field: "actions",
        width: 100,
      },
    ],
    rows:
      allCategories &&
      allCategories?.sort((a, b) => a.id < b.id) &&
      allCategories.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        category: obj.id === editable || obj.id === 0 ? <input name="category" type="text" className="t4finput-sm" id="category" defaultValue={obj.category} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.category,
        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addOrUpdateCategory(obj.id, updateValue, obj.visible, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => (setEditable(obj.id), setMessage(""))}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              <button className="t4fbutton-gray" onClick={(e) => dispatch(removeCategory({ id: obj.id, category: obj.category, visible: true }))}>
                <img src={deleteicon} alt="delete" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={(e) => dispatch(showHide({ id: obj.id }))}>
                {obj.visible ? <img src={show} alt="hide" height="15" /> : <img src={hide} alt="hide" height="15" />}
              </button>
              {/* <button className="t4fbutton-gray" to="#">
                {obj.visible ? <img src={show} alt="hide" height="15" /> : <img src={hide} alt="hide" height="15" />}
              </button> */}
            </div>
          </>
        ),
      })),
  };

  useEffect(() => {
    console.log("category effect");
    if (allCategories === undefined || allCategories.length === 0) {
    
      dispatch(fetchCategory());
    }
  }, [allCategories, addnew]);

  return (
    <div className="foodmenu_caetogory">
      <div>
        <MDBDataTableV5 entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} data={datatable} paging={false} searchTop searchBottom={false} />
      </div>
      <div>
        <div className="d-flex align-items-center">
          <div>
            <button type="button" className="t4fbutton-round" onClick={addNewRecord}>
              <img src={add} height="12" /> Add New
            </button>{" "}
          </div>
          <div className="px-2 ">{!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
        </div>
      </div>
    </div>
  );
};

export default Caetogory;

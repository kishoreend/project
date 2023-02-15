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
import { reduxPostData, reduxGetData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
const SubCaetogory = () => {
  const {t} = useTranslation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const allSubCategories = useSelector((state) => state.merchant.subCategories);
  const newRecord = {
    id: 0,
    index: 0,
    subCategory: "",
  };

  const addNewRecord = () => {
    if (!addnew && !allSubCategories.find((s) => s.id === 0)) {
      allSubCategories.push(newRecord);
      setAddnew(true);
      console.log("new record");
    }
  };

  const addSubCategory = (data, index) => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-subcategory`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          allSubCategories.splice(index, 1);
          dispatch({ type: merchantActionTypes.ADD_SUB_CATEGORY_SUCCESS, payload: response.data?.data });
          validationMessage = "Added Sucessfully";
          type = "success";
        }
      })
      .catch((err) => {
        console.log(err.response);
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        type = "danger";
        dispatch({ type: merchantActionTypes.ADD_SUB_CATEGORY_FAILED, payload: validationMessage });
      });
    setAddnew(false);
    setMessage(validationMessage);
    setType(type);
  };

  const fetchSubCategory = () => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-sub-categories`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall id", currentFoodstallID);
          console.log("all categories", response.data);
          dispatch({ type: merchantActionTypes.FETCH_SUB_CATEGORY_SUCCESS, payload: response.data.data });
          //validationMessage = response.data.data;
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.FETCH_SUB_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });

    setMessage(validationMessage);
    setType(type);
  };

  const updateSubCategory = (data) => async (dispatch) => {
    console.log(data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-subcategory`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Updated Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_SUB_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_SUB_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };

  const removeSubCategory = (data) => async (dispatch) => {
    console.log("remove category", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/remove-subcategory`, data, "merchant", false, "delete")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Removed Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.DELETE_SUB_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.DELETE_SUB_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };

  const showHide = (data) => async (dispatch) => {
    console.log("showhide ", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/toggle-subcategory`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Updated Visiblity Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_SUB_CATEGORY_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.UPDATE_SUB_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setMessage(validationMessage);
    setType(type);
  };
  const addOrUpdateSubCategory = (id, subCategory, index) => {
    console.log(id, subCategory);
    if (id === 0) {
      console.log("inside add");
      dispatch(addSubCategory({ subCategory: subCategory, visible: true }, index));
    } else if (subCategory !== null) {
      console.log("inside update");
      dispatch(updateSubCategory({ subCategory: subCategory, id: id, visible: true }));
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
        label: t("sub_category"),
        field: "subCategory",
      },

      {
        label: t("actions"),
        field: "actions",
        width: 100,
      },
    ],
    rows:
      allSubCategories &&
      allSubCategories?.sort((a, b) => a.uniqueNumber < b.uniqueNumber) &&
      allSubCategories.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        subCategory: obj.id === editable || obj.id === 0 ? <input name="subcategory" type="text" className="t4finput-sm" id="subcategory" defaultValue={obj.subCategory} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.subCategory,
        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addOrUpdateSubCategory(obj.id, updateValue, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => setEditable(obj.id)}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              <button className="t4fbutton-gray" onClick={(e) => dispatch(removeSubCategory({ id: obj.id, subCategory: obj.subCategory, visible: true }))}>
                <img src={deleteicon} alt="delete" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={(e) => dispatch(showHide({ id: obj.id, subCategory: obj.subCategory, visible: !obj.visible }))}>
                {obj.visible ? <img src={show} alt="hide" height="15" /> : <img src={hide} alt="hide" height="15" />}
              </button>
            </div>
          </>
        ),
      })),
  };

  useEffect(() => {
    console.log("category effect");
    if (allSubCategories === undefined || allSubCategories.length === 0) {
      dispatch(fetchSubCategory());
    }
  }, [allSubCategories, addnew]);

  return (
    <div className="foodmenu_caetogory">
      <div>
        <MDBDataTableV5 entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} data={datatable} paging={false} searchTop searchBottom={false} />
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

export default SubCaetogory;

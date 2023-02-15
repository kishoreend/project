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
import { callApi, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import Alert from "../../../../../components/Common/Alert";
const CustomiseFoodItem = () => {
  const {t} = useTranslation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const [updateValue1, setUpdateValue1] = useState("");
  const [updateValue2, setUpdateValue2] = useState(0);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const [selectedCustomiseType, setSelectedCustomiseType] = useState("Select");
  const allCustomizeType = useSelector((state) => state.merchant.customizeType);
  const allCustomizeFoodItem = useSelector((state) => state.merchant.customizeFoodItem);
  const [prevFoodStall, setPrevFoodStall] = useState("");
  const [noDataCounter, setNoDataCounter] = useState(0);
  // const [allCustomizeFoodItem, setallCustomizeFoodItem] = useState([]);
  const newRecord = {
    id: 0,
    index: 0,
    type: "",
  };

  useEffect(() => {
    console.log("category effect");
    if (allCustomizeFoodItem === undefined || allCustomizeFoodItem.length === 0 || prevFoodStall !== currentFoodstallID) {
      setPrevFoodStall(currentFoodstallID);
      dispatch(fetchCustomizeFoodItem());
    }
  }, [currentFoodstallID, addnew, noDataCounter]);

  const addNewRecord = () => {
    if (!addnew && !allCustomizeFoodItem.find((s) => s.id === 0)) {
      allCustomizeFoodItem.push(newRecord);
      setAddnew(true);
      console.log("new record");
    }
  };

  const addCustomizeFoodItem = (data, index) => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-customize-food-item?customiseTypeName=${data.customiseType}`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          allCustomizeFoodItem.splice(index, 1);
          console.log("customizefooditem", response);
          dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: response.data?.data });
          validationMessage = "Added Successfully";
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: [] });
        type = "danger";
      });
    setAddnew(false);
    setMessage(validationMessage);
    setType(type);
    console.log(addnew);
  };

  const fetchCustomizeFoodItem = () => async (dispatch) => {
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-customise-fooditems`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall id", currentFoodstallID);
          console.log("all categories", response.data);
          dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: response.data.data });
          //validationMessage = response.data.data;
          // setallCustomizeFoodItem(response.data.data);
          // console.log("allCustomizeFoodItem", allCustomizeFoodItem);
          type = "success";
        }else{
          dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: [] });
        }
      })
      .catch((err) => {
        //changed data since they sending error msg in data
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_FOOD_ITEM_FAILED, payload: [] });
        type = "danger";
        // setNoDataCounter(noDataCounter + 3);
      });

    setMessage(validationMessage);
    setType(type);
  };

  const updateCustomizeFoodItem = (data) => async (dispatch) => {
    console.log(data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-customize-food-item`, data, "merchant", false, "put")
      .then((response) => {
        console.log("updatefooditem", response);
        if (response.status === 200) {
          validationMessage = "Updated Successfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: data });
          type = "success";
        }
      })
      .catch((err) => {
        console.log("updatefooditemerror", err.response);
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
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
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/toggle-customize-fooditem`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200 || response.data.status === "success") {
          // validationMessage = response.data.data;
          console.log("inside ", response.data.data);
          validationMessage = "Updated Visiblity Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setMessage(validationMessage);
    setType(type);
  };
  const removeCustomizeFoodItem = (data) => async (dispatch) => {
    console.log(" removeCustomizeFoodItem", data);
    let validationMessage = "";
    let type = "";
    const result = await callApi(`/api/foodstall/${currentFoodstallID}/remove-customize-fooditem?custFoodItemId=${data.id}`, "delete")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Removed Successfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_FOOD_ITEM_SUCCESS, payload: data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        // dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };
  const addorUpdateCustomizeFoodItem = (id, type, name, price, visible, index) => {
    if (price === "") price = 0;
    console.log("inside add", id, type, name, price);
    if (type != "Select" && name != "") {
      console.log("inside add", id, type, name, price, index);
      console.log(id, type);
      if (id === 0) {
        console.log("inside add", id, type, name, price, index);
        dispatch(addCustomizeFoodItem({ customiseType: type, foodItemName: name, price: price, visible: visible }, index));
        setSelectedCustomiseType("Select");
      } else if (type !== null) {
        console.log("inside update");
        dispatch(updateCustomizeFoodItem({ customiseType: type, foodItemName: name, price: price, id: id, visible: visible }));
        setSelectedCustomiseType("Select");
      }

      setUpdateValue(null);
      setUpdateValue1("");
      setUpdateValue2(0);
      setEditable(null);
    } else {
      setType("warn");
      setMessage("Please select Customize Type and enter Customize Food Item Name");
    }
  };

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
      },
      {
        label: t("customize_type"),
        field: "customiseType",
      },
      {
        label: t("customize_food_item"),
        field: "foodItemName",
      },
      // {
      //   label: "Price",
      //   field: "price",
      // },
      {
        label: t("actions"),
        field: "actions",
        width: 100,
      },
    ],
    rows:
      allCustomizeFoodItem &&
      allCustomizeFoodItem?.sort((a, b) => a.id < b.id) &&
      allCustomizeFoodItem.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        customiseType:
          obj.id === editable || obj.id === 0 ? (
            <select id="customiseType" name="customiseType" defaultValue={obj.customiseType} className="t4finput-sm-drp w-50" onChange={(e) => setSelectedCustomiseType(e.target.value)}>
              <option value="Select">Select</option>
              {allCustomizeType.map((a) => (
                <option value={a.type}>{a.type}</option>
              ))}
            </select>
          ) : (
            obj.customiseType
          ),
        foodItemName: obj.id === editable || obj.id === 0 ? <input name="name" type="text" className="t4finput-sm" id="customizeFoodItems_name" defaultValue={obj.foodItemName} onChange={(e) => setUpdateValue1(e.target.value)} /> : obj.foodItemName,
        // price: obj.id === editable || obj.id === 0 ? <input name="price" type="number" className="t4finput-sm" id="customizeFoodItems_price" defaultValue={obj.price} onChange={(e) => setUpdateValue2(e.target.value)} /> : obj.price,

        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addorUpdateCustomizeFoodItem(obj.id, selectedCustomiseType, updateValue1 === "" ? obj.foodItemName : updateValue1, updateValue2, obj.visible, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => {
                setSelectedCustomiseType(obj.customiseType);
                setEditable(obj.id)
              }}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              <button className="t4fbutton-gray" onClick={(e) => dispatch(removeCustomizeFoodItem({ id: obj.id, visible: true }))}>
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

export default CustomiseFoodItem;

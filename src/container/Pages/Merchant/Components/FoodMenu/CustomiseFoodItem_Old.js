import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import Alert from "../../../../../components/Common/Alert";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { reduxPostData, reduxGetData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
const CustomiseFoodItem = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const [addnew, setAddnew] = useState(false);
  const [clear, setClear] = useState("");
  const [toggle, setToggle] = useState(false);
  const [updateValue1, setUpdateValue1] = useState("");
  const [updateValue2, setUpdateValue2] = useState("");
  const [customiseItems, setCustomiseItems] = useState([]);
  const [selectedCustomiseType, setSelectedCustomiseType] = useState("");
  const allcustomiseFoodItem = useSelector((state) => state.merchant.arrayCustomizeFood_merge);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const allCustomizeType = useSelector((state) => state.merchant.customizeType);
  const newRecord = {
    id: 0,
    index: 0,
    type: "",
    price: "",
  };

  useEffect(() => {
    console.log("category effect");
    if (customiseItems === undefined || customiseItems.length === 0) {
      dispatch(fetchCustomizeTypes());
    }
  }, [customiseItems, addnew]);

  const populateTableDataRowObjects = (data) => {
    console.log("Pawan__", data);

    console.log("Pawan customiseItems", customiseItems);

    const newarray = [{ id: 0, index: 0, type: "", name: "", price: "" }];

    const customiseItemsv1 =
      data != undefined && data != null
        ? data.map((obj, index) =>
            obj.customizeFoodItems && obj != undefined
              ? Object.keys(obj.customizeFoodItems).map((cusItem, index2) => {
                  return { id: obj.id + index2, index: index + 1, type: obj.type, name: cusItem, price: obj.customizeFoodItems[cusItem] };
                })
              : newarray
          )
        : newarray;

    //const customiseFoodItems_Latest = [].concat.apply([], customiseItemsv1);

    let customiseFoodItems_Latest = [...customiseItemsv1].flat();

    console.log("customiseFoodItems_Latest <> ", customiseFoodItems_Latest);

    setCustomiseItems(customiseFoodItems_Latest);

    // dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_TYPE_SUCCESS, payload: response.data });
  };

  const addCustomizeType = (data, index) => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    console.log("selectedCustomiseType", selectedCustomiseType);
    console.log("entered add cus item", data);
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-customize-food-item?customiseTypeName=${selectedCustomiseType}`, data, "merchant")
      .then((response) => {
        console.log("entered add cus item", response);
        if (response.status === 200) {
          customiseItems.splice(index, 1);
          console.log("In success", customiseItems);
          //setToggle((toggle) => !toggle);
          setClear("");
          //dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_TYPE_SUCCESS, payload: response.data?.data });
          validationMessage = "Added Successfully";

          let refreshedItems = customiseItems.map((item, index) => {
            return {
              id: item.id ? item.id : index,
              index: index,
              type: item.type,
              name: item.name,
              price: item.price,
            };
          });

          refreshedItems.push({
            id: customiseItems.length,
            type: selectedCustomiseType,
            index: customiseItems.length - 1,
            name: data.name,
            price: data.price,
          });

          setCustomiseItems(refreshedItems);

          type = "success";
          fetchCustomizeTypes();
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.ADD_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setAddnew(false);
    setMessage(validationMessage);
    setType(type);
    console.log(addnew);
  };

  const fetchCustomizeTypes = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    console.log();
    const result = await reduxGetData(`/api/foodstall/${currentFoodstallID}/fetch-customise-types`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          populateTableDataRowObjects(response.data.data);

          console.log("customise types", customiseItems);

          //setCustomiseItems(customiseFoodItems_Latest);
          //dispatch({ type: merchantActionTypes.FETCH_CUSTOMIZE_TYPE_SUCCESS, payload: response.data });
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
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(type);
  };

  const updateCustomizeType = (data) => async (dispatch) => {
    console.log("updateCustomize item", data);
    let validationMessage = "";
    let type = "";
    const result = await reduxPostData(`/api/foodstall/${currentFoodstallID}/edit-customize-type`, data, "merchant", false, "put")
      .then((response) => {
        if (response.status === 200) {
          validationMessage = "Updated Successfully";
          console.log(response);
          //dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
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
          //dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_TYPE_SUCCESS, payload: response.data.data });
          type = "success";
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.DELETE_CUSTOMIZE_TYPE_FAILED, payload: validationMessage });
        type = "danger";
      });
    setEditable(null);
    setMessage(validationMessage);
    setType(type);
  };
  const addorUpdateCustomizeType = (id, name, price, type, index) => {
    console.log("inside add", id, name, price, type, selectedCustomiseType);
    if (id === 0) {
      console.log("inside add");
      dispatch(addCustomizeType({ name: name, price: price, visible: true }, index));
    } else if (type !== null) {
      console.log("inside update");
      dispatch(updateCustomizeType({ "prev-item-name": name, "prev-item-price": price, "new-item-name": name, "new-item-price": price, id: id, visible: true }));
    }
    setUpdateValue1("");
    setUpdateValue2("");
    setEditable(null);
    setSelectedCustomiseType("");
  };

  // console.log("customiseItemsv3_Latest", customiseFoodItems_Latest);

  const addNewRecord = () => {
    setToggle((toggle) => !toggle);

    if (!toggle) {
      let tempCustFoodItemsType = [...customiseItems, newRecord];
      setCustomiseItems(tempCustFoodItemsType);
    }

    // setCustomiseItems(customiseFoodItems_Latest);
    // if (!addnew && !allCustomizeType.find((s) => s.id === 0)) {
    //   allCustomizeType.push(newRecord);
    //   setAddnew(true);
    //   console.log("new record");
    // }
    // const newarray = [{ id: 0, index: 0, type: "", name: "", price: "" }];
    // console.log("addNewRecord", newarray);
    // if (!addnew) {
    //   console.log("addnew");
    //   customiseFoodItems_Latest = [...customiseFoodItems_Latest, ...newarray];
    //   console.log("customiseFoodItems_Latest add", customiseFoodItems_Latest);
    //   console.log("new record", addnew);
    // }
  };

  // const customiseItemsv1 =
  //   customiseItems.data != undefined && customiseItems != null
  //     ? customiseItems.data.map((obj, index) =>
  //       obj.customizeFoodItems && obj != undefined
  //         ? Object.keys(obj.customizeFoodItems).map((cusItem) => {
  //           return { index: index + 1, type: obj.type, name: cusItem, price: obj.customizeFoodItems[cusItem] };
  //         })
  //         : ""
  //     )
  //     : "";

  // console.log("sat", rowss.flat(1));

  console.log("Final data", customiseItems);
  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
      },
      {
        label: "Customize Type",
        field: "type",
      },
      {
        label: "Customize Food Item",
        field: "name",
      },
      {
        label: "Price",
        field: "price",
      },
      {
        label: "Actions",
        field: "actions",
        width: 100,
      },
    ],
    rows:
      customiseItems &&
      customiseItems?.sort((a, b) => a.id < b.id) &&
      customiseItems.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        // type: obj.id === editable || obj.id === 0 ? <input name="type" type="text" className="t4finput-sm" id="type" defaultValue={obj.type} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.type,
        type:
          obj.id === editable || obj.id === 0 ? (
            <select id="customiseType" name="type" className="t4finput-sm-drp w-50" onChange={(e) => setSelectedCustomiseType(e.target.value)}>
              <option value=""></option>
              {allCustomizeType.map((customiseType) => (
                <option value={customiseType.type}>{customiseType.type}</option>
              ))}
            </select>
          ) : (
            obj.type
          ),

        // name: obj.id === editable || obj.id === 0 ? <input name="name" type="text" className="t4finput-sm" id="customizeFoodItems_name" defaultValue={obj.name} onChange={(e) => setUpdateValue1(e.target.value)} /> : (obj.customizeFoodItems = null ? "" : obj.name),
        // price: obj.id === editable || obj.id === 0 ? <input name="price" type="number" className="t4finput-sm" id="customizeFoodItems_price" defaultValue={obj.price} onChange={(e) => setUpdateValue2(e.target.value)} /> : (obj.customizeFoodItems = null ? "" : obj.price),
        name: obj.id === editable || obj.id === 0 ? <input name="name" type="text" className="t4finput-sm" id="customizeFoodItems_name" defaultValue={obj.name} onChange={(e) => setUpdateValue1(e.target.value)} /> : (obj.customizeFoodItems = null ? "" : obj.name),
        price: obj.id === editable || obj.id === 0 ? <input name="price" type="number" className="t4finput-sm" id="customizeFoodItems_price" defaultValue={obj.price} onChange={(e) => setUpdateValue2(e.target.value)} /> : (obj.customizeFoodItems = null ? "" : obj.price),

        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => addorUpdateCustomizeType(obj.id, updateValue1, updateValue2, obj.type, index)}>
                Save
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              <button className="t4fbutton-gray" onClick={(e) => setEditable(obj.id)}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>{" "}
              {/* <button className="t4fbutton-gray" onClick={(e) => dispatch(removeCustomizeType({ id: obj.id }))}> */}
              <button className="t4fbutton-gray">
                <img src={deleteicon} alt="delete" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      })),
  };
  console.log(selectedCustomiseType);

  return (
    <div className="foodmenu_caetogory">
      <div>
        <MDBDataTableV5 entriesOptions={[5, 20, 25]} disableRetreatAfterSorting={true} entries={5} data={datatable} paging={false} searchTop searchBottom={false} />
      </div>
      {/* <table className={toggle ? "table table-responsive" : "d-none"}>
        <tr>
          <td className="align-center">{customiseItems.length + 1}</td>
          <td className="w-25">
            <select id="customiseType" name="type" value={selectedCustomiseType} className="t4finput-sm-drp" onChange={(e) => setSelectedCustomiseType(e.target.value)}>
              <option value=""></option>
              {allCustomizeType.map((customiseType) => (
                <option value={customiseType.type}>{customiseType.type}</option>
              ))}
            </select>
          </td>
          <td className="w-25">
            <input name="name" type="text" required className="t4finput-sm" value={updateValue1} id="customizeFoodItems_name" onChange={(e) => setUpdateValue1(e.target.value)} />
          </td>
          <td className="w-20">
            <input name="price" type="number" required className="t4finput-sm" value={updateValue2} id="customizeFoodItems_price" onChange={(e) => setUpdateValue2(e.target.value)} />
          </td>
          <td className="w-20">
            <button type="button" className="t4fbutton-long" onClick={(e) => addorUpdateCustomizeType(0, updateValue1, updateValue2, "", 0)}>
              Save
            </button>{" "}
            <button type="button" className="t4fbutton-long" onClick={(e) => setToggle((toggle) => !toggle)}>
              Cancel
            </button>
          </td>
        </tr>
      </table> */}
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

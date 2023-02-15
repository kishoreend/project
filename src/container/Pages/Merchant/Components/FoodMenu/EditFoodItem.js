import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import { Row, Col, Container, FormGroup, Input, Label } from "reactstrap";
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox, AvRadio, AvRadioGroup, AvGroup, AvInput } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import addblue from "../../../../../assets/icons/addblue.png";
import arrow from "../../../../../assets/icons/left-arrow.png";
import trash from "../../../../../assets/icons/trash.png";
import FoodItemAddSuccess from "../../../../../components/Common/FoodItemAddSuccess";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../../../components/Common/Alert";
import uuid from "react-uuid";
import { getData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import config from "../../../../../container/app/navigation.json"
import "./editFoodItem.css";

const EditFoodItem = (props) => {

  const [updateButton, setUpdateButton] = useState("Update");

  const dispatch = useDispatch();
  const history = useHistory();

  const foodItem = props.foodItem;

  console.log('foodItem edit', foodItem)

  const [foodItemForEdit, setFoodItemForEdit] = useState(null);

  const [addCustomizationButtonLabel, setAddCustomizationButtonLabel] = useState('Add Customization');

  const [foodItemNameV2, setFoodItemNameV2] = useState('');
  const [foodItemDescV2, setFoodItemDescV2] = useState('');
  const [categoryV2, setCategoryV2] = useState(foodItem.category);
  const [subCategoryV2, setSubCategoryV2] = useState(foodItem.subCategory);
  const [addOnsFlagV2, setAddOnsFlagV2] = useState(foodItem.addOn);
  const [vegFlagV2, setVegFlagV2] = useState(foodItem.veg);
  const [eggFlagV2, setEggFlagV2] = useState(foodItem.egg);
  const [recomendedFlagV2, setRecomendedFlagV2] = useState('');
  const [cuisineV2, setCuisineV2] = useState('');
  const [customizationFlagV2, setCustomizationFlagV2] = useState('');
  const [customizationTypesV2, setCustomizationTypesV2] = useState([]);
  const [customizationFoodItemsV2, setCustomizationFoodItemsV2] = useState({});
  const [customizationDescriptionsV2, setCustomizationDescriptionsV2] = useState([]);
  const [customizationButtonTypesV2, setCustomizationButtonTypesV2] = useState({});
  const [addOnItemIdsV2, setAddOnItemsV2] = useState([]);
  const [addOnItemDescV2, setAddOnItemsDescV2] = useState('');
  const [addOnItemButtonTypeV2, setAddOnItemButtonTypeV2] = useState('Single');

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [foodname, setFoodName] = useState(foodItem.foodItemName);
  const [fooddes, setFoodDes] = useState(foodItem.description);
  const [addOnDes, setAddOnDes] = useState("");
  const [pic, setpic] = useState("");
  const [cus, setAddCustomisation] = React.useState(false);
  const [cuisine, setCuisine] = useState("");
  const [customiseType, setCustomiseType] = useState([]);
  const [addOn, setAddon] = useState(foodItem.addOn);
  const [pizza, setPizza] = useState(false);
  const [egg, setEgg] = useState(foodItem.egg);
  const [veg, setVeg] = useState(foodItem.veg);
  const [reccommended, setReccommended] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(true);
  const [CusFoodItemChecked, setCusFoodItemChecked] = useState(false);
  const [addOnCus_Spec_, setaddOnCus_Spec] = useState(false);
  const [category, setCategory] = useState(null);
  const [CusItemCus_Spec_, setCusItemCus_Spec] = useState(false);
  const [subCategory, setSubCategory] = useState(null);

  // drop down dynamic
  const [showFV, setshowFV] = useState(false);
  const [showAddons, setshowAddons] = useState(false);
  const [addonchecked, setaddonchecked] = useState(false);
  const [menuimages, setMenuimages] = useState(new FormData());
  const [allAdons, setallAdons] = useState([]);
  const [fvVariant, setFVvariant] = useState([]);
  const [customiseFoodItems_Latest, setcustomiseFoodItems_Latest] = useState([]);
  const [addonlabel, setaddonlabel] = useState([]);
  const [customiseFoodItems_dropdown, setcustomiseFoodItems_dropdown] = useState([]);
  const [clear, setClear] = useState(false);
  const [dynamicVariantState, setDynamicVariantState] = useState([]);
  const [dynamicCustomerSpec, setDynamicCustomerSpec] = useState([]);
  let allCombinations = [];

  const [editFoodItemId, setEditFoodItemId] = useState(null);
  const [existCustTypes, setExistingCustTypes] = useState([]);
  const [dynamicstate, setDynamicstate] = useState([]);
  const [dynamicstateKeys, setDynamicstateKeys] = useState([]);
  const [dynamicstateValues, setDynamicstateValues] = useState([]);
  const [taxType, setTaxType] = useState(foodItem.taxType);

  const Intialise = () => {
    console.log("Intialise");

    setClear((clear) => !clear);
    setCategory(null);
    setSubCategory(null);
    setpic("");
    setFoodDes("");
    setFoodName("");
    setEgg(false);
    setAddon(false);
    setPizza(false);
    setVeg(false);
    setReccommended(false);
    setAddCustomisation(false);
    setshowFV(false);
    setshowFV(false);
    setshowAddons(false);
    setMenuimages(new FormData());
    setDynamicCustomerSpec([]);
    setDynamicVariantState([]);
    setDynamicstate([]);
    setcustomiseFoodItems_Latest([]);
    setcustomiseFoodItems_dropdown([]);
    setCustomiseType(null);
    setCategory(null);
    document.getElementById("drpCustomizeType").value = "";
    document.getElementById("drpcategory").value = "";
    document.getElementById("drpsubCategory").value = "";
  };

  const handleChange = (inputValue, data) => {
    if (data === "category" && inputValue != null) setCategoryV2(inputValue.value);
    if (data === "subCategory" && inputValue != null) setSubCategoryV2(inputValue.value);
    if (data === "cuisine" && inputValue != null) setCuisineV2(inputValue.value);
  };

  const drpalladdons = [];
  allAdons.map((obj) => {
    drpalladdons.push({ value: obj.foodItemId, label: obj.itemName });
  });
  const allCustomizeType = useSelector((state) => state.merchant.customizeType);
  const CustomizeType = [];
  allCustomizeType.map((obj) => {
    if (obj.visible === true) CustomizeType.push({ value: obj.type, label: obj.type });
  });

  useEffect(async () => {
    console.log("menuimages1", menuimages);
    if (foodItem.foodItemId) {
      await getFoodItemForEdit(foodItem.foodItemId);
    }

    console.log('CustomizeType : ', CustomizeType)

    getaddons();
  }, []);


  const getFoodItemForEdit = async (itemId) => {
    await getData('/api/menu/get-food-item-for-edit?foodItemId=' + itemId).then(apiResponse => {

      return apiResponse.data.data;
    }).then(data => {
      if (data) {
        console.log(data)
        setFoodItemForEdit(data);
        setFoodItemNameV2(data.foodItemDetails.foodItemName);
        setFoodItemDescV2(data.foodItemDetails.description);
        setRecomendedFlagV2(data.foodItemDetails.reccommended);
        setCustomizationFlagV2(data.customizationFlag);
        setEggFlagV2(data.foodItemDetails.egg);
        setVegFlagV2(data.foodItemDetails.veg)
        setpic(data.foodItemDetails?.pic?.[data.foodItemDetails.pic.length - 1]);
        setEditFoodItemId(data.foodItemDetails.foodItemId);
        setCategoryV2(data.foodItemDetails.category);
        setSubCategoryV2(data.foodItemDetails.subCategory)
        setCuisineV2(data.foodItemDetails.cuisine);
        setPizza(data.foodItemDetails.pizza);
        setCustomizationButtonTypesV2(data.buttons);
        setCustomizationDescriptionsV2(data.descriptions);
        setAddOnItemButtonTypeV2(data.addOnSelectButton);
        setAddOnItemsDescV2(data.addOnDescription);
        setTaxType(data.foodItemDetails.taxType);
        setaddonlabel(data.addOnItems.map(item => {
          return {
            label: item.foodItemName,
            value: item.foodItemId
          }
        }
        ));

        console.log('addOnItemIdsV2', data.addOnItems);

        if (data.customizationFlag) {
          var custFoodItems = {};
          data.customizationEntries.map(entry => {

            custFoodItems[entry.key] = entry.values

          })

          setCustomizationFoodItemsV2(custFoodItems)
        } else {
          setCustomizationFoodItemsV2({})
        }

        setDynamicstate(data.customizationEntries)

        if (data.customizationFlag) {
          setAddCustomisation(data.customizationFlag);
          setshowFV(data.customizationFlag)
        }

        return data.customiseTypes;
      }
    }).then(custData => {

      console.log(custData, "cust_______________data")

      if (custData && custData.length > 0) {

        const existingCustomiseTypes = custData.map(custType => {
          return {
            label: custType,
            value: custType
          }
        });

        if (existingCustomiseTypes.length > 0) {
          console.log('existingCustomiseTypes', existingCustomiseTypes);

          setExistingCustTypes(existingCustomiseTypes);

          showVariants(existingCustomiseTypes);

          setFVvariant(existingCustomiseTypes);
          GetStringValues(existingCustomiseTypes, "customiseType");
        }

      }
    })

  }

  const getaddons = async () => {
    console.log("Entered addon");
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxGetData(`/api/menu/load-add-ons?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          console.log("food item add on", response.data.data);
          setallAdons(response.data.data);
          console.log("allAdons", allAdons);
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
  };

  //const dispatch = useDispatch();
  // all categories
  const allCategories = useSelector((state) => state.merchant.categories);
  const categoryType = [];
  allCategories.map((obj) => {
    if (obj.visible === true) categoryType.push({ value: obj.category, label: obj.category });
  });

  console.log(categoryType);
  // all sub categories
  const allSubCategories = useSelector((state) => state.merchant.subCategories);
  console.log("allSubCategories", allSubCategories);
  const subCategoryType = [];
  allSubCategories.map((obj) => {
    if (obj.visible === true) subCategoryType.push({ value: obj.subCategory, label: obj.subCategory });
  });

  const allCuisines = useSelector((state) => state.merchant.cuisines);
  const cusine = [];
  allCuisines.map((obj) => {
    if (obj.visible === true) cusine.push({ value: obj.name, label: obj.name });
  });

  const allCustomizeFoodItems = useSelector((state) => state.merchant.customizeFoodItem.filter((item) => item.visible === true));
  //console.log("customiseFoodItems_Latest bala <> ", allCustomizeFoodItem);

  const getCustDropDownFoodItems = (key) => {
    let dropDownEntries = [];
    for (var i = 0; i < allCustomizeFoodItems.length; i++) {
      const entry = allCustomizeFoodItems[i];
      if (entry.customiseType === key) {
        dropDownEntries.push({
          label: entry.foodItemName,
          value: entry.foodItemName
        })
      }
    }

    return dropDownEntries;
  }

  const alldrpcustomiseFoodItem = [];
  customiseFoodItems_Latest.map((obj, index) => {
    if (obj.type != "") {
      alldrpcustomiseFoodItem.push({ value: index, label: obj.name });
    }
  });

  function generateCombinations(items) {
    // console.log("generateCombinations", "allCombinations", allCombinations);
    //console.log("generateCombinations", "array1", items);
    let combinations = [];
    for (var i = 0; i < items.length; i++) {
      combinations.push({ value: i, label: items[i] });
    }
    return combinations;
  }

  function showVariants(array1) {
    array1.map((ip) => {
      console.log("getDrp ip inside", ip.label);
      {
        customiseFoodItems_Latest.map((obj, index) => {
          setshowFV(true);
        });
      }
    });
  }

  const CusType_PopulateFoodVariant = (inputValue) => {
    console.log("customiseType", inputValue);

    const retainingKeys = inputValue.map(item => item.value);

    var retainingCustItems = {};

    for (let i = 0; i < inputValue.length; i++) {
      retainingCustItems[inputValue[i].value] = customizationFoodItemsV2[inputValue[i].value] ? customizationFoodItemsV2[inputValue[i].value] : [];
    }

    setCustomizationFoodItemsV2(retainingCustItems);

    //setdrpNewFoodVariant(inputValue);
    if (inputValue.length >= 1) setshowFV(true);
    if (inputValue.length == 0) setshowFV(false);
    showVariants(inputValue);
    setFVvariant(inputValue);
    GetStringValues(inputValue, "customiseType");
  };

  const addOnData = (inputValue) => {
    console.log("addonvalues", inputValue);
    setaddonlabel(inputValue);
  };

  const addOnSelectButton = (e) => {
    console.log("addOnSelectButton", e.target.value);
    if (e.target.value === "Double") {
      setaddonchecked(true);
    } else {
      setaddonchecked(false);
    }
  };

  const CusFoodItemSelectButton = (e, type) => {
    console.log("addOnSelectButton", type + "~" + e.target.value);
    if (e.target.value === "Double") {
      // setCusFoodItemChecked(true);
      setCustomizationButtonTypesV2({ ...customizationButtonTypesV2, [type]: 'Double' });
    } else {
      // setCusFoodItemChecked(false);
      setCustomizationButtonTypesV2({ ...customizationButtonTypesV2, [type]: 'Single' });
    }
  };

  const addOnCus_Spec = (e) => {
    if (e.target.checked === true) setaddOnCus_Spec(true);
    else setaddOnCus_Spec(false);
  };
  const CusItemCus_Spec = (e, type) => {
    if (e.target.checked === true) {
      setDynamicCustomerSpec({ ...dynamicCustomerSpec, [type]: true });

      // setCusItemCus_Spec(true);
    } else {
      setDynamicCustomerSpec({ ...dynamicCustomerSpec, [type]: false });
    }
  };



  const changeCustFoodItem = (e, key) => {
    console.log(e, key);

    if (e.length == 0) {
      setCustomizationFoodItemsV2({ ...customizationFoodItemsV2, [key]: e })
    } else {
      setCustomizationFoodItemsV2({ ...customizationFoodItemsV2, [key]: e.map(obj => obj.value) })
    }

    console.log('Actual Cust Items', customizationFoodItemsV2);

  };

  const GetStringValues = (inputValue, type, custype) => {
    if (type === "customiseType") {
      const customisetypeArray = inputValue.map((value) => {
        return value.value;
      });
      console.log("customiseType values alone", customisetypeArray);
      setCustomiseType(customisetypeArray);
    } else if (type === "addon") {
      // const addonids = inputValue.map((value) => {
      //   return value.value.toString();
      // });
      // setaddonlabel(addonids);
    } else if (type === "cusfooditem") {
      const customiseFoodItems_array = inputValue.map((item) => {
        return custype + "~" + item.label;
      });
      // if (dynamicstate.length === 0 || dynamicstate === undefined) {
      //   setDynamicstate({ [custype]: [customiseFoodItems_array] });
      // }
      // else {
      // setDynamicstate({ ...dynamicstate, [custype]: customiseFoodItems_array });
      // }
      // setcustomiseFoodItems_dropdown(customiseFoodItems_array);



      setDynamicstate({ ...dynamicstate, [custype]: inputValue });

      console.log("customiseFoodItems_arrayalone", dynamicstate);
    }
  };

  const handleSubmit = async (event, errors, values) => {

    const selectedCustFoodItems = Object.keys(customizationFoodItemsV2).map(itemKey => {
      const data = customizationFoodItemsV2[itemKey].map(item => { return itemKey + '~' + item })
      return data;
    });

    let data = {
      foodItemId: editFoodItemId,
      foodItemName: foodItemNameV2,
      foodStallId: currentFoodstallID,
      description: foodItemDescV2,
      eggFlag: eggFlagV2,
      vegFlag: vegFlagV2,
      addOnFlag: addOnsFlagV2,
      recomendedFlag: recomendedFlagV2,
      cuisine: cuisineV2,
      subCategory: subCategoryV2,
      category: categoryV2,
      customizationFlag: customizationFlagV2,
      customizationTypes: fvVariant.map(item => item.value),
      isPizaa: pizza,
      customiseFoodItems: selectedCustFoodItems.flatMap(item => item),
      customiseFoodItemsDescriptions: Object.keys(customizationDescriptionsV2).map(key => {
        return key + '~' + customizationDescriptionsV2[key]
      }),
      customiseFoodItemsSelectButtons: Object.keys(customizationButtonTypesV2).map(key => {
        return key + '~' + customizationButtonTypesV2[key]
      }),
      addOnItemsIds: addonlabel.map(a => a.value),
      taxType: taxType
    };

    console.log(data);
    setError(false);
    setSuccess(false);
    setUpdateButton("Loading...")

    const response = await reduxPostData(`/api/menu/update-food-item?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}`, data, "merchant")
      .then(res => {
        console.log(res);
        setSuccess(true);
        setUpdateButton("Saved")
        setInterval(function () {

          props.closeEditModal();
        }, 2000);

      })
      .catch(er => {
        setUpdateButton("Update")
        console.log(er.response.data.errorMessage);
        setErrMsg(er.response.data.errorMessage);
        setError(true);
      })

  };

  const handleImageUpload_menu = (e) => {
    console.log("menu data images", e.target.files);
    if (e.target.files) {
      var data = new FormData();
      data.append("pic", e.target.files[0]);
      // setIsIdLoaded((isIdLoaded) => !isIdLoaded);
      console.log("menu data images", data);
      setMenuimages(data);
      console.log("menu imagess state", menuimages);
      addFoodImages(data)
    }
  };

  const addFoodImages = (data) => {
    console.log("Upload_menu", menuimages);
    const response = reduxPostData(`/api/menu/update-food-item-pics?fs-id=${currentFoodstallID}&foodItemId=${foodItem.foodItemId}`, data, "merchant", true)
      .then((response) => {
        console.log("Upload_menu started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("Upload_menu Success", data);
          //dispatch({ type: merchantActionTypes.UPDATE_MENU_IMAGES, payload: response.data?.data?.pic });
          console.log("Upload_menu from image", response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
  };

  const toggle = () => {
    setSuccess((success) => !success);
  };

  const isSelectedCustType = (value) => {
    var flag = false;
    for (let i = 0; i < existCustTypes.length; i++) {
      if (existCustTypes[i].value === value) {
        flag = true;
        break;
      }
    }
    console.log(flag, value);
    return flag;
  }

  var dropDownList;
  console.log('adds', addOn, egg);
  return (

    <>
      {/* <div id="add-food-Item-success" className={success ? "" : "d-none"}>
      <Alert message="Item is updated successfully" type="info" />{" "}
      </div> */}

      <div className="p-2">

        {isLoaded ? (
          <div className="w-50 p-2">
            <Alert className="w-100" message="Please wait...." type="info" />{" "}
          </div>
        ) : (
          ""
        )}
        <AvForm id="editFoodItem" className={addFooditem ? "form-horizontal text-color-gray" : "d-none"} onSubmit={handleSubmit}>
          <FormGroup>
            <div className="row mt-2 fullBorder">
              <div className="col-lg-3 rightBorder">
                <div className="fooditem_Header p-2">Food Item</div>
                <div className=" p-2">
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Category Type</div>
                    <Select id="drpcategory" name="category" options={categoryType} isDisabled='true'
                      defaultValue={categoryType.find(
                        (obj) => obj.value === categoryV2
                      )}
                      isClearable onChange={(e) => handleChange(e, "category")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Sub Category Type</div>
                    <Select id="drpsubCategory" name="subCategory" options={subCategoryType} isClearable
                      defaultValue={subCategoryType.find(
                        (obj) => obj.value === subCategoryV2
                      )} onChange={(e) => handleChange(e, "subCategory")} />
                  </FormGroup>

                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold">
                      {" "}
                      Food Name <img src={trash} alt="edit" height="16" className="pb-1" />
                    </div>
                    <AvField name="foodItemName" type="text" value={foodItemNameV2} className="t4finput-sm w-100" id="foodItemName" required errorMessage="Please enter food name" onChange={(e) => setFoodItemNameV2(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Food description</div>
                    <AvField name="description" type="text" value={foodItemDescV2}
                      className="t4finput-sm w-100" id="description"
                      errorMessage="Description must be between 1 to 200 characters."
                      onChange={(e) => setFoodItemDescV2(e.target.value)}
                    // validate={{
                    //   required: { value: true },
                    //   minLength: { value: 1 },
                    //   maxLength: { value: 200 }
                    // }}
                    />
                  </FormGroup>
                  <div class="form-check px-1">
                    <span className="px-2">
                      <input type="checkbox" name="addOn" id="addOn" defaultChecked={addOnsFlagV2} onChange={console.log('On AdOns check event'), (e) => (setAddOnsFlagV2(e.target.checked))} />
                      <label for="addOn">Add-ons</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="egg" id="egg" defaultChecked={eggFlagV2} onChange={(e) => setEggFlagV2(!eggFlagV2)} />
                      <label htmlFor="egg">Egg</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="veg" id="veg" defaultChecked={vegFlagV2} onChange={(e) => setVegFlagV2(e.target.checked)} />
                      <label for="veg">Veg</label>
                    </span>

                    <span className="px-2">
                      <input type="checkbox" name="reccommended" id="reccommended" checked={recomendedFlagV2} onChange={(e) => setRecomendedFlagV2(e.target.checked)} />
                      <label for="reccommended">Recomended</label>
                    </span>
                  </div>

                  <div className="mb-2 font-weight-bold">
                    Upload Image
                    <div>
                      {pic && (
                        <img src={'data:image/png;base64,' + pic?.data} alt="No Image" height="45" />
                      )}
                    </div>

                    <input type="file" accept="image/*" className="t4finput-sm w-100" onChange={handleImageUpload_menu}></input>
                  </div>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Select Cuisine</div>
                    <Select name="cuisine" options={cusine} defaultValue={cusine.find(
                      (obj) => obj.value === foodItem.cuisine
                    )} isClearable onChange={(e) => handleChange(e, "cuisine")} />
                  </FormGroup>
                  <div className="col-md-12">
                    <div className="col-md-4">
                        <FormGroup className="mb-2">
                          <div className="mb-1 font-weight-bold">    Inclusive Tax</div>
                          <label className="switch">
                            <input type="checkbox" checked={taxType === "I"} onChange={(e) => setTaxType("I")} />
                            <span className="slider round"></span>
                          </label>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold">    Exclusive Tax</div>
                        <label className="switch">
                          <input type="checkbox" checked={taxType === "E"} onChange={(e) => setTaxType("E")} />
                          <span className="slider round"></span>
                        </label>
                      </FormGroup>
                    </div>                  
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold">    No Tax</div>
                    <label className="switch">
                      <input type="checkbox" checked={taxType === "N"} onChange={(e) => setTaxType("N")} />
                      <span className="slider round"></span>
                    </label>
                  </FormGroup>
                  </div>
                  <div>
                    <button type="button" className="t4fbutton-gray w-100 " onClick={(e) => (setCustomizationFlagV2(!customizationFlagV2), setAddCustomisation((cus) => !cus), setshowFV((showFV) => !showFV))}>
                      <img src={addblue} alt="edit" height="16" className="pb-1" /> <b>Add Customization</b>
                    </button>
                  </div>
                </div>
              </div>
              <div id="customizableDetails" className="col-lg-3 rightBorder">
                <div className="fooditem_Header p-2 ">Customizable Details</div>
                <div id="CusContent" className={cus ? "" : "d-none"}>
                  <div className=" p-2">
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> Food Name</div>
                      <AvField
                        name="CusTypefoodname"
                        type="text"
                        className="t4finput-sm w-100"
                        id="foodname"
                        validate={{
                          required: cus,
                        }}
                        value={foodItemNameV2}
                        errorMessage="Please enter food name"
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> Food description</div>
                      <AvField
                        name="CusTypefooddec"
                        type="text"
                        className="t4finput-sm w-100"
                        id="fooddec"
                        // validate={{
                        //   required: cus,
                        // }}
                        value={foodItemDescV2}
                        errorMessage="Please enter description"
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">

                      <div className="mb-1 font-weight-bold"> Customize Type:</div>
                      <Select id="drpCustomizeType" name="drpCustomizeType" options={CustomizeType} isMulti
                        value={
                          fvVariant
                        } onChange={CusType_PopulateFoodVariant} />
                    </FormGroup>

                    <div class="form-check px-1">
                      <span className="px-2">
                        <input type="checkbox" name="pizza" id="pizza" checked={pizza} onChange={(e) => setPizza(e.target.checked)} />
                        <label for="pizza">Pizza</label>
                      </span>
                    </div>
                    {pizza ? (
                      <div class="form-check px-1">
                        <div className="px-2 border rounded">
                          For Pizza, the customize types should be in below sequence:
                          <div className="font-weight-bold">
                            Size <img src={arrow} alt="edit" height="11" /> Base <img src={arrow} alt="edit" height="11" /> Toppings{" "}
                          </div>
                          The unordered sequence may lead to to invalid combinations.
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* commemted variants columns as it removed from requirements */}
              <div id="variants" className="col-lg-3 rightBorder ">
                <div className="fooditem_Header p-2 ">Variants</div>
                <div className={showFV ? "p-2 fvheight" : "d-none"}>
                  <div className="mb-1 d-none ">Food Variants</div>

                  {fvVariant?.map(
                    (ip, index) =>
                    (
                      <div>
                        <div id="variants" className="p-2 bg-light-gray mb-2">
                          <div className="font-weight-bold mb-2">
                            <div className="d-flex justify-content-between">
                              <div>{ip.value}</div>
                              <div>
                                {" "}
                                {/* <img src={trash} alt="edit" height="18" className="pb-1" />{" "} */}
                              </div>
                            </div>
                          </div>
                          <FormGroup className="mb-2">
                            <div className="mb-1"> Customize Description </div>
                            <AvField name="desc" type="text" className="t4finput-sm w-100"
                              value={customizationDescriptionsV2[ip.value]} onChange={(e) => setCustomizationDescriptionsV2({ ...customizationDescriptionsV2, [ip.value]: e.target.value })}
                              name={"description" + ip.value}
                              // required={showFV}
                              placeholder="You can choose only 1 option" />
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <div className="mb-1"> Customize Food Item</div>

                            <Select options={dropDownList} name={dynamicstateKeys[index]} options={getCustDropDownFoodItems(ip.value)}
                              value={getCustDropDownFoodItems(ip.value).filter(obj => customizationFoodItemsV2[ip.value].includes(obj.value))}
                              isMulti onChange={(e) => changeCustFoodItem(e, ip.value)} isClearable={true} />
                          </FormGroup>
                          <div className="mb-2">
                            Select Button
                            <div className="d-flex flex-row">
                              <div className="buttonBox">
                                <span className="t4fradioCF">
                                  <label>
                                    <input type="radio" checked={customizationButtonTypesV2[ip.value] === 'Single'} value="Single" onChange={(e) => CusFoodItemSelectButton(e, ip.value)} />
                                    <span></span>
                                  </label>
                                </span>
                              </div>

                              <div className="mx-2 d-flex flex-row buttonBox">
                                <div>
                                  <div class="form-check d-none">
                                    <span className="px-2 py-2">
                                      <input type="checkbox" checked={dynamicVariantState[ip.value]} name={"checkbox" + ip.value} id="chkFoodvariant" />
                                      <label for="chkFoodvariant"></label>
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <span className="t4fradioCFbox">
                                    <label>
                                      <input type="radio" value="Double" checked={customizationButtonTypesV2[ip.value] != 'Single'} name={"groupFV" + ip.value} id={index} onChange={(e) => CusFoodItemSelectButton(e, ip.value)} />
                                      <span></span>
                                    </label>
                                  </span>
                                </div>
                              </div>
                              <div>
                                {/* make it invisible */}
                                <AvInput className="texttoLabel d-none" name={"groupFVLabel" + ip.value} id={index} value={dynamicVariantState[ip.value] === true ? "Double" : "Single"} disabled />
                              </div>
                            </div>
                          </div>
                          {/* <div className="mb-2 font-weight-bold">
                              Customer Specification
                              <div>
                                <div className="mt-1 d-flex flex-row align-items-center">
                                  <div className="btn align-items-center">
                                    <label className="switch">
                                      <input type="checkbox" value={dynamicCustomerSpec[ip.value] ? "Mandatory" : "Optional"} name={"CusSpecFV" + ip.value} onChange={(e) => CusItemCus_Spec(e, ip.value)} />
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                  <div className="align-items-center">
                                    <AvInput className="texttoLabel" name={"CusSpecFVLable" + ip.value} value={dynamicCustomerSpec[ip.value] ? "Mandatory" : "Optional"} disabled />
                                  </div>
                                </div>
                              </div>
                            </div> */}
                        </div>
                      </div>

                    )
                  )}
                  {/* <div>
                  { fvVariant.length>0 && fvVariant?.map(
                    (ip, index) => (
                      (dropDownList = generateCombinations(
                        allCustomizeFoodItem
                          ?.filter((item) => {
                            return item.customiseType === ip.value;
                          })
                          ?.map((item) => item.foodItemName)
                      )),
                      (
                        <div>
                          <div id="variants" className="p-2 bg-light-gray mb-2">
                            <div className="font-weight-bold mb-2">
                              <div className="d-flex justify-content-between">
                                <div>{ip.value}</div>
                                <div>
                                  {" "}
                                  <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
                                </div>
                              </div>
                            </div>
                            <FormGroup className="mb-2">
                              <div className="mb-1"> Customize Description  </div>
                              <AvField name="desc" type="text" className="t4finput-sm w-100"
                               value={foodItemForEdit?.descriptions[ip.value]} 
                                name={"description" + ip.value} required={showFV} placeholder="You can choose only 1 option" />
                            </FormGroup>
                            <FormGroup className="mb-2">
                              <div className="mb-1"> Customize Food Item</div>
                              <Select options={dropDownList} value={dynamicstate[ip.value]}
                                 isMulti  onChange={(e) => variantData(e, ip.value)} name={"dropdown" + ip.value} />
                            </FormGroup>
                            <div className="mb-2">
                              Select Button
                              <div className="d-flex flex-row">
                                <div className="buttonBox">
                                  <span className="t4fradioCF">
                                    <label>
                                      <input type="radio" value="Single" name={"groupFV" + ip.value} id={index} onChange={(e) => CusFoodItemSelectButton(e, ip.value)} />
                                      <span></span>
                                    </label>
                                  </span>
                                </div>

                                <div className="mx-2 d-flex flex-row buttonBox">
                                  <div>
                                    <div class="form-check d-none">
                                      <span className="px-2 py-2">
                                        <input type="checkbox" checked={dynamicVariantState[ip.value]} name={"checkbox" + ip.value} id="chkFoodvariant" />
                                        <label for="chkFoodvariant"></label>
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="t4fradioCFbox">
                                      <label>
                                        <input type="radio" value="Double" name={"groupFV" + ip.value} id={index} onChange={(e) => CusFoodItemSelectButton(e, ip.value)} />
                                        <span></span>
                                      </label>
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <AvInput className="texttoLabel d-none" name={"groupFVLabel" + ip.value} id={index} value={dynamicVariantState[ip.value] === true ? "Double" : "Single"} disabled />
                                </div>
                              </div>
                            </div>
                            <div className="mb-2 font-weight-bold">
                              Customer Specification
                              <div>
                                <div className="mt-1 d-flex flex-row align-items-center">
                                  <div className="btn align-items-center">
                                    <label className="switch">
                                      <input type="checkbox" value={dynamicCustomerSpec[ip.value] ? "Mandatory" : "Optional"} name={"CusSpecFV" + ip.value} onChange={(e) => CusItemCus_Spec(e, ip.value)} />
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                  <div className="align-items-center">
                                    <AvInput className="texttoLabel" name={"CusSpecFVLable" + ip.value} value={dynamicCustomerSpec[ip.value] ? "Mandatory" : "Optional"} disabled />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                  </div> */}
                  <div className="mt-2"></div>
                </div>
              </div>
              <div id="customisetype" className="rightBorder col-lg-3">
                <div className="fooditem_Header p-2">Suggestions</div>
                <div className={showAddons ? "p-2" : "p-2"}>
                  <div>
                    <div className="p-2 font-weight-bold">
                      Add Ons{" "}
                    </div>
                    <div id="variants" className="p-2">
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> Add-ons Descriptions</div>
                        <AvField name="desc" type="text" name="addOnDes" value={addOnItemDescV2} className="t4finput-sm w-100" id="desc" placeholder="You can choose only 2 option" onChange={(e) => setAddOnItemsDescV2(e.target.value)} />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> Add-ons Food Item</div>
                        {/* <Select options={addons} isMulti /> */}
                        {/* {JSON.stringify(addonlabel)} */}
                        <Select options={drpalladdons} value={addonlabel} isMulti onChange={addOnData} />
                      </FormGroup>
                     {/*  <div className="mb-2 font-weight-bold">
                        Select Button
                        <div className="d-flex flex-row">
                          <div className="buttonBox">
                            <span className="t4fradioCF">
                              <label>
                                <input type="radio" name="groupaddon" value="Single" onChange={(e) => addOnSelectButton(e)} />
                                <span></span>
                              </label>
                            </span>
                          </div>

                          <div className="mx-2 d-flex flex-row buttonBox">
                            <div>
                              <div class="form-check d-none">
                                <span className="px-2 py-2">
                                  <input type="checkbox" checked={addonchecked} id="addonCusType" />
                                  <label for="addonCusType"></label>
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="t4fradioCFbox">
                                <label>
                                  <input type="radio" value="Double" name="groupaddon" onChange={(e) => addOnSelectButton(e)} />
                                  <span></span>
                                </label>
                              </span>
                            </div>
                          </div> 
                        </div>
                      </div>*/}
                      {/* <div className="mb-2 font-weight-bold">
                        Customer Specification
                        <div>
                          <div className="mt-1 d-flex flex-row">
                            <div className="btn">
                              <label className="switch">
                                <input type="checkbox" checked={addOnCus_Spec_} onChange={(e) => addOnCus_Spec(e)} />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="px-2">{addOnCus_Spec_ ? "Mandatory" : "Optional"}</div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              {/* {!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Please wait...." type="info" />} */}

              {success && (
                <Alert className="w-100" message="Food Item is updated." type="info" />
              )}
              {error && (
                <Alert className="w-100" message={errMsg} type="danger" />
              )}
              <button color="primary" isDisabled={isLoaded} className="t4fbutton-long m-1" type="submit">
                {!isLoaded ? updateButton : "Please Wait..."}
              </button>
              <button color="primary" className=" t4fbutton-long color-gray m-1" type="button" onClick={(e) => props.setItemEditFlag(false)}>
                Cancel
              </button>
            </div>
          </FormGroup>
        </AvForm>
      </div>
    </>
  );
};

export default EditFoodItem;

import React, { useEffect, useState } from "react";
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
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import config from "../../../../../container/app/navigation.json";
const CreateFoodItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [foodname, setFoodName] = useState("");
  const [fooddes, setFoodDes] = useState("");
  const [addOnDes, setAddOnDes] = useState("");
  const [pic, setpic] = useState("");
  const [cus, setAddCustomisation] = React.useState(false);
  const [cuisine, setCuisine] = useState(0);
  const [customiseType, setCustomiseType] = useState([]);
  const [addOn, setAddon] = useState(false);
  const [pizza, setPizza] = useState(false);
  const [biryani, setBiryani] = useState(false);
  const [egg, setEgg] = useState(false);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [reccommended, setReccommended] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(false);
  const [CusFoodItemChecked, setCusFoodItemChecked] = useState(false);
  const [addOnCus_Spec_, setaddOnCus_Spec] = useState(false);
  const [category, setCategory] = useState(null);
  const [CusItemCus_Spec_, setCusItemCus_Spec] = useState(false);
  const [subCategory, setSubCategory] = useState(null);

  const { t } = useTranslation();

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

  useEffect(() => {

  }, [])

  const resetForm = () => {
    console.log('in reset form')
    setCategory(null);
  }

  const handleChange = (inputValue, data) => {
    if (data === "category" && inputValue != null) setCategory(inputValue.value);
    if (data === "subCategory" && inputValue != null) setSubCategory(inputValue.value);
    if (data === "cuisine" && inputValue != null) setCuisine(inputValue.value);
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
  useEffect(() => {
    console.log("menuimages1", menuimages);
    getaddons();
  }, [fvVariant, showFV, clear]);

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

  const allCustomizeFoodItem = useSelector((state) => state.merchant.customizeFoodItem.filter((item) => item.visible === true));
  //console.log("customiseFoodItems_Latest bala <> ", allCustomizeFoodItem);

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
    //setdrpNewFoodVariant(inputValue);
    if (inputValue.length >= 1) setshowFV(true);
    if (inputValue.length == 0) setshowFV(false);
    showVariants(inputValue);
    setFVvariant(inputValue);
    GetStringValues(inputValue, "customiseType");
  };

  const addOnData = (inputValue) => {
    console.log("addonvalues", inputValue);
    GetStringValues(inputValue, "addon");
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
      setDynamicVariantState({ ...dynamicVariantState, [type]: true });
    } else {
      // setCusFoodItemChecked(false);
      setDynamicVariantState({ ...dynamicVariantState, [type]: false });
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

  const [dynamicstate, setDynamicstate] = useState([]);

  const variantData = (inputValue, custype) => {
    GetStringValues(inputValue, "cusfooditem", custype);
  };
  const GetStringValues = (inputValue, type, custype) => {
    if (type === "customiseType") {
      const customisetypeArray = inputValue.map((value) => {
        return value.value;
      });
      console.log("customiseType values alone", customisetypeArray);
      setCustomiseType(customisetypeArray);
    } else if (type === "addon") {
      const addonids = inputValue.map((value) => {
        return value.value.toString();
      });
      setaddonlabel(addonids);
    } else if (type === "cusfooditem") {
      const customiseFoodItems_array = inputValue.map((item) => {
        return custype + "~" + item.label;
      });
      // if (dynamicstate.length === 0 || dynamicstate === undefined) {
      //   setDynamicstate({ [custype]: [customiseFoodItems_array] });
      // }
      // else {
      setDynamicstate({ ...dynamicstate, [custype]: customiseFoodItems_array });
      // }
      // setcustomiseFoodItems_dropdown(customiseFoodItems_array);
      console.log("customiseFoodItems_arrayalone", dynamicstate);
    }
  };

  const [taxType, setTaxType] = useState("E");

  const handleSubmit = (event, errors, values) => {
    let data = {
      availableCustomisation: false,
      category: category,
      cuisine: cuisine,
      subCategory: category,
      //subCategory: subCategory,
      foodItemName: values.foodItemName,
      description: values.description,
      addOn: addOn,
      egg: egg,
      veg: veg,
      nonVeg: nonVeg,
      pizza: pizza,
      reccommended: reccommended,
      rating: "4",
      taxType
    };
    const lengthCustomizeType = customiseType != null ? customiseType.length : 0;
    var _values = [];
    // For Size, Base Descriptions
    for (var i = 0; i < lengthCustomizeType; i++) {
      let _name = "description" + customiseType[i];
      _values.push(customiseType[i] + "~" + values[_name]);
      console.log("concat1", _name, values[_name]);
      console.log("Please enter description");
      // if (values[_name] === "" && cus) {
      //   console.log("Please enter description");
      //   return;
      // }
    }
    console.log("concatenatedvalues", _values);
    // select Single Double radio buttons
    var _valuesSelect = [];
    for (var i = 0; i < lengthCustomizeType; i++) {
      let _name = "groupFVLabel" + customiseType[i];
      if (values[_name] === undefined) {
        _valuesSelect.push(customiseType[i] + "~" + "Single");
      } else {
        _valuesSelect.push(customiseType[i] + "~" + values[_name]);
      }
      console.log("concat1 select", _name, values[_name]);
    }
    console.log("concatenatedvaluesselect", _valuesSelect);

    // select Mandatory Optinonal checkbox
    var _valuesCusSpec = [];
    for (var i = 0; i < lengthCustomizeType; i++) {
      let _name = "CusSpecFVLable" + customiseType[i];
      if (values[_name] === undefined) {
        _valuesCusSpec.push(customiseType[i] + "~" + "Optional");
      } else {
        _valuesCusSpec.push(customiseType[i] + "~" + values[_name]);
      }
      console.log("concat1 CusSpecFVLable", _name, values[_name]);
    }
    console.log("concatenated_CusSpecFVLable", _valuesCusSpec);

    let data1 = {
      foodItemDescription: values.CusTypefooddec,
      foodItemName: values.CusTypefoodname,
      customiseTypes: customiseType,
      customiseFoodItemsDescriptions: _values,
      customiseFoodItems: Object.keys(dynamicstate)
        .map((a) => {
          return dynamicstate[a];
        })
        .flat(), // need to add for all variants
      customiseFoodItemsCustomerSpecifications: _valuesCusSpec,
      customiseFoodItemsSelectButtons: _valuesSelect,
      addOnCustomerSpecification: addOnCus_Spec_ ? "Mandatory" : "Optional",
      addOnDescription: values.addOnDes,
      addOnItemsIds: addonlabel,
      addOnSelectButton: addonchecked ? "Double" : "Single",
    };
    console.log("create food item data ", data);
    console.log("create food item data1 ", data1);
    console.log("cva", category, subCategory);
    //if (category !== null && subCategory !== null && values.foodItemName != "" && values.description != "") {
    if (category !== null && values.foodItemName != "") {
      const requestid = uuid();
      addFoodItem(data, data1, requestid);
      setAddFoodItem(false);
    } else {
      setMessage("Please select all fileds");
      setType("warn");
      return;
    }
  };

  const addFoodItem = async (data, data1, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addFoodItem", JSON.stringify(data));
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/menu/create-food-item?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}&request-id=${requestid}`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          addFoodImages(menuimages, requestid, data);
          if (cus) addCustomiseFooditems(data1, requestid);
          validationMessage = response.data.data;
          messageType = "success";
          console.log("food item", response);
          setSuccess((success) => !success);
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
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: true });
  };

  const addCustomiseFooditems = async (data1, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addCustomiseFooditems", data1);

    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/menu/add-customised-food-items?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}&request-id=${requestid}`, data1, "merchant")
      .then((response) => {
        if (response.status === 200) {
          //dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: data });
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          //addFoodImages(menuimages, requestid);
          //validationMessage = response.data.data;
          //messageType = "success";
          console.log("Entered addCustomiseFooditems", response.data.data);
          //setSuccess((success) => !success);
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
  };

  const handleImageUpload_menu = (e) => {
    console.log("menu data images", e);
    if (e.target.files) {
      const data = new FormData();
      data.append("pic", e.target.files[0]);
      // setIsIdLoaded((isIdLoaded) => !isIdLoaded);
      console.log("menu data images", data);
      setMenuimages(data);
      console.log("menu imagess state", menuimages);
    }
  };

  const addFoodImages = (menuimages, requestid, data) => {
    console.log("Upload_menu", menuimages);
    const response = reduxPostData(`/api/menu/upload-food-item-pics?fs-id=${currentFoodstallID}&request-id=${requestid}`, menuimages, "merchant", true)
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
    setAddFoodItem(true)
  };

  var dropDownList;
  console.log('create food item render');
  return (
    <>
      <div id="add-food-Item-success" className={success ? "" : "d-none"}>
        <div className="mt-5">{!isLoaded ? <FoodItemAddSuccess role={props.role} toggle={(e) => (toggle(), setMessage(""), Intialise())} /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
      </div>
      <div className="p-2" className={!success ? "" : "d-none"}>
        <div className="px-2">
          <button type="button" className="t4fbutton-gray-auto " onClick={(e) => (setAddFoodItem(true), Intialise())}>
            <img src={addblue} alt="edit" height="16" className="pb-1" /> {t('add_food_item')}
          </button>
        </div>
        {isLoaded ? (
          <div className="w-50 p-2">
            <Alert className="w-100" message="Please wait...." type="info" />{" "}
          </div>
        ) : (
          ""
        )}
        <AvForm id="createFoodItem" className={addFooditem ? "form-horizontal text-color-gray" : "d-none"} onSubmit={handleSubmit}>
          <FormGroup>
            <div className="row mt-2 fullBorder">
              <div className="col-lg-3 rightBorder">
                <div className="fooditem_Header p-2">{t('food_item')}</div>
                <div className=" p-2">
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> {t('category_type')}:</div>
                    <Select id="drpcategory" name="category" options={categoryType} values={category} onChange={(e) => handleChange(e, "category")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> {t('sub_category_type')}:</div>
                    <Select id="drpsubCategory" name="subCategory" options={subCategoryType} values={subCategory} onChange={(e) => handleChange(e, "subCategory")} />
                  </FormGroup>

                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold">
                      {" "}
                      {t('food_name')} <img src={trash} alt="edit" height="16" className="pb-1" />
                    </div>
                    <AvField name="foodItemName" type="text" value={foodname} className="t4finput-sm w-100" id="foodItemName" required errorMessage="Please enter food name" onChange={(e) => setFoodName(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> {t('food_description')}</div>
                    <AvField name="description" type="text" value={fooddes}
                      className="t4finput-sm w-100" id="description"
                      errorMessage="Description must be between 1 to 200 characters."
                      onChange={(e) => setFoodDes(e.target.value)}
                    // validate={{
                    //   required: { value: true },
                    //   minLength: { value: 1 },
                    //   maxLength: { value: 200 }
                    // }}
                    />
                  </FormGroup>
                  <div class="form-check px-1">
                    <span className="px-2">
                      <input type="checkbox" name="addOn" id="addOn" checked={addOn} onChange={(e) => (setAddon(e.target.checked), setshowAddons((showAddons) => !showAddons))} />
                      <label for="addOn">{t('add_ons')}</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="egg" id="egg" checked={egg} onChange={(e) => setEgg(e.target.checked)} />
                      <label for="egg">{t('egg')}</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="veg" id="veg" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                      <label for="veg">{t('veg')}</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="nonveg" id="nonveg" checked={nonVeg} onChange={(e) => setNonVeg(e.target.checked)} />
                      <label for="nonveg">Non-Veg</label>
                    </span>

                    <span className="px-2">
                      <input type="checkbox" name="reccommended" id="reccommended" checked={reccommended} onChange={(e) => setReccommended(e.target.checked)} />
                      <label for="reccommended">{t('recommended')}</label>
                    </span>
                  </div>

                  <div className="mb-2 font-weight-bold">
                    {t('upload_image')}
                    <input type="file" accept="image/*" className="t4finput-sm w-100" onChange={handleImageUpload_menu}></input>
                  </div>
                  
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> {t('select_cuisine')}</div>
                    <Select name="cuisine" options={cusine} isClearable onChange={(e) => handleChange(e, "cuisine")} />
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
                    <button type="button" className="t4fbutton-gray w-100 " onClick={(e) => (setAddCustomisation((cus) => !cus), setshowFV((showFV) => !showFV))}>
                      <img src={addblue} alt="edit" height="16" className="pb-1" /> <b>{t('add_custiomization')}</b>
                    </button>
                  </div>
                </div>
              </div>
              <div id="customizableDetails" className="col-lg-3 rightBorder">
                <div className="fooditem_Header p-2 ">{t('customizable_details')}</div>
                <div id="CusContent" className={cus ? "" : "d-none"}>
                  <div className=" p-2">
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('food_name')}</div>
                      <AvField
                        name="CusTypefoodname"
                        type="text"
                        className="t4finput-sm w-100"
                        id="foodname"
                        validate={{
                          required: cus,
                        }}
                        value={foodname}
                        errorMessage="Please enter food name"
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('food_description')}</div>
                      <AvField
                        name="CusTypefooddec"
                        type="text"
                        className="t4finput-sm w-100"
                        id="fooddec"
                        // validate={{
                        //   required: cus,
                        // }}
                        value={fooddes}
                        errorMessage="Please enter description"
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('customize_type')}</div>
                      <Select id="drpCustomizeType" name="drpCustomizeType" options={CustomizeType} isMulti values={customiseType} onChange={CusType_PopulateFoodVariant} />
                    </FormGroup>
                    <div class="form-check px-1">
                      <span className="px-2">
                        <input type="checkbox" name="pizza" id="pizza" checked={pizza} onChange={(e) => { setPizza(e.target.checked); setBiryani(false) }} />
                        <label for="pizza">Pizza</label>
                      </span>
                    </div>
                    <div class="form-check px-1">
                      <span className="px-2">
                        <input type="checkbox" name="biryani" id="biryani" checked={biryani} onChange={(e) => { setBiryani(e.target.checked); setPizza(false) }} />
                        <label for="biryani">Biryani</label>
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

                    {biryani ? (
                      <div class="form-check px-1">
                        <div className="px-2 border rounded">
                          For Biryani, the size is mandatory.
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div id="variants" className="p-2 bg-light-gray d-none">
                      <FormGroup className="mb-2">
                        <div className="mb-1 "> Food Variants</div>
                        <Select options={CustomizeType} isMulti />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <div className="mb-1"> Extra Variants</div>
                        <Select options={CustomizeType} isMulti />
                      </FormGroup>
                    </div>
                    <div className="mt-2"></div>
                  </div>
                </div>
              </div>
              {/* commemted variants columns as it removed from requirements */}
              <div id="variants" className="col-lg-3 rightBorder ">
                <div className="fooditem_Header p-2 ">{t('variants')}</div>
                <div className={showFV ? "p-2 fvheight" : "d-none"}>
                  <div className="mb-1 d-none ">Food Variants</div>
                  {fvVariant.map(
                    (ip, index) => (
                      (dropDownList = generateCombinations(
                        allCustomizeFoodItem
                          .filter((item) => {
                            return item.customiseType === ip.value;
                          })
                          .map((item) => item.foodItemName)
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
                              <div className="mb-1"> Customize Description</div>
                              <AvField name="desc"
                                type="text"
                                className="t4finput-sm w-100" name={"description" + ip.value}
                                // required={showFV}
                                placeholder="You can choose only 1 option" />
                            </FormGroup>
                            <FormGroup className="mb-2">
                              <div className="mb-1"> {t('customize_food_item')}</div>
                              <Select options={dropDownList} isMulti onChange={(e) => variantData(e, ip.value)} name={"dropdown" + ip.value} />
                            </FormGroup>
                            <div className="mb-2">
                              {t('select_button')}
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
                                  {/* make it invisible */}
                                  <AvInput className="texttoLabel d-none" name={"groupFVLabel" + ip.value} id={index} value={dynamicVariantState[ip.value] === true ? "Double" : "Single"} disabled />
                                </div>
                              </div>
                            </div>
                            {/* <div className="mb-2 font-weight-bold">
                              {t('customer_specification')}
                              <div>
                                <div className="mt-1 d-flex flex-row align-items-center">
                                  <div className="btn align-items-center">
                                    <label className="switch">
                                      <input type="checkbox" value={dynamicCustomerSpec[ip.value] ? "Mandatory" : t("optional")} name={"CusSpecFV" + ip.value} onChange={(e) => CusItemCus_Spec(e, ip.value)} />
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                  <div className="align-items-center">
                                    <AvInput className="texttoLabel" name={"CusSpecFVLable" + ip.value} value={dynamicCustomerSpec[ip.value] ? "Mandatory" : t("optional")} disabled />
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      )
                    )
                  )}
                  <div className="mt-2"></div>
                </div>
              </div>
              <div id="customisetype" className="rightBorder col-lg-3">
                <div className="fooditem_Header p-2">{t('suggestions')}</div>
                <div className={showAddons ? "p-2" : "p-2"}>
                  <div>
                    <div className="p-2 font-weight-bold">
                      Add Ons
                      <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
                    </div>
                    <div id="variants" className="p-2">
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> {t('add_ons_descriptions')}</div>
                        <AvField name="desc" type="text" name="addOnDes" className="t4finput-sm w-100" id="desc" placeholder="You can choose only 2 option" />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> {t('add_ons_food_item')}</div>
                        {/* <Select options={addons} isMulti /> */}
                        <Select options={drpalladdons} isMulti onChange={addOnData} />
                      </FormGroup>
                      {/* <div className="mb-2 font-weight-bold">
                        {t('select_button')}
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
                      </div> */}
                      {/* <div className="mb-2 font-weight-bold">
                        {t('customer_specification')}
                        <div>
                          <div className="mt-1 d-flex flex-row">
                            <div className="btn">
                              <label className="switch">
                                <input type="checkbox" checked={addOnCus_Spec_} onChange={(e) => addOnCus_Spec(e)} />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="px-2">{addOnCus_Spec_ ? "Mandatory" : t("optional")}</div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              {!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Please wait...." type="info" />}

              <button color="primary" isDisabled={isLoaded} className="t4fbutton-long m-1" type="submit">
                {!isLoaded ? t("save") : "Please Wait..."}
              </button>
              {/* <button color="primary" className=" t4fbutton-long color-gray m-1" type="button" onClick={(e) => setAddFoodItem(false)}>
                Cancel
              </button> */}
              <button color="primary" className=" t4fbutton-long color-gray m-1" type="button" onClick={(e) => (setAddFoodItem(false), resetForm())} >
                {t('cancel')}
              </button>
            </div>
          </FormGroup>
        </AvForm>
      </div>
    </>
  );
};

export default CreateFoodItem;

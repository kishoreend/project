import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import addblue from "../../../../../assets/icons/addblue.png";
import trash from "../../../../../assets/icons/trash.png";
import FoodItemAddSuccess from "../../../../../components/Common/FoodItemAddSuccess";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../../../components/Common/Alert";
import uuid from "react-uuid";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import config from "../../../../../container/app/navigation.json";
const CreateFoodItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [foodname, setFoodName] = useState("");
  const [fooddes, setFoodDes] = useState("");
  const [pic, setpic] = useState("");
  const [cus, setAddCustomisation] = React.useState(false);
  const [clear, setClear] = React.useState(false);
  const [cuisine, setCuisine] = useState(0);
  const [addOn, setAddon] = useState(false);
  const [egg, setEgg] = useState(false);
  const [veg, setVeg] = useState(false);
  const [reccommended, setReccommended] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [allglobalcustomiseFoodItem, setallCustomiseItems] = useState([]);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(false);

  // drop down dynamic
  const [drpNewFoodVariant, setdrpNewFoodVariant] = useState([]);
  const [drpNewExtraVariant, setdrpNewExtraVariant] = useState([]);
  const [uiVairants, setUIVairants] = useState([]);
  const [showFV, setshowFV] = useState(false);
  const [showEV, setshowEV] = useState(false);
  const [showAddons, setshowAddons] = useState(false);
  const [addonValue, setAddonValue] = useState("");

  const [menuimages, setMenuimages] = useState(new FormData());
  const [allAdons, setallAdons] = useState([]);
  const [fvVariant, setFVvariant] = useState([]);

  const [addonlabel, setaddonlabel] = useState([]);
  const [evVariant, setEVvariant] = useState([]);
  let allCombinations = [];
  let alldrpcustomiseFoodItemFV = [];
  const [alldrpcustomiseFoodItemFV1, setalldrpcustomiseFoodItemFV] = useState([]);
  let alldrpcustomiseFoodItemEV = [];
  const [alldrpcustomiseFoodItemEV1, setalldrpcustomiseFoodItemEV] = useState([]);
  const [drpaddons, setdrpaddons] = useState([]);

  const Intialise = () => {
    console.log("Intialise");

    //setClear(true);
    //setSubCategory(null);
    setpic("");
    setFoodDes("");
    setFoodName("");
    setEgg(false);
    setAddon(false);
    setVeg(false);
    setReccommended(false);
    setAddCustomisation(false);
    setshowFV(false);
    setshowFV(false);
    setshowAddons(false);
    setMenuimages(new FormData());
  };

  const handleChange = (e, data) => {
    if (data === "category") setCategory(e.value);
    if (data === "subCategory") setSubCategory(e.value);
    if (data === "cuisine") setCuisine(e.value);
  };
  //const dispatch = useDispatch();
  // all categories
  const allCategories = useSelector((state) => state.merchant.categories);
  const categoryType = [];
  allCategories.map((obj) => {
    if ((obj.visible = true)) categoryType.push({ value: obj.category, label: obj.category });
  });
  // all sub categories
  const allSubCategories = useSelector((state) => state.merchant.subCategories);
  console.log("allSubCategories", allSubCategories);
  const subCategoryType = [];
  allSubCategories.map((obj) => {
    if ((obj.visible = true)) subCategoryType.push({ value: obj.subCategory, label: obj.subCategory });
  });

  const allCuisines = useSelector((state) => state.merchant.cuisines);
  const cusine = [];
  allCuisines.map((obj) => {
    if ((obj.visible = true)) cusine.push({ value: obj.name, label: obj.name });
  });

  const allCustomizeType = useSelector((state) => state.merchant.customizeType);
  const CustomizeType = [];
  allCustomizeType.map((obj) => {
    if ((obj.visible = true)) CustomizeType.push({ value: obj.type, label: obj.type });
  });
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const newarray = [{ id: 0, index: 0, type: "", name: "", price: "" }];
  const customiseFoodItems_Latest = [
    ...(allCustomizeType != undefined && allCustomizeType != null
      ? allCustomizeType.map((obj, index) =>
          obj.customizeFoodItems && obj != undefined
            ? Object.keys(obj.customizeFoodItems).map((cusItem, index2) => {
                return { id: obj.id + index2, index: index + 1, type: obj.type, name: cusItem, price: obj.customizeFoodItems[cusItem] };
              })
            : newarray
        )
      : newarray),
  ].flat();
  //let customiseFoodItems_Latest = [...customiseItemsv1].flat();
  console.log("customiseFoodItems_Latest <> ", customiseFoodItems_Latest);
  const alldrpcustomiseFoodItem = [];
  customiseFoodItems_Latest.map((obj, index) => {
    if (obj.type != "") {
      alldrpcustomiseFoodItem.push({ value: index, label: obj.name });
    }
  });

  function generateCombinations(items) {
    console.log("generateCombinations", "allCombinations", allCombinations);
    console.log("generateCombinations", "array1", items);
    let combinations = [];

    for (var i = 0; i < items.length; i++) {
      combinations.push({ value: i, label: items[i] });
    }

    return combinations;
  }

  function showVariants(array1) {
    array1.map((ip) => {
      console.log("getDrp ip inside", ip.label);
      if (ip.label == "Add-Ons" || ip.label == "Add Ons" || ip.label == "AddOns" || ip.label == "Addons" || ip.label == "ADD-ONS" || ip.label == "ADD ONS") {
        customiseFoodItems_Latest.map((obj, index) => {
          setshowFV(true);
        });
      }
      if (ip.label == "Add-Ons" || ip.label == "Add Ons" || ip.label == "AddOns" || ip.label == "Addons" || ip.label == "ADD-ONS" || ip.label == "ADD ONS") {
        setAddonValue(ip.label);
        setshowAddons(true);
      }
    });
  }

  const CusType_PopulateFoodVariant = (inputValue) => {
    console.log("values", inputValue);
    setdrpNewFoodVariant(inputValue);
    if (inputValue.length >= 1) setshowFV(true);
    if (inputValue.length == 0) setshowFV(false);
    showVariants(inputValue);
    setFVvariant(inputValue);
  };

  const handleSubmit = (event, errors, values) => {
    console.log("create add food item data entered");
    console.log("create add food item data ", values);
    console.log("create add food item new ", !cus);

    console.log("create add food item data inside", values);
    let data = {
      availableCustomisation: false,
      category: category,
      cuisine: cuisine,
      subCategory: subCategory,
      foodItemName: values.foodItemName,
      description: values.description,
      addOn: addOn,
      egg: egg,
      veg: veg,
      reccommended: reccommended,
      rating: "4",
    };

    let data1 = {
      category: category,
      extraVariant: "Base-Small, Base-Medimum",
      foodItemName: foodname,
      itemDescription: fooddes,
      price: 500,
      subCategory: subCategory,
      variant: "Handtoasted, Thin Crust",
    };
    console.log("create food item data ", data);
    console.log("add food item data ", JSON.stringify(data1));

    if (category != 0 && cuisine != 0 && values.foodItemName != "" && values.description != "") {
      const requestid = uuid();
      addFoodImages(menuimages, requestid);
      addFoodItem(data, requestid);
      addCustomiseFooditems(data1, requestid);
      setAddFoodItem(false);
    } else {
      return;
    }
  };

  const addFoodItem = async (data, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addFoodItem", JSON.stringify(data));
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/menu/create-food-item?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}&request-id=${requestid}`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: data });
          validationMessage = response.data.status;
          messageType = "success";
          console.log("food item", response.data.data);
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
  };

  const addCustomiseFooditems = async (data1, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered addFoodItem", JSON.stringify(data1));

    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/menu/add-customised-food-items?fs-id=${currentFoodstallID}&merchant-id=${uniqueNumber}&request-id=${requestid}`, data1, "merchant")
      .then((response) => {
        if (response.status === 200) {
          //dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: data });
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          //addFoodImages(menuimages, requestid);
          validationMessage = response.data.status;
          messageType = "success";
          console.log("food item", response.data.data);
          setSuccess((success) => !success);
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
      console.log("menu imagess state", menuimages.values);
    }
  };

  const addFoodImages = (menuimages, requestid) => {
    console.log("Upload_menu", menuimages);
    const response = reduxPostData(`/api/menu/upload-food-item-pics?fs-id=${currentFoodstallID}&request-id=${requestid}`, menuimages, "merchant", true)
      .then((response) => {
        console.log("Upload_menu started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("Upload_menu Success");
          //dispatch({ type: merchantActionTypes.UPDATE_MENU_IMAGES, payload: response.data?.data?.pic });
          console.log("Upload_menu from image", response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    // setIsIdLoaded((isIdLoaded) => !isIdLoaded);
  };

  const toggle = () => {
    setSuccess((success) => !success);
  };

  const FoodVariants = (props) => {
    console.log("PAWAN 1", customiseFoodItems_Latest, props);
    const items = customiseFoodItems_Latest
      .filter((item) => {
        return item.type === props.name;
      })
      .map((item) => item.name);
    const dropDownList = generateCombinations(items);
    console.log("PAWAN 2", dropDownList);

    return (
      <div>
        <div id="variants" className="p-2 bg-light-gray mb-2">
          <div className="font-weight-bold mb-2">
            <div className="d-flex justify-content-between">
              <div>{props.name}</div>
              <div>
                {" "}
                <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
              </div>
            </div>
          </div>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Description</div>
            <AvField name="desc" type="text" className="t4finput-sm w-100" name="desc" required={false} id="desc" placeholder="You can choose only 1 option" />
          </FormGroup>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Food Item</div>
            <Select options={dropDownList} isMulti />
          </FormGroup>
          <div className="mb-2">
            Select Button
            <div className="d-flex flex-row">
              <div className="buttonBox">
                <span className="t4fradioCF">
                  <label>
                    <input type="radio" name="groupFV" />
                    <span></span>
                  </label>
                </span>
              </div>

              <div className="mx-2 d-flex flex-row buttonBox2">
                <div>
                  <div class="form-check">
                    <span className="px-2 py-2">
                      <input type="checkbox" id="chkFoodvariant" />
                      <label for="chkFoodvariant"></label>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="t4fradioCF">
                    <label>
                      <input type="radio" name="groupFV" />
                      <span></span>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 font-weight-bold">
            Customer Specification
            <div>
              <div className="mt-1 d-flex flex-row">
                <div className="btn">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="px-2"> Mandatory/Optional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Addons = (props) => {
    console.log("bala adons", props);
    console.log("bala adons", customiseFoodItems_Latest, props);
    const items = customiseFoodItems_Latest
      .filter((item) => {
        return item.type === props.name;
      })
      .map((item) => item.name);
    console.log("items123", items);
    const dropDownList = generateCombinations(items);
    console.log("PAWAN 2", dropDownList);

    return (
      <div>
        <div className="p-2 font-weight-bold">
          {props.name} <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
        </div>
        <div id="variants" className="p-2">
          <FormGroup className="mb-2">
            <div className="mb-1 font-weight-bold"> Add-ons Descriptions</div>
            <AvField name="desc" type="text" className="t4finput-sm w-100" id="desc" placeholder="You can choose only 2 option" />
          </FormGroup>
          <FormGroup className="mb-2">
            <div className="mb-1 font-weight-bold"> Add-ons Food Item</div>
            {/* <Select options={addons} isMulti /> */}
            <Select options={dropDownList} isMulti />
          </FormGroup>
          <div className="mb-2 font-weight-bold">
            Select Button
            <div className="d-flex flex-row">
              <div className="buttonBox">
                <span className="t4fradioCF">
                  <label>
                    <input type="radio" name="groupaddon" />
                    <span></span>
                  </label>
                </span>
              </div>

              <div className="mx-2 d-flex flex-row buttonBox2">
                <div>
                  <div class="form-check">
                    <span className="px-2 py-2">
                      <input type="checkbox" id="addonCusType" />
                      <label for="addonCusType"></label>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="t4fradioCF">
                    <label>
                      <input type="radio" name="groupaddon" />
                      <span></span>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 font-weight-bold">
            Customer Specification
            <div>
              <div className="mt-1 d-flex flex-row">
                <div className="btn">
                  <label className="switch">
                    <input type="checkbox" checked={true} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="px-2"> Mandatory/Optional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id="add-food-Item-success" className={success ? "" : "d-none"}>
        <div className="mt-5">{!isLoaded ? <FoodItemAddSuccess toggle={(e) => (toggle(), setMessage(""))} /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
      </div>
      <div className="p-2" className={!success ? "" : "d-none"}>
        <div className="px-2">
          <button type="button" className="t4fbutton-gray-auto " onClick={(e) => (setAddFoodItem(true), Intialise())}>
            <img src={addblue} alt="edit" height="16" className="pb-1" /> Add Food Item
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
                <div className="fooditem_Header p-2">Food Item</div>
                <div className=" p-2">
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Category Type</div>
                    <Select name="category" options={categoryType} values={category} onChange={(e) => handleChange(e, "category")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Sub Category Type</div>
                    <Select name="subCategory" options={subCategoryType} values={subCategory} onChange={(e) => handleChange(e, "subCategory")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold">
                      {" "}
                      Food Name <img src={trash} alt="edit" height="16" className="pb-1" />
                    </div>
                    <AvField name="foodItemName" type="text" value={foodname} className="t4finput-sm w-100" id="foodItemName" required errorMessage="Please enter food name" onChange={(e) => setFoodName(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Food description</div>
                    <AvField name="description" type="text" value={fooddes} className="t4finput-sm w-100" id="description" required errorMessage="Please enter description" onChange={(e) => setFoodDes(e.target.value)} />
                  </FormGroup>
                  <div class="form-check px-1">
                    <span className="px-2">
                      <input type="checkbox" name="addOn" id="addOn" checked={addOn} onChange={(e) => setAddon(e.target.checked)} />
                      <label for="addOn">Add-ons</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="egg" id="egg" checked={egg} onChange={(e) => setEgg(e.target.checked)} />
                      <label for="egg">Egg</label>
                    </span>
                    <span className="px-2">
                      <input type="checkbox" name="veg" id="veg" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                      <label for="veg">Veg</label>
                    </span>

                    <span className="px-2">
                      <input type="checkbox" name="reccommended" id="reccommended" checked={reccommended} onChange={(e) => setReccommended(e.target.checked)} />
                      <label for="reccommended">Recomended</label>
                    </span>
                  </div>
                  {/* <div class="form-check px-1">
                <AvCheckboxGroup inline name="foodtypes" className="mb-2 font-weight-bold">
                  <AvCheckbox className="t4finput-check text-nowrap" label="Add-ons" name="addOn" onChange={(e) => setAddon(e.target.checked)} />
                  <AvCheckbox className="t4finput-check text-nowrap" label="Egg" name="egg" onChange={(e) => setEgg(e.target.checked)} />
                  <AvCheckbox className="t4finput-check text-nowrap" label="Veg" name="veg" onChange={(e) => setVeg(e.target.checked)} />
                  <AvCheckbox className="t4finput-check text-nowrap" label="Recomended" name="reccommended" onChange={(e) => setReccommended(e.target.checked)} />
                </AvCheckboxGroup>
              </div> */}
                  <div className="mb-2 font-weight-bold">
                    Upload Image
                    <input type="file" accept="image/*" className="t4finput-sm w-100" onChange={handleImageUpload_menu}></input>
                  </div>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Select Cusine</div>
                    <Select name="cuisine" options={cusine} onChange={(e) => handleChange(e, "cuisine")} />
                  </FormGroup>
                  <div>
                    <button type="button" className="t4fbutton-gray w-100 " onClick={(e) => setAddCustomisation((cus) => !cus)}>
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
                        name="foodname"
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
                      <div className="mb-1 font-weight-bold"> Food description</div>
                      <AvField
                        name="fooddec"
                        type="text"
                        className="t4finput-sm w-100"
                        id="fooddec"
                        validate={{
                          required: cus,
                        }}
                        value={fooddes}
                        errorMessage="Please enter description"
                      />
                    </FormGroup>
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> Customise Type</div>
                      <Select options={CustomizeType} isMulti onChange={CusType_PopulateFoodVariant} />
                    </FormGroup>
                    <div class="form-check px-1 d-none">
                      <span className="px-2">
                        <input type="checkbox" id="variant" />
                        <label for="variant">Select Variants</label>
                      </span>
                    </div>
                    {/* <AvCheckboxGroup inline name="foodtypes" className="mb-2">
                <AvCheckbox className="t4finput-check text-nowrap" label="Select Variants" name="addons" />
              </AvCheckboxGroup> */}
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
                <div className="fooditem_Header p-2 ">Variants</div>
                <div className={showFV ? "p-2 fvheight" : "d-none"}>
                  <div className="mb-1 d-none ">Food Variants</div>
                  {fvVariant.map((ip) => (ip.label != "Add-Ons" && ip.label != "Add Ons" && ip.label != "AddOns" && ip.label != "Addons" && ip.label != "ADD-ONS" && ip.label != "ADD ONS" ? <FoodVariants name={ip.value} /> : ""))}
                  <div className="mt-2"></div>
                </div>
              </div>
              <div id="customisetype" className="rightBorder col-lg-3">
                <div className="fooditem_Header p-2">Customise Type</div>
                <div className={showAddons ? "p-2" : "d-none"}>
                  <Addons name={addonValue} />
                </div>
              </div>
            </div>
            <div className="my-3">
              {!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Please wait...." type="info" />}

              <button color="primary" isDisabled={isLoaded} className="t4fbutton-long m-1" type="submit">
                {!isLoaded ? "Save" : "Please Wait..."}
              </button>
              <button color="primary" className=" t4fbutton-long color-gray m-1" type="button" onClick={(e) => setAddFoodItem(false)}>
                Cancel
              </button>
            </div>
          </FormGroup>
        </AvForm>
      </div>
    </>
  );
};

export default CreateFoodItem;

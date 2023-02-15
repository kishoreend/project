import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input, Label } from "reactstrap";
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox, AvRadio, AvRadioGroup, AvGroup, AvInput } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import addblue from "../../../../../assets/icons/addblue.png";
import discount from "../../../../../assets/icons/discount.png";
import price from "../../../../../assets/icons/price.png";
import trash from "../../../../../assets/icons/trash.png";
import CreateOfferAddSuccess from "../../../../../components/Common/CreateofferAddSuccess";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../../../components/Common/Alert";
import uuid from "react-uuid";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import config from "../../../../../container/app/navigation.json";
import { MDBDataTableV5 } from "mdbreact";
import Modal from "react-bootstrap/Modal";
const CreateOffer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [addOnDes, setAddOnDes] = useState("");
  const [pic, setpic] = useState("");
  const [cus, setAddCustomisation] = React.useState(false);
  const [cuisine, setCuisine] = useState(0);
  const [customiseType, setCustomiseType] = useState([]);
  const [addOn, setAddon] = useState(false);
  const [egg, setEgg] = useState(false);
  const [veg, setVeg] = useState(false);
  const [reccommended, setReccommended] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(false);
  const [CusFoodItemChecked, setCusFoodItemChecked] = useState(false);
  const [addOnCus_Spec_, setaddOnCus_Spec] = useState(false);
  const [category, setCategory] = useState(null);
  const [CusItemCus_Spec_, setCusItemCus_Spec] = useState(false);
  const [subCategory, setSubCategory] = useState(null);

  // drop down dynamic
  const [showFV, setshowFV] = useState(false);
  const [showAddons, setshowAddons] = useState(false);
  const [addonchecked, setaddonchecked] = useState(false);
  const [offerimage, setOfferimage] = useState(new FormData());
  const [allAdons, setallAdons] = useState([]);
  const [fvVariant, setFVvariant] = useState([]);
  const [customiseFoodItems_Latest, setcustomiseFoodItems_Latest] = useState([]);
  const [addonlabel, setaddonlabel] = useState([]);
  const [customiseFoodItems_dropdown, setcustomiseFoodItems_dropdown] = useState([]);
  const [clear, setClear] = useState(false);
  const [dynamicVariantState, setDynamicVariantState] = useState([]);
  const [dynamicCustomerSpec, setDynamicCustomerSpec] = useState([]);
  const [dynamicfooditem, setDynamicFooditem] = useState([]);
  // Create offer
  const [listCount, setListCount] = useState(0);
  const [listCount1, setListCount1] = useState([1, 2, 3]);
  const [showftoffer, setShowFoodItem] = useState(false);
  const [pricing, setPricing] = useState([]);
  const [pricing_fooditem, setPricing_fooditem] = useState([]);
  const [fooditemListAdd, setfooditemListAdd] = useState("");
  const [_arry_fooditem, set_arry_fooditem] = useState([]);
  const [_totalPrice, set_totalPrice] = useState(0);
  const [_offerPrice, set_offerPrice] = useState(0);
  const [offerSuggestion, setofferSuggestion] = useState([]);
  var fitemsetUI;
  let allCombinations = [];
  const offercategory = [{ value: "Offers", label: "Offers" }];
  const Intialise = () => {
    console.log("Intialise");
    setClear((clear) => !clear);
    setCategory(null);
    setSubCategory(null);
    setpic("");
    setAddCustomisation(false);
    setshowAddons(false);
    setOfferimage(new FormData());
  };

  const handleChange = (inputValue, data) => {
    if (data === "category" && inputValue != null) setCategory(inputValue.value);
    if (data === "subCategory" && inputValue != null) setSubCategory(inputValue.value);
    if (data === "cuisine" && inputValue != null) setCuisine(inputValue.value);
  };
  const handleClose = () => {
    setShowFoodItem((showftoffer) => !showftoffer);
  };
  const drpalladdons = [];
  allAdons.map((obj) => {
    drpalladdons.push({ value: obj.foodItemId, label: obj.itemName });
  });

  useEffect(() => {
    getaddons();
    getPricing();
    getPricing_fooditem();
    console.log("pricing.concat(pricing_fooditem", pricing.concat(pricing_fooditem));
  }, [fvVariant, showFV, clear, currentFoodstallID, isFoodItemAdded]);

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

  const allCuisines = useSelector((state) => state.merchant.cuisines);
  const cusine = [];
  allCuisines.map((obj) => {
    if (obj.visible === true) cusine.push({ value: obj.name, label: obj.name });
  });

  const addOnData = (inputValue) => {
    console.log("addonvalues", inputValue);

    let offerSuggestion1 = [];
    const addonvalue = inputValue.map((value) => {
      offerSuggestion1.itemName = value.label;
    });
    offerSuggestion.push(offerSuggestion1);
    console.log("offerSuggestion", offerSuggestion);
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
        console.log("value.value.toString()", value.value.toString());
        return value.value.toString();
      });
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

  const handleSubmit = (event, errors, values) => {
    let data_createoffer = {
      category: "Offer",
      cuisine: cuisine,
      offerDate: new Date().toString(),
      offerPrice: _offerPrice,
      totalPrice: _totalPrice,
      offerType: "Offer",
      subCategory: subCategory,
      title: values.title,
      description: values.des,
    };
    console.log("data_createoffer", data_createoffer);
    //select List offer descriptions
    var _values = [];
    for (var i = 0; i < listCount; i++) {
      let _name = "description" + i + 1;
      _values.push(values[_name]);
      console.log("list offer desc", values[_name]);
      console.log("Please enter description");
      if (values[_name] === "" && cus) {
        console.log("Please enter description");
        return;
      }
    }
    console.log("list offer desc", _values);
    //select List offer Single Double radio buttons
    var _valuesSelect = [];
    for (var i = 0; i < listCount; i++) {
      let _name = "groupFVLabel" + +i + 1;
      if (values[_name] === undefined) {
        _valuesSelect.push("Single");
      } else {
        _valuesSelect.push(values[_name]);
      }
      console.log("concat1 select", values[_name]);
    }
    console.log("concatenatedvaluesselect", _valuesSelect);

    //select List offer Mandatory Optinonal checkbox
    var _valuesCusSpec = [];
    for (var i = 0; i < listCount; i++) {
      let _name = "CusSpecFVLable" + +i + 1;
      if (values[_name] === undefined) {
        _valuesCusSpec.push("Optional");
      } else {
        _valuesCusSpec.push(values[_name]);
      }
      console.log("concat1 CusSpecFVLable", values[_name]);
    }
    console.log("concatenated_CusSpecFVLable", _valuesCusSpec);
    let aarayfoodItems = [
      {
        actualPrice: 200,
        customizationFlag: true,
        itemId: "1",
        itemName: "FoodItemName",
        offerPrice: 150,
      },
      {
        actualPrice: 200,
        customizationFlag: true,
        itemId: "1",
        itemName: "FoodItemName",
        offerPrice: 150,
      },
    ];
    let aaraySuggestions = [
      {
        itemName: "Pepsi",
      },
      {
        itemName: "Code",
      },
    ];

    console.log("testhere", dynamicfooditem);

    let _arry_offerListing = [];
    for (var i = 0; i < listCount; i++) {
      let data_OfferListing = {};
      data_OfferListing.buttonType = _valuesCusSpec[i];
      data_OfferListing.customerSpecification = _valuesSelect[i];
      data_OfferListing.description = _values[i];
      var fitem = Object.keys(dynamicfooditem).map((food) => {
        return dynamicfooditem[food]?.map((foodItem) => {
          return foodItem;
        });
      });
      data_OfferListing.foodItems = fitem[i];

      //data_OfferListing.foodItems = dynamicfooditem[i].foodItemList01;
      _arry_offerListing.push(data_OfferListing);
    }

    let data_suggestions = {
      buttonType: addonchecked ? "Double" : "Single",
      customerSpecification: addOnCus_Spec_ ? "Mandatory" : "Optional",
      description: values.addOnDes,
      suggestionItems: offerSuggestion,
    };

    console.log("data_OfferListing", JSON.stringify(_arry_offerListing));
    console.log("valuesonsave", _arry_offerListing);

    if (values.foodItemName != "" && values.description != "" && listCount !== 0 && _arry_offerListing.length !== 0) {
      const requestid = uuid();
      createOffer(data_createoffer, _arry_offerListing, data_suggestions, requestid);
    } else {
      setMessage("Please select all fileds");
      setType("warn");
      return;
    }
  };

  const createOffer = (data_createoffer, data_OfferListing, data_suggestions, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered data_createoffer", JSON.stringify(data_createoffer));
    setIsLoaded((isLoaded) => !isLoaded);
    const response = reduxPostData(`/api/merchant/offer/create-offer?fsId=${currentFoodstallID}&requestId=${requestid}`, data_createoffer, "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          addOfferImages(offerimage, response.data.data.offerId);
          addListingFooditems(data_OfferListing, response.data.data.offerId);
          saveOfferSuggestions(data_suggestions, response.data.data.offerId);
          validationMessage = response.data.data;
          messageType = "success";
          console.log("food item", response);
          setSuccess((success) => !success);
          setofferSuggestion([]);
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    //setMessage("validationMessage");
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: true });
  };

  const addListingFooditems = async (data_OfferListing, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered data_OfferListing", data_OfferListing);
    const response = await reduxPostData(`/api/merchant/offer/upload-offer-items-list?fsId=${currentFoodstallID}&offerId=${requestid}`, data_OfferListing, "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("response data_OfferListing", response.data);
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
  };
  const saveOfferSuggestions = async (data_suggestions, requestid) => {
    let validationMessage = "";
    let messageType = "";
    console.log("Entered saveOfferSuggestions", data_suggestions);
    const response = await reduxPostData(`/api/merchant/offer/save-offer-suggestions?fsId=${currentFoodstallID}&offerId=${requestid}`, data_suggestions, "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("Entered addCustomiseFooditems", response.data.data);
          //setSuccess((success) => !success);
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
  };

  const handleImageUpload_menu1 = (e) => {
    console.log("menu data images", e);
    if (e.target.files) {
      let _image_data = new FormData();
      _image_data.append("pic", e.target.files[0]);
      // setIsIdLoaded((isIdLoaded) => !isIdLoaded);
      console.log("offer data images", _image_data);
      setOfferimage(_image_data);
      console.log("offer imagess state", offerimage);
    }
  };

  const addOfferImages = (offerimage, requestid) => {
    console.log("Upload_menu", offerimage);
    // const response = reduxPostData(`/api/menu/upload-food-item-pics?fs-id=${currentFoodstallID}&request-id=${requestid}`, offerimage, "merchant", true)
    const response = reduxPostData(`/api/merchant/offer/upload-offer-image?fsId=${currentFoodstallID}&offerId=${requestid}`, offerimage, "merchant", true)
      .then((response) => {
        console.log("Upload_menu started", response);
        if (response.status === 200 || response.data?.status === "success") {
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

  var dropDownList;

  const getPricing = async () => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/menu/get-fooditems-customizing-pricing-details?fs-id=${currentFoodstallID}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 getPricing", response);
          setPricing(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setPricing([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setPricing([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };
  const getPricing_fooditem = async () => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/menu/get-fooditems-pricing-details?fs-id=${currentFoodstallID}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 getPricing", response);
          setPricing_fooditem(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setPricing_fooditem([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setPricing_fooditem([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };
  let foodItemList = "123";
  //let _arry_fooditem = [];
  const addFoodItems = (id, fooditemname, customtype, price, offerprice, checked) => {
    if (checked == true) {
      console.log("foodItemList1111111", checked);
      // array from  table and send to service
      console.log("customtypegrid", customtype);
      let data_fooditem = {};
      data_fooditem.itemName = fooditemname + " " + (customtype !== undefined ? customtype.replaceAll("##", " ") : "");
      data_fooditem.actualPrice = price;
      data_fooditem.offerPrice = offerprice === undefined || offerprice === "" ? 0 : offerprice;
      data_fooditem.customizationFlag = customtype === undefined ? false : true;
      // if (_arry_fooditem.length === 0) {
      // set_arry_fooditem(_arry_fooditem.push(data_fooditem));
      let merge_array = [..._arry_fooditem, data_fooditem];
      console.log("setDynamicFooditem1", merge_array);
      set_arry_fooditem(merge_array);
      // console.log("setDynamicFooditem2", _arry_fooditem)
      set_totalPrice(_totalPrice + price);
      set_offerPrice(_offerPrice + offerprice);
      setDynamicFooditem({ ...dynamicfooditem, [fooditemListAdd]: merge_array });
      console.log("setDynamicFooditem4", dynamicfooditem);
      // [...Array(listCount)].map(
      //   (index, key) => (
      //     (fitemsetUI = Object.keys(dynamicfooditem).map((food) => {
      //       return dynamicfooditem[food]?.map((foodItem) => {
      //         return foodItem;
      //       });
      //     }))));
      // setLoadFoodItems(fitemsetUI);
      console.log("testhere", fitemsetUI);
      // }
      // else {
      //   set_arry_fooditem([..._arry_fooditem, data_fooditem]);
      //   set_totalPrice(_totalPrice + price);
      //   set_offerPrice(_offerPrice + offerprice);
      //   //setDynamicFooditem(_arry_fooditem);
      //   //console.log("setDynamicFooditem", dynamicfooditem);
      //   console.log("_arry_fooditem", _arry_fooditem);
      //   // setDynamicFooditem({ ...dynamicfooditem, [type]: false });
      //   //setDynamicFooditem(dynamicfooditem.concat(_arry_fooditem));
      //   console.log("setDynamicFooditem", dynamicfooditem);
      //   setDynamicFooditem({ ...dynamicfooditem, [fooditemListAdd]: _arry_fooditem });
      // }
    }
  };
  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
      },
      {
        label: "Category",
        field: "category",
        width: 350,
      },
      {
        label: "SubCategory",
        field: "subCategory",
        width: 100,
      },
      {
        label: "Fooditem",
        field: "foodItemName",
        width: 100,
      },
      {
        label: "CustomiseFooditem",
        field: "customiseType",
        width: 100,
      },

      {
        label: "Price",
        field: "price",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        width: 100,
      },
      {
        label: "OfferPrice",
        field: "offerprice",
        width: 100,
      },
      {
        label: "OfferPrice%",
        field: "offerpriceper",
        width: 100,
      },
      {
        label: "Status",
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      pricing.concat(pricing_fooditem) &&
      pricing.concat(pricing_fooditem)?.sort((a, b) => a.id < b.id) &&
      pricing.concat(pricing_fooditem).map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        category: obj.category,
        subCategory: obj.subCategory,
        foodItemName: obj.foodItemName,
        customiseType: obj.customiseType !== null && obj.customiseType !== undefined && obj.customiseType !== "" && obj.customiseType.replaceAll("##", " "),
        price: obj.price,
        quantity: <input type="number" defaultValue="1" min="1" class="t4finput-sm w-50 text-center" placeholder="" />,
        offerpriceper: <input type="number" id={"gridofferpriceper" + index} name={"gridofferpriceper" + index} min="0" class="t4finput_bottomborder w-50 text-center" placeholder="" />,
        offerprice: <input type="number" min="0" id={"gridofferprice" + index} defaultValue={obj.price} name={"gridofferprice" + index} class="t4finput_bottomborder w-50 text-center" placeholder="" />,
        actions: (
          <div class="form-check">
            <span className="">
              <input type="checkbox" id={"fooditemsselect" + index} onChange={(e) => addFoodItems(obj.id, obj.foodItemName, obj.customiseType, obj.price, parseInt(document.getElementById("gridofferprice" + index).value), e.target.checked)} />
              <label for={"fooditemsselect" + index}></label>
            </span>
          </div>
        ),
      })),
  };

  //console.log("UIfoodItem", fitemsetUI[0]);
  return (
    <>
      <div id="add-food-Item-success" className={success ? "" : "d-none"}>
        <div className="mt-5">{!isLoaded ? <CreateOfferAddSuccess role={props.role} toggle={(e) => (toggle(), setMessage(""))} /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
      </div>
      <div className="p-2" className={!success ? "" : "d-none"}>
        <div className="px-2 d-none">
          <button type="button" className="t4fbutton-gray-auto " onClick={(e) => (setAddFoodItem(true), Intialise())}>
            <img src={addblue} alt="edit" height="16" className="pb-1" /> Create Offer
          </button>
        </div>
        {isLoaded ? (
          <div className="w-50 p-2">
            <Alert className="w-100" message="Please wait...." type="info" />{" "}
          </div>
        ) : (
          ""
        )}
        <AvForm id="createFoodItem" className="form-horizontal text-color-gray p-2" onSubmit={handleSubmit}>
          <FormGroup>
            <div className="row mt-2 fullBorder">
              <div className="col-lg-4 rightBorder">
                <div className="fooditem_Header p-2">Offer Summary</div>
                <div className=" p-2">
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Enter Title</div>
                    <AvField name="title" type="text" className="t4finput-sm w-100" id="title" required errorMessage="Please enter Title" />
                  </FormGroup>

                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Enter Description</div>
                    <AvField name="des" type="text" className="t4finput-sm w-100" id="des" required errorMessage="Please enter Description" />
                  </FormGroup>

                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Category Type</div>
                    <Select name="subCategory" options={offercategory} isClearable values={offercategory} onChange={(e) => handleChange(e, "subCategory")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Sub Category Type</div>
                    <Select name="subCategory" options={offercategory} isClearable values={offercategory} onChange={(e) => handleChange(e, "subCategory")} />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 font-weight-bold"> Select Cusine</div>
                    <Select name="cuisine" options={cusine} isClearable onChange={(e) => handleChange(e, "cuisine")} />
                  </FormGroup>

                  <div className="mb-2 font-weight-bold">
                    Upload Image
                    <input id="uploadimage" type="file" accept="image/*" className="t4finput-sm w-100" onChange={handleImageUpload_menu1}></input>
                  </div>

                  <div>
                    <button type="button" className="t4fbutton-gray w-100 " onClick={(e) => (setListCount(listCount + 1), setAddCustomisation(true), setshowFV(true))}>
                      <img src={addblue} alt="edit" height="13" /> <b>Add Food Item List</b>
                    </button>
                  </div>
                </div>
              </div>

              {/* commemted variants columns as it removed from requirements */}
              <div id="variants" className="col-lg-4 rightBorder ">
                <div className="fooditem_Header p-2 ">Food Item List</div>
                <div className={showFV ? "p-2 fvheight" : "d-none"}>
                  <div className="mb-1 d-none ">Food Variants</div>

                  {[...Array(listCount)].map((index, key) => (
                    <div>
                      <div id="variants" className="p-2 bg-light-gray mb-2">
                        <div className="font-weight-bold mb-2">
                          <div className="d-flex justify-content-between">
                            <div>List {key + 1}</div>
                            <div>
                              {" "}
                              <img src={trash} alt="edit" height="18" onClick={(e) => setListCount(listCount - 1)} className="pb-1" />{" "}
                            </div>
                          </div>
                        </div>
                        <FormGroup className="mb-2">
                          <AvField type="text" className="t4finput-sm w-100" name={"description" + key + 1} required={showFV} placeholder="Enter Description" />
                        </FormGroup>
                        <FormGroup className="mb-2">
                          <div className="mb-1 font-weight-bold d-flex justify-content-between ">
                            {" "}
                            <Link className="t4fbutton-tran" id={"fooditemList" + key} onClick={(e) => (setShowFoodItem((showftoffer) => !showftoffer), setfooditemListAdd("fooditemList" + key), set_totalPrice(0), set_offerPrice(0), set_arry_fooditem([]))}>
                              <img src={addblue} alt="edit" height="13" /> Add Food Items
                            </Link>
                            <Link className="t4fbutton-tran px-2 d-none" onClick={(e) => set_arry_fooditem([])}>
                              Clear
                            </Link>
                          </div>
                        </FormGroup>
                        {/* {console.log("fitemsetUI", fitemsetUI[listCount - 1])} */}

                        <div id="variants" className="p-2 bg-light-gray">
                          <div className="mb-2">
                            <div className="d-flex justify-content-between font-weight-bold ">
                              <div>Item</div>
                              <div>Customisable</div>
                            </div>
                            {Object.keys(dynamicfooditem).map((food) => {
                              if (food === "fooditemList" + key) {
                                return dynamicfooditem[food]?.map((f) => {
                                  return (
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        {f.itemName}
                                        <Link className="t4fbutton-tran px-2">x</Link>
                                      </div>
                                      <div>
                                        <div class="form-check">
                                          <span className="">
                                            <input type="checkbox" checked={f.customizationFlag} id={"fooditems" + key + listCount} />
                                            <label for="fooditems"></label>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                });
                              }
                            })}
                          </div>
                        </div>

                        <div className="mb-2">
                          Select Button
                          <div className="d-flex flex-row">
                            <div className="buttonBox">
                              <span className="t4fradioCF">
                                <label>
                                  <input type="radio" value="Single" name={"groupFV" + key + 1} id={key + 1} onChange={(e) => CusFoodItemSelectButton(e, listCount)} />
                                  <span></span>
                                </label>
                              </span>
                            </div>

                            <div className="mx-2 d-flex flex-row buttonBox2">
                              <div>
                                <div class="form-check">
                                  <span className="px-2 py-2">
                                    <input type="checkbox" checked={dynamicVariantState[key + 1]} name={"checkbox" + key + 1} id="chkFoodvariant" />
                                    <label for="chkFoodvariant"></label>
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="t4fradioCF">
                                  <label>
                                    <input type="radio" value="Double" name={"groupFV" + key + 1} id={key + 1} onChange={(e) => CusFoodItemSelectButton(e, key + 1)} />
                                    <span></span>
                                  </label>
                                </span>
                              </div>
                            </div>
                            <div>
                              {/* make it invisible */}
                              <AvInput className="texttoLabel d-none" name={"groupFVLabel" + key + 1} id={key + 1} value={dynamicVariantState[key + 1] === true ? "Double" : "Single"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="mb-2 font-weight-bold">
                          Customer Specification
                          <div>
                            <div className="mt-1 d-flex flex-row align-items-center">
                              <div className="btn align-items-center">
                                <label className="switch">
                                  <input type="checkbox" value={dynamicCustomerSpec[key + 1] ? "Mandatory" : "Optional"} name={"CusSpecFV" + key + 1} onChange={(e) => CusItemCus_Spec(e, key + 1)} />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                              <div className="align-items-center">
                                <AvInput className="texttoLabel" name={"CusSpecFVLable" + key + 1} value={dynamicCustomerSpec[key + 1] ? "Mandatory" : "Optional"} disabled />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2"></div>
                </div>
              </div>
              <div id="customisetype" className="rightBorder col-lg-4">
                <div className="fooditem_Header p-2">Suggestions</div>
                <div className={showAddons ? "p-2" : "p-2"}>
                  <div>
                    <div className="p-2 font-weight-bold">
                      Add Ons 
                      <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
                    </div>
                    <div id="variants" className="p-2">
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> Add-ons Descriptions</div>
                        <AvField name="desc" type="text" name="addOnDes" className="t4finput-sm w-100" id="desc" placeholder="You can choose only 2 option" />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <div className="mb-1 font-weight-bold"> Add-ons Food Item</div>
                        {/* <Select options={addons} isMulti /> */}
                        <Select options={drpalladdons} isMulti onChange={addOnData} />
                      </FormGroup>
                      <div className="mb-2 font-weight-bold">
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

                          <div className="mx-2 d-flex flex-row buttonBox2">
                            <div>
                              <div class="form-check">
                                <span className="px-2 py-2">
                                  <input type="checkbox" checked={addonchecked} id="addonCusType" />
                                  <label for="addonCusType"></label>
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="t4fradioCF">
                                <label>
                                  <input type="radio" value="Double" name="groupaddon" onChange={(e) => addOnSelectButton(e)} />
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
                                <input type="checkbox" checked={addOnCus_Spec_} onChange={(e) => addOnCus_Spec(e)} />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="px-2">{addOnCus_Spec_ ? "Mandatory" : "Optional"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-light-green">
              <span className="text-color-dgreen">
                <img src={price} alt="edit" height="14" /> <b>Total Price </b>
                <span className="font-weight-bold text-dark h5">
                  <del>₹ {_totalPrice}</del>
                </span>
              </span>
              <span className="px-3 text-color-dgreen">
                <img src={discount} alt="edit" height="14" className="" /> <b>Offer Price </b> <span className="font-weight-bold text-dark h5">₹ {_offerPrice}</span>
              </span>
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

        <Modal id="offerfoodItem" show={showftoffer} className="fadepop" size="xl" onHide={handleClose} animation={false}>
          <Modal.Header className="t4h-color-gray" closeButton>
            <Modal.Title>
              <h6>Veg Treat for home</h6>
            </Modal.Title>
          </Modal.Header>
          {isLoaded ? (
            <Modal.Body>
              <Alert className="w-100" message="Please wait...." type="info" />
            </Modal.Body>
          ) : (
            <Modal.Body>
              <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} disableRetreatAfterSorting={true} entries={6} pagesAmount={4} data={datatable} paging={false} pagingTop={false} searchTop searchBottom={false} barReverse />
            </Modal.Body>
          )}
        </Modal>
      </div>
    </>
  );
};

export default CreateOffer;

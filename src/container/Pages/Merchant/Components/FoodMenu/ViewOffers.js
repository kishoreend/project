import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import Select from "react-select";
import { Row, Col, Container, FormGroup, Input, Label } from "reactstrap";
import {
  AvForm,
  AvField,
  AvCheckboxGroup,
  AvCheckbox,
  AvRadio,
  AvRadioGroup,
  AvGroup,
  AvInput,
} from "availity-reactstrap-validation";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import bin from "../../../../../assets/icons/bin.png";
import clockcross from "../../../../../assets/icons/clockcross.png";
import ViewOfferDetails from "./ViewOfferDetails";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import Alert from "../../../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData, callApi } from "../../../../../ServiceCall";
import Moment from "moment";
import { Modal } from "react-bootstrap";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import uuid from "react-uuid";

export default function ViewOffers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const [toggle, setToggle] = React.useState(false);
  const [pricing, setOfferPricing] = React.useState([]);
  const [offerDetails, setOfferDetails] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [prevFoodStall, setPrevFoodStall] = useState("");

  const [offerDeletedFlag, setOfferDeletedFlag] = useState(0);
  const [offerDeleteModalFlag, setOfferDeleteModalFlag] = useState(false);
  const [deletingOffer, setDeletingOffer] = useState(null);


  const history = useHistory();

  const [addOnDes, setAddOnDes] = useState("");
  const [pic, setpic] = useState("");
  const [cus, setAddCustomisation] = React.useState(false);
  const [cuisine, setCuisine] = useState("");
  const [cuisineValue, setCuisineValue] = useState("");
  const [customiseType, setCustomiseType] = useState([]);
  const [addOn, setAddon] = useState(false);
  const [egg, setEgg] = useState(false);
  const [veg, setVeg] = useState(false);
  const [reccommended, setReccommended] = useState(false);
  const currentFoodstallID = useSelector(
    (state) => state.merchant.currentFoodstallDetail.foodStallId
  );

  const uniqueNumber = useSelector((state) => state.signup.uniqueNumber);
  const [addFooditem, setAddFoodItem] = useState(false);
  const [CusFoodItemChecked, setCusFoodItemChecked] = useState(false);
  const [addOnCus_Spec_, setaddOnCus_Spec] = useState(false);
  const [category, setCategory] = useState(null);
  const [CusItemCus_Spec_, setCusItemCus_Spec] = useState(false);
  const [subCategory, setSubCategory] = useState(null);
  const [foodName, setFoodName] = useState("");
  // drop down dynamic
  const [showFV, setshowFV] = useState(false);
  const [showAddons, setshowAddons] = useState(false);
  const [addonchecked, setaddonchecked] = useState(false);
  const [offerimage, setOfferimage] = useState(new FormData());
  const [allAdons, setallAdons] = useState([]);
  const [fvVariant, setFVvariant] = useState([]);
  const [customiseFoodItems_Latest, setcustomiseFoodItems_Latest] = useState(
    []
  );
  const [addonlabel, setaddonlabel] = useState([]);
  const [customiseFoodItems_dropdown, setcustomiseFoodItems_dropdown] =
    useState([]);

  const [dynamicVariantState, setDynamicVariantState] = useState([]);
  const [dynamicCustomerSpec, setDynamicCustomerSpec] = useState([]);
  const [dynamicfooditem, setDynamicFooditem] = useState([]);
  // Create offer
  const [listCount, setListCount] = useState(0);
  const [listCount1, setListCount1] = useState([1, 2, 3]);
  const [showftoffer, setShowFoodItem] = useState(false);

  const [pricing_fooditem, setPricing_fooditem] = useState([]);
  const [fooditemListAdd, setfooditemListAdd] = useState("");
  const [_arry_fooditem, set_arry_fooditem] = useState([]);
  const [_totalPrice, set_totalPrice] = useState(0);
  const [_offerPrice, set_offerPrice] = useState(0);
  const [offerSuggestion, setofferSuggestion] = useState([]);
  const [quantity, setQuantity] = useState(1);
  let isCheckedArray = new Set();
  const [checkedItems, setCheckedItems] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const offercategory = [
    { value: "Offers", label: "Offers" },
    { value: "Combo Offers", label: "Combo Offers" },
  ];

  const allCuisines = useSelector((state) => state.merchant.cuisines);
  const [offer, setOffer] = useState({});
  const cusine = [];
  allCuisines.map((obj) => {
    if (obj.visible === true) cusine.push({ value: obj.name, label: obj.name });
  });

  const [description, setDescription] = useState("");

  const openDeleteOfferModal = (offer) => {
    setDeletingOffer(offer);
    setOfferDeleteModalFlag(true);
  }

  const hideOffer = async (offer) => {

    let activeFlag = offer.status == "ACTIVE" ? false : true;
    const hideOfferr = await
      callApi('/api/merchant/offer/update-offer-status?activeFlag=' + activeFlag + '&fsId=' + foodstallid + "&offerId=" + offer.offerId, "PUT");
    console.log('Offer Deleted', hideOfferr);
    getOfferPricing()
  }

  const closeDeleteOfferModal = () => {
    setDeletingOffer(null);
    setOfferDeleteModalFlag(false);
  }

  const updateOffer = () => {

  }

  const editOffer = (offer) => {
    setOffer(offer);
    setFoodName(offer.title);
    setCategory(offer.category);
    setDescription(offer.offerDescription);
    // allCuisines.filter(x=>x.)
    setCuisineValue(offer.cuisine);
    setShowFoodItem(true);
  }


  const deleteOffer = async () => {
    const deleteResponse = await callApi('/api/merchant/offer/delete-offer?fsId=' + foodstallid + "&offerId=" + deletingOffer.offerId, "PUT");
    console.log('Offer Deleted', deleteResponse);

    setDeletingOffer(null);
    setOfferDeleteModalFlag(false);

    setOfferDeletedFlag(offerDeletedFlag + 3);
  }

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
        sort: "disabled",
      },
      {
        label: t("title"),
        field: "title",
        width: 350,
      },

      {
        label: t("total_price"),
        field: "totalPrice",
        width: 100,
      },

      {
        label: t("offer_price"),
        field: "offerPrice",
        width: 100,
      },
      {
        label: t("offer_date"),
        field: "offerDate",
        width: 100,
      },
      {
        label: t("Type"),
        field: "offerType",
        width: 100,
      },
      {
        label: t("actions"),
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      pricing &&
      pricing?.sort((a, b) => a.id < b.id) &&
      pricing.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        title: (
          <>
            <Link className="tf4_linklabel" href="#" onClick={(e) => (GetOffer(obj.offerId), setToggle(true))}>
              <b>{obj.title}</b>
            </Link>
            <br /> <span>{obj.description}</span>
          </>
        ),

        offerType: obj.offerType,
        totalPrice: obj.totalPrice,
        offerDate: Moment(obj.offerDate).format("DD-MMM-YYYY"),
        offerPrice: obj.offerPrice,

        actions: (
          <>
            <div>
              {/* <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button> */}
              <button className="t4fbutton-gray" to="#" onClick={() => editOffer(obj)}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={() => openDeleteOfferModal(obj)}>
                <img src={bin} alt="edit" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#" onClick={() => hideOffer(obj)}>
                {
                  obj.status == "ACTIVE" ? <img src={eye} alt="edit" height="15" /> : <img src={hide} alt="edit" height="15" />
                }
              </button>
            </div>
          </>
        ),
      })),
  };

  useEffect(() => {
    {
      getOfferPricing();
      setPrevFoodStall(foodstallid);
    }
  }, [isFoodItemAdded, foodstallid, offerDeletedFlag]);
  const getOfferPricing = async () => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/merchant/offer/get-offers?fsId=${foodstallid}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          setOfferPricing(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setOfferPricing([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setOfferPricing([]);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };
  const GetOffer = async (offerid) => {
    let validationMessage = "";
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/merchant/offer/get-offer-details?fsId=${foodstallid}&offerId=${offerid}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 offer", response);
          setOfferDetails(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setOfferDetails([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setOfferDetails([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };



  const handleChange = (inputValue, data) => {
    if (data === "category" && inputValue != null)
      setCategory(inputValue.value);
    if (data === "subCategory" && inputValue != null)
      setSubCategory(inputValue.value);
    if (data === "cuisine" && inputValue != null) setCuisine(inputValue.value);
  };



  const handleSubmit = async (event, errors, values) => {
    
    let data = {
      "category": category,
      "cuisine": cuisine,
      "fsId": foodstallid,
      "id": offer.id,
      "offerDate": new Date().toString(),
      "offerDescription": description,
      "offerId": offer.offerId,
      "offerImage": "",
      "offerPrice": offer.offerPrice,
      "offerType": offer.offerType,
      "status": "ACTIVE",
      "subCategory": category,
      "title": foodName,
      "totalPrice": offer.totalPrice
    };
    console.log("data_updateoffer", data)
    const result = await reduxPostData(`/api/merchant/offer/update-offer?fsId=${foodstallid}`, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
       
        }
      })
      .catch((err) => {

      });

  };

  const handleClose = () => {
    setShowFoodItem((showftoffer) => !showftoffer);
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

  return (
    <div className="p-3">
      <div id="view-offer-list" className={toggle ? "d-none" : ""}>
        <MDBDataTableV5 entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
      </div>
      <div id="view-offer-details" className={!toggle ? "d-none" : ""}>
        <ViewOfferDetails offerDetails={offerDetails} />
        <button type="button" className="t4fbutton-long color-gray" onClick={(e) => setToggle(false)}>
          Back
        </button>
      </div>
      <Modal show={offerDeleteModalFlag} onHide={closeDeleteOfferModal} centered animation={false}>
        <Modal.Body>
          Are you sure to delete the offer ?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" style={{ width: '80px', color: 'white' }} onClick={() => deleteOffer()}>Delete</button>
          <button className="btn btn-success" style={{ width: '80px', color: 'white' }} onClick={closeDeleteOfferModal}>Cancel</button>
        </Modal.Footer>
      </Modal>


      {/*
edit offer code
*/}

      <Modal
        id="offerfoodItem"
        show={showftoffer}
        className="fadepop"
        size="lg"
        // size="xl"
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6 style={{
              color: "#fff"
            }}>Edit  Offer</h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AvForm
            id="editOfferForm"
            className="form-horizontal text-color-gray p-2"
            onSubmit={handleSubmit}

          >
            <FormGroup>
              <div className="row mt-2 fullBorder">
                <div className="col-lg-12 rightBorder">
                  <div className="fooditem_Header p-2">{t('offer_summary')}</div>
                  <div className=" p-2">
                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('title')}</div>
                      <AvField
                        name="title"
                        type="text"
                        value={foodName}
                        className="t4finput-sm w-100"
                        id="title"
                        required
                        errorMessage="Please enter Title"
                        onChange={(e) => setFoodName(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold">
                        {" "}
                        {t('enter_description')}
                      </div>
                      <AvField

                        name="des"
                        value={description}
                        type="text"
                        className="t4finput-sm w-100"
                        id="des"
                      //required
                      // errorMessage="Please enter Description"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('category_type')}</div>
                      <Select
                        name="category"
                        options={offercategory}
                        isClearable
                        values={offercategory}
                        defaultValue={offercategory.find(
                          (obj) => obj.value === category
                        )}
                        onChange={(e) => handleChange(e, "category")}
                      />
                    </FormGroup>

                    <FormGroup className="mb-2">
                      <div className="mb-1 font-weight-bold"> {t('select_cuisine')}</div>
                      <Select
                        name="cuisine"
                        options={cusine}
                        isClearable

                        values={cusine}
                        defaultValue={cusine.find(
                          (obj) => obj.value === cuisineValue
                        )}
                        onChange={(e) => handleChange(e, "cuisine")}
                      />
                    </FormGroup>

                    <div className="mb-2 font-weight-bold">
                      {t('upload_image')}
                      <input
                        id="uploadimage"
                        type="file"
                        accept="image/*"
                        className="t4finput-sm w-100"
                        onChange={handleImageUpload_menu1}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </FormGroup>
            <button className="btn btn-danger" type="submit" style={{
              width: '80px',
              color: 'white'
            }} onClick={() => updateOffer()}>Save</button>
          </AvForm>
        </Modal.Body>

        {/* <Modal.Footer>
       
        </Modal.Footer> */}
      </Modal>

    </div>
  );
}

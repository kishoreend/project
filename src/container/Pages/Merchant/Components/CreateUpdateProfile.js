import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Draggable from "react-draggable";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import downarrow from "../../../../assets/icons/downarrow.png";
import addblue from "../../../../assets/icons/addblue.png";
import info from "../../../../assets/icons/info.png";
import play from "../../../../assets/icons/play.png";
import qrcodedark from "../../../../assets/icons/qrcodedark.png";
import move from "../../../../assets/icons/move.png";
import close from "../../../../assets/icons/close.png";
import Alert from "../../../../components/Common/Alert";
import Loading from "../../../../components/Common/Loading";
import BankDetails from "./BankDetails";
import MerchantQRcode from "./MerchantQRcode";
import * as moment from "moment";
import Modal from "react-bootstrap/Modal";
import Hours from "./Hours";
import ProfileCreatedPop from "./ProfileCreatedPop";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  callApi,
  getData,
  postData,
  reduxGetData,
  reduxPostData,
} from "../../../../ServiceCall";
import * as merchantActionTypes from "../../../../store/authentication/merchant/actionTypes";
const CreateUpdateProfile = (props) => {
  console.log('Profile props', props);
  
  const editFlag = props.edit;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFoodstallDtl =
    useSelector((state) => state.merchant.currentFoodstallDetail) || {};
  const foodStallId = selectedFoodstallDtl.foodStallId || 0;
  const merchantData = useSelector((state) => state.merchant);

  console.log(
    "merchants",
    useSelector((state) => state.merchant.merchants)
  );
  const Shophours = [
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Monday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Tuesday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Wednesday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Thursday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Friday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Saturday",
    },
    {
      id: "0",
      closeTime: "",
      closed: false,
      openTime: "",
      foodStallId: selectedFoodstallDtl,
      opened24Hours: false,
      weekDayName: "Sunday",
    },
  ];

  const updateTimings = (timings) => {
      props.updateFoodstallTimings(timings)
      currentFoodstallTiming = timings;
  }

  var currentFoodstallTiming = props.foodstallTimings?.length == 7
      ? props.foodstallTimings
      : Shophours;

  console.log('currentFoodstallTiming', props.foodstallTimings);

  const {
    id,
    city,
    state,
    country,
    location,
    deliveryTime,
    buType,
    buName,
    foodCourtName,
    foodCourtId,
    foodStallName,
    foodStallLicenseNumber,
    gstNumber,
  } = selectedFoodstallDtl;

  console.log("selectedFoodstallDtl", selectedFoodstallDtl);
  console.log("Merchants", merchantData);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isProfilePicLoaded, setIsProfilePicLoaded] = React.useState(false);
  const [isIdLoaded, setIsIdLoaded] = React.useState(false);
  const [isMenuLoaded, setIsMenuLoaded] = React.useState(false);
  const [isFSLoaded, setIsFSLoaded] = React.useState(false);
  const currentFoodstallID = useSelector(
    (state) => state.merchant.currentFoodstallDetail.foodStallId
  );
  const foodStallPics = useSelector((state) => state.merchant.foodstallImages);
  const menuPics = useSelector((state) => state.merchant.menuPictures);
  const uploadedImage = React.useRef(null);
  const uploadedImage_foodstall = React.useRef(null);
  const uploadedImage_profilepic = React.useRef(null);
  const uploadedImage_personalId = React.useRef(null);
  const [fsImages, setFSimages] = useState([]);
  const [fsmenuImages, setMenuimages] = useState([]);
  const [select, setSelect] = useState({});
  //const uniqueNumber = useSelector((state) => state.signup.uniqueNumber); // comented this to get the unique no from response. fix for admin to view the unique number
  const {
    uniqueNumber,
    email,
    userName,
    phoneNumber,
    personalIdNumber,
    foodStalls,
    profilePic,
    bankDetails,
    manager,
  } = useSelector((state) => state.merchant.merchants);
  const profilePicture = useSelector((state) => state.merchant.profilePicture);
  const personalIdCard = useSelector((state) => state.merchant.personalIdCard);
  const [selectedState, setSelectedState] = useState(state);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedFCType, setSelectedFCType] = useState(buType);
  const [selectedShoppingMall, setShoppingMall] = useState(buName);
  const [selectedFoodCoutName, setFoodCoutName] = useState(foodCourtName);
  const [selectedFoodCourtId, setFoodCourtId] = useState(foodCourtId);
  
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showSelfQR, setShowSelfQR] = useState(false);
  const fileArray = [];
  const fileObj = [];
  const [allDrp, setAllDrp] = useState([]);
  const [foodcourttype, setFoodcourttype] = useState([]);
  const [drpShoppingmall, setdrpShoppingmall] = useState([]);
  const [drpfoodCourtName, setdrpfoodCourtName] = useState([]);
  const [selectedbuId, setselectedbuId] = useState(0);
  const [selectedFoodCoutNameName, setFoodCoutNameName] = useState("");
  const [selectedShoppingMallName, setShoppingMallName] = useState("");
  const [personalIDNum, setPersonalIdNum] = useState(personalIdNumber);
  const [deliveryTimeInput, setDeliveryTimeInput] = useState(deliveryTime);

  const buTypesSet = new Set();

  const [buList, setBuList] = useState([]);
  const [buTypes, setBuTypes] = useState([]);
  const [selectedBuType, setSelectedBuType] = useState([]);
  const [filteredBuList, setFilteredBuList] = useState([]);
  const [selectedBuName, setselectedBuName] = useState([]);
  const [foodCourts, setFoodCourts] = useState([]);

  const [merchantUpdateFlag, setMerchantUpdateFlag] = useState(0);
  const [foodstallTimings, setFoodstallTimings] = useState(currentFoodstallTiming);

  const tempTimings = useSelector((state) => state.merchant.currentFoodstallTiming);

  ////// drop down set up start

  const [drpcountry, setCountries] = useState([]) ;//[{ value: "India", label: "India" }];
  const [drpstates, setStates] = useState([]) ;
  // [
  //   // { value: "TamilNadu", label: "TamilNadu" },
  //   // { value: "Andrapradesh", label: "Andrapradesh" },
  //   { value: "Telangana", label: "Telangana" },
  // ];
  const [drpcity, setCities] = useState([])
  // [
  //   // { value: "Chennai", label: "Chennai" },
  //   { value: "Hyderabad", label: "Hyderabad" },
  //   // { value: "Vizag", label: "Vizag" },
  //   // { value: "Vijayawada", label: "Vijayawada" },
  //   // { value: "Tirupathi", label: "Tirupathi" },
  // ];
  const drplocation = [
    // { value: "", label: "" },
    // { value: "Adayar", label: "Adayar" },
    // { value: "Chrompet", label: "Chrompet" },
    { value: "Ameerpet", label: "Ameerpet" },
    { value: "BanjaraHills", label: "BanjaraHills" },
    { value: "Kukatpally", label: "Kukatpally" },
    { value: "Manikonda", label: "Manikonda" },
  ];

  const handleClose = () => {
    setShow((show) => !show);
  };
  const handleShow = () => {
    setShow((show) => !show);
  };
  const handleShowHours = () => {
    setShowHours((showHours) => !showHours);
  };
  const handleShowBank = () => {
    setShowBank((showBank) => !showBank);
  };
  const handleShowQR = () => {
    setShowQR((showQR) => !showQR);
  };

  const handleShowSelfQR = () => {
    setShowSelfQR(!showSelfQR);
  };
  const handleChange = (e, data) => {
    if (data === "country") setSelectedCountry(e.value);
    if (data === "states") setSelectedState(e.value);
    if (data === "city") setSelectedCity(e.value);
    if (data === "location") setSelectedLocation(e.value);
    if (data === "foodcourttype") {
      setSelectedFCType(e.value);
      const _malls = [];
      allDrp.map((mall) => {
        if (mall.type === e.value) {
          return _malls.push({ value: mall.businessUnitId, label: mall.name });
        }
      });
      setdrpShoppingmall(_malls);
      if (e.value === "RESTAURENT") {
        console.log("Restaurant");
        setDisable(true);
        setShoppingMall("");
        setFoodCoutName("");
      } else setDisable(false);
    }
    if (data === "shoppingmall") {
      setShoppingMall(e.value);
      setShoppingMallName(e.label);
      let _localfilter = [];
      // _localfilter.push({ value: "", label: "" })
      allDrp.map((fc) => {
        if (fc.businessUnitId === e.value) {
          console.log("fc.businessUnitId", fc.businessUnitId);
          setselectedbuId(fc.businessUnitId);
          fc.foodCourts?.map((fcurt) => {
            return _localfilter.push({
              value: fcurt.foodCourtId,
              label: fcurt.name,
            });
          });
        }
      });
      setdrpfoodCourtName(_localfilter);
    }
    if (data === "foodcourtname") {
      setFoodCoutName(e.value);
      setFoodCoutNameName(e.label);
    }

    console.log(e.value);
  };

  const getFoodStallTimings = async (fsId) => {
    await callApi(`/api/foodstall/${fsId}/get-foodstall-timings`, "GET")
    .then(timingsResponse => {
      // setFoodStallTimings(timingsResponse.data.data.days)
      setFoodstallTimings(timingsResponse.data.data.days);
    });

    console.log('FoodStall Timings, ' , foodstallTimings);
  }

  ////// drop down set up end

  useEffect(() => {
    console.log("create update profile effect");
    // getMerchantData(uniqueNumber);
    setFoodCourts([]);
    setSelectedState(state);
    setSelectedCountry(country);
    setSelectedCity(city);
    setSelectedLocation(location);
    setSelectedFCType(buType);
    setSelectedBuType(buType);
    // setselectedbuId(buName);
    setselectedBuName(buName);
    setFoodCoutName(foodCourtName);
    console.log(uniqueNumber);
    setDeliveryTimeInput(deliveryTime);
    setFSimages([]);
    setMenuimages([]);
    getAllDropdownDetails();

    loadAllBusinessUnits();

    // setFoodstallTimings(tempTimings);
    getFoodStallTimings(foodStallId);

  }, [selectedFoodstallDtl]);

  useEffect(() => {

    console.log('in 2nd useEffect..')
    getMerchantData(uniqueNumber);
    loadCountries();
    loadStates();
    loadCities();
    
  }, [merchantUpdateFlag]);

  const getMerchantData = async (uniqueNumber) => {
    if (uniqueNumber != undefined) {
      const merchantResponse = await callApi(
        "/api/merchant/get-merchant-details?uniqueNumber=" + uniqueNumber
      );

      // const merchantLatestData = merchantResponse.data.data;
      console.log("Latest data is loaded", merchantResponse.data.data);

      dispatch({
        type: merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS,
        payload: merchantResponse.data.data,
      });

      setIsLoaded(false);
    }
  };

  const handleSubmit = (event, errors, values) => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log(errors);
    if (errors?.length == 0) {
      let merchantData = {
        personalIdNumber: personalIDNum,
        uniqueNumber: uniqueNumber,
      };
      let foodStallData = {
        id: id,
        city: selectedCity,
        location: selectedLocation,
        country: selectedCountry,
        state: selectedState,
        foodStallName: values.foodStallName,
        foodStallLicenseNumber: values.foodStallLicenseNumber,
        gstNumber: values.gstNumber,
        taxIdentificationNumber: values.gstNumber,
        deliveryTime: deliveryTimeInput,
        foodStallId: foodStallId,
        merchantId: uniqueNumber,

        buType: selectedBuType,
        buName: selectedBuName,
        foodCourtName: selectedFoodCoutName,
        foodCourtId: selectedFoodCourtId, // this is id
        buId: selectedbuId,
      };
      
      if (foodStallId != 0) {
        console.log('updating foodstall start');
        dispatch(updateFoodstall(foodStallData, merchantData.personalIdNumber));

        console.log('updating foodstall done')
        console.log('updating merchant start')
        dispatch(updateProfile(merchantData));
        console.log('updating merchant done')
      }else {
        dispatch(updateProfile(merchantData));
      }

    }
  };

  const loadAllBusinessUnits = async () => {
    const requestBody = {
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    };

    const buResponse = await postData(
      "/api/admin/get-business-unit",
      requestBody,
      "",
      "POST"
    );

    console.log(buResponse);

    let selectedbuObject = {};

    const businessUnitsList = buResponse.data.data.map((buObj) => {
      if(buObj.name === selectedBuName){
        selectedbuObject = buObj;
      }
      const typeObject = {
        label:
          buObj.type === "SHOPPING_MALL"
            ? "Shopping Mall"
            : buObj.type === "THEATRE"
            ? "Theatre"
            : "Restaurant",
        value: buObj.type,
      };

      const isTypeAdded = (type) => {
        let flag = false;
        buTypesSet.forEach((a) => {
          if (a.value === type) {
            flag = true;
          }
        });
        return flag;
      };

      if (!isTypeAdded(buObj.type)) {
        buTypesSet.add(typeObject);
      }

      return {
        label: buObj.name,
        value: buObj.name,
        type: buObj.type,
        address: buObj.address,
        buId: buObj.businessUnitId,
      };
    });

    console.log('buTypesSet size', buTypesSet)
  
    buTypesSet.add({
      label: "Restaurant",
      value: "RESTAURANT"
    });
    
    setBuTypes([...buTypesSet]);
    
    console.log("businessUnitsList", businessUnitsList, buTypes, buTypesSet);
    setBuList(businessUnitsList);
    // loadFoodCourts()
    console.log("selectedBU", selectedbuObject, selectedBuName, selectedBuType)
    if(selectedbuObject.businessUnitId){
      loadFoodCourts({
        buId: selectedbuObject.businessUnitId,
        value: selectedbuObject.name
      });
    }
    
  };

  const loadCountries = async () => {

    const countriesResponse = await getData("/api/admin/location/get-countries");

    console.log('countries', countriesResponse.data.data)

    const countries = countriesResponse.data.data.map(country => {
      return {
        value : country.name,
        label : country.name
      }
    });

    setCountries(countries);
  }

  const loadStates = async () => {

    const statesResponse = await getData("/api/admin/location/get-all-states");

    console.log('statesResponse', statesResponse.data.data)

    const states = statesResponse.data.data.map(state => {
      return {
        value : state.name,
        label : state.name
      }
    });

    setStates(states);
  }

  const loadCities = async () => {

    const citiesResponse = await getData("/api/admin/location/get-all-cities");

    console.log(citiesResponse.data)
    console.log('citiesResponse', citiesResponse.data.data)

    const cities = citiesResponse.data.data.map(city => {
      return {
        value : city.name,
        label : city.name
      }
    });

    setCities(cities);
    
  }

  const loadBusinessUnits = (buType) => {
    let filteredBuList = buList.filter((bu) => bu.type === buType);

    if (buType === "SHOPPING_MALL") {
      setSelectedBuType("Shopping Mall");
    } else if (buType === "THEATRE") {
      setSelectedBuType("Theatre");
    } else {
      setSelectedBuType("Restaurant");
    }

    console.log(filteredBuList);
    setFilteredBuList(filteredBuList);
  };

  const loadFoodCourts = async (bu) => {
    console.log(bu);

    setselectedbuId(bu.buId);
    setselectedBuName(bu.value);

    const fcResponse = await getData(
      "/api/admin/get-bu-food-courts?buId=" + selectedFoodstallDtl.buId
    );

    const foodCourtsList = fcResponse.data.data.map((fc) => {
      return {
        foodCourtId: fc.foodCourtId,
        label: fc.name,
        value: fc.name,
      };
    });

    console.log('FoodCourts Fetched', foodCourtsList);
    console.log('selected food court', selectedFoodCoutName, selectedFoodCoutNameName);

    setFoodCourts(foodCourtsList);

    console.log(fcResponse);
  };

  const updateProfile = (data) => async (dispatch) => {
    let validationMessage = "";
    // dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT_INIT });
    console.log(data);
    let result = await reduxPostData(
      "/api/merchant/update",
      data,
      "merchant",
      false,
      "put"
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("merchant update response data", response);
          setMerchantUpdateFlag(merchantUpdateFlag + 2);
          // dispatch({ type: merchantActionTypes.UPDATE_MERCHANT_DETAILS_SUCCESS, payload: data });
          //  dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT, payload: response.data.data, });
          // setGuiMsg("Merchant is Successfully Created");
          // setType("success");
          // console.log(response);
          // setIsLoaded((isLoaded) => !isLoaded);
          // setTimeout(() => window.location.reload(), 3000)
        } else {
          // console.log("else", response.data);
          // dispatch({
          //   type: adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE,
          //   payload: response.data.error,
          // });
          // setIsLoaded((isLoaded) => !isLoaded);
        }
      })
      .catch((err) => {
        // console.log("failure", err);
        validationMessage =
          err.response?.data?.error ||
          "Something went wrong, Please try again later";
      });
  };
  const updateFoodstall = (data, merchantData) => async (dispatch) => {
    let validationMessage = "";
    // dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT_INIT });
    console.log("update food stall", data);
    let result = await reduxPostData(
      "/api/foodstall/update",
      data,
      "merchant",
      false,
      "post"
    )
      .then((response) => {
        if (response.status === 200) {
          // console.log("foodstall data", response);
          validationMessage = "Merchant is Successfully updated";
          let concatData = data;
          concatData.personalIdNumber = merchantData;
          console.log("Concatination", concatData);
          dispatch({
            type: merchantActionTypes.UPDATE_MERCHANT_DETAILS_SUCCESS,
            payload: concatData,
          });
          // setGuiMsg("Merchant is Successfully Created");
          // setType("success");
          console.log(response);
          // setIsLoaded((isLoaded) => !isLoaded);
          // setTimeout(() => window.location.reload(), 3000)
          
        } else {
          // console.log("else", response.data);
          // dispatch({
          //   type: adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE,
          //   payload: response.data.error,
          // });
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        validationMessage =
          err.response?.data?.error ||
          "Something went wrong, Please try again later";
      });
    // setIsLoaded((isLoaded) => !isLoaded);
  };
  const deleteImage = (url, type, fsid) => {
    dispatch(deleteImage_service(url, type, fsid));
  };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePic = (data) => async (dispatch) => {
    // const data = new FormData();
    // data.append(
    //   "file",
    //   profilePic[0],
    //   profilePic[0].name
    // );
    // console.log(profilePic[0]);
    console.log("fordata", data);
    const result = await reduxPostData(
      "/api/merchant/" + uniqueNumber + "/upload-pic?type=PROFILE_PIC",
      data,
      "merchant",
      true
    )
      .then((response) => {
        // console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("profilepicurl", response);
          dispatch({
            type: merchantActionTypes.UPDATE_PROFILE_PICTURE,
            payload: response.data?.data?.profilePic,
          });
          // setIsLoaded((isLoaded) => !isLoaded);
          // setGuiMsg("Merchant Status is sucessfully updated to - " + status);

          // setType("success");
          // console.log(response);
          // setProfilePicture(response.data?.data?.profilePic?.data);
          // console.log("from image", response.data);
        } else {
          // dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED, payload: response.data.data });
          // setIsLoaded((isLoaded) => !isLoaded);
          // setGuiMsg(response.data.data);
          // setType("danger");
        }
      })
      .catch((err) => {
        // console.log("failure", err);
        // if (err.response === undefined || err.response.data === undefined) {
        //   dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED, payload: err.response });
        //   setIsLoaded((isLoaded) => !isLoaded);
        //   setGuiMsg("Something went wrong, Please try again later");
        //   setType("danger");
        // }
        // else {
        //   console.log(err.response);
        //   dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED, payload: err.response.data.data });
        //   setIsLoaded((isLoaded) => !isLoaded);
        //   setGuiMsg(err.response.data.data);
        //   setType("danger");
        // }
      });
    setIsProfilePicLoaded((isProfilePicLoaded) => !isProfilePicLoaded);
  };
  const handleImageUpload_profilepic = (e) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("pic", e.target.files[0]);
      // data.append('type', "PROFILE_PIC")
      setIsProfilePicLoaded((isProfilePicLoaded) => !isProfilePicLoaded);
      dispatch(uploadProfilePic(data));
    }
  };
  const viewProfile = () => {
    props.toggle();
  };
  const handleImageUpload_personalId = (e) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("pic", e.target.files[0]);
      setIsIdLoaded((isIdLoaded) => !isIdLoaded);
      dispatch(Upload_personalId(data));
    }
  };
  const handleImageUpload_menu = (e) => {
    if (e.target.files) {
      const data = new FormData();
      for (var i = 0; i < e.target.files.length; i++) {
        data.append("pic", e.target.files[i]);
      }
      setIsMenuLoaded((isMenuLoaded) => !isMenuLoaded);
      dispatch(Upload_menu(data));
    }
  };
  const handleImageUpload_foodstall = (e) => {
    if (e.target.files) {
      const data = new FormData();
      console.log("pic12", e.target.files);
      for (var i = 0; i < e.target.files.length; i++) {
        data.append("pic", e.target.files[i]);
      }
      // e.target.files.length.map((index) => data.append("pic", e.target.files[index]));

      // data.append("pic", e.target.files[0]);
      // data.append("pic", e.target.files[1]);
      setIsFSLoaded((isFSLoaded) => !isFSLoaded);
      dispatch(Upload_foodstall(data));
    }
  };

  const Upload_personalId = (data) => async (dispatch) => {
    console.log("personal id", data);
    const result = await reduxPostData(
      "/api/merchant/" + uniqueNumber + "/upload-pic?type=PERSONAL_ID",
      data,
      "merchant",
      true
    )
      .then((response) => {
        console.log("personal id started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("personal id started");
          dispatch({
            type: merchantActionTypes.UPDATE_PERSONAL_ID_PIC,
            payload: response.data?.data?.personalIdCard,
          });
          console.log("peersonal id from image", response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsIdLoaded((isIdLoaded) => !isIdLoaded);
  };
  const Upload_menu = (data) => async (dispatch) => {
    console.log("Upload_menu", data);
    const result = await reduxPostData(
      `/api/foodstall/${currentFoodstallID}/upload-menu-pics`,
      data,
      "merchant",
      true
    )
      .then((response) => {
        console.log("Upload_menu started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("check menu started", response);
          dispatch({
            type: merchantActionTypes.UPDATE_MENU_IMAGES,
            payload: response.data?.data,
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsMenuLoaded((isMenuLoaded) => !isMenuLoaded);
  };
  const deleteImage_service = (url, type, fsid) => async (dispatch) => {
    if (type === "MENU_PIC") {
      setIsMenuLoaded((isMenuLoaded) => !isMenuLoaded);
    } else {
      setIsFSLoaded((isFSLoaded) => !isFSLoaded);
    }
    console.log("deleteImage_service started", url);
    const result = await reduxPostData(
      `/api/foodstall/${currentFoodstallID}/delete-pic?picType=` +
        type +
        "&picUrl=" +
        url,
      "",
      "merchant",
      true,
      "put"
    )
      .then((response) => {
        console.log("deleteImage_service started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("deleteImage_service end", response);
          if (type === "MENU_PIC") {
            dispatch({
              type: merchantActionTypes.UPDATE_MENU_IMAGES,
              payload: response.data?.data,
            });
          } else {
            dispatch({
              type: merchantActionTypes.UPDATE_FOODSTALL_IMAGES,
              payload: response.data?.data,
            });
          }
        } else {
        }
      })
      .catch((err) => {
        console.log("deleteImage_service failure", err);
      });
    if (type === "MENU_PIC") {
      setIsMenuLoaded((isMenuLoaded) => !isMenuLoaded);
    } else {
      setIsFSLoaded((isFSLoaded) => !isFSLoaded);
    }
  };
  const Upload_foodstall = (data) => async (dispatch) => {
    console.log("Upload_foodstall", data);
    const result = await reduxPostData(
      `/api/foodstall/${currentFoodstallID}/upload-foodstall-pics`,
      data,
      "merchant",
      true
    )
      .then((response) => {
        console.log("Upload_foodstall started", response);
        if (response.status === 200 || response.data?.status === "success") {
          console.log("checking", response);
          dispatch({
            type: merchantActionTypes.UPDATE_FOODSTALL_IMAGES,
            payload: response.data?.data,
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsFSLoaded((isFSLoaded) => !isFSLoaded);
  };

  const getAllDropdownDetails = async (data) => {
    let validationMessage = "";
    let messageType = "";
    const response = await reduxPostData(
      "/api/merchant/get-business-units?city=" +
        selectedCity +
        "&country=" +
        selectedCountry +
        "&state=" +
        selectedState,
      "",
      "merchant",
      false,
      "GET"
    )
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log("dropdowns", response.data.data);
          setAllDrp(response.data.data);
          const _type = response.data.data.map((type) => {
            var findItem = foodcourttype.find((x) => x.value === type.type);
            if (!findItem) {
              return foodcourttype.push({
                value: type.type,
                label: type.type.replace("_", " "),
              });
            }
          });
        } else {
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage =
          err.response?.data?.error ||
          "Something went wrong, Please try again later";
      });
    console.log("validationMessage", validationMessage);
  };

  return (
    <>
      <div className=" px-2 position-relative">
        <Row>
          <Col lg={11}>
            <AvForm
              id="updateProfile"
              className="form-horizontal"
              onSubmit={handleSubmit}
            >
              <Row>
                <Col lg={4}>
                  <FormGroup className="mb-2">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      {t('UniqueID')}
                    </div>
                    <AvField
                      name="uniqueNumber"
                      //value={this.state.username}
                      type="text"
                      // className="t4finput-sm edit"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="uniqueid"
                      disabled
                      value={uniqueNumber}
                      //placeholder="Enter username"
                      //minLength= {value: 6}
                      //onChange={(e) => (setName(e.target.value), setMessage(""))}
                    />
                    <span
                      className={
                        !props?.edit ? "t4f_label" : "t4f_label d-none"
                      }
                    >
                      {uniqueNumber}
                    </span>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('Country')}
                      </span>
                    </div>
                    
                    <Select
                      name="country"
                      isDisabled
                      className={props?.edit ? "edit w-75" : "d-none"}
                      options={drpcountry}
                      value={drpcountry.find(
                        (obj) => obj.value?.toUpperCase() == selectedCountry?.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "country")}
                    ></Select>

                    <div>
                      <span
                        className={
                          !props?.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {country}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('State')}
                      </span>
                    </div>

                    <Select
                      name="country"
                      isDisabled
                      className={props?.edit ? "edit w-75" : "d-none"}
                      options={drpstates}
                      value={drpstates.find(
                        (obj) => obj.value?.toUpperCase() === selectedState?.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "states")}
                    ></Select>
                    <div>
                      <span
                        className={
                          !props?.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {state}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('City')}
                      </span>
                    </div>
                    <Select
                      name="city"
                      isDisabled
                      className={props?.edit ? "edit w-75" : "d-none"}
                      options={drpcity}
                      value={drpcity.find((obj) => obj.value?.toUpperCase() === selectedCity?.toUpperCase())}
                      onChange={(e) => handleChange(e, "city")}
                    ></Select>

                    <div>
                      <span
                        className={
                          !props?.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {city}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('Location')}
                      </span>
                    </div>
                    {/* <Select name="location" isDisabled className={props?.edit ? "edit w-75" : "d-none"} options={drplocation} value={drplocation.find((obj) => obj.value === selectedLocation)} onChange={(e) => handleChange(e, "location")}></Select> */}

                    <AvField
                      name="location"
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="location"
                      value={selectedLocation}
                      onChange={e => setSelectedLocation(e.target.value)}
                    />
                    <div>
                      <span
                        className={
                          !props?.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {location}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('Type')}
                      </span>
                    </div>
                    <Select
                      name="buType"
                      className={props?.edit ? "edit w-75" : "d-none"}
                      options={buTypes}
                      isDisabled
                      value={buTypes.find(
                        (obj) => obj.label === selectedBuType
                      )}
                      onChange={(e) => handleChange(e, "foodcourttype")}
                      
                    ></Select>

                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {/* {t({buType})} */}
                        {buType}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className={buType == "Restaurant" ? "d-none" : ""}>
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {!props?.edit
                          ? buType == "Shopping Mall"
                            ? "Shopping Mall"
                            : buType?.replace("_", " ")
                          : buType == 0
                          ? "Shopping Mall"
                          : buType?.replace("_", " ")}
                      </span>
                    </div>
                    <div>
                      <div>
                        <Select
                          name="buName"
                          className={props?.edit ? " edit w-75" : "d-none"}
                          isDisabled
                          options={buList}
                          value={buList.find(
                            (obj) => obj.value === selectedBuName
                          )}
                          onChange={(e) => handleChange(e, "shoppingmall")}
                        ></Select>
                      </div>
                    </div>
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {buName}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup
                    className={
                      !props?.edit
                        ? buType === "Restaurant"
                          ? "d-none"
                          : ""
                        : buType === "Restaurant"
                        ? "d-none"
                        : "mb-2"
                    }
                  >
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('Foodcourt')}
                      </span>
                    </div>
                    {
                      foodCourts.length === 0 ? (
                        // <Select
                        //   name="foodCourtName"
                        //   isDisabled
                        //   className={props?.edit ? "edit w-75" : "d-none"}
                        //   options={[selectedFoodCoutName]}
                        //   value={selectedFoodCoutName}
                        //   onChange={(e) => handleChange(e, "foodcourtname")}
                        // ></Select>
                        <AvField
                          name="foodCourtName"
                          type="text"
                          className={
                            props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                          }
                          disabled
                          id="foodCourtName"
                          value={selectedFoodCoutName}
                        />
                      ):(
                        <Select
                          name="foodCourtName"
                          isDisabled
                          className={props?.edit ? "edit w-75" : "d-none"}
                          options={foodCourts}
                          value={foodCourts.find(
                            (obj) => obj.value === selectedFoodCoutName
                          )}
                          onChange={(e) => handleChange(e, "foodcourtname")}
                        ></Select>
                      )
                    }
                    

                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {foodCourtName}
                      </span>
                    </div>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      {t('Foodstall')}
                    </span>

                    <AvField
                      name="foodStallName"
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="foodstallname"
                      value={foodStallName}
                    />

                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {foodStallName}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('FoodStallLicenseNumber')}
                    </span>

                    <AvField
                      name="foodStallLicenseNumber"
                      value={foodStallLicenseNumber}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="foodstall_LicenseNo"
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {foodStallLicenseNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('PersonalIDNumber')}
                    </span>

                    <AvField
                      name="personalIdNumber"
                      value={personalIDNum}
                      onChange={(e) => setPersonalIdNum(e.target.value)}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="personalIdNumber"
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {personalIdNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {" "}
                        {t('PersonalIDPhoto')}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload_personalId}
                      multiple="false"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                    ></input>
                    <span>
                      {isIdLoaded ? (
                        <span>
                          <Loading />
                        </span>
                      ) : (
                        personalIdCard && (
                          <div className="w-75 mt-1">
                            <img
                              className="personalid_image"
                              //ref={uploadedImage_personalId}
                              src={personalIdCard}
                            ></img>
                          </div>
                        )
                      )}
                    </span>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('GSTNumber/TaxIdentificationNumber')}
                    </span>

                    <AvField
                      name="gstNumber"
                      value={gstNumber}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="gstNumber"
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {gstNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('PhoneNumber')}
                    </span>

                    <AvField
                      name="phoneNumber"
                      value={phoneNumber}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="phoneNumber"
                      disabled
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {phoneNumber}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('Username')}
                    </span>

                    <AvField
                      name="userName"
                      value={userName}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="username"
                      disabled
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {userName}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('email_id')}
                    </span>
                    <AvField
                      name="email"
                      value={email}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="emailid"
                      disabled
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {email}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <span
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {t('DeliveryTime')}
                    </span>
                    <AvField
                      name="deliveryTimeInput"
                      value={deliveryTimeInput}
                      onChange={(e) => setDeliveryTimeInput(e.target.value)}
                      type="text"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                      id="deliveryTimeInput"
                    />
                    <div>
                      <span
                        className={
                          !props.edit
                            ? "t4f_label mt-1 view"
                            : "t4f_label d-none"
                        }
                      >
                        {deliveryTime}
                      </span>
                    </div>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  {" "}
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {props?.edit ? "Upload Profile Image" : t('ProfileImage')}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload_profilepic}
                      multiple="false"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                    ></input>
                    {console.log("profilePic", profilePicture)}
                    {isProfilePicLoaded ? (
                      <span>
                        <Loading />
                      </span>
                    ) : (
                      profilePicture && (
                        <div className="w-75 mt-1">
                          <img
                            className="profile_image"
                            // ref={uploadedImage_profilepic}
                            // src={profilePic}
                            // src={`data:image/jpeg;base64,${profilePicture?.data}`}
                            src={profilePicture}
                          ></img>
                        </div>
                      )
                    )}
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {props?.edit ? " Upload Menu Image" : t('MenuImage')}
                      </span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload_menu}
                      multiple="true"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                    ></input>
                    {isMenuLoaded ? (
                      <span>
                        <Loading />
                      </span>
                    ) : (
                      menuPics != null && (
                        <div className="imagecontent w-75 mt-1">
                          <div className="row">
                            {(menuPics || []).map((pic) => (
                              <>
                                {/* close */}

                                <div className="col float-right">
                                  {props.edit && (
                                    <div className="zindex">
                                      <Link
                                        className="float-right"
                                        onClick={(e) =>
                                          deleteImage(
                                            pic,
                                            "MENU_PIC",
                                            currentFoodstallID
                                          )
                                        }
                                      >
                                        <img
                                          src={close}
                                          alt="..."
                                          height="14"
                                        ></img>
                                      </Link>
                                    </div>
                                  )}

                                  <div className="">
                                    <img
                                      className="multi_image"
                                      src={pic}
                                      alt="..."
                                    ></img>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div>
                      {" "}
                      <span
                        className={
                          props?.edit
                            ? "t4f_label mb-1 viewtitle"
                            : "font-weight-bold"
                        }
                      >
                        {props?.edit
                          ? "Upload Foodstall Image"
                          : t('FoodstallImage')}
                      </span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload_foodstall}
                      multiple="true"
                      className={
                        props?.edit ? "t4finput-sm edit" : "t4finput-sm  d-none"
                      }
                    ></input>
                    {isFSLoaded ? (
                      <span>
                        <Loading />
                      </span>
                    ) : (
                      foodStallPics != null && (
                        <div className="imagecontent w-75 mt-1">
                          <div className="row">
                            {(foodStallPics || []).map((pic) => (
                              <>
                                <div className="col float-right">
                                  {props.edit && (
                                    <div className="zindex">
                                      <Link
                                        className="float-right"
                                        onClick={(e) =>
                                          deleteImage(
                                            pic,
                                            "FOODSTALL_PIC",
                                            currentFoodstallID
                                          )
                                        }
                                      >
                                        <img
                                          src={close}
                                          alt="..."
                                          height="14"
                                        ></img>
                                      </Link>
                                    </div>
                                  )}

                                  <div className="">
                                    <img
                                      className="multi_image"
                                      src={pic}
                                      alt="..."
                                    ></img>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </FormGroup>
                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      {t('BankDetails')}
                    </div>
                    {/* <button type="button" className="t4fbutton-gray w-50 " data-toggle="modal" data-target={props?.edit ? "#bank-mechant-modal" : "#bank-mechant-modal-view"} onClick={(e) => setMessage("")} to="#">
                      {props.edit ? <img src={addblue} alt="edit" height="13" /> : ""}
                      {!props.edit ? "View Details" : " Add Bank Detials"}
                    </button> */}
                    <button
                      type="button"
                      className="t4fbutton-gray w-50 font-weight-bold"
                      onClick={(e) => (setMessage(""), handleShowBank())}
                      to="#"
                    >
                      {props.edit ? (
                        <img src={addblue} alt="edit" height="13" />
                      ) : (
                        ""
                      )}
                      {!props.edit ? "View Details" : " Add Bank Detials"}
                    </button>
                  </div>
                  {/* <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      QR Code
                    </div>
                    <button
                      type="button"
                      className="t4fbutton-gray w-50 font-weight-bold"
                      onClick={(e) => (setMessage(""), handleShowQR())}
                      to="#"
                    >
                      <img src={qrcodedark} alt="edit" height="13" />
                      {" View"}
                    </button>
                  </div> */}

                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      {t('food-stall')}{" "}{t('QRCode')}
                    </div>
                    <button
                      type="button"
                      className="t4fbutton-gray w-50 font-weight-bold"
                      onClick={(e) => (setMessage(""), handleShowSelfQR())}
                      to="#"
                    >
                      <img src={qrcodedark} alt="edit" height="13" />
                      {" View"}
                    </button>
                  </div>
                  <div className="mb-1">
                    <div
                      className={
                        props?.edit
                          ? "t4f_label mb-1 viewtitle"
                          : "font-weight-bold"
                      }
                    >
                      {" "}
                      {t('Timings')}
                    </div>
                    <button
                      type="button"
                      className={
                        props?.edit
                          ? "t4fbutton-gray w-50 font-weight-bold"
                          : "d-none"
                      }
                      data-toggle="modal"
                      data-target={
                        props?.edit
                          ? "#hour-mechant-modal"
                          : "#hour-mechant-modal-view"
                      }
                      onClick={(e) => setMessage("")}
                      to="#"
                    >
                      {props.edit ? (
                        <img src={addblue} alt="edit" height="13" />
                      ) : (
                        ""
                      )}
                      {!props.edit ? "View Timings" : t('AddUpdateHours')}
                    </button>
                  </div>
                  <div className="mb-1">
                    {/* {JSON.stringify(currentFoodstallTiming)} */}
                    {currentFoodstallTiming &&
                      currentFoodstallTiming.map((hour, index) => (
                        <div className="d-flex">
                          <div className="px-1 w-25">{t(hour.weekDayName)}</div>
                          <div className="px-1">
                            {hour.opened24Hours
                              ? "Open 24Hours"
                              : hour.closed
                              ? "Closed"
                              : (hour.openTime != ""
                                  ? moment(hour.openTime, "hh:mm").format("LT")
                                  : hour.openTime) +
                                " - " +
                                (hour.closeTime != ""
                                  ? moment(hour.closeTime, "hh:mm").format("LT")
                                  : hour.closeTime)}
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
              <div className="my-4">
                <button
                  color="primary"
                  className={props?.edit ? "t4fbutton-long " : "d-none"}
                  onClick={handleShow}
                  type="submit"
                >
                  {!isLoaded
                    ? props?.edit
                      ? 'Save'
                      : t("update_profile")
                    : "Please Wait..."}
                </button>
                {
                  props.role === 'admin' ? (
                    <button
                      type="button"
                      id={props?.edit ? "cancel" : "cancelupdate"}
                      color="primary"
                      className={
                        props?.edit
                          ? "mx-1 t4fbutton-long color-gray edit"
                          : "d-none"
                      }
                      onClick={() => props.closeDetailsModal()}
                    >
                      {!isLoaded ? t("cancel") : "Please Wait..."}
                    </button>
                  ):(
                    <button
                      type="button"
                      id={props?.edit ? "cancel" : "cancelupdate"}
                      color="primary"
                      className={
                        props?.edit
                          ? "mx-1 t4fbutton-long color-gray edit"
                          : "d-none"
                      }
                      onClick={() => props.toggle(1)}
                    >
                      {!isLoaded ? t("cancel") : "Please Wait..."}
                    </button>
                  )
                }
                
              </div>
            </AvForm>
          </Col>

          <Col lg={1}>
            <a
              className="needHelp text-nowrap "
              onClick={(e) => setVideo((video) => !video)}
            >
              <img src={play} alt="edit" height="13" />{" "}
              <span className="text-nowrap">{t('NeedHelp')}</span>
            </a>
          </Col>
        </Row>
        <div className={video ? "position-absolute videoDragDiv" : "d-none"}>
          <Draggable handle=".drag">
            <div id="videoDragDiv" className="drag fullborder">
              <div>
                <div className=" headertitle d-flex justify-content-between">
                  <div className=" p-2">Create Profile</div>
                  <div>
                    <a
                      aria-label="Close"
                      href="#"
                      onClick={(e) => setVideo((video) => !video)}
                    >
                      <span aria-hidden="true">
                        <img src={close} alt="close" height="16" />
                      </span>
                    </a>
                    <span className="px-2">
                      <img src={move} alt="move" height="17" />
                    </span>
                  </div>
                </div>
                <div className="roundborder whitebg">
                  <video
                    width="320"
                    height="200"
                    className="roundborder mt-2"
                    controls
                  >
                    <source src="" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
      {/* <span className={!props.edit ? "t4f_label mt-1 view" : "t4f_label d-none"}>{phoneNumber}</span> */}
      {props?.edit && (
        <div
          className={"modal fade fadepop"}
          id="bank-mechant-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <BankDetails edit={props.edit} sendid="bank-merchant-modal" />
          </div>
        </div>
      )}
      {!props?.edit && (
        <div
          className="modal fade fadepop"
          id="bank-mechant-modal-view"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <BankDetails edit={props.edit} sendid="bank-merchant-modal-view" />
          </div>
        </div>
      )}
      <div
        className="modal fade fadepop"
        id={props?.edit ? "hour-mechant-modal" : "hour-mechant-modal-view"}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <Hours edit={true} foodstallTimings={props.foodstallTimings} role={props.role} updateTimings = {updateTimings}/>
        </div>
      </div>
      {/* <Modal
        show={showHours}
        className="fadepop"
        onHide={handleClose}
        centered
        animation={false}
      >
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Hourss</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Hours foodstallTimings={props.foodstallTimings}/>
        </Modal.Body>
      </Modal> */}

      <Modal
        show={showBank}
        className="fadepop"
        onHide={handleShowBank}
        centered
        animation={false}
      >
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Bank Details</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BankDetails edit={props.edit} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showQR}
        className="fadepop"
        onHide={handleShowQR}
        centered
        animation={false}
      >
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>QR code</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MerchantQRcode selfQR='false'/>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSelfQR}
        className="fadepop"
        onHide={handleShowSelfQR}
        centered
        animation={false}
      >
        <Modal.Header className="t4h-color-gray" closeButton>
          <Modal.Title>
            <h6>Stall QR code</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MerchantQRcode selfQR='true'/>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        className="fadepop"
        onHide={handleClose}
        centered
        animation={false}
      >
        {/*  <Modal.Header className="t4h-color-gray" closeButton>
       <Modal.Title>
            <h6>Add Food Stall</h6>
          </Modal.Title> 
        </Modal.Header>*/}
        {isLoaded ? (
          <Modal.Body>
            <Alert className="w-100" message="Please wait...." type="info" />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <ProfileCreatedPop role={props.role} />
          </Modal.Body>
        )}
      </Modal>

      {/* <div
        className="modal fade fadepop"
        // id="pop-mechant-modal"
        id={props?.edit ? "pop-mechant-modal" : "pop-mechant-modal-view"}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          {!isLoaded ? <ProfileCreatedPop /> : <Alert className="w-100" message="Please wait...." type="info" />}
        </div>
      </div> */}
    </>
  );
};

export default CreateUpdateProfile;
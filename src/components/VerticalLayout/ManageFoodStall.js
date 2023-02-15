import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../components/Common/Alert";
import close from "../../assets/icons/close.png";
import info from "../../assets/icons/info.png";
import { useDispatch, useSelector } from "react-redux";
import { reduxPostData, getData, postData } from "../../ServiceCall";
import Select from "react-select";
import * as merchantActionTypes from "../../store/authentication/merchant/actionTypes";
import config from "../../container/app/navigation.json";
const ManageFoodStall = (props) => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [select, setSelect] = useState({});
  const dispatch = useDispatch();
  const [allDrp, setAllDrp] = useState([]);
  const [foodcourttype, setFoodcourttype] = useState([]);
  const [drpShoppingmall, setdrpShoppingmall] = useState([]);
  const [drpfoodCourtName, setdrpfoodCourtName] = useState([]);
  //const { branchName, bankName, ifscCode } = props.data || {};

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState('');
  const [buTypes, setBuTypes] = useState([]);

  const buTypesSet = new Set();
  const [selectedBuType, setSelectedBuType] = useState('');
  const [filteredBuList, setFilteredBuList] = useState([]);
  const [foodCourts, setFoodCourts] = useState([])
  
  let country = [];
  const statesOld = [
    // { value: "TamilNadu", label: "TamilNadu" },
    // { value: "Andrapradesh", label: "Andrapradesh" },
    { value: "Telangana", label: "Telangana" },
  ];
  const city = [
    // { value: "Chennai", label: "Chennai" },
    { value: "Hyderabad", label: "Hyderabad" },
    // { value: "Vizag", label: "Vizag" },
    // { value: "Vijayawada", label: "Vijayawada" },
    // { value: "Tirupathi", label: "Tirupathi" },
  ];
  const locationOld = [
    // { value: "", label: "" },
    // { value: "Adayar", label: "Adayar" },
    // { value: "Chrompet", label: "Chrompet" },
    { value: "Ameerpet", label: "Ameerpet" },
    { value: "BanjaraHills", label: "BanjaraHills" },
    { value: "Kukatpally", label: "Kukatpally" },
    { value: "Manikonda", label: "Manikonda" },
  ];

  // set value for default selection
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFCType, setSelectedFCType] = useState('');
  const [selectedShoppingMall, setShoppingMall] = useState('');
  const [selectedFoodCourtId, setFoodCourtId] = useState('');
  const [selectedShoppingMallName, setShoppingMallName] = useState("");
  const [selectedFoodCourtName, setFoodCourtName] = useState("");
  const [selectedbuId, setselectedbuId] = useState(0);
  const [selectedbuName, setselectedBuName] = useState('');
  const [disable, setDisable] = useState(false);

  const [buList, setBuList] = useState([]);

  useEffect(() => {
    
    getCountries();
  }, []);

  const getCountries = async () => {

    setStates([]);

    const countriesResponse = await getData('/api/admin/location/get-countries');
    console.log(countriesResponse);

    // setCountries(countriesResponse.data.data)

    const countriesList = countriesResponse.data.data.map(countryObj => {
      return {
        label: countryObj.name,
        value: countryObj.countryCode
      }
    })

    console.log('countriesList', countriesList);
    setCountries(countriesList);

    console.log('countries', countries);

  }

  const loadStates = async (country) => {

    setSelectedCountry(country.label)
    setSelectedCountryCode(country.value)

    const statesResponse = await getData('/api/admin/location/get-states?country-code=' + country.value);

    console.log(statesResponse);

    // setCountries(countriesResponse.data.data)

    const statesList = statesResponse.data.data.map(stateObj => {
      return {
        label: stateObj.name,
        value: stateObj.name
      }
    })

    console.log('statesList', statesList);
    setStates(statesList);

    console.log('countries', states);
  }

  const loadCities = async (stateName) => {

    setSelectedState(stateName);

    const citiesResponse = await getData('/api/admin/location/get-cities?state=' + stateName);

    console.log(citiesResponse);

    // setCountries(countriesResponse.data.data)

    const cityList = citiesResponse.data.data.map(cityObj => {
      return {
        label: cityObj.name,
        value: cityObj.name
      }
    })

    console.log('statesList', cityList);
    setCities(cityList);

    console.log('countries', cities);
    
  }

  const loadAllBusinessUnits = async (city) => {

    setSelectedCity(city)

    const requestBody = {
      country: selectedCountry,
      state: selectedState,
      city: city
    }

    const buResponse = await postData('/api/admin/get-business-unit', requestBody, '', 'POST');

    console.log(buResponse);

    // setCountries(countriesResponse.data.data)
    const businessUnitsList = buResponse.data.data.map(buObj => {

      const typeObject = {
        label: buObj.type === 'SHOPPING_MALL' ? 'Shopping Mall' : (buObj.type === 'THEATRE' ? 'Theatre' : 'Restaurant'),
        value: buObj.type
      }

      const isTypeAdded = (type) => {

        let flag = false;
        buTypesSet.forEach(a => {
          if(a.value === type){
            flag = true;
          }
       })
       return flag;
      }

      if(!isTypeAdded(buObj.type)){
        buTypesSet.add(typeObject);
      }

      return {
        label: buObj.name,
        value: buObj.name,
        type: buObj.type,
        address: buObj.address,
        buId: buObj.businessUnitId
      }
    });

    console.log(buTypesSet)

    if(buTypesSet.size < 3){
      const typeObject = {
        label: 'Restaurant',
        value: 'RESTAURANT'
      }
  
      buTypesSet.add(typeObject);
    }   

    setBuTypes([...buTypesSet]);

    console.log('businessUnitsList', businessUnitsList, buTypes, buTypesSet);
    setBuList(businessUnitsList);

  }

  const loadBusinessUnits = (buType) => {

    let filteredBuList = buList.filter(bu => bu.type === buType);;

    if(buType === 'SHOPPING_MALL'){
      setSelectedBuType('Shopping Mall')
    }else if(buType === 'THEATRE'){
      setSelectedBuType('Theatre')
    }else {
      setSelectedBuType('Restaurant')
    }

    console.log(filteredBuList);
    setFilteredBuList(filteredBuList);
  }

  const loadFoodCourts = async (bu) => {

    console.log(bu);

    setselectedbuId(bu.buId);
    setselectedBuName(bu.value);
    
    const fcResponse = await getData('/api/admin/get-bu-food-courts?buId='+bu.buId);

    const foodCourtsList = fcResponse.data.data.map(fc => {
      return {
        foodCourtId: fc.foodCourtId,
        label: fc.name,
        value: fc.name
      }
    })

    setFoodCourts(foodCourtsList);

    console.log(fcResponse);
  }

  const settingFoodCourt = (fc) => {
    setFoodCourtName(fc.value);
    setFoodCourtId(fc.foodCourtId)
  }

  const uniqueNumber = useSelector((state) => state.merchant.merchants.uniqueNumber);
  
  const handleSubmit = (event, errors, values) => {
    if (selectedCountry === '' || selectedState === '' || selectedCity === '' || selectedBuType === '') {
      let validationMessage = "";
      let messageType = "";
      validationMessage = "Please select all fields";
      messageType = "danger";

      setMessage(validationMessage);
      setType(messageType);
    } else {
      if (errors?.length == 0) {
        values.merchantUniqueNumber = uniqueNumber;
        values.state = selectedState;
        values.country = selectedCountry;
        values.buType = selectedBuType;
        values.city = selectedCity;
        values.location = location;
        values.buName = selectedbuName;
        values.foodCourtName = selectedFoodCourtName;
        values.foodCourtId = selectedFoodCourtId; // this is id
        values.buId = selectedbuId;
        console.log(JSON.stringify(values));
        dispatch(addFoodStallDetails(values));
      }
    }
  };
  const handleClose = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    props.handleClose();
  };
  const addFoodStallDetails = (data) => async (dispatch) => {
    let validationMessage = "";
    let messageType = "";
    console.log(data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData("/api/foodstall/create?merchant-number=" + uniqueNumber, data, "merchant")
      .then((response) => {
        if (response.status === 200) {
          console.log("food stall", response.data.data);
          dispatch({ type: merchantActionTypes.ADD_FOODSTALL_TO_MERCHANT_FROM_HEADER, payload: response.data.data });
          dispatch({ type: merchantActionTypes.GET_SELECTED_FOOD_STALL_FROM_DROPDOWN, payload: response.data.data });
          //history.push(config.merchanturl.MyProfile);
          validationMessage = response.statusText == "" ? "Food Stall sucessfully Saved" : response.statusText;
          messageType = "success";
          handleClose();
          console.log(response, "foodstall");

          setTimeout(function(){
            window.location.reload(1);
         }, 1500);
         
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err.response.data);
        messageType = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
        // if (err.response === undefined || err.response.data === undefined) {
        //   //  dispatch({ type: SIGN_UP_FAILED, payload: err.response });
        //   validationMessage = "Something went wrong, Please try again later";
        // }
        // else {
        //   //dispatch({ type: SIGN_UP_FAILED, payload: err.response.data.error });
        //   validationMessage = err.response?.data?.error;
        // }
      });
    console.log("validationMessage", validationMessage);
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);

  };

  const getAllDropdownDetails = async (data) => {
    let validationMessage = "";
    let messageType = "";
    console.log(data);

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData("/api/merchant/get-business-units?city=" + selectedCity + "&country=" + selectedCountry + "&state=" + selectedState, "", "merchant", false, "GET")
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log("dropdowns", response.data.data);
          setAllDrp(response.data.data);
          const _type = response.data.data.map((type) => {
            var findItem = foodcourttype.find((x) => x.value === type.type);
            if (!findItem) {
              return foodcourttype.push({ value: type.type, label: type.type.replace("_", " ") });
            }
          });
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        // if (err.response === undefined || err.response.data === undefined) {
        //   //  dispatch({ type: SIGN_UP_FAILED, payload: err.response });
        //   validationMessage = "Something went wrong, Please try again later";
        // }
        // else {
        //   //dispatch({ type: SIGN_UP_FAILED, payload: err.response.data.error });
        //   validationMessage = err.response?.data?.error;
        // }
      });
    console.log("validationMessage", validationMessage);
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
  };

  

  return (
    <div>
      <div className="modal-content1">
        {/* <div className="modal-header t4h-color-gray">
          <h6>Add Food Stall</h6>
          {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
          <a data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
              <img src={close} alt="close" height="16" />
            </span>
          </a>
        </div> */}
        <div>
          {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
          <div>
            <AvForm id="addMerchantForm" className="form-horizontal" onSubmit={handleSubmit}>
              {" "}
              <Row>
                <Col className="px-2" sm={6}>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> Country</span>
                    </div>
                    <Select name="country" options={countries} required value={countries.find((obj) => obj.value === selectedCountry)} onChange={(e) => loadStates(e)}></Select>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> State</span>
                    </div>
                    {/* <AvField type="select" name="state" >
                      {states.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </AvField> */}
                    <Select name="state" options={states} value={states.find((obj) => obj.value === selectedState)} onChange={(e) => loadCities(e.value)}></Select>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> City</span>
                    </div>
                    <Select name="city" options={cities} value={cities.find((obj) => obj.value === selectedCity)} onChange={(e) => loadAllBusinessUnits(e.value)}></Select>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> Location</span>
                    </div>
                    {/* <Select name="location" options={location} value={location.find((obj) => obj.value === selectedLocation)} onChange={(e) => handleChange(e, "location")}></Select> */}
                    <AvField
                      name="location"
                      type="text"
                      className="t4finput-sm w-100"
                      id="location"
                      validate={{
                        required: {
                          value: true,
                        },
                      }}
                      onChange={
                        (e) => setLocation(e.target.value)
                      }
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> Type</span>
                    </div>
                    <Select name="buType" options={buTypes} value={buTypes.find((obj) => obj.value === selectedBuType)} onChange={(e) => loadBusinessUnits(e.value)}></Select>
                  </FormGroup>
                  {
                    selectedBuType.length > 0 && (
                      <FormGroup className={selectedBuType.toUpperCase() === "RESTAURANT" ? "d-none" : "mb-2"}>
                      <div className="mb-1">
                        <span className="t4f_label">
                          {selectedBuType} 
                          {/* <img src={info} height="11" alt="..." />{" "} */}
                        </span>
                      </div>
                      <Select name="buName" isLoading={false} isDisabled={disable} isRtl={false} options={filteredBuList} value={filteredBuList.find((obj) => obj.value === selectedShoppingMall)} onChange={(e) => loadFoodCourts(e)}></Select>
                    </FormGroup>
                    )
                  }
                  
                </Col>
                <Col className="px-2" sm={6}>
                  <FormGroup className={selectedBuType.toUpperCase() === "RESTAURANT" ? "d-none" : "mb-2"}>
                    <div className="mb-1">
                      <span className="t4f_label"> Food Court</span>
                    </div>
                    <Select name="foodCourtName" isDisabled={disable} options={foodCourts} value={foodCourts.find((obj) => obj.value === selectedFoodCourtName)} onChange={(e) => settingFoodCourt(e)}></Select>
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label"> {selectedBuType.toUpperCase() === "RESTAURANT" ? 'Restaurant Name': 'Food Stall Name'}</span>
                    </div>
                    <AvField
                      name="foodStallName"
                      type="text"
                      className="t4finput-sm w-100"
                      id="foodstallname"
                      validate={{
                        required: {
                          value: true,
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1">
                      <span className="t4f_label text-nowrap">{selectedBuType.toUpperCase() === "RESTAURANT" ? 'Restaurant': 'Food Stall'} License Number</span>
                    </div>

                    <AvField
                      name="foodStallLicenseNumber"
                      type="text"
                      className="t4finput-sm w-100"
                      id="ifsc_code"
                      //value={ifscCode}
                      validate={{
                        required: {
                          value: true,
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 t4f_label text-nowarp">GST Number/TIN</div>

                    <AvField
                      name="gstNumber"
                      type="text"
                      className="t4finput-sm w-100"
                      id="gst"
                      validate={{
                        required: {
                          value: true,
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <div className="mb-1 t4f_label text-nowarp">Delivery Time</div>
                    <AvField name="deliveryTime" type="text" className="t4finput-sm w-100" id="delivaryTime" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mt-4">
                <button
                  color="primary"
                  className="t4fbutton-long"
                  type="submit"
                  // data-dismiss="modal"
                >
                  {!isLoaded ? "Save" : "Please Wait..."}
                  {/* {!isLoaded ? t("submit") : <Loading />} */}
                </button>
              </div>
            </AvForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFoodStall;

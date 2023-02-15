import {
  Box,
  Button,
  FormControlLabel,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
// import AvField from "availity-reactstrap-validation/lib/AvField";
// import AvForm from "availity-reactstrap-validation/lib/AvForm";
import {
  AvForm, AvField, AvGroup, AvInput, AvFeedback,
  AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox
} from 'availity-reactstrap-validation';

import { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row, TabContent } from "reactstrap";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import { getData, postData, callApi } from "../../../ServiceCall";
import edit from "../../../assets/icons/edit.png";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "react-notifications/dist/react-notifications.css";

const Inventory = () => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editCountryModalShow, setEditCountryModalShow] = useState(false);
  const [stateModalFlag, setStateModalFlag] = useState(false);
  const [stateEditModalFlag, setStateEditModalFlag] = useState(false);
  const [cityModalFlag, setCityModalFlag] = useState(false);
  const [cityEditModalFlag, setCityEditModalFlag] = useState(false);
  const [countryName, setCountryName] = useState();
  const [countrycode, setCountryCode] = useState();
  const [buAddress, setBuAddress] = useState();
  const [buPincode, setBuPincode] = useState();
  const [buType, setBuType] = useState("SHOPPING_MALL");
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [buModalFlag, setBUModalFlag] = useState(false);
  const [buEditModalFlag, setBUEditModalFlag] = useState(false);  
  const [fcModalFlag, setFcModalFlag] = useState(false);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedBU, setSelectedBU] = useState({});
  const [selectedFC, setSelectedFC] = useState({});
  const [buName, setBuName] = useState("");
  const [foodCourts, setFoodCourts] = useState([]);
  const [newFoodCourtName, setNewFoodCourtName] = useState("");

  useEffect(() => {
    const getCountriesList = async () => {
      const response = await getData("/api/admin/location/get-countries");
      setCountries(response.data.data);
    };
    getCountriesList();
    console.log(countries);
  }, [modalShow, stateModalFlag, editCountryModalShow, buEditModalFlag]);

  const addCountry = async (event, error, values) => {
    
    const data = {
      countryCode: countrycode,
      name: countryName,
    };

    //const handleSubmit = (event, error, values) => { }

    const response = await postData(
      "/api/admin/location/add-country",
      data,
      "admin",
      "POST"
    );

    console.log(response);
    setModalShow(false);
    window.location.reload();
  };

  const updateCountry = async () => {
    const data = {
      id: selectedCountry.id,
      countryCode: selectedCountry.countrycode,
      name: countryName,
    };

    console.log(selectedCountry);
    console.log(countryName);

    const response = await postData(
      "/api/admin/location/update-country",
      data,
      "admin",
      "POST"
    );

    console.log(response);
    NotificationManager.success('Country is updated to ' + countryName, 'Success');
    setEditCountryModalShow(false);
    // window.location.reload();
  };

  const addState = async (countryCode) => {
    const response = await postData(
      "/api/admin/location/add-state?country-code=" + countryCode,
      {
        countryCode: countryCode,
        name: state,
      },
      "admin",
      "POST"
    );
    setStates([
      ...states,
      {
        countryCode: countryCode,
        name: state,
      },
    ]);
    console.log(response);
    setStateModalFlag(false);
    // window.location.reload();
  };

  const updateState = async () => {
    const response = await postData(
      "/api/admin/location/update-state",
      {
        id: selectedState.id,
        name: state,
      },
      "admin",
      "POST"
    );
    console.log(response);

    setStateEditModalFlag(false);
    NotificationManager.success('State is updated to ' + state, 'Success');
    getStates(selectedState.countryCode);
    // window.location.reload();
  };

  const addCity = async (stateName) => {
    const response = await postData(
      "/api/admin/location/add-city?state-name=" + stateName,
      {
        state: stateName,
        name: city,
      },
      "admin",
      "POST"
    );
    setCities([
      ...cities,
      {
        state: stateName,
        name: city,
      },
    ]);
    console.log(response);
    setCityModalFlag(false);
    // window.location.reload();
  };

  const updateCity = async () => {
    const response = await postData(
      "/api/admin/location/update-city",
      {
        id: selectedCity.id,
        name: city,
      },
      "admin",
      "POST"
    );

    getCities(selectedCity.state);

    console.log(response);

    NotificationManager.success('City is updated to ' + city, 'Success');

    setCityEditModalFlag(false);
    // window.location.reload();
  };


  const getBusinessUnits = async (cityName) => {
    const buResponse = await postData(
      "/api/admin/get-business-unit",
      {
        city: cityName,
        state: selectedState.name,
        country: selectedCountry.name,
      },
      "admin",
      "POST"
    );

    setBusinessUnits(buResponse.data.data);
  };
  const saveBU = async () => {
    const buData = {
      address: buAddress,
      city: selectedCity.name,
      country: selectedCountry.name,
      name: buName,
      pincode: buPincode,
      state: selectedState.name,
      type: buType,
    };
    const data = await postData(
      "/api/admin/add-business-unit",
      buData,
      "admin",
      "POST"
    );
    if (data.status === 200)
      setBusinessUnits([
        ...businessUnits,
        {
          address: buAddress,
          city: selectedCity.name,
          country: selectedCountry.name,
          name: buName,
          pincode: buPincode,
          state: selectedState.name,
          type: buType,
        },
      ]);
    console.log(data);
    setBUModalFlag(false);
  };

  const updateBU = async () => {
    
    await callApi(
      "/api/admin/update-business-unit?buId=" + selectedBU.businessUnitId + "&newName=" + buName,
      "PUT"
    ).then(res => {
      
      console.log(res);
        if (res.data.status === 200)
        setBusinessUnits([
          ...businessUnits,
          {
            address: buAddress,
            city: selectedCity.name,
            country: selectedCountry.name,
            name: buName,
            pincode: buPincode,
            state: selectedState.name,
            type: buType,
          },
        ]);
      setBUEditModalFlag(false);
      getBusinessUnits(selectedCity.name)
    })
    
  };

  const createFoodCourt = async () => {

    const fcRequestBody = {
      name: newFoodCourtName
    };

    const data = await postData(
      "/api/admin/bunit/" + selectedBU.businessUnitId + "/add-food-court",
      fcRequestBody,
      "admin",
      "POST"
    );
    if (data.status === 200)
      setFoodCourts([
        ...foodCourts,
        {
          ...fcRequestBody
        },
      ]);
    console.log(data);
    setFcModalFlag(false);
  };

  const getStates = async (countryCode) => {
    console.log(selectedCountry);

    const statesResponse = await getData(
      "/api/admin/location/get-states?country-code=" + countryCode
    );

    console.log(statesResponse.data.data);

    setStates(statesResponse.data.data);
  };

  const getCities = async (state) => {
    const citiesResponse = await getData(
      "/api/admin/location/get-cities?state=" + state
    );

    console.log(citiesResponse.data.data);

    setCities(citiesResponse.data.data);
  };

  const getFoodCourts = async (buId) => {
    const getFoodCourtsResponse = async (buId) => {
      const response = await getData(
        "/api/admin/get-bu-food-courts?buId=" + buId
      );

      console.log(response.data.data);
      if (response.data) {
        setFoodCourts(response.data.data);
      }

    };

    getFoodCourtsResponse(buId);
  };
  return (
    <div>

      <SideNavBar id={16} role={"admin"} />
      <div className="merchange-content">
        <Header title="Inventory" role={"admin"} />
        <NotificationContainer />
        <div className="p-2">
          <TabContent>
            <AvForm id="createFoodItem">
              <FormGroup>
                <div
                  className="row mt-2 fullBorder "
                  style={{ marginLeft: "1.2%", marginRight: "1.2%" }}
                >
                  <div className="col-lg-2 rightBorder">
                    <div className="fooditem_Header p-2">Countries</div>
                    <div className=" p-2">
                      <div>
                        <button
                          type="button"
                          className="t4fbutton-gray w-100 mt-1 mb-1 "
                          onClick={() => setModalShow(true)}
                        >
                          <b>Add Country</b>
                        </button>
                      </div>
                      {countries.length > 0 &&
                        countries.map((country) => (
                          <div className="row">
                            <div className="col-md-10">
                              <Button
                                variant="outlined"
                                style={
                                  country.name === selectedCountry.name
                                    ? {
                                      marginTop: "1%",
                                      width: "100%",
                                      backgroundColor: "gray",
                                      color: "white",
                                    }
                                    : { marginTop: "1%", width: "100%" }
                                }
                                onClick={() => {
                                  setSelectedCountry(country);
                                  getStates(country.countryCode);
                                  setCities([]);
                                  setBusinessUnits([]);
                                  setFoodCourts([]);
                                }}
                              >
                                {country.name}
                              </Button>
                            </div>
                            <div className="col-md-2 pt-1" style={{ paddingLeft: 4 }}>
                              <img src={edit} width={28} height={28} onClick={() => {
                                setSelectedCountry(country);
                                setCountryName(country.name);
                                setEditCountryModalShow(true);
                                getStates(country.countryCode);
                                setCities([]);
                                setBusinessUnits([]);
                                setFoodCourts([]);
                              }}
                                style={{
                                  cursor: 'pointer'
                                }}
                              />
                            </div>

                          </div>
                        ))}

                      <div>
                        {/* <Button onClick={() => setModalShow(!modalShow)}>Open modal</Button> */}
                        <Modal
                          open={modalShow}
                          onClose={() => setModalShow(!modalShow)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box style={modalStyle}>
                            <div style={{ padding: "3%" }}>
                              <h5>Add New Country</h5>
                            </div>
                            <Container>
                              <AvForm id="addnewcountry" onValidSubmit={addCountry}>
                                <Row className="mt-3 mb-3">
                                  <Col>Country Code:</Col>
                                  <Col>
                                    <FormGroup className="mb-2">
                                      <AvField name="countrycode" id="countrycode"
                                        validate={{ required: true }}
                                        errorMessage="Please enter country code"
                                        onChange={(e) =>
                                          setCountryCode(e.target.value)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col>Country Name:</Col>
                                  <Col>
                                    <AvField name="countryname" required
                                      onChange={(e) =>
                                        setCountryName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>

                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setModalShow(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}

                                    >
                                      Save
                                    </Button>

                                  </Col>
                                </Row>
                              </AvForm>
                            </Container>
                          </Box>
                        </Modal>
                        <Modal
                          open={editCountryModalShow}
                          onClose={() => setEditCountryModalShow(!editCountryModalShow)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box style={modalStyle}>
                            <div style={{ padding: "3%" }}>
                              <h5>Edit Country</h5>
                            </div>
                            <Container>
                              <Row className="mt-3 mb-3">
                                <Col>Country Code:</Col>
                                <Col>
                                  {
                                    selectedCountry.countryCode
                                  }
                                </Col>
                              </Row>
                              <Row className="mt-3 mb-3">
                                <Col>Country Name:</Col>
                                <Col>
                                  <input value={countryName}
                                    onChange={(e) =>
                                      setCountryName(e.target.value)
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3 mb-3">
                                <Col></Col>
                                <Col>
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "#f04343",
                                      color: "white",
                                    }}
                                    onClick={() => setEditCountryModalShow(false)}
                                  >
                                    Cancel
                                  </Button>{" "}
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "green",
                                      color: "white",
                                      marginRight: "-5%",
                                    }}
                                    onClick={() => updateCountry()}
                                  >
                                    Save
                                  </Button>
                                </Col>
                              </Row>
                            </Container>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 rightBorder">
                    <div className="fooditem_Header p-2 ">State</div>
                    <div className=" p-2">
                      <div>
                        <button
                          type="button"
                          className="t4fbutton-gray w-100 mt-1 mb-1 "
                          onClick={() => setStateModalFlag(true)}
                          disabled={selectedCountry.name ? false : true}
                        >
                          <b>Add State</b>
                        </button>
                      </div>
                      {states.length > 0 &&
                        states.map((state) => (
                          <div className="row">
                            <div className="col-md-10">
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  getCities(state.name);
                                  setSelectedState(state);
                                  setBusinessUnits([]);
                                  setFoodCourts([]);
                                }}
                                style={
                                  state.name === selectedState.name
                                    ? {
                                      marginTop: "1%",
                                      width: "100%",
                                      backgroundColor: "gray",
                                      color: "white",
                                    }
                                    : { marginTop: "1%", width: "100%" }
                                }
                              >
                                {state.name}
                              </Button>
                            </div>
                            <div className="col-md-2 pt-1" style={{ paddingLeft: 4 }}>
                              <img src={edit} width={26} height={26} onClick={() => {
                                setSelectedState(state);
                                setState(state.name)
                                setBusinessUnits([]);
                                setFoodCourts([]);
                                getCities(state.name);
                                setStateEditModalFlag(true);
                              }} style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        ))}

                      <div>
                        {/* <Button onClick={() => setModalShow(!modalShow)}>Open modal</Button> */}
                        <Modal
                          open={stateModalFlag}
                          onClose={() => setStateModalFlag(!stateModalFlag)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box style={modalStyle}>
                            <div style={{ padding: "3%" }}>
                              <h5>Add New State in {selectedCountry.name}</h5>
                            </div>
                            <Container>
                              <Row className="mt-3 mb-3">
                                <Col>State Name:</Col>
                                <Col>
                                  <input
                                    onChange={(e) => setState(e.target.value)}
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3 mb-3">
                                <Col></Col>
                                <Col>
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "#f04343",
                                      color: "white",
                                    }}
                                    onClick={() => setStateModalFlag(false)}
                                  >
                                    Cancel
                                  </Button>{" "}
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "green",
                                      color: "white",
                                      marginRight: "-5%",
                                    }}
                                    onClick={() =>
                                      addState(selectedCountry.countryCode)
                                    }
                                  >
                                    Save
                                  </Button>
                                </Col>
                              </Row>
                            </Container>
                          </Box>
                        </Modal>
                        <Modal
                          open={stateEditModalFlag}
                          onClose={() => setStateEditModalFlag(!stateEditModalFlag)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box style={modalStyle}>
                            <div style={{ padding: "3%" }}>
                              <h5>Edit State</h5>
                            </div>
                            <Container>
                              <Row className="mt-3 mb-3">
                                <Col>State Name:</Col>
                                <Col>
                                  <input value={state}
                                    onChange={(e) => setState(e.target.value)}
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3 mb-3">
                                <Col></Col>
                                <Col>
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "#f04343",
                                      color: "white",
                                    }}
                                    onClick={() => setStateEditModalFlag(false)}
                                  >
                                    Cancel
                                  </Button>{" "}
                                  <Button
                                    style={{
                                      width: "50%",
                                      backgroundColor: "green",
                                      color: "white",
                                      marginRight: "-5%",
                                    }}
                                    onClick={() =>
                                      updateState()
                                    }
                                  >
                                    Save
                                  </Button>
                                </Col>
                              </Row>
                            </Container>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 rightBorder">
                    <div className="fooditem_Header p-2 ">Cities</div>
                    <div id="CusContent">
                      <div className=" p-2">
                        <div>
                          <button
                            type="button"
                            className="t4fbutton-gray w-100 mt-1 mb-1 "
                            onClick={() => setCityModalFlag(true)}
                            disabled={selectedState.name ? false : true}
                          >
                            <b>Add City</b>
                          </button>
                        </div>
                        {cities.length > 0 &&
                          cities.map((city) => (
                            <div className="row">
                              <div className="col-md-10">
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    // getCities(state.name);
                                    setSelectedCity(city);
                                    getBusinessUnits(city.name);
                                    setFoodCourts([]);
                                  }}
                                  style={
                                    city.name === selectedCity.name
                                      ? {
                                        marginTop: "1%",
                                        width: "100%",
                                        backgroundColor: "gray",
                                        color: "white",
                                      }
                                      : { marginTop: "1%", width: "100%" }
                                  }
                                >
                                  {city.name}
                                </Button>
                              </div>
                              <div className="col-md-2 pt-1" style={{ paddingLeft: 4 }}>
                                <img src={edit} width={26} height={26} onClick={() => {
                                  setSelectedCity(city);
                                  getBusinessUnits(city.name);
                                  setFoodCourts([]);
                                  setCity(city.name);
                                  setCityEditModalFlag(true);
                                }} style={{ cursor: 'pointer' }} />
                              </div>
                            </div>
                          ))}

                        <div>
                          {/* <Button onClick={() => setModalShow(!modalShow)}>Open modal</Button> */}
                          <Modal
                            open={cityModalFlag}
                            onClose={() => setCityModalFlag(!cityModalFlag)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={modalStyle}>
                              <div style={{ padding: "3%" }}>
                                <h5>Add New City in {selectedState.name}</h5>
                              </div>
                              <Container>
                                <Row className="mt-3 mb-3">
                                  <Col>City Name:</Col>
                                  <Col>
                                    <input
                                      onChange={(e) => setCity(e.target.value)}
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setCityModalFlag(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}
                                      onClick={() =>
                                        addCity(selectedState.name)
                                      }
                                    >
                                      Save
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            </Box>
                          </Modal>
                          <Modal
                            open={cityEditModalFlag}
                            onClose={() => setCityEditModalFlag(!cityEditModalFlag)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={modalStyle}>
                              <div style={{ padding: "3%" }}>
                                <h5>Edit City</h5>
                              </div>
                              <Container>
                                <Row className="mt-3 mb-3">
                                  <Col>City Name:</Col>
                                  <Col>
                                    <input value={city}
                                      onChange={(e) => setCity(e.target.value)}
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setCityEditModalFlag(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}
                                      onClick={() =>
                                        updateCity()
                                      }
                                    >
                                      Save
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            </Box>
                          </Modal>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-lg-3 rightBorder">
                    <div className="fooditem_Header p-2 ">
                      Shopping Malls / Theatres
                    </div>
                    <div id="CusContent">
                      <div className=" p-2">
                        <div>
                          <button
                            type="button"
                            className="t4fbutton-gray w-100 mt-1 mb-1 "
                            onClick={() => setBUModalFlag(true)}
                            disabled={selectedCity.name ? false : true}
                          >
                            <b>Add Business Unit</b>
                          </button>
                        </div>
                        {businessUnits.length > 0 &&
                          businessUnits.map((bu) => (
                            <div className="row">
                            <div className="col-md-10">
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    setSelectedBU(bu);
                                    getFoodCourts(bu.businessUnitId);
                                  }}
                                    style={
                                      bu.name === selectedBU.name
                                        ? {
                                          marginTop: "1%",
                                          width: "100%",
                                          backgroundColor: "gray",
                                          color: "white",
                                        }
                                        : { marginTop: "1%", width: "100%" }
                                    }
                                  >
                                    {bu.name}
                                  </Button>
                              </div>
                              <div className="col-md-2 pt-1" style={{ paddingLeft: 4 }}>
                                <img src={edit} width={26} height={26} onClick={() => {
                                  setSelectedBU(bu);
                                  setBuName(bu.name);
                                  getFoodCourts(bu.businessUnitId);
                                  setBUEditModalFlag(true);
                                }} style={{ cursor: 'pointer' }} />
                              </div>
                            </div>
                          ))}

                        <div>
                          {/* <Button onClick={() => setModalShow(!modalShow)}>Open modal</Button> */}
                          <Modal
                            open={buModalFlag}
                            onClose={() => setBUModalFlag(!buModalFlag)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={modalStyle}>
                              <div style={{ padding: "3%" }}>
                                <h5>
                                  Add New Business Unit in {selectedCity.name}
                                </h5>
                              </div>
                              <Container>
                                <Row className="mt-3 mb-3">
                                  <Col>Name:</Col>
                                  <Col>
                                    <Input
                                      onChange={(e) =>
                                        setBuName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col>Address:</Col>
                                  <Col>
                                    <Input
                                      onChange={(e) =>
                                        setBuAddress(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col>Pincode:</Col>
                                  <Col>
                                    <Input
                                      onChange={(e) =>
                                        setBuPincode(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col>Type</Col>
                                  <Col>
                                    <RadioGroup
                                      row
                                      aria-label="gender"
                                      name="row-radio-buttons-group"
                                      defaultValue="SHOPPING_MALL"
                                      onChange={(e) =>
                                        setBuType(e.target.value)
                                      }
                                    >
                                      <FormControlLabel
                                        value="SHOPPING_MALL"
                                        control={<Radio />}
                                        label="Shopping Mall"
                                      />
                                      <FormControlLabel
                                        value="THEATRE"
                                        control={<Radio />}
                                        label="Theatre"
                                      />
                                      {/* <FormControlLabel
                                        value="RESTAURANT"
                                        control={<Radio />}
                                        label="Restaurant"
                                      /> */}
                                    </RadioGroup>
                                  </Col>
                                </Row>
                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setBUModalFlag(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}
                                      onClick={() => saveBU()}
                                    >
                                      Save
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            </Box>
                          </Modal>

                          <Modal
                            open={buEditModalFlag}
                            onClose={() => setBUEditModalFlag(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={modalStyle}>
                              <div style={{ padding: "3%" }}>
                                <h5>
                                  Update {selectedBU.name}
                                </h5>
                              </div>
                              <Container>
                                <Row className="mt-3 mb-3">
                                  <Col>Name:</Col>
                                  <Col>
                                    <Input value={buName}
                                      onChange={(e) =>
                                        setBuName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                                
                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setBUEditModalFlag(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}
                                      onClick={() => updateBU()}
                                    >
                                      Save
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            </Box>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 rightBorder">
                    <div className="fooditem_Header p-2 ">Food Courts</div>
                    <div id="CusContent">
                      <div className=" p-2">
                        <div>
                          <button
                            type="button"
                            className="t4fbutton-gray w-100 mt-1 mb-1 "
                            onClick={() => setFcModalFlag(true)}
                            disabled={selectedBU.name ? false : true}
                          >
                            <b>Add Food Court</b>
                          </button>
                        </div>
                        {foodCourts.length > 0 &&
                          foodCourts.map((fc) => (
                            <Button
                              variant="outlined"
                              onClick={() => {
                                // setSelectedBU(bu);
                                // getFoodCourts(bu.businessUnitId);
                                console.log(fc);
                              }}
                              style={
                                fc.name === selectedFC.name
                                  ? {
                                    marginTop: "1%",
                                    width: "100%",
                                    backgroundColor: "gray",
                                    color: "white",
                                  }
                                  : { marginTop: "1%", width: "100%" }
                              }
                            >
                              {fc.name}
                            </Button>
                          ))}
                        <div>
                          {/* <Button onClick={() => setModalShow(!modalShow)}>Open modal</Button> */}
                          <Modal
                            open={fcModalFlag}
                            onClose={() => setFcModalFlag(!fcModalFlag)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={modalStyle}>
                              <div style={{ padding: "3%" }}>
                                <h5>Add New Food Court in {selectedBU.name}</h5>
                              </div>
                              <Container>
                                <Row className="mt-3 mb-3">
                                  <Col>Food Court Name:</Col>
                                  <Col>
                                    <Input
                                      onChange={(e) =>
                                        setNewFoodCourtName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>

                                <Row className="mt-3 mb-3">
                                  <Col></Col>
                                  <Col>
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "#f04343",
                                        color: "white",
                                      }}
                                      onClick={() => setFcModalFlag(false)}
                                    >
                                      Cancel
                                    </Button>{" "}
                                    <Button
                                      style={{
                                        width: "50%",
                                        backgroundColor: "green",
                                        color: "white",
                                        marginRight: "-5%",
                                      }}
                                      onClick={() => createFoodCourt()}
                                    >
                                      Save
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            </Box>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormGroup>
            </AvForm>
          </TabContent>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

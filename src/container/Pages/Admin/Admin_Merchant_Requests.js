import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import Alert from "../../../components/Common/Alert";
import ViewMerchantFoodStallDetails from "../Admin/Admin_ViewMerchantFoodStall";
import config from "../../../container/app/navigation.json";
import "../../../assets/styles/t4fstyle.scss";
import deleteicon from "../../../assets/icons/delete.png";
import eye from "../../../assets/icons/eye.png";
import add from "../../../assets/icons/add.png";
import searchmerchant_admin from "../../../assets/icons/searchmerchant_admin.png";
import close from "../../../assets/icons/close.png";
import lock from "../../../assets/icons/lock.png";
import user from "../../../assets/icons/user.png";
import call from "../../../assets/icons/call.png";
import { reduxGetData, reduxPostData, getData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMerchantRequest } from "../../../store/admin/action";


const Admin_Merchants = () => {
  const history = useHistory();
  const handleSubmit = (event, errors, values) => {

    if (errors?.length == 0) {
      let merchatData = {
        email: values.email,
        password: "",
        phoneNumber: values.phoneNumber,
        userName: values.userName,
      };
      postMerchantDetails(merchatData);

    }
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [filterData, setFilterData] = useState("");

  const [merchantGrid, setMerchantGrid] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(false);
  const allMerchants = useSelector((state) => state.admin);

  const [dataRefreshFlag, setDataRefreshFlag] = useState(0);

  const dataRefreshFlagHandler = () => {
    setDataRefreshFlag(dataRefreshFlag + 10);
  }

  const postMerchantDetails = async (merchatData) => {
    dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT_INIT });
    setIsLoaded((isLoaded) => !isLoaded);

    console.log(merchatData);
    let result = await reduxPostData("/api/admin/create-merchant", merchatData, "admin")
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT, payload: response.data.data });
          setGuiMsg("Merchant is Successfully Created");
          setType("success");
          console.log(response);
          setIsLoaded((isLoaded) => !isLoaded);
          // setTimeout(() => window.location.reload(), 3000)
          history.push(config.adminurl.Admin_Merchant_Requests);
          setTimeout(() => window.location.reload(), 2000)
        } else {
          console.log("else", response.data);
          dispatch({
            type: adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE,
            payload: response.data.error,
          });
          setIsLoaded((isLoaded) => !isLoaded);
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({
            type: adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE,
            payload: err.response,
          });
          setGuiMsg("Something went wrong, Please try again later");
          setType("danger");
          setIsLoaded((isLoaded) => !isLoaded);
        } else {
          dispatch({
            type: adminActionTypes.ADMIN_MERCHANT_FAILED_TO_CREATE,
            payload: err.response.data.error,
          });
          setGuiMsg(err.response.data.data);
          setType("danger");
          setIsLoaded((isLoaded) => !isLoaded);
        }
      });
  };

  const statusupdate_Foodstall = (fsId, uniqueNumber, status) => async (dispatch) => {
    
    setIsLoaded(!isLoaded);
    if (status === "") {
      return;
    }
    dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_INIT });
    let url = "/api/admin/update-foodstall-status?foodStallId=" + fsId + "&merchantUniqueId=" + uniqueNumber + "&status=" + status;
    const result = await reduxGetData(url, "put", "admin")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_SUCCESS, payload: response.data.data });
          setIsLoaded(true);
          setGuiMsg("Food Stall (" + fsId + ") Status is sucessfully updated to - " + status);
          setType("success");
          console.log("statusupdate_Foodstall", response);
          dispatch(fetchMerchantDetails());
          setIsLoaded(false);
        } else {
          dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setGuiMsg(response.data.data);
          setType("danger");
        }
      })
      .catch((err) => {
        console.log("failure", err);
        let validationMessage = "";
        validationMessage = err.response?.data?.data || "Something went wrong, Please try again later";
        dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED, payload: validationMessage });
        setIsLoaded(false);
        setGuiMsg(validationMessage);
        setType("danger");
      });
  };

  const fetchMerchantDetails = () => async (dispatch) => {
    setIsLoaded(true);
    console.log("Enter Redux Merchant data");
    dispatch({ type: adminActionTypes.ADMIN_CHECK_FETCH_MERCHANT });
    const response = await reduxGetData("/api/admin/fetch-merchant-requests", "get", "admin")
      .then((response) => {
        console.log("fetch-merchant-requests", response);

        if (response.status === 200) {
          dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT, payload: response.data.data });
          setData(response.data.data);
          setFilteredData(response.data.data);
          console.log(response);
          setIsLoaded(false);
        } else {
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
            payload: response.data.error,
          });
        }
      })
      .catch((err) => {
        console.log("failure", err);
        if (err.response === undefined || err.response.data === undefined) {
          dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL, payload: err.response });
        } else {
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
            payload: err.response.data.error,
          });
        }
      });
    setIsLoaded(false);
  };
  const viewProfile = (merchantReq) => {

    console.log(merchantReq);

    dispatch(setSelectedMerchantRequest(merchantReq));

    setViewProfile((viewprofile) => !viewprofile);
    setIsLoaded(false);
  };

  const handleViewMerchantFlag = () => {
    setViewProfile(!viewprofile);
  }

  useEffect(() => {
    console.log(allMerchants.merchants);
    if (allMerchants.merchants === undefined || allMerchants.merchants.length === 0) {
      dispatch(fetchMerchantDetails());
    }
    getCountriesList()
    //setMerchantGrid(merchantGrid.filter((mer) => mer.uniqueNumber != null));
  }, []);

  useEffect(() => {
    dispatch(fetchMerchantDetails());
  }, [dataRefreshFlag]);

  const searchmerchant = (value, e, index) => {
    console.log("setFilterData", value);

    [index][e.target.name] = e.target.checked;
    setFilterData(filterData + value + " >> ");
  };
  const GetFilterdata = (filterdata) => {
    console.log("filterdata", filterdata);
  };

  const [data, setData] = useState([]);
  const [filterTableData, setFilteredData] = useState([]);
  const datatable = {
    columns: [
      // {
      //     label: '',
      //     field: '',
      //     width: 1,
      //     sort: 'disabled'
      // }
      // ,
      {
        label: t("uno"),
        field: "uno",
        sort: "disabled",
        width: 100,
      },
      {
        label: t("foodstall-name"),
        field: "foodstallname",
        sort: "disabled",
        width: 270,
      },
      {
        label: t("owner"),
        field: "owner",
        sort: "disabled",
        width: 100,
      },
      {
        label: t("phone"),
        field: "phone",
        sort: "asc",
        sort: "disabled",
        width: 100,
      },

      {
        label: t("date"),
        field: "date",
        sort: "disabled",
        width: 100,
      },
      {
        label: t("status"),
        field: "status",
        sort: "disabled",
        width: 100,
      },

      {
        label: t("action"),
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      // allMerchants &&
      // allMerchants.merchants &&
      // allMerchants.merchants.sort((a, b) => a.merchantId < b.merchantId) &&
      data &&
      data.sort((a, b) => a.merchantId < b.merchantId) &&
      data.map((obj) => ({
        // 'handle':<MDBBtn className="btn-sm orange darken-3 white-text" >
        //  <MDBIcon icon="angle-double-right" /></MDBBtn>,
        uno: (
          <span className="title_color">
            <span className="tf4_linklabel">{obj.merchantId}</span>
          </span>
        ),
        uno_search: obj.merchantId,
        //foodstallname: obj.foodStalls && obj.foodStalls[0] ? obj.foodStalls[0].foodStallName : "No Foodstall",
        foodstallname: obj.foodStallName,
        owner: obj.owner,
        phone: obj.phoneNumber,
        subscription: "",
        date: obj.date,
        status_search: obj.status,
        status: (
          // <button className={obj.status?.toUpperCase() === "OPEN" || obj.status?.toUpperCase() === "NEW" ? "status-open" : obj.status === "In Progress" ? "status-inprogress" : obj.status === "Rejected" ? "status-inactive" : obj.status === "Approved" ? "status-active" : "status-inactive"}>
          //   {obj.status}
          // </button>
          <span style={{ fontSize: '16px', fontWeight: 'bolder' }}>
            {obj.status}
          </span>
        ),
        action: (
          <>
            <button className="t4fbutton-gray px-2 border" onClick={(e) => (dispatch(statusupdate_Foodstall(obj.foodStallId, obj.merchantId, obj.status?.toUpperCase() === "NEW" ? "In Progress" : obj.status?.toUpperCase() === "OPEN" ? "In Progress" : "")), viewProfile(obj), setGuiMsg(""))}>
              View
            </button>
          </>
        ),
      })),
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [buList, setBuList] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [buName, setBuName] = useState("");

  const getCountriesList = async () => {
    const response = await getData("/api/admin/location/get-countries");

    setCountries(response.data.data.map(country => country));
  };

  const getStatesList = async (countryCode) => {

    setCountryCode(countryCode);
    setCities([]);
    const response = await getData("/api/admin/location/get-states?country-code=" + countryCode);
    console.log(response.data.data)
    setStates(response.data.data.map(state => state));
    var coutryObject = countries.filter(x => x.countryCode == countryCode);
    setData(filterTableData);
    setStateName("");
    setCityName("");
    if (coutryObject.length > 0) {
      setCountryName(coutryObject[0].name)
    }
    else {
      setCountryName("")
    }
  };

  const getCityList = async (stateName) => {
    const response = await getData("/api/admin/location/get-cities?state=" + stateName);
    console.log(response.data.data);
    setCities(cities => response.data.data)
    setData(filterTableData);
    setStateName(stateName)
  };
  useEffect(() => {

    filterByField();
  }, [countryName, stateName, buName, cityName])

  const filterByField = () => {
    let filterDataByField = allMerchants.merchants.filter(columns => {
      return columns.buType?.toLowerCase().includes(buName.toLowerCase())
        && columns.country?.toLowerCase().includes(countryName.toLowerCase())
        && columns.city?.toLowerCase().includes(cityName.toLowerCase())
        && columns.state?.toLowerCase().includes(stateName.toLowerCase())
    })
    console.log("filterDataByField", filterDataByField);
    setData(filterDataByField);
  }


  const clearFilters = () => {
    setCountryCode("");
    setBuName("");
    setStates([]);
    setCities([]);
    setData(filterTableData);
  }


  const MerchantSearchbar = () => {
    const countries = ["India", "Dubai", "Singapore", "Qator"];
    const states = ["Andra Pradesh", "Telengana", "Karnataka", "Tamilnadu", "Kerala"];
    const cities = ["Hyderabad", "Vijayawada", "Guntur", "Nellore"];
    const types = ["Shopping Malls", "Theatres", "Restaurents"];
    const sms = ["Central", "Sarat City Mall", "GVK One"];
    const fcs = ["Sizzling Joe", "Burger King", "Dil Punjabi"];

    return (
      <div id="mechantsearchbar" className="p-2">
        <div class="row">
          <div className="col-sm-3 px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">Country</div>
              <div className="p-1 menuHeight">
                {countries.map((country) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={country} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={country}>{country}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className=" col-sm-3  px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">State</div>
              <div className="p-1 menuHeight">
                {states.map((state) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={state} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={state}>{state}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className=" col-sm-3  px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">City</div>
              <div className="p-1 menuHeight">
                {cities.map((city) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={city} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={city}>{city}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-3  px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">Type</div>
              <div className="p-1 menuHeight">
                {types.map((type) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={type} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={type}>{type}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div class="row py-1">
          <div className=" col-sm-3 px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">Shopping Mall</div>
              <div className="p-1 menuHeight">
                {sms.map((sm) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={sm} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={sm}>{sm}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className=" col-sm-3 px-1">
            <div className="fullBorder">
              <div className="adminheader p-1">Food Court</div>
              <div className="p-1 menuHeight">
                {fcs.map((fc) => (
                  <>
                    <div class="form-check">
                      <input type="checkbox" id={fc} onClick={(e, index) => searchmerchant(e.target.id, e, index)} />
                      <label for={fc}>{fc}</label>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 px-1">
          <button type="button" className="t4fbutton-sm " onClick={(e) => (setMenu((menu) => !menu), GetFilterdata(filterData))}>
            Show Results
          </button>
          <button type="button" className="mx-2 t4fbutton-sm color-gray " onClick={(e) => (setMenu((menu) => !menu), setFilterData(""))}>
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SideNavBar id={13} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("merchant-requests")} role={"admin"} viewmerchant={viewprofile} />
        <div className="px-2">
          <div className="p-2 bg-white mb-2 d-flex align-items-center">
            <div>
              <img src={searchmerchant_admin} alt=".." height="15" />{" "}
            </div>
            <div className="flex-grow-1 px-1">
              {/* <input className="t4finput_bottomborder" placeholder={t("select-food-stall")} value={filterData} onClick={(e) => (setMenu((menu) => !menu), setGuiMsg(""))} type="text" />
             */}

              <div class="container">
                <div className="row" >

                  <div className="col-2">
                    {/* <label  >Country &nbsp;</label> */}
                    <select name="country" id="country"
                      onChange={(e) => getStatesList(e.target.value)}
                      value={countryCode}>
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option value={country.countryCode}>{country.name}</option>
                      ))}
                    </select>
                  </div>


                  <div className="col-2">
                    {/* <label  >State &nbsp;</label> */}
                    <select name="state" id="state"
                      onChange={(e) => getCityList(e.target.value)}
                      value={stateName}>
                      <option value="">Select State </option>
                      {states.map((states) => (
                        <>
                          <option value={states.name}>{states.name}</option>
                        </>
                      ))}
                    </select>
                  </div>

                  <div className="col-2">
                    {/* <label  >City &nbsp;</label> */}
                    <select name="city" id="city" onChange={(e) => {
                      setData(filterTableData);
                      setCityName(e.target.value)
                    }} value={cityName}>
                      <option value="">Select City </option>
                      {cities.map((cities) => (
                        <>
                          <option value={cities.name}>{cities.name}</option>
                        </>
                      ))}
                    </select>
                  </div>

                  <div className="col-3">
                    {/* <label >Type </label> */}
                    <select name="type" id="type" onChange={(e) => {
                      setData(filterTableData);
                      setBuName(e.target.value)
                    }} value={buName}>
                      <option value="">Select Type</option>
                      <option value="SHOPPING MALL">Shopping Mall</option>
                      <option value="THEATRE">Theatre</option>
                      <option value="RESTAURANT">Restaurant</option>
                    </select>
                  </div >

                </div >
              </div>

            </div>
            <div className="px-1 ">
              <button className="t4fbutton-dgreen"
                style={{ margin: "10px" }} onClick={() => clearFilters()}>Clear Filters</button>
              <button className="t4fbutton-dgreen" data-toggle="modal" data-target="#admin-mechant-modal" onClick={(e) => setGuiMsg("")}>
                <img src={add} alt="edit" height="13" /> {t("add-merchant")}
              </button>
            </div>
          </div>
          <div className={menu ? "bg-white mt-1 w-75 position-absolute shadow zindex-10" : "d-none"}>
            {/* <MerchantSearchbar /> */}
          </div>
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={viewprofile ? "bg-white mt-1 shadow" : "d-none"}>
            <ViewMerchantFoodStallDetails toggle={viewProfile} role="admin" dataRefreshFlagHandler={dataRefreshFlagHandler} handleViewMerchantFlag={handleViewMerchantFlag} />
          </div>

          <div className={!viewprofile ? "table-border bg-white tab-content admin-merchants p-2" : "d-none"}>
            <MDBDataTableV5 hover disableRetreatAfterSorting={true}
              entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
              data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
          </div>

          <div className="modal fade fadepop" id="admin-mechant-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="text-color-dgreen " id="exampleModalCenterTitle">
                    Sign up
                  </h6>
                  {!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}
                  <a data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                      <img src={close} alt="close" height="16" />
                    </span>
                  </a>
                </div>
                <div class="modal-body">
                  {" "}
                  <Row>
                    <Col lg={12}>
                      <div>
                        <AvForm id="addMerchantForm" className="form-horizontal" onSubmit={handleSubmit}>
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <img src={user} height="13" alt="user" />
                                <span className="t4f_label"> Name*</span>
                              </span>
                            </div>

                            <AvField
                              name="userName"
                              //value={this.state.username}
                              type="text"
                              className="t4finput"
                              id="userName"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Please enter a name",
                                },
                                minLength: { value: 2 },
                                maxLength: { value: 30 },
                              }}
                              onChange={(e) => setGuiMsg("")}
                            />
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <img src={lock} height="13" alt="lock" />
                                <span className="t4f_label"> Email ID*</span>
                              </span>
                            </div>
                            <AvField
                              name="email"
                              //value={this.state.username}
                              type="text"
                              className="t4finput"
                              id="email"
                              validate={{ email: true, required: true }}
                              errorMessage="Please enter valid Email id"
                              onChange={(e) => setGuiMsg("")}
                            //placeholder="Enter username"
                            />
                          </FormGroup>

                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <img src={call} height="13" alt="call" />
                                <span className="t4f_label"> Merchant Phone Number*</span>
                              </span>
                            </div>
                            <AvField
                              name="phoneNumber"
                              //value={this.state.username}
                              type="number"
                              className="t4finput"
                              id="phoneNumber"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Please enter valid 10 digit contact number",
                                },
                                number: true,
                                maxLength: {
                                  value: 10,
                                  errorMessage: "Please enter valid 10 digit contact number",
                                },
                                minLength: {
                                  value: 10,
                                  errorMessage: "Please enter valid 10 digit contact number",
                                },
                              }}
                              errorMessage="Please enter valid 10 digit contact number"
                              //placeholder="Enter username"
                              onChange={(e) => setGuiMsg("")}
                            />
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <img src={call} height="13" alt="call" />
                                <span className="t4f_label"> Contact Number</span>
                              </span>
                            </div>
                            <AvField
                              name="contactnumnber"
                              type="number"
                              className="t4finput"
                              id="contactnumnber"
                              validate={{
                                number: true,
                                maxLength: { value: 10 },
                              }}
                              errorMessage="Please enter valid 10 digit contact number"
                              onChange={(e) => setGuiMsg("")}
                            />
                          </FormGroup>

                          {/* <FormGroup className="mb-2">
                            <div className="mb-2">
                              <span>
                                <img src={lock} height="13" alt="lock" />
                                <span className="t4f_label"> Password*</span>
                              </span>
                            </div>
                            <AvField
                              name="password"
                              //value={this.state.username}
                              type="password"
                              className="t4finput"
                              id="password"
                              validate={{
                                required: true,
                                pattern: {
                                  value: "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$",
                                  errorMessage: "Your password must be minimum 6 characters with atlease 1 special character",
                                },
                              }}
                              onChange={(e) => (setPassword(e.target.value), setGuiMsg(""))}
                              //placeholder="Enter username"
                            />
                          </FormGroup> */}

                          <div className="mt-4 text-center">
                            <button color="primary" className="t4fbutton w-100 waves-effect waves-light" type="submit">
                              {!isLoaded ? "Submit" : "Please Wait..."}
                              {/* {!isLoaded ? t("submit") : <Loading />} */}
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin_Merchants;

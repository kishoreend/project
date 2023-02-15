import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import Alert from "../../../components/Common/Alert";
import ViewMerchantProfile from "../Merchant/Components/ViewProfile";
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
import { callApi, getData, postData, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";

const Admin_Merchants = () => {
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
  //const [filterData, setFilterData] = useState("");

  const [merchantGrid, setMerchantGrid] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(false);
  const allMerchants = useSelector((state) => state.admin);
  const [dataRefreshFlag, setDataRefreshFlag] = useState(0);
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const postMerchantDetails = async (merchatData) => {
    dispatch({ type: adminActionTypes.ADMIN_CREATE_MERCHANT_INIT });
    setIsLoaded((isLoaded) => !isLoaded);

    console.log(merchatData);
    let result = await reduxPostData(
      "/api/admin/create-merchant",
      merchatData,
      "admin"
    )
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: adminActionTypes.ADMIN_CREATE_MERCHANT,
            payload: response.data.data,
          });
          setGuiMsg("Merchant is Successfully Created");
          setType("success");
          console.log(response);
          setIsLoaded((isLoaded) => !isLoaded);
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

  const updateFoodStallStatus = async (fsId, uniqueNumber, status) => {

    console.log('updateFoodStallStatus', fsId, uniqueNumber, status)
    const updateStatusApiResponse = await callApi('/api/admin/update-foodstall-status?foodStallId=' + fsId + '&merchantUniqueId=' + uniqueNumber + '&status=' + status, 'PUT');

    setDataRefreshFlag(dataRefreshFlag + 3);
  }

  const statusupdate_MerchantDetails =
    (fsId, uniqueNumber, status) => async (dispatch) => {
      setIsLoaded((isLoaded) => !isLoaded);
      dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_INIT });
      let url =
        "/api/admin/update-merchant-status?merchantUniqueId=" +
        uniqueNumber +
        "&status=" +
        status;
      const result = await reduxGetData(url, "put", "admin")
        .then((response) => {
          console.log(response);
          if (response.status === 200 || response.data?.status === "success") {
            dispatch({
              type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_SUCCESS,
              payload: response.data.data,
            });
            setIsLoaded((isLoaded) => !isLoaded);
            setGuiMsg(
              "Merchant(" +
              uniqueNumber +
              ") Status is sucessfully updated to - " +
              status
            );
            setType("success");
            console.log("activated/inactive", response);
            dispatch(fetchMerchantDetails());
          } else {
            dispatch({
              type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED,
              payload: response.data.data,
            });
            setIsLoaded((isLoaded) => !isLoaded);
            setGuiMsg(response.data.data);
            setType("danger");
          }
        })
        .catch((err) => {
          console.log("failure", err);
          let validationMessage = "";
          validationMessage =
            err.response?.data?.data ||
            "Something went wrong, Please try again later";
          dispatch({
            type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED,
            payload: validationMessage,
          });
          setIsLoaded((isLoaded) => !isLoaded);
          setGuiMsg(validationMessage);
          setType("danger");
        });
    };
  const statusDelete_MerchantDetails =
    (uniqueNumber, status) => async (dispatch) => {
      setIsLoaded((isLoaded) => !isLoaded);
      dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_INIT });
      let url =
        "/api/admin/update-merchant-status?merchantUniqueId=" +
        uniqueNumber +
        "&status=" +
        status;
      const result = await reduxGetData(url, "put", "admin")
        .then((response) => {
          console.log(response);
          if (response.status === 200 || response.data?.status === "success") {
            dispatch({
              type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_SUCCESS,
              payload: response.data.data,
            });
            setIsLoaded((isLoaded) => !isLoaded);
            setGuiMsg("Merchant(" + uniqueNumber + ") is sucessfully Deleted");
            setType("success");
            dispatch(fetchMerchantDetails());
            console.log(response);
          } else {
            dispatch({
              type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED,
              payload: response.data.data,
            });
            setIsLoaded((isLoaded) => !isLoaded);
            setGuiMsg(response.data.data);
            setType("danger");
          }
        })
        .catch((err) => {
          console.log("failure", err);
          let validationMessage = "";
          validationMessage =
            err.response?.data?.data ||
            "Something went wrong, Please try again later";
          dispatch({
            type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_FAILED,
            payload: validationMessage,
          });
          setIsLoaded((isLoaded) => !isLoaded);
          setGuiMsg(validationMessage);
          setType("danger");
        });
    };
  const fetchMerchantDetails = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    dispatch({ type: adminActionTypes.ADMIN_CHECK_FETCH_MERCHANT });
    const response = await reduxGetData(
      "/api/admin/fetch-merchants",
      "get",
      "admin"
    )
      .then((response) => {
        console.log("fetchMerchantDetails", response);
        if (response.status === 200) {
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT,
            payload: response.data.data,
          });
          setData(response.data.data);
          setFilteredData(response.data.data);
          console.log(response);
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
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
            payload: err.response,
          });
        } else {
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
            payload: err.response.data.error,
          });
        }
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };
  const viewProfile = () => {
    setViewProfile((viewprofile) => !viewprofile);
  };

  useEffect(() => {

    console.log('PP_TEST')
    console.log(allMerchants.merchants);

    dispatch(fetchMerchantDetails());


    //setMerchantGrid(merchantGrid.filter((mer) => mer.uniqueNumber != null));
  }, [dataRefreshFlag]);

  const getMerchantbyAdmin = (uno) => {

    console.log('PP_TEST', uno)
    if (uno) {
      dispatch(getMerchantDetails(uno));
    }

  };
  const getMerchantDetails = (uno) => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMsg = "";
    console.log("Enter Redux Merchant data in admin", uno);
    dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_INIT });
    const response = await reduxGetData(
      `/api/merchant/get-merchant-details?uniqueNumber=${uno}`,
      "get",
      "merchant"
    )
      .then((response) => {
        console.log('Merchants_Response', response);
        if (response.status === 200) {
          console.log("get merchant in admin", response.data.data);
          dispatch({
            type: merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS,
            payload: response.data?.data,
          });
        } else {
          dispatch({
            type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED,
            payload: response.data.error,
          });
        }
      })
      .catch((err) => {
        console.log("failure", err);
        validationMsg =
          err.response?.data?.error ||
          "Something went wrong, Please try again later";
        dispatch({
          type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED,
          payload: validationMsg,
        });
      });
    viewProfile();
    setIsLoaded((isLoaded) => !isLoaded);
  };

  const GetFilterdata = (filterdata) => {
    console.log("filterdata", filterdata);
  };
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
        label: t("subscription-details"),
        field: "subscription",
        sort: "disabled",
        width: 150,
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
      data &&
      data.sort((a, b) => a.merchantId < b.merchantId) &&
      data.map((obj) => ({
        // 'handle':<MDBBtn className="btn-sm orange darken-3 white-text" >
        //  <MDBIcon icon="angle-double-right" /></MDBBtn>,
        uno: (
          <span className="title_color">
            <Link
              className="tf4_linklabel d-none"
              to={{
                pathname: config.adminurl.AdminMerchants_FoodStall,
                uniqueNumber: obj.merchantId,
              }}
            >
              {obj.merchantId}
            </Link>
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
          <>

            <button
              className={
                obj.status?.toUpperCase() === "ACTIVE" || obj.status === "نشط"
                  ? "status-active"
                  : obj.status === "Deleted"
                    ? "status-deleted"
                    : "status-inactive"
              }
              onClick={(e) =>

                updateFoodStallStatus(
                  obj.foodStallId,
                  obj.merchantId,
                  obj.status?.toUpperCase() === "DELETED"
                    ? "DELETED"
                    : obj.status?.toUpperCase() === "ACTIVE"
                      ? "Inactive"
                      : "Active"
                )

              }
            >
              {obj.status === null || obj.status === "INACTIVE"
                ? "Inactive"
                : obj.status === "ACTIVE"
                  ? "Active"
                  : obj.status}
            </button>
          </>
        ),
        action: (
          <>
            <button className="t4fbutton-gray" to="#">
              <img
                src={deleteicon}
                alt="delete"
                height="15"
                onClick={(e) =>

                  updateFoodStallStatus(obj.foodStallId, obj.merchantId, "DELETED")

                }
              />{" "}
            </button>
            <button
              className="t4fbutton-gray d-none"
              onClick={(e) => (
                setGuiMsg(""), getMerchantbyAdmin(obj.merchantId)
              )}
            >
              <img src={eye} alt="edit" height="15" />{" "}
            </button>
            <Link
              className="t4fbutton-gray"
              to={{
                pathname: config.adminurl.AdminMerchants_FoodStall,
                uniqueNumber: obj.merchantId,
              }}
            >
              <img src={eye} alt="edit" height="15" />{" "}
            </Link>
          </>
        ),
      })),
  };

  //const [contries, setCountries] = useState([]);

  // const MerchantSearchbar = () => {
   const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [buList, setBuList] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [buName, setBuName] = useState("");

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedBuType, setSelectedBuType] = useState('');

  const [selectedBuList, setSelectedBuList] = useState([]);

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
    setData(filterData);
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
    setData(filterData);
    setStateName(stateName)
  };

  const getBusinessUnits = async (cityName, type) => {
    const buResponse = await postData(
      "/api/admin/get-business-unit",
      {
        city: cityName,
        type: type
      },
      "admin",
      "POST"
    );

    setBuList([...buList, ...buResponse.data.data]);
  };

  useEffect(() => {

    filterByField();
  }, [countryName, stateName, buName, cityName])

  const filterByField = () => {

    let filterDataByField = data.filter(columns => {
      return columns.buType?.toLowerCase().includes(buName.toLowerCase())
        && columns.country?.toLowerCase().includes(countryName.toLowerCase())
        && columns.city?.toLowerCase().includes(cityName.toLowerCase())
        && columns.state?.toLowerCase().includes(stateName.toLowerCase())
    })
    console.log("filterDataByField", filterDataByField);
    setData(filterDataByField);
  }

  const selectCountry = (e, country) => {

    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedCountry(country);

      getStatesList(country.countryCode);
    } else {
      setSelectedCountry({});
    }

  }

  const selectState = (e, state) => {

    console.log(e.target.checked);
    if (e.target.checked) {

      var index = selectedStates.indexOf(state.name);
      if (index === -1) {
        setSelectedStates([...selectedStates, state.name]);
        getCityList(state.name);
      }

    } else {

      console.log('selectedStates', selectedStates, state.name);
      var index = selectedStates.indexOf(state.name);
      console.log('index', index);
      if (index > -1) {
        selectedStates.splice(index, 1);
        setCities([]);
        selectedStates.map(st => {
          getCityList(st);
        })
      }
    }
  }

  const selectCity = (e, city) => {

    console.log(e.target.checked);
    if (e.target.checked) {

      var index = selectedCity.indexOf(city.name);
      if (index === -1) {
        setSelectedCity([...selectedCity, city.name]);
      }
    } else {
      var index = selectedCity.indexOf(city.name);
      if (index > -1) {
        selectedCity.splice(index, 1);
      }
    }
  }

  const selectBuType = (e, bu) => {

    console.log(bu);
    if (e.target.checked) {
      setSelectedBuType(bu.value);
      setBuList([]);
      selectedCity.map(city => {
        getBusinessUnits(city, bu.key);
      })

    }
  }

  const selectBu = (e, bu) => {

    console.log(e.target.checked);
    if (e.target.checked) {

      var index = selectedBuList.indexOf(bu.businessUnitId);
      if (index === -1) {
        setSelectedBuList([...selectedBuList, bu.businessUnitId]);
        console.log(allMerchants.merchants)
      }
    } else {
      var index = selectedBuList.indexOf(bu.businessUnitId);
      if (index > -1) {
        selectedBuList.splice(index, 1);
      }
    }
  }

  const search = () => {
    console.log('Data', data);
    // data.filter(stall => )
  }


  useEffect(() => {
    getCountriesList();
  }, [])

  const clearFilters = () => {
    setCountryCode("");
    setBuName("");
    setStates([]);
    setCities([]);
    setData(filterData);
  }


  // const countries = ["India", "Dubai", "Singapore", "Qator"];
  // const states = [
  //   "Andra Pradesh",
  //   "Telengana",
  //   "Karnataka",
  //   "Tamilnadu",
  //   "Kerala",
  // ];
  // const cities = ["Hyderabad", "Vijayawada", "Guntur", "Nellore"];
  const types = [{
    key: 'THEATRE',
    value: 'Theatres'
  },
  {
    key: 'SHOPPING_MALL',
    value: 'Shopping Malls'
  },
  {
    key: 'RESTAURANT',
    value: 'Restaurants'
  }]
  const sms = ["Central", "Sarat City Mall", "GVK One"];
  const fcs = ["Sizzling Joe", "Burger King", "Dil Punjabi"];

  // return (

  //   );
  // };

  return (
    <div>
      <SideNavBar id={3} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header
          title={t("merchants")}
          role={"admin"}
          viewmerchant={viewprofile}
        />
        <div className="px-2">
          <div className="p-2 bg-white mb-2 d-flex align-items-center">
            <div>
              <img src={searchmerchant_admin} alt=".." height="15" />{" "}
            </div>
            <div className="flex-grow-1">
              {/* <MerchantSearchbar /> */}
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
                      setData(filterData);
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
                      setData(filterData);
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
            {/* <div className="flex-grow-1 px-1">
              <input
                className="t4finput_bottomborder"
                placeholder={t("select-food-stall")}
                value={filterData}
                onClick={(e) => (setMenu((menu) => !menu), setGuiMsg(""))}
                type="text"
              />
            </div> */}
            <div className="px-1 ">
              <button className="t4fbutton-dgreen"
                style={{ margin: "10px" }} onClick={() => clearFilters()}>Clear Filters</button>

              <button
                className="t4fbutton-dgreen"
                data-toggle="modal"
                data-target="#admin-mechant-modal"
                onClick={(e) => setGuiMsg("")}
              >
                <img src={add} alt="edit" height="13" /> {t("add-merchant")}
              </button>
            </div>
          </div>
          <div
          // className={
          //   menu
          //     ? "bg-white mt-1 w-75 position-absolute shadow zindex-10"
          //     : "d-none"
          // }
          >

          </div>
          <div>
            {!isLoaded ? (
              <Alert message={guiMsg} type={type} />
            ) : (
              <Alert message="Please wait...." type="info" />
            )}
          </div>

          <div className={viewprofile ? "bg-white mt-1 shadow" : "d-none"}>
            <ViewMerchantProfile toggle={viewProfile} role="admin" />
          </div>

          <div
            className={
              !viewprofile
                ? "table-border bg-white tab-content admin-merchants p-2"
                : "d-none"
            }
          >
            <MDBDataTableV5
              hover
              disableRetreatAfterSorting={true}
              entriesOptions={[10]}
              entries={10}
              pagesAmount={4}
              data={datatable}
              pagingTop={false}
              searchTop
              searchBottom={false}
              barReverse
            />
          </div>

          <div
            className="modal fade fadepop"
            id="admin-mechant-modal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6
                    className="text-color-dgreen "
                    id="exampleModalCenterTitle"
                  >
                    Sign up
                  </h6>
                  {!isLoaded ? (
                    <Alert message={guiMsg} type={type} />
                  ) : (
                    <Alert message="Please wait...." type="info" />
                  )}
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
                        <AvForm
                          id="addMerchantForm"
                          className="form-horizontal"
                          onSubmit={handleSubmit}
                        >
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
                                <span className="t4f_label">
                                  {" "}
                                  Merchant Phone Number*
                                </span>
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
                                  errorMessage:
                                    "Please enter valid 10 digit contact number",
                                },
                                number: true,
                                maxLength: {
                                  value: 10,
                                  errorMessage:
                                    "Please enter valid 10 digit contact number",
                                },
                                minLength: {
                                  value: 10,
                                  errorMessage:
                                    "Please enter valid 10 digit contact number",
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
                                <span className="t4f_label">
                                  {" "}
                                  Contact Number
                                </span>
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
                            <button
                              color="primary"
                              className="t4fbutton w-100 waves-effect waves-light"
                              type="submit"
                            >
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

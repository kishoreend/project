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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "../../../assets/styles/t4fstyle.scss";
import deleteicon from "../../../assets/icons/delete.png";
import downarrow from "../../../assets/icons/downarrow.png";
import eye from "../../../assets/icons/eye.png";
import add from "../../../assets/icons/add.png";
import searchmerchant_admin from "../../../assets/icons/searchmerchant_admin.png";
import close from "../../../assets/icons/close.png";
import lock from "../../../assets/icons/lock.png";
import user from "../../../assets/icons/user.png";
import call from "../../../assets/icons/call.png";
import { reduxGetData, reduxPostData } from "../../../ServiceCall";
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
  const [filterData, setFilterData] = useState("");

  const [merchantGrid, setMerchantGrid] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(false);
  const allMerchants = useSelector((state) => state.admin);
  const [drpmenu, setDrpMenu] = useState(false);

  const toggle = (props) => {
    setDrpMenu(!drpmenu);
  };
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
    setIsLoaded((isLoaded) => !isLoaded);
    if (1 === 1) {
      return;
    }
    dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_INIT });
    let url = "/api/admin/update-foodstall-status?foodStallId=" + fsId + "&merchantUniqueId=" + uniqueNumber + "&status=" + status;
    const result = await reduxGetData(url, "put", "admin")
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.data?.status === "success") {
          dispatch({ type: adminActionTypes.ADMIN_MERCHANT_STATUS_UPDATE_SUCCESS, payload: response.data.data });
          setIsLoaded((isLoaded) => !isLoaded);
          setGuiMsg("Food Stall (" + fsId + ") Status is sucessfully updated to - " + status);
          setType("success");
          console.log("statusupdate_Foodstall", response);
          dispatch(fetchMerchantDetails());
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
        setIsLoaded((isLoaded) => !isLoaded);
        setGuiMsg(validationMessage);
        setType("danger");
      });
  };

  const fetchMerchantDetails = () => async (dispatch) => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    dispatch({ type: adminActionTypes.ADMIN_CHECK_FETCH_MERCHANT });
    const response = await reduxGetData("/api/admin/fetch-merchant-requests", "get", "admin")
      .then((response) => {
        console.log("fetch-merchant-requests", response);
        if (response.status === 200) {
          dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT, payload: response.data.data });
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
          dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL, payload: err.response });
        } else {
          dispatch({
            type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
            payload: err.response.data.error,
          });
        }
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };

  useEffect(() => {
    console.log(allMerchants.merchants);
    if (allMerchants.merchants === undefined || allMerchants.merchants.length === 0) {
      dispatch(fetchMerchantDetails());
    }

    //setMerchantGrid(merchantGrid.filter((mer) => mer.uniqueNumber != null));
  }, []);

  const searchmerchant = (value, e, index) => {
    console.log("setFilterData", value);

    [index][e.target.name] = e.target.checked;
    setFilterData(filterData + value + " >> ");
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
      allMerchants &&
      allMerchants.merchants &&
      allMerchants.merchants.sort((a, b) => a.merchantId < b.merchantId) &&
      allMerchants.merchants.map((obj, index) => ({
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
          <>
            <button className={obj.status?.toUpperCase() === "OPEN" || obj.status?.toUpperCase() === "NEW" ? "status-open" : obj.status === "In Progress" ? "status-inprogress" : obj.status === "Rejected" ? "status-inactive" : obj.status === "Approved" ? "status-active" : "status-inactive"} onClick={(e) => dispatch(statusupdate_Foodstall(""))}>
              {obj.status}
            </button>
            <div className="d-none">
              <Dropdown id={index + "drpdeliverstatus"} isOpen={drpmenu} toggle={toggle} className={"d-sm-inline-block text-small " + obj.status?.toUpperCase() === "OPEN" || obj.status?.toUpperCase() === "DELIVERED" ? "status-open" : obj.status === "CANCELLED" ? "status-inactive" : obj.status === "Approved" ? "status-active" : "status-inactive"}>
                <DropdownToggle tag="button" className="btn header-item ">
                  {obj.status} <img className="" src={downarrow} alt="downarrow" height="5" />
                </DropdownToggle>

                <DropdownMenu bottom>
                  <DropdownItem href="" className="notify-item py-2 bottomborder">
                    <span className="align-middle text-small">Open</span>
                  </DropdownItem>

                  <DropdownItem href="" className="notify-item py-2">
                    <span className="align-middle text-small">Delivered</span>
                  </DropdownItem>
                  <DropdownItem href="" className="notify-item py-2">
                    <span className="align-middle text-small">Cancelled</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        ),
        action: (
          <>
            <button className="t4fbutton-gray px-2 border" onClick={(e) => (dispatch(statusupdate_Foodstall(obj.foodStallId, obj.merchantId, obj.status?.toUpperCase() === "NEW" ? "In Progress" : obj.status?.toUpperCase() === "OPEN" ? "In Progress" : "")), setGuiMsg(""))}>
              View
            </button>
          </>
        ),
      })),
  };

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
      <SideNavBar id={4} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("order_history")} role={"admin"} />
        <div className="px-2">
          <div className="p-2 bg-white mb-2 d-flex align-items-center">
            <div>
              <img src={searchmerchant_admin} alt=".." height="15" />{" "}
            </div>
            <div className="flex-grow-1 px-1">
              <input className="t4finput_bottomborder" placeholder={t("select-food-stall")} value={filterData} onClick={(e) => (setMenu((menu) => !menu), setGuiMsg(""))} type="text" />
            </div>
          </div>
          <div className={menu ? "bg-white mt-1 w-75 position-absolute shadow zindex-10" : "d-none"}>
            <MerchantSearchbar />
          </div>
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>

          <div className={!viewprofile ? "table-border bg-white tab-content admin-merchants p-2" : "d-none"}>
            <div className="position-realtive">
              <div className="d-flex justify-content-end">
                <button className="t4fbutton-gray-sm" type="button">
                  Export to Excel
                </button>
              </div>
            </div>
            <MDBDataTableV5 hover disableRetreatAfterSorting={true} entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
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

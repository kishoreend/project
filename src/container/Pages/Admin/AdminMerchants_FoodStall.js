import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import View_Menu from "../Merchant/Components/FoodMenu/View_Menu";
import ViewOffers from "../Merchant/Components/FoodMenu/ViewOffers";
import AddCreateMenu from "../Merchant/Components/FoodMenu/AddCreateMenu";
import Pricing from "../Merchant/Components/FoodMenu/Pricing";
import OrderHistory from "../Merchant/Components/Orders/OrderHistory";
import Subscription from "../Merchant/Components/Orders/Subscriptions";
import "../../../assets/styles/t4fstyle.scss";
import delete_white from "../../../assets/icons/delete-white.png";
import foodstallpic from "../../../assets/icons/foodstall.jpg";
import { callApi, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
import CreateUpdateProfile from "../Merchant/Components/CreateUpdateProfile";
import { Modal } from "react-bootstrap";

const AdminMerchants_FoodStall = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location, props)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [merchantGrid, setMerchantGrid] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(true);
  const selectedUniqueNumber = useSelector((state) => state.admin.uniqueNumber);
  const [selectedFoodstallDtl, setSelectedFoostall] = useState({});

  const { id, city, state, country, location1, deliveryTime, buType, buName,
    foodStallPics,
    foodCourtName, foodStallName, merchantId, foodStallId,
    foodStallLicenseNumber, gstNumber, status }
    = selectedFoodstallDtl;
  
  console.log('BU Type', buType);

  const [profilePic, setProfilePic] = useState('https://trydemoo.com/tap4food/images/defaultStallPics/defaultFoodStall.png')

  const [showDetailsFlag, setShowDetailsFlag] = useState(false);

  const closeDetailsModal = () => {
    setShowDetailsFlag(false);
  }

  const [foodstallTimings, setFoodStallTimings] = useState([]);

  const getFoodStallTimings = async (fsId) => {
    await callApi(`/api/foodstall/${fsId}/get-foodstall-timings`, "GET")
      .then(timingsResponse => {
        setFoodStallTimings(timingsResponse.data.data.days)
      });

    console.log('FoodStall Timings, ', foodstallTimings);
  }

  const updateFoodstallTimings = (timings) => {
    setFoodStallTimings(timings);
  }

  const TabContent = () => {
    return (
      <div>
        <div className="food-menu-tabs">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={location?.fromAddFoodItem === true ? "nav-link" : "nav-link active"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-viewmenu" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                View Menu
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                View Offers
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#orderHistory" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                Order History
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={location?.fromAddFoodItem === true ? "nav-link active" : "nav-link"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                Add/Create Menu
              </button>
            </li>{" "}
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pricing" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                Pricing
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#subscription" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                Subscription
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#feedback" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                Feedback
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div className={location?.fromAddFoodItem === true ? "tab-pane fade" : "tab-pane fade active show"} id="pills-viewmenu" role="tabpanel" aria-labelledby="pills-home-tab">
            {/* <View_Menu /> */}
            <View_Menu />
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <ViewOffers></ViewOffers>
          </div>
          <div className={location?.fromAddFoodItem === true ? "tab-pane fade active show" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <AddCreateMenu fromAddFoodItem={location?.fromAddFoodItem === true ? true : false} role="admin"></AddCreateMenu>
          </div>
          <div className="tab-pane fade" id="pricing" role="tabpanel" aria-labelledby="pills-contact-tab">
            <Pricing></Pricing>
          </div>
          <div className="tab-pane fade" id="subscription" role="tabpanel" aria-labelledby="pills-contact-tab">
            <Subscription></Subscription>
          </div>
          <div className="tab-pane fade" id="orderHistory" role="tabpanel" aria-labelledby="pills-contact-tab">
            <OrderHistory></OrderHistory>
          </div>
        </div>
      </div>
    );
  };
  const viewProfile = () => {
    setViewProfile((viewprofile) => !viewprofile);
  };
  useEffect(() => {
    console.log("admin foodtstall start");
    console.log("location unique number", location?.uniqueNumber);
    dispatch({ type: adminActionTypes.ADMIN_SELECTED_MERCHANT, payload: location?.uniqueNumber });
    let _uniqueNo = location?.uniqueNumber === undefined ? selectedUniqueNumber : location?.uniqueNumber;
    console.log('_uniqueNo', _uniqueNo);
    dispatch(getMerchantDetails(_uniqueNo));
    //setMerchantGrid(merchantGrid.filter((mer) => mer.uniqueNumber != null));

    if (foodStallPics && foodStallPics.length > 0) {
      setProfilePic(foodStallPics[0]);
    }

    if (foodStallId) {
      getFoodStallTimings(foodStallId);
    }
  }, []);

  const getMerchantDetails = (uno) => async (dispatch) => {

    setIsLoaded((isLoaded) => !isLoaded);
    let validationMsg = "";
    console.log("Enter Redux Merchant data in admin", uno);
    dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_INIT });

    const response = await reduxGetData(`/api/merchant/get-merchant-details?uniqueNumber=${uno}`, "get", "merchant")
      .then((response) => {

        console.log(response);
        if (response.status === 200) {
          console.log("get merchant in admin", response.data.data);
          dispatch({ type: merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS, payload: response.data?.data });

          setSelectedFoostall(response.data.data.foodStalls.length > 0 ? response.data.data.foodStalls[0] : []);
          if(response.data.data.foodStalls.length > 0){
            setSelectedFoostall(response.data.data.foodStalls[0]);
            getFoodStallTimings(response.data.data.foodStalls[0].foodStallId);
            setProfilePic(response.data.data.foodStalls[0].foodStallPics.length > 0 ? response.data.data.foodStalls[0].foodStallPics[0] : 'NO_PIC');
          }else{
            setSelectedFoostall([]);
          }
          
        } else {
          dispatch({ type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED, payload: response.data.error });
        }
      })
      .catch((err) => {
        console.log("failure", err);
        validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
        dispatch({ type: merchantActionTypes.GET_MERCHAT_DETAILS_FAILED, payload: validationMsg });
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };

  const updateFoodStallStatus = async (fsId, uniqueNumber, status) => {

    console.log('updateFoodStallStatus', fsId, uniqueNumber, status)
    const updateStatusApiResponse = await callApi('/api/admin/update-foodstall-status?foodStallId=' + fsId + '&merchantUniqueId=' + uniqueNumber + '&status=' + status, 'PUT');

    if (updateStatusApiResponse.status == 200) {
      
      setSelectedFoostall({
        ...selectedFoodstallDtl, status: updateStatusApiResponse.data.data.status
      })
    }

    //setDataRefreshFlag(dataRefreshFlag + 3);
  }
  return (
    <div>
      <SideNavBar id={3} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("merchants")} role={"admin"} viewmerchant={viewprofile} />
        <div className="px-2">
          <div className="p-2 bg-white mb-2 d-flex justify-content-between align-items-center">
            <div>
              {
                profilePic === 'NO_PIC' ? (
                  <div style={{
                    height: '100px', width: '200px', backgroundColor: 'gray', textAlign: 'center', color: 'white', paddingTop: '40px', fontSize: '18px', fontWeight: 'bold'
                  }}>
                    {foodStallName}
                  </div>
                ) : <img src={profilePic} alt="edit" className="foodstallpic" />
              }
              
            </div>
            <div className="px-1 row">
              <table className="noborder">
                <tr>
                  <td>{buType}</td>
                  <td className="teal_text_bold">{buName}</td>
                </tr>
                <tr>
                  <td>Food Court</td>
                  <td className="teal_text_bold">{foodCourtName}</td>
                </tr>
                <tr>
                  <td>Food Stall ID</td>
                  <td className="teal_text_bold">{foodStallId}</td>
                </tr>
                <tr>
                  <td>Food stall</td>
                  <td className="teal_text_bold">{foodStallName}</td>
                </tr>
              </table>{" "}
            </div>
            <div className="px-1 ">
              <table className="noborder">
                <tr>
                  <td>Time</td>
                  <td className="teal_text_bold">{deliveryTime}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td className="teal_text_bold">4.5</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td className="teal_text_bold">Open</td>
                </tr>
                <tr>
                  <button className="t4fbutton-dgreen" onClick={() => setShowDetailsFlag(true)}>More Details</button>
                </tr>
              </table>{" "}
              <Modal show={showDetailsFlag} onHide={closeDetailsModal} dialogClassName="modal-style"
                backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                  <Modal.Title>{foodStallName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateUpdateProfile edit={true} toggle={props.toggle} role={'admin'} closeDetailsModal={closeDetailsModal} foodstallTimings={foodstallTimings} updateFoodstallTimings={updateFoodstallTimings} />

                </Modal.Body>
                {/* <Modal.Footer>
                                          <Button variant="secondary" onClick={closeFoodItemEditModal}>
                                            Close
                                          </Button>
                                          <Button variant="primary" >
                                            Update
                                          </Button>
                                        </Modal.Footer> */}
              </Modal>
            </div>

            <div className="px-1 leftborder">
              <div className="p-1">
                <button
                  className={
                    status?.toUpperCase() === "ACTIVE" || status === "نشط"
                      ? "status-active"
                      : status?.toUpperCase() === "DELETED"
                        ? "status-deleted"
                        : "status-inactive"
                  }
                  onClick={(e) =>

                    updateFoodStallStatus(
                      foodStallId,
                      merchantId,
                      status?.toUpperCase() === "DELETED"
                        ? "DELETED"
                        : status?.toUpperCase() === "ACTIVE"
                          ? "Inactive"
                          : "Active"
                    )

                  }
                > {status === null || status === "INACTIVE"
                  ? "Inactive"
                  : status === "ACTIVE"
                    ? "Active"
                    : status}</button>{" "}
                <button className="t4fbutton-red-sm ">
                  {" "}
                  <img src={delete_white} alt="delete" height="14" onClick={(e) => updateFoodStallStatus(foodStallId, merchantId, "DELETED")} /> Delete
                </button>
              </div>
              <div className="p-1">
                <button className="t4fbutton-gray-sm">Grievance from Customers</button>
              </div>
              {/* <div className="p-1">
                <button className="t4fbutton-dgreen">Download Menu card</button>
              </div> */}
            </div>
          </div>

          <div className="bg-white  admin-merchants p-2">
            <TabContent />
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminMerchants_FoodStall;

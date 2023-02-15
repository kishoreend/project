import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import dial from "../../../../../assets/icons/dial.png";
import drag from "../../../../../assets/icons/drag.png";
// import search from "../../../../../assets/icons/search.png";
import scroll from "../../../../../assets/icons/scroll.png";
import redarrow from "../../../../../assets/icons/red-down-arrow.png";
import hide from "../../../../../assets/icons/hide.png";
import eye from "../../../../../assets/icons/eye.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import foodmenu from "../../../../../assets/icons/no-image.jpg";
import darkmenu from "../../../../../assets/icons/darkmenu.png";
import darkclose from "../../../../../assets/icons/darkclose.png";
import Alert from "../../../../../components/Common/Alert";

import config from "../../../../../container/app/navigation.json"
import { useSelector, useDispatch } from "react-redux";
import { callApi, postData, reduxGetData, reduxPostData } from "../../../../../ServiceCall";
/* eslint-disable no-console,func-names,react/no-multi-comp */
import ReactDOM from "react-dom";
import ReactDragListView from "react-drag-listview/lib/index.js";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import { Accordion, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Draggable from "react-draggable";
import EditFoodItem from "./EditFoodItem";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "react-notifications/dist/react-notifications.css";
import ReactTooltip from 'react-tooltip';

const View_Menu = (props) => {

  const history = useHistory();

  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  // const tempFoodMenu = useSelector((state) => state.merchant.tempFoodMenu);
  const [foodMenuContent, setFoodMenuContent] = useState([]);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [serviceData, setServiceData] = useState({});
  const [tempServData, settempServData] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [dragProps, setDragProps] = useState({});
  const [dragProps1, setDragProps1] = useState({});
  const [renderstate, setRenderstate] = useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [prevFoodStall, setPrevFoodStall] = useState("");

  const [deleteModalFlag, setDeleteModalFlag] = useState(false);
  const [deletingFoodItem, setDeletingFoodItem] = useState({});
  const [itemDeletedFlag, setItemDeletedFlag] = useState(false);
  const [itemUpdateFlag, setItemUpdateFlag] = useState(false);

  const [editFoodItem, setEditFoodItem] = useState({});
  const [itemEditFlag, setItemEditFlag] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [collapseStyle, setCollapseStyle] = useState("accordion-collapse collapse show");
  const {t} = useTranslation();

  const editModalStyles = {
    width: '90vw',
    maxWidth: '90vw'
  }

  const handleClick = () => {
    // Changing state
    setMenu(!menu);
  };

  const closeFoodItemDeleteModal = () => {
    setDeletingFoodItem({})
    setDeleteModalFlag(false);
  }

  const closeFoodItemEditModal = () => {
    NotificationManager.success('Food item details are saved', 'Success')  
    setEditFoodItem({})
    setItemEditFlag(false);
  }

  const openFoodItemDeleteModal = (foodItem) => {
    console.log('Deleting FoodItem', foodItem)
    setDeletingFoodItem(foodItem);
    setDeleteModalFlag(true);
  }

  const openFoodItemEditModal = (foodItem) => {
     
    console.log('Edit FoodItem', foodItem)
    setEditFoodItem(foodItem);
    setItemEditFlag(true);
  }

  const closeEditModal = () => {
    setEditFoodItem({});
    setItemEditFlag(false);
    window.location.reload(false);
  }

  const deleteFoodItem = async () => {
    console.log(deletingFoodItem, 'Deleting Food Item');

    const deletingFoodItemId = deletingFoodItem.foodItemId;

    console.log(deletingFoodItemId);

    const deleteFoodItemResponse = await callApi('/api/menu/delete-food-item?foodItemId=' + deletingFoodItemId, 'POST');

    console.log(deleteFoodItemResponse);

    if(deleteFoodItemResponse.status === 200){
      setItemDeletedFlag(true);
      setDeleteModalFlag(false)
    }

  }

  const changeFoodItemVisibility = (item, status) => {

     callApi(`/api/menu/change-food-item-visibility?foodItemId=${item.foodItemId}&status=${status}`, 'PUT')
     .then(res => {
       console.log(res);
       setItemUpdateFlag(true);
     })
  }

  const getFoodMenuDetails = async () => {
    let messageType = "";
    setItemUpdateFlag(false);
    if (foodstallid === undefined) {
      setServiceData({ id: "remove" });
      return;
    }
    setIsLoaded((isLoaded) => !isLoaded);
    // setIsLoaded((isLoaded) => !isLoaded);
    let validationMsg = "";
    // console.log("get-foodstall-timings");
    console.log("food menu drag", foodstallid);
    const response = await reduxGetData(`/api/menu/get-food-items?fs-id=${foodstallid}`, "get", "merchant")
      .then((response) => {
        console.log("get food menu", response);
        debugger
        if (response.status === 200) {
          const foodDatas = response.data.data || [];
          // return { ...response.data.data }
          settempServData(foodDatas);
          console.log(foodDatas, "service data to loop");
          let result = foodDatas.reduce(function (r, a) {
            let headerKey = a.category;

            if(a.category !== a.subCategory){
              headerKey = headerKey + ' - ' + a.subCategory
            }

            r[headerKey] = r[headerKey] || [];
            r[headerKey].push(a);
            return r;
          }, {});
          console.log("group by data", result);
          if (Object.keys(result).length === 0) {
            setServiceData({ id: "remove" });
            result = { id: "remove" };
            // dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
          } else {
            // dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
            setServiceData(result);
          }
          
        } else {
          setServiceData({ id: "remove" });
        }
      })
      .catch((err) => {
        //setAdd(false);
        console.log("failure", err?.response);
        validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
        messageType = "danger";
        setServiceData({ id: "remove" });
        // dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL, payload: validationMsg });
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMsg);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };
  const handleSearch = (value) => {
    console.log('Search Keyword', value);
    filterData(value);
  };
  const filterData = (value) => {
    let _filterFoodData = [];
    const lowercasedValue = value.toLowerCase().trim();
    console.log("empty vaue", lowercasedValue);
    if (lowercasedValue === "" || lowercasedValue === null) {
      console.log("emptyvalue", tempServData);
      // dispatch({ type: merchantActionTypes.FILTER_FOOD_ITEMS_MENU, payload: tempFoodMenu })
      let result = tempServData.reduce(function (r, a) {
        // const headerKey = a.category + ' - ' + a.subCategory;
        let headerKey = a.category;

        if(a.category !== a.subCategory){
          headerKey = headerKey + ' - ' + a.subCategory
        }
        r[headerKey] = r[headerKey] || [];
        r[headerKey].push(a);
        return r;
      }, {});
      console.log("group by data", result);
      if (Object.keys(result).length === 0) {
        setServiceData({ id: "remove" });
        // dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
      } else {
        // dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
        setServiceData(result);
      }
    } else {
      console.log("foodMenufilter", tempServData);
      const filteredData = tempServData.filter((item) => Object.keys(item).some((k) => item[k]?.toString().toLowerCase().includes(lowercasedValue)));
      if (filteredData.length > 0) {
        _filterFoodData = filteredData.reduce(function (r, a) {
          // const headerKey = a.category + ' - ' + a.subCategory;
          let headerKey = a.category;

          if(a.category !== a.subCategory){
            headerKey = headerKey + ' - ' + a.subCategory
          }
          r[headerKey] = r[headerKey] || [];
          r[headerKey].push(a);
          return r;
        }, {});
      } else {
        _filterFoodData = { id: "remove" };
      }
      setServiceData(_filterFoodData);
      console.log("filterdata", filteredData);
    }
  };
  useEffect(() => {
    console.log("before condition", serviceData);
    //  if (foodMenuContent.length === 0) {
    const _arr = [];
    const toggleMenuContent = Object.keys(serviceData).map((m, name) => {
      console.log("food menu key", serviceData, m);
      if (m !== "id" && serviceData[m] !== "remove") {
        _arr.push({ menu: m, count: serviceData[m].length });
      } else {
        _arr.push({ menu: "No Menu", count: "" });
      }
      console.log(_arr);
    });
    setFoodMenuContent(_arr);
    //  }
    if (Object.keys(serviceData).length === 0 || isFoodItemAdded || prevFoodStall !== foodstallid) {
      setPrevFoodStall(foodstallid);
      console.log(serviceData);
      getFoodMenuDetails();
      console.log("after effect", serviceData);
      // setToggle(!toggle);
      // setServiceData(foodMenu);
      // setShapedData(foodMenuItems)
    }
  }, [isFoodItemAdded]);

  useEffect(() => {
    console.log('Refreshing the menu..')
    getFoodMenuDetails();
  }, [itemDeletedFlag, itemUpdateFlag])

  return (
    <div className="p-3 position-relative">
      
      <div className="viewmenu">
        <div>{!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Loading Food Menu. Please wait...." type="info" />}</div>
        <div className="p-2 bg-white mb-2 d-flex align-items-center">
          <div>
            {/* <img src={search} alt="edit" height="15" />{" "} */}
          </div>
          <div className="flex-grow-1 px-1">
            <input className="t4finput_bottomborder" placeholder="Search in food menu" type="text" onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <div className="px-1 ">
            {/* <button className="t4fbutton-gray" data-toggle="modal" data-target="#admin-mechant-modal">
              <img src={scroll} alt="edit" height="13" /> Arange food Menu
            </button> */}
          </div>

          <div className="px-1 ">
            {/* <button className="t4fbutton-gray" data-toggle="modal" data-target="#admin-mechant-modal">
              Clone Menu
            </button> */}
          </div>
        </div>

        

        <div className="panel-group">
        
          {/* <div className="accordion-item"> */}
            {serviceData?.id !== "remove" ? (
              Object.keys(serviceData).map((key, index) => {
                
                return (
                  
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h2 className="panel-title">
                        {/* <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-controls={"collapse" + index}>
                          {key}
                        </button> */}
                        <a data-toggle="collapse" className="accordion-button" href={"#collapse" + index} style={{textDecoration: 'none'}}>{key}</a>
                      </h2>
                    </div>
                    
                    <div id={"collapse" + index} className="panel-collapse collapse">
                    <div className="accordion-body">
                      <ReactDragListView {...dragProps}>
                      {serviceData?.id !== "remove" &&
                        serviceData[key]?.map((foodItem) => {
                          return (
                            // <div className="accordion-body">
                            //   <ReactDragListView {...dragProps}>
                                <ul className>
                                  <li key={index} className="viewmenu_items">
                                    <div className="d-flex">
                                      <div>
                                        <a href="#" className="p-1">
                                          <img src={dial} height="10" />
                                        </a>
                                        <span className="position-relative">
                                          {foodItem.veg ? (
                                            <span className="Veg position-absolute">
                                              <div className="Vegdot"></div>
                                            </span>
                                          ) : (
                                            <span className="NonVeg position-absolute">
                                              <div className="NonVegdot"></div>
                                            </span>
                                          )}
                                          <a href="#">
                                            <img className="foodimage" src={foodItem.pic != null && foodItem.pic[foodItem.pic.length - 1].data != null ? `data:image/jpeg;base64,${foodItem.pic[foodItem.pic.length - 1].data}` : foodmenu} />
                                          </a>
                                        </span>
                                      </div>
                                      <div className="flex-grow-1 px-3">
                                        <div>
                                          <span>
                                            <b className="text-color-dgreen"> {foodItem.foodItemName}</b>
                                          </span>
                                        </div>
                                        <div className="d-flex">
                                          {/* <div>
                                            <ReactStars
                                              count={5}
                                              value={foodItem.rating}
                                              //onChange={ratingChanged}
                                              size={14}
                                              activeColor="#ffd700"
                                            ></ReactStars>
                                          </div> 
                                          <div className="px-1">(23)</div>
                                          */}
                                        </div>
                                        <div>₹ {foodItem.price}</div>
                                        <div>
                                          {
                                            foodItem.description.length > 125 ? (

                                              <>{foodItem.description.substring(0, 124)}
                                              
                                              <span title={foodItem.description} style={{
                                                cursor:'pointer', 
                                                textDecoration: 'underline',
                                                marginLeft: '20px'
                                              }}>...More</span>                      
                                              </>
                                              
                                              ) : foodItem.description
                                          }
                                          
                                        </div>
                                      </div>
                                      <div>
                                        <div>
                                          <button className="t4fbutton-gray" to="#" onClick={() => openFoodItemEditModal(foodItem)}>
                                            <img src={edit} alt="delete" height="15" />{" "}
                                          </button>{" "}
                                          <button className="t4fbutton-gray" to="#" onClick={() => openFoodItemDeleteModal(foodItem)}>
                                            <img src={deleteicon} alt="delete" height="15" />{" "}
                                          </button>
                                          {
                                              foodItem.status === 'INACTIVE' ? (
                                                <button className="t4fbutton-gray" style={{color: 'green', fontSize: '16px'}} to="#" onClick={() => changeFoodItemVisibility(foodItem, 'Active')}>
                                                  Show{" "}
                                                </button>
                                              ) : (
                                                <button className="t4fbutton-gray" style={{color: 'green', fontSize: '16px'}} to="#" onClick={() => changeFoodItemVisibility(foodItem, 'Inactive')}>
                                                  Hide{" "} 
                                                </button>
                                              )
                                          }
                                          
                                        </div>
                                        <div>
                                          {
                                            foodItem.hasCustomizations && ((
                                              <span className="text-red">Customizable</span>
                                            ))
                                          }
                                         
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </li>
                                </ul>
                             
                          );
                        })}
                         </ReactDragListView>
                         </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>
                <b>No Food item available.</b> Please visit Food Menu {"->"} Add / Create Menu{"->"} Create Food item.
              </p>
            )}
          </div>
        {/* </div> */}

        <div style={{
          marginTop: '10%'
        }}>

        </div>

        <Modal show={deleteModalFlag} onHide={closeFoodItemDeleteModal}>
                                        <Modal.Header closeButton>
                                          <Modal.Title>{deletingFoodItem.foodItemName}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Do you want to delete this foodItem ?</Modal.Body>
                                        <Modal.Footer>
                                          <Button variant="success"  style={{ width: '80px', color: 'white' }} onClick={closeFoodItemDeleteModal}>
                                            Close
                                          </Button>
                                          <Button variant="danger"  style={{ width: '80px', color: 'white' }} onClick={deleteFoodItem}>
                                            Delete
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>

                                      <Modal show={itemEditFlag} onHide={closeFoodItemEditModal} dialogClassName="modal-style" 
                                      backdrop="static" keyboard={false}>
                                        {/* <Modal.Header closeButton>
                                          <Modal.Title>{deletingFoodItem.foodItemName}</Modal.Title>
                                        </Modal.Header> */}
                                        <Modal.Body>
                                            <EditFoodItem foodItem={editFoodItem} setItemEditFlag={setItemEditFlag} closeEditModal={closeEditModal}/>
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

        <Draggable>
        <div className="floatingmenudiv position-absolute ">
          <div className={menu ? " floatingmenu shadow" : "d-none"}>
            {foodMenuContent.map((foodmenu) => (
              <div className="d-flex justify-content-between p-2 font-weight-bold">
                <div>{foodmenu?.menu}</div>
                <div>{foodmenu?.count}</div>
              </div>
            ))} 
          </div>
          
            <div className="p-2 d-flex justify-content-end">
              <img src={darkmenu} className={menu ? "d-none" : ""} href="" alt="edit" height="45" onClick={handleClick} />
              <img src={darkclose} className={menu ? "" : "d-none"} href="" alt="edit" height="45" onClick={handleClick} />
            </div>
          
        </div>
        </Draggable>
      </div>
    </div>
  );
};

export default View_Menu;

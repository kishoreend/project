import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import dial from "../../../../../assets/icons/dial.png";
import drag from "../../../../../assets/icons/drag.png";
import search from "../../../../../assets/icons/search_dark.png";
import scroll from "../../../../../assets/icons/scroll.png";
import redarrow from "../../../../../assets/icons/red-down-arrow.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import foodmenu from "../../../../../assets/icons/no-image.jpg";
import darkmenu from "../../../../../assets/icons/darkmenu.png";
import darkclose from "../../../../../assets/icons/darkclose.png";
import Alert from "../../../../../components/Common/Alert";

import { useSelector, useDispatch } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../../../ServiceCall";
/* eslint-disable no-console,func-names,react/no-multi-comp */
import ReactDOM from "react-dom";
import ReactDragListView from "react-drag-listview/lib/index.js";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";

const View_Menu = (props) => {
  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const foodMenu = useSelector((state) => state.merchant.foodMenu);
  const tempFoodMenu = useSelector((state) => state.merchant.tempFoodMenu);
  const [foodMenuContent, setFoodMenuContent] = useState([]);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [serviceData, setServiceData] = useState(foodMenu);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [dragProps, setDragProps] = useState({});
  const [dragProps1, setDragProps1] = useState({});
  const [renderstate, setRenderstate] = useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  // const _arr = [];
  // const toggleMenuContent = Object.keys(foodMenu).map((m, name) => {
  //   console.log('food menu key', m)
  //   _arr.push({ menu: m, count: foodMenu[m].length });
  //   console.log(_arr)
  // })
  // setFoodMenuContent(_arr);

  const handleClick = () => {
    // Changing state
    setMenu(!menu);
  };

  const getFoodMenuDetails = () => async (dispatch, getState) => {
    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    // setIsLoaded((isLoaded) => !isLoaded);
    let validationMsg = "";
    // console.log("get-foodstall-timings");
    console.log("food menu drag", foodstallid);
    const response = await reduxGetData(`/api/menu/get-food-items?fs-id=${foodstallid}`, "get", "merchant")
      .then((response) => {
        console.log("get food menu", response);
        if (response.status === 200) {
          const foodDatas = response.data.data || [];
          // return { ...response.data.data }
          console.log(foodDatas, "service data to loop");
          let result = foodDatas.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
          }, {});
          console.log("group by data", result);
          if (Object.keys(result).length === 0) {
            setServiceData([{ id: 0 }]);
            result = { id: "remove" };
            dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
          } else {
            dispatch({ type: merchantActionTypes.GET_FOOD_ITEMS_MENU, payload: { result, foodDatas } });
            setServiceData(result);
          }
          // setDragProps({
          //   onDragEnd(fromIndex, toIndex) {
          //     const datas = [...data];
          //     const item = datas.splice(fromIndex, 1)[0];
          //     datas.splice(toIndex, 0, item);
          //     setData(datas);
          //   },
          //   nodeSelector: "li",
          //   handleSelector: "a",
          // });

          // setDragProps1({
          //   onDragEnd(fromIndex, toIndex) {
          //     const datass = [...data1];
          //     const item1 = datass.splice(fromIndex, 1)[0];
          //     datass.splice(toIndex, 0, item1);
          //     setData1(datass)
          //   },
          //   nodeSelector: "li",
          //   handleSelector: "a",
          // });
        } else {
          // dispatch({
          //   type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL,
          //   payload: response.data.error,
          // });
        }
      })
      .catch((err) => {
        //setAdd(false);
        console.log("failure", err);
        validationMsg = err.response?.data?.error || "Something went wrong, Please try again later";
        messageType = "danger";
        // dispatch({ type: adminActionTypes.ADMIN_FETCH_MERCHANT_FAIL, payload: validationMsg });
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMsg);
    setType(messageType);
  };
  const handleSearch = (value) => {
    dispatch(filterData(value));
  };
  const filterData = (value) => async (dispatch) => {
    const lowercasedValue = value.toLowerCase().trim();
    console.log('empty vaue', lowercasedValue);
    if (lowercasedValue === "" || lowercasedValue === null) {
      console.log('emptyvalue', tempFoodMenu);
      dispatch({ type: merchantActionTypes.FILTER_FOOD_ITEMS_MENU, payload: tempFoodMenu })
    }
    else {
      console.log('foodMenufilter', lowercasedValue);
      const filteredData = tempFoodMenu.filter((item) =>
        // item.category.includes(lowercasedValue)
        // console.log('filterdataitem', item.category.toLowerCase().includes(lowercasedValue));
        // item.category.toLowerCase().includes(lowercasedValue)
        Object.keys(item).some(k => item[k]?.toString().toLowerCase().includes(lowercasedValue))
      );
      // const filteredData = Object.keys(foodMenu).filter((item) => (console.log('filterdataitem', item),
      //   item.toString().toLowerCase().includes(lowercasedValue)));
      dispatch({ type: merchantActionTypes.FILTER_FOOD_ITEMS_MENU, payload: filteredData })
      // setServiceData(filteredData);
      console.log("filterdata", filteredData);
    }
  };
  useEffect(() => {
    console.log("before condition", foodMenu);
    //  if (foodMenuContent.length === 0) {
    const _arr = [];
    const toggleMenuContent = Object.keys(foodMenu).map((m, name) => {
      console.log("food menu key", foodMenu, m);
      if (m !== "id" && foodMenu[m] !== "remove") {
        _arr.push({ menu: m, count: foodMenu[m].length });
      } else {
        _arr.push({ menu: "No Menu", count: "" });
      }
      console.log(_arr);
    });
    setFoodMenuContent(_arr);
    //  }
    if (Object.keys(foodMenu).length == 0) {
      console.log(foodMenu);
      dispatch(getFoodMenuDetails());
      console.log("after effect", foodMenu);
      console.log("after effect", serviceData);
      // setToggle(!toggle);
      // setServiceData(foodMenu);
      // setShapedData(foodMenuItems)
    }
  }, [foodstallid, foodMenu]);

  return (
    <div className="p-3 position-relative">
      <div className="viewmenu">
        <div>{!isLoaded ? <Alert className="w-auto" message={message} type={type} /> : <Alert className="w-100" message="Fetching Food Menu. Please wait...." type="info" />}</div>
        <div className="p-2 bg-white mb-2 d-flex align-items-center">
          <div>
            <img src={search} alt="edit" height="15" />{" "}
          </div>
          <div className="flex-grow-1 px-1">
            <input className="t4finput_bottomborder" placeholder="Search in food menu" type="text" onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <div className="px-1 ">
            <button className="t4fbutton-gray" data-toggle="modal" data-target="#admin-mechant-modal">
              <img src={scroll} alt="edit" height="13" /> Arange food Menu
            </button>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            {foodMenu?.id !== "remove" ? (
              Object.keys(foodMenu).map((key, index) => {
                return (
                  <div class="accordion-item">
                    <h2 class="accordion-header" id={"heading" + index}>
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                        {key}
                      </button>
                    </h2>
                    <div id={"collapse" + index} class="accordion-collapse collapse show" aria-labelledby={"heading" + index} data-bs-parent="#accordionExample">
                      {foodMenu?.id !== "remove" &&
                        foodMenu[key]?.map((foodItem) => {
                          return (
                            <div className="accordion-body">
                              <ReactDragListView {...dragProps}>
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
                                            <img className="foodimage" src={foodItem.pic != null && foodItem.pic[0].data != null ? `data:image/jpeg;base64,${foodItem.pic[0].data}` : foodmenu} className="foodimage" />
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
                                          <div>
                                            <ReactStars
                                              count={5}
                                              value={foodItem.rating}
                                              //onChange={ratingChanged}
                                              size={14}
                                              activeColor="#ffd700"
                                            ></ReactStars>
                                          </div>
                                          <div className="px-1">(23)</div>
                                        </div>
                                        <div>₹.200</div>
                                        <div>{foodItem.description}</div>
                                      </div>
                                      <div>
                                        <div>
                                          <button className="t4fbutton-gray" to="#">
                                            <img src={edit} alt="delete" height="15" />{" "}
                                          </button>{" "}
                                          <button className="t4fbutton-gray" to="#">
                                            <img src={deleteicon} alt="delete" height="15" />{" "}
                                          </button>
                                          <button className="t4fbutton-gray" to="#">
                                            <img src={hide} alt="delete" height="15" />{" "}
                                          </button>
                                        </div>
                                        <div>
                                          <span className="text-red">Customizable</span>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </ReactDragListView>{" "}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>
                <b>No Food item available.</b> Please visit Food Menu {'->'} Add / Create Menu{'->'} Create Food item.
              </p>
            )}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default View_Menu;

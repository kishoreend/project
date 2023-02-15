import React, { useEffect, useState } from "react";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Common/Loading";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { isVisible } from "dom-helpers";
import * as REDUX_ACTION from '../../../../store/customer/action';
import { Button } from "reactstrap";
import _ from 'lodash'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer_MenuDetails = (props) => {

  // console.log('props', props)

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [fooditemoption, setFooditemoption] = useState([]);
  const [fooditemComb, setFooditemComb] = useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [totalPrice, settotalPrice] = useState(props.fooditemprice);
  const [totalBasePrice, settotalBasePrice] = useState(0);
  const [tempCustItems, setTempCustItems] = useState([]);
  const [oldprice, setOldprice] = useState(0);
  const [priceVisible, setPriceVisible] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [addtocart_, setaddtocart_] = useState(0);
  const [selectedSingleValues, setSelectedSingleValues] = useState([]);
  const [selectedMultiValues, setSelectedMultiValues] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [topLevelKey, setTopLevelKey] = useState("");

  const [defaultCustItems, setDefaultCustItems] = useState([]);

  const [finalPrice, setFinalPrice] = useState(0);

  const [selectedCustItems, setSelectedCustItems] = useState([]);

  const stateData = useSelector(state => state.customer);

  const foodStallId = props.fsId;

  const dispatch = useDispatch();

  const addSelectedItemNames = () => {

  }

  const notifyCartSuccessMessage = () => toast.success('Item added to cart', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const addToDefaultCustItems = (order, item, price) => {

    const defaultCust = {
      order: order,
      item: item,
      price: price
    }

    setDefaultCustItems(defaultCust)
  }

  useEffect(() => {
    setSelectedCustItems([]);
    getFoodStalls();
  }, [success]);

  useEffect(() => {

    calculateTotalPrice()
  }, [selectedCustItems]);

  let value = "";

  const getFoodStalls = async () => {
    let validationMessage = "";
    let messageType = "";

    setIsLoaded((isLoaded) => !isLoaded);
    ////dispatch({ type: SIGN_UP_INIT });
    const response = await reduxGetData(`/api/customer/get-fooditem-combination-details?fooditem-id=${props.fooditemid}`, "get", "customer")
      .then((response) => {
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });

          setFooditemoption(response.data.data.options);
          setFooditemComb(response.data.data.combinationsMap);
          validationMessage = response.data.status;
          messageType = "success";

          setSuccess(true);
          let topItem;

          setTempCustItems(
            fooditemoption.map((item) => {
              let optItems = [];
              if (item.order === 1) {
                if (item.prices.length > 0) {
                  settotalPrice(item.prices[0].price);
                  setTopLevelKey(item.prices[0].pattern);

                  let tempselectedSingleValues = [
                    {
                      custName: item.key,
                      key: item.prices[0].pattern,
                      price: item.prices[0].price,
                    },
                  ];

                  setSelectedSingleValues(tempselectedSingleValues);

                  optItems = item.prices.map((optItem) => {
                    return {
                      name: optItem.pattern,
                      price: optItem.price,
                    };
                  });

                  defaultCustItems.push({ order: 1, itemKey: item.key, itemName: item.optionItems[0], price: item.prices[0].price })

                  setFinalPrice(finalPrice + item.prices[0].price);

                } else {
                  let tempselectedSingleValues = [
                    {
                      custName: item.key,
                      key: item.optionItems[0],
                      price: 0,
                    },
                  ];

                  setTopLevelKey(item.optionItems[0]);

                  setSelectedSingleValues(tempselectedSingleValues);

                  optItems = item.optionItems.map((optItem) => {
                    return {
                      name: optItem,
                      price: 0,
                    };
                  });

                  defaultCustItems.push({ order: 1, itemKey: item.key, itemName: item.optionItems[0], price: 0 })

                }

                selectedCustItems.push({
                  order: 1,
                  key: item.key,
                  item: item.optionItems[0]
                })

                topItem = item.optionItems[0];
              } else {

                if (props.isPizza && item.order === 2) {
                  defaultCustItems.push({ order: 2, itemKey: item.key, itemName: item.optionItems[0], price: item.prices[0].price })
                  setFinalPrice(finalPrice + item.prices[0].price);

                  selectedCustItems.push({
                    order: 2,
                    key: item.key,
                    item: item.optionItems[0]
                  })
                }

                optItems = item.optionItems.map((optItem, index1) => {
                  let patternPrice = 0;

                  item.prices.map((price, index2) => {
                    // console.log("price1234", price, price.pattern);
                    const tempKey = topItem + "~" + optItem;
                    if (tempKey === price.pattern) {
                      // if (tempKey === "Regular~Handmade" && index1 == 0 && index2 == 0)
                      // if (tempKey === "Regular~Handmade" && index1 == 0 && index2 == 0) {
                      //settotalPrice(totalPrice + price.price);
                      // }
                      // console.log('TempKey >>', tempKey, price);
                      patternPrice = price.price;
                      // console.log('PK > totalPrice', totalPrice, selectedSingleValues)
                      if (index2 === 0 && props.isPizza && item.order === 2) {
                        let tempselectedSingleValues = selectedSingleValues.map((val) => val);

                        tempselectedSingleValues.push({
                          custName: item.key,
                          key: tempKey,
                          price: patternPrice,
                        });

                        setSelectedSingleValues(tempselectedSingleValues);
                      }
                    }
                  });
                  // console.log('patternPrice', patternPrice)
                  return {
                    name: optItem,
                    price: patternPrice,
                  };
                });
              }

              return {
                key: item.key,
                label: item.label,
                isMulti: item.isMulti,
                optionItems: optItems,
                order: item.order,
              };
            })
          );


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
      });

    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    console.log(defaultCustItems, 'DEFAULT CUST ITEMS')
  };

  const Getpattern = (custName, key, price, selectFlag, isPizza) => {

    debugger;
    console.log('item_name', key.name)

    const newItemToAdd = {
      order: 1,
      key: custName,
      item: key.name
    }

    let existingOrder1SelectedItem = selectedCustItems.filter(item => item.order != 1);
    existingOrder1SelectedItem.push(newItemToAdd);

    setSelectedCustItems(existingOrder1SelectedItem);

    console.log("Getpattern key", key, custName);
    if (isPizza) {
      setKey(key.name);
      setTopLevelKey(key.name);
    } else {
      setKey(key);
      setTopLevelKey(key);
    }

    console.log("Getpattern price", price);

    setChecked(false);

    const topItem = key.name;
    if (!isPizza) {
      let tempSelectedSingleValues = [];
      console.log("Getpattern inputs", custName, key, price, selectFlag);

      if (selectFlag === true) {
        if (selectedSingleValues.length > 0) {
          tempSelectedSingleValues = selectedSingleValues.filter((val) => custName !== val.custName);
        }

        tempSelectedSingleValues.push({
          custName: custName,
          key: key.name,
          price: price,
        });

        setSelectedSingleValues(tempSelectedSingleValues);
        console.log("selectFlag(true) ", tempSelectedSingleValues);
      } else {
        tempSelectedSingleValues = selectedSingleValues.filter((singleVal) => singleVal.key !== key.name);
        console.log("selectFlag(false) ", tempSelectedSingleValues);
        setSelectedSingleValues(tempSelectedSingleValues);
      }

      console.log("selectedSingleValues ::", tempSelectedSingleValues, tempSelectedSingleValues.length);

      let totalMultiValPrice = 0;

      selectedMultiValues.map((val) => {
        totalMultiValPrice = totalMultiValPrice + val.price;
      });

      let totalSingleValPrice = 0;

      tempSelectedSingleValues.map((val) => {
        totalSingleValPrice = totalSingleValPrice + val.price;
      });

      settotalPrice(totalMultiValPrice + totalSingleValPrice);
      settotalBasePrice(totalMultiValPrice + totalSingleValPrice);
    } else {
      console.log("Getpattern PIZZA inputs", custName, key, price, selectFlag);

      let baseArray = fooditemoption[1];

      console.log("Base array ", baseArray);

      let combination = key.name + "~" + baseArray.optionItems[0];

      console.log("combination", combination);
      let combinationPrice = 0;

      baseArray.prices.map((priceObj) => {
        if (combination === priceObj.pattern) {
          combinationPrice = priceObj.price;
        }
      });

      settotalPrice(combinationPrice);

      console.log("combinationPrice", combinationPrice, totalPrice, totalBasePrice);
    }

    setTempCustItems(
      fooditemoption.map((item) => {
        let optItems = [];
        if (item.order === 1) {
          if (item.prices.length > 0) {
            optItems = item.prices.map((optItem) => {
              return {
                name: optItem.pattern,
                price: optItem.price,
              };
            });
          } else {
            optItems = item.optionItems.map((optItem) => {
              console.log("TEST_PK >>>", item);
              return {
                name: optItem,
                price: 0,
              };
            });
          }
        } else {
          optItems = item.optionItems.map((optItem) => {
            let patternPrice = 0;
            item.prices.map((price) => {
              const tempKey = topItem + "~" + optItem;
              if (tempKey === price.pattern) {
                // console.log('TempKey >>', tempKey, price);
                patternPrice = price.price;
              }
            });
            // console.log('patternPrice', patternPrice)
            return {
              name: optItem,
              price: patternPrice,
            };
          });
        }

        return {
          key: item.key,
          label: item.label,
          isMulti: item.isMulti,
          optionItems: optItems,
          order: item.order,
        };
      })
    );

    console.log("Temp Cust Items after change", tempCustItems);
  };

  const selectItem = (key, price, value, order) => {
    debugger;
    console.log("Inside selectItem", key, totalPrice, totalBasePrice, topLevelKey, order);
    console.log('selectItem tempCustItems', tempCustItems);

    const newItemToAdd = {
      order: order,
      item: key.name
    }

    let existingOrder1SelectedItem = selectedCustItems.filter(item => item.order != order);
    existingOrder1SelectedItem.push(newItemToAdd);

    setSelectedCustItems(existingOrder1SelectedItem);

    setChecked(false);

    console.log("selectedSingleValues", selectedSingleValues);

    let tempSelectedSingleValues = selectedSingleValues.filter((selectedSingleValue) => !selectedSingleValue.key.startsWith(topLevelKey));

    tempSelectedSingleValues.push({
      key: topLevelKey + "~" + key,
      price: price,
    });

    setSelectedSingleValues(tempSelectedSingleValues);

    if (value == true) {
      settotalPrice(price);
      settotalBasePrice(price);
    } else {
      settotalPrice(price);
      settotalBasePrice(price);
    }

    setKey(key + "~" + key);
    setOldprice(price);

    // setPriceVisible(false);
    console.log("oldprice after", oldprice);
  };

  const selectMultiItem = (custKey, key, price, selectFlag, order, isPizza) => {
    debugger;
    console.log('SELECT_FLAG', key, price, selectFlag, order, selectedCustItems);
    console.log('selectMultiItem tempCustItems', tempCustItems);

    if(order >1 && selectedCustItems.length === 0){
        const firstOrderItem = tempCustItems.filter(tempCustItem => tempCustItem.order === 1)[0];
        console.log(firstOrderItem);
        selectedCustItems.push({
          order: 1,
          key: firstOrderItem.key,
          item: firstOrderItem.optionItems[0].name,
        });
    }

    const existingSameOrderMultiItemsArray = selectedCustItems.filter(item => item.order === order);

    console.log('existingSameOrderMultiItemsArray', existingSameOrderMultiItemsArray);

    if (selectFlag) {
      if (existingSameOrderMultiItemsArray.length > 0) {
        let existingSameOrderMultiItems = existingSameOrderMultiItemsArray[0];
        let items = [...existingSameOrderMultiItems.item];
        console.log('selectMultiItem >>> Items ', items)
        items.push(key);

        console.log('Latest cust items', existingSameOrderMultiItems, items)

        let updatedSelectedCustItems = selectedCustItems.filter(item => item.order != order);

        const newItemToAdd = {
          order: order,
          key: custKey,
          item: [...items]
        }

        updatedSelectedCustItems.push(newItemToAdd);
        setSelectedCustItems(updatedSelectedCustItems);
      } else {
        const newItemToAdd = {
          order: order,
          key: custKey,
          item: [key]
        }

        let updatedSelectedCustItems = selectedCustItems.filter(item => item.order != order);
        updatedSelectedCustItems.push(newItemToAdd);

        setSelectedCustItems(updatedSelectedCustItems);
      }
    } else {
      if (existingSameOrderMultiItemsArray.length > 0) {
        let existingSameOrderMultiItems = existingSameOrderMultiItemsArray[0].item;
        existingSameOrderMultiItems = existingSameOrderMultiItems.filter(val => val != key);

        console.log('existingSameOrderMultiItems', existingSameOrderMultiItems)

        const newItemToAdd = {
          order: order,
          key: custKey,
          item: [...existingSameOrderMultiItems]
        }

        let updatedSelectedCustItems = selectedCustItems.filter(item => item.order != order);

        updatedSelectedCustItems.push(newItemToAdd);

        console.log('updatedSelectedCustItems 2', updatedSelectedCustItems)

        setSelectedCustItems(updatedSelectedCustItems);


      } else {
        console.log('Nothing to delete....')
      }

    }

    console.log('selected items latest', selectedCustItems)


  }

  const calculateTotalPrice = () => {

    tempCustItems.sort((a, b) => a.order - b.order);
    selectedCustItems.sort((a, b) => a.order - b.order);

    console.log('Calculating the total price for', selectedCustItems, tempCustItems)

    let selectedTopOrderItem = '';

    let totalPrice = 0;

    selectedCustItems.map((selectedCustItem, index) => {

      const order = selectedCustItem.order;

      if (props.isPizza && index === 0) {
        selectedTopOrderItem = selectedCustItem.item;
      }

      // Getting the available data for the selected item & order from the API retrieved data. START(A)
      const itemDataForOrderArray = tempCustItems.filter(item => item.order === order);
      const itemDataForOrder = itemDataForOrderArray[0];

      console.log('itemDataForOrder', order, itemDataForOrder)
      const optionItems = itemDataForOrder.optionItems;
      const prices = [];
      const isMulti = itemDataForOrder.isMulti;

      // STOP(A)

      if (isMulti) {
        const selectedMultiItems = selectedCustItem.item;

        optionItems.map(optItem => {
          selectedMultiItems.map(selectedMultiItem => {
            if (optItem.name === selectedMultiItem) {
              totalPrice += optItem.price;
            }
          })
        })

      } else {
        // if(prices.length > 0){

        optionItems.map(optItem => {
          if (optItem.name === selectedCustItem.item) {
            totalPrice += optItem.price;
          }
        })
      }

    })

    console.log('totalPrice ', totalPrice)
    setFinalPrice(totalPrice);
  }


  const addtocart = (foodItemId, foodname, price, taxType) => {
    debugger;
    setaddtocart_(1);
    console.log("menu details");
    let cartarray = JSON.parse(localStorage.getItem("t4fcart")) == undefined ? [] : JSON.parse(localStorage.getItem("t4fcart"));

    const _fsId = stateData.activeFs[0].shop_id;

    let cartdata = {
      foodItemId: foodItemId,
      foodItemName: foodname,
      foodItemPrice: price,
      foodItemQuantity: quantity,
      foodItemTotalPrice: quantity * price,
      customizations: selectedCustItems,
      foodStallId: foodStallId === null ? _fsId : foodStallId,
      isPizza: props.isPizza,
      taxType: taxType
    };
    console.log("cartdata", cartdata);
    console.log("cartarray", cartarray);

    let alreadyExistFlag = false;

    let newCartArray = [];

    let matchedCartItem = {};

    for (let i = 0; i < cartarray.length; i++) {
      const _cartItem = cartarray[i];
      const _customizations = _cartItem.customizations;

      console.log('_cartItem', _cartItem);
      console.log('_customizations', _customizations);

      if (_cartItem.foodItemId === cartdata.foodItemId && _.isEqual(selectedCustItems, _customizations)) {
        alreadyExistFlag = true;
        matchedCartItem = _cartItem;
        _cartItem.foodItemQuantity = _cartItem.foodItemQuantity + cartdata.foodItemQuantity;
        _cartItem.foodItemTotalPrice = _cartItem.foodItemTotalPrice + cartdata.foodItemTotalPrice;
      }

      newCartArray.push(_cartItem);
    }

    if (!alreadyExistFlag) {
      newCartArray.push(cartdata);
    }

    console.log('newCartArray', newCartArray);

    dispatch(REDUX_ACTION.resetCart(newCartArray))

    // let active = cartarray.filter((filter) => filter.foodItemId === foodItemId);
    // if (active.length > 0) {
    //   setaddtocart_(0);
    //   setMsg("Item already exist in the cart");
    //   handleVisible();

    //   console.log("Item already exist in the cart");
    // } else {
    //   cartarray.push(cartdata);
    //   dispatch(REDUX_ACTION.addFoodItemToCart(cartdata))
    //   setMsg("Item added to cart");
    //   handleVisible();
    // }
    handleVisible();
    localStorage.setItem("t4fcart", JSON.stringify(newCartArray));
    console.log("cart all", cartarray);

    notifyCartSuccessMessage();

    // props.handleClose();
  };
  const handleVisible = () => {
    setSmShow(!smShow);
    props.handleClose();
    // setTimeout(() => {
    //   setSmShow(false);
    // }, 1000);
  };
  return (
    <>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{msg}</Modal.Header>
      </Modal>
      <div className="fooditemcontainer">
        {isLoaded ? (
          <div className="d-flex justify-content-center">
            <div className="align-items-center h-100">
              <Loading size={24} />
            </div>
          </div>
        ) : (
          <div id="pizzacontainer">
            {/* <div className="d-flex justify-content-between mb-2 px-3  pull-right">
                <Button variant="secondary" size="sm" onClick={props.handleClose} style={{color: 'white'}}>
                Close
              </Button>
            </div> */}
            <div className="d-flex justify-content-between mb-2 px-3  ">
              <div>
                <span className="px-2">
                  <h5>{props.fooditemname}</h5>
                </span>
              </div>
              <div className="align-items-center">
                <span className=" px-2">
                  {/* <h5>{priceVisible ? config.keys.rupee + quantity * totalPrice : config.keys.rupee + quantity * totalBasePrice}</h5> */}
                  <h5>{config.keys.rupee + finalPrice}</h5>
                </span>
              </div>
            </div>

            {/* {props.fooditemid} */}
            <div>
              <form action="" method="post">
                {tempCustItems.map((option, index1) =>
                (
                  <fieldset class="the-fieldset border rounded px-1 mb-1">
                    <legend className="text-medium ">
                      <span className="font-weight-bold">{option.key}</span>
                      {/* <span className="text-small"> ({option.label})</span> */}
                    </legend>
                    {option.optionItems.length > 0 &&
                      option.optionItems.map((item, index) =>
                      //  option.key === "Toppings" ? (
                      {
                         
                        return option.isMulti ? (
                          <div id="toppingsveg" className="">
                            {/* <span className="text-success font-weight-bold ">Veg</span> */}
                            <div className="d-flex justify-content-between mb-2">
                              <div>
                                <span className="">{item.name}</span>
                                <br /> {option.order !== 1 && config.keys.rupee}
                                {option.order !== 1 && " " + item.price}
                              </div>
                              <div className="align-items-center">
                                <div class="form-check">
                                  <span className="px-2 py-2">
                                    <input type="checkbox"
                                      id={"chktoppings"
                                        + option.key + index}
                                      name={item.name} defaultChecked={isChecked}
                                      onChange={(e) =>
                                        selectMultiItem(option.key,
                                          item.name,
                                          item.price,
                                          e.target.checked,
                                          option.order,
                                          props.isPizza)} />
                                    <label for={"chktoppings" + option.key + index}></label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between mb-2">
                            {props.isPizza ? (
                              <div>
                                <span className="">{item.name}</span>
                                <br /> {option.order !== 1 && config.keys.rupee}
                                {option.order !== 1 && " " + item.price}
                              </div>
                            ) : (
                              <div>
                                <span className="">{item.name}</span>
                                <br /> {config.keys.rupee}
                                {" " + item.price}
                              </div>
                            )}
                            <div className="align-items-center">
                              <div className="t4fradio">
                                {!props.isPizza ? (
                                  <label>
                                    {index1 === 0 && index === 0 ?
                                      <input type="radio" name={option.key} defaultChecked={true}
                                        onChange={(e) => (option.order == 1 ?
                                          Getpattern(option.key, item, item.price, e.target.checked, props.isPizza) :
                                          selectItem(item, item.price, e.target.checked, option.order))} />
                                      :
                                      <input type="radio" name={option.key} defaultChecked={false}
                                        onChange={(e) => (option.order == 1 ?
                                          Getpattern(option.key, item, item.price, e.target.checked, props.isPizza)
                                          : selectItem(item, item.price, e.target.checked, option.order))} />}

                                    <span></span>
                                  </label>
                                ) : (
                                  <label>
                                    {index === 0 ?
                                      <input type="radio" name={option.key} defaultChecked={true}
                                        onChange={(e) => (option.order == 1 ?
                                          Getpattern(option.key, item, item.price, e.target.checked, props.isPizza)
                                          : selectItem(item, item.price, e.target.checked, option.order))} />
                                      : <input type="radio" name={option.key} defaultChecked={false}
                                        onChange={(e) => (option.order == 1 ?
                                          Getpattern(option.key, item, item.price, e.target.checked, props.isPizza)
                                          : selectItem(item, item.price, e.target.checked, option.order))} />}

                                    <span></span>
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }

                      )}
                  </fieldset>
                ))}
              </form>
            </div>
          </div>
        )}
        <div>{msg}</div>
        <div className="d-flex justify-content-between align-items-center bg-red p-2">
          <div>
            <div id="quantity" class="d-flex plus-minus-input">
              <div>
                <button type="button" class="quantitybtnminus px-2" disabled={quantity > 1 ? false : true} onClick={(e) => setQuantity(quantity - 1)}>
                  -
                </button>
              </div>
              <input className="text-light borderteal w-50px text-center bg-teal " value={quantity} disabled type="text" name="quantity" />
              <div>
                <button type="button" className="quantitybtnplus px-2" onClick={(e) => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>{" "}
          </div>
          <div>
            <span className="text-light"  style={{backgroundColor: "#e63946"}}>
              <Link className="text-light text-decoration-none" to="#" onClick={(e) => (setaddtocart_(1), addtocart(props.fooditemid, props.fooditemname, finalPrice, props.taxType === null ? 'E' : props.taxType))}>
                <b> Add to Cart </b>
              </Link>
            </span>
            <span className="text-light"> {config.keys.rupee + " " + quantity * finalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer_MenuDetails;

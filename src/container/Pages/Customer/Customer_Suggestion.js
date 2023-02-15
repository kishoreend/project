import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import { getData, postData } from "../../../ServiceCall";
import * as REDUX_ACTION from "../../../store/customer/action";

const Customer_Suggestion = (props) => {

    const cartItems = useSelector((store) => store.customer.cartItems);

    console.log(cartItems);

    const foodItemId = props.foodItemId;

    const [suggestionItems, setSuggestionItems] = useState([]);

    const [selectedSuggestionItem, setSelectedSuggestionItem] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {

        const foodItemIds = cartItems.map(i => i.foodItemId);

        console.log(foodItemIds);

        getSuggestionItems(foodItemIds);

    }, [cartItems]);

    const addToCart = (item) => {
      console.log(item);

      let cartarray =
        JSON.parse(localStorage.getItem("t4fcart")) == undefined
          ? []
          : JSON.parse(localStorage.getItem("t4fcart"));

      let cartdata = {
        foodItemId: item.foodItemId,
        foodItemName: item.foodItemName,
        foodItemPrice: item.price,
        foodItemQuantity: 1,
        foodItemTotalPrice: item.price,
        foodStallId: item.foodStallId,
        isPizza: item.pizza,
        customizations: item.availableCustomisation,
      };

      let active = cartarray.filter(
        (filter) => filter.foodItemId === item.foodItemId
      );
      if (active.length > 0) {
        console.log("Item already exist in the cart");
      } else {
        cartarray.push(cartdata);
      }

      localStorage.setItem("t4fcart", JSON.stringify(cartarray));
      dispatch(REDUX_ACTION.resetCart(cartarray));

      console.log("LATEST_CART", localStorage.getItem("t4fcart"));
    };

    const getSuggestionItems = async (foodItemIds) => {
        
        const suggestionItemsResponse = await postData('/api/customer/get-suggestion-items', foodItemIds, "USER", "POST");

        console.log(suggestionItemsResponse);
        if(suggestionItemsResponse.data){
            const suggestItems = suggestionItemsResponse.data.data.filter(item => !isItemInCart(item));
            setSuggestionItems(suggestItems);
        }        
    }

    const isItemInCart = (item) => {
        var flag = false;
        for(let i = 0; i < cartItems.length; i++){
            if(cartItems[i].foodItemId === item.foodItemId){
                flag = true;
                break;
            }
        }
        return flag;
    }

    return (
        <div style={{

        }}>
            {foodItemId && suggestionItems && suggestionItems.length > 0 && "You can't miss this:"}
            {
                suggestionItems.length > 0 && (
                                       
                        suggestionItems.map(item => ((
                        <div style={{
                            border: '1px solid #D3D3D3',
                            borderRadius: '2px',
                            margin: '2%',
                            padding: '2%'
                        }}>
                            <Row>
                                <Col xs={10}>
                                    {item.foodItemName}
                                </Col>
                                <Col style={{
                                    textAlign: 'center'
                                }}>
                                <img src={"data:image/png;base64, " + item.pic[0].data} width="40px" height="40px" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10}>
                                ₹ {item.price}
                                </Col>
                                <Col style={{
                                    textAlign: 'center', marginTop: '2px'
                                }} xs={2}>
                                <button className="borderbtn text-nowrap" to="#" onClick={() => addToCart(item)}>
                                    Add
                                </button>
                                </Col>
                            </Row>
                        </div>
                    ))
                    )
                )
            }
        </div>
    )
}

export default Customer_Suggestion;
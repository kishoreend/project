import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
//import config from "../../../container/app/navigation.json";
import { Link, useHistory } from "react-router-dom";

const SuccessfulPayment = (props) => {

    console.log(props)

    const orderId = props.orderId;

    const rzpOrderId = props.rzpOrderId;

    const paymentId = props.paymentId;

    const paymentSignature = props.paymentSignature;

    const paymentStatus = props.paymentStatus;
    const history = useHistory();
    const gotoMenu = (foodStallId) => {
        // history.push(config.customerurl.Customer_Menu + "?fs-id=" + foodStallId);
      }
    
    return (
        <div style={{
            textAlign: 'center',
            marginTop: '3%',
            
        }}>
                <FontAwesomeIcon icon={faCheckCircle} size="4x" color="green"/>
                <div><h2>Order is placed</h2></div>
                <div style={{
                    margin: '2%',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    paddingTop: '2%'
                }}>
                    <div>Your order is placed successfully. asdf</div>
                    <div>Order ID: {orderId}</div>
                    <div>Transaction ID: {paymentId}</div>
                    <div style={{
                        marginTop: '4%',
                        marginBottom: '10%'
                    }}>

                     <Link className="btn btn-success" white style={{
                        color: 'white',
                        width: '100px'
                    }} to='/customer/menu'
                    >Menu</Link> 
                     {/* <div class="accordion-body" style={{
                              margin: "10px 0 0 0"
                            }} onClick={() => gotoMenu()}>
                              <p class="text-right">
                                <button class="mobiledarkbtn">back </button>
                              </p>
                            </div>*/}

                    </div> 
                </div>
        </div>
    )
}

export default SuccessfulPayment;
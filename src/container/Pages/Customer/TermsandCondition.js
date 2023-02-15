import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import config from "../../../container/app/navigation.json";
import { callApi } from "../../../ServiceCall";
import { Modal} from "react-bootstrap";
import { Button } from "reactstrap";
const TermsandCondition = () => {

  const [content, setContent] = useState('');
  
   
  //  const checkboxHandler =()=>{
  //   const checkBoxElement = document.getElementById("agree")
  //   setcheckBoxStatus(checkBoxElement.checked)
  //   setShowErrorMsg(false)
  //   }
  // const handleOpen =()=>{
  //    setOpen(true);
  //  }

  //  const handleDrop = ()=>{
  //   setOpen(false);
  //   console.log(open)
  //  }

  useEffect(() => {
    console.log('In about');
    getContent();
  }, [])

  const getContent = () => {
    callApi('/api/customer/getTnC')
    .then(res => {
      console.log(res);
      setContent(res.data.data.description);
    })
  }

  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={5} />
            <div className="mobile_header_gray p-2">
              <span>
                <b>Terms and Conditions</b>
                <div className="container" errorMessage="Please enter Description">
                              {/* <div style={{paddingTop:"22px"}}>
                                 <input type="checkbox" id="agree" onClick={checkboxHandler} checked={checkBoxStatus}  />
             
                                 <label  htmlFor="agree">  &nbsp; &nbsp;I agree to <b onClick={handleOpen}>   terms and conditions </b>
                                 <Modal show={open} onHide={handleDrop} >
                                        <Modal.Header closeButton>
                                          <Modal.Title>Terms and Conditions</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        1.	The terms of use govern the use of the Tap4Food website, our Tap4Food User application for Merchant stores, other personal handheld devices and other Tap4Food Discover and Order and/or Scan and Go (contact-less shopping) services (all these are collectively termed as services). Please read the Terms of Use section carefully. By using the service, scanning the QR, ordering merchandise through the website, you are agreeing to the Terms of Use.<br/>
                                        2. 	The Services are provided under the brand Tap4Food, which is owned and operated by TrueValue E-Commerce Pvt Ltd.(hereinafter referred to as “Tap4Food”, “we”, “us” or “our”).<br/>
                                        3.	We are an IT Solutions company that provides a Technology solution for the companies to modernize the shopping and food experience of customers by providing them top-class technology solutions in the form of our website. We integrate the Merchants in the retail space (cafeteria/food court) on our platform through an admin application which is used for managing customer orders. We do not own any of the Merchants and have no control over the quality of the products or over services that are provided by the Merchant.<br/>
                                        4. 	We reserve the right to change the Terms of Use anytime without providing any notice and you are liable to update with the updated Terms of Use through this section <br/>
                                        5.	Only individuals who are 18 years or older may use the services. You may use our services if you are less than 18 years old but we hold no responsibility for the same.<br/>
                                        6.	You agree to receive Notifications, SMSs and emails from Tap4Food regarding order intimations and updates <br/>
                                        7.	You permit us to share your details (name, email and phone) with the Merchant(s).<br/>
                                        8.	As a standard practice, all orders placed on Tap4Food are treated as confirmed and cannot be cancelled or transferred to another Merchant.<br/>
                                        9.	You will be entitled for a refund of any order only if the Merchant cancels your order due to unavailability of merchandise ordered or any other reason as mentioned by the Merchant<br/>
                                        10.	You are responsible for keeping your login credentials private and not share them with anyone else. You will not use the services for any activity that is of commercial in nature or unlawful or harmful for any individual or organization. If you use the same, all activities undertaken by the individual are attributed to the individual without any blame or responsibility assigned to Tap4Food.<br/>
                                        11.	We are the owner of intellectual property for all the services provided by us and hence are governed by the necessary copyright laws.<br/>
                                        12.	We are the owner of the Admin application, Merchant application, User application and Dashboard for Android and iOS and the website (desktop and mobile) and hence any attempt to destroy, imitate or harm these applications will be considered as a breach of the Terms of Use<br/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button variant="danger"  style={{ width: '80px', color: 'white' ,backgroundColor:"#e63946"}} onClick={handleDrop}>
                                            Close
                                          </Button>
                                         
                                        </Modal.Footer>
                                      </Modal>

                                         </label>

                               
                               
                              </div> */}
                               {/* <div style={{color:"red",fontWeight:"600",marginLeft:"2px",paddingTop:"5px"}}> {showErrorMsg && "Please agree terms & conditions"  }</div> */}
                              </div> 
                              <Modal>
                              </Modal>
              </span>
            </div>

            <div className="mobilecontainer p-2">
              <p dangerouslySetInnerHTML={{__html: content}}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsandCondition;

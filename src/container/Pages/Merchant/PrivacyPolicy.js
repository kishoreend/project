import React, { useEffect, useState } from "react";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import { Modal} from "react-bootstrap";
import { Button } from "reactstrap";

const Privacy_Policy = () => {
    const [policy,setPolicy]= useState(false);
    
     const handlePolicy =()=>{
         setPolicy (true);
        }
        const handleCancel = ()=>{
         setPolicy(false);
        }
    
    return (
        <>
        <div style={{marginLeft:"5vh"}}>
          <b onClick={handlePolicy}>Privacy&nbsp;Policy</b> 
                                   <Modal show={policy} onHide={handleCancel} >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            <img src="https://merchant.tap4food.com/merchant/static/media/logo.b73fb1c0.png" position="absolute" height={60} width={60}/>&nbsp;
                                            PRIVACY POLICY
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p className="">Last updated on 1st February, 2023</p> 
                                              This Privacy Policy (" Policy") describes the policies and procedures on the collection, use, disclosure and protection of your information when you use our website located at tap4food.com, or the tap4food is webapp application (collectively,
                                                "TrueValue E-Commerce Pvt Ltd") made available by TrueValue E-Commerce Private Limited (“TrueValue E-Commerce", "Company","we","us" and "our"),&nbsp;  a private company established under the laws of India having its registered office at
                                                The terms “you” and “your” refer to the user of the TrueValue E-Commerce Platform. The term <strong>Services</strong> &nbsp; 
                                               refers to any services offered by  Tap4food E-Commerce whether on the Tap4food or otherwise.
                                                 Please read this Policy before using the Tap4food Platform or submitting any personal information to Tap4food. This Policy is a part of and incorporated within, and is to be read along with, the Terms of Use.
                                            
                                                <h5 className="">YOUR CONSENT</h5>
                                                    By using the Tap4food Platform and the Services, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described and collected by us in accordance with this Policy.  If you do not agree with the Policy, please do not use or access the Tap4food Platform.
                                            
                                             <h5 className="">POLICY CHANGES </h5>
                                                We may occasionally update this Policy and such changes will be posted on this page. If we make any significant changes to this Policy we will endeavour to provide you with reasonable notice of such changes, such as via prominent notice on the Tap4food or to your email address on record and where required by applicable law, we will obtain your consent. To the extent permitted under the applicable law, your continued use of our Services after we publish or send a notice about our changes to this Policy shall constitute your consent to the updated Policy.
                                            
                                            <h5 className="">LINKS TO OTHER WEBSITES </h5>
                                                The Tap4food Platform may contain links to other websites. Any personal information about you collected whilst visiting such websites is not governed by this Policy. Tap4food shall not be responsible for and has no control over the practices and content of any website accessed using the links contained on the Tap4food Platform. This Policy shall not apply to any information you may disclose to any of our service providers/service personnel which we do not require you to disclose to us or any of our service providers under this Policy.
                                             <h5 className="">   
                                                <strong className="">INFORMATION WE COLLECT FROM YOU </strong>
                                                </h5>
                                                <span className="">
                                                    Device Information: In order to improve your app experience and lend stability to our services to you, we may collect information or employ third party plugins that collect information about the devices you use to access our Services, including the hardware models, operating systems and versions, software, file names and versions, preferred languages, unique device identifiers, advertising identifiers, serial numbers, device motion information, mobile network information, installed applications on device and phone state. The information collected thus will be disclosed to or collected directly by these plugins and may be used to improve the content and/or functionality of the services offered to you. Analytics companies may use mobile device IDs to track your usage of the Tap4food Platform<br/>
                                                </span>
                                           
                                            
                                                <h5 className="">
                                                    <strong className="fontweight:bold">COOKIES </strong></h5>
                                            
                                            
                                                Our Tap4food Platform and third parties with whom we partner, may use cookies, pixel tags, web beacons, mobile device IDs, “flash cookies” and similar files or technologies to collect and store information with respect to your use of the Services and third-party websites.
                                            
                                            <h5 className="">
                                                <strong className="">USES OF YOUR INFORMATION </strong>
                                                </h5>
                                            <ul>
                                                <li className="fontWeight:400">
                                                    We use the information we collect for following purposes, including:
                                                </li>
                                            </ul>
                                            <ol className="" type="i">
                                                <li className="fontWeight:400">
                                                    To provide, personalise, maintain and improve our products and services, such as to enable deliveries and other services, enable features to personalise your Tap4food
                                                     account.
                                                </li>
                                                <li className="fontWeight:400">
                                                    To administer and enhance the security of our Tap4food Platform and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes.
                                                </li>
                                                <li className="fontWeight:400">
                                                    <span>To provide you with information about services we consider similar to those that you are already using, or have enquired about, or may interest you. If you are a registered user, we will contact you by electronic means (e-mail or SMS or telephone or other internet based instant messaging systems) with information about these services.</span>
                                                </li>
                                                <li className="fontWeight:400">
                                                    To understand our users (what they do on our Services, what features they like, how they use them, etc.), improve the content and features of our Services (such as by personalizing content to your interests), process and complete your transactions, make special offers, provide customer support, process and respond to your queries.
                                                </li>
                                                <li className="font-weight:400;">
                                                    <span>To allow you to participate in interactive features of our Services, if any or</span>
                                                </li>
                                                <li className="fontWeight:400">
                                                    <span>To measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising to you.</span>
                                                </li>
                                            
                                               </ol> 
                                                <h5 className="fontsize:15px">DISCLOSURE AND DISTRIBUTION OF YOUR INFORMATION</h5>
                                            
                                            
                                               <h7 className="fontsize:8px"> We may share your information that we collect for following purposes:</h7>
                                            
                                            <div className="">
                                                <li className=""  >
                                                    <strong className="">With Service Providers</strong>
                                                    <span className="">We may share your information with our vendors, consultants, marketing partners, research firms and other service providers or business partners, such as Payment processing companies, to support our business. For example, your information may be shared with outside vendors to send you emails and messages or push notifications to your devices in relation to our Services, to help us analyze and improve the use of our Services, to process and collect payments. We also may use vendors for other projects, such as conducting surveys or organizing sweepstakes for us.</span>
                                                </li>
                                                <li className="">
                                                   <strong className=""> With Partner Restaurants/Merchant: </strong>
                                                    <span className="">While you place a request to order food through the Tap4food Platform, your information is provided to us and to the restaurants/merchants with whom you may choose to order. In order to facilitate your online food order processing, we provide your information to that restaurant/merchant in a similar manner as if you had made a food order directly with the restaurant. If you provide a mobile phone number, Tap4food may send you text messages regarding the order’s delivery status.</span>
                                                </li>
                                                <li className="fontweight:400" >
                                                    <strong className="">For Internal Use:</strong>
                                                    <span className="">We may share your information with any present or future member of our “Group” (as defined below)or affiliates for our internal business purposes The term “Group” means, with respect to any person, any entity that is controlled by such person, or any entity that controls such person, or any entity that is under common control with such person, whether directly or indirectly, or, in the case of a natural person, any Relative (as such term is defined in the Companies Act, 1956 and Companies Act, 2013 to the extent applicable) of such person.</span>
                                                </li>
                                                <li className="fontweight:400" >
                                                   <strong className=""> With Advertisers and advertising networks:</strong>
                                                    We may work with third parties such as network advertisers to serve advertisements on the Tap4food Platform and on third-party websites or other media (e.g., social networking platforms). These third parties may use cookies, JavaScript, web beacons (including clear GIFs), Flash LSOs and other tracking technologies to measure the effectiveness of their ads and to personalize advertising content to you. &nbsp;
                                                    <p>
                                                        <span className="">While you cannot opt out of advertising on the Tap4food Platform, you may opt out of much interest-based advertising on third party sites and through third party ad networks (including DoubleClick Ad Exchange, Facebook Audience Network and Google AdSense). For more information, visit . Opting out means that you will no longer receive personalized ads by third parties ad networks from which you have opted out, which is based on your browsing information across multiple sites and online services. If you delete cookies or change devices, your opt out may no longer be effective.</span>
                                                    </p>
                                                </li>
                                                <li className="" >
                                                    
                                                    <span className="">To fulfill the purpose for which you provide it.</span>
                                                </li>
                                                <li className="fontweight:400">
                                                    
                                                    <span className="">We may share your information other than as described in this Policy if we notify you and you consent to the sharing.</span>
                                                </li>
                                                <h5 className="fontweight:bold">DATA SECURITY PRECAUTIONS</h5> 
                                                    <span className="">We have in place appropriate technical and security measures to secure the information collected by us</span>
                                                    <span className="">We use vault and tokenization services from third party service providers to protect the sensitive personal information provided by you. The third-party service providers with respect to our vault and tokenization services and our payment gateway and payment processing are compliant with the payment card industry standard (generally referred to as PCI compliant service providers). You are advised not to send your full credit/debit card details through unencrypted electronic platforms. Where we have given you (or where you have chosen) a username and password which enables you to access certain parts of the Tap4food Platform, you are responsible for keeping these details confidential. We ask you not to share your password with anyone.</span>
                                                    <span className="">Please we aware that the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted through the Tap4food Platform. Once we have received your information, we will use strict physical, electronic, and procedural safeguards to try to prevent unauthorised access</span>
                                                
                                                <h5 className="fontweight:bold">OPT-OUT</h5> 
                                                     <span className="">When you sign up for an account, you are opting in to receive emails from Tap4food. You can log in to manage your email preferences [here] or you can follow the “unsubscribe” instructions in commercial email messages, but note that you cannot opt out of receiving certain administrative notices, service notices, or legal notices from Tap4food.</span>
                                                    <span className="">If you wish to withdraw your consent for the use and disclosure of your personal information in the manner provided in this Policy or you want your data to be deleted, please write to us at support@tap4food.com. Please note that we may take time to process such requests, and your request shall take effect no later than 5 (Five) business days from the receipt of such request, after which we will not use your personal data for any processing unless required by us to comply with our legal obligations. We may not be able offer you any or all Services upon such withdrawal of your consent.</span>&nbsp;
                                                     &nbsp;
                                                     <h5 className="fontsize:bold">
                                                        Tap4food Platform Security
                                                    </h5>
                                                    <span className="">If you have any queries relating to the processing or usage of information provided by you in connection with this Policy, please email us at support@tap4food.com  </span>
                                                <p>
                                                    <span className="">If you come across any abuse or violation of the Policy, please report to support@tap4food.com</span>
                                                </p> 
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button variant="success"  style={{ width: '80px', color: 'white',backgroundColor:"#e63946" }} onClick={handleCancel}>
                                            Close
                                          </Button>
                                         
                                        </Modal.Footer>
                                      </Modal> 
                                      </div>
        </>
    );



};
export default Privacy_Policy;
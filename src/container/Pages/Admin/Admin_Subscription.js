import React, { useEffect, useRef, useState } from "react";
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
import edit from "../../../assets/icons/edit.png";
import add from "../../../assets/icons/add.png";

import { callApi, reduxGetData, reduxPostData } from "../../../ServiceCall";
import * as adminActionTypes from "../../../store/admin/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import * as merchantActionTypes from "../../../store/authentication/merchant/actionTypes";
import { Form, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Subscription = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState(1);

  const [message, setMessage] = useState("");

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [guiMsg, setGuiMsg] = useState("");
  const [type, setType] = useState("");
  const [menu, setMenu] = useState(false);
  const [viewprofile, setViewProfile] = useState(false);
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [openCreateModal, setOpenCreateModalFlag] = React.useState(false);

  const [openDeleteModal, setOpenDeleteModalFlag] = React.useState(false);
  const [deleteSubscriptionId, setDeleteSubscriptionId] = React.useState("");


  const closeModal = () => {
    setMessage("");
    setOpenCreateModalFlag(false);
  }

  useEffect(() => {
    getPlans();
  }, [openCreateModal, openDeleteModal]);

  const getPlans = () => {
    callApi('/api/admin/get-subscriptions')
    .then(res => {
      console.log(res);
      setSubscriptions(res.data.data);
    })
  }

  const deletePlan = (id) => {
    setDeleteSubscriptionId(id);
    setOpenDeleteModalFlag(true);
  }

  const confirmDeletePlan = () => {
    console.log('deleteSubscriptionId', deleteSubscriptionId);
    callApi('api/admin/delete-subscription?subscriptionId=' + deleteSubscriptionId, 'DELETE')
    .then(res => {
      toast('Plan is deleted');
      setOpenDeleteModalFlag(false);
      setDeleteSubscriptionId("");
    })
  }

  const closeDeleteModal = () => {
    setOpenDeleteModalFlag(false);
    setDeleteSubscriptionId("");
  }

  const savePlan = () => {
    const data = {
      planName, description, period, amount: price
    }

    if(planName === ""){
      setMessage("Plan name is mandatory.");
    }else if(planName.length < 3){
      setMessage("Plan name should be minimum 3 characters.");
    }else if(period === "" || period === 0){
      setMessage("Plan duration is not selected.");
    }else if(description === ""){
      setMessage("Plan description should not be empty.");
    }else if(price === "" || price === 0){
      setMessage("Price should not be empty");
    }else{
      reduxPostData('/api/admin/add-subscription', data, 'admin')
      .then(res => {
        console.log(res);
        closeModal();
        toast("New plan is created successfully!");
        // setGuiMsg("New plan is created successfully!")
        // setType("success");
      }).catch(ex => {
        console.log(ex.response.data.errorMessage);
        setMessage(ex.response.data.errorMessage);
      })
    }

    console.log(data);
  }


  return (
    <div>
      <SideNavBar id={6} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("subscriptions")} role={"admin"} viewmerchant={viewprofile} />

        <div className="px-2 ">
        <Modal show={openCreateModal} onHide={() => closeModal()} centered animation={false} >
        <Modal.Header closeButton>
          Create New Plan
        </Modal.Header>
          <Modal.Body>
              <div style={{width: '100%'}}>
                <span style={{width: '100%', textAlign: 'center', color: 'red', marginLeft: '25%'}}>{message}</span>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Plan Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter plan name" onChange={(e) => {setPlanName(e.target.value); setMessage("")}} />
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="period">
                    <Form.Label>Period :</Form.Label>
                    <select style={{ width : '200px'}} onChange={(e) => setPeriod(e.target.value)}>
                      <option value={1}>1 Month</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>1 Year</option>
                      <option value={24}>2 Years</option>
                      <option value={1000}>No expiry</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
                  </Form.Group>
                  
                </Form>
              </div>
          </Modal.Body>
          <Modal.Footer>
          <button className="btn" style={{color: 'white', width: '70px',backgroundColor: 'gray'}} onClick={() => closeModal()}>
              Cancel
            </button>
            <button className="btn btn-success" style={{color: 'white', width: '70px'}} onClick={savePlan}>
              Create
            </button>
            
          </Modal.Footer>
        </Modal>
        <Modal show={openDeleteModal} onHide={() => closeDeleteModal()} centered animation={false} >
          <Modal.Header closeButton>
            Are you sure to delete this plan ?
          </Modal.Header>
          <Modal.Footer>
          <button className="btn" style={{color: 'white', width: '70px',backgroundColor: 'gray'}} onClick={() => closeDeleteModal()}>
              Cancel
            </button>
            <button className="btn btn-success" style={{color: 'white', width: '70px'}} onClick={(e) => confirmDeletePlan(e)}>
              Delete
            </button>
            
          </Modal.Footer>
        </Modal>
          <div>{!isLoaded ? <Alert message={guiMsg} type={type} /> : <Alert message="Please wait...." type="info" />}</div>
          {/* <ToastContainer /> */}
          <div className={"table-border bg-white tab-content shadow p-2"}>
            <div className="position-realtive">
              <div className="d-flex justify-content-end">
                <div></div>
              </div>
            </div>
            <div>
              <div className="row p-2 bottom-border">
                <div className="col teal_text_bold">Plan Name</div>
                <div className="col teal_text_bold">Price</div>
                <div className="col teal_text_bold">Period</div>
                <div className="col teal_text_bold">Actions</div>
                <div className="col ">
                  <button className="t4fbutton-gray-sm" type="button" onClick={() => setOpenCreateModalFlag(true)}>
                    <img src={add} height="15" /> Create New Plan
                  </button>
                </div>
              </div>
              {
                subscriptions.map(subscription =>(
                  <div className="row p-2 bottom-border">
                    <div className="col ">{subscription.planName}</div>
                    <div className="col ">{config.keys.rupee} {" "} {subscription.amount}</div>
                    <div className="col ">{subscription.period} {" Months"}</div>
                    <div className="col ">
                      {" "}
                      {/* <button className="t4fbutton-gray" type="button">
                        <img src={edit} height="15" />
                      </button>{" "} */}
                      <button className="t4fbutton-gray" type="button" onClick={(e) => deletePlan(subscription.id)}>
                        <img src={deleteicon} height="15" />
                      </button>
                    </div>
                    <div className="col "></div>
                  </div>
                ))
              }
              
            </div>{" "}
          </div>

          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin_Subscription;

import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import dash_foodstall from "../../assets/icons/dash_foodstall.png";
import red_add from "../../assets/icons/red_add.png";
import edit from "../../assets/icons/rededit.png";
import ManageFoodStall from "./ManageFoodStall";
import Modal from "react-bootstrap/Modal";
import close from "../../assets/icons/close.png";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { GET_SELECTED_FOOD_STALL_FROM_DROPDOWN } from "../../store/authentication/merchant/actionTypes";

const FoodStall = (props) => {
  const [foodstallpop, setFoodstallpop] = React.useState(false);
  const foodStalls = useSelector((state) => state.merchant.foodStalls) || [];
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const currentFoodstall = useSelector((state) => state.merchant.currentFoodstall);
  const { manager } = useSelector((state) => state.merchant.merchants);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showintial, setShowintial] = useState(false);
  const [emptyFoodStallsFlag, setEmptyFoodStallsFlag] = useState(false);
  const isAdmin = props.role === 'admin';
  console.log(isAdmin, props.role);
  useEffect(() => {
    console.log('foodStalls size', foodStalls);

    if(foodStalls.length === 0) {
      setEmptyFoodStallsFlag(true);
    }else{
      setEmptyFoodStallsFlag(false);
    }
    
    if (currentFoodstall == "Add Food Stall") {
      handleShow();
    }

    console.log("foodstallpopheader", foodStalls);
  }, [foodStalls]);

  console.log("manager", manager);
  // select one food stll by default from redux data

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const addFoodStallPop = () => {
    if (foodStalls.length == 0) {
      setFoodstallpop(true);
    }
  };

  const handleClose = () => {
    setShowintial(false);
    setShow(false);
  };
  const handleShow = () => {
    //setShow(true);
    setShowintial(false);
  };
  const handleShowpop = () => {
    setShow(true);
    //setShowintial(true);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-sm-inline-block d-inline-flex ">
        <DropdownToggle tag="button" className="btn header-item waves-effect text-small pb-1">
          <div className="d-flex align-items-center">
            <div>
              {" "}
              <img className="px-1" src={dash_foodstall} alt="Header foodstall" height="12" />
            </div>
            <div>
              {" "}
              <span className="align-items-center">{currentFoodstall}</span>
            </div>
            <div className="align-items-center">
              {" "}
              {/* <Link className=" d-flex align-items-center" data-toggle="modal" data-target="#foodstall-mechant-modal">
                <img className="px-2" src={red_add} alt="Header foodstall" height="13" />
              </Link> */}
              {/* {!manager && (
                <Link className=" d-flex align-items-center" onClick={handleShowpop}>
                  <img className="px-2" src={red_add} alt="Header foodstall" height="13" />
                </Link>
              )} */}
            </div>
          </div>
        </DropdownToggle>
                
        <DropdownMenu className="foodStallmenu">
          {foodStalls.map((l) => (
            <DropdownItem key={l.foodStallId} href="" className="notify-item py-2 bottomborder" value={l.foodStallId} onClick={(e) => currentFoodstallID != l.foodStallId && dispatch({ type: GET_SELECTED_FOOD_STALL_FROM_DROPDOWN, payload: l })}>
              <span className="text-small text-nowrap p-1">
                {/* <img className="px-1" src={edit} alt="edit" height="12" data-toggle="modal" data-target="#foodstall-mechant-modal" /> */}
                {l.foodStallName + " (" + l.foodStallId + "), " + l.city}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* <div className="modal fade fadepop" id="foodstall-mechant-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <ManageFoodStall />
        </div>
      </div> */}
      {/* {((currentFoodstall == "Add Food Stall" && showintial) || show) && ( */}
        <Modal show={!isAdmin && (emptyFoodStallsFlag || show)} onHide={handleClose} centered animation={false}>
          <Modal.Header className="t4h-color-gray" closeButton>
            <Modal.Title>
              <h6>Add Food Stall</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ManageFoodStall handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      {/* )} */}
    </React.Fragment>
  );
};

export default FoodStall;

import React from "react";
import PropTypes from "prop-types";
import { MDBDataTableV5 } from "mdbreact";
import close from "../../assets/icons/close.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Alert = (props) => {
  return props.message ? (
    <div id="modalAlert" className={props.type === "warn" ? " modalAlert modal-header alert alert-warning alert-dismissible fade show p-0 px-1" : props.type == "danger" ? " modalAlert modal-header alert alert-danger alert-dismissible fade show p-0 px-1" : props.type == "success" ? " modalAlert modal-header alert alert-success alert-dismissible fade show p-0 px-1" : "modal-header alert alert-info alert-dismissible fade show p-0 px-1"} role="alert">
    <div style={{padding:"1%"}}>


     <div style={{display:"inline-block",paddingLeft:"3px"}}> {props.message}</div>
    </div>
      <a className="t4fbutton-tran" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">
          <span aria-hidden="true">&times;</span>
        </span>
      </a>
    </div>
  ) : (
    <></>
  );
};

export default Alert;

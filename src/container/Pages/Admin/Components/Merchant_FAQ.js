import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import { Link, useHistory } from "react-router-dom";
import config from "../../../../container/app/navigation.json";
import { postData, getData, reduxGetData, reduxPostData } from "../../../../ServiceCall";
import * as adminActionTypes from "../../../../store/admin/actionTypes";
import Modal from "react-bootstrap/Modal";
import edit from "../../../../assets/icons/edit.png";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTableV5 } from "mdbreact";
const Merchant_FAQ = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [edittext, setEdittext] = useState(true);
  const [content, setContent] = useState("");
  const [contentnew, setContentnew] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    // getFoodCourt();
  }, []);
  const getAboutusContent = async () => {
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    const response = await reduxGetData("/api/admin/get-aboutus-content", "get", "admin")
      .then((response) => {
        console.log("getAboutusContent", response);
        if (response.status === 200) {
          setContent(response.data.description);
          setContentnew(response.data.description);
          console.log(response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };
  const saveAboutusContent = async (content) => {
    let data = {
      id: "1",
      description: content,
      heading: "headings",
    };
    console.log("aboutusdata", data);
    setIsLoaded((isLoaded) => !isLoaded);
    console.log("Enter Redux Merchant data");
    const response = await reduxPostData("/api/admin/update-aboutus-content", data, "admin")
      .then((response) => {
        console.log("saveAboutusContent", response);
        if (response.status === 200) {
          setContent(response.data.description);
          console.log(response);
        } else {
        }
      })
      .catch((err) => {
        console.log("failure", err);
      });
    setIsLoaded((isLoaded) => !isLoaded);
  };
  return (
    <div>
      <div className={"bg-white tab-content"}>
        <div className="d-flex justify-content-end px-2">
          <p>
            {" "}
            <button className={edittext ? "t4fbutton-gray" : "d-none"} onClick={(e) => setEdittext((edittext) => !edittext)}>
              <img src={edit} alt="edit" height="13" /> {t("edit")}
            </button>{" "}
            <button className={!edittext ? "t4fbutton-gray" : "d-none"} onClick={(e) => (setEdittext((edittext) => !edittext), saveAboutusContent())}>
              Save
            </button>{" "}
          </p>
        </div>
        <div id="admin-customer-faq" class="">
          <div className="px-2">
            <div className={!edittext ? "col-lg-12 tab-content" : "d-none"}>
              Title
              <br />
              <input type="textbox" className="t4finput" aria-required="true" name="postcontent" />
              <br />
              Description
              <br />
              <input type="textarea" className="t4finput" aria-required="true" rows="8" cols="45" name="postcontent" />
            </div>
          </div>
          <div class="accordion" id="myAccordion1">
            <div class="accordion-item border-0">
              <h2 class="accordion-header border-bottom" id="headingOne1">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne1">
                  Heading 1 Merchant
                </button>
              </h2>
              <div id="collapseOne1" class="accordion-collapse collapse" data-bs-parent="#myAccordion1">
                <div class="card-body p-2">
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                </div>
              </div>
            </div>
            <div class="accordion-item border-0">
              <h2 class="accordion-header border-bottom" id="headingTwo1">
                <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo1">
                  Heading 2
                </button>
              </h2>
              <div id="collapseTwo1" class="accordion-collapse collapse show" data-bs-parent="#myAccordion1">
                <div class="card-body p-2">
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                </div>
              </div>
            </div>
            <div class="accordion-item border-0">
              <h2 class="accordion-header border-bottom" id="headingThree1">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree1">
                  Heading 3
                </button>
              </h2>
              <div id="collapseThree1" class="accordion-collapse collapse" data-bs-parent="#myAccordion1">
                <div class="card-body p-2">
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                  <span>FAQ description, description description description description description description description description description descriptionmdescriptionmdescriptionmdescriptionmdescriptionmdescriptionm </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant_FAQ;

import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import addblue from "../../../../../assets/icons/addblue.png";
import trash from "../../../../../assets/icons/trash.png";
import OfferAddSuccess from "../../../../../components/Common/OfferAddSuccess";
import Alert from "../../../../../components/Common/Alert";

const CreateOffer = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  //const dispatch = useDispatch();
  const handleChange1 = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange1 = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleSubmit = () => {};
  const categoryType = [{ value: "pizza", label: "Pizza" }];
  const subCategoryType = [
    { value: "veg", label: "Veg" },
    { value: "nonveg", label: "Non Veg" },
  ];
  const cusine = [
    { value: "southIndian", label: "South Indian" },
    { value: "northIndian", label: "North Indian" },
  ];
  const addons = [
    { value: "coke", label: "Coke" },
    { value: "sprite", label: "Sprite" },
    { value: "pepsi", label: "Pepsi" },
  ];

  const OfferSummary = () => {
    return (
      <div className=" p-2">
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">Enter Title</div>
          <AvField
            name="title"
            type="text"
            className="t4finput-sm w-100"
            id="title"
            validate={{
              required: true,
            }}
            errorMessage="Please enter title"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">Enter Description</div>
          <AvField
            name="des"
            type="text"
            className="t4finput-sm w-100"
            id="des"
            validate={{
              required: true,
            }}
            errorMessage="Please enter description"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Category Type</div>
          <Select options={categoryType} />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Sub Category Type</div>
          <Select options={subCategoryType} />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Select Cusine</div>
          <Select options={cusine} />
        </FormGroup>
        <div className="mb-2 font-weight-bold">
          Add Image
          <input type="file" accept="image/*" multiple="false" className="t4finput-sm w-100"></input>
        </div>

        <div>
          <button type="button" className="t4fbutton-gray w-75 ">
            <img src={addblue} alt="edit" height="16" className="pb-1" /> <b>Add Food Item List</b>
          </button>
        </div>
      </div>
    );
  };
  const Lists = () => {
    return (
      <div className=" p-2">
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">
            List 1 <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
          </div>
          <AvField
            name="foodname"
            type="text"
            className="t4finput-sm w-100"
            id="foodname"
            validate={{
              required: true,
            }}
            placeholder="Enter description"
            errorMessage="Please enter food name"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">
            {" "}
            <Link className="t4fbutton-tran">
              <img src={addblue} alt="edit" height="15" className="pb-1" /> Add Food Items
            </Link>
          </div>
        </FormGroup>

        <div id="variants" className="p-2 bg-light-gray">
          <div className="mb-2">
            <div className="d-flex justify-content-between font-weight-bold ">
              <div>Item</div>
              <div>Customisable</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                Reg Mexican Green Wave <Link className="t4fbutton-tran px-2">x</Link>
              </div>
              <div>
                <div class="form-check">
                  <span className="">
                    <input type="checkbox" id="fooditems" />
                    <label for="fooditems"></label>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                Reg Cheese Tomato <Link className="t4fbutton-tran px-2">x</Link>
              </div>
              <div>
                <div class="form-check">
                  <span className="">
                    <input type="checkbox" id="fooditems1" />
                    <label for="fooditems1"></label>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                Rg Onion Pizza <Link className="t4fbutton-tran px-2">x</Link>
              </div>
              <div>
                <div class="form-check">
                  <span className="">
                    <input type="checkbox" id="fooditems2" />
                    <label for="fooditems2"></label>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                Rg Onion Pizza <Link className="t4fbutton-tran px-2">x</Link>
              </div>
              <div>
                <div class="form-check">
                  <span className="">
                    <input type="checkbox" id="fooditems3" />
                    <label for="fooditems3"></label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          Select Button
          <div className="d-flex flex-row">
            <div className="buttonBox">
              <span className="t4fradio">
                <label>
                  <input type="radio" name="group1" />
                  <span></span>
                </label>
              </span>
            </div>

            <div className="mx-2 d-flex flex-row buttonBox2">
              <div>
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>
              <div>
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 ">
          <b> Customer Specification</b>
          <div>
            <div className="mt-1 d-flex flex-row">
              <div className="btn">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="px-2"> Mandatory/Optional</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const CustomiseItem = () => {
    return (
      <div className=" p-2">
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">Food Item Name</div>
          <AvField
            name="title"
            type="text"
            className="t4finput-sm w-100"
            id="title"
            validate={{
              required: true,
            }}
            errorMessage="Please enter title"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">Food Description</div>
          <AvField
            name="des"
            type="text"
            className="t4finput-sm w-100"
            id="des"
            validate={{
              required: true,
            }}
            errorMessage="Please enter description"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Customize Type</div>
          <Select options={categoryType} />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Select Variant</div>
          <Select options={subCategoryType} />
        </FormGroup>
        <div className="mb-1">Food Variants</div>
        <div id="variants" className="p-2 bg-light-gray">
          <div className="font-weight-bold mb-2">
            <div className="d-flex justify-content-between">
              <div>Base</div>
              <div>
                {" "}
                <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
              </div>
            </div>
          </div>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Description</div>
            <AvField name="desc" type="text" className="t4finput-sm w-100" id="desc" placeholder="You can choose only 1 option" />
          </FormGroup>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Food Item</div>
            <Select options={cusine} />
          </FormGroup>
          <div className="mb-2">
            Select Button
            <div className="d-flex flex-row">
              <div className="buttonBox">
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>

              <div className="mx-2 d-flex flex-row buttonBox2">
                <div>
                  <span className="t4fradio">
                    <label>
                      <input type="radio" name="group1" />
                      <span></span>
                    </label>
                  </span>
                </div>
                <div>
                  <span className="t4fradio">
                    <label>
                      <input type="radio" name="group1" />
                      <span></span>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 font-weight-bold">
            Customer Specification
            <div>
              <div className="mt-1 d-flex flex-row">
                <div className="btn">
                  <label className="switch">
                    <input type="checkbox" checked={true} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="px-2"> Mandatory/Optional</div>
              </div>
            </div>
          </div>
        </div>
        <div id="variants" className=" mt-3 p-2 bg-light-gray">
          <div className="font-weight-bold mb-2">
            <div className="d-flex justify-content-between">
              <div>Size</div>
              <div>
                {" "}
                <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
              </div>
            </div>
          </div>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Description</div>
            <AvField name="desc" type="text" className="t4finput-sm w-100" id="desc" placeholder="You can choose only 1 option" />
          </FormGroup>
          <FormGroup className="mb-2">
            <div className="mb-1"> Customize Food Item</div>
            <Select options={cusine} />
          </FormGroup>
          <div className="mb-2">
            Select Button
            <div className="d-flex flex-row">
              <div className="buttonBox">
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>

              <div className="mx-2 d-flex flex-row buttonBox2">
                <div>
                  <span className="t4fradio">
                    <label>
                      <input type="radio" name="group1" />
                      <span></span>
                    </label>
                  </span>
                </div>
                <div>
                  <span className="t4fradio">
                    <label>
                      <input type="radio" name="group1" />
                      <span></span>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 font-weight-bold">
            Customer Specification
            <div>
              <div className="mt-1 d-flex flex-row">
                <div className="btn">
                  <label className="switch">
                    <input type="checkbox" checked={true} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="px-2 font-weight-normal"> Mandatory/Optional</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2"></div>
      </div>
    );
  };
  const CustomiseType = () => {
    return (
      <div className=" p-2">
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold">
            Add-ons <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
          </div>
          <div className="mb-1 font-weight-bold">
            <img src={trash} alt="edit" height="18" className="pb-1" />{" "}
          </div>
          <AvField
            name="foodname"
            type="text"
            className="t4finput-sm w-100"
            id="foodname"
            validate={{
              required: true,
            }}
            placeholder="You can choose only 2 option"
            errorMessage="Please enter decription"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <div className="mb-1 font-weight-bold"> Add on food Item</div>
          <Select options={categoryType} isMulti />
        </FormGroup>
        <div className="mt-2">
          Select Button
          <div className="d-flex flex-row">
            <div className="buttonBox">
              <span className="t4fradio">
                <label>
                  <input type="radio" name="group1" />
                  <span></span>
                </label>
              </span>
            </div>

            <div className="mx-2 d-flex flex-row buttonBox2">
              <div>
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>
              <div>
                <span className="t4fradio">
                  <label>
                    <input type="radio" name="group1" />
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 ">
          <b> Customer Specification</b>
          <div>
            <div className="mt-1 d-flex flex-row">
              <div className="btn">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="px-2"> Mandatory/Optional</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2">
      <AvForm id="createFoodItem" className="form-horizontal text-color-gray" onSubmit={handleSubmit}>
        <div className="row mt-2 fullBorder">
          <div className="col-lg-3 rightBorder">
            <div className="fooditem_Header p-2">Offer Summary</div>
            <OfferSummary />
          </div>
          <div className="col-lg-3 rightBorder">
            <div className="fooditem_Header p-2 ">Food Item Lists</div>
            <Lists />
            <Lists />
          </div>
          <div className="col-lg-3 rightBorder">
            <div className="fooditem_Header p-2 ">Customize Item</div>
            <CustomiseItem />
          </div>
          <div className="col-lg-3 ">
            <div className="fooditem_Header p-2 ">Customize Type</div>
            <CustomiseType />
          </div>
        </div>
        <div className="p-3 bg-light-green">
          <span className="text-color-dgreen">
            <b>Total Price </b>
            <span className="font-weight-bold text-dark h5">
              <del>₹.950</del>
            </span>
          </span>
          <span className="px-3 text-color-dgreen">
            <b>Offer Price </b> <span className="font-weight-bold text-dark h5">₹.550</span>
          </span>
        </div>
        <div className="my-3">
          <button color="primary" className="t4fbutton-long m-1" type="submit">
            Save
          </button>
        </div>
      </AvForm>

      <div id="add-food-Item-success">
        <div className="mt-5">{!isLoaded ? <OfferAddSuccess /> : <Alert className="w-100" message="Please wait...." type="info" />}</div>
      </div>
    </div>
  );
};

export default CreateOffer;

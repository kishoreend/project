import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import clockcross from "../../../../../assets/icons/clockcross.png";

export default function ViewOfferDetails(props) {
  const offerDetails = props.offerDetails;
  const itemDetails = props.offerDetails.itemsLists;
  console.log("offerDetails", offerDetails);
  return (
    <div>
      <div className="fullBorder mb-2">
        <form action="#">
          <div className="headertitle p-2">{offerDetails.title}</div>
          <div className="row">
            {itemDetails &&
              Object.keys(itemDetails).map((list) => (
                <div className="col-lg-4 p-2">
                  <div className="heading_white_bg p-2">{list}</div>
                  <div className="lightgray_bg p-2">
                    {itemDetails[list]?.map((foodItem) => (
                      <div className="bottomborder py-2">
                        <div className="d-flex justify-content-between">
                          <div>{foodItem.itemName}</div>
                          <div className="t4fradio">
                            <label>
                              <input type="radio" name="group1" />
                              <span></span>
                            </label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <b>{"₹ "}{foodItem.offerPrice}</b>
                          </div>
                          {/* <div>Customisable</div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

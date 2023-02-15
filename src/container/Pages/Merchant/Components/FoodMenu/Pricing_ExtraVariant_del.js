import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import clockcross from "../../../../../assets/icons/clockcross.png";
import ViewOfferDetails from "./ViewOfferDetails";
import { Link, useHistory } from "react-router-dom";

export default function Pricing_ExtraVariant() {
  const [toggle, setToggle] = React.useState(false);
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "#",
        field: "id",
        width: 1,
        sort: "disabled",
      },
      {
        label: "Category",
        field: "name",
        width: 350,
      },
      {
        label: "Subcaetegory",
        field: "salary",
        width: 100,
      },
      {
        label: "Fooditem",
        field: "salary",
        width: 100,
      },
      {
        label: "Extra Variant",
        field: "name",
        width: 100,
      },
      {
        label: "Price",
        field: "salary",
        width: 100,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: [
      {
        id: 1,
        name: "Pizza",

        office: "Edinburgh",
        age: "Offer",
        salary: "₹320",
        actions: (
          <>
            <div>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      },
      {
        id: 2,
        name: "Pizza",

        office: "Edinburgh",
        age: "Offer",
        date: "2011/04/25",
        salary: "₹320",
        actions: (
          <>
            <div>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      },
      {
        id: 3,
        name: "Pizza",
        office: "Edinburgh",
        age: "Offer",
        date: "2011/04/25",
        salary: "₹320",
        actions: (
          <>
            <div>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      },
      {
        id: 4,
        name: "Pizza",

        office: "Edinburgh",
        age: "Offer",
        date: "2011/04/25",
        salary: "₹320",
        actions: (
          <>
            <div>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      },
      {
        id: 5,
        name: "Pizza",

        office: "Edinburgh",
        age: "Offer",
        date: "2011/04/25",
        salary: "₹320",
        actions: (
          <>
            <div>
              <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      },
    ],
  });

  return (
    <div>
      <div id="view-offer-list">
        <MDBDataTableV5 entriesOptions={[10]} disableRetreatAfterSorting={true} entries={10} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
      </div>
    </div>
  );
}

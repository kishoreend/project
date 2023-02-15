import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import eye from "../../../../../assets/icons/eye.png";
import hide from "../../../../../assets/icons/hide.png";
import deleteicon from "../../../../../assets/icons/delete.png";
import edit from "../../../../../assets/icons/edit.png";
import add from "../../../../../assets/icons/add.png";
import clockcross from "../../../../../assets/icons/clockcross.png";
import Alert from "../../../../../components/Common/Alert";
import { postData, getData, reduxGetData, reduxPostData, callApi } from "../../../../../ServiceCall";
import * as merchantActionTypes from "../../../../../store/authentication/merchant/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import ViewOfferDetails from "./ViewOfferDetails";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FoodItemPricing() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const foodstallid = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId);
  const isFoodItemAdded = useSelector((state) => state.merchant.isFoodItemAdded);
  const [editable, setEditable] = useState(null);
  const [updateValue, setUpdateValue] = useState(null);
  const [combinedUpdateValue, setCombinedUpdateValue] = useState(null);
  const [file, setFile] = useState(null);

  const [toggle, setToggle] = React.useState(false);
  const [pricing, setPricing] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  //const [datatable, setDatatable] = React.useState(_datatable);

  const datatable = {
    columns: [
      {
        label: "#",
        field: "index",
        width: 1,
        sort: "disabled",
      },
      {
        label: t("category"),
        field: "category",
        width: 350,
      },
      {
        label: t("sub_category"),
        field: "subCategory",
        width: 100,
      },
      {
        label: t("Fooditem"),
        field: "foodItemName",
        width: 100,
      },
      {
        label: t("combination"),
        field: "combination",
        width: 100,
      },
      // {
      //   label: "",
      //   field: "combinationPrice",
      //   width: 100,
      // },
      {
        label: t("price"),
        field: "price",
        width: 100,
      },
      {
        label: t("actions"),
        field: "actions",
        sort: "disabled",
        width: 100,
      },
    ],
    rows:
      pricing &&
      pricing?.sort((a, b) => a.id < b.id) &&
      pricing.map((obj, index) => ({
        id: obj.id,
        index: index + 1,
        category: obj.category,
        subCategory: obj.subCategory,
        foodItemName: obj.foodItemName,
        combination: obj.combination?.replaceAll("##", " "),
        //combinationPrice: (obj.id === editable || obj.id === 0) && !obj.baseItem ? <input name="combinationPrice" type="number" className="t4finput-sm" id="combinationPrice" defaultValue={obj.combinationPrice} onChange={(e) => setCombinedUpdateValue(e.target.value)} /> : obj.combinationPrice,
        //price: obj.price,
        // price: !obj.baseItem ? (obj.id === editable || obj.id === 0) && !obj.baseItem ? <input name="combinationPrice" type="number" className="t4finput-sm" id="combinationPrice" defaultValue={obj.combinationPrice} onChange={(e) => setCombinedUpdateValue(e.target.value)} /> : obj.combinationPrice : (obj.id === editable || obj.id === 0) && obj.baseItem ? <input name="price" type="number" className="t4finput-sm" id="category" defaultValue={obj.price} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.price,
        price: obj.id === editable || obj.id === 0 ? <input name="price" type="number" className="t4finput-sm" id="category" defaultValue={obj.price} onChange={(e) => setUpdateValue(e.target.value)} /> : obj.price,

        actions: (
          <>
            <div className={obj.id === editable || obj.id === 0 ? "edit" : "d-none"}>
              <button type="button" className="t4fbutton-long" onClick={(e) => updatePricing(obj.id, updateValue, index)}>
                Update
              </button>
            </div>
            <div className={obj.id !== editable && obj.id !== 0 ? "edit" : "d-none"}>
              {/* <button className="t4fbutton-gray" to="#">
                <img src={clockcross} alt="clock" height="15" />{" "}
              </button>
              <button className="t4fbutton-gray" to="#">
                <img src={hide} alt="hide" height="15" />{" "}
              </button> */}

              <button className="t4fbutton-gray" onClick={(e) => (setEditable(obj.id), setMessage(""))}>
                <img src={edit} alt="edit" height="15" />{" "}
              </button>
            </div>
          </>
        ),
      })),
  };

  const downloadPricingData = () => {
    console.log(foodstallid);
    callApi('/api/menu/download-fooditems-pricing-details?fs-id=' + foodstallid)
    .then(res => {
      console.log(res)
      const fileName = 'fooditem-pricing-details-' + foodstallid + '-' + new Date().getTime();
      downloadBlob(res.data, fileName, 'csv');
    })
  }

  function downloadBlob(blob, filename,ext) {
    // Create an object URL for the blob object
    console.info(GetMineType(ext));
    const url = URL.createObjectURL(new Blob([blob],{type: `${GetMineType(ext)}`}));
  
    // Create a new anchor element
    const a = document.createElement('a');
  
    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href = url;
    a.download = filename || 'download';
  
    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    a.click();
  }
  
  //for mime type you can also use any package
  const  GetMineType =(extension)=>{
      switch (extension.toLowerCase())
      {          
          case "csv": return "text/csv";
          case "cur": return "application/octet-stream";
          case "cxx": return "text/plain";
          case "dat": return "application/octet-stream";
          case "datasource": return "application/xml";
          case "dbproj": return "text/plain";
          case "dcr": return "application/x-director";
         case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          case "dot": return "application/msword";
          case "jpb": return "application/octet-stream";
          case "jpe": return "image/jpeg";
          case "jpeg": return "image/jpeg";
          case "jpg": return "image/jpeg";
          //etc ......
          
        }
  }

  const onFileUpload = () => {

    console.log('onFileupload....')

    if(file == null)
      return;
     
    // Create an object of formData
    const formData = new FormData();
   
    // Update the formData object
    formData.append("file", file);
   
    // Details of the uploaded file
    console.log(file.size);
   
    // Request made to the backend api
    // Send formData object
    reduxPostData('/api/menu/upload-fooditems-pricing-details?fs-id=' + foodstallid, formData, 'merchant', true)
    .then(res => {
      console.log(res)
    })
  };

  const updatePricing = (id, price, index) => {
    //console.log("inside update", baseItem, combinationPrice, price);
    if (price !== null) {
      updatePricing_({ price: price, id: id });
    }

    setUpdateValue(null);
    setEditable(null);
  };

  const updatePricing_ = (data) => {
    console.log(data);
    console.log("inside pricing update", data);
    setIsLoaded((isLoaded) => !isLoaded);
    let validationMessage = "";
    let type = "";
    let url = "";
    //if (baseItem) {
    url = "/api/menu/update-fooditem-price?fs-id=" + foodstallid + "&price=" + data.price + "&pricing-id=" + data.id + "";
    // } else {
    //   url = "/api/menu/update-fooditem-price?fs-id=" + foodstallid + "&price=" + data.combinationPrice + "&pricing-id=" + data.id + "";
    // }
    const result = reduxPostData(url, "merchant", "post")
      .then((response) => {
        if (response.status === 200) {
          // validationMessage = response.data.data;
          validationMessage = "Pricing Updated Sucessfully";
          console.log(response);
          dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: true });
          type = "success";
          setSuccess((success) => !success);
        }
      })
      .catch((err) => {
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
        //dispatch({ type: merchantActionTypes.UPDATE_CATEGORY_FAILED, payload: validationMessage });
        type = "danger";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(type);
  };

  useEffect(() => {
    console.log("Enter Pricing Page");
    getPricing();
  }, [foodstallid, success, isFoodItemAdded]);
  const getPricing = async () => {
    let validationMessage = "";

    let messageType = "";
    setIsLoaded((isLoaded) => !isLoaded);
    const response = await reduxGetData(`/api/menu/get-fooditems-pricing-details?fs-id=${foodstallid}`, "get", "merchant")
      .then((response) => {
        if (response.status === 200 && response.data.status != "Error") {
          console.log("get 200 getPricing", response);
          setPricing(response.data?.data);
          // validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
        } else if (response.status === "Error") {
          setPricing([]);
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        setPricing([]);
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    dispatch({ type: merchantActionTypes.UPDATE_FOOD_ITEMS_MENU, payload: false });
  };

  return (
    <div className="px-3">
      {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}
      <div className="pull-right">
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <a href="#upload" className="btn btn-danger" style={{color: "white",width:"58px",marginRight:"1vh"}} onClick={() => onFileUpload()}>Upload</a> &nbsp;
        <a href="#download" className="btn btn-danger" style={{color: "white",width:"70px",marginRight:"1vh"}} onClick={downloadPricingData}>Download</a>
      </div>
      
      <div id="view-offer-list">
        <MDBDataTableV5 entriesOptions={[10]} entries={10} disableRetreatAfterSorting={true} pagesAmount={4} data={datatable} pagingTop={false} searchTop searchBottom={false} barReverse />
      </div>
      <div className="pull-right">
      
        {" "}
      </div>
    </div>
  );
}

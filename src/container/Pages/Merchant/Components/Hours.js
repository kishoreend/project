import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, Input } from "reactstrap";
import { AvForm, AvField, AvCheckbox, AvCheckboxGroup, AvGroup, AvInput } from "availity-reactstrap-validation";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Common/Alert";
import close from "../../../../assets/icons/close.png";
import downarrow from "../../../../assets/icons/downarrow.png";
import Timekeeper from "react-timekeeper";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetData, reduxPostData } from "../../../../ServiceCall";
import Select from "react-select";
import TimePicker from "rc-time-picker";
import moment from "moment";
import * as merchantActionTypes from "../../../../store/authentication/merchant/actionTypes";
import "rc-time-picker/assets/index.css";
import config from '../../../app/navigation.json'

const Hours = (props) => {
  console.log('hours', props);
  const { t } = useTranslation();
  const uniqueNumber = useSelector((state) => state.merchant.merchants.uniqueNumber);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentFoodstallID = useSelector((state) => state.merchant.currentFoodstallDetail.foodStallId) || 0;
  const currentFoodstall = useSelector((state) => state.merchant.currentFoodstallDetail);
  const Shophours = [
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Monday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Tuesday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Wednesday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Thursday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Friday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Saturday" },
    { closeTime: "", closed: false, openTime: "", foodStallId: currentFoodstallID, opened24Hours: false, weekDayName: "Sunday" },
  ];

  const [currentFoodstallTiming, setTimings] = useState(props.foodstallTimings.length === 7? props.foodstallTimings : Shophours);

  const updateTimings = (timings) => {
    props.updateTimings(timings);
  } 

  console.log(currentFoodstallTiming, "immediate");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const [sindex, setSIndex] = React.useState(-1);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [add, setAdd] = useState(null);

  // set value for default selection
  const [selectedOpenTime, setselectedOpenTime] = useState(0);
  const [selectedCloseTime, setselectedCloseTime] = useState(0);
  const format = "hh:mm A";
  // handle onChange event of the dropdown
  const handleChangeTime = (index, e, data) => {
    console.log(e, "handel time");
    return (dispatch, getState) => {
      const values = [...currentFoodstallTiming];
      console.log(index);
      if (data == "openTime") {
        values[index]["openTime"] = e != null ? e.format(format).toString() : "";
        // setselectedOpenTime(e.format(format));
      }
      if (data == "closeTime") {
        values[index]["closeTime"] = e != null ? e.format(format).toString() : "";
        //  setselectedCloseTime(e.format(format));
      }
      dispatch({ type: merchantActionTypes.UPDATE_FOODSTALL_TIMING_SUCCESS, payload: values });
      console.log(getState());
    };
    console.log(currentFoodstallTiming, "data hours");
  };

  useEffect(() => {
    console.log("Hours");
    // dispatch(getFoodstallHours());
    getFoodstallTimings();
    console.log(currentFoodstallID, "currentFoodstallID");
    console.log(currentFoodstallTiming, "in useeeffct");
    // currentFoodstallTiming = tempTimings? tempTimings : Shophours;
  }, []);


  const getFoodstallTimings = async () => {

    const response = await reduxGetData(`/api/foodstall/${currentFoodstallID}/get-foodstall-timings`, "get", "merchant")
        .then((response) => {
        
          console.log(response.data.data);
          if(response.data.data && response.data.data.days.length === 7){
            setTimings(response.data.data.days);
          }
          
        });
  }

  const handleSubmit = (event, errors, values) => async (dispatch, getState) => {
    console.log(errors);
    if (errors?.length == 0) {
      console.log(currentFoodstallTiming);
      console.log(JSON.stringify(currentFoodstallTiming));
      console.log(values);
      add ? addFoodstallTimings() : updateFoodstallTimings();
    }
  };

  const handleChange = (index, e) => {
    return (dispatch, getState) => {
      const values = [...currentFoodstallTiming];
      console.log(values);
      // closed and opened24Hours are checkbox field
      // so need to get value from checked instead of value
      if (e.target.name === "closed" || e.target.name === "opened24Hours") {
        values[index][e.target.name] = e.target.checked;
        if (e.target.checked == true) {
          console.log("index", index);
          setSIndex(index);
          setDisabled(true);
          if(e.target.name === "closed"){
            values[index]['opened24Hours'] = false;
            values[index]['openTime'] = "";
            values[index]['closeTime'] = "";
          }
          if(e.target.name === "opened24Hours"){
            values[index]['closed'] = false;
            values[index]['openTime'] = "";
            values[index]['closeTime'] = "";
          }
        } else {
          setSIndex(index);
          setEnabled(false);
        }
      } else {
        values[index]['opened24Hours'] = false;
        values[index]['closed'] = false;
        console.log(e.target.value);
        values[index][e.target.name] = e.target.value;
      }
      dispatch({ type: merchantActionTypes.UPDATE_FOODSTALL_TIMING_SUCCESS, payload: values });
      console.log(getState());
      console.log(values);
    };
    // console.log(getState.state.merchant.currentFoodstallTiming, "data hours");
  };

  const updateFoodstallTimings = async () => {

    let validationMessage = "";
    let messageType = "";
    console.log(" updateFoodstallTimings Entered");
    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/foodstall/${currentFoodstallID}/update-foodstall-timings`, currentFoodstallTiming, "merchant", false, "put")
      .then((response) => {
        console.log("updateFoodstallTimings", response);
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          validationMessage = response.data.status;
          messageType = "success";
          // setDataHours(response.data.data);
          updateTimings(currentFoodstallTiming);
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err.response);
        messageType = "danger";
        validationMessage = err.response?.data?.error || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    // if(props.role != 'admin'){
    //   history.push(config.merchanturl.MyProfile);
    // } 
    setInterval(function(){
      window.location.reload(false);
    }, 2000);     
  };

  const addFoodstallTimings = async () => {
    let validationMessage = "";
    let messageType = "";
    console.log("addFoodstallTimings Entered");

    setIsLoaded((isLoaded) => !isLoaded);
    //dispatch({ type: SIGN_UP_INIT });
    const response = await reduxPostData(`/api/foodstall/${currentFoodstallID}/add-foodstall-timings`, currentFoodstallTiming, "merchant")
      .then((response) => {
        console.log("addFoodstallTimings", response);
        if (response.status === 200) {
          // dispatch({ type: SIGN_UP_SUCCESSFUL, payload: signUpDetails });
          // setDataHours(response.data.data);
          validationMessage = response.data.status;
          messageType = "success";
          console.log(response);
          updateTimings(currentFoodstallTiming);
        } else {
          // dispatch({ type: SIGN_UP_FAILED, payload: response.data.error });
          validationMessage = response.data.error;
          messageType = "danger";
        }
      })
      .catch((err) => {
        console.log("failure", err);
        messageType = "danger";
        validationMessage = err.response?.data?.errorMessage || "Something went wrong, Please try again later";
      });
    setIsLoaded((isLoaded) => !isLoaded);
    setMessage(validationMessage);
    setType(messageType);
    
    // if(props.role != 'admin'){
    //   history.push(config.merchanturl.MyProfile);
    // }
    
    setInterval(function(){
      window.location.reload(false);
    }, 2000);  
  };
  return (
    <div>
      <div className=" hour modal-content">
        <div className="modal-header t4h-color-gray">
          <h6>Hours </h6>
          {!isLoaded ? <Alert message={message} type={type} /> : <Alert message="Please wait...." type="info" />}

          <a data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
              <img src={close} alt="close" height="16" />
            </span>
          </a>
        </div>
        <div className="modal-body">
        {/* {JSON.stringify(currentFoodstallTiming)} */}
          <AvForm onSubmit={dispatch(handleSubmit)}>
            {currentFoodstallTiming &&
              currentFoodstallTiming.length > 0 &&
              currentFoodstallTiming.map((hour, index) => (
               
                <div className="row align-items-center bottomborder" key={index}>
                   
                  <div className="py-1 col" value={hour.weekDayName}>
                    {t(hour.weekDayName)}
                  </div>
                  <div className="p-1 col ">
                    <div>
                      <AvGroup inline name="opened24Hours" className="text-nowrap" key={index}>
                        <AvInput
                          type="checkbox"
                          className="t4finput-check text-nowrap"
                          label="Open 24Hours"
                          name="opened24Hours"
                          id="opened24Hours"
                          checked={hour.opened24Hours}
                          onChange={(e) => dispatch(handleChange(index, e))}

                          // checked={(e) => setDataHours(dataHours.map((d) => { d.opened24Hours = (d.weekDayName === hour.weekDayName) && e.tartget.value }))}
                        />
                        Open 24Hours
                      </AvGroup>

                      {/* <div class="form-check">
                      <input type="checkbox" id={index + "opened24Hours"} checked={hour.opened24Hours} onChange={(e) => handleChange(index, e)} />
                      <label for={index + "opened24Hours"}>Open 24Hours</label>
                    </div> */}
                    </div>
                  </div>
                  <div className="p-1 col text-nowrap ">
                    <AvGroup inline name="closed" label="" key={index}>
                      <AvInput type="checkbox" label="closed" name="closed" id={index + "closed"} className="t4finput-check" checked={hour.closed} onChange={(e) => dispatch(handleChange(index, e))} />
                      {t('closed')}
                    </AvGroup>
                  </div>
                  <div className="p-1 col">
                    <FormGroup className="mb-2">
                      {/* <AvField name="openTime" type="text" disabled={disable} className="t4finput-sm2" id="opentime" placeholder="Open Time" value={hour.openTime} onChange={(e) => handleChange(index, e)} /> */}
                      {/* <Select name="openTime" isDisabled={disable} options={drpTime} value={drpTime.find((obj) => obj.value === selectedOpenTime)} onChange={(e) => handleChangeTime(index, e, "openTime")}></Select> */}
                      {/* <div className="position-absolute">{selectedOpenTime == 0 ? (hour.openTime == "" ? "OpenTime" : hour.openTime) : selectedOpenTime}</div> */}

                      {/* <TimePicker defaultValue={hour.openTime} name="openTime" showSecond={false} allowEmpty={true} minuteStep={15} className="" onChange={(e) => dispatch(handleChangeTime(index, e, "openTime"))} format={format} use12Hours inputReadOnly={false}></TimePicker> */}
                      {/* <input type="time" name="openTime" disabled={index == sindex ? disabled : enabled} className="t4finput-sm2" onChange={(e) => dispatch(handleChange(index, e))} value={hour.openTime} /> */}
                      <input type="time" name="openTime" className="t4finput-sm2" onChange={(e) => dispatch(handleChange(index, e))} value={hour.openTime} />
                    </FormGroup>
                  </div>
                  <div className="p-1 col d-flex align-items-center">
                    <FormGroup className="mb-2">
                      {/* <AvField name="openTime" type="text" disabled={disable} className="t4finput-sm2" id="opentime" placeholder="Open Time" value={hour.openTime} onChange={(e) => handleChange(index, e)} /> */}
                      {/* <Select name="openTime" isDisabled={disable} options={drpTime} value={drpTime.find((obj) => obj.value === selectedOpenTime)} onChange={(e) => handleChangeTime(index, e, "openTime")}></Select> */}
                      {/* <div className="position-absolute">{selectedCloseTime == 0 ? (hour.closeTime == "" ? "CloseTime" : hour.closeTime) : selectedCloseTime}</div> */}

                      {/* <TimePicker defaultValue={hour.closeTime} name="closeTime" showSecond={false} allowEmpty={true} minuteStep={15} className="" onChange={(e) => dispatch(handleChangeTime(index, e, "closeTime"))} format={format} use12Hours inputReadOnly={false}></TimePicker> */}
                      <input type="time" name="closeTime" className="t4finput-sm2" onChange={(e) => dispatch(handleChange(index, e))} value={hour.closeTime} />
                    </FormGroup>
                  </div>
                </div>
              ))}
            <div className="mt-4">
              <button color="primary" className="t4fbutton-long" type="submit">
                {!isLoaded ? "Save" : "Please Wait..."}
                {/* {!isLoaded ? t("submit") : <Loading />} */}
              </button>
            </div>
          </AvForm>
        </div>
      </div>
    </div>
  );
};

export default Hours;
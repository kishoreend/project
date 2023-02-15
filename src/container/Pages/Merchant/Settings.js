import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import Switch from "react-switch";
import { ButtonGroup } from "reactstrap";
import { ToggleButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { callApi, postData } from "../../../ServiceCall";

const Settings = () => {
  const { t } = useTranslation();

  const [adminNotif, setAdminNotif] = useState(false);
  const [subscriptionNotif, setSubscriptionNotif] = useState(false);
  const [ordersNotif, setOrdersNotif] = useState(false);
  const [remainderNotif, setRemainderNotif] = useState(false);
  const merchantData = useSelector((state) => state.merchant.merchants);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [tax, setTax] = useState(0);
  const [taxSaveMsg, setTaxSaveMsg] = useState('');

  console.log(merchantData);

  const radios = [
    {
      value: "Manual",
      name: "Manual Print",
    },
    {
      value: "Auto",
      name: "Auto Print",
    },
  ];

  const [printOption, setPrintOption] = useState("Manual");

  useEffect(() => {
    setSettingsSaved(false);
    getSettings();
    getTax();
  }, [settingsSaved]);

  const getTax = async () => {
    const fsId = merchantData.foodStalls[0].foodStallId;

    console.log('FS_ID', fsId);
    await callApi("/api/foodstall/" + fsId + "/get-tax").then(res => {
      console.log(res.data);
      setTax(res.data.data.tax);
    })
  }

  const getSettings = async () => {
    const merchantId = merchantData.uniqueNumber;

    await callApi("/api/merchant/" + merchantId + "/getSettings").then(
      (res) => {
        console.log(res);
        setAdminNotif(res.data.data.adminNotification);
        setOrdersNotif(res.data.data.orderNotifications);
        setPrintOption(res.data.data.printType);
        setRemainderNotif(res.data.data.remainderNotifications);
        setSubscriptionNotif(res.data.data.subscriptionNotifications);
      }
    );
  };

  const saveSettings = (key) => {
    const merchantId = merchantData.uniqueNumber;
    const data = {
      merchantId: merchantId
    };

    postData("/api/merchant/saveSettings?key=" + key, data, "MERCHANT", "POST").then(
      (res) => {
        console.log(res);
        setSettingsSaved(true);
      }
    );
  };

  const setNewTaxVal = (e) => {
    setTaxSaveMsg('');
    setTax(e.target.value);
  }

  const saveTax = () => {
    setTaxSaveMsg('Updating....');
    if (tax > 0) {
      const fsId = merchantData.foodStalls[0].foodStallId;

      callApi("/api/foodstall/" + fsId + "/update-tax/" + tax, 'PUT')
        .then(res => {
          getTax();
        });

      setTaxSaveMsg('Updated');
    } else {
      setTaxSaveMsg('Invalid Tax vaue');
    }
  }
  return (
    <div>
      <SideNavBar id={13} />
      <div className="merchange-content">
        <Header title={"Settings"} />
        <div
          style={{ paddingLeft: "2%", paddingBottom: "3%", height: "700px" }}
        >
          <div
            style={{ margin: "2%", backgroundColor: "white", padding: "1%", height: '600px' }}
          >
            <div style={{ color: "#16458d", fontWeight: "bolder" }}>
              Notifications
            </div>
            <div
              style={{
                margin: "1%",
                backgroundColor: "#f3f3f3",
                padding: "1%",
              }}
            >
              <div className="row">
                <div className="col-md-4">
                  <span
                    style={{
                      marginRight: "5%",
                      fontSize: "16px",
                      paddingBottom: "10px",
                    }}
                  >
                    Admin notifications{" "}
                  </span>
                </div>
                <div className="col-md-2">
                  <Switch
                    onChange={() => {
                      setAdminNotif(!adminNotif);
                      saveSettings("ADMIN_NOTIF");
                    }}
                    checked={adminNotif}
                    className="react-switch"
                    id="toggle-switch"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <span
                    style={{
                      marginRight: "5%",
                      fontSize: "16px",
                      paddingBottom: "10px",
                    }}
                  >
                    Subscription notifications{" "}
                  </span>
                </div>
                <div className="col-md-2">
                  <Switch
                    onChange={() => {
                      setSubscriptionNotif(!subscriptionNotif);
                      saveSettings("SUB_NOTIF");
                    }}
                    checked={subscriptionNotif}
                    className="react-switch"
                    id="toggle-switch"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <span
                    style={{
                      marginRight: "5%",
                      fontSize: "16px",
                      paddingBottom: "10px",
                    }}
                  >
                    Orders notifications{" "}
                  </span>
                </div>
                <div className="col-md-2">
                  <Switch
                    onChange={() => {
                      setOrdersNotif(!ordersNotif);
                      saveSettings("ORDER_NOTIF");
                    }}
                    checked={ordersNotif}
                    className="react-switch"
                    id="toggle-switch"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <span
                    style={{
                      marginRight: "5%",
                      fontSize: "16px",
                      paddingBottom: "10px",
                    }}
                  >
                    Reminder notifications{" "}
                  </span>
                </div>
                <div className="col-md-2">
                  <Switch
                    onChange={() => {
                      setRemainderNotif(!remainderNotif);
                      saveSettings("REMAINDER_NOTIF");
                    }}
                    checked={remainderNotif}
                    className="react-switch"
                    id="toggle-switch"
                  />
                </div>
              </div>
            </div>

            <div style={{ color: "#16458d", fontWeight: "bolder" }}>Print</div>
            <div
              style={{
                margin: "1%",
                backgroundColor: "#f3f3f3",
                padding: "1%",
              }}
            >
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-success"
                    name="radio"
                    value={radio.value}
                    checked={printOption === radio.value}
                    onChange={(e) => {
                      setPrintOption(e.currentTarget.value);
                      saveSettings("PRINT");
                    }}
                  >
                    {" " + radio.name + " "}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
            <div style={{ color: "#16458d", fontWeight: "bolder" }}>Tax </div>
            <div
              style={{
                margin: "1%",
                backgroundColor: "#f3f3f3",
                padding: "1%",
              }}
            >
              Tax Slab(%) :<input type="number" value={tax} onChange={e => setNewTaxVal(e)} style={{ marginRight: '20px', paddingLeft: '10px', width: '50px' }} />

              {taxSaveMsg == '' ? (
                <button className="btn btn-success" sm style={{ color: 'white' }} onClick={saveTax}>Save</button>
              ) :
                taxSaveMsg}

            </div>
            <div
              style={{
                marginTop: "-2%",
                marginLeft: "1%",
                marginRight: "1%",
                backgroundColor: "#f3f3f3",
                padding: "1%",
              }}
            >
              <span>CGST : {tax / 2}%</span>
              <br />
              <span> SGST : {tax / 2}%</span>
            </div>
          </div>
        </div>
        <footer className="merchange-footer">
          {" "}
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Settings;

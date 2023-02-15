import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import config from "../../../container/app/navigation.json";
import { callApi } from "../../../ServiceCall";
const AboutUs = () => {

  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('In about');
    getContent();
  }, [])

  const getContent = () => {
    callApi('/api/customer/getAboutData')
    .then(res => {
      console.log(res);
      setContent(res.data.data.description);
    })
  }

  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={1} />
            <div className="mobile_header_gray p-2">
              <span>
                <b>About us</b>
              </span>
            </div>

            <div className="mobilecontainer p-2">
              <p dangerouslySetInnerHTML={{__html: content}}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import config from "../../../container/app/navigation.json";

const HowSiteWorks = () => {
  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={2} />
            <div className="mobile_header_gray p-2">
              <span>
                <b>How Site Works</b>
              </span>
            </div>

            <div className="mobilecontainer p-2">
              <div className="roundborder">
                <video
                  width="320"
                  height="200"
                  className="roundborder w-100 mt-2"
                  controls
                >
                  <source src="#" type="video/mp4" />
                </video>
              </div>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in
                massa egestas mollis varius; dignissim elementum. Mollis
                tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
                Hendrerit parturient habitant pharetra rutrum gravida porttitor
                eros feugiat. Mollis elit sodales taciti duis praesent id.
                Consequat urna vitae morbi nunc congue.Non etiam tempor id arcu
                magna ante eget. Nec per posuere cubilia cras porttitor
                condimentum orci suscipit. Leo maecenas in tristique, himenaeos
                elementum placerat. Taciti rutrum nostra, eget cursus velit
                ultricies. Quam molestie tellus himenaeos cubilia congue vivamus
                ultricies. Interdum praesent ut penatibus fames eros ad
                consectetur sed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowSiteWorks;

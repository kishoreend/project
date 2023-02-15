import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import hand from "../../../assets/icons/hand.png";
import diamond from "../../../assets/icons/diamond.png";
import star from "../../../assets/icons/star.png";
import crown from "../../../assets/icons/crown.png";
import back from "../../../assets/icons/back-arrow.png";
import config from "../../../container/app/navigation.json";
const SubscriptionDes = (props) => {
  const { t } = useTranslation();
  //let title = t("my_profile");
  let title = "Monthly Subscription";
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);

  useEffect(() => {}, [setActiveTab]);

  return (
    <div>
      <SideNavBar id={2} />

      <div className="merchange-content">
        <Header title={title} />
        <div className="mx-2">
          <div className="p-3 px-4 d-flex w-100 bg-white shadow heightfull justify-content-center">
            <div className="w-100">
              <div>
                {" "}
                <Link to={config.merchanturl.Subscription}>
                  {" "}
                  <img src={back} height="10"></img>
                </Link>
              </div>
              <div className="row p-1 mb-2 ">
                <div className="col-sm-12 p-3 border rounded lightgray">
                  <div className="row">
                    <div className="col-sm-1 px-2 ">
                      <img src={crown} height="50"></img>
                    </div>
                    <div className="col-sm-10 px-1">
                      <span>
                        <h5 className="text-color-dgreen">Monthly</h5>
                      </span>

                      <div>
                        <span className="font-weight-bold">₹ 1000</span>
                      </div>
                    </div>
                  </div>
                  <span></span>
                </div>
              </div>
              <div className="d-flex p-2 row justify-content-between">
                <p>Lorem ipsum odor amet Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius; dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare. Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.</p>
                <p>Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra, eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies. Interdum praesent ut penatibus fames eros ad consectetur sed. Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra, eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies. Interdum praesent ut penatibus fames eros ad consectetur sed.</p>
                <p>
                  <ul className="font-weight-bold px-3">
                    <li>Lorem ipsum odor amet Lorem ipsum odor amet, consectetuer adipiscing elit. Ac? </li>
                    <li>Lorem ipsum odor amet Lorem ipsum odor amet, consectetuer ? </li>
                    <li>Lorem ipsum odor amet Lorem ipsum odor amet, consectetuer adipiscing elit. Ac? </li>
                    <li>Lorem ipsum odor amet Lorem ipsum odor amet, consectetuer adipiscing ?</li>
                    <li>Lorem ipsum odor amet Lorem ipsum odor amet, consectet? </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="py-3 px-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionDes;

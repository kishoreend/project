import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import edit from "../../../assets/icons/edit.png";
import JoditEditor from "jodit-react";
import { callApi, reduxGetData, reduxPostData } from "../../../ServiceCall";
const TermsAndConditions = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const config_ = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const editor = useRef(null);
  const [content, setContent] = useState("Content here");
  const [contentnew, setContentnew] = useState("Please contact Tap4food Admin to add Terms and Condition for your Food stall.");
  const [edittext, setEdittext] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getTermsAndConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTermsAndConditions = async () => {
    
    const termsNConditionsResponse = await callApi('/api/admin/getTnC');

    console.log(termsNConditionsResponse)

    setContent(termsNConditionsResponse.data.data.description);
    setContentnew(termsNConditionsResponse.data.data.description);

  };
  
  return (
    <div>
      <SideNavBar id={11} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={t("terms_and_conditions")} />

        <div className="mx-2">
          <div className="p-3 bg-white shadow">
            
            <div className="admin_aboutus">
              <div>
                <div className="row">
                  
                  <div className={edittext ? "col-lg-12 tab-content" : "d-none"}>
                    <div dangerouslySetInnerHTML={{ __html: contentnew }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="py-3 px-2">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

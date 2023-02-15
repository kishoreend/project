import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/VerticalLayout/Header";
import SideNavBar from "../../../components/VerticalLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import edit from "../../../assets/icons/edit.png";
import JoditEditor from "jodit-react";
import { callApi, postData, reduxGetData, reduxPostData } from "../../../ServiceCall";
const Admin_AboutUs = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const config_ = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [contentnew, setContentnew] = useState("");
  const [edittext, setEdittext] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getAboutusContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const getAboutusContent = async () => {

    const aboutUsContentResponse = await callApi('/api/admin/get-aboutus-content');

    console.log(aboutUsContentResponse)

    setContent(aboutUsContentResponse.data?.data?.description);
    setContentnew(aboutUsContentResponse.data?.data?.description);

  }

  const saveAboutUsContent = async () => {
    console.log(contentnew);

    const requestBody = {
      description: contentnew
    }

    const apiResponse = await postData('/api/admin/update-aboutus-content', requestBody, 'ADMIN', 'POST');

  }

  return (
    <div>
      <SideNavBar id={1} role={"admin"} />

      <div id="dashboard-container" className="merchange-content">
        <Header title={"About Us"} role={"admin"} />
        <div className="mx-2">
          <div className="p-3 bg-white shadow">
            <div className="d-flex justify-content-end">
              <p>
                {" "}
                <button className={edittext ? "t4fbutton-gray" : "d-none"} onClick={(e) => setEdittext((edittext) => !edittext)}>
                  <img src={edit} alt="edit" height="13" /> {t("edit")}
                </button>{" "}
                <button className={!edittext ? "t4fbutton-gray" : "d-none"} onClick={(e) => (setEdittext((edittext) => !edittext), saveAboutUsContent())}>
                  Save
                </button>{" "}
              </p>
            </div>
            <div className="admin_aboutus">
              <div>
                <div className="row">
                  <div className={!edittext ? "col-lg-12 tab-content" : "d-none"}>
                    {/* <input type="textarea" aria-required="true" defaultValue={postcontent} rows="8" cols="45" required name="postcontent" {...register("postcontent")} id="postcontent" /> */}
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config_}
                      tabIndex={2} // tabIndex of textarea
                      rows="8"
                      onBlur={(newContent) => setContentnew(newContent)} // preferred to use only this option to update the content for performance reasons
                      //onChange={(newContent) => setContent(newContent)}
                    />
                  </div>
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

export default Admin_AboutUs;

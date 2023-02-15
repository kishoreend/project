import Caetogory from "./Caetogory";
import SubCaetogory from "./SubCaetogory";
import Cusine from "./Cusine";
import CustomiseFoodItem from "./CustomiseFoodItem";
import CustomiseType from "./CustomiseType";
import { useTranslation } from "react-i18next";
const CreateListing = () => {
  const {t} = useTranslation();
  const CreateListingTabs = () => {
    return (
      <div className="create-listing-tabs px-2">
        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#category"
              type="button"
              role="tab"
            >
              {t('category')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#sub-category"
              type="button"
              role="tab"
            >
              {t('sub_category')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#customize-type"
              type="button"
              role="tab"
            >
              {t('customize_type')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#customize-food-item"
              type="button"
              role="tab"
            >
              {t('customize_food_item')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#cuisine"
              type="button"
              role="tab"
            >
              {t('cuisine')}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="category" role="tabpanel">
            <Caetogory />
          </div>
          <div className="tab-pane fade" id="sub-category" role="tabpanel">
            <SubCaetogory />
          </div>
          <div className="tab-pane fade" id="customize-type" role="tabpanel">
            <CustomiseType />
          </div>
          <div className="tab-pane fade" id="customize-food-item" role="tabpanel">
            <CustomiseFoodItem />
          </div>

          <div className="tab-pane fade" id="cuisine" role="tabpanel">
            <Cusine />
          </div>
        </div>
      </div>
    );
  };

  return <CreateListingTabs></CreateListingTabs>;
};

export default CreateListing;

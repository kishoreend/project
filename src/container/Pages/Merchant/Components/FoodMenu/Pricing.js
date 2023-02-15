import React from "react";
import Pricing_FoodItem from "./Pricing_FoodItem";
import Pricing_CustomiseFoodItem from "./Pricing_CustomiseFoodItem";
//import Pricing_ExtraVariant from "./Pricing_ExtraVariant";
import Pricing_OfferPrice from "./Pricing_OfferPrice";
import { useTranslation } from "react-i18next";
// const CustomizeItemPricingTab = () => {
//   return (
//     <div>
//       <div className="create-listing-tabs px-3">
//         <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
//           <li className="nav-item" role="presentation">
//             <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#foodvariant" type="button" role="tab">
//               Food Variant
//             </button>
//           </li>
//           <li className="nav-item" role="presentation">
//             <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#extravariant" type="button" role="tab">
//               Extra Variant
//             </button>
//           </li>
//         </ul>
//         <div className="tab-content" id="pills-tabContent">
//           <div className="tab-pane fade show active" id="foodvariant" role="tabpanel">
//             <Pricing_CustomiseFoodItem />
//           </div>
//           <div className="tab-pane fade" id="extravariant" role="tabpanel">
//             <Pricing_ExtraVariant />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const PricingMenu = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="underline-tab px-1">
        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#food-item-pricing" type="button" role="tab">
              {t('food_item_pricing')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#customise-item-pricing" type="button" role="tab">
            {t('customise_item_pricing')}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#offer-price" type="button" role="tab">
            {t('offer_price')}
            </button>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="createListing">
        <div className="tab-pane fade show active" id="food-item-pricing" role="tabpanel">
          <Pricing_FoodItem />
        </div>
        <div className="tab-pane fade" id="customise-item-pricing" role="tabpanel">
          <Pricing_CustomiseFoodItem />
        </div>
        <div className="tab-pane fade" id="offer-price" role="tabpanel">
          <Pricing_OfferPrice />
        </div>
      </div>
    </>
  );
};

export default PricingMenu;

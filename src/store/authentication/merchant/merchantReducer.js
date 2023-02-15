import * as merchantActionTypes from "../merchant/actionTypes";

const initialState = {
  isLoading: false,
  merchants: {},
  currentFoodstall: "Add Food Stall",
  foodStalls: [],
  currentFoodstallDetail: {},
  bankDetails: [],
  currentBankDetails: {},
  foodstallTimings: [],
  currentFoodstallTiming: {},
  profilePicture: "",
  categories: [],
  subCategories: [],
  cuisines: [],
  customizeType: [],
  customizeFoodItem: []
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case merchantActionTypes.GET_MERCHANT_DETAILS_INIT:
      return {
        ...state,
        isLoading: true,
        merchants: {},
        foodStalls: [],
        currentFoodstallDetail: {},
        currentBankDetails: {},
        foodstallTimings: [],
        currentFoodstallTiming: {},
        profilePicture: "",
        categories: [],
        subCategories: [],
        cuisines: [],
        customizeType: [],
        customizeFoodItem: [],
        personalIdCard: "",
        foodstallImages: [],
        menuPictures: [],
        foodMenu: [],
        tempFoodMenu: [],
      };
    case merchantActionTypes.GET_MERCHANT_DETAILS_SUCCESS:
      console.log('Action', action)
      return {
        ...state,
        isLoading: false,
        merchants: action.payload,
        foodStalls: action.payload.foodStalls || [],
        currentFoodstallDetail: action.payload.foodStalls && action.payload.foodStalls.length > 0 ? action.payload.foodStalls[0] : [],
        currentFoodstall: action.payload.foodStalls && action.payload.foodStalls.length > 0 ? `${action.payload.foodStalls[0].foodStallName}${" "} (${action.payload.foodStalls[0].foodStallId}),${action.payload.foodStalls[0].city}` : "Add Food Stall",
        currentBankDetails: {}, //action.payload.bankDetails,
        currentFoodstallTiming: state.currentFoodstall && state.currentFoodstall.foodstallTimings,
        profilePicture: action.payload.profilePic,
        personalIdCard: action.payload.personalIdCard,
        foodstallImages: action.payload.foodStalls && action.payload.foodStalls[0]?.foodStallPics,
        menuPictures: action.payload.foodStalls && action.payload.foodStalls[0]?.menuPics,
      };
    case merchantActionTypes.GET_MERCHAT_DETAILS_FAILED:
    case merchantActionTypes.FETCH_CATEGORY_FAILED:
    case merchantActionTypes.ADD_CATEGORY_FAILED:
    case merchantActionTypes.UPDATE_CATEGORY_FAILED:
    case merchantActionTypes.DELETE_CATEGORY_FAILED:
    case merchantActionTypes.ADD_SUB_CATEGORY_FAILED:
    case merchantActionTypes.UPDATE_SUB_CATEGORY_FAILED:
    case merchantActionTypes.DELETE_SUB_CATEGORY_FAILED:
    case merchantActionTypes.UPDATE_MERCHANT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case merchantActionTypes.CLEAR_MERCHANT_DETAILS_ON_LOGOUT:
      return {
        ...state,
        isLoading: false,
        merchants: {},
        currentFoodstall: "Add Food Stall",
        foodStalls: [],
        currentFoodstallDetail: {},
        currentBankDetails: {},
        foodstallTimings: [],
        currentFoodstallTiming: {},
        categories: [],
        subCategories: [],
        cuisines: [],
        customizeType: [],
        customizeFoodItem: [],
        profilePicture: "",
        personalIdCard: "",
        foodstallImages: [],
        menuPictures: [],
        isFoodItemAdded: false,
      };
    case merchantActionTypes.GET_SELECTED_FOOD_STALL_FROM_DROPDOWN:
      console.log(action.payload, "current food stall from dropdown");
      // var _rFoodData = {};
      // if (state.tempFoodMenu && state.tempFoodMenu?.length) {
      //   const foodDatas = state.tempFoodMenu;
      //   // return { ...response.data.data }
      //   console.log(foodDatas, "redux food items");
      //   _rFoodData = foodDatas.reduce(function (r, a) {
      //     r[a.category] = r[a.category] || [];
      //     r[a.category].push(a);
      //     return r;
      //   }, {});
      // }
      return {
        ...state,
        isLoading: false,
        currentFoodstallDetail: action.payload,
        currentFoodstall: `${action.payload?.foodStallName}${" "} (${action.payload?.foodStallId}),${action.payload?.city}`,
        currentFoodstallTiming: [],
        categories: [],
        subCategories: [],
        cuisines: [],
        customizeType: [],
        // profilePicture: action.payload.profilePic,
        // personalIdCard: action.payload.personalIdCard,
        foodstallImages: action.payload.foodStallPics,
        menuPictures: action.payload.menuPics,
        foodMenu: {},
      };
    case merchantActionTypes.ADD_FOODSTALL_TO_MERCHANT_FROM_HEADER:
      console.log(action.payload);
      console.log("test it", [...state.foodStalls, action.payload]);
      console.log("test it", state.foodStalls?.length);
      return {
        ...state,
        isLoading: false,
        foodStalls: [...state.foodStalls, action.payload],
        currentFoodstallDetail: state.foodStalls?.length === 1 ? action.payload : state.currentFoodstallDetail,
        currentFoodstall: state.foodStalls?.length > 1 ? state.currentFoodstall : `${action.payload.foodStallName}${" "} (${action.payload.foodStallId}),${action.payload.city}`,
      };
    case merchantActionTypes.UPDATE_MERCHANT_DETAILS_SUCCESS:
      console.log("update merchant details", action.payload);
      let index = state.foodStalls.findIndex((fs) => fs.foodStallId == action.payload.foodStallId); //finding index of the item
      const newArray = [...state.foodStalls];
      console.log("foodstall update", index, newArray);
      // newArray[index].city = action.payload.foodStalls[0].city;
      // newArray[index].country = action.payload.foodStalls[0].country;
      // newArray[index].state = action.payload.foodStalls[0].state;
      newArray[index].foodStallName = action.payload.foodStallName;
      newArray[index].foodStallLicenseNumber = action.payload.foodStallLicenseNumber;
      return {
        ...state,
        isLoading: false,
        merchants: {
          ...state.merchants,
          personalIdNumber: action.payload.personalIdNumber,
        },
        // currentFoodstallDetail: action.payload,
        currentFoodstallDetail: {
          ...state.currentFoodstallDetail,
          // city: action.payload.foodStalls[0].city,
          // country: action.payload.foodStalls[0].country,
          // state: action.payload.foodStalls[0].state,
          foodStallName: action.payload.foodStallName,
          foodStallLicenseNumber: action.payload.foodStallLicenseNumber,
        },

        currentFoodstall: `${action.payload?.foodStallName}${" "} (${action.payload?.foodStallId}),${action.payload?.city}`,
        currentFoodstallTiming: action.payload.foodstallTimings,
        foodStalls: newArray,
      };

    case merchantActionTypes.UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case merchantActionTypes.UPDATE_PERSONAL_ID_PIC:
      return {
        ...state,
        personalIdCard: action.payload,
      };
    case merchantActionTypes.UPDATE_FOODSTALL_IMAGES:
      let foodstallIDIndex1 = state.foodStalls.findIndex((fs) => fs.id === action.payload.id); //finding index of the item
      // const catID = state.categories.indexOf(action.payload, 1);
      console.log(action.payload, state.foodStalls);
      console.log("update foodstall index", foodstallIDIndex1);
      let newFoodstallArray1 = [...state.foodStalls];
      newFoodstallArray1[foodstallIDIndex1] = action.payload;
      return {
        ...state,
        foodstallImages: action.payload.foodStallPics,
        foodStalls: newFoodstallArray1,
      };

    case merchantActionTypes.UPDATE_MENU_IMAGES:
      let foodstallIDIndex = state.foodStalls.findIndex((fs) => fs.id === action.payload.id); //finding index of the item
      // const catID = state.categories.indexOf(action.payload, 1);
      console.log(action.payload, state.foodStalls);
      console.log("update foodstall index", foodstallIDIndex);
      let newFoodstallArray = [...state.foodStalls];
      newFoodstallArray[foodstallIDIndex] = action.payload;
      return {
        ...state,
        menuPictures: action.payload.menuPics,
        foodStalls: newFoodstallArray,
      };

    case merchantActionTypes.FETCH_CATEGORY_INIT:
    case merchantActionTypes.ADD_CATEGORY_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case merchantActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case merchantActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case merchantActionTypes.UPDATE_CATEGORY_SUCCESS:
      const catID = state.categories.findIndex((fs) => fs.id === action.payload.id); //finding index of the item
      // const catID = state.categories.indexOf(action.payload, 1);
      console.log(action.payload, state.categories);
      console.log("update id", catID);
      const newCatArray = [...state.categories];
      newCatArray[catID].category = action.payload.category;
      newCatArray[catID].visible = action.payload.visible;
      return {
        ...state,
        categories: newCatArray,
      };
    case merchantActionTypes.DELETE_CATEGORY_SUCCESS:
      const newCategories = state.categories.filter((fs) => fs.id != action.payload.id); //finding index of the item
      console.log("update id");
      return {
        ...state,
        categories: newCategories,
      };

    case merchantActionTypes.FETCH_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        subCategories: action.payload,
      };

    case merchantActionTypes.ADD_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        subCategories: [...state.subCategories, action.payload],
      };
    case merchantActionTypes.UPDATE_SUB_CATEGORY_SUCCESS:
      const subCatID = state.subCategories.findIndex((fs) => fs.id == action.payload.id); //finding index of the item
      console.log("update id", subCatID);
      const newSubCatArray = [...state.subCategories];
      newSubCatArray[subCatID].subCategory = action.payload.subCategory;
      newSubCatArray[subCatID].visible = action.payload.visible;
      return {
        ...state,
        subCategories: newSubCatArray,
      };
    case merchantActionTypes.DELETE_SUB_CATEGORY_SUCCESS:
      const newsubcategories = state.subCategories.filter((fs) => fs.id != action.payload.id); //finding index of the item
      console.log("update id");
      return {
        ...state,
        subCategories: newsubcategories,
      };

    case merchantActionTypes.FETCH_CUISINE_SUCCESS:
      return {
        ...state,
        cuisines: action.payload,
      };

    case merchantActionTypes.ADD_CUISINE_SUCCESS:
      return {
        ...state,
        cuisines: [...state.cuisines, action.payload],
      };
    case merchantActionTypes.UPDATE_CUISINE_SUCCESS:
      console.log("payload", action.payload);
      const cuisineID = state.cuisines.findIndex((fs) => fs.id == action.payload.id); //finding index of the item
      console.log("update cusine id", cuisineID);
      const newCuisine = [...state.cuisines];
      newCuisine[cuisineID].name = action.payload.name;
      newCuisine[cuisineID].visible = action.payload.visible;
      return {
        ...state,
        cuisines: newCuisine,
      };
    case merchantActionTypes.DELETE_CUISINE_SUCCESS:
      const newCuisines = state.cuisines.filter((fs) => fs.id != action.payload.id); //finding index of the item
      console.log("update id");
      return {
        ...state,
        cuisines: newCuisines,
      };

    case merchantActionTypes.UPDATE_FOODSTALL_TIMING_SUCCESS:
      console.log("update food stall timing details", action.payload);
      return {
        ...state,
        isLoading: false,
        currentFoodstallTiming: action.payload,
      };

    case merchantActionTypes.GET_FOODSTALL_TIMING_SUCCESS:
      console.log("GET food stall timing details", action.payload);
      return {
        ...state,
        isLoading: false,
        currentFoodstallTiming: action.payload,
      };

    case merchantActionTypes.FETCH_CUSTOMIZE_TYPE_SUCCESS:
      return {
        ...state,
        customizeType: action.payload,
      };

    case merchantActionTypes.ADD_CUSTOMIZE_TYPE_SUCCESS:
      return {
        ...state,
        customizeType: [...state.customizeType, action.payload],
      };
    case merchantActionTypes.UPDATE_CUSTOMIZE_TYPE_SUCCESS:
      console.log("payload", action.payload);
      const customizeTypeID = state.customizeType.findIndex((fs) => fs.id == action.payload.id); //finding index of the item
      console.log("update cusine id", customizeTypeID);
      const updatedCustomizeType = [...state.customizeType];
      updatedCustomizeType[customizeTypeID].type = action.payload.type;
      updatedCustomizeType[customizeTypeID].visible = action.payload.visible;
      return {
        ...state,
        customizeType: updatedCustomizeType,
      };
    case merchantActionTypes.DELETE_CUSTOMIZE_TYPE_SUCCESS:
      const newCustomizeType = state.customizeType.filter((fs) => fs.id != action.payload.id); //finding index of the item
      console.log("update id");
      return {
        ...state,
        customizeType: newCustomizeType,
      };

    case merchantActionTypes.FETCH_CUSTOMIZE_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        customizeFoodItem: action.payload,
      };
    case merchantActionTypes.FETCH_CUSTOMIZE_FOOD_ITEM_FAILED:
      console.log('FETCH_CUSTOMIZE_FOOD_ITEM_FAILED', action)
      return {
        ...state,
        customizeFoodItem: [],
      };
    case merchantActionTypes.ADD_CUSTOMIZE_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        customizeFoodItem: [...state.customizeFoodItem, action.payload],
      };
    case merchantActionTypes.ADD_CUSTOMIZE_FOOD_ITEM_FAILED:
      return {
        ...state,
        customizeFoodItem: [],
      };
    case merchantActionTypes.UPDATE_CUSTOMIZE_FOOD_ITEM_SUCCESS:
      console.log("payload", action.payload);
      let custFoodItemID = state.customizeFoodItem.findIndex((fs) => fs.id == action.payload.id); //finding index of the item
      console.log("update cusine id", custFoodItemID);
      let updatedCustFoodItemID = [...state.customizeFoodItem];
      updatedCustFoodItemID[custFoodItemID].customiseType = action.payload.customiseType;
      updatedCustFoodItemID[custFoodItemID].foodItemName = action.payload.foodItemName;
      updatedCustFoodItemID[custFoodItemID].price = action.payload.price;
      updatedCustFoodItemID[custFoodItemID].visible = action.payload.visible;
      return {
        ...state,
        customizeFoodItem: updatedCustFoodItemID,
      };
    case merchantActionTypes.DELETE_CUSTOMIZE_FOOD_ITEM_SUCCESS:
      let newCustFoodItem = state.customizeFoodItem.filter((fs) => fs.id != action.payload.id); //finding index of the item
      console.log("update id");
      return {
        ...state,
        customizeFoodItem: newCustFoodItem,
      };

    case merchantActionTypes.GET_FOOD_ITEMS_MENU:
      return {
        ...state,
        foodMenu: action.payload?.result,
        tempFoodMenu: action.payload?.foodDatas,
      };

    case merchantActionTypes.UPDATE_FOOD_ITEMS_MENU:
      //   const foodDatas = [...state.tempFoodMenu, action.payload];
      //   // return { ...response.data.data }
      //   console.log(foodDatas, "redux food items");
      //   const _resultFoodData = foodDatas.reduce(function (r, a) {
      //     r[a.category] = r[a.category] || [];
      //     r[a.category].push(a);
      //     return r;
      //   }, {});
      return {
        ...state,
        isFoodItemAdded: action.payload
      };
    case merchantActionTypes.FILTER_FOOD_ITEMS_MENU:
      // return { ...response.data.data }
      let _filterFoodData = [];
      if (action.payload.length > 0) {
        _filterFoodData = action.payload.reduce(function (r, a) {
          r[a.category] = r[a.category] || [];
          r[a.category].push(a);
          return r;
        }, {});
      } else {
        _filterFoodData = { id: "remove" };
      }
      return {
        ...state,
        foodMenu: _filterFoodData,
      };
      case merchantActionTypes.UPDATE_STALL_STATUS:

      const _currentFoodstallDetail = {...state.currentFoodstallDetail}
      _currentFoodstallDetail.isOpened = action.payload;

        return {
          ...state, currentFoodstallDetail : _currentFoodstallDetail
        }
    default:
      return state;
  }
};

export default merchantReducer;

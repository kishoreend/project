import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import'bootstrap-css-only/css/bootstrap.min.css';
//import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "../src/container/app";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/rootreducer";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Constlanguage } from "./ConstLanguage";
import cookies from "js-cookie";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });
const persistConfig = {
  key: "root",
  storage: storage,
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const currentLanguageCode = cookies.get("i18next") || "en";
const currentLanguage = Constlanguage.find((l) => l.code === currentLanguageCode);
// remove in prod start
// var store = "";
// if (window.location.href.indexOf("http://localhost:300") > -1) {
//   if (window.navigator.userAgent.includes("Chrome")) {
//     store = createStore(persistedReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
//   } else {
//     store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));
//   }
// } else {
//   store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));
// }

let composeEnhancers = null;
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
} else {
  composeEnhancers = compose;
}
const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);
//const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk)));

// remove in prod end
//prod start
// var store = compose(applyMiddleware(thunk))(createStore)(rootReducer);
//prod end

// create store with reducer
// const store = createStore(
//   signupReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={loadingMarkup}>
      <Provider store={store}>
        <PersistGate loading={"loading"} persistor={persistor}>
          <App currentLanguage={currentLanguage} />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
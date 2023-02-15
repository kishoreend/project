import axios from "./axios";
import axios from "./axios";
import config from "../src/container/app/navigation.json";
export const postData = async (url, data, module, method) => {
  console.log("from service call start");
  const response = await axios({
    baseURL: module === "admin" ? config.endpoint.url + ":8082" : module === "customer" ? config.endpoint.url + ":8081" : config.endpoint.url + ":8080",
    method: method,
    url: url,
    data: JSON.stringify(data),
  })
    //console.log("url", url);
    .then((response) => response)
    .catch((err) => err.response);
  const result = await response;
  console.log("from service call response data", result);
  return result;
};

export const getData = async (url, method, module) => {
  let response = await axios({
    baseURL: module === "admin" ? config.endpoint.url + ":8082" : module === "customer" ? config.endpoint.url + ":8081" : config.endpoint.url + ":8080",
    method: method,
    url: url,
  })
    .then((response) => response)
    .catch((err) => err.response);
  console.log(response);
  let result = await response;
  console.log(result);
  return result;
};

//#region Redux Service Methods
//--- For Redux
export const reduxPostData = async (url, data, module, image, method) => {
  console.log("from service call start");
  const response = await axios({
    baseURL: module === "admin" ? config.endpoint.url + ":8082" : module === "customer" ? config.endpoint.url + ":8081" : config.endpoint.url + ":8080",
    method: method ? method : "post",
    url: url,
    // headers: image && { "Content-Type": "multipart/form-data" },
    data: image ? data : JSON.stringify(data),
  });
  //console.log("url", url);
  // .then((response) => response)
  // .catch((err) => err.response);
  const result = await response;
  // console.log("from service call response data", result);
  return result;
};

export const reduxGetData = async (url, method, module) => {
  let response = await axios({
    baseURL: module === "admin" ? config.endpoint.url + ":8082" : module === "customer" ? config.endpoint.url + ":8081" : config.endpoint.url + ":8080",
    method: method,
    url: url,
  });
  console.log(response);
  let result = await response;
  console.log(result, "From service call of redux");
  return result;
};
//#endregion

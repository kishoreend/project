import Axios from "axios";
import config from "../src/container/app/navigation.json";
const axios = Axios.create({
  //baseURL: config.endpoint.url + ":8080",
  baseURL: config.endpoint.url,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 1200000,
  timeoutErrorMessage: "Timeout",
});

export default axios;

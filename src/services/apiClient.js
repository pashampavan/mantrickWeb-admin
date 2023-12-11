import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://mantrickweb-default-rtdb.firebaseio.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

export default apiClient;

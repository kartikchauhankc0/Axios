import axios from "axios";

const API = axios.create({
  baseURL: "https://axios-bjt4.onrender.com/api",
  withCredentials: true,
});

export default API;
import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanagement-api-04bm.onrender.com/api", 
});

export default api;
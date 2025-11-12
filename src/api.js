import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia al puerto de tu backend
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 aquí debe estar el puerto real del backend
});

export default api;

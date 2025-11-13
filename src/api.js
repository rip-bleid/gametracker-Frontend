import axios from "axios"; 

const api = axios.create({
    baseURL: "http://localhost:5000", // cambia el puerto si se cambia en el backend
});

export default api; 
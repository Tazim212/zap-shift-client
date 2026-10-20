import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://zap-shift-server-127k.onrender.com"
    baseURL: "http://localhost:3000"
})
const useAxios = () =>{
    return axiosInstance;
}
export default useAxios;
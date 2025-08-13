import axios from "axios";
import { BASE_URL } from "./ApiPaths";

const axiosInstance = axios.create({
        baseURL:BASE_URL,
        timeout:10000,
        headers:{
            "Content-Type": "application/json",
            Accept:"application/json"
        }

    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");

            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
                
            }
            return config;
        },
        (error) => {
        return Promise.reject(error)
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if(error.response){
                if(error.response.status === 401){
                    window.location.href="/auth/login";
                }
                else if(error.response.status === 500) {
                    console.error("Server errro please try again later")
                }
                else if (error.code === "ECONNABORTED"){
                    console.error("Request timeout. Please try again")
                }
                console.error(error)

            }
            return Promise.reject(error);
        },
    );

    export default axiosInstance;

import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  timeoutErrorMessage: "Connection timed out.",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        alert(error.response.data);
        return Promise.reject(error);
    }
);

export default AxiosInstance;

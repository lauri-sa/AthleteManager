import axios from "axios";

// AxiosInstance is a custom axios instance that can be used to make requests to the backend.
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for the backend
  timeout: 10000, // Request timeout, in milliseconds
  timeoutErrorMessage: "Connection timed out.", // Error message for timeout
  headers: {
    "Content-Type": "application/json", // Headers for the request
  },
});

// AxiosInstance interceptors are used to handle requests and responses.
// This interceptor is used to handle responses from the backend.
// If the response is successful, the response is returned. If there is an error, an alert is shown with the error message.
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

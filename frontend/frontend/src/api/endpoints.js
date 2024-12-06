import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/'
import axiosInstance from './axiosInstance';
const LOGIN_URL = `${BASE_URL}login/`
const REGISTER_URL = `${BASE_URL}register/`
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post(
            LOGIN_URL, 
            { username, password },  // Object shorthand for cleaner syntax
        );
        
        // Check if the response contains a success attribute (depends on backend response structure)
        return response.data
    } catch (error) {
        console.error("Login failed:", error);
        return false;  // Return false or handle the error as needed
    }
};

export const register = async (username, password , email) => {

    try {

    const response = await axios.post(REGISTER_URL, {username:username,password:password ,email:email }, { withCredentials: true });
    if (response.status === 200) {
        return "success"; // You can also return response.data if it's more descriptive
    } else {
        return "failure"; // Optional: Handle non-200 responses
    }
} catch (error) {
    console.error("Registration error:", error);
}
};
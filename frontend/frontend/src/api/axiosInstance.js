import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor for token management
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        console.log('Access1 token:', accessToken);
        // Retrieve token from localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Attach token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for refreshing the token
axiosInstance.interceptors.response.use(
    (response) => response, // Pass successful responses through
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token'); // Get refresh token
                if (!refreshToken) throw new Error('No refresh token available');
                
                // Make a request to refresh the token
                const refreshResponse = await axios.post(`${BASE_URL}token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = refreshResponse.data.access;

                // Save the new access token in localStorage
                localStorage.setItem('access_token', newAccessToken);

                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Optional: Logout the user or redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login'; // Adjust the route as per your app
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

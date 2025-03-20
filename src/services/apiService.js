// import axios from 'axios';
//
//
// const DRYKLIN_API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
// const DRYKLIN_LOGIN_ENDPOINT = import.meta.env.VITE_DRYKLIN_LOGIN_ENDPOINT;
// const DRYKLIN_RESET_PASSWORD_ENDPOINT = import.meta.env.VITE_DRYKLIN_RESET_PASSWORD_ENDPOINT;
//
// const apiService = {
//     login: async (email, password) => {
//         try {
//             const response = await axios.post(`${DRYKLIN_API_BASE_URL}${DRYKLIN_LOGIN_ENDPOINT}`, {
//                 email,
//                 password,
//             });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },
//
//     resetPassword: async (email) => {
//         try {
//             const response = await axios.post(`${DRYKLIN_API_BASE_URL}${DRYKLIN_RESET_PASSWORD_ENDPOINT}`, {
//                 email,
//             });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },
// };
//
// export default apiService;



import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const LOGIN_ENDPOINT = import.meta.env.VITE_DRYKLIN_LOGIN_ENDPOINT;
const RESET_PASSWORD_ENDPOINT = import.meta.env.VITE_DRYKLIN_RESET_PASSWORD_ENDPOINT;

const apiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (email) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${RESET_PASSWORD_ENDPOINT}`, {
                email,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
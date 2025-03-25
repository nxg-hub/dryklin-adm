import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;

const apiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    initiatePasswordReset: async (email) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/initiate-password-reset?email=${encodeURIComponent(email)}`
            );

            if (response.data?.token) {
                localStorage.setItem("resetToken", response.data.token);
                localStorage.setItem("resetEmail", email);
                // console.log("Stored reset token:", response.data.token);
            } else {
                // console.warn("Token not found in response:", response.data);
                throw new Error("Password reset initiation failed - no token received");
            }

            return response.data;
        } catch (error) {
            let errorMessage = error.response?.data?.message ||
                error.message ||
                "Failed to initiate password reset";
            error.message = errorMessage;
            throw error;
        }
    },

    validateOTP: async (otp) => {
        try {
            const resetToken = localStorage.getItem("resetToken");
            const email = localStorage.getItem("resetEmail");

            if (!resetToken || !email) {
                throw new Error("Password reset session expired. Please start over.");
            }

            const response = await axios.post(
                `${API_BASE_URL}/auth/validate-otp`,
                {
                    otp,
                    email,
                    resetToken
                }
            );
            return response.data;
        } catch (error) {
            let errorMessage = error.response?.data?.message ||
                "OTP validation failed";
            error.message = errorMessage;
            throw error;
        }
    },

    resetPassword: async ({ resetToken, newPassword, confirmPassword }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
                resetToken,
                newPassword,
                confirmPassword
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
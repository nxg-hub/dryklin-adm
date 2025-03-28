"use client";

import { useState } from "react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import Logo from "../../components/Logo/logo.jsx";
import { Checkbox } from "../../components/checkbox.jsx";
import FeedbackModal from "../../components/modal.jsx";
import apiService from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUser } from "../../redux/UserSlice.jsx";
import { fetchAgents} from "../../redux/UserSlice.jsx";
import { fetchServicePartners } from "../../redux/UserSlice.jsx";
import { fetchAdminDetails } from "../../redux/LoggedInAdminSlice.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: "success",
        title: "",
        description: "",
        redirectPath: "/dashboard",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiService.login(email, password);

            localStorage.setItem('userEmail', email);

            if (response.status === "ACCEPTED") {
                if (rememberMe) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("sessionId", response.data.sessionId);
                } else {
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("sessionId", response.data.sessionId);
                }
                  dispatch (fetchUser());
                  dispatch (fetchAgents());
                  dispatch (fetchServicePartners())
                  dispatch(fetchAdminDetails(email));

                  
                setModalConfig({
                    show: true,
                    type: "success",
                    title: "Login Successful",
                    description: response.message || "You have been successfully logged in.",
                    redirectPath: "/dashboard",
                });
            } else {
                setModalConfig({
                    show: true,
                    type: "error",
                    title: "Login Failed",
                    description: response.message || "Login failed. Please try again.",
                    redirectPath: null,
                });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again later.";

            setModalConfig({
                show: true,
                type: "error",
                title: "Login Error",
                description: errorMessage,
                redirectPath: null,
            });
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="absolute top-6 left-6">
                <Logo />
            </div>

            <div className="w-full max-w-md px-6">
                <h2 className="text-3xl font-medium text-[#E85C13] text-center mb-2">Welcome</h2>
                <p className="text-gray-600 text-center mb-8">Input your login details below</p>

                <form onSubmit={handleSubmit} className="space-y-6 lg:-ml-15">
                <InputField
                        id="email"
                        type="email"
                        label="Enter Email Address"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        id="password"
                        type="password"
                        label="Enter Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex items-center w-full">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember-me"
                                checked={rememberMe}
                                onCheckedChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                                Remember Me
                            </label>
                        </div>
                        <a href="/reset-password" className="text-[#E85C13] hover:underline ml-auto">
                            Forgotten Password
                        </a>
                    </div>

                    <Button type="submit" variant="primary" disabled={isLoading} fullWidth={true}>
                        {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                </form>
            </div>

            {modalConfig.show && (
                <FeedbackModal
                    type={modalConfig.type}
                    title={modalConfig.title}
                    description={modalConfig.description}
                    buttonText={modalConfig.type === "success" ? "Continue" : "Try Again"}
                    redirectPath={modalConfig.redirectPath}
                    onClose={closeModal}
                    onButtonClick={modalConfig.type === "success" ? null : closeModal}
                    primaryColor="#E85C13"
                />
            )}
        </div>
    );
}
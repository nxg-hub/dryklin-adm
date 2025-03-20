import { useState } from "react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import Logo from "../../components/Logo/logo.jsx";
import FeedbackModal from "../../components/modal.jsx";
import apiService from "../../services/apiService.js";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
    redirectPath: "/",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.resetPassword(email);
      // Show success modal instead of changing isSubmitted
      setModalConfig({
        show: true,
        type: "success",
        title: "Check Your Email",
        description: `We've sent a password reset link to: ${email}`,
        redirectPath: "/",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      // Show error modal
      setModalConfig({
        show: true,
        type: "error",
        title: "Reset Password Failed",
        description: error.response?.data?.message || "An error occurred. Please try again later.",
        redirectPath: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  return (
      <div className="w-full min-h-screen flex items-center justify-center text-center">
        <div className="flex justify-start absolute top-6 left-6">
          <Logo />
        </div>

        <div className="w-full max-w-md px-6">
          <h2 className="text-[#E85C13] text-2xl font-semibold mb-2">Reset Password</h2>
          <p className="text-[#6A6A6A] whitespace-nowrap mb-6">Input your email address below</p>

          <form onSubmit={handleSubmit} className="space-y-6 lg:-ml-15">
            <InputField
                id="email"
                label="Enter Email Address"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="mb-6"
            />

            <Button type="submit" variant="primary" fullWidth={true} disabled={isLoading}>
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
          </form>

          {/*<div className="mt-8 w-full">*/}
          {/*  <a href="/" className="flex items-center justify-center text-[#706f6f] hover:text-[#E85C13] transition-colors">*/}
          {/*    <ArrowLeft className="h-4 w-4 mr-2" />*/}
          {/*    Return to Login*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>

        {modalConfig.show && (
            <FeedbackModal
                type={modalConfig.type}
                title={modalConfig.title}
                description={modalConfig.description}
                buttonText={modalConfig.type === "success" ? "Return to Login" : "Try Again"}
                redirectPath={modalConfig.redirectPath}
                onClose={closeModal}
                onButtonClick={modalConfig.type === "success" ? null : closeModal}
                primaryColor="#E85C13"
            />
        )}
      </div>
  );
}
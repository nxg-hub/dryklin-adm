import { useState } from "react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import Logo from "../../components/Logo/logo.jsx";
import FeedbackModal from "../../components/modal.jsx";
import apiService from "../../services/apiService.js";

export default function OTPValidationPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
    redirectPath: "/confirm-password"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      setModalConfig({
        show: true,
        type: "error",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        redirectPath: null
      });
      return;
    }

    setIsLoading(true);

    try {
      const email = localStorage.getItem("resetEmail");

      await apiService.validateOTP(otp);

      setModalConfig({
        show: true,
        type: "success",
        title: "OTP Verified",
        description: `OTP verified for ${email}. You can now set a new password.`,
        redirectPath: "/confirm-password"
      });
    } catch (error) {
      setModalConfig({
        show: true,
        type: "error",
        title: "Verification Failed",
        description: error.message,
        redirectPath: null
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
          <h2 className="text-[#E85C13] text-2xl font-semibold mb-2">OTP Authentication</h2>
          <p className="text-[#6A6A6A] whitespace-nowrap mb-6">Please check email inbox for authentication code</p>

          <form onSubmit={handleSubmit} className="space-y-6 lg:-ml-15">
            <InputField
                id="otp"
                label="Enter OTP Code"
                type="text"
                placeholder="083-294"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required={true}
                className="mb-6"
            />

            <Button type="submit" variant="primary" fullWidth={true} disabled={isLoading}>
              {isLoading ? "Validating..." : "Validate OTP"}
            </Button>
          </form>
        </div>

        {modalConfig.show && (
            <FeedbackModal
                type={modalConfig.type}
                title={modalConfig.title}
                description={modalConfig.description}
                buttonText={modalConfig.type === "success" ? "Proceed to New Password" : "Try Again"}
                redirectPath={modalConfig.redirectPath}
                onClose={closeModal}
                onButtonClick={modalConfig.type === "success" ? null : closeModal}
                primaryColor="#E85C13"
            />
        )}
      </div>
  );
}
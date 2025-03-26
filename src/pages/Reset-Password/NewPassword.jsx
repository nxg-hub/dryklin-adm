
import { useState, useEffect } from "react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import Logo from "../../components/Logo/logo.jsx";
import FeedbackModal from "../../components/modal.jsx";
import apiService from "../../services/apiService.js";

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
    redirectPath: "/",
  });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  useEffect(() => {
    if (newPassword) {
      setPasswordError(validatePassword(newPassword));
    } else {
      setPasswordError("");
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  }, [confirmPassword, newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMatchError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const resetToken = localStorage.getItem("resetToken");
      if (!resetToken) {
        throw new Error("No reset token found. Please start the password reset process again.");
      }

      await apiService.resetPassword({ resetToken, newPassword, confirmPassword });

      localStorage.removeItem("resetToken");

      setModalConfig({
        show: true,
        type: "success",
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now login with your new password.",
        redirectPath: "/",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      setModalConfig({
        show: true,
        type: "error",
        title: "Password Reset Failed",
        description: error.response?.data?.message || error.message || "An error occurred. Please try again later.",
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
          <h2 className="text-[#E85C13] text-2xl font-semibold mb-2">Create New Password</h2>
          <p className="text-[#6A6A6A] whitespace-nowrap mb-6">Set your new password below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <InputField
                  id="newPassword"
                  label="Enter New Password"
                  type="password"
                  placeholder="Create new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required={true}
              />
              {passwordError && (
                  <p className="text-red-500 text-sm mt-1 text-left">{passwordError}</p>
              )}
            </div>

            <div>
              <InputField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
              />
              {matchError && (
                  <p className="text-red-500 text-sm mt-1 text-left">{matchError}</p>
              )}
            </div>

            <div className="pt-2">
              <Button
                  type="submit"
                  variant="primary"
                  fullWidth={true}
                  disabled={isLoading || passwordError || matchError}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
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
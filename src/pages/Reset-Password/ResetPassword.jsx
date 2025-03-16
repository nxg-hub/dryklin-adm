"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import orangeLogo from "../../assets/orange-logo.png";
import Logo from "../../components/Logo/logo.jsx";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API CALL
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="flex justify-start absolute top-6 left-6">
        <Logo />
      </div>

      <div className="w-full max-w-md mt-20">
        {!isSubmitted ? (
          <>
            <h2 className="text-[#E85C13] text-2xl font-semibold mb-2">
              Reset Password
            </h2>
            <p className="text-[#6A6A6A] mb-8">
              Input your email address below
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <InputField
                id="email"
                label="Enter Email Address"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
                required={true}
                className="mb-6"
              />

              <Button type="submit" variant="primary" fullWidth={true}>
                Reset Password
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-[#E85C13] text-2xl font-semibold mb-4">
              Check Your Email
            </h2>
            <p className="text-[#706f6f] mb-2">
              We've sent a password reset link to:
            </p>
            <p className="font-medium mb-8">{email}</p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Send to a different email address
            </Button>
          </div>
        )}

        <div className="mt-8 w-full">
          <a
            href="/"
            className="flex items-center text-[#706f6f] hover:text-[#E85C13] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Login
          </a>
        </div>
      </div>
    </div>
  );
}

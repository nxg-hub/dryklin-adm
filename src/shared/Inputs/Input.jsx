import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({
                                       id,
                                       label,
                                       type = "text",
                                       placeholder,
                                       value,
                                       onChange,
                                       required = false,
                                       className = "",
                                   }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-2" style={{ width: "530px" }}>
            {label && (
                <label htmlFor={id} className="block text-[#E86317] font-medium text-base text-left">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-3 rounded border focus:outline-none bg-[#F7F7F7] placeholder:text-[#E86317] ${
                        isFocused
                            ? "border-[#E86317] text-[#E86317]"
                            : "border-transparent text-[#6A6A6A]"
                    } ${className}`}
                    style={{
                        height: "56px",
                        borderRadius: "8px",
                    }}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                            isFocused ? "text-[#E86317]" : "text-black"
                        } hover:bg-transparent focus:outline-none`}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
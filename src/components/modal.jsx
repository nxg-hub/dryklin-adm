"use client";

import { X, Check, AlertCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FeedbackModal({
                                          type = "success", // 'success', 'error', 'warning', 'info'
                                          title,
                                          description,
                                          buttonText = "Proceed",
                                          onButtonClick,
                                          onClose,
                                          redirectPath = "/",
                                          icon,
                                          primaryColor = "#e86317",
                                          secondaryColor = "#4bc538", // Default to green for success
                                      }) {
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Set to true when component mounts (client-side)
    }, []);

    console.log("FeedbackModal rendered", { isClient, type, title, description }); // Debugging

    // Define icon and color based on type
    const getIconAndColor = () => {
        switch (type) {
            case "error":
                return {
                    icon: <AlertCircle className="w-16 h-16 text-[#ff4d4f] stroke-[3]" />,
                    secondaryColor: "#ff4d4f", // Red for errors
                };
            case "warning":
                return {
                    icon: <AlertCircle className="w-16 h-16 text-[#faad14] stroke-[3]" />,
                    secondaryColor: "#faad14", // Yellow for warnings
                };
            case "info":
                return {
                    icon: <Info className="w-16 h-16 text-[#1890ff] stroke-[3]" />,
                    secondaryColor: "#1890ff", // Blue for info
                };
            default:
                return {
                    icon: <Check className="w-16 h-16 text-[#4bc538] stroke-[3]" />,
                    secondaryColor: "#4bc538", // Green for success
                };
        }
    };

    const { icon: typeIcon, secondaryColor: typeSecondaryColor } = getIconAndColor();
    const displayIcon = icon || typeIcon;

    const handleProceed = () => {
        if (onButtonClick) {
            onButtonClick();
        } else if (redirectPath && isClient) {
            router.push(redirectPath);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else if (isClient) {
            router.push("/");
        }
    };

    if (!isClient) {
        return null; // Don't render on the server
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] p-6">
            <div className="w-full max-w-md relative">
                <button
                    onClick={handleClose}
                    className="absolute right-0 top-0 text-[#5d5d5d] hover:text-[#555555] transition-colors"
                    aria-label="Close"
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="flex flex-col items-center justify-center mt-12 mb-8">
                    <div
                        className="w-36 h-36 rounded-full flex items-center justify-center"
                        style={{
                            backgroundColor: `${typeSecondaryColor}20`, // 20% opacity version of the color
                            borderColor: typeSecondaryColor,
                            borderWidth: "4px",
                        }}
                    >
                        {displayIcon}
                    </div>
                </div>

                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
                        {title}
                    </h1>
                    <p className="text-[#5d5d5d] text-xl">{description}</p>
                </div>

                <button
                    onClick={handleProceed}
                    className="w-full py-4 text-white text-xl font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: primaryColor }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
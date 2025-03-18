export default function Button({
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  onClick,
  disabled,
  children,
  icon, // Optional icon for buttons with icons
}) {
  // Base styles for all buttons
  const baseStyles =
    "rounded font-medium transition-colors focus:outline-none flex items-center justify-center";

  // Variant-specific styles
  const variantStyles = {
    primary: "bg-[#E85C13] text-white hover:bg-[#D04E0F]", // Orange background, white text
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300", // Gray background, dark text
    outline:
      "bg-white border border-[#D0D5DD] text-[#344054] hover:bg-gray-50 shadow-xs", // New outline variant
    modal: "bg-[#E85C13] text-white hover:bg-[#D04E0F]", // Orange background, white text
    icon: "bg-[#E85C13] text-white hover:bg-[#D04E0F] flex items-center gap-2 ", // Orange background, white text, icon support
  };

  // Size-specific styles
  const sizeStyles = {
    primary: "w-[530px] h-[56px]", // Primary button size
    secondary: "w-[167px] h-[56px]", // Secondary button size
    outline: "w-[115px] h-[36px]", // New outline button size
    modal: "w-[482px] h-[56px]", // Modal button size
    icon: "w-[223px] h-[56px]", // Icon button size
  };

  const disabledStyle = "opacity-35";

  // Combine base, variant, size, and custom class names
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[variant]
  } ${className}  ${disabled ? disabledStyle : ""} cursor-pointer`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonStyles}
      style={{ borderRadius: "8px" }} // Fixed border radius
    >
      {icon && <span>{icon}</span>} {/* Render icon if provided */}
      {children}
    </button>
  );
}

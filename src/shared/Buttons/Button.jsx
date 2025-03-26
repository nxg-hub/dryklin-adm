export default function Button({
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  onClick,
  children,
  icon,
  disabled,
}) {
  const baseStyles =
    "rounded font-medium transition-colors focus:outline-none flex items-center justify-center";
  const variantStyles = {
    primary: "bg-[#E85C13] text-white hover:bg-[#D04E0F]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline:
      "bg-white border border-[#D0D5DD] text-[#344054] hover:bg-gray-50 shadow-xs",
    modal: "bg-[#E85C13] text-white hover:bg-[#D04E0F]",
    icon: "bg-[#E85C13] text-white hover:bg-[#D04E0F] flex items-center gap-2",
  };

  const sizeStyles = {
    primary: "w-full sm:w-[530px] h-[56px]",
    secondary: "w-full sm:w-[167px] h-[56px]",
    outline: "w-full sm:w-[115px] h-[36px]",
    modal: "w-50 sm:w-[382px] h-[56px]",
    icon: "w-full sm:w-[223px] h-[56px]",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      style={{ borderRadius: "8px" }}
      disabled={disabled}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

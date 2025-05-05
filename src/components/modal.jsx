import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, X } from "lucide-react";
import Button from "../shared/Buttons/Button.jsx";

export default function FeedbackModal({
  type,
  title,
  description,
  buttonText,
  redirectPath,
  onClose,
  onButtonClick,
  primaryColor = "#E85C13",
}) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (redirectPath) {
      navigate(redirectPath);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center !z-[1000] p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {type === "success" ? (
            <CheckCircle size={64} className="text-green-500 mb-4" />
          ) : (
            <XCircle size={64} className="text-red-500 mb-4" />
          )}

          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: type === "success" ? primaryColor : "#EF4444" }}>
            {title}
          </h3>

          <p className="text-gray-600 mb-6">{description}</p>

          <Button variant="modal" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

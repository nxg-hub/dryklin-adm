export function StatusBadge({ status, variant, className = "" }) {
  const getStatusColor = () => {
    switch (variant) {
      case "new":
        return "bg-[#3daffc]";
      case "SUCCESS":
      case "CONFIRMED":
      case "PAID":
        return "bg-[#22c55e]";
      case "PROGRESS":
        return "bg-[#fca63d]";
      case "CANCELLED":
        return "bg-[#ec3705]";
      case "PENDING":
      case "PROCESSING":
        return "bg-[#fdc842]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span
      className={`${getStatusColor()} text-white text-xs px-3 py-1 rounded-full ${className}`}>
      {status}
    </span>
  );
}

export function StatusBadge({ status, variant, className = "" }) {
    const getStatusColor = () => {
        switch (variant) {
            case "new":
                return "bg-[#3daffc]"
            case "success":
            case "completed":
            case "paid":
                return "bg-[#22c55e]"
            case "progress":
                return "bg-[#fca63d]"
            case "cancelled":
                return "bg-[#ec3705]"
            case "pending":
            case "processing":
                return "bg-[#fdc842]"
            default:
                return "bg-gray-500"
        }
    }

    return <span className={`${getStatusColor()} text-white text-xs px-3 py-1 rounded-full ${className}`}>{status}</span>
}


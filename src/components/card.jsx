export function Card({ className = "", ...props }) {
    return (
        <div className={`rounded-lg border border-[#e4e7ec] bg-white text-[#344054] shadow-sm ${className}`} {...props} />
    )
}


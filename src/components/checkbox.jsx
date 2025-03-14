"use client"

export function Checkbox({ className = "", ...props }) {
    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border-2 border-[#d0d5dd] bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e86317] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-[#e86317] checked:border-[#e86317]"
                {...props}
                style={{
                    accentColor: "#E85C13",
                }}
            />
        </div>
    )
}


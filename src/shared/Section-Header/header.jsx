import { Bell } from "lucide-react"

export default function DashboardHeader({
                                            title = "Dashboard",
                                            userName = "Olivia Rhye",
                                            userEmail = "olivia@untitled.com",
                                            userImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PrzPFVJkWkhtpTcBYDbm2glHieIm5d.png"
                                        }) {
    return (
        <div className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200 relative">
            <h1
                className="top-[47px] w-[132px] h-[30px] font-inter font-semibold text-[25px] leading-[30px] text-black whitespace-nowrap"
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600
                }}
            >
                {title}
            </h1>
            <div className="flex items-center gap-6 ml-auto">
                <div className="flex flex-col items-center">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="text-xs text-gray-500">Notifications</span>
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={userImage}
                        alt="Profile picture"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
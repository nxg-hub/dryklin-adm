import { Card } from "../../components/card.jsx"

export function StatCard({ title, value, linkText = "See All", linkHref = "#", titleColor = "text-[#e86317]" }) {
    return (
        <Card className="p-4 border border-[#e4e7ec] rounded-lg">
            <div className={`${titleColor} text-sm font-medium mb-4`}>{title}</div>
            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold text-[#000000]">{value}</div>
                <a href={linkHref} className="text-sm text-[#667085] hover:underline">
                    {linkText}
                </a>
            </div>
        </Card>
    )
}


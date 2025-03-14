export function SectionHeader({ title, actionLink }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-[#344054]">{title}</h2>
            {actionLink && (
                <a href={actionLink.href} className="text-[#e86317] text-sm hover:underline">
                    {actionLink.text}
                </a>
            )}
        </div>
    )
}


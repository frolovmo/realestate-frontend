interface SummaryCardProps {
    title: string;
    value: string;
    children: React.ReactNode
}
export default function SummaryCard(props: SummaryCardProps
) {
    return (
        <div className="w-full bg-white rounded">
            <div className="w-full px-[18px] py-[9px] flex justify-between items-center">
                <p className="text-black font-medium text-[14px] leading-[21px]">{props.title}</p>
                <p className="text-black font-medium text-[14px] leading-[21px]">{props.value}</p>
            </div>
            <hr className="w-full h-[1px] text-[#DFDFDF]" />
            <div className="px-[10px] py-[15px]">
                {props.children}
            </div>

        </div>
    )
}


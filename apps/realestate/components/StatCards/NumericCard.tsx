interface NumericCardProps {
    title: string;
    children: React.ReactNode
}
export default function NumericCard(props: NumericCardProps
) {
    return (
        <div className="w-full flex flex-col bg-white rounded">
            <div className="w-full px-[18px] py-[9px]">
                <p className="text-black font-medium text-[14px] leading-[21px]">{props.title}</p>
            </div>
            <div className="flex-grow">
                {props.children}
            </div>
        </div>
    )
}

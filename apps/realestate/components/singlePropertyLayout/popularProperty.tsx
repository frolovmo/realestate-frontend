import Image from "next/image";

export interface IPopularVisit {
    wishlist: number;
    views: number;
    reviews: number;
    sales: number;
    propertyName: string;
}
export default async function PopularProperty(props: Partial<IPopularVisit>) {
    return (
        <div className="bg-white rounded p-3 basis-8/12 flex flex-col">
            <p className="font-medium text-[16px] leading-[24px] text-black">Propert Visits</p>
            <div className="w-full flex">

                <div className="basis-2/3 flex justify-between">

                    <div className="flex flex-col">

                        <p className="text-[25px] leading-[37.5px] font-bold text-center text-black">{props.wishlist}</p>
                        <p className="text-[#B5B5B5] text-[14px] leading-[21px] text-center ">Wishlist</p>

                    </div>

                    <div className="flex flex-col">

                        <p className="text-[25px] leading-[37.5px] font-bold text-center text-black">{props.views}</p>
                        <p className="text-[#B5B5B5] text-[14px] leading-[21px] text-center">Views</p>

                    </div>
                </div>

            </div>

            <hr className="w-full h-[1px] bg-[#DFDFDF]" />

            <p className="font-medium text-[16px] leading-[24px] text-black py-2">Most Popular Property</p>
            <div className="w-full flex items-center">
                <div className="relative basis-[70%] max-h-[268px] min-h-[268px] bg-white shadow-md flex flex-col">
                    <div className="w-full h-[225.94px] relative rounded-t-[7.58px] overflow-hidden">
                        <Image objectFit="cover" layout="fill" src={"/images/villa.jpeg"} alt={"property"} />
                    </div>
                    <div className="flex flex-grow items-center justify-center">
                        <p className="text-black text-[10.71px] leading-[15.91px] font-bold text-center">
                            {props.propertyName}
                        </p>
                    </div>
                </div>
                <div className="basis-[30%] flex flex-col gap-y-[37px] items-center place-content-center">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex flex-col">
                            <p className="font-light text-[10.61px] leading-[15.91px] text-black">Total Views</p>
                            <p className="font-bold text-[10.61px] leading-[15.91px] text-black text-center">0</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
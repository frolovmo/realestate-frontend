import Image from "next/image";
import { Chart } from 'primereact/chart';
import { ApartmentIcon, BathIconColored, FloorPlanIconColored, SofaIcon } from "../icons";
import { encodeUrlEmail, formatDate, formatPropertyAddressLocation } from "../../lib/utils";
import { getUserData } from "../../actions/auth";
import { fetchDashboardRecentlyUpdatedProperties, fetchDashboardSummary } from "../../actions/fetchDashboardInfo";
import { BRAND_COLORS } from "../../lib/brand";

export interface RecentActivityCardProps {
    img: string;
    unitName: string;
    name: string;
    place: string;
    amount: number;
    location: string;
    area: number;
    bedRoom: number;
    bathRoom: number;
    propertyType: "Apartment";
    unitNumber: number;
    available: number;
    underConstruction: number;
    approvalStatus: "approved" | "Pending";
    createdAt: string;
    updatedAt: string;
    altText: string;
    data: any;
}

const RecentActivityCard = ({
    img,
    unitName,
    name,
    place,
    amount,
    location,
    bedRoom,
    bathRoom,
    propertyType,
    unitNumber,
    available,
    underConstruction,
    approvalStatus,
    createdAt,
    updatedAt,
    area,
    altText,
    data
}: RecentActivityCardProps) => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        }
    }

    const chartData = {
        labels: ['Available', 'Under Construction'],
        datasets: [
            {
            data: [available, underConstruction],
            backgroundColor: [BRAND_COLORS.cyan, BRAND_COLORS.warning],
            hoverBackgroundColor: [BRAND_COLORS.cyanDark, BRAND_COLORS.warning],
            borderWidth: 0,
            },
        ],
    };

    return (
        <div className="surface-panel flex flex-col gap-y-[3px] overflow-hidden">

            <div className=" p-2 grid grid-cols-2 lg:flex items-stretch gap-4 divide-x-[1px] divide-[#DFDFDF]">
                <div className="md:flex items-center gap-4">

                    <div className="relative h-[134px] w-full overflow-hidden rounded-[8.7px] border-[3px] border-primary lg:w-[134px]">
                        <Image layout="fill" objectFit="cover" src={img} alt={altText} />
                    </div>


                    <div className="flex-1 flex flex-col gap-y-[4px]">
                        <h2 className="text-lg font-semibold text-secondary">{unitName}</h2>
                        <h2 className="text-sm font-light text-black">{name}</h2>
                        <p className="text-[12px] leading-[18px] font-semibold text-black">RWF {amount?.toLocaleString()}</p>
                        <p className="text-[12px] text-black font-normal leading-[18px] italic">{place}</p>
                        <p className="text-[10px] text-black leading-[15px]">{location}</p>
                        <div className="flex items-center gap-x-3 justify-between">
                            <div className="flex items-center gap-1">
                                <FloorPlanIconColored width={13} height={13} className="text-[#A0AEC0]" />
                                <span className="text-[12px] leading-[15px] text-[#A0AEC0]">{area} Sqm</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <SofaIcon width={13} height={13} className="text-[#A0AEC0]" />
                                <span className="text-[12px] leading-[15px] text-[#A0AEC0]">{bedRoom}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BathIconColored width={13} height={13} className="text-[#A0AEC0]" />
                                <span className="text-[12px] leading-[15px] text-[#A0AEC0]">{bathRoom}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-y-[17px] items-start justify-evenly px-4">
                    <div className="flex flex-col gap-y-[7px]">
                        <p className="text-[12px] font-semibold leading-[18px] text-black">Number of Units</p>
                        <div className="w-[41px] h-[28px] rounded-[3px] flex justify-center items-center bg-[#A0AEC0]">
                            <p className="text-white text-[14px] leading-[20px]">{unitNumber}</p>
                        </div>

                    </div>

                    <div className="flex flex-col gap-y-[7px]">
                        <p className="text-[12px] font-semibold leading-[18px] text-black">Property Type</p>
                        <div className="flex items-center gap-2">
                            <ApartmentIcon width={13} height={13} className="text-[#707070]" />
                            <p className="text-[#707070] text-[12px] leading-[18px]">{propertyType}</p>

                        </div>
                    </div>

                </div>
                <div className="flex items-stretch justify-evenly p-2">
                    <div className="basis-5/12 flex items-center">
                        <Chart type="doughnut" data={chartData} options={chartOptions} style={{ height: '80px', width: '90%' }} />
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-2 pl-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-[#A0AEC0] text-sm">Available</span>
                            <span className="text-[#707070] text-sm font-semibold ml-auto">{available}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#E5A100]"></div>
                            <span className="text-[#A0AEC0] text-sm">Under Construction</span>
                            <span className="text-[#707070] text-sm font-semibold ml-auto">{underConstruction}</span>
                        </div>
                    </div>

                </div>



                <div className="flex-1 flex flex-col items-center justify-center gap-y-[8px]">
                    <p className="text-[12px] text-black leading-[18px] font-semibold">Approval Status</p>
                    <div className={`w-[88px] h-[28px] rounded-[30px] text-sm flex items-center justify-center  ${approvalStatus === "approved" ? "bg-[#32A07230] text-[#32A072]" : "bg-[#E1A32525] text-[#E1A325]"}`}>{approvalStatus}</div>
                </div>
            </div>
            <hr className="w-full h-[1px] text-[#A0AEC60]" />
            <div className="w-1/2 flex justify-between items-center py-3 px-2">
                <p className="text-[#B5B5B5] text-[12px] italic leading-[18px] flex font-normal">Created at {formatDate(createdAt).replace("at", "").replace(/^(\d+)\s(\w+)\s(\d{4}) (.+)$/, "$2 $1, $3 $4")}</p>
                <p className="text-[#B5B5B5] text-[12px] italic leading-[18px] flex font-normal">Updated at {formatDate(updatedAt).replace("at", "").replace(/^(\d+)\s(\w+)\s(\d{4}) (.+)$/, "$2 $1, $3 $4")}</p>

            </div>
        </div>

    );
};

const RecentlyUpdatedPropertiesRow = async () => {
    const user = await getUserData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data: { latestUpdatedProperties } } = await fetchDashboardRecentlyUpdatedProperties(encodeUrlEmail(user?.email!), 2)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data } = await fetchDashboardSummary(user?.email!);

    return (
        <div className="flex flex-col gap-y-2">
            {
                latestUpdatedProperties.map((recent: any, key: any) => {
                    return (
                        <RecentActivityCard
                            data={data}
                            unitName={recent.name}
                            name={recent.property.name}
                            amount={recent.cost}
                            area={recent.square}
                            bathRoom={recent.bathrooms}
                            bedRoom={recent.bedrooms}
                            propertyType={recent.unitType}
                            unitNumber={recent.availableUnits}
                            approvalStatus={recent.status}
                            img={recent.images[0].url}
                            altText={recent.images[0].altText}
                            createdAt={recent.createdAt}
                            updatedAt={recent.updatedAt}
                            available={recent.availableUnits}
                            underConstruction={0}
                            location={recent.property.address}
                            place={formatPropertyAddressLocation(
                                {
                                    province: recent.property.province,
                                    district: recent.property.district,
                                    sector: recent.property.sector,
                                    cell: recent.property.cell,
                                    village: recent.property.village
                                })}
                            key={key} />
                    )
                })
            }

        </div>

    )
}
export default RecentlyUpdatedPropertiesRow;

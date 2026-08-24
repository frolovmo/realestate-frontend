
import { fetchDashboardSummary } from "../../actions/fetchDashboardInfo"
import SummaryCard from "./SummaryCard";
import NumericCard from "./NumericCard";
import { ChartIcon, HandClickIcon, StarIcon, ViewIcon } from "../../components/icons";
import { getUserData } from "../../actions/auth";
import { Chart } from 'primereact/chart';
import { formatPrice } from "../../lib/utils";
import { Key } from "react";
import { BRAND_COLORS } from "../../lib/brand";

interface UnitTemplateProps {
    unitType:"Apartment" | "TownHouse" | "Detached" | "Others";
    totalUnits:number;
}

interface PropertyTemplateProps {
    status:'pending' | 'active' | 'draft';
    totalProperties:number;
}
const DashboardSummaryRow = async () => {

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false,
                grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                },
            },
            x: {
                display: false,
                grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                },
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        }
    }
    const user = await getUserData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data } = await fetchDashboardSummary(user?.email!);
    const chartData = {
        labels: data?.units.unitTypes.map((type: any) => type.unitType),
        datasets: [
            {
                label: 'Units',
                data: data?.units.unitTypes.map((type: any) => type.totalUnits),
                backgroundColor: [
                    BRAND_COLORS.warning,
                    BRAND_COLORS.cyan,
                    BRAND_COLORS.navySoft,
                    BRAND_COLORS.danger
                ],
                borderColor: [
                    BRAND_COLORS.warning,
                    BRAND_COLORS.cyanDark,
                    BRAND_COLORS.navy,
                    BRAND_COLORS.danger
                ],
                borderWidth: 1,
                borderRadius: Number.MAX_VALUE,
                barPercentage: 0.5,
                categoryPercentage: 0.6,
            }
        ]
    }


    const PropertyNumberTemplate = ({ status, totalProperties }: PropertyTemplateProps) => {

        return (
            <div className="flex flex-col gap-y-4">
                <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center place-self-start border-[3px] text-[16px] font-bold text-black ${status == 'pending' ? 'border-[#E1A325]' : status == "draft" ? 'border-[#FB2C2C]' : 'border-[#32A072]'}`}>{totalProperties}</div>
                <div className=" flex gap-x-1 items-center">
                    <div className={`w-[10px] h-[10px] rounded-full ${status == 'pending' ? 'bg-[#E1A325]' : status == "draft" ? 'bg-[#FB2C2C]' : 'bg-[#32A072]'}`} />
                    <span className="text-[#A0AEC0] text-[12px] leading-[18px]">{status}</span>
                </div>
            </div>
        )
    };
    const UnitTemplates = ({ unitType, totalUnits }:UnitTemplateProps) => {
        return (
            <div className="flex items-center gap-x-[5px]">
                <div className={`h-[10px] w-[10px] rounded-full ${unitType == 'Apartment' ? 'bg-orangelight' : unitType == "TownHouse" ? 'bg-primary' : unitType == "Detached" ? 'bg-secondary' : 'bg-rejected'}`} />
                <p className="text-[#A0AEC0] text-[12px] leading-[18px] w-[80px] truncate">{unitType}</p>
                <p className="text-[#A0AEC0] text-[12px] leading-[18px] flex-grow font-semibold">{totalUnits}</p>
            </div>

        )
    }

    return (

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Properties" value={data?.properties?.total}>
                <div className="grid grid-cols-3 gap-x-8 place-items-center">
                    {data?.properties?.propertyStatuses?.map((prop: PropertyTemplateProps, key: Key) => {
                        return (
                            <PropertyNumberTemplate key={key} status={prop.status} totalProperties={prop.totalProperties} />
                        )
                    })}
                </div>
            </SummaryCard>
            <SummaryCard title="Units" value={data?.units?.total}>
                <div className="flex justify-evenly items-stretch">
                    <div className="basis-2/3 flex justify-stretch">
                        <Chart type="bar" data={chartData} options={chartOptions} style={{ height: '80px', width: '80%' }} />
                    </div>
                    <div className="flex flex-col">
                        {
                            data?.units?.unitTypes?.map((unit: UnitTemplateProps, key: Key) => {
                                return (
                                    <UnitTemplates key={key} unitType={unit.unitType} totalUnits={unit.totalUnits} />
                                )
                            })
                        }
                    </div>
                </div>
            </SummaryCard>
            <NumericCard title="Total Sales">
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex items-center justify-center py-3">
                        <p className="text-[12px] leading-[18px] flex items-center gap-x-2 text-black">
                            RWF <span className="text-[25px] font-medium text-black leading-[37.5px]">{formatPrice(data?.totalMonthlySales?.totalAmount, true)}</span>
                        </p>
                    </div>
                    <hr className="w-full h-[1px] bg-[#DFDFDF]" />
                    <div className="flex justify-between px-2 flex-grow items-center">
                        <div className="flex  items-center gap-x-1">
                            <ChartIcon width={13} height={13} />
                            <p className="text-[#32A072] text-[12px] leading-[18px]">{data?.totalMonthlySales?.percentage}{"%"}</p>
                        </div>
                        <p className="text-[#A0AEC0] text-[12px]">Than Last Month</p>
                    </div>
                </div>

            </NumericCard>
            <NumericCard title="Impression">
                <div className="flex flex-col h-full">
                    <div className="w-full flex justify-center items-center flex-grow py-1">
                        <p className="text-[25px] font-medium leading-[37.5px] text-black">0</p>
                    </div>
                    <div className="w-full grid grid-cols-3 place-items-center py-2">
                        <div className="flex-3 flex gap-1 items-center">
                            <ViewIcon className="text-[#707070]" />
                            <span className="text-[12px] leading-[15px] text-[#707070]">0</span>
                        </div>
                        <div className="flex-3 flex gap-1 items-center">
                            <StarIcon className="text-[#707070]" />
                            <span className="text-[12px] leading-[15px] text-[#707070]">0</span>
                        </div>
                        <div className="flex-3 flex gap-1 items-center">
                            <HandClickIcon className="text-[#707070]" />
                            <span className="text-[12px] leading-[15px] text-[#707070]">0</span>
                        </div>
                    </div>
                    <hr className="w-full h-[1px] bg-[#DFDFDF]" />
                    <div className="flex justify-between px-2 flex-grow items-center">
                        <div className="flex  items-center gap-x-1">
                            <ChartIcon width={13} height={13} />
                            <p className="text-[#32A072] text-[12px] leading-[18px]">0{"%"}</p>
                        </div>
                        <p className="text-[#A0AEC0] text-[12px]">Than Last Month</p>
                    </div>
                </div>
            </NumericCard>
        </div>
    )
}
export default DashboardSummaryRow;

import { Chart } from "primereact/chart";
import { fetchDashboardMonthlySalesPerformance } from "../../actions/fetchDashboardInfo";
import { getUserData } from "../../actions/auth";
import { groupSalesByYear } from "../../lib/utils";
import { BRAND_COLORS } from "../../lib/brand";

const PerformanceGraph = async () => {
    const currentYear = new Date().getFullYear();
    const user = await getUserData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const {data} = await fetchDashboardMonthlySalesPerformance(user?.email!);
    const {monthlySalesPerformance} = data;
    const {fullSalesData} = monthlySalesPerformance;
    const {months,sales} = groupSalesByYear(fullSalesData,currentYear);
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        }
    }

    const performanceData = {
        labels: months,
        datasets: [

            {
                label: "Total sales/month",
                data: sales.map((sale)=>sale.totalAmount),
                borderColor: BRAND_COLORS.cyan,
                tension: 0.4,
                fill: true,
                backgroundColor: "rgba(40, 203, 234, 0.12)"
            }
        ]
    };
    return (
        <div className="surface-panel flex min-h-[400px] w-full flex-col p-4">
            <p className="text-[16px] font-medium leading-[24px] text-secondary">Monthly Sales Performance</p>
            <Chart type="line" data={performanceData} options={chartOptions} height="100%" className="flex-grow" />
        </div>
    )
}
export default PerformanceGraph;

import { Suspense } from "react";
import HeadingBar from "../../components/headingBar/headingBar";
import { PlusIcon } from "../../components/icons";
import Layout from "../../components/layouts/sidebar";
import PopularProperty from "../../components/singlePropertyLayout/popularProperty";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import DashboardSummaryRow from "../../components/StatCards/DashboardSummary";
import { DashboardCardSkeleton, PropertyDetailsSkeleton, PropertyVisitsSkeleton, SalesPerformanceSkeleton } from "../../components/ui/skeletons";
import PerformanceGraph from "../../components/StatCards/performanceGraph";
import RecentlyUpdatedPropertiesRow from "../../components/StatCards/RecentActivityCard";
import { basePath } from "@/lib/constants";


export default async function DashboardPage() {
    return (
        <Layout>
            <main className="w-full h-full">
                <HeadingBar heading="Dashboard">
                    <Link href={`${basePath}/properties/create-property`}>
                        <Button>
                            <PlusIcon className="mr-2 text-white" />
                            New Property
                        </Button>
                    </Link>
                </HeadingBar>

                <div className="flex flex-col gap-y-4 rounded-b-3xl border bg-white p-2">
                    <Suspense fallback={<div className="grid grid-cols-4 gap-4">
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                    </div>
                    }>
                        <DashboardSummaryRow />
                    </Suspense>
                    <div className="flex flex-col gap-y-4 md:flex-row gap-x-2 w-full">
                        <Suspense fallback={<SalesPerformanceSkeleton />}>
                            <PerformanceGraph />
                        </Suspense>
                        <Suspense fallback={<PropertyVisitsSkeleton />}>
                            <PopularProperty wishlist={0} views={0} propertyName="Bwiza Riverside City" />
                        </Suspense>

                    </div>

                    <div className="flex flex-col bg-white p-4 pb-12 rounded gap-y-3">
                        <p className="text-black font-medium text-[16px] leading-[24px]">Recent Activities</p>
                        <Suspense fallback={<PropertyDetailsSkeleton />}>
                        <RecentlyUpdatedPropertiesRow />
                        </Suspense>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

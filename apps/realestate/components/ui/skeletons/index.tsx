import { Skeleton } from "primereact/skeleton";

export const DashboardCardSkeleton = () => {
  return (
    <div className="relative w-full bg-white backdrop-blur-md rounded flex flex-col">
      <div className="w-full px-[18px] py-[9px] flex justify-between items-center">
        <Skeleton height="2rem" className="mb-2 animate-pulse bg-[#f0f0f0] dark:bg-gray-700"></Skeleton>
        <Skeleton height="2rem" className="mb-2 animate-pulse bg-[#f0f0f0] dark:bg-gray-700"></Skeleton>
      </div>
      <hr className="w-[100%] h-[1px] text-[#DFDFDF]" />
      <div className="px-[10px] py-[15px] flex w-full justify-between">
        <Skeleton shape="circle" size="4rem" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700 rounded-full"></Skeleton>
        <Skeleton shape="circle" size="4rem" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700 rounded-full"></Skeleton>
        <Skeleton shape="circle" size="4rem" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700 rounded-full"></Skeleton>
      </div>

    </div>
  )
}
export const PropertyVisitsSkeleton = () => {
  return (
    <div className="bg-white rounded p-3 max-w-[509px] min-w-[509px] flex flex-col">
      <Skeleton width="150px" height="24px" className="mb-3 animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
      <div className="w-full flex">
        <div className="basis-2/3 flex justify-between">
          <div className="flex flex-col items-center">
            <Skeleton width="50px" height="37px" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
            <Skeleton width="70px" height="21px" className="mt-1 animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton width="50px" height="37px" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
            <Skeleton width="70px" height="21px" className="mt-1 animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <Skeleton width="100%" height="1px" className="my-3 bg-[#DFDFDF]" />
      <Skeleton width="200px" height="24px" className="mb-3 bg-[#f0f0f0] animate-pulse" />

      <div className="w-full flex items-center">
        <div className="relative min-w-[346px] max-w-[346px] max-h-[268px] min-h-[268px] bg-[#f0f0f0] shadow-md flex flex-col">
          <Skeleton width="346px" height="226px" className="rounded-t-md animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
          <div className="flex flex-grow items-center justify-center">
            <Skeleton width="120px" height="16px" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
          </div>
        </div>

        <div className="flex flex-col gap-y-[37px] w-full items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton width="80px" height="16px" className="animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
              <Skeleton width="50px" height="16px" className="mt-1 animate-pulse bg-[#f0f0f0] dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export const SalesPerformanceSkeleton = () => {
  return (
    <div className="bg-white w-full flex flex-col pt-4 pl-2 min-h-[400px]">
      <p className="font-medium text-[16px] leading-[24px] text-black">
        <Skeleton width="150px" height="24px" className="bg-[#f0f0f0] animate-pulse mb-2" />
      </p>
      <Skeleton className="flex-grow bg-[#f0f0f0] animate-pulse" height="340" />
    </div>
  );
};

export const PropertyDetailsSkeleton = () => {
  return (
    <div className="flex flex-col bg-white/30 rounded-[5px] border-[2px] border-[#A0AEC60] gap-y-[3px]">
      <div className="p-2 grid grid-cols-2 lg:flex items-stretch gap-4 divide-x-[1px] divide-[#DFDFDF]">
        <div className="flex items-center gap-4">
          <div className="relative h-[134px] w-fit overflow-hidden rounded-[8.7px] border-[3.48px] border-primary lg:w-[134px]">
            <Skeleton width="100%" height="100%" className="bg-[#f0f0f0] animate-pulse" />
          </div>
          <div className="flex-1 flex flex-col gap-y-[6px]">
            <Skeleton width="150px" height="20px" className="bg-primary/25" />
            <Skeleton className="bg-[#f0f0f0] animate-pulse" width="120px" height="16px" />
            <Skeleton className="bg-[#f0f0f0] animate-pulse" width="100px" height="16px" />
            <Skeleton className="bg-[#f0f0f0] animate-pulse" width="80px" height="16px" />
            <div className="flex items-center gap-x-3 justify-between">
              <div className="flex items-center gap-1">
                <Skeleton className="bg-[#f0f0f0] animate-pulse" width="50px" height="15px" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="bg-[#f0f0f0] animate-pulse" width="50px" height="15px" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="bg-[#f0f0f0] animate-pulse" width="50px" height="15px" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-y-[17px] items-start justify-evenly px-4">
          <div className="flex flex-col gap-y-[7px]">
            <p className="text-[12px] font-semibold leading-[18px] text-black">
              <Skeleton className="bg-[#f0f0f0] animate-pulse" width="80px" height="12px" />
            </p>
            <Skeleton width="50px" height="20px" className="bg-[#f0f0f0] animate-pulse" />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <p className="text-[12px] font-semibold leading-[18px] text-black">
              <Skeleton className="bg-[#f0f0f0] animate-pulse" width="80px" height="12px" />
            </p>
            <div className="flex items-center gap-2">
              <Skeleton className="bg-[#f0f0f0f0] animate-pulse" width="50px" height="15px" />
            </div>
          </div>
        </div>
        <div className="flex items-stretch justify-evenly p-2">
          <div className="basis-5/12 flex items-center">
            <Skeleton className="animate-pulse bg-[#f0f0f0]" width="100%" height="80px" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-start w-full">
            <Skeleton className="animate-pulse bg-[#f0f0f0]" width="100%" height="18px" />
            <Skeleton className="animate-pulse bg-[#f0f0f0]" width="100%" height="18px" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-y-[8px]">
          <p className="text-[12px] text-black leading-[18px] font-semibold">
            <Skeleton className="animate-pulse bg-[#f0f0f0f0]" width="100px" height="12px" />
          </p>
          <Skeleton className="animate-pulse bg-[#f0f0f0]" width="88px" height="28px" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-[#A0AEC60]" />
      <div className="w-1/2 flex justify-between items-center py-3 px-2">
        <Skeleton className="animate-pulse bg-[#f0f0f0]" width="150px" height="12px" />
        <Skeleton className="animate-pulse bg-[#f0f0f0]" width="150px" height="12px" />
      </div>
    </div>
  );
};

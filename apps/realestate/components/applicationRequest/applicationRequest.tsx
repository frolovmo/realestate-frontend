import { formatPrice } from "../../lib/utils";
import {
  ApplicationOldGwResponseData,
  PropertyData,
  UnitResponseData,
} from "../../lib/types/index";
import VerticalTimeline, {
  VerticalTimelineStatus,
} from "../verticalTimeline/verticalTimeline";
import {
  ApplicationLevel,
  LevelOneStatus,
  LevelOneStatusMapping,
  LevelTwoStatus,
  LevelTwoStatusMapping,
  applicationLevelStatuses,
} from "./constants/applicationStatus";
import moment from "moment";

interface IApplication extends ApplicationOldGwResponseData {
  property?: PropertyData;
  unit?: UnitResponseData;
}

interface ApplicationRequestProps {
  application: IApplication | null;
}

export default function ApplicationRequest({
  application,
}: ApplicationRequestProps) {
  const levelOneStatus =
    LevelOneStatusMapping[application?.backEndStatus as LevelOneStatus];
  const levelTwoStatus =
    LevelTwoStatusMapping[application?.bankStatus as LevelTwoStatus];

  const levelOneState =
    applicationLevelStatuses[ApplicationLevel.LEVEL_1][levelOneStatus];
  const levelTwoState =
    applicationLevelStatuses[ApplicationLevel.LEVEL_2][levelTwoStatus];

  const timelineItems = [
    levelTwoState,
    levelOneState,
    {
      title: "You submitted application",
      description: "Your request was submitted and is now under review",
      status: VerticalTimelineStatus.INIT,
    },
  ].filter(Boolean);

  const createdDate = application
    ? moment(application.createdAt).format("Do MMMM YYYY, h:mm a")
    : "-";
  return !application ? (
    <div className="p-7 bg-white text-black font-poppins shadow-xl">
      No active applications
    </div>
  ) : (
    <div className="p-7 bg-white text-black font-poppins shadow-xl">
      <p className="font-medium text-lg pb-[18px] border-b border-grayborder">
        {`Application ID: ${application.id}`}
      </p>
      <div className="flex flex-col md:flex-row pt-4 gap-6 md:gap-0">
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          <div className="flex flex-col gap-5 w-full md:w-[214px]">
            <div>
              <p className="text-sm text-lightdark mb-1">Date of application</p>
              <p className="font-medium text-base">{createdDate}</p>
            </div>

            <div>
              <p className="text-sm text-lightdark mb-1">Unit</p>
              <p className="font-medium text-base">
                {application.unit ? application?.unit.name : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-lightdark mb-1">Property</p>
              <p className="font-medium text-base">
                {application.property ? application.property.name : "-"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full md:w-[214px]">
            <div>
              <p className="text-sm text-lightdark mb-1">Max. Loan Value</p>
              <p className="font-medium text-base">{`Rwf ${formatPrice(
                application.propertyValueLimit
              )}`}</p>
            </div>

            <div>
              <p className="text-sm text-lightdark mb-1">Property Loan Value</p>
              <p className="font-medium text-base">{`Rwf ${formatPrice(
                application.presentValue
              )}`}</p>
            </div>

            <div>
              <p className="text-sm text-lightdark mb-1">Interest Rate</p>
              <p className="font-medium text-base">{`${
                (application.interestRate || 0) * 100
              }%`}</p>
            </div>
          </div>
        </div>

        <div className="border-l md:block border-grayborder"></div>
        <div className="md:flex-1 md:pl-14 pl-6">
          <p className="text-sm text-lightdark mb-3">Application Status</p>
          <VerticalTimeline items={timelineItems} />
        </div>
      </div>
    </div>
  );
}

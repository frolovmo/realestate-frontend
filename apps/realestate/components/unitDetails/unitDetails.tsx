"use client";

import { Button } from "../ui/button";
import { badgesForDevelopmentStagesMap } from "../../lib/badgesForDevelopmentStages";
import { facilitiesMap } from "../../lib/facilitiesMap";
import { UnitResponseData, UserData } from "../../lib/types/index";
import { formatDate } from "../../lib/utils";
import StaffActionPanel from "./staffActionPanel";
import UnitInfo from "./unitInfo";
import ApplicantActionPanel from "./applicantActionPanel";
import { rolesMap } from "../../lib/rolesMap";
import PdfViewer from "../pdfViewer/pdfViewer";
import UnitDetailsMap from "../map/unitDetailsMap";
import DeveloperCard from "./developerCard";
import RequestStatus from "./requestStatus";
import UnitDetailsSlider from "../sliders/unitDetailsSlider";
import DeveloperActionPanel from "./DeveloperActionPanel";

interface UnitDetailsProps {
  unit: UnitResponseData;
  user: UserData;
  isApplicantAndApplied?: boolean;
}

const renderActionPanel = (
  user: UserData,
  unit: UnitResponseData,
  isApplicantAndApplied: boolean
) => {
  switch (user?.roleName) {
    case rolesMap.APPROVER.roleName:
      return <StaffActionPanel unit={unit} user={user} />;
    case rolesMap.DEVELOPER.roleName:
      return <DeveloperActionPanel unit={unit} />;
    default:
      return (
        <ApplicantActionPanel
          unit={unit}
          isApplicantAndApplied={isApplicantAndApplied}
        />
      );
  }
};

export default function UnitDetails({
  unit,
  user,
  isApplicantAndApplied = false,
}: UnitDetailsProps) {
  const { property } = unit;
  const fullAddress = `${property.address || ""}, ${property.village || ""}, ${
    property.cell || ""
  }, ${property.sector || ""}, ${property.district || ""}, ${
    property.province || ""
  }`.trim();

  return (
    <div className="bg-white">
      <UnitDetailsSlider images={unit.images} />
      {/* unit */}
      <div className="px-12 text-black font-poppins">
        <div className="border-b border-grayborder pt-7 pb-5">
          <div className="flex justify-between items-center">
            <UnitInfo unit={unit} />
            {renderActionPanel(user, unit, isApplicantAndApplied)}
          </div>

          {user?.roleName === rolesMap.APPROVER.roleName && (
            <div className="font-semibold text-base mt-1.5">
              RWF {unit.cost}
            </div>
          )}
        </div>

        <div className="flex gap-12 justify-between border-b border-grayborder pt-8 pb-5">
          <div className="w-full">
            <div className="flex gap-[90px]">
              <div className="flex flex-col gap-2.5 items-center">
                <p className="text-sm">Total Units</p>
                <div className="text-base font-bold">{unit.availableUnits}</div>
              </div>

              <div className="flex flex-col gap-2.5 items-center">
                <p className="text-sm">Type</p>
                <div className="text-base font-bold">{unit.unitType}</div>
              </div>

              <div className="flex flex-col gap-2.5 items-center">
                <p className="text-sm">Development Stage</p>
                <div className="text-base font-bold">
                  {badgesForDevelopmentStagesMap[unit.developmentStage]}
                </div>
              </div>

              {user?.roleName === rolesMap.APPROVER.roleName ? (
                <div className="flex flex-col gap-2.5 items-center">
                  <p className="text-sm">Date Submitted</p>
                  <div className="text-base font-bold">
                    {formatDate(unit.createdAt)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 items-center">
                  <p className="text-sm">Views</p>
                  <div className="text-base font-bold">{unit.views}</div>
                </div>
              )}
            </div>

            <div className="mt-11">
              <p className="text-sm mb-2.5">Amenities</p>
              <div className="flex flex-wrap gap-2.5">
                {unit.facilities.map((facilityName) => (
                  <Button
                    key={facilityName}
                    variant="default"
                    className="bg-lightgray2 text-black hover:bg-lightgray2"
                  >
                    {facilitiesMap[facilityName] ?? facilityName}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <p className="font-bold text-sm">Description</p>
              <p className="mt-2 text-sm">{unit.description}</p>
            </div>
          </div>

          {user?.roleName === rolesMap.APPROVER.roleName ||
          user?.roleName === rolesMap.DEVELOPER.roleName ? (
            <RequestStatus unit={unit} />
          ) : (
            <DeveloperCard user={user} unit={unit} />
          )}
        </div>

        <div className="flex border-b border-grayborder pt-8 pb-16 gap-10">
          <div className="flex-1">
            <p className="font-semibold text-base mb-6">Floor Plan</p>
            {unit?.floorPlan[0].url ? (
              <PdfViewer
                fileUrl={unit?.floorPlan[0].url}
                fileName={unit?.floorPlan[0].originalName}
              />
            ) : (
              <p className="text-sm mt-2">No document available.</p>
            )}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-base mb-6">Tour Video</p>
            <video
              controls
              aria-label="Video player"
              className="border rounded-md"
            >
              <source src={unit.tourVideo[0].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mt-10 pb-[75px]">
          <div className="mb-9">
            <p className="text-sm">Location</p>
            <p className="font-bold text-sm">{`${property.village}, ${property.cell}, ${property.sector}, ${property.district}, ${property.province}`}</p>
          </div>

          <div className="h-96">
            <UnitDetailsMap address={fullAddress} />
          </div>
        </div>
      </div>
    </div>
  );
}

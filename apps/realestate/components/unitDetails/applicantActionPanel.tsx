import Link from "next/link";
import { UnitResponseData } from "../../lib/types/index";
import Rating from "../rating/rating";
import { Button } from "../ui/button";
import { formatPrice } from "../../lib/utils";
import { basePath } from "../../lib/constants";
import ShareButton from "../shareButton/shareButton";
import { NEXT_BASE_URL } from "@/lib/api";

interface ApplicantActionPanelProps {
  unit: UnitResponseData;
  isApplicantAndApplied: boolean;
}

export default function ApplicantActionPanel({
  unit,
  isApplicantAndApplied,
}: ApplicantActionPanelProps) {
  const renderActionButton = () =>
    isApplicantAndApplied ? (
      <ShareButton
        unitFullUrl={`${NEXT_BASE_URL}${basePath}/unit/${unit.identifier}`}
      />
    ) : (
      <Link
        href={`${basePath}/application/create-application?properyId=${unit.property._id}&unitId=${unit._id}`}
      >
        <Button
          type="button"
          variant="default"
          className="w-[240px] h-[45px] text-base"
        >
          Apply Now
        </Button>
      </Link>
    );

  return (
    <div className="flex justify-between items-center gap-32">
      {renderActionButton()}
      <div className="flex flex-col items-end">
        <p className="font-poppins text-2xl font-bold">{`RWF ${formatPrice(
          unit.cost
        )}`}</p>
        <Rating showCount />
      </div>
    </div>
  );
}

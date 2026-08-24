import UnitDetails from "@/components/unitDetails/unitDetails";
import { fetchUnit } from "@/actions/fetchUnit";
import Modal from "./modal";
import { getUserData, isApplicantRole } from "@/actions/auth";
import fetchApplication from "@/actions/fetchApplication";
import { incrementUnitViews } from "@/actions/incrementUnitViews";
import { unitStatus } from "@/lib/constants";

export const fetchCache = "force-no-store";

export default async function UnitPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const unit = await fetchUnit(id);
  const user = await getUserData();
  const isApplicant = await isApplicantRole();
  const application = isApplicant ? await fetchApplication() : null;
  const isUnitApproved = unit.status === unitStatus.APPROVED;

  let shouldTrackView = false;

  if (isUnitApproved) {
    if (!user) {
      shouldTrackView = true;
    } else if (isApplicant) {
      shouldTrackView = true;
    }
  }

  if (shouldTrackView) {
    await incrementUnitViews(id);
  }

  const isApplicantAndApplied = Boolean(application?.applicationDataFromApiV1);
  return (
    <Modal>
      <UnitDetails
        unit={unit}
        user={user}
        isApplicantAndApplied={isApplicantAndApplied}
      />
    </Modal>
  );
}

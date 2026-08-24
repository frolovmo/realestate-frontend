import { getUserData } from "../../../actions/auth";
import { fetchUnit } from "../../../actions/fetchUnit";
import UnitDetails from "@/components/unitDetails/unitDetails";

export default async function UnitPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const unit = await fetchUnit(id);
  const user = await getUserData();
  return (
    <div className="w-[1200px] m-auto">
      <UnitDetails unit={unit} user={user} />
    </div>
  );
}

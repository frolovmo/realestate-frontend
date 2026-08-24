import { UnitData } from "../../lib/types/index";
import RecommendatonInput from "../recommendatonInput/recommendatonInput";
import RecommendatonList from "../recommendatonList/recommendatonList";

interface RecommendationSearchProps {
  units: UnitData[];
}

export default function RecommendationSearch({
  units,
}: RecommendationSearchProps) {
  return (
    <div>
      <RecommendatonInput />
      <RecommendatonList units={units} />
    </div>
  );
}

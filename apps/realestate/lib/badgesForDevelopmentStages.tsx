import { Badge } from "@/components/ui/badge";
import { DEVELOPMENT_STAGES } from "./constants";

export const badgesForDevelopmentStagesMap = {
  [DEVELOPMENT_STAGES.available]: <Badge variant="primary">Available</Badge>,
  [DEVELOPMENT_STAGES.underConstruction]: (
    <Badge variant="destructive">Under Construction</Badge>
  ),
};

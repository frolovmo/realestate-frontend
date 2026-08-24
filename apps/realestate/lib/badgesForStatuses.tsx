import { Badge } from "../components/ui/badge";
import { STATUSES } from "./constants";

export const badgesForStatusesMap = {
  [STATUSES.APPROVED]: <Badge variant="primary">Approved</Badge>,
  [STATUSES.DRAFT]: <Badge variant="default">Draft</Badge>,
  [STATUSES.PENDING]: <Badge variant="secondary">Pending</Badge>,
  [STATUSES.REQUESTED_MORE_INFO]: (
    <Badge variant="tertiary">Requested Info</Badge>
  ),
  [STATUSES.ONHOLD]: <Badge variant="tertiary">On-Hold</Badge>,
  [STATUSES.REJECTED]: <Badge variant="destructive">Rejected</Badge>,
};

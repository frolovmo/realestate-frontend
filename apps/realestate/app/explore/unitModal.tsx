import { getUserData } from "../../actions/auth";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../../components/ui/dialog";
import UnitDetails from "../../components/unitDetails/unitDetails";
import { UnitResponseData } from "../../lib/types/index";

interface UnitModalProps {
  unit: UnitResponseData;
  children: React.ReactNode;
}

export default async function UnitModal({ children, unit }: UnitModalProps) {
  const user = await getUserData();

  return (
    <Dialog>
      <DialogOverlay>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <UnitDetails unit={unit} user={user} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

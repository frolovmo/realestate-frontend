import { ShareIcon } from "../icons";
import ShareUnit from "../modals/shareUnit";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";

interface ShareButtonProps {
  unitFullUrl: string;
}

export default function ShareButton({ unitFullUrl }: ShareButtonProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          variant="default"
          className="w-[240px] h-[45px] flex justify-center gap-2 text-base"
        >
          <ShareIcon />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent className="flex justify-center w-auto">
          <ShareUnit unitFullUrl={unitFullUrl} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

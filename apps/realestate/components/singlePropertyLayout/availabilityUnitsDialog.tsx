"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AvailabilityUnitsModal from "./availabilityUnitsModal";
import { PropertyData } from "../../lib/types/index";
import { EditIcon } from "../icons";

interface AvailabilityUnitsDialogProps {
  property: PropertyData;
}
export default function AvailabilityUnitsDialog({
  property,
}: AvailabilityUnitsDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="p-[3px] cursor-pointer">
          <EditIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <AvailabilityUnitsModal
          property={property}
          onUpdate={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

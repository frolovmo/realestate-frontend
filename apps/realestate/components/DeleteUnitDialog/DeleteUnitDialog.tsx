/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import ConfirmBaseModal from "../modals/ConfirmBaseModal";
import useModal from "@/lib/hooks/useModal";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { deleteUnit } from "@/actions/deleteUnit";
import { basePath } from "@/lib/constants";

interface IDeleteUnitDialog {
  unitName: string;
  unitIdentifier: string;
  propertyIdentifier: string;
}

const DeleteUnitDialog = ({
  unitName,
  unitIdentifier,
  propertyIdentifier,
}: IDeleteUnitDialog) => {
  const toast = useRef<Toast>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { open, onOpen, onClose } = useModal();

  const onDeleteUnit = async () => {
    try {
      setLoading(true);

      await deleteUnit(unitIdentifier);

      toast.current?.show({
        severity: "success",
        summary: "Unit deleted successfully!",
        life: 2000,
      });

      router.push(`${basePath}/properties/${propertyIdentifier}`);
      router.refresh();
    } catch (error: any) {
      onClose();

      toast.current?.show({
        severity: "error",
        summary: error?.message || "Something went wrong",
        life: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogTrigger disabled={loading}>
          <Button
            variant="error"
            loading={loading}
            onClick={onOpen}
            className="mr-4"
          >
            <TrashIcon className="mr-2 text-base w-[16px] h-[16px]" />
            Delete Unit
          </Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <ConfirmBaseModal
            title="Delete Unit"
            description={`Are you sure you want to delete unit "${unitName}"? This action cannot be undone.`}
            loading={loading}
            onClose={onClose}
            onConfirm={onDeleteUnit}
          />
        </DialogContent>
      </Dialog>

      <Toast ref={toast} />
    </div>
  );
};

export default DeleteUnitDialog;

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
import { basePath } from "@/lib/constants";
import { deleteProperty } from "@/actions/deleteProperty";

interface IDeletePropertyDialog {
  name: string;
  identifier: string;
}

const DeletePropertyDialog = ({ name, identifier }: IDeletePropertyDialog) => {
  const toast = useRef<Toast>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { open, onOpen, onClose } = useModal();

  const onDeleteProperty = async () => {
    try {
      setLoading(true);

      await deleteProperty(identifier);

      toast.current?.show({
        severity: "success",
        summary: "Property deleted successfully!",
        life: 2000,
      });

      router.push(`${basePath}/properties`);
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
          <Button variant="error" loading={loading} onClick={onOpen}>
            <TrashIcon className="mr-2 text-base w-[16px] h-[16px]" />
            Delete Property
          </Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <ConfirmBaseModal
            title="Delete Property"
            description={`Are you sure you want to delete property "${name}"? This action cannot be undone. Along with the property all its units will be deleted.`}
            loading={loading}
            onClose={onClose}
            onConfirm={onDeleteProperty}
          />
        </DialogContent>
      </Dialog>

      <Toast ref={toast} />
    </div>
  );
};

export default DeletePropertyDialog;

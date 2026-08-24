"use client";
import { basePath } from "../../../../lib/constants";
import { CloseIcon, ExpandIcon } from "../../../../components/icons";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }

  const fromPage = searchParams.get("from");
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      onClick={handleOverlayClick}
      className="w-[80%]"
    >
      <div className="flex justify-end items-center w-full h-[30px] bg-primary">
        {fromPage === "requests" && (
          <button
            className="p-2"
            onClick={() => router.push(`${basePath}/requests/${id}`)}
          >
            <ExpandIcon />
          </button>
        )}
        <button onClick={() => dialogRef.current?.close()} className="p-2">
          <CloseIcon width={23} height={23} />
        </button>
      </div>
      <div>{children}</div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}

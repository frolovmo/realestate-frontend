"use client";

import ConfirmApproval from "@/components/modals/confirmApproval";
import { badgesForStatusesMap } from "../../lib/badgesForStatuses";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UnitResponseData, UserData } from "../../lib/types/index";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { basePath, unitStatus } from "../../lib/constants";
import { useRouter } from "next/navigation";
import { authenticatedApiRequest } from "@/actions/authenticatedApi";
import ApprovalProcessConfirmModal from "../modals/ApprovalProcessConfirmModal";

interface StaffActionPanelProps {
  unit: UnitResponseData;
  user: UserData;
}

export default function StaffActionPanel({
  unit,
  user,
}: StaffActionPanelProps) {
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { identifier } = unit;

  const isStatusPending =
    unit.status === unitStatus.PENDING ||
    unit.status === unitStatus.REQUESTED_MORE_INFO;

  async function updateRequest(
    identifier: string,
    status: string,
    message?: string
  ) {
    try {
      const response = await authenticatedApiRequest(
        `/requests/${identifier}`,
        {
        method: "PUT",
          body: {
          status,
          statusHistory: [
            {
              userId: user?.userId,
              name: user?.fullName,
              // date,
              ...(message && { message }),
              status,
            },
          ],
          ...(message && { message }),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update unit status");
      }
    } catch (error) {
      console.error("Error updating unit status:", error);
      throw error;
    }

    router.push(`${basePath}/requests`);
    router.refresh();
  }

  const approveHandler = () => {
    startTransition(() => updateRequest(identifier, unitStatus.APPROVED));
    router.push(`${basePath}/requests`);
  };

  const rejectHandler = (message: string) => {
    startTransition(() =>
      updateRequest(identifier, unitStatus.REJECTED, message)
    );
    router.push(`${basePath}/requests`);
  };

  const requestMoreInfoHandler = (message: string) => {
    startTransition(() =>
      updateRequest(identifier, unitStatus.REQUESTED_MORE_INFO, message)
    );
    router.push(`${basePath}/requests`);
  };

  return (
    <>
      {isStatusPending ? (
        <div className="flex gap-3.5">
          <div>
            <Dialog
              open={openApprovalModal}
              onOpenChange={setOpenApprovalModal}
            >
              <DialogTrigger>
                <Button variant="default" size="lg" className="w-[150px]">
                  {isPending ? "Processing..." : "Approve"}
                </Button>
              </DialogTrigger>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <ConfirmApproval
                  isPending={isPending}
                  sendApproval={approveHandler}
                  onCancel={() => setOpenApprovalModal(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Dialog open={openRequestModal} onOpenChange={setOpenRequestModal}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-[150px] text-googlelink border-googlelink hover:text-googlelink"
                >
                  {isPending ? "Processing..." : "Need More Info"}
                </Button>
              </DialogTrigger>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <ApprovalProcessConfirmModal
                  title="Request More Information"
                  description="What additional information do you need to approve this listing?"
                  loading={isPending}
                  onClose={() => setOpenRequestModal(false)}
                  onConfirm={requestMoreInfoHandler}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-[150px] text-rejected border-rejected hover:text-rejected"
                  onClick={() => setOpenRejectModal(true)}
                >
                  {isPending ? "Processing..." : "Reject"}
                </Button>
              </DialogTrigger>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <ApprovalProcessConfirmModal
                  title="Reject Unit"
                  description="What additional information do you need to approve this listing?"
                  loading={isPending}
                  onClose={() => setOpenRejectModal(false)}
                  onConfirm={rejectHandler}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div>{badgesForStatusesMap[unit.status]}</div>
      )}
    </>
  );
}

import { PointerIcon } from "@/components/icons";
import PriceFormat from "@/components/priceFormat/priceFormat";
import { badgesForStatusesMap } from "../../lib/badgesForStatuses";
import Image from "next/image";
import { Application } from "../../lib/types/index";

const applicantsMock = [
  {
    applicantName: "Jules Mazimpaka",
    avatar: "/images/user1.png",
    jobOccupation: "Self-Employed",
    appliedUnit: "Igisenge Home",
    priceInfo: {
      cost: "23,850,00",
      currency: "RWF",
    },
    applignmentDate: "28th August 2024",
    status: "approved",
  },
  {
    applicantName: "Titus Mucyo",
    avatar: "/images/user2.png",
    jobOccupation: "Software Developer",
    appliedUnit: "Iwacu Fam",
    priceInfo: {
      cost: "34,550,00",
      currency: "RWF",
    },
    applignmentDate: "23th August 2024",
    status: "pending",
  },
  {
    applicantName: "Cheina Giramata",
    avatar: "/images/user3.png",
    jobOccupation: "Fashion Designer",
    appliedUnit: "Celibates",
    priceInfo: {
      cost: "23,850,00",
      currency: "RWF",
    },
    applignmentDate: "14th August 2024",
    status: "onHold",
  },
  {
    applicantName: "Tania Keza",
    avatar: "/images/user4.png",
    jobOccupation: "Business Advisor",
    appliedUnit: "Kalima House",
    priceInfo: {
      cost: "41,800,00",
      currency: "RWF",
    },
    applignmentDate: "2nd July 2024",
    status: "rejected",
  },
] as const;

interface ApplicantsProps {
  applicants: Application[];
}

export default function Applicants({ applicants }: ApplicantsProps) {
  return (
    <div className="flex-1 p-4 border border-grayborder rounded-extra">
      <div className="flex justify-between items-center py-1 mb-3">
        <p className="font-medium text-black text-2xl">Applicants</p>
        <PointerIcon />
      </div>

      {applicants.length ? (
        <table className="font-poppins w-full border-collapse">
          <thead className="text-left text-lightdark">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Unit</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="">
            {applicants.map((applicant) => (
              <tr key={applicant.applicantName} className="border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={applicant.avatar}
                      alt="applicant picture"
                      width={36}
                      height={36}
                      className="rounded-full w-9 h-9"
                    />
                    <div>
                      <div className="text-black text-sm font-medium">
                        {applicant.applicantName}
                      </div>
                      <div className="text-lightdark font-light text-xs leading-[18px]">
                        {applicant.jobOccupation}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-black font-normal text-sm">
                      {applicant.appliedUnit}
                    </div>
                    <PriceFormat
                      currency={applicant.priceInfo.currency}
                      cost={100000}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">{applicant.applignmentDate}</div>
                </td>
                <td className="px-4 py-3">
                  {badgesForStatusesMap[applicant.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center font-poppins text-base font-normal p-2">
          No applicants yet
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { PencilIcon } from "lucide-react";

import { Button } from "../ui/button";

import { basePath } from "@/lib/constants";
import { badgesForStatusesMap } from "@/lib/badgesForStatuses";
import { EditUnitStatuses, UnitStatus } from "@/lib/constants/units";

import { UnitResponseData } from "@/lib/types";
import DeleteUnitDialog from "../DeleteUnitDialog";

interface IDeveloperActionPanelProps {
  unit: UnitResponseData;
}

const DeveloperActionPanel = ({ unit }: IDeveloperActionPanelProps) => {
  const showEditButton = EditUnitStatuses.includes(unit.status as UnitStatus);

  return (
    <div className="flex items-center">
      <DeleteUnitDialog
        unitName={unit.name}
        unitIdentifier={unit.identifier}
        propertyIdentifier={unit.property.identifier}
      />

      {showEditButton && (
        <Link
          href={`${basePath}/properties/${unit.property.identifier}/${unit.identifier}/edit`}
        >
          <Button variant="outline" className="mr-8 text-secondary">
            <PencilIcon className="mr-2 h-[16px] w-[16px] text-base text-secondary" />
            Edit Unit
          </Button>
        </Link>
      )}

      <div>{badgesForStatusesMap[unit.status]}</div>
    </div>
  );
};

export default DeveloperActionPanel;

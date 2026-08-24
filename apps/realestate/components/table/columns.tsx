"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { badgesForStatusesMap } from "@/lib/badgesForStatuses";
import SortingControls from "../sortingControls/sortingControls";
import { UnitResponseData } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export type RequestTableColumn = UnitResponseData;

export const columns: ColumnDef<RequestTableColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="text-xs font-medium leading-5 text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <SortingControls isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-poppins font-medium text-sm text-black">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "property.name",
    header: ({ column }) => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Developer
          <SortingControls isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <div className="font-poppins font-medium text-sm text-black">
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
        >
          Description
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <div className="font-poppins font-medium text-sm text-lightdark">
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <SortingControls isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => badgesForStatusesMap[getValue<string>()],
  },
  {
    accessorKey: "name",
    header: () => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
        >
          Item
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, identifier } = row.original;
      return (
        <div className="font-poppins font-medium text-sm text-black">
          <div>{name}</div>
          <div className="text-xs text-lightdark">{identifier}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: () => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
        >
          Amount
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.cost;
      return (
        <div className="font-poppins font-medium text-sm text-black">
          <div>{formatPrice(price)}</div>
          <div className="text-xs text-lightdark">RWF</div>
        </div>
      );
    },
  },
  {
    accessorKey: "square",
    header: () => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
        >
          Size(SQM)
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <div className="font-poppins font-medium text-sm text-black">
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "specs",
    header: () => {
      return (
        <Button
          variant="transparent"
          size="content"
          className="font-poppins font-medium text-sm text-darkneutral"
        >
          Specs
        </Button>
      );
    },
    cell: ({ row }) => {
      const { bedrooms, bathrooms } = row.original;
      return (
        <div className="font-poppins font-medium text-sm text-black">
          <div>{bedrooms} Beds</div>
          <div className="text-xs text-lightdark">{bathrooms} Baths</div>
        </div>
      );
    },
  },
];

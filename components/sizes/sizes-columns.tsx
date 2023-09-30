"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "@/components/sizes/cell-actions";

export type Size = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const SizesColumn: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Size Name",
  },
  {
    accessorKey: "value",
    header: "Size Value",
  },
  {
    accessorKey: "createdAt",
    header: "Creation DateTime",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";

export type Billboard = {
  id: string;
  label: string;
  createdAt: string;
};

export const BillboardColumns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
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

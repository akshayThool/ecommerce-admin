"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/categories/cell-actions";

export type CategoryColumns = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const Categories: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard Label",
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

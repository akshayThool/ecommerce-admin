"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "@/components/colors/cell-actions";

export type Color = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const ColorsColumn: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Color Name",
  },
  {
    accessorKey: "value",
    header: "Color Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div
          className="h-6 w-6 border"
          style={{ backgroundColor: row.original.value }}
        />
        {row.original.value}
      </div>
    ),
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

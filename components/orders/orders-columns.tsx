import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
};

export const OrderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Product",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { BillboardColumns } from "@/components/billboards/billboards-columns";

interface BillboardsClientProps {
  data: Billboard[];
}

export const BillboardsClient: React.FC<BillboardsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const formattedData = data.map((row) => ({
    id: row.id,
    label: row.label,
    createdAt: format(row.createdAt, "HH:mm dd/MM/yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage Billboards for the Store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable
          columns={BillboardColumns}
          data={formattedData}
          searchKey="label"
        />
      </div>
    </>
  );
};

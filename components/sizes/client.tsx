"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { SizesColumn } from "@/components/sizes/sizes-columns";

interface SizesClientProps {
  data: Size[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const formattedData = data.map((row) => ({
    id: row.id,
    name: row.name,
    value: row.value,
    createdAt: format(row.createdAt, "HH:mm dd/MM/yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage Sizes for the Store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable
          columns={SizesColumn}
          data={formattedData}
          searchKey="label"
        />
      </div>
      <Heading title="APIs" description="Api Calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityId="sizeId" />
    </>
  );
};

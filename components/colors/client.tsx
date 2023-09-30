"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { ColorsColumn } from "@/components/colors/colors-columns";

interface ColorsClientProps {
  data: Color[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
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
          title={`Colors (${data.length})`}
          description="Manage Colors for the Store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable
          columns={ColorsColumn}
          data={formattedData}
          searchKey="name"
        />
      </div>
      <Heading title="APIs" description="Api Calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityId="colorId" />
    </>
  );
};

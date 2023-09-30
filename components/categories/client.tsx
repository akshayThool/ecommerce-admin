"use client";

import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Categories } from "@/components/categories/categories-columns";
import { ApiList } from "@/components/ui/api-list";

interface CategoriesClientProps {
  data: Category[];
}
export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const formattedData = data.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "HH:mm dd/MM/yyyy"),
  }));
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for the store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Categories} data={formattedData} searchKey="name" />
      <Heading title="APIs" description="Api Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityId="categoryId" />
    </>
  );
};

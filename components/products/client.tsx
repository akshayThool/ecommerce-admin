"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import {
  Product,
  ProductColumns,
} from "@/components/products/products-columns";

interface ProductsClientProps {
  data: Product[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  // const formattedData = data.map((row) => ({
  //   id: row.id,
  //   name: row.name,
  //   isFeatured: row.isFeatured,
  //   isArchived: row.isArchived,
  //   price: priceFormatter.format(row.price.toNumber()),
  //   category: row.category.name,
  //   size: row.size.name,
  //   color: row.color.name,
  //   createdAt: format(row.createdAt, "HH:mm dd/MM/yyyy"),
  // }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products for the Store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={ProductColumns} data={data} searchKey="name" />
      </div>
      <Heading title="APIs" description="Api Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityId="productId" />
    </>
  );
};

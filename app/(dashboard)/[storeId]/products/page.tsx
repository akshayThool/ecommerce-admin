import prismadb from "@/lib/prismadb";
import { ProductsClient } from "@/components/products/client";
import { priceFormatter } from "@/lib/utils";
import { format } from "date-fns";
import { Product } from "@/components/products/products-columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const updatedProducts: Product[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: priceFormatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.name,
    createdAt: format(product.createdAt, "HH:mm dd/MM/yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={updatedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;

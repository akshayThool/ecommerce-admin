import { CategoriesClient } from "@/components/categories/client";
import prismadb from "@/lib/prismadb";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex=1 space-y-4 p-8 pt-6">
        <CategoriesClient data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;

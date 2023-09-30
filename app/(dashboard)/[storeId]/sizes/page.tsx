import { SizesClient } from "@/components/sizes/client";
import prismadb from "@/lib/prismadb";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={sizes} />
      </div>
    </div>
  );
};

export default SizesPage;

import { ColorsClient } from "@/components/colors/client";
import prismadb from "@/lib/prismadb";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
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
        <ColorsClient data={colors} />
      </div>
    </div>
  );
};

export default SizesPage;

import { BillboardsForm } from "@/components/billboards/billboards-form";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;

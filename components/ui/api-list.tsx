"use client";

import { ApiAlert } from "@/components/ui/alert-api";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityId: string;
}
export const ApiList: React.FC<ApiListProps> = ({ entityName, entityId }) => {
  const params = useParams();
  const origin = useOrigin();
  return (
    <>
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityId}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${origin}/api/stores/${params.storeId}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityId}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityId}}`}
        variant="admin"
      />
    </>
  );
};

import { Button } from "@/components/ui/button";
import { Route } from "@/routes/attributes.$attributeId";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { attributeQueryOptions } from "./api";
import { AttributeCard } from "./AttributeCard";
import { ArrowLeftIcon } from "lucide-react";
import { queryClient, useDeleteAttributeByIdQuery } from "@/react-query";
import { ATTRIBUTES_QUERY_KEY } from "../attributes";
import { labelsQueryOptions } from "@/react-query";
import { useMemo } from "react";

export const AttributePage = () => {
  const { attributeId } = Route.useParams();
  const { data: labels } = useSuspenseQuery(labelsQueryOptions);
  const { data } = useSuspenseQuery(attributeQueryOptions(attributeId, labels));
  const router = useRouter();

  const attribute = useMemo(() => {
    data.data.labels = data.data.labelIds.map(
      (id) => labels.data.find((label) => label.id === id)?.name,
    );
    return data.data;
  }, [data.data, labels.data]);

  const { mutate } = useDeleteAttributeByIdQuery(() => {
    router.history.back();
    queryClient.invalidateQueries({
      queryKey: [ATTRIBUTES_QUERY_KEY],
    });
  });

  return (
    <div className="flex flex-col gap-4 py-3">
      <div>
        <Button className="flex gap-2" onClick={() => router.history.back()}>
          <ArrowLeftIcon size={18} /> Back to Attributes
        </Button>
      </div>
      <AttributeCard onDelete={mutate} attribute={attribute} />
    </div>
  );
};

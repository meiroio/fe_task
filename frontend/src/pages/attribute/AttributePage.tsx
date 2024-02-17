import { Button } from "@/components/ui/button";
import { Route } from "@/routes/attributes.attribute";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { attributeQueryOptions } from "./api";
import { AttributeCard } from "./AttributeCard";
import { ArrowLeftIcon } from "lucide-react";

export const AttributePage = () => {
  const { attributeId } = Route.useSearch();
  const { data } = useSuspenseQuery(attributeQueryOptions(attributeId));
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 py-3">
      <div>
        <Button className="flex gap-2" onClick={() => router.history.back()}>
          <ArrowLeftIcon size={18} /> Back to Attributes
        </Button>
      </div>
      <AttributeCard attribute={data.data} />
    </div>
  );
};

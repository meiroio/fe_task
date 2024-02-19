import { api } from "@/lib/api.service";
import { AttributeType } from "@/types/attributes";
import { LabelsQuery } from "@/types/labels";
import { queryOptions } from "@tanstack/react-query";

export const ATTRIBUTE_QUERY_KEY = "attribute";

export const fetchAttributeById = async (attributeId: string) => {
  const response = await api.get(`/attributes/${attributeId}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const attributeQueryOptions = (
  attributeId: string,
  labels?: LabelsQuery,
) =>
  queryOptions<{ data: AttributeType }>({
    queryKey: [ATTRIBUTE_QUERY_KEY, attributeId, labels],
    queryFn: () => fetchAttributeById(attributeId),
    enabled: !!labels,
  });

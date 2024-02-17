import { AttributeType } from "@/types/attributes";
import { queryOptions } from "@tanstack/react-query";

export const ATTRIBUTES_QUERY_KEY = "attribute";

export const fetchAttributeById = async (attributeId: string) => {
  const url = new URL(`http://localhost:3000/attributes/${attributeId}`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const attributeQueryOptions = (attributeId: string) =>
  queryOptions<{ data: AttributeType }>({
    queryKey: [ATTRIBUTES_QUERY_KEY, attributeId],
    queryFn: () => fetchAttributeById(attributeId),
  });

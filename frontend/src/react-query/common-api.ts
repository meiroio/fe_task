import { queryOptions, useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/api.service";
import { LabelsQuery } from "@/types/labels";

/*
 * API + Query to delete attribute by id
 */
const deleteAttribute = async (id: string) => {
  const response = await api.delete(`/attributes/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useDeleteAttributeByIdQuery = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: deleteAttribute,
    onSuccess: () => {
      onSuccess?.();
      toast({
        title: "Attribute has been successfully deleted",
        variant: "destructive",
      });
    },
  });

  return {
    mutate: mutation.mutate,
  };
};
/*
 * END of attribute delete query
 */

/*
 * Fetch all labels
 */
const fetchAllLabels = async () => {
  let offset = 0;
  const limit = 10;
  const response = await api.get(`/labels?offset=${offset}&limit=${limit}`);
  const data = (await response.json()) as LabelsQuery;

  while (data.meta.hasNextPage) {
    offset += limit;
    const res = await api.get(`/labels?offset=${offset}&limit=${limit}`);
    const jsonRes = (await res.json()) as LabelsQuery;
    data.meta = jsonRes.meta;
    data.data.push(...jsonRes.data);
  }

  return data;
};

export const labelsQueryOptions = queryOptions<LabelsQuery>({
  queryKey: ["labels"],
  queryFn: fetchAllLabels,
});
/*
 * END of fetch all albels
 */

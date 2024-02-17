import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/api.service";

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

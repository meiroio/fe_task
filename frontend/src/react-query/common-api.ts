import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

/*
 * API + Query to delete attribute by id
 */
const deleteAttribute = async (id: string) => {
  const response = await fetch(`http://localhost:3000/attributes/${id}`, {
    method: "DELETE",
  });

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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "../../../contexts/ToastContext";
import { Attribute, BASE_URL } from "../../../types";

type AttributeResponseData = {
  data: Attribute;
};

const fetchAttribute = async (attributeId: string) => {
  const l = await fetch(`${BASE_URL}/attributes/${attributeId}`);
  const data = await l.json();
  return data;
};

const deleteAttribute = async (id: string) => {
  const l = await fetch(`${BASE_URL}/attributes/${id}`, {
    method: "DELETE",
  });
  const data = await l.json();
  return data;
};

const useGetAttribute = (attributeId: string) => {
  const data = useQuery<AttributeResponseData>(["fetchAttribute"], () =>
    fetchAttribute(attributeId)
  );
  return { ...data };
};

export const useDeleteAttribute = (onSuccess?: () => void) => {
  const { setToastInfo } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation(deleteAttribute, {
    onSuccess: () => {
      setToastInfo({
        isOpen: true,
        message: "item successfully deleted",
        type: "Success",
      });

      queryClient
        .invalidateQueries(["infiniteAttributes"])
        .then(() => onSuccess && onSuccess());
    },
    onError: () => {
      setToastInfo({
        isOpen: true,
        message: "Error Deleting Item",
        type: "Error",
      });
    },
  });
};

export default useGetAttribute;

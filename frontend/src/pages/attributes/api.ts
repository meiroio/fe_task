import { AttributeQuery } from "@/types/attributes";
import { queryOptions } from "@tanstack/react-query";

export const attributesQueryOptions = queryOptions<AttributeQuery>({
  queryKey: ["attributes"],
  queryFn: async () => {
    const res = await fetch("http://localhost:3000/attributes");
    return res.json();
  },
});

import { useSuspenseQuery } from "@tanstack/react-query";
import { attributesQueryOptions } from "./api";

export const Attributes = () => {
  const { data } = useSuspenseQuery(attributesQueryOptions);

  return (
    <div className="p-2">
      {data.data.map((d) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
};

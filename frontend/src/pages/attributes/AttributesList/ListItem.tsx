import { cn } from "@/lib/utils";
import { AttributeType } from "@/types/attributes";

type Props = {
  attribute: AttributeType;
  className?: string;
};

export const ListItem = ({ attribute, className }: Props) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <p className="flex-1">{attribute.name}</p>
      <p className="flex-1">{attribute.labelIds.join(", ")}</p>
      <p className="flex-1">
        {new Date(attribute.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

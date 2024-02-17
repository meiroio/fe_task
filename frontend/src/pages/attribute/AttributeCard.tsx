import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AttributeType } from "@/types/attributes";

type Props = {
  attribute: AttributeType;
  onDelete: (attributeId: string) => void;
};

export const AttributeCard = ({ attribute, onDelete }: Props) => {
  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <CardTitle>{attribute.name}</CardTitle>
        <CardDescription>Attribute Detail</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <p className="font-semibold">Labels</p>
          <p>{attribute.labelIds.join(", ")}</p>
        </div>
        <div>
          <p className="font-semibold">Created At</p>
          <p>{new Date(attribute.createdAt).toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onDelete(attribute.id)}
          className="w-full"
          variant="destructive"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

import { formatDateString } from "@/helpers/dateFormatter";
import {
  Attribute,
  deleteAttribute,
  getAttribute,
} from "@/services/attributesService";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/shadcn/ui/alert-dialog";
import { Button } from "@/ui/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/shadcn/ui/card";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { labels } from "../../../backend/src/labels/data";
import { matchLabelNames } from "@/helpers/matchLabelNames";

export default function AttributeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: attribute,
    isLoading,
    isFetching,
  } = useQuery<{ data: Attribute }>({
    queryKey: [`attributes`],
    queryFn: () => getAttribute(id || ""),
  });

  if (isLoading || !attribute || isFetching) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        Loading...
      </div>
    );
  }

  const correspondingLabelNames: string[] = matchLabelNames(
    labels,
    attribute.data.labelIds
  );

  return (
    <AlertDialog>
      <div className="container mx-auto py-10 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{attribute?.data.name}</CardTitle>
            <CardDescription>
              {formatDateString(attribute.data.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {correspondingLabelNames.map((name) => {
              return <span key={name}>[{name}]&nbsp;</span>;
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <AlertDialogTrigger>
              <Button variant="destructive">
                {" "}
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
          </CardFooter>
        </Card>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete attribute
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteAttribute(attribute.data.id);
              navigate("/attributes");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

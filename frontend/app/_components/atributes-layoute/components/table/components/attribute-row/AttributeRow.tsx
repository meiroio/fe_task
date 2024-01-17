"use client";
import { AiFillDelete } from "react-icons/ai";
import { Attribute, Label } from "../../../../AttributesLayoute.types";
import LabelPin from "../label-pin/LabelPin";
import useApi from "@/app/_api/api";
import { useModal } from "@/app/_contexts/modal-context/ModalContext";
import { useRouter } from "next/navigation";
import { useLabels } from "@/app/_contexts/labels-context/LabelsContext";

interface AttributeRowProps {
  attribute: Attribute;
  isEditMode?: boolean;
  refetch?: () => Promise<any>;
}
const AttributeRow: React.FC<AttributeRowProps> = ({
  attribute,
  isEditMode,
  refetch,
}) => {
  const { openModal } = useModal();
  const { deleteAttribute } = useApi();
  const { labels } = useLabels();
  const router = useRouter();

  const handleDeleteAttribute = (attributeId: string) => {
    openModal({
      header: "Delete Attribute",
      body: "Are you sure you want to delete this attribute?",
      onConfirm: async () => {
        await deleteAttribute(attributeId);
        refetch ?? (await refetch!());
      },
      confirmText: "Delete",
      icon: <AiFillDelete className="w-10 h-10 text-red-600" />,
    });
  };

  return (
    <tr
      onClick={() => {
        if (!isEditMode) router.push(`/attributes/${attribute.id}`);
      }}
      className={`${
        !isEditMode
          ? "hover:bg-orange-100 cursor-pointer"
          : "bg-gray-200  cursor-default"
      } transition-all  `}
    >
      {}
      <td className="px-6 py-4 whitespace-nowrap font-medium">
        {attribute.name}
      </td>
      <td className="px-6 py-4 flex gap-2 whitespace-wrap">
        {attribute.labelIds.map((labelId, index) => {
          const label =
            labels.find((label) => label.id === labelId)?.name ??
            "missing label";
          return (
            <LabelPin
              text={label}
              key={`label-${index}-of-atttribute-${attribute.id}`}
            />
          );
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(attribute.createdAt).toLocaleDateString()}
      </td>

      {isEditMode && (
        <td className=" whitespace-nowrap  text-sm font-medium flex items-center justify-center ">
          <button
            onClick={() => handleDeleteAttribute(attribute.id)}
            className="text-red-600 hover:text-red-900 hover:bg-red-200 rounded-lg h-10 w-10 flex items-center justify-center"
          >
            <AiFillDelete />
          </button>
        </td>
      )}
    </tr>
  );
};

export default AttributeRow;

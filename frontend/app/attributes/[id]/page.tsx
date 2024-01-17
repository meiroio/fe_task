"use client";
import useApi from "@/app/_api/api";
import { Attribute } from "@/app/_components/atributes-layoute/AttributesLayoute.types";
import AttributeRow from "@/app/_components/atributes-layoute/components/table/components/attribute-row/AttributeRow";
import { useModal } from "@/app/_contexts/modal-context/ModalContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiFillDelete } from "react-icons/ai";

const DetailScreen: React.FC = () => {
  const [attribute, setAttribute] = useState<Attribute>();
  const { openModal } = useModal();
  const { deleteAttribute } = useApi();
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const { fetchAttribut } = useApi();

  useEffect(() => {
    fetchAttribut(id).then((attribute) => setAttribute(attribute.data));
  }, []);

  const handleDeleteAttribute = (attributeId: string) => {
    openModal({
      header: "Delete Attribute",
      body: "Are you sure you want to delete this attribute?",
      onConfirm: async () => {
        await deleteAttribute(attributeId);
        router.push("/attributes");
      },
      confirmText: "Delete",
      icon: <AiFillDelete className="w-10 h-10 text-red-600" />,
    });
  };

  return (
    <main className=" self-center  gap-12 flex min-h-screen flex-col items-top w-[80vw] bg-gray-100 ">
      <h1 className="text-4xl pt-24 font-bold text-center">{`Attribute ID ${id}`}</h1>
      <div className=" absolute  px-6 py-6 rounded-md w-fit">
        <AiOutlineLeft
          className="w-10 h-10 cursor-pointer text-black hover:text-orange-700 transition-all"
          onClick={() => {
            router.push("/attributes");
          }}
        />
      </div>
      <div className="flex flex-col gap-8  w-[60vw] self-center">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Name", "Created"].map((header, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {attribute ? (
            <tbody className="bg-white divide-y divide-gray-200">
              <AttributeRow
                attribute={attribute}
                isEditMode={false}
                key={`attribute-${attribute.id}`}
              />
            </tbody>
          ) : (
            <></>
          )}
        </table>
        <button
          onClick={() => handleDeleteAttribute(id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md w-fit"
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default DetailScreen;

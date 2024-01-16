import React from "react";
import { Attribute, Label } from "../../AttributesLayoute.types";
import AttributeRow from "./components/attribute-row/AttributeRow";

interface TableProps {
  data: Attribute[];
  labels: Label[];
  isEditMode: boolean;
}

const Table: React.FC<TableProps> = ({ data, labels, isEditMode }) => {
  let heads = ["Name", "Labels", "Created At"];

  if (isEditMode) {
    heads = [...heads, "Actions"];
  }

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {heads.map((header, idx) => (
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
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((attribute) => (
                <AttributeRow
                  attribute={attribute}
                  labels={labels}
                  isEditMode={isEditMode}
                  key={`attribute-${attribute.id}`}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;

import type { GetAttributeParams } from '../types';
import type { Attribute } from '@meiro/backend/src/attributes/data';

type Props = {
  data?: Attribute[];
  isFetching?: boolean;
  setSortBy?: (sortBy: GetAttributeParams['sortBy']) => void;
};

const columns = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'labels',
    label: 'Label',
  },
  {
    name: 'createdAt',
    label: 'Created at',
  },
  {
    name: 'action',
    label: 'Action',
  },
];

const Table: React.FC<Props> = ({
  data = [],
  isFetching = false,
  setSortBy,
}) => {
  if (isFetching) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <table className="min-w-full text-gray-900">
      <thead className="border-b ">
        <tr>
          {columns.map(({ name, label }) => (
            <th
              key={`th-${name}`}
              scope="col"
              className="cursor-pointer px-6 py-4 text-left text-sm font-medium"
              onClick={() =>
                name === 'name' || name === 'createdAt'
                  ? setSortBy && setSortBy(name)
                  : undefined
              }
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, labelIds, createdAt }, index) => (
          <tr key={`tr-${index}`} className="border-t">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold"
            >
              {name}
            </th>
            <td className="whitespace-nowrap px-6 py-4 text-sm ">
              {labelIds.join(', ')}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm ">
              {createdAt}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm ">
              <button
                onClick={() => console.log('delete')}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

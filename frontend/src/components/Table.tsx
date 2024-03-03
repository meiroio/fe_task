import { capitalize } from '../utils';

import type { Attribute } from '@meiro/backend/src/attributes/data';

type Props = {
  data: Attribute[] | undefined;
  isFetching: boolean;
};

const columns = ['name', 'label', 'created_at', 'action'];

const Table: React.FC<Props> = ({ data = [], isFetching = false }) => {
  if (isFetching) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <table className="min-w-full text-gray-900">
      <thead className="border-b ">
        <tr>
          {columns.map((name) => (
            <th
              key={`th-${name}`}
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium"
            >
              {capitalize(name)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, labelIds, createdAt }, index) => (
          <tr
            key={`tr-${index}`}
            className={`border-t bg-${index % 2 === 0 ? 'gray-100' : 'white'}`}
          >
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

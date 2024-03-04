import { Link } from 'react-router-dom';

import type { GetAttributeParams } from '../types';
import type { Attribute } from '@meiro/backend/src/attributes/data';

type Props = {
  data?: Attribute[];
  action?: {
    onClick: (id: Attribute['id']) => void;
    label: string;
  };
  fwdRef?: React.Ref<HTMLTableRowElement>;
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
  action,
  fwdRef,
  isFetching = false,
  setSortBy,
}) => {
  return (
    <table className="min-w-full text-gray-900">
      <thead className="border-b ">
        <tr>
          {columns
            .filter(({ name }) => (action ? true : name !== 'action'))
            .map(({ name, label }) => (
              <th
                key={`th-${name}`}
                scope="col"
                className="sticky top-0 cursor-pointer bg-white/80 px-6 py-4 text-left text-sm font-medium"
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
        {data.map(({ id, name, labelIds, createdAt }, index) => (
          <tr
            key={`tr-${index}`}
            className="border-t"
            ref={index === data.length - 3 && !isFetching ? fwdRef : undefined}
          >
            <th
              scope="row"
              className="whitespace-nowrap px-4 py-2 text-left text-sm font-semibold"
            >
              <Link to={`/attributes/${id}`}>{name}</Link>
            </th>
            <td className="whitespace-nowrap px-4 py-2 text-sm ">
              {labelIds.join(', ')}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-sm ">
              {createdAt}
            </td>
            {action && (
              <td className="whitespace-nowrap px-4 py-2 text-sm ">
                <button
                  onClick={() => action.onClick(id)}
                  className="btn-danger-muted"
                >
                  {action.label}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

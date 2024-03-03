export type Attribute = {
  id: string;
  name: string;
  // description: string
  createdAt: string; // ISO8601 string
  labelIds: string[];
  deleted: boolean;
};

export const attributes: Attribute[] = [
  {
    id: '1',
    name: 'First name',
    labelIds: ['1', '2'],
  },
  {
    id: '2',
    name: 'Last name',
    labelIds: ['1', '2'],
  },
  {
    id: '3',
    name: 'Email',
    labelIds: ['1'],
  },
  {
    id: '4',
    name: 'Phone number',
    labelIds: ['1'],
  },
  {
    id: '5',
    name: 'Facebook CID',
    labelIds: ['1', '12'],
  },
  {
    id: '6',
    name: 'Google CID',
    labelIds: ['1', '12'],
  },
  {
    id: '7',
    name: 'Campaigns sent',
    labelIds: ['4'],
  },
  {
    id: '8',
    name: 'Campaigns read',
    labelIds: ['4'],
  },
  {
    id: '9',
    name: 'Campaigns clicked',
    labelIds: ['4'],
  },
  {
    id: '10',
    name: 'Transactions made',
    labelIds: ['3'],
  },
  {
    id: '11',
    name: 'Date of last transaction',
    labelIds: ['3'],
  },
  {
    id: '12',
    name: 'Average order value',
    labelIds: ['2', '3'],
  },
  {
    id: '13',
    name: 'Payment type',
    labelIds: ['3', '7'],
  },
  {
    id: '14',
    name: 'Favorite brand',
    labelIds: ['7'],
  },
  {
    id: '15',
    name: 'Recommended product',
    labelIds: ['6', '7'],
  },
  {
    id: '16',
    name: 'Searches made',
    labelIds: ['5'],
  },
  {
    id: '17',
    name: 'Products viewed',
    labelIds: ['5', '7'],
  },
  {
    id: '18',
    name: 'City',
    labelIds: ['2', '8'],
  },
  {
    id: '19',
    name: 'Country',
    labelIds: ['8'],
  },
  {
    id: '20',
    name: 'Device',
    labelIds: ['9'],
  },
  {
    id: '21',
    name: 'OS',
    labelIds: ['9'],
  },
  {
    id: '22',
    name: 'Website engagement score',
    labelIds: ['5', '11'],
  },
  {
    id: '23',
    name: 'Estimated gender',
    labelIds: ['2', '10'],
  },
  {
    id: '24',
    name: 'Estimated age',
    labelIds: ['2', '10'],
  },
].map((attribute) => ({
  ...attribute,
  // description: "",
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 100),
  ).toISOString(),
  deleted: false,
}));

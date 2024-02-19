export type LabelType = {
  id: string;
  name: string;
};

export type MetaType = {
  offset: number;
  limit: number;
  hasNextPage: boolean;
};

export type LabelsQuery = {
  data: LabelType[];
  meta: MetaType;
};

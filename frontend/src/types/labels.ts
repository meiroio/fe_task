export type Label = {
  id: string;
  name: string;
};

export type LabelList = Label[];

export interface LabelsFilter {
  offset: number;
  limit: number;
}

export interface LabelsMeta extends LabelsFilter {
  hasNextPage: boolean;
}

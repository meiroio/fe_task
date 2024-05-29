import { useMemo } from 'react';
import { Stack, Chip, StackProps, ChipProps } from '@mui/material';
import { Label } from '../../../types';
import { useAttributesContext } from '../contexts';

export interface LabelsListProps {
  labelIds: Label['id'][];
  stackProps?: Partial<StackProps>;
  chipProps?: Partial<ChipProps>;
}

const LabelsList = ({ labelIds = [], stackProps, chipProps }: LabelsListProps) => {
  const { labels: labelsList } = useAttributesContext();

  const labels = useMemo(() => [...labelsList.filter((label) => labelIds.includes(label.id))], [labelIds, labelsList]);

  return (
    <Stack {...stackProps}>
      {labels.map((label) => (
        <Chip key={label.id} label={label.name} {...chipProps} />
      ))}
    </Stack>
  );
};

export default LabelsList;

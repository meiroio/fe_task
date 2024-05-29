import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Drawer, Typography, Button, Stack } from '@mui/material';
import { ROUTES } from '../../../constants';
import { useAttributesDetail } from '../../../hooks';
import { LabelsList } from '../components';

interface AttributesDetailProps {
  onDelete: (id: string) => void;
}

const AttributesDetail = ({ onDelete }: AttributesDetailProps) => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAttributesDetail(id);

  const closeHandler = () => {
    navigate(ROUTES.attributes.path);
    setOpen(false);
  };

  const deleteHandler = (id: string) => {
    onDelete(id);
  };

  useEffect(() => setOpen(!!id), [id]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeHandler}
      PaperProps={{
        sx: { width: '50%' },
      }}
    >
      <Stack gap={3} sx={{ padding: ({ spacing }) => spacing(2) }}>
        <Typography variant="h4">{data?.name}</Typography>
        <LabelsList labelIds={data?.labelIds} stackProps={{ direction: 'row', gap: 1 }} chipProps={{ size: 'small' }} />
        <Stack direction="row" gap={2}>
          <Button variant="outlined" onClick={closeHandler}>
            Back to list
          </Button>
          <Button color="error" variant="outlined" onClick={() => deleteHandler(data?.id)}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default AttributesDetail;

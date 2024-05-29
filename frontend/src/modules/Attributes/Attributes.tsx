import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLabelsItems, useDeleteAttributeMutation, useAxiosInstance, useInfinityAttributes } from '../../hooks';
import { ROUTES, DIALOG_CLOSE_DELAY } from '../../constants';
import { ViewLayout, ConfirmDialog } from '../../components';
import { AttributesContextProvider } from './contexts';
import { useAttributesContextControl } from './hooks';
import { FeedbackSnack } from './components';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';

const Attributes = () => {
  const [snackSuccessOpen, setSnackSuccessOpen] = useState(false);

  const providerValue = useAttributesContextControl();
  const { offset, limit, searchText, sortBy, sortDir, confirmId, setConfirmId, setConfirmOpen, setLabels } =
    providerValue;
  const navigate = useNavigate();
  const { id } = useParams();
  const { labels } = useLabelsItems();
  const { refetch } = useInfinityAttributes({ offset, limit, searchText, sortBy, sortDir });
  const { apiBase } = useAxiosInstance();
  const deleteMutation = useDeleteAttributeMutation(apiBase);

  const deleteHandler = (id: string) => {
    setConfirmId(id);
    setConfirmOpen(true);
  };

  const closeHandler = () => {
    setConfirmOpen(false);
    setTimeout(() => {
      setConfirmId(null);
    }, DIALOG_CLOSE_DELAY);
  };

  const confirmHandler = () => {
    if (confirmId) {
      if (id) navigate(ROUTES.attributes.path);
      deleteMutation.mutate(confirmId, {
        onSuccess: () => {
          closeHandler();
          refetch().then(() => {
            setSnackSuccessOpen(true);
          });
        },
      });
    }
  };

  useEffect(() => setLabels(labels), [labels]);

  return (
    <AttributesContextProvider value={providerValue}>
      <ViewLayout heading={{ title: 'Attributes' }}>
        <AttributesList onDelete={deleteHandler} />
        <AttributesDetail onDelete={deleteHandler} />
      </ViewLayout>
      <ConfirmDialog
        open={providerValue.confirmOpen}
        onClose={closeHandler}
        onConfirm={confirmHandler}
        title="Delete attribute"
      >
        Are you sure you want delete #{providerValue.confirmId} item?
      </ConfirmDialog>
      <FeedbackSnack open={snackSuccessOpen} onClose={() => setSnackSuccessOpen(false)}>
        Item was successfully deleted
      </FeedbackSnack>
    </AttributesContextProvider>
  );
};

export default Attributes;

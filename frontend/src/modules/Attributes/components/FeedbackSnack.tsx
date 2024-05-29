import { Snackbar, Alert, AlertProps } from '@mui/material';
import { WithChildren } from '../../../types';

export interface FeedbackSnackProps extends Partial<WithChildren> {
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  alertProps?: Partial<Omit<AlertProps, 'children' | 'title'>>;
  title?: string;
}

const FeedbackSnack = ({ children, title, open, onClose, autoHideDuration = 6000, alertProps }: FeedbackSnackProps) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        title={title}
        children={children}
        sx={{ width: '100%' }}
        {...alertProps}
      />
    </Snackbar>
  );
};

export default FeedbackSnack;

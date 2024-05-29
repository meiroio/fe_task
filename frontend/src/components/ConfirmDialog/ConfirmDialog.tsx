import { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { WithChildren } from '../../types';

export interface ConfirmDialogProps extends WithChildren {
  title?: ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ children, title, open, onClose, onConfirm }: ConfirmDialogProps) => {
  const confirmHandler = () => {
    onClose();
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <IconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={confirmHandler}>
          Confirm
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

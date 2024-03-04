import React from 'react';
import xmark from '../assets/icons/xmark.svg';

type Props = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const Modal: React.FC<Props> = ({ children, title, onClose, onConfirm }) => {
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-full w-full max-w-xl overflow-y-auto bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose}>
              <img src={xmark} alt="close" className="size-4" />
            </button>
          </div>
          <div className="py-8">{children}</div>
          <div className="flex justify-end gap-2">
            <button className="btn-muted" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

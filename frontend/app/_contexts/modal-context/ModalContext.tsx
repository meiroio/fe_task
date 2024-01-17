import React, { useState, createContext, useContext, ReactNode } from 'react';
import Modal from './Modal';

export interface ModalProps {
	header: string;
	body: string;
	onConfirm: () => any;
	confirmText: string;
	icon: React.ReactNode;
}

interface ModalContextType {
	isOpen: boolean;
	openModal: (props: ModalProps) => void;
	closeModal: () => void;
	modalProps?: ModalProps;
}

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined
);

export const useModal = (): ModalContextType => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}): ReactNode => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalProps, setModalProps] = useState<ModalProps>();

	const openModal = (props: ModalProps) => {
		setModalProps(props);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setModalProps(undefined);
	};

	return (
		<ModalContext.Provider
			value={{ isOpen, openModal, closeModal, modalProps }}
		>
			{children}
			<Modal isOpen={isOpen} closeModal={closeModal} modalProps={modalProps} />
		</ModalContext.Provider>
	);
};

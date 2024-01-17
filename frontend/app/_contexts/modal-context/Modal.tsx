'use client';
import React, { useEffect } from 'react';
import { ModalProps } from './ModalContext';

interface ModalViewProps {
	isOpen: boolean;
	closeModal: () => void;
	modalProps?: ModalProps;
}

const Modal: React.FC<ModalViewProps> = (props) => {
	const { isOpen, closeModal, modalProps } = props;
	const { header, body, onConfirm, confirmText, icon } = modalProps ?? {
		header: '',
		body: '',
		onConfirm: () => {},
		confirmText: '',
		icon: '',
	};

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed z-[100] w-screen h-screen inset-0 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-white w-[50vw]  rounded-xl shadow-2xl max-w-md flex flex-col gap-10 justify-between ">
				<section className="pt-4 self-center flex flex-col items-center ">
					<div className=" w-8 h-10">{icon}</div>
					<h2 className="text-2xl font-bold mb-4">{header}</h2>
					<p className="text-gray-700 mb-4 text-center">{body}</p>
				</section>

				<section className="flex flex-row self-end gap-4 pr-4 pb-4">
					<button
						className="px-7 py-2 bg-orange-300 hover:bg-orange-500 text-white rounded"
						onClick={closeModal}
					>
						Close
					</button>

					<button
						className="group px-7 py-2 border-[2px] border-red-700 hover:bg-red-700 text-white rounded"
						onClick={async () => {
							closeModal();
							onConfirm ? await onConfirm() : null;
						}}
					>
						<p className="text-red-700 group-hover:text-white">{confirmText}</p>
					</button>
				</section>
			</div>
		</div>
	);
};

export default Modal;

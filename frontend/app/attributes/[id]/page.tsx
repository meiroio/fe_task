'use client';
import useApi from '@/app/_api/api';
import { Attribute } from '@/app/_components/atributes-layoute/AttributesLayoute.types';
import AttributeTable from '@/app/_components/attribute-layoute/attribute-table/AttributeTabel';
import { useModal } from '@/app/_contexts/modal-context/ModalContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiFillDelete } from 'react-icons/ai';

const DetailScreen: React.FC = () => {
	const [attribute, setAttribute] = useState<Attribute>();
	const { openModal } = useModal();
	const { deleteAttribute } = useApi();
	const router = useRouter();

	const [isUnknownAttribute, setIsUnknownAttribute] = useState(false);

	const { id } = useParams<{ id: string }>();
	const { fetchAttribute } = useApi();

	useEffect(() => {
		const initialFetch = async () => {
			const res = await fetchAttribute(id);
			if (res.isSuccessful) {
				console.info('here is res');
				console.info(res);
				setAttribute(res.data?.data);
			} else {
				setIsUnknownAttribute(true);
			}
		};

		initialFetch();
	}, []);

	const handleDeleteAttribute = (attributeId: string) => {
		openModal({
			header: 'Delete Attribute',
			body: 'Are you sure you want to delete this attribute?',
			onConfirm: async () => {
				await deleteAttribute(attributeId);
				router.push('/attributes');
			},
			confirmText: 'Delete',
			icon: <AiFillDelete className="w-10 h-10 text-red-600" />,
		});
	};

	return (
		<main className="self-center  gap-12 flex min-h-screen flex-col items-top w-[80vw] bg-gray-100 ">
			{isUnknownAttribute && !attribute ? (
				<h1 className="text-4xl pt-24 font-bold text-center">{`No atribute with ID ${id}`}</h1>
			) : attribute ? (
				<>
					<h1 className="text-4xl pt-24 font-bold text-center">{`Attribute ID ${id}`}</h1>
					<div className=" absolute  px-6 py-6 rounded-md w-fit">
						<AiOutlineLeft
							className="w-10 h-10 cursor-pointer text-black hover:text-orange-700 transition-all"
							onClick={() => {
								router.push('/attributes');
							}}
						/>
					</div>
					<section className="flex flex-col gap-8  w-[60vw] self-center">
						<AttributeTable attribute={attribute} />

						<button
							onClick={() => handleDeleteAttribute(id)}
							className="bg-red-600 text-white px-4 py-2 rounded-md w-fit"
						>
							Delete
						</button>
					</section>
				</>
			) : (
				<h3 className="self-center pt-24 text-center">Loading attribute...</h3>
			)}
		</main>
	);
};

export default DetailScreen;

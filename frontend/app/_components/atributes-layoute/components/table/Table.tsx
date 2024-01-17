import React, { useState } from 'react';
import { Attribute, Label } from '../../AttributesLayoute.types';
import AttributeRow from './components/attribute-row/AttributeRow';
import { ToolbarItemProps } from '../toolbar/toolbar-item/ToolbarItem';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface TableProps {
	data: Attribute[];
	isEditMode: boolean;
	refetch: () => Promise<any>;
	toolbarTools: ToolbarItemProps[];
}

interface Header {
	name: string;
	displayName: string;
	sortable: boolean;
	isDefault?: boolean;
	onToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Table: React.FC<TableProps> = ({ data, toolbarTools, refetch }) => {
	const editTool = toolbarTools.find((tool) => tool.name === 'Edit');
	const sortTool = toolbarTools.find((tool) => tool.name === 'Sort');
	const sortByTool = toolbarTools.find((tool) => tool.name === 'Sort By');

	let heads: Header[] = [
		{
			name: 'Name',
			displayName: 'Name',
			sortable: true,
			isDefault: sortByTool?.isDefault,
			onToggle: sortByTool?.toggleOptions,
		},
		{ name: 'Labels', displayName: 'Labels', sortable: false },
		{
			name: 'CreatedAt',
			displayName: 'Created',
			sortable: true,
			isDefault: sortTool?.isDefault,
			onToggle: sortTool?.toggleOptions,
		},
	];

	if (editTool?.isDefault) {
		heads = [
			...heads,
			{ name: 'Actions', displayName: 'Actions', sortable: false },
		];
	}

	const handleHeaderClick = (header: Header) => {
		if (!header.sortable) return;

		if (header.name === 'Name') {
			if (!sortByTool?.isDefault) {
				sortByTool?.toggleOptions(true);
			}
			if (sortByTool?.isDefault) {
				sortTool?.toggleOptions(!sortTool.isDefault);
			}
		}
		if (header.name === 'CreatedAt') {
			if (sortByTool?.isDefault) {
				sortByTool?.toggleOptions(false);
			}
			if (!sortByTool?.isDefault) {
				sortTool?.toggleOptions(!sortTool.isDefault);
			}
		}
	};

	function shouldTheSortIconBePlaced(header: Header): React.ReactNode {
		if (!header.sortable) return null;

		const isCurrentSorter =
			header.name === 'Name' ? sortByTool?.isDefault : !sortByTool?.isDefault;

		if (isCurrentSorter) {
			return (
				<MdKeyboardArrowDown
					className={`text-orange-600 ml-1 text-base ${
						sortTool?.isDefault ? 'rotate-0' : 'rotate-180'
					} transition-all`}
				/>
			);
		}

		return null;
	}

	return (
		<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								{heads.map((header, idx) => (
									<th
										key={idx}
										scope="col"
										className={`px-6 py-3 text-left text-xs font-medium text-gray-500 ${
											header.sortable
												? 'hover:bg-orange-100 cursor-pointer'
												: 'cursor-not-allowed'
										} uppercase tracking-wider`}
										onClick={() => handleHeaderClick(header)}
									>
										<section className="flex flex-row ">
											{header.displayName}
											{shouldTheSortIconBePlaced(header)}
										</section>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((attribute) => (
								<AttributeRow
									attribute={attribute}
									isEditMode={editTool?.isDefault ?? false}
									refetch={refetch}
									key={`attribute-${attribute.id}`}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;

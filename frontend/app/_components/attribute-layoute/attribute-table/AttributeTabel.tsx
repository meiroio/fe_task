import { Attribute } from '../../atributes-layoute/AttributesLayoute.types';
import AttributeRow from '../../atributes-layoute/components/table/components/attribute-row/AttributeRow';

interface AttributeTabelProps {
	attribute: Attribute;
}

const AttributeTable = (props: AttributeTabelProps) => {
	const { attribute } = props;
	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					{['Name', 'Labels', 'Created'].map((header, idx) => (
						<th
							key={idx}
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							{header}
						</th>
					))}
				</tr>
			</thead>
			{attribute ? (
				<tbody className="bg-white divide-y divide-gray-200">
					<AttributeRow
						attribute={attribute}
						isEditMode={false}
						key={`attribute-${attribute.id}`}
					/>
				</tbody>
			) : (
				<></>
			)}
		</table>
	);
};
export default AttributeTable;

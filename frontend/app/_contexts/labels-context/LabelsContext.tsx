import useApi from '@/app/_api/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Label {
	id: string;
	name: string;
}

interface LabelsContextProps {
	labels: Label[];
}

const LabelsContext = createContext<LabelsContextProps>({ labels: [] });

export const LabelsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [labels, setLabels] = useState<Label[]>([]);

	const { fetchLabels: fetchLabelsResponse } = useApi();

	const handleFetchLabels = async () => {
		let labels: Label[] = [];
		let labelsHaveNextPage: boolean = true;

		do {
			const labelsResponse = await fetchLabelsResponse(labels.length);
			labels.push(...labelsResponse.data);
			labelsHaveNextPage = labelsResponse.meta.hasNextPage;
		} while (labelsHaveNextPage);

		setLabels(labels);
	};

	useEffect(() => {
		handleFetchLabels();
	}, []);

	return (
		<LabelsContext.Provider value={{ labels: labels }}>
			{children}
		</LabelsContext.Provider>
	);
};

export const useLabels = () => useContext(LabelsContext);

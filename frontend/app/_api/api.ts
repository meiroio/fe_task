import {
	Attribute,
	AttributeFetchResponse,
} from '../_components/atributes-layoute/AttributesLayoute.types';
import { DeleteAttributeResponse, fetchAttributProps } from './api.types';

const API_BASE_URL = 'http://localhost:3000';

interface useApiEndpoints {
	deleteAttribute: (id: string) => Promise<DeleteAttributeResponse>;
	fetchLabels: (offset: number) => Promise<any>;
	fetchAttribut: (id: string) => Promise<any>;
	fetchAttributes: (
		props: fetchAttributProps
	) => Promise<AttributeFetchResponse>;
}

const useApi = (): useApiEndpoints => {
	const deleteAttribute = async (
		id: string
	): Promise<DeleteAttributeResponse> => {
		const response = await fetch(`${API_BASE_URL}/attributes/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			console.error('Failed to delete attribute', response);
			return { isSuccessful: false, error: response.statusText };
		}

		const data: Attribute = await response.json();
		return { isSuccessful: true, data };
	};

	const fetchLabels = async (offset: number = 0) => {
		const response = await fetch(`${API_BASE_URL}/labels?offset=${offset}`);
		const parsedLabelsResponse = await response.json();
		return parsedLabelsResponse;
	};

	const fetchAttribut = async (id: string) => {
		const response = await fetch(`${API_BASE_URL}/attributes/${id}`);
		const parsedAttributeResponse = await response.json();
		return parsedAttributeResponse;
	};

	const fetchAttributes = async ({
		pageParam,
		searchedText,
		sortBy = 'name',
		sortDir = 'asc',
	}: fetchAttributProps) => {
		const response = await fetch(
			`http://127.0.0.1:3000/attributes?offset=${pageParam}&limit=10&searchText=${searchedText}&sortBy=${sortBy}&sortDir=${sortDir}`
		);
		return await response.json();
	};

	return {
		deleteAttribute,
		fetchLabels,
		fetchAttributes,
		fetchAttribut,
	};
};

export default useApi;

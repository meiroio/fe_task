import {
	Attribute,
	AttributeFetchResponse,
} from '../_components/atributes-layoute/AttributesLayoute.types';

export interface fetchAttributProps {
	pageParam: number;
	searchedText: string;
	sortBy?: 'name' | 'createdAt';
	sortDir?: 'asc' | 'desc';
}

export interface DeleteAttributeResponse {
	isSuccessful: boolean;
	error?: string;
	data?: Attribute;
}

export interface AttributeFetchCompleateResponse {
	isSuccessful: boolean;
	error?: string;
	data?: AttributeFetchResponse;
}

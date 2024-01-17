export interface Attribute {
	id: string;
	name: string;
	labelIds: string[];
	createdAt: string;
	deleted: boolean;
}

export interface Meta {
	offset: number;
	limit: number;
	searchText: string;
	sortBy: string;
	sortDir: string;
	hasNextPage: boolean;
}

export interface Label {
	id: string;
	name: string;
}

export interface AttributesFetchResponse {
	data: Attribute[];
	meta: Meta;
}
export interface AttributeFetchResponse {
	data: Attribute;
	meta: Meta;
}

export interface LabelFetchResponse {
	data: Label[];
	meta: Meta;
}

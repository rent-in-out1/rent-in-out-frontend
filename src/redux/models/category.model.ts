export interface AddCategoryPayload {
	name: string;
}

export interface ICategoryDataModel {
	_id: string;
	name: string;
	utl_name: string;
	info: string;
	craetedAt: number;
	updatedAt: number | Date;
}

export interface ICategoryModel {
	categories: ICategoryDataModel[];
	error: object | unknown;
	loading: boolean;
}

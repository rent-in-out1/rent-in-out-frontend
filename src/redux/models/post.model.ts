interface ICloudinary {
	url: string;
	img_id: string;
}

interface ICollectPoints {
	x: number;
	y: number;
}

export interface IPostDataModel {
	_id: string;
	title: string;
	info: string;
	img: ICloudinary[];
	range: 'long-term' | 'short-term';
	creator_id: string;
	category_url: string;
	price: number;
	type: 'rent' | 'exchange' | 'delivery';
	collect_points: ICollectPoints[];
	active: boolean;
	available_from: Date;
	country: string;
	city: string;
	likes: string[];
	createdAt: number | Date;
	updatedAt: number | Date;
}

export interface IPostModel {
	posts: IPostDataModel[];
	loading: boolean;
	error: unknown;
	isChange: boolean;
	editablePost: object;
}

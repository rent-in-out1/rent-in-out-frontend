import { IPostDataModel } from './post.model';

interface IRankModel {
	user_id: string;
	rank: number;
}

interface IMessageModel {
	ownerName: string;
	ownerImg: string;
	userName: string;
	userImg: string;
	roomID: string;
	creatorID: string;
	userID: string;
	messagesArr: IMessageDataModel[];
	createdAt: Date;
	updatedAt: Date;
}

interface IMessageDataModel {
	_id: string;
	sender: string;
	userName: string;
	message: string;
}

export interface ICloudinaryModel {
	url: string;
	img_id: string;
}

export interface IUserDataModel extends Document {
	fullName: {
		firstName: string;
		lastName: string;
	};
	email: string;
	password: string;
	password_changed: Date;
	phone: string;
	profile_img: ICloudinaryModel;
	cover_img: ICloudinaryModel;
	country: string;
	city: string;
	birthdate: Date;
	role: string;
	active: boolean;
	rank: IRankModel[];
	productsList: string[];
	wishList: string[];
	messages: string[];
	createdAt: number | Date;
	updatedAt: number | Date;
}

export interface IUserModel {
	user: IUserDataModel | null;
	inbox: IMessageModel[];
	wishList: IPostDataModel[];
	loading: boolean;
	error: string;
}

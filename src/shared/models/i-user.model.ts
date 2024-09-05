import { ICardPropsModel } from './i-card.model';
import { IMessageModel } from './i-message.model';

type cloudinary = { url: string; img_id: string };
type rank = { user_id: string; rank: number };

export interface IUserModel {
	_id: string;
	fullName: {
		firstName: string;
		lastName: string;
	};
	email: string;
	password: string;
	password_changed: Date;
	phone: string;
	profile_img: cloudinary;
	cover_img: cloudinary;
	country: string;
	city: string;
	birthdate: Date;
	role: string;
	active: boolean;
	rank: rank[];
	productsList: string[];
	wishList: ICardPropsModel[];
	messages: IMessageModel[];
	createdAt: number;
	updatedAt: number;
}

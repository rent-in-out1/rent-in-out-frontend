import { IPostDataModel } from './post.model';
import { IUserDataModel } from './user.model';

export interface IToggleModel {
	register: boolean;
	message: boolean;
	search: boolean;
	postSearch: boolean;
	likes: {
		active: boolean;
		likesArr: IUserDataModel[];
	};
	postShow: {
		active: boolean;
		post: IPostDataModel;
	};
	showInbox: boolean;
}

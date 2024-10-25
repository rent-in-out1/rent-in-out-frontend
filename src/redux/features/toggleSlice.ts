import { createSlice } from '@reduxjs/toolkit';
import { IToggleModel } from '../models/toggle.model';
import { IPostDataModel } from '../models/post.model';

const initialState: IToggleModel = {
	register: false,
	message: false,
	search: false,
	postSearch: false,
	likes: {
		active: false,
		likesArr: [],
	},
	postShow: {
		active: false,
		post: {} as IPostDataModel,
	},
	showInbox: false,
};

const toggleSlice = createSlice({
	name: 'toggle',
	initialState,
	reducers: {
		onRegisterToggle: (state) => {
			state.register = true;
		},
		onRegisterShow: (state) => {
			state.register = !state.register;
		},
		onLogout: (state) => {
			state.register = false;
		},
		onSearchToggle: (state) => {
			state.search = !state.search;
		},
		onPostSearchToggle: (state) => {
			state.postSearch = !state.postSearch;
		},
		onLikesToggle: (state, action) => {
			state.likes.active = !state.likes.active;
			state.likes.likesArr = action.payload;
		},
		onMessegeToggle: (state) => {
			state.message = !state.message;
		},
		onInboxToggle: (state) => {
			state.showInbox = !state.showInbox;
		},
		onInboxClose: (state) => {
			state.showInbox = false;
		},
		onPostToggle: (state, action) => {
			state.postShow.active = !state.postShow.active; // Simplified toggle logic
			state.postShow.post = action.payload;
		},
	},
});

export const {
	onRegisterToggle,
	onSearchToggle,
	onPostSearchToggle,
	onLogout,
	onRegisterShow,
	onLikesToggle,
	onMessegeToggle,
	onInboxToggle,
	onInboxClose,
	onPostToggle,
} = toggleSlice.actions;
export default toggleSlice.reducer;

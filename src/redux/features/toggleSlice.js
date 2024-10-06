import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	register: false,
	message: {
		isShow: false,
		info: '',
		action: null,
	},
	search: false,
	postSearch: false,
	likes: {
		active: false,
		likesArr: [],
	},
	postShow: {
		active: false,
		post: {},
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
		onMessegeToggle: async (state, action) => {
			state.message.isShow = !state.message.isShow;
			state.message.info = action.payload.info;
			state.message.action = action.payload.action;
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
	onToggle,
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

import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './features/categorieSlice';
import postsSlice from './features/postsSlice';
import toggleSlice from './features/toggleSlice';
import userSlice from './features/userSlice';

const store = configureStore({
	reducer: {
		userSlice,
		toggleSlice,
		categoriesSlice,
		postsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

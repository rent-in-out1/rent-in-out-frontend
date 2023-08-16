import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './features/categorieSlice';
import errorsSlice from './features/errorSlice';
import postsSlice from './features/postsSlice';
import toggleSlice from './features/toggleSlice';
import userSlice from './features/userSlice';


const store = configureStore({
    reducer: {
        userSlice,
        errorsSlice,
        toggleSlice,
        categoriesSlice,
        postsSlice
    }
});

export default store;
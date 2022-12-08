import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import errorsSlice from './features/errorSlice'
import toggleSlice from './features/toggleSlice'
import accessTokenSlice from './features/access-token-slice'
import categoriesSlice from './features/categorieSlice';
import postsSlice from './features/postsSlice';


const store = configureStore({
    reducer: {
        userSlice,
        errorsSlice,
        toggleSlice,
        accessTokenSlice,
        categoriesSlice,
        postsSlice
    }
})

export default store
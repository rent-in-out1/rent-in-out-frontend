import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import errorsSlice from './features/errorSlice'
import toggleSlice from './features/toggleSlice'



const store = configureStore({
    reducer: {
        userSlice,
        errorsSlice,
        toggleSlice,
    }
})

export default store
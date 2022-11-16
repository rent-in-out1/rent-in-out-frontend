import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import errorsSlice from './features/errorSlice'



const store = configureStore({
    reducer: {
        userSlice,
        errorsSlice
    }
})

export default store
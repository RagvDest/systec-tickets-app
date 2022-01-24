import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import searchUsersReducer from '../features/searchUsersSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        searchUser:searchUsersReducer
    }
});
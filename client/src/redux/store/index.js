import {configureStore} from '@reduxjs/toolkit'
import authReducer, {loadUser} from "./authSlice";
import todoReducer from './todoSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
    },
});

store.dispatch(loadUser(null))

export default store;

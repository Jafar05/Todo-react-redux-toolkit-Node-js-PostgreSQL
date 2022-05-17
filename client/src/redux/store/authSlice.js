import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../api";
import jwtDecode from "jwt-decode";


const initialState = {
    token: localStorage.getItem('token'),
    name: '',
    email: '',
    id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${url}/registration`, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            const userId = jwtDecode(token.data.token)
            localStorage.setItem('token', JSON.stringify({token: token.data.token, user: userId.userId}));
            return JSON.stringify({token: token.data.token, user: userId.userId})
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${url}/login`, {
                email: user.email,
                password: user.password,
            });
            const userId = jwtDecode(token.data.token)
            localStorage.setItem('token', JSON.stringify({token: token.data.token, user: userId.userId}));
            return JSON.stringify({token: token.data.token, user: userId.userId})
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token
            if(token) {
                const user = jwtDecode(token)
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    id: user.userId,
                    userLoaded: true,
                }
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem("token")

            return {
                ...state,
                token: '',
                name: '',
                email: '',
                id: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            return { ...state, registerStatus: 'pending'}
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    id: user.userId,
                    registerStatus: "success",
                }
            } else return state
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload,
            }
        })
        builder.addCase(loginUser.pending, (state) => {
            return { ...state, registerStatus: 'pending'}
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    id: user.userId,
                    registerStatus: "success",
                }
            } else return state
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            }
        })
    },
});


export const { loadUser, logoutUser, loginFail} = authSlice.actions;
export default authSlice.reducer;
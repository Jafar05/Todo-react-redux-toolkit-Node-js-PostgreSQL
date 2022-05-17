import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
let joinId = ''
if(localStorage.getItem('token') !== null) {
    const getUser = localStorage.getItem('token')
    const getId = getUser.split(':')
    joinId = getId[2].split('"')[0].split("}")[0]
}

export const getAllPost = createAsyncThunk(
    'todos/getAllPost',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch(`http://localhost:3001/task/${joinId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);




export const getAllPostTodo = createAsyncThunk(
    'todos/getAllPost',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch(`http://localhost:3001/task`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);






export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`http://localhost:3001/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!response.ok) {
                throw new Error("Can't delete task. Server error")
            }
            dispatch(removeTodo({id}));

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue,dispatch,getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id); //todos.todos.find(todo => todo.id === id)
        try {
            const response = await fetch(`http://localhost:3001/change/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: !todo.status,
                })
            });
            if(!response.ok) {
                throw new Error("Can't toggle status. Server error.");
            }
            dispatch(toggleTodoComplete({id}))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);




export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                userId: joinId,
                status: false,
                rename: false,
            };

            const response = await fetch(`http://localhost:3001/todo`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(todo)
            });


            if(!response.ok) {
                throw new Error("Can't add task. Server error.");
            }
            const data = await response.json();
            dispatch(addTodo(data))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async function(todo, {rejectWithValue, dispatch}) {
        try {
            const { id, title, rename } = todo
            const response = await fetch(`http://localhost:3001/new-title/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    rename,
                    id
                }),
            })
            dispatch(updateTitleTodo({id, title, rename}))
                await response.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            let toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.status = !toggledTodo.status
        },
        updateTitleTodo(state, action) {
            state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    todo.title = action.payload.title
                }
            })
        }
    },
    extraReducers: {
        [getAllPost.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [getAllPost.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [updateTodo.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateTodo.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [getAllPost.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    }
});



export const {addTodo, removeTodo, toggleTodoComplete, updateTitleTodo } = todoSlice.actions;

export default todoSlice.reducer;
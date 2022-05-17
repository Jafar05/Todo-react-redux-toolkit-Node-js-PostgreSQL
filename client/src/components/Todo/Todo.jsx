import React from 'react';
import InputField from "./InputField";
import {useSelector} from "react-redux";

const Todo = () => {
    const {status, error} = useSelector(state => state.todos)

    return (
        <div>
            <InputField/>
            {status === 'pending' && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
        </div>
    );
};

export default Todo;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/store/authSlice";
import {StyledForm} from "./StyledForm";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if(auth.id) {
            navigate('/')
        }
    },[auth.id, navigate])


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(user))
    }
    return (
            <StyledForm onSubmit={handleSubmit}>

            <h2>Register</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={(e) => setUser({...user, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
                </div>
            <button> {auth.registerStatus === "pending" ? "Submitting" : "Register"}</button>

                {auth.registerStatus === "rejected" ? (<p>{auth.registerError}</p>) : null}
            </StyledForm>
    );
};

export default Register;

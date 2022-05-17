import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/store/authSlice";
import {StyledForm} from "./StyledForm";
import {useNavigate} from "react-router-dom";
import {Formik} from 'formik'
import * as yup from 'yup'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);


    useEffect(() => {
        if(auth.id) {
            navigate('/')
        }
    },[auth.id, navigate])


    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(user))
    }
    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
                </div>
                <button> {auth.loginStatus === "pending" ? "Submitting" : "Login"}</button>

                {auth.loginStatus === "rejected" ? (<p>{auth.loginError}</p>) : null}
            </StyledForm>

        </>
    );
};

export default Login;

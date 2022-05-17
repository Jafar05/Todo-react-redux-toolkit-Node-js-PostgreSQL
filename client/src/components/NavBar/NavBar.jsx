import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components'
import {logoutUser} from "../../redux/store/authSlice";

const NavBar = () => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <Link style={{margin: "0 0 0 20px"}} to="/">Home</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
            {
                auth.id ? (
                    <div>
                        <ul>
                        <li><Link to='/todo'>Todo</Link></li>
                      <li><Logout onClick={() => {
                            dispatch(logoutUser(null));

                        }}>Logout</Logout></li>
                        </ul>
                    </div>
                        ) : (
                <AuthLink className="nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/registration">Registrarion</Link></li>
                    </ul>
                </AuthLink>
                )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
const AuthLink = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`

const Logout = styled.div`
  margin: 0 20px 0 20px;
  //color: black;
  cursor: pointer;
`
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { performApiAction } from '../service/Api';
import { setAuth } from '../redux/Reducers/AuthReducer';
import "./Loginpage.css";
import { useDispatch } from 'react-redux';

const Loginpage = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [checkRemember, setCheckRemember] = useState('');
  const navigate = useNavigate();

  const handleCheckBox = () => setCheckRemember(!checkRemember);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await performApiAction("login", null, {
        email: username,
        password: password,
      });
      dispatch(setAuth({ response }));
      navigate("/profil");
    } catch (error) {
      console.log(error);
    }
  };

    return (

        <main className='main bg-dark'>
            <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label
            ><input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label
            ><input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
              >Remember me</label
            >
          </div>
           
          {/* <NavLink to="/profil" className="sign-in-button">Sign In</NavLink> */}
           
           <button type="submit" className="sign-in-button">Sign In</button>  
          
        </form>
      </section>
        </main>
    );
};

export default Loginpage;
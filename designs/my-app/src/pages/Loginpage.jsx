import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/Reducers/AuthReducer';
import "./Loginpage.css";
import { useDispatch, useSelector} from 'react-redux';
import { useGetTokenMutation } from '../service/apiSlice';

const Loginpage = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [checkRemember, setCheckRemember] = useState(false);
  const navigate = useNavigate();
  const [getToken, {isLoading, isError}] = useGetTokenMutation();

  const handleCheckBox = () => setCheckRemember(!checkRemember);

// if connected
const token = useSelector((state) => state.auth.isLoggedIn);
useEffect(() => {
  if (token) {
    navigate("/profil");
  }
}, [token, navigate]);  

  const handleSignIn = async (e) => {
    e.preventDefault();
      try {
        const response = await getToken({ email, password }).unwrap();
        const token = response.body.token;
        dispatch(setAuth(token));
        navigate("/profil");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };

    return (

        <main className='main bg-dark'>
            <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
        {isError && <p className='error-message'>Les identifiants sont incorrects</p>}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label
            ><input type="text" id="username" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label
            ><input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={checkRemember} onChange={handleCheckBox} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
           <button type="submit" className="sign-in-button">Sign In</button>  
           <NavLink to="/signup" className="sign-in-button a-button">Sign Up</NavLink>  
          
        </form>
      </section>
        </main>
    );
};

export default Loginpage;
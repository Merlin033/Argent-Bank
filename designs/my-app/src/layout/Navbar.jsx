import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector} from "react-redux";
import { setLogout } from "../redux/Reducers/AuthReducer";
import { useEffect } from "react";
import { setClearProfile, setGetProfile } from "../redux/Reducers/ProfileUserReducer";
import { useGetProfileMutation } from "../service/apiSlice";

function Navbar() {

  const token = useSelector((state) => state.auth.token);
  const dataUser = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [getProfile] = useGetProfileMutation();


  const handleLogout = () => {
    // si l'utilisateur est connecté, suprresion du token pour se deconnecter
    if (token) {
      dispatch(setLogout());
      dispatch(setClearProfile())
    }
  };

  useEffect(() => {
    if (token) {
    const fetchUserProfile = async () => {
      try {
        if (token) {
          const response = await getProfile(token).unwrap();
          dispatch(setGetProfile(response.body));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
      fetchUserProfile();
    }
  }, [dispatch, token]);
 
    return (
      <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
      {token && (
          <NavLink className="main-nav-item" to="/profil">
            <i className="fa fa-user-circle"></i>
            {dataUser?.userName} 
          </NavLink>
        )}
        <NavLink className="main-nav-item" to={token ? "/" : "/login"} onClick={handleLogout}>
          {token ? <i className="fa fa-arrow-right fa-lg"></i> : <i className="fa fa-user-circle"></i>}
          {token ? "Sign Out" : "Sign-in"}
        </NavLink>
      </div>
    </nav>
  );
}
  
  export default Navbar;
  
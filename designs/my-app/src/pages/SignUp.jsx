import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from '../redux/Reducers/AuthReducer';
import { useAddUserMutation } from "../service/apiSlice";
import { useGetTokenMutation } from '../service/apiSlice';
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addUser] = useAddUserMutation();
  const [getToken, {isLoading, isError}] = useGetTokenMutation();

  const valideUsername = username.length >= 4
  const valideFirstName = firstName.length >= 2
  const valideLastName = lastName.length >= 2
  const validePassword = password.length >= 5
  const valideEmail = email.length >= 5
  const validePasswordConfirmation = password.length >= 5 && password === passwordConfirmation &&
  password == /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    userName: username
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(true);
    if (valideUsername && valideFirstName && valideLastName && validePassword && valideEmail && validePasswordConfirmation) {
        try {
          const response = await addUser(user).unwrap();
          
          // Appel de la fonction pour se connecter avec les informations de l'utilisateur ajouté
          const signInResponse = await getToken({ email: user.email, password: user.password }).unwrap();
          const token = signInResponse.body.token;
          dispatch(setAuth(token));
          
          navigate("/profil");
        } catch (error) {
          console.error("Error signing up:", error);
        }
      }
    };

  return (
    <main className="main bg-dark">
      <section className="sign-up-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-wrapper">
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
            {!valideFirstName && errorMessage && <p className="error-message">Le prenom doit contenir au moins 2 caractères</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
            {!valideLastName && errorMessage && <p className="error-message">Le nom doit contenir au moins 2 caractères</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} autoComplete="username" required onChange={(e) => setUsername(e.target.value)} />
            {!valideUsername && errorMessage && <p className="error-message">Le nom d'utilisateur doit contenir au moins 5 caractères</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password.password} autoComplete="new-password" required onChange={(e) => setPassword(e.target.value)} />
            {!validePassword && errorMessage && <p className="error-message">Le mot de passe doit contenir au moins 5 caractères</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="passwordConfirmation">Confirm password</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={password.passwordConfirmation}
              autoComplete="new-password"
              required
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {!validePasswordConfirmation && errorMessage && <p className="error-message">Doit être identique au mot de passe</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            {!valideEmail && errorMessage && <p className="error-message">L'email doit contenir au moins 5 caractères</p>}
          </div>
          <button type="submit" className="sign-in-button">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
}
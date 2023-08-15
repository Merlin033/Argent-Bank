import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Footer from "../layout/Footer";
import Navbar from "../layout/NavBar";

import Homepage from "../pages/Homepage";
import ErrorPage from "../pages/ErrorPage";
import Loginpage from "../pages/Loginpage";
import Profilepage from "../pages/Profilepage";

const HeaderFooterLayout = ({mainClassName}) => {
    return (
      <>
        <Navbar />
          <Outlet />
        <Footer />
      </>
    );
  };
  
  export const router = createBrowserRouter([
    {
      element: <HeaderFooterLayout  />,
      errorElement: <ErrorPage />, 
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <Loginpage />
        },
        {
          path: "/profil",
          element: <Profilepage />
        }
      ]
    }
  ]);
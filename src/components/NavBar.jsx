import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { auth, provider } from "../config/firebase"; // Adjust the path as needed
import { signInWithPopup } from "firebase/auth";

const Navbar = () => {

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User logged in: ", user);
        // Additional logic to handle the authenticated user
        
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };

  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.active : undefined)}>
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className={({ isActive }) => (isActive ? style.active : undefined)}>
            <FaHeart />
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className={({ isActive }) => (isActive ? style.active : undefined)}>
            <FaUser />
          </NavLink>
        </li>
        <li>
          <button id="google-login-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={20} />
            Accedi con Google 
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

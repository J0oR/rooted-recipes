import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { auth, provider } from "../config/firebase"; // Adjust the path as needed
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in: ", result);
      // Additional logic to handle the authenticated user
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.active : undefined)}>
            <FaHome />
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/favourites" className={({ isActive }) => (isActive ? style.active : undefined)}>
              <FaHeart />
            </NavLink>
          </li>
        )}
        <li>
          {user ? (
              <button onClick={logOut}>Log out</button>
          ) : (
            <button id="google-login-btn" onClick={handleGoogleLogin} className={style.googleBtn}>
              <span>Accedi con</span>
              <span className={style.googleSpan}><FcGoogle size={20} /><span>oogle</span></span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

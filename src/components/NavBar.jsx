import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? style.active : undefined}>
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className={({ isActive }) => isActive ? style.active : undefined}>
            <FaHeart />
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className={({ isActive }) => isActive ? style.active : undefined}>
            <FaUser />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

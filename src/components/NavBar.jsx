import { Link } from "react-router-dom";
import style from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
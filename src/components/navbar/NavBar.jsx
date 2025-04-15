import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import NavLinkStyled from "./NavLink.styled";
import AuthButton from "./AuthButton.styled";

const NavBarContainer = styled.nav`
  width: 50%;
  height: 50px;
  border-radius: 25px;
  position: fixed;
  left: 25%;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  z-index: 10;

  background: rgba(171, 186, 171, 0.1); /* Fallback color for older browsers */
  background: -webkit-linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(171, 186, 171, 0.5)); /* Webkit browsers */
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(171, 186, 171, 0.5)); /* Modern browsers */
  backdrop-filter: blur(10px); /* Glass effect */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <NavBarContainer>
      <NavLinkStyled to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
        <FaHome className="icon" />
      </NavLinkStyled>
      {user && (
        <NavLinkStyled to="/favourites" className={({ isActive }) => (isActive ? "active" : undefined)}>
          <FaHeart className="icon" />
        </NavLinkStyled>
      )}
      <AuthButton />
    </NavBarContainer>
  );
};

export default Navbar;

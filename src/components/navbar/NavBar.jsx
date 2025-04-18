import { AiOutlineHeart } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import NavLinkStyled from "./NavLink.styled";
import AuthButton from "./AuthButton.styled";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <NavBarContainer>
      <span className="Logo">Rooted Recipes</span>
      <div className="LinksContainer">
        <NavLinkStyled to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
          <FaHome className="icon" />
          <span>Home</span>
        </NavLinkStyled>
        {user && (
          <NavLinkStyled to="/favourites" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <AiOutlineHeart className="icon" />
            <span>Saved</span>
          </NavLinkStyled>
        )}
        {user && (
          <NavLinkStyled to="/user" className={({ isActive }) => (isActive ? "active" : undefined)}>
            <AiOutlineUser className="icon"></AiOutlineUser>
            <span>Profile</span>
          </NavLinkStyled>
        )}
      </div>

      {!user && <AuthButton />}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
  border-bottom: 2px solid #c1933f;
  padding: 30px;

  .LinksContainer{
    display: flex;
    gap: 50px;
  }

  .Logo{
    font-size: 1rem;
  }
`;

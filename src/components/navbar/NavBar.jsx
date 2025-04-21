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
      {user && (
        <div className="LinksContainer">
          <NavLinkStyled to="/" icon="home" text="Home" />
          <NavLinkStyled to="/favourites" icon="heart" text="Saved" />
          <NavLinkStyled to="/user" icon="user" text="Profile" />
        </div>
      )}
      {!user && <AuthButton />}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
  padding: 30px;

  .LinksContainer {
    display: flex;
    gap: 50px;
  }

  .Logo {
    font-size: 1rem;
  }
`;

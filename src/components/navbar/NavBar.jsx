import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import NavLinkStyled from "./NavLink.styled";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <NavBarContainer>
      <span className="Logo">Rooted Recipes</span>
      
        <div className="LinksContainer">
          {user && <NavLinkStyled to="/" icon="home" text="Home" />}
          {user && <NavLinkStyled to="/favourites" icon="heart" text="Saved" />}
          <AuthButton/>
        </div>
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

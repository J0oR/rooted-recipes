import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import NavLinkStyled from "./NavLink.styled";
import AuthButton from "./AuthButton";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  return (
    <NavBarContainer>
      <span className="Logo">Rooted Recipes</span>
      

      <LinksContainer $showmodal={showModal}>
        <LinksWrapper>
          {user && <NavLinkStyled to="/" icon="home" text="Home" showModal={showModal} />}
          {user && <NavLinkStyled to="/favourites" icon="heart" showModal={showModal} text="Saved" />}
          <AuthButton showModal={showModal} setShowModal={setShowModal} />
        </LinksWrapper>
        <LogoutModal showModal={showModal} />
      </LinksContainer>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 30px;

  .Logo {
    font-size: 2rem;
    font-family: "Merienda", cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: italic;
  }
`;

const LinksContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
  padding: 30px;
  width: 400px;
  height: fit-content;
  background-color: ${({ $showmodal }) => ($showmodal ? "#f3f3f3" : "transparent")};
  border-radius: 25px;
  transition: height 0.3s, background-color 0.3s;
  transform-origin: top right;
  z-index: 110;
`;


const LinksWrapper = styled.div`
  display: flex;
  align-items: space-between;
  gap: 20px;
`;
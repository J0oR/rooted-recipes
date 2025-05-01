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

  const exit = () => {
    setShowModal(false);
  };

  return (
    <NavBarContainer>
      <span className="Logo">Rooted Recipes</span>

      <Overlay $isActive={showModal} onClick={() => exit()} />
      <LinksContainer $showmodal={showModal}>
        <LinksWrapper>
          {user && <NavLinkStyled to="/" icon="home" text="Home" showModal={showModal} />}
          {user && <NavLinkStyled to="/favourites" icon="heart" showModal={showModal} text="Saved" />}
          <AuthButton showModal={showModal} setShowModal={setShowModal} />
        </LinksWrapper>
        <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      </LinksContainer>
    </NavBarContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25); // Dark overlay
  transition: background-color 0.3s ease-in-out;
  z-index: 90; // Ensure it is above everything else
  visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
  height: 100vh;
`;

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 60px;

  @media (max-width: 768px) {
    flex-direction: column; /* Forza i figli a stare uno sopra l'altro */
    align-items: center; /* Centra i figli */
    margin-bottom: 150px;
  }

  .Logo {
    font-size: 2rem;
    font-family: "Lobster Two", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-style: italic;
    color: #337179;
  }
`;

const LinksContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  right: 20px;
  top: 28px;
  width: clamp(300px, 80%, 400px);
  padding: 30px;
  height: ${({ $showmodal }) => ($showmodal ? "fit-content" : "58px")};
  background-color: ${({ $showmodal }) => ($showmodal ? "#f3f3f3" : "transparent")};
  border-radius: 25px;
  transition: height 0.1s ease-in, background-color 0.1s ease-in, padding 0.1s ease-in;
  transform-origin: top right;
  z-index: 100;
  @media (max-width: 768px) {
    top: 120px;
    right: auto;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: space-between;
  gap: 20px;
  width: clamp(300px, 80%, 400px);
`;

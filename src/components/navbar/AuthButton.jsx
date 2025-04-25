import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import LogoutModal from "./LogoutModal";
import Button from "../common/Button";
import { auth, provider } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";


export default function AuthButton({ text }) {
  const [user, loading] = useAuthState(auth);
  const [initialized, setInitialized] = useState(false); // Track whether auth state is initialized

  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in: ", result);
      // Additional logic to handle the authenticated user
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Set to true once loading is complete
  useEffect(() => {
    if (!loading) {
      setInitialized(true); 
    }
  }, [loading]);

  // Avoid rendering anything until the auth state is initialized
  if (!initialized) {
    return null; 
  }

  return (
    <>
      {!user ? (
        <AuthStateButton id="google-login-btn" onClick={handleGoogleLogin}>
          <span>Sign in with </span>
          <GoogleIcon />
        </AuthStateButton>
      ) : (
        <Container>
          <UsrButton className={`${showModal ? "active" : ""}`} onClick={toggleModal}>
            <AiOutlineUser className={`icon ${isAnimating ? "animating" : ""} `} />
            {text}
          </UsrButton>
          <LogoutModal modalState={showModal} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const UsrButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #757575;
  border: none;
  background-color: transparent;

  &.active {
    .icon {
      outline: none;
      background-color: #da604e;
      color: #f3f3f3;
    }
  }

  &:hover {
    .icon {
      outline: 2px solid #da604e;
      color: #da604e;
    }
  }

  &.active:hover {
    .icon {
      color: #f3f3f3;
      outline: none;
    }
  }

  .icon {
    padding: 5px;
    font-size: 2rem;
    border-radius: 50%;

    &.animating {
      animation: clickAnimation 0.3s ease;
    }

    @keyframes clickAnimation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const AuthStateButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  border-radius: 25px;
  border: none;
  padding: 20px;
  height: 30px;
  background-color: #fbf5ec;
  color: #090500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const GoogleIcon = styled(FcGoogle)`
  border-radius: 100%;
  font-size: 1.5rem;
  height: 24px;
  width: 24px;
`;

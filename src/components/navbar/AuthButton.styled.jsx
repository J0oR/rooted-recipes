import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import Button from "../common/Button";


export default function AuthButton() {
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


  return (
    <AuthStateButton id="google-login-btn" onClick={handleGoogleLogin}>
      <span>Sign in with </span>
      <GoogleIcon />
    </AuthStateButton>
  );
}


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


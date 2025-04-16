import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

const AuthStateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  border-radius: 25px;
  border: none;
  padding: ${({ $logout }) => ($logout ? "10px 20px" : "10px 2px 10px 10px")};
  height: 30px;
  background-color: #FBF5EC;
  color: #090500;
`;

const GoogleIcon = styled(FcGoogle)`
  border-radius: 100%;
  font-size: 1.5rem;
  height: 24px;
  width: 24px;
`;

function AuthButton() {
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

  const logOut = async () => {
    await signOut(auth);
  };

  return user ? (
    <AuthStateButton $logout onClick={logOut}>Log out</AuthStateButton>
  ) : (
    <AuthStateButton id="google-login-btn" onClick={handleGoogleLogin}>
      <span>Sign in with </span>
      <GoogleIcon   />
    </AuthStateButton>
  );
}

export default AuthButton;

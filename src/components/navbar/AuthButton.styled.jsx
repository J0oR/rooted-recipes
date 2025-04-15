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
  gap: 10px;
  font-size: 1rem;
  border: 1px solid #823939;
  border-radius: 25px;
  padding: ${({ logout }) => (logout ? "10px 20px" : "#2px 10px 2px 2px")};
  height: 30px;
  background-color: #202125;
  color: #FFFFFF;
`;

const GoogleIcon = styled(FcGoogle)`
  border-radius: 100%;
  background-color: #FFFFFF;
  font-size: 1.5rem;
  height: 26px;
  width: 26px;
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
    <AuthStateButton logout onClick={logOut}>Log out</AuthStateButton>
  ) : (
    <AuthStateButton id="google-login-btn" onClick={handleGoogleLogin}>
      <GoogleIcon   />
      <span>Sign in with Google</span>
    </AuthStateButton>
  );
}

export default AuthButton;

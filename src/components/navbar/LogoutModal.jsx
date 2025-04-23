import { use } from "react";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { clearFavourites } from "../../store/favouriteSlice";
import { FiLogOut } from "react-icons/fi";
import Button from "../common/Button";

export default function LogoutModal({modalState}) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { recipes } = useSelector((state) => state.favourites);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(modalState);

  const logOut = async () => {
    await signOut(auth);
  };


  useEffect(() => {
    setVisible(modalState); // Sync modalState to visible
  }, [modalState]);

  useEffect(() => {
    if (!user) {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  return (
    <Container $visible={visible}>
      <img src={user && user.photoURL} />

      <Field>
        <span className="fieldLabel">User</span>
        <span>{user && user.displayName}</span>
      </Field>
      <Field>
        <span className="fieldLabel">Email ({user && user.emailVerified ? "Verified" : "Not verified"})</span>
        <span>{user && user.email} </span>
      </Field>
      <Field>
        <span className="fieldLabel">Saved Recipes</span>
        <span>{recipes?.length}</span>
      </Field>
      {user && (
        <LogoutButton onClick={logOut}>
          Log out <FiLogOut className="icon" />
        </LogoutButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 3rem; // or adjust as needed
  right: 0;
  background-color: #efefef;
  color: #757575;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.8)")};
  transform-origin: top right;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  img {
    width: 100px;
    border-radius: 100%;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  gap: 10px;
  color: black;
  font-size: 1rem;
  width: 100%;

  .fieldLabel {
    color: #4c4d51;
    font-size: 1rem;
  }

 
`;

const LogoutButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  width: 150px;
  color: #f04b53;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  outline: 2px solid #f04b53;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f04b53;
    color: #f3f3f3;
    
  }

  .icon {
    font-size: 1.5rem;
  }
`;

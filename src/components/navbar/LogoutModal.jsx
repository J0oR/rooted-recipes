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

export default function LogoutModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { recipes } = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  const logOut = async () => {
    setShowModal(false);
    dispatch(clearFavourites());
    await signOut(auth);
  };



  return (
    <Modal $visible={showModal}>
      
      <img src={user && user.photoURL} />

      <Field>
        <span className="fieldLabel">User</span>
        <span className="fieldValue">{user && user.displayName}</span>
      </Field>
      <Field>
        <span className="fieldLabel">Email</span>
        <span className="fieldValue">{user && user.email} </span>
      </Field>
      <Field>
        <span className="fieldLabel">Saved Recipes</span>
        <span className="fieldValue">{recipes?.length}</span>
      </Field>
      {user && (
        <LogoutButton onClick={logOut}>
          Log out <FiLogOut className="icon" />
        </LogoutButton>
      )}
    </Modal>
  );
}

const Modal = styled.div`
  right: 0;
  color: #254A5D;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0), scale(1)" : "translateY(-100px), scale(0.5)")};
  transform-origin: top right;
  transition: opacity 0.1s ease-out, transform 0.1s ease-out, color 0.1s ease-out;
  width: 100%;

  img {
    width: 80px;
    border-radius: 100%;
  }
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  gap: 10px;
  font-size: 1rem;
  width: 100%;

  .fieldLabel {
    color: #337179;
    font-weight: 600;
    font-size: 1rem;
  }

  .fieldValue{
    display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-width: 200px;
  max-height: 2.4em; /* exactly 2 lines */
  word-break: break-word; /* optional: to avoid long words spilling */
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
  align-self: center;

  &:hover {
    background-color: #f04b53;
    color: #f3f3f3;
  }

  .icon {
    font-size: 1.5rem;
  }
`;

import { use } from "react";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { clearFavourites } from "../store/favouriteSlice";


export default function User() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { recipes } = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user) {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);


  return (
    <>
      <UserDataContainer>
        <div className="fields">
          <div className="field">
            <span className="fieldLabel">User</span>
            <span>{user && user.displayName}</span>
          </div>
          <div className="field">
            <span className="fieldLabel">Email</span>
            <span>{user && user.email}</span>
          </div>
          <div className="field">
            <span className="fieldLabel">Saved Recipes</span>
            <span>{recipes?.length}</span>
          </div>
        </div>
        <img src={user && user.photoURL} />
      {user && <button onClick={logOut}>Log out</button>}
      </UserDataContainer>
    </>
  );
}

const UserDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 100px;
  margin-left: auto;

  .fields {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .field {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300px;
      gap: 5px;
    }
  }

  img {
    border-radius: 100%;
  }
`;

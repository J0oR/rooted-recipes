import { use } from "react";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { clearFavourites } from "../store/favouriteSlice";
import { FiLogOut } from "react-icons/fi";

export default function User() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { recipes } = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <UserDataContainer>
      <div className="LogoutContainer">
          <img src={user && user.photoURL} />
          {user && (
            <button onClick={logOut}>
              Log out <FiLogOut className="icon"/>
            </button>
          )}
        </div>
        <div className="fields">
          <div className="field">
            <span className="fieldLabel">User</span>
            <span>{user && user.displayName}</span>
          </div>
          <div className="field">
            <span className="fieldLabel">Email ({user && user.emailVerified ? "Verified" : "Not verified"})</span>
            <span>{user && user.email} </span>
          </div>
          <div className="field">
            <span className="fieldLabel">Saved Recipes</span>
            <span>{recipes?.length}</span>
          </div>
        </div>
        
      </UserDataContainer>
    </>
  );
}

const UserDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  padding: 40px;
  border-radius: 10px;
  margin: 100px auto;
  width: 50%;

  .fields {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 50%;
    border: 1px solid #c1933f;
    padding: 20px;
    border-radius: 15px;
    height: 100%;

    .field {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300px;
      gap: 10px;
      color: black;
      font-size: 1rem;
      border-bottom: 1px solid #c1933f;
      width: 100%;
      

      .fieldLabel {
        color: #4c4d51;
        font-size: 1rem;
      }
    }
  }

  .LogoutContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border: 1px solid #c1933f;
    padding: 20px;
    border-radius: 15px;
    height: 100%;

    img {
      width: 165px;
      border-radius: 100%;
    }
    button {
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
      
      .icon{
        font-size: 1.5rem;
      }
    }
  }
`;

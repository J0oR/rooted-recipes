import { useState, useEffect, useRef } from "react";
import RecipesCards from "../components/recipeCards/RecipesCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../store/ingredientsSlice";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites } from "../store/favouriteSlice";
import { apiFetchDbSave } from "../utils/apiFetchDbSave";
import SearchInput from "../components/search/SearchInput";
import styled from "styled-components";
import { fetchRecipes } from "../store/recipes/asyncThunks";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";
import { FaChevronUp } from "react-icons/fa";

export default function Home() {
  const { data, loading, lastDocId, hasMore, searchMode } = useSelector((state) => state.recipes);
  const { searchTerm, suggestions } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const favourites = useSelector((state) => state.favourites.recipes);
  const loadMoreButtonRef = useRef();
  const [scrollTarget, setScrollTarget] = useState(null);
  const [showUpButton, setShowUpButton] = useState(false);

  /*
   * STARTUP TASKS:
   * - fetch data from Api and save to DB
   * - fetch ingredients & titles for filtering, but also
   * - clear database, if needed
   */
  useEffect(() => {
    //apiFetchDbSave();
    //clearDB();

    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  /*
   * If User is logged in:
   * - fetch favourites
   */
  useEffect(() => {
    if (user && !favourites.length) {
      dispatch(fetchFavourites(user.uid));
    }
  }, [user, dispatch]);

  /*
   * LOAD MORE TASKS:
   * - fetch more recipes
   */
  const loadMoreRecipes = () => {
    if (lastDocId && loadMoreButtonRef.current) {
      setScrollTarget(loadMoreButtonRef.current.offsetTop);
      dispatch(fetchRecipes());
    }
  };

  useEffect(() => {
    if (scrollTarget !== null) {
      window.scrollTo({
        top: scrollTarget - 100,
        behavior: "smooth",
      });
      setScrollTarget(null); // reset per evitare scroll successivi indesiderati
    }
  }, [data.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowUpButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HomeContainer>
      <FilteringContainer>
        <SearchInput />
      </FilteringContainer>
      {searchTerm && data.length === 0 && !loading && <EmptyContainer>No recipes found</EmptyContainer>}
      {data && data.length > 0 && <RecipesCards recipes={data} />}
      {loading && <LoadingSpinner />}
      {!loading && data.length !== 0 && hasMore && (
        <LoadMore ref={loadMoreButtonRef} onClick={loadMoreRecipes} disabled={loading}>
          Load more...
        </LoadMore>
      )}
      {showUpButton && (
        <UpButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaChevronUp />
        </UpButton>
      )}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 0;
`;

const FilteringContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 20px;
  width: 100%;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 0;
  margin-top: 100px;
  font-size: 1.2rem;
  color: #254a5d;
`;

const LoadMore = styled.button`
  margin: 50px auto;
  padding: 10px 40px;
  background-color: #337179;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(1rem, 2vw, 1.2rem);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #337179;
    color: #f3f3f3;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
    background-color: #337179;
    color: #f3f3f3;
  }
`;

const UpButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #fff;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  font-size: 2rem;
  padding: 15px;
  transition: background-color 0.3s ease;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #337179;
  background-color: #337179;
  color: #f3f3f3;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(10px); /* for Safari support */
  box-shadow: 0 4px 30px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #337179;
    color: #f3f3f3;
    transform: scale(1.1);
  }
`;

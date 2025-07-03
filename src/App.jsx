import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Favourites from "./views/Favourites";
import Navbar from "./components/navbar/NavBar";
import Recipe from "./views/Recipe";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
